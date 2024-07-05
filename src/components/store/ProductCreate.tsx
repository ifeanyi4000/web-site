import React, { useEffect, useState } from 'react';
import { useCreateProductMutation } from '../../redux/features/product/productApi';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { styles } from '../styles/style';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [createProduct, { isLoading, isSuccess, error }] = useCreateProductMutation();
    const [productData, setProductData] = useState({
        price: '',
        stock: '',
        offer: '',
        name: '',
        category: '',
        isApprove: false,
        desc: '',
        video_ad: '',
        images: []
    });

    const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e: any) => {
        const files: any = Array.from(e.target.files);
        setImageFiles(prevImages => [...prevImages, ...files]);
        setUploadProgress(prevProgress => [...prevProgress, ...files.map(() => 0)]);
    };

    const removeImage = (index: number) => {
        setImageFiles(prevImages => prevImages.filter((_, i) => i !== index));
        setUploadProgress(prevProgress => prevProgress.filter((_, i) => i !== index));
    };

    const resizeAndCompressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let width = img.width;
                    let height = img.height;

                    // Resize the image to 500px
                    if (width > height) {
                        if (width > 500) {
                            height *= 500 / width;
                            width = 500;
                        }
                    } else {
                        if (height > 500) {
                            width *= 500 / height;
                            height = 500;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;

                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress the image to 500kB
                    let quality = 0.9;
                    let base64 = canvas.toDataURL('image/jpeg', quality);
                    while (base64.length / 1024 > 500 && quality > 0.1) {
                        quality -= 0.1;
                        base64 = canvas.toDataURL('image/jpeg', quality);
                    }
                    resolve(base64);
                };
                img.onerror = () => reject(new Error('Failed to load image'));
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Resize and compress images to base64 with progress tracking
        const imagesBase64: any = await Promise.all(imageFiles.map(async (file: any, index) => {
            setUploadProgress(prevProgress => {
                const newProgress = [...prevProgress];
                newProgress[index] = 0;
                return newProgress;
            });
            const base64Image = await resizeAndCompressImage(file);
            setUploadProgress(prevProgress => {
                const newProgress = [...prevProgress];
                newProgress[index] = 100;
                return newProgress;
            });
            return base64Image;
        }));

        // Prepare the product data
        const finalProductData = {
            ...productData,
            images: imagesBase64,
        };

        await createProduct(finalProductData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product created successfully");
            navigate("/store");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isLoading, isSuccess, error]);

    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10'>
            <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/store">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>
                        <div className='text-[25px] font-semibold text-white'>Create Product</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
                <form onSubmit={handleSubmit}>
                    <div className='w-full mt-3'>
                        <label htmlFor='name' className="text-gray-200">Name</label>
                        <input
                            type='text'
                            name='name'
                            required
                            value={productData.name}
                            onChange={handleInputChange}
                            id="name"
                            placeholder='Eg. the real you'
                            className={`${styles.input}`}
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-3 mt-3">
                        <div className='w-full'>
                            <label htmlFor='name' className="text-gray-200">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                id="name"
                                placeholder='Eg. 4000'
                                className={`${styles.input}`}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='name' className="text-gray-200">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                id="name"
                                placeholder='Eg. 5 instock'
                                className={`${styles.input}`}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='offer' className="text-gray-200">Offer</label>
                            <input
                                type='number'
                                name='offer'
                                required
                                value={productData.offer}
                                onChange={handleInputChange}
                                id="offer"
                                placeholder='Eg. 1970'
                                className={`${styles.input}`}
                            />
                        </div>

                    </div>
                    <div className='w-full mt-3'>
                        <label htmlFor='category' className="text-gray-200">Category</label>
                        <select
                            name='category'
                            required
                            value={productData.category}
                            onChange={handleInputChange}
                            id="category"
                            className={`${styles.input} text-red-600 custom-select !bg-gray-900`}
                        >
                            <option value="">Select Category</option>
                            <option value='New Releases'>New Releases</option>
                            <option value='Faith'>Faith</option>
                            <option value='Family'>Family</option>
                            <option value='Prayer'>Prayer</option>
                            <option value='Wisdom'>Wisdom</option>
                            <option value='Favour'>Favour</option>
                            <option value='Praise'>Praise</option>
                            <option value='Divine Health'>Divine Health</option>
                            <option value='Restoration'>Restoration</option>
                        </select>
                    </div>
                    <div className='mt-6'>
                        <label htmlFor='desc' className="text-gray-200">Description</label>
                        <textarea
                            required
                            maxLength={150}
                            name="desc"
                            value={productData.desc}
                            onChange={handleInputChange}
                            id="desc"
                            placeholder="Description"
                            className={`${styles.input} !text-gray-100 !text-base !py-2`}
                        ></textarea>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-3 mt-6">
                        <div className='flex items-center justify-start w-full'>
                            <label htmlFor='isApprove' className="text-gray-200 mr-2">Approved</label>
                            <input type="checkbox"
                                name="isApprove"
                                checked={productData.isApprove}
                                onChange={() => setProductData({ ...productData, isApprove: !productData.isApprove })} />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='video_ad' className="text-gray-200">Video Ad for Product</label>
                            <input type="text"
                                name="video_ad"
                                value={productData.video_ad}
                                onChange={handleInputChange}
                                placeholder="Video Ad URL" className={`${styles.input} !text-gray-100 !text-base !py-2`} />
                        </div>
                    </div>

                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                        className='text-white my-6'
                    />
                    <div className="image-preview">
                        {imageFiles.map((file: any, index: number) => (
                            <div key={index} className="image-container">
                                <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="image-preview" />
                                <button type="button" onClick={() => removeImage(index)}>Remove</button>
                                {uploadProgress[index] !== undefined && (
                                    <progress value={uploadProgress[index]} max="100">{uploadProgress[index]}%</progress>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end'>
                        <button disabled={isLoading} type="submit" className='bg-white p-2 font-semibold text-gray-700 text-base rounded-md hover:text-gray-950 hover:bg-slate-200'>
                            {isLoading ? "Loading..." : "Create Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
