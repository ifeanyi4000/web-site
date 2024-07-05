import { useState } from 'react'
import { CiEdit, CiMenuFries } from 'react-icons/ci'
import MobileSideBar from '../navBar/MobileSideBar'
import { Link } from 'react-router-dom'
import { RxReset } from "react-icons/rx";
import PasswordReset from '../setupProfile/PasswordReset'
import { useGetUserInfoQuery } from '../../redux/features/user/userApi'
import Loader from '../loader/Loader'
import NotificationIcon from '../notification/NotificationIcon'
type Props = {}

export default function Profile({ }: Props) {
    const [open, setOpen] = useState(false)
    const { isLoading, data } = useGetUserInfoQuery({}, { refetchOnMountOrArgChange: true })
    const toggleSidebar = () => setOpen(prev => !prev)
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };

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
                <div className='p-3'>
                    <div className='flex gap-3 justify-end items-end'>
                        <Link to="/profile-setup">
                            <div className='flex items-center shadow-xl hover:bg-green-500 text-white bg-[#427dae] px-3 py-2 rounded-sm text-base cursor-pointer'>
                                Edit Profile
                                <CiEdit className=' text-xl text-white ml-1' />
                            </div>
                        </Link>
                        <div onClick={openModal} className='flex items-center shadow-xl hover:bg-green-500 text-white bg-green-700 px-3 py-2 rounded-sm text-base cursor-pointer'>
                            Reset Password
                            <RxReset className=' text-xl text-white ml-1' />
                        </div>
                    </div>
                    {isLoading ? <Loader /> :
                        <div className='flex flex-col-reverse md:flex-row gap-3 max-w-[80%'>
                            <div className='basis-[100%] lg:basis-[75%] bg-gray-100 rounded-md my-3 p-3 shadow-black'>
                                <h1 className="text-gray-700 font-medium text-[25px]">Personal Information</h1>
                                <div className='grid grid-cols-2 gap-3 mt-4'>
                                    <div className='text-gray-700 text-sm md:text-[18px]'><strong>Name: {""}</strong>{data?.user?.name} </div>
                                    <div className='text-gray-700 text-sm md:text-[18px]'><strong>Email: {""}</strong>{data?.user?.email} </div>
                                    <div className='text-gray-700 text-sm md:text-[18px]'><strong>Phone: {""}</strong>{data?.user?.phone_number} </div>
                                    <div className='text-gray-700 text-sm md:text-[18px]'><strong>Account Type: {""}</strong>{data?.user?.accountType}</div>
                                    <div className='text-green-700 text-sm md:text-[18px] font-bold'><strong className='text-gray-700'>Tithe Number: {""}</strong>{data?.user?.tithe_number} </div>
                                    {data?.user?.accountType == "Membership" || data?.user?.is_employed !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Employement Status: {""}</strong>{data?.user?.is_employed}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.h_name !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>House Fellowship: {""}</strong>{data?.user?.h_name} </div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.started_since !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Started worshiping since: {""}</strong>{data?.user?.started_since}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.accountType == "Friends of the commission" || data?.user?.gender !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Gender: {""}</strong>{data?.user?.gender}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.accountType == "Friends of the commission" || data?.user?.date_of_birth !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Date of Birth: {""}</strong>{data?.user?.date_of_birth}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.occupation !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Occupation: {""}</strong>{data?.user?.occupation} </div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.accountType == "Friends of the commission" || data?.user?.marrital_status !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Marital Status: {""}</strong>{data?.user?.marrital_status}</div>
                                    }
                                    {data?.user?.marrital_status == "Married" || data?.user?.accountType == "Membership" || data?.user?.married_to !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Married to: {""}</strong>{data?.user?.married_to}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.address !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Address: {""}</strong>{data?.user?.address}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.accountType == "Friends of the commission" || data?.user?.location !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>City: {""}</strong>{data?.user?.location}</div>
                                    }
                                    {data?.user?.accountType == "Membership" || data?.user?.accountType == "Friends of the commission" || data?.user?.country !== "" &&
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Country: {""}</strong>{data?.user?.country}</div>
                                    }
                                </div>
                                {data?.user?.accountType == "Ministry" &&
                                    <h1 className="text-gray-700 font-medium text-[25px] mt-5">Church Information</h1>
                                }
                                {data?.user?.accountType == "Ministry" &&
                                    <div className='grid grid-cols-2 gap-3 mt-4 '>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Name: {""}</strong>{data?.user?.church_name} </div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Address: {""}</strong>{data?.user?.church_address}</div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Country: {""}</strong>{data?.user?.church_country}</div>
                                    </div>
                                }
                                {data?.user?.is_employed == "Employed" &&
                                    <h1 className="text-gray-700 font-medium text-[25px] mt-5">Employement Information</h1>
                                }
                                {data?.user?.is_employed == "Employed" &&
                                    <div className='grid grid-cols-2 gap-3 mt-4 '>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Works at: {""}</strong>{data?.user?.works_at} </div>
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>Your Monthly Income is: {""}</strong>{data?.user?.salary_expection}</div>
                                        <CalculateByPercent income={data?.user?.salary_expection} />
                                        <div className='text-gray-700 text-sm md:text-[18px]'><strong>You started working since: {""}</strong>{data?.user?.working_since}</div>
                                    </div>
                                }
                                {data?.user?.accountType == "Membership" &&
                                    <h1 className="text-gray-700 font-medium text-[25px] mt-5">Service Group</h1>
                                }
                                {data?.user?.accountType == "Membership" &&
                                    <div className='grid grid-cols-2 gap-3 mt-4 '>
                                        {
                                            data?.user?.service_group?.map((i: any, index: number) => (
                                                <div className='text-blue-700 text-sm md:text-[18px]' key={index}>{i.title}</div>

                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            {data?.avatar?.url &&
                                <div className='basis-[100%] lg:basis-[35%] mt-3'>
                                    <div className='bg-white p-2 rounded-md shadow-black'>
                                        <div className='flex justify-center items-center'>
                                            <img src={data?.user?.avatar?.url} alt='' />
                                        </div>
                                        <div className='mt-2 text-gray-700 text-base text-center'>Profile image</div>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                </div>
                <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
            </div>
            {isOpen && (
                <Modal setIsOpen={setIsOpen} />
            )}
        </>
    )
}

const CalculateByPercent = ({ income }: any) => {
    const numericIncome = Number(income.replace(/,/g, ''));
    const tenPercent = numericIncome * 0.1;
    return (
        <div>10% of Amount: ₦{tenPercent}</div>
    )
}


const Modal = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg z-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Reset Password</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={closeModal}
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
                <PasswordReset setIsOpen={setIsOpen} />
            </div>
        </>

    );
};
