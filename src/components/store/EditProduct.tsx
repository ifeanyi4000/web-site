import React, { useEffect, useState } from 'react';
import { useEditProductXMutation, useGetAllProductQuery } from '../../redux/features/product/productApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoArrowBackOutline } from 'react-icons/io5';
import { styles } from '../styles/style';

type Props = {}

interface ProductData {
    price: string;
    stock: string;
    offer: string;
    name: string;
    category: string;
    isApprove: boolean;
    desc: string;
    video_ad: string;
}

interface ImageData {
    public_id: string;
    url: string;
}

interface Product {
    _id: string;
    name: string;
    desc: string;
    price: string;
    offer: string;
    category: string;
    stock: string;
    isApprove: boolean;
    video_ad: string;
    images: ImageData[];
}

export default function EditProduct({ }: Props) {
    const [editProductX, { isLoading, isSuccess, error }] = useEditProductXMutation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, refetch } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true });

    const [productData, setProductData] = useState<ProductData>({
        price: '',
        stock: '',
        offer: '',
        name: '',
        category: '',
        isApprove: false,
        desc: '',
        video_ad: '',
    });

    const [images, setImages] = useState<(ImageData | File)[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        const productDataFind = data?.find((i: Product) => i?._id === id);
        if (productDataFind) {
            setProductData({
                name: productDataFind?.name,
                desc: productDataFind?.desc,
                price: productDataFind?.price,
                offer: productDataFind?.offer,
                category: productDataFind?.category,
                stock: productDataFind?.stock,
                isApprove: productDataFind?.isApprove,
                video_ad: productDataFind?.video_ad,
            });

            if (productDataFind.images && Array.isArray(productDataFind.images)) {
                setImages(productDataFind.images);
                setImagePreviews(productDataFind.images.map((img: ImageData) => img.url));
            }
        }
    }, [data, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked }: any = e.target;
        setProductData({
            ...productData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = Array.from(e.target.files || []);
        const newImages = [...images];
        newImages[index] = files[0];
        setImages(newImages);

        const previews = files.map(file => URL.createObjectURL(file));
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = previews[0];
        setImagePreviews(newImagePreviews);
    };

    const handleAddImageInput = () => {
        setImages([...images, null as unknown as ImageData | File]);
        setImagePreviews([...imagePreviews, '']);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newImagePreviews);
    };

    const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Convert images to base64
        const base64Images = await Promise.all(
            images.map(file => new Promise<string | undefined>((resolve, reject) => {
                if (file instanceof File) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = error => reject(error);
                } else {
                    resolve(file?.url); // for initial images already present
                }
            }))
        );

        const productPayload = {
            ...productData,
            images: base64Images,
        };

        await editProductX({ id, productPayload });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product updated successfully");
            refetch();
            navigate("/store");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isLoading, isSuccess, error, refetch, navigate]);

    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
            <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/store">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>
                        <div className='text-[25px] font-semibold text-white'>Edit Product</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
                <form onSubmit={handleSubmitData}>
                    <div className="flex flex-col lg:flex-row items-center gap-3">
                        <div className='w-full'>
                            <label htmlFor='' className="text-gray-200">
                                Name
                            </label>
                         
                            <input
                                type='name'
                                name='name'
                                required
                                onChange={handleChange}
                                value={productData.name}
                                id="name"
                                placeholder='Eg. the real you'
                                className={`${styles.input}`}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor='' className="text-gray-200">
                                Category
                            </label>
                            <select
                                name='category'
                                required
                                onChange={(e: any) => handleChange}
                                id="category"
                                className={`${styles.input} text-red-600 !bg-black custom-select`}
                            >
                                <option value='New Releases'>New Reseases</option>
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
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-3 mt-6">
                        <div>
                            <label htmlFor='' className="text-gray-200">
                                Price
                            </label>
                            <input
                                type='number'
                                name='price'
                                required
                                onChange={handleChange}
                                id="name"
                                value={productData.price}
                                placeholder='Eg. #2000'
                                className={`${styles.input}`}
                            />
                        </div>
                        <div>
                            <label htmlFor='' className="text-gray-200">
                                Offer
                            </label>
                            <input
                                type='number'
                                name='offer'
                                value={productData.offer}
                                required
                                onChange={handleChange}
                                id="name"
                                placeholder='Eg. 1970'
                                className={`${styles.input}`}
                            />
                        </div>
                        <div>
                            <label htmlFor='' className="text-gray-200">
                                Stock
                            </label>
                            <input
                                type='number'
                                name='stock'
                                required
                                value={productData.stock}
                                onChange={handleChange}
                                id="name"
                                placeholder='Eg. 20'
                                className={`${styles.input}`}
                            />
                        </div>
                    </div>

                    <div className='mt-6'>
                        <label htmlFor='' className="text-gray-200">
                            Description
                        </label>
                        <textarea
                            required
                            maxLength={150}
                            onChange={handleChange}
                            value={productData.desc}
                            name="desc"
                            placeholder="Enter description"
                            className={`${styles.input} !text-gray-100 !text-base !py-2`}
                        ></textarea>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-3 mt-6">
                        <div className='flex items-center justify-start w-full'>
                            <label htmlFor='' className="text-gray-200">
                                Approved
                            </label>
                            <input type="checkbox" name="isApprove" checked={productData.isApprove} onChange={handleChange} className="h-[30px] p-3 ml-3" />

                        </div>
                        <div className='w-full'>
                            <label htmlFor='' className="text-gray-200">
                                Video Ad for Product
                            </label>
                            <input type="text" name="video_ad" placeholder="Video Ad URL" value={productData.video_ad} onChange={handleChange} className={`${styles.input} !text-gray-100 !text-base !py-2`} />
                        </div>
                    </div>


                    {images.map((_, index) => (
                        <div key={index} className='flex justify-between mt-6'>
                            <input
                                type="file"
                                accept="image/png,image/jpg,image/jpeg,image/webp"
                                onChange={(e) => handleImageChange(e, index)}
                                className={`${styles.input} !text-gray-100 !text-base !py-2`}
                            />
                            {imagePreviews[index] && (
                                <div style={{ position: 'relative' }} className='flex flex-row'>
                                    <img src={imagePreviews[index]} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }} />
                                    <button type="button" onClick={() => handleRemoveImage(index)} style={{ position: 'absolute', top: '0', right: '0', background: 'red', padding: 3, color: 'white', border: 'none', cursor: 'pointer' }}>X</button>
                                </div>
                            )}
                        </div>
                    ))}

                    <button className='bg-white text-gray-700 font-medium p-2 rounded-md mt-4' type="button" onClick={handleAddImageInput}>Add More Images</button>
                    {isLoading ? <text className="text-white text-4xl mt-4">Loading...</text> :
                    <button type="submit" className='p-2 ml-3 font-medium rounded-md bg-blue-200'>Update Product</button>
}
                </form>
            </div>
        </div>
    );
};






















