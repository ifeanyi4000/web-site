import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style'
import { toast } from 'react-toastify'
import { useCreateSliderMutation, useGetAllSliderQuery } from '../../redux/features/slider/sliderApi'

type Props = {
    setActive: any;
}

export default function SliderModal({ setActive }: Props) {
    const [createSlider, { isLoading, isSuccess, error }] = useCreateSliderMutation()
    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const { refetch } = useGetAllSliderQuery({}, { refetchOnMountOrArgChange: true })
    const [url, setUrl] = useState("")
    const [isApprove, setIsApprove] = useState(false)


    const data = {
        title,
        thumbnail,
        url,
        isApprove
    }


    const handleSubmitData = async (e: any) => {
        e.preventDefault();
        await createSlider(data)
    }


    const imageHandler = async (e: any) => {

        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const thumbnail: any = fileReader.result;
                setThumbnail(
                    thumbnail
                )
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }


    useEffect(() => {
        if (isSuccess) {
            toast.success("Slider created successfully")
            setActive(false)
            refetch()
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isLoading, isSuccess, error])

    const handleCheckboxChange = () => {
        setIsApprove(!isApprove);
    };





    return (
        <div className=' overflow-y-auto'>
            <form onSubmit={handleSubmitData} className={`${styles.label}`}>
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-xl font-bold">Add Slider</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={() => setActive(false)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className='flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='w-full'>
                        <label htmlFor='' className="text-gray-900">
                            Title
                        </label>
                        <input
                            type='Eg. Ejoying the grace of God'
                            name=''
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="name"
                            placeholder='Enter title'
                            className={`${styles.input} !text-gray-700`}
                        />
                    </div>
                </div>
                <br />
                <div className='w-full md:flex justify-between'>
                    <div className='w-full'>
                        <label htmlFor='' className="text-gray-900">
                            Category
                        </label>
                        <select
                            name='category'
                            required
                            value={url}
                            onChange={(e: any) => setUrl(e.target.value)}
                            id="category"
                            className={`${styles.input} text-red-600 custom-select !bg-slate-600`}
                        >
                              <option >--Select--</option>
                            <option value='Store'>Store</option>
                            <option value='Sermon'>Sermon</option>
                            <option value='Podcast'>Podcast</option>
                        </select>
                    </div>
                    <div className='my-5 w-full items-center flex md:ml-2' >
                        <label htmlFor='' className="text-gray-900">
                            Approve
                        </label>
                        <input
                            type="checkbox"
                            checked={isApprove}
                            onChange={handleCheckboxChange}
                            className={`${styles.check} !text-gray-700`}
                        />
                        {isApprove === false &&
                            <div className='text-xs text-red-500 ml-3'>Set approved to true </div>
                        }
                    </div>
                </div>
                <br />

                <div className='w-full'>
                    <input
                        type='file'
                        accept='image/png,image/jpg,image/jpeg,image/webp'
                        id='thumbnail'
                        className=''
                        onChange={imageHandler}
                    />

                </div>

                <label htmlFor='file'
                    className={`w-full min-h-[10vh] dark:border-gray-800 border-[#00000026] rounded-md mt-3 p-3 border flex items-center justify-center ${thumbnail ? "bg-blue-500" : "bg-transparent"
                        }`}

                >
                    {thumbnail ? (
                        <img src={thumbnail}
                            alt=''
                            className='max-h-full w-full object-cover' />
                    ) : (
                        <span className='text-black dark:text-white'>
                            Drag and drop your thumbnail here or click to browse
                        </span>
                    )}

                </label>

                <div className='w-full flex items-center justify-end'>
                    {isLoading ? <div className="text-black font-semibold mt-1">Creating...</div> :
                        <input
                            type='submit'
                            disabled={isLoading}
                            value="Create Slider"
                            className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
                    }
                </div>

            </form>

        </div>

    )
}