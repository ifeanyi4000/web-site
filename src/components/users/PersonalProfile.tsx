import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAdminGetUsersQuery } from '../../redux/features/user/userApi';
import { CiMenuFries } from 'react-icons/ci';
import Loader from '../loader/Loader';
import MobileSideBar from '../navBar/MobileSideBar';
import NotificationIcon from '../notification/NotificationIcon';

type Props = {}

export default function PersonalProfile({ }: Props) {
    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState(false)

    const toggleSidebar = () => setOpen(prev => !prev)
    const { data: fetch, isLoading } = useAdminGetUsersQuery({})

    const data = fetch && fetch?.success && fetch?.users?.find((user: any) => user?._id === id);

    console.log(data)

    return (
        <>

            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                    <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                        <CiMenuFries className='text-2xl text-gray-500' />
                    </div>

                    <div></div>

                    <div>
                        <div className='flex flex-row items-center '>

                            <NotificationIcon />
                        </div>
                    </div>


                </div>
                {data ?
                    <div className='p-3'>
                        {data?.role !== "admin" &&
                            <div className="flex flex-row items-center gap-2">
                                {data?._id &&
                                    <div>
                                        <Link to={`/all-tithe-paid-online/${data?._id}`}>
                                            <button className='bg-green-800 p-2 hover:bg-green-600 text-white'>See all Online tithes paid</button>
                                        </Link>
                                    </div>
                                }
                                {data?.tithe_number &&
                                    <div>
                                        <Link to={`/all-tithe-paid/${data?.tithe_number}`}>
                                            <button className='bg-sky-800 p-2 hover:bg-blue-600 text-white'>See all Offline tithes paid</button>
                                        </Link>
                                    </div>
                                }
                            </div>
                        }

                        {isLoading ? <Loader /> :
                            <div className='flex flex-col md:flex-row gap-3 max-w-[80%'>
                                <div className='basis-[100%] lg:basis-[75%] bg-gray-100 rounded-md my-3 p-3 shadow-xl shadow-black'>
                                    <h1 className="text-gray-700 font-medium text-[25px]">Personal Information</h1>
                                    <div className='grid grid-cols-2 gap-3 mt-4'>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Name: {""}</strong>{data?.name} </div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Email: {""}</strong>{data?.email} </div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Phone: {""}</strong>{data?.phone_number} </div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Account Type: {""}</strong>{data?.accountType}</div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Tithe Number: {""}</strong>{data?.tithe_number} </div>
                                        {data?.is_employed !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Employement Status: {""}</strong>{data?.is_employed}</div>
                                        }
                                        {data?.accountType !== "Ministry" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>House Fellowship: {""}</strong>{data?.h_name} </div>
                                        }
                                        {data?.accountType !== "Ministry" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Started worshiping since: {""}</strong>{data?.started_since}</div>
                                        }
                                        {data?.gender !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Gender: {""}</strong>{data?.gender}</div>
                                        }
                                        {data?.date_of_birth !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Date of Birth: {""}</strong>{data?.date_of_birth}</div>
                                        }
                                        {data?.occupation !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Occupation: {""}</strong>{data?.occupation} </div>
                                        }
                                        {data?.marrital_status !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Marital Status: {""}</strong>{data?.marrital_status}</div>
                                        }
                                        {data?.married_to !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Married to: {""}</strong>{data?.married_to}</div>
                                        }
                                        {data?.address !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Address: {""}</strong>{data?.address}</div>
                                        }
                                        {data?.location !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>City: {""}</strong>{data?.location}</div>
                                        }
                                        {data?.country !== "" &&
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Country: {""}</strong>{data?.country}</div>
                                        }
                                    </div>
                                    {data?.accountType == "Ministry" &&
                                        <h1 className="text-gray-700 font-medium text-[25px] mt-5">Church Information</h1>
                                    }
                                    {data?.accountType == "Ministry" &&
                                        <div className='grid grid-cols-2 gap-3 mt-4 '>
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Name: {""}</strong>{data?.church_name} </div>
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Address: {""}</strong>{data?.church_address}</div>
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Country: {""}</strong>{data?.church_country}</div>
                                        </div>
                                    }
                                    {data?.is_employed == "Yes" &&
                                        <h1 className="text-gray-700 font-medium text-[25px] mt-5">Employement Information</h1>
                                    }
                                    {data?.is_employed == "Yes" &&
                                        <div className='grid grid-cols-2 gap-3 mt-4 '>
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Works at: {""}</strong>{data?.works_at} </div>
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>Your monthly income is: {""}</strong>{data?.salary_expection}</div>
                                            <div className='text-gray-700 text-sm md:text-[18px]'><strong>You started working since: {""}</strong>{data?.working_since}</div>
                                        </div>
                                    }
                                    {data?.accountType !== "Ministry" &&
                                        <h1 className="text-gray-700 font-medium text-[25px] mt-5">Service Group</h1>
                                    }
                                    {data?.accountType !== "Ministry" &&
                                        <div className='grid grid-cols-2 gap-3 mt-4 '>
                                            {
                                                data?.service_group?.map((i: any, index: number) => (
                                                    <div className='text-blue-700 text-sm md:text-[18px]' key={index}>{i.title}</div>

                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                                {data?.avatar?.url &&
                                    <div className='basis-[100%] lg:basis-[35%] my-3'>
                                        <div className='bg-white p-2 rounded-md shadow-xl shadow-black'>
                                            <div className='flex justify-center items-center'>
                                                <img src={data?.avatar?.url} alt='' />
                                            </div>
                                            <div className='mt-2 text-gray-700 text-base text-center'>Profile image</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                    :
                    <div className='p-3 flex justify-center items-center'>
                        <h1 className=' text-2xl text-white mt-5'>Account does not exit.</h1>
                    </div>
                }

                <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
            </div>
        </>
    )
}