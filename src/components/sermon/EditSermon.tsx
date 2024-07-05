import React, { useEffect, useState } from 'react'
import { useEditSermonMutation, useGetAllSermonQuery } from '../../redux/features/sermon/sermonApi'
import { toast } from 'react-toastify'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { styles } from '../styles/style'

type Props = {}

export default function EditSermon({ }: Props) {
    const [createBlog, { isLoading, isSuccess, error }] = useEditSermonMutation()
    const { data: f, refetch } = useGetAllSermonQuery({}, { refetchOnMountOrArgChange: true })
    const { id } = useParams<{ id: string }>();
    const navigation = useNavigate()

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [category, setCategory] = useState("")
    const [videoId, setVideoId] = useState("");
    const [isApprove, setIsApprove] = useState("")
    const [ministering, setMinistring] = useState("")
    const [thumbnailEdit, setThumbnailEdit] = useState("")

    // finding the course data through params 
    const sermonDataFind = f && f.find((i: any) => i._id === id);

    console.log(sermonDataFind)

    useEffect(() => {
        if (sermonDataFind) {
            setTitle(sermonDataFind?.title);
            setDesc(sermonDataFind?.desc)
            setThumbnailEdit(sermonDataFind?.thumbnail.url)
            setCategory(sermonDataFind.category)
            setMinistring(sermonDataFind.ministering)
            setVideoId(sermonDataFind.videoId)
            setIsApprove(sermonDataFind.isApprove)
        }
    }, [sermonDataFind])


    const data = {
        title,
        desc,
        thumbnail,
        category,
        ministering,
        videoId,
        isApprove
    }


    const handleSubmitData = async (e: any) => {
        e.preventDefault();
        await createBlog({id,data})
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
            toast.success("Sermon created successfully")
            refetch()
            navigation("/sermon")
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isLoading, isSuccess, error])


    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
            <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/sermon">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>


                        <div className='text-[25px] font-semibold text-white'>Edit Sermon</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
                <form onSubmit={handleSubmitData} className={`${styles.label}`}>
                    <div>
                        <label htmlFor='' className="text-gray-200">
                            Title
                        </label>
                        <input
                            type='name'
                            name=''
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="name"
                            placeholder='Enter title'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='my-5'>
                        <label htmlFor='' className="text-gray-200">
                            Description
                        </label>
                        <textarea
                            name=''
                            required
                            maxLength={150}
                            value={desc}
                            onChange={(e: any) => setDesc(e.target.value)}
                            id="name"
                            placeholder="Enter description"
                            className={`${styles.input} !text-gray-100 !text-base !py-2`}
                        ></textarea>

                    </div>
                    <div>
                        <label htmlFor='' className="text-gray-200">
                            Ministering
                        </label>
                        <input
                            type='name'
                            name=''
                            required
                            value={ministering}
                            onChange={(e) => setMinistring(e.target.value)}
                            id="name"
                            placeholder='Enter name of minsiter'
                            className={`${styles.input}`}
                        />
                    </div>

                    <br />
                    <div className='w-full flex justify-between'>
                        <div className='w-[45%]'>
                            <label htmlFor='' className="text-gray-200">
                                Category
                            </label>
                            <select
                                name='category'
                                required
                                value={category}
                                onChange={(e: any) => setCategory(e.target.value)}
                                id="category"
                                className={`${styles.input} text-red-600 custom-select !bg-black`}
                            >
                                 <option >---Select Category---</option>
                                 <option value='Faith'>Faith</option>
                                <option value='Abundance'>Abundance</option>
                                <option value='Family'>Family</option>
                            </select>
                        </div>
                        <div className='w-[45%]'>
                            <label htmlFor='' className="text-gray-200">
                                Approve
                            </label>
                            <select
                                name='category'
                                required
                                value={isApprove}
                                onChange={(e: any) => setIsApprove(e.target.value)}
                                id="category"
                                className={`${styles.input} text-red-600 custom-select !bg-black`}
                            >
                                <option value='False'>False</option>
                                <option value='True'>True</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='' className="text-gray-200">
                            Video Id
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={videoId}
                            onChange={(e: any) => setVideoId(e.target.value)}
                            id="tags"
                            placeholder='Eg. xyghdh,'
                            className={`${styles.input}`}
                        />
                    </div>
                    <br />

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
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${thumbnail ? "bg-blue-500" : "bg-transparent"
                            }`}

                    >
                        {thumbnail || thumbnailEdit ? (
                            <img src={thumbnail || thumbnailEdit}
                                alt=''
                                className='max-h-full w-full object-cover' />
                        ) : (
                            <span className='text-black dark:text-white'>
                                Your thumbnail will appear here
                            </span>
                        )}


                    </label>
                    <br />
                    <div className='w-full flex items-center justify-end'>
                        <input

                            type='submit'
                            value="Submit"
                            className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
                    </div>

                </form>

            </div>
        </div>
    )
}