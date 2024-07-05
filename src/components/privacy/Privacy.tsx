import React, { useEffect, useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import MobileSideBar from '../navBar/MobileSideBar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useAdminGetUsersQuery } from '../../redux/features/user/userApi'
import { useEditPolicyMutation, useGetAllPrivacyQuery } from '../../redux/features/privacy/privacyApi'
import { toast } from 'react-toastify'
import { styles } from '../styles/style'
import Loader from '../loader/Loader'
import NotificationIcon from '../notification/NotificationIcon'



type Props = {}

export default function Privacy({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)

    const { data: dataP, refetch } = useGetAllPrivacyQuery({}, { refetchOnMountOrArgChange: true })
   
    const { data: Admin } = useAdminGetUsersQuery({})
    const [editPolicy, { isSuccess, isLoading, error }] = useEditPolicyMutation({})
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [detail, setValue] = useState(dataP?.privacy?.detail);
    const newData = Admin && Admin.users.filter((item: any) => item.role === "admin")

    useEffect(() => {
        if (dataP) {
            setTitle(dataP?.privacy?.title)
            setValue(dataP?.privacy?.detail)
        }
    }, [dataP])



    const data = {
        title,
        detail
    }
    const handleSubmit = async () => {
        const id = dataP?.privacy?._id
        await editPolicy({ id, data })

    }


    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Privacy updated successfully")
            setIsOpen(false)
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error])


    return (
        <div className=' h-screen overflow-x-hidden overflow-y-auto'>
            <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                    <CiMenuFries className='text-xl md:text-2xl text-white' />
                </div>
                <div></div>

                <div>
                    <div className='flex flex-row items-center '>

                        <NotificationIcon />
                    </div>
                </div>


            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className='p-3'>
                    <div className='flex flex-col md:flex-row gap-3 md:max-w-[80%] '>
                        <div className=' bg-gray-100 rounded-md my-3 p-3 shadow-xl shadow-black'>
                            <div className=' bg-blue-700'>
                                <div className=' mx-auto max-w-[91%] flex  justify-center items-center py-5 md:py-10 lg:py-16'>
                                    {isOpen == true ? (
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder='Enter Policy Title'
                                            className={`${styles.input} !w-[40%]`}></input>
                                    ) : (
                                        <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row text-4xl text-center justify-center text-white'>
                                            {dataP?.privacy?.title}
                                        </div>
                                    )}

                                </div>
                            </div>

                            {isOpen === true ? (
                                <div className=' mx-auto max-w-[61%] flex  justify-center items-center py-10'>
                                    <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row w-full' >
                                        <ReactQuill
                                            theme="bubble"
                                            value={detail}
                                            onChange={setValue}
                                            placeholder='Write new policy'
                                            className='w-full '
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className=' mx-auto w-full flex flex-col  justify-center items-center py-10'>
                                    {newData && isOpen === false && (
                                        <div className='w-full flex justify-end'>
                                            <div className={`${styles.button} !w-[180px] !mb-4 !text-sm`}
                                                onClick={() => {
                                                    setIsOpen(!isOpen)
                                                }}>
                                                Edit Policy
                                            </div>
                                        </div>
                                    )}
                                    <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row'>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: dataP?.privacy?.detail }}
                                            className='text-sm text-gray-900'
                                        />
                                    </div>
                                </div>
                            )}
                            {isOpen == true && (

                                <button className="!mb-4 w-full !text-sm bg-black text-white py-3 cursor-default"
                                    onClick={handleSubmit}>
                                    Submit
                                </button>

                            )}
                        </div>
                    </div>

                </div>
            )}

            <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
        </div >
    )
}