// import React, { useEffect, useState } from 'react';
// import { useEditProductXMutation, useGetAllProductQuery } from '../../redux/features/product/productApi';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IoArrowBackOutline } from 'react-icons/io5';
// import { styles } from '../styles/style';

// interface ImageData {
//     public_id: string;
//     url: string;
// }

// interface Product {
//     _id: string;
//     name: string;
//     desc: string;
//     price: string;
//     offer: string;
//     category: string;
//     stock: string;
//     isApprove: boolean;
//     video_ad: string;
//     images: ImageData[];
// }

// const EditProduct: React.FC = () => {
//     const [editProductX, { isLoading, isSuccess, error }] = useEditProductXMutation();
//     const navigate = useNavigate();
//     const { id } = useParams<{ id: string }>();
//     const { data, refetch } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true });

//     const [productData, setProductData] = useState({
//         price: '',
//         stock: '',
//         offer: '',
//         name: '',
//         category: '',
//         isApprove: false,
//         desc: '',
//         video_ad: '',
//         images: []
//     });

//     const [imageFiles, setImageFiles] = useState<File[]>([]);
//     const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//     const [uploadProgress, setUploadProgress] = useState<number[]>([]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setProductData({
//             ...productData,
//             [name]: value,
//         });
//     };

//     useEffect(() => {
//         const productDataFind = data?.find((i: Product) => i?._id === id);
//         if (productDataFind) {
//             setProductData({
//                 name: productDataFind?.name,
//                 desc: productDataFind?.desc,
//                 price: productDataFind?.price,
//                 offer: productDataFind?.offer,
//                 category: productDataFind?.category,
//                 stock: productDataFind?.stock,
//                 isApprove: productDataFind?.isApprove,
//                 video_ad: productDataFind?.video_ad,
//                 images: []
//             });

