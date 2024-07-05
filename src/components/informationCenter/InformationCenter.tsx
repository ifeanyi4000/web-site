import React, { useState } from 'react'
import { CiEdit, CiMenuFries } from 'react-icons/ci'
import MobileSideBar from '../navBar/MobileSideBar'
import { RxReset } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useGetAllFaqQuery } from '../../redux/features/fag/faqApi'
import { FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import Loader from '../loader/Loader'
import NotificationIcon from '../notification/NotificationIcon'



type Props = {}

export default function InformationCenter({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)

    const { isLoading, data } = useGetAllFaqQuery({}, { refetchOnMountOrArgChange: true })

    return (
        <>
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
                        <div className='flex gap-3 justify-end items-end'>

                            {data == "" && 
                                <Link to="/manage-faq">
                                    <div className='flex cursor-pointer items-center shadow-xl hover:bg-green-500 text-white bg-green-700 px-3 py-2 rounded-sm text-sm'>
                                        Manage Faq
                                        <RxReset className=' text-xl text-white ml-1' />
                                    </div>
                                </Link>
                            }

                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-3 md:max-w-[70%]'>
                            <div className=' basis-[70%]  bg-gray-100 rounded-md my-3 p-3 shadow-black'>
                                {data?.map((i: any, index: number) => (
                                    <div key={index}>
                                        <div className='flex justify-between items-center flex-row'>
                                            <div className='mb-2 text-xl font-medium'>{i?.name}</div>
                                            <Link to={`/edit-faq/${i._id}`}>
                                                <div className='bg-blue-900 shadow-sm p-[5px] flex cursor-pointer flex-row items-center gap-2 rounded-md text-blue-100 text-sm'>
                                                    <CiEdit className="text-lg text-blue-100" />
                                                    Edit
                                                </div>
                                            </Link>

                                        </div>

                                        <div className='text-sm md:text-[16px] text-gray-700'>{i?.description}</div>
                                        <Faq data={i?.faq} />
                                    </div>
                                ))}
                            </div>
                            <div className=' basis-[30%] '>
                                <div className='bg-white rounded-md my-3 p-3 shadow-black'>
                                    <div className='mb-2 text-xl font-medium'>Contacts</div>
                                    {/* <a href={`tel:064646646646664`}> */}
                                        <div className='flex flex-row mt-4 bg-gray-100 rounded-md my-3 p-3 shadow-xl shadow-gray-500'>
                                            <FaPhoneAlt className='text-xl text-blue-400' />
                                            <p className='pl-2'>907737774747</p>
                                        </div>
                                    {/* </a> */}

                                    {/* <a href={`mailto:help@paytithe.com`}> */}
                                        <div className='flex flex-row mt-4 bg-gray-100 rounded-md my-3 p-3 shadow-xl shadow-gray-500'>
                                            <MdAttachEmail className='text-xl text-blue-400' />
                                            <p className='pl-2'>paythithe@gmail.com</p>
                                        </div>
                                    {/* </a> */}
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
            </div >
        </>
    )
}

const Faq = (data: any) => {

    const [activeId, setActiveId] = useState(null);


    const toggleActive = (id: any) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div>
            {data?.data?.map((faq: any) => (
                <div key={faq._id} className="faq-item">
                    <div
                        className={`text-lg text-blue-500 font-medium cursor-pointer mt-3 ${activeId === faq.id ? 'text-gray-700' : ''}`}
                        onClick={() => toggleActive(faq._id)}
                    >
                        {faq.question}
                    </div>
                    {activeId === faq._id && (
                        <div className="text-gray-700 text-sm md:text-[16px] bg-slate-50 p-2 rounded-md">{faq?.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