//             if (productDataFind?.images && Array?.isArray(productDataFind.images)) {
//                 setImagePreviews(productDataFind?.images?.map((img: ImageData) => img?.url));
//             }
//         }
//     }, [data, id]);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = Array.from(e.target.files || []);
//         setImageFiles([...imageFiles, ...files]);
//         setUploadProgress([...uploadProgress, ...files.map(() => 0)]);
//     };

//     const removeImage = (index: number) => {
//         setImageFiles(imageFiles.filter((_, i) => i !== index));
//         setUploadProgress(uploadProgress.filter((_, i) => i !== index));
//         setImagePreviews(imagePreviews.filter((_, i) => i !== index));
//     };

//     const resizeAndCompressImage = (file: File): Promise<string> => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = (event) => {
//                 const img = new Image();
//                 img.src = event.target?.result as string;
//                 img.onload = () => {
//                     const canvas = document.createElement('canvas');
//                     const ctx = canvas.getContext('2d');
//                     let width = img.width;
//                     let height = img.height;

//                     // Resize the image to 500px
//                     if (width > height) {
//                         if (width > 500) {
//                             height *= 500 / width;
//                             width = 500;
//                         }
//                     } else {
//                         if (height > 500) {
//                             width *= 500 / height;
//                             height = 500;
//                         }
//                     }
//                     canvas.width = width;
//                     canvas.height = height;

//                     ctx?.drawImage(img, 0, 0, width, height);

//                     // Compress the image to 500kB
//                     let quality = 0.9;
//                     let base64 = canvas.toDataURL('image/jpeg', quality);
//                     while (base64.length / 1024 > 500 && quality > 0.1) {
//                         quality -= 0.1;
//                         base64 = canvas.toDataURL('image/jpeg', quality);
//                     }
//                     resolve(base64);
//                 };
//                 img.onerror = () => reject(new Error('Failed to load image'));
//             };
//             reader.onerror = () => reject(new Error('Failed to read file'));
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Resize and compress images to base64 with progress tracking
//         const imagesBase64 = await Promise.all(imageFiles.map(async (file, index) => {
//             setUploadProgress(prevProgress => {
//                 const newProgress = [...prevProgress];
//                 newProgress[index] = 0;
//                 return newProgress;
//             });
//             const base64Image = await resizeAndCompressImage(file);
//             setUploadProgress(prevProgress => {
//                 const newProgress = [...prevProgress];
//                 newProgress[index] = 100;
//                 return newProgress;
//             });
//             return base64Image;
//         }));

//         // Prepare the product data
//         const finalProductData = {
//             ...productData,
//             images: imagesBase64,
//         };

//         await editProductX({ id, finalProductData });
//     };

//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("Product updated successfully");
//             refetch();
//             navigate("/store");
//         }
//         if (error) {
//             if ("data" in error) {
//                 const errorMessage = error as any;
//                 toast.error(errorMessage.data.message);
//             }
//         }
//     }, [isLoading, isSuccess, error, refetch, navigate]);

//     return (
//         <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10'>
//             <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
//                 <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
//                     <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
//                         <Link to="/store">
//                             <div>
//                                 <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
//                             </div>
//                         </Link>
//                         <div className='text-[25px] font-semibold text-white'>Update Product</div>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
//                 <form onSubmit={handleSubmit}>
//                     <div className='w-full mt-3'>
//                         <label htmlFor='name' className="text-gray-200">Name</label>
//                         <input
//                             type='text'
//                             name='name'
//                             required
//                             value={productData.name}
//                             onChange={handleInputChange}
//                             id="name"
//                             placeholder='Eg. the real you'
//                             className={`${styles.input}`}
//                         />
//                     </div>

//                     <div className="flex flex-col lg:flex-row items-center gap-3 mt-3">
//                         <div className='w-full'>
//                             <label htmlFor='price' className="text-gray-200">Price</label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={productData.price}
//                                 onChange={handleInputChange}
//                                 id="price"
//                                 placeholder='Eg. 4000'
//                                 className={`${styles.input}`}
//                             />
//                         </div>
//                         <div className='w-full'>
//                             <label htmlFor='stock' className="text-gray-200">Stock</label>
//                             <input
//                                 type="number"
//                                 name="stock"
//                                 value={productData.stock}
//                                 onChange={handleInputChange}
//                                 id="stock"
//                                 placeholder='Eg. 5 instock'
//                                 className={`${styles.input}`}
//                             />
//                         </div>
//                         <div className='w-full'>
//                             <label htmlFor='offer' className="text-gray-200">Offer</label>
//                             <input
//                                 type='number'
//                                 name='offer'
//                                 required
//                                 value={productData.offer}
//                                 onChange={handleInputChange}
//                                 id="offer"
//                                 placeholder='Eg. 1970'
//                                 className={`${styles.input}`}
//                             />
//                         </div>
//                     </div>
//                     <div className='w-full mt-3'>
//                         <label htmlFor='category' className="text-gray-200">Category</label>
//                         <select
//                             name='category'
//                             required
//                             value={productData.category}
//                             onChange={handleInputChange}
//                             id="category"
//                             className={`${styles.input} text-red-600 custom-select !bg-gray-900`}
//                         >
//                             <option value="">Select Category</option>
//                             <option value='New Releases'>New Releases</option>
//                             <option value='Faith'>Faith</option>
//                             <option value='Family'>Family</option>
//                             <option value='Prayer'>Prayer</option>
//                             <option value='Wisdom'>Wisdom</option>
//                             <option value='Favour'>Favour</option>
//                             <option value='Praise'>Praise</option>
//                             <option value='Divine Health'>Divine Health</option>
//                             <option value='Restoration'>Restoration</option>
//                         </select>
//                     </div>
//                     <div className='mt-6'>
//                         <label htmlFor='desc' className="text-gray-200">Description</label>
//                         <textarea
//                             required
//                             maxLength={150}
//                             name="desc"
//                             value={productData.desc}
//                             onChange={handleInputChange}
//                             id="desc"
//                             placeholder="Description"
//                             className={`${styles.input} !text-gray-100 !text-base !py-2`}
//                         ></textarea>
//                     </div>

//                     <div className="flex flex-col lg:flex-row items-center gap-3 mt-6">
//                         <div className='flex items-center justify-start w-full'>
//                             <label htmlFor='isApprove' className="text-gray-200 mr-2">Approved</label>
//                             <input type="checkbox"
//                                 name="isApprove"
//                                 checked={productData.isApprove}
//                                 onChange={() => setProductData({ ...productData, isApprove: !productData.isApprove })} />
//                         </div>
//                         <div className='w-full'>
//                             <label htmlFor='video_ad' className="text-gray-200">Video Ad for Product</label>
//                             <input type="text"
//                                 name="video_ad"
//                                 value={productData.video_ad}
//                                 onChange={handleInputChange}
//                                 placeholder="Video Ad URL" className={`${styles.input} !text-gray-100 !text-base !py-2`} />
//                         </div>
//                     </div>

//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleImageChange}
//                         accept="image/*"
//                         className='text-white my-6'
//                     />
//                     <div className="image-preview">
//                         {imagePreviews.map((preview, index) => (
//                             <div key={index} className="image-container">
//                                 <img src={preview} alt={`preview ${index}`} className="image-preview" />
//                                 <button type="button" onClick={() => removeImage(index)}>Remove</button>
//                                 {uploadProgress[index] !== undefined && (
//                                     <progress value={uploadProgress[index]} max="100">{uploadProgress[index]}%</progress>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                     <div className='flex justify-end'>
//                         <button disabled={isLoading} type="submit" className='bg-white p-2 font-semibold text-gray-700 text-base rounded-md hover:text-gray-950 hover:bg-slate-200'>
//                             {isLoading ? "Loading..." : "Update Product"}
//                         </button>
//                     </div>

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditProduct;
