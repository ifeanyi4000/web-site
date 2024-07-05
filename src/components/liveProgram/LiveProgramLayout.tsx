import React, { useEffect, useState } from 'react'
import NotificationIcon from '../notification/NotificationIcon'
import { CiMenuFries } from 'react-icons/ci'
import { FaSliders, FaSquarePlus } from 'react-icons/fa6'
import { styles } from '../styles/style'
import { toast } from 'react-toastify'
import { useCreateScheduleMutation, useGetAllScheduleQuery } from '../../redux/features/live/liveServices'
import Schedules from './Schedules'
import LiveFeed from './LiveFeed'
import MobileSideBar from '../navBar/MobileSideBar'
import { Link } from 'react-router-dom'

type Props = {}

export default function LiveProgramLayout({ }: Props) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState("")
    const [info, setInfo] = useState("")

    const [createSchedule, { data, isSuccess, error }] = useCreateScheduleMutation()
    const { data: xy, refetch } = useGetAllScheduleQuery({})

    const toggleSidebar = () => setOpen(prev => !prev)
    const [isOpen, setIsOpen] = useState(false);


    const openModal = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Successfully created a new schedule";
            toast.success(message);
            refetch()
            setIsOpen(false)
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await createSchedule({ info, date })
    }

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
                        <Link to="/manage-slider">
                            <button className='flex items-center shadow-xl hover:bg-orange-500 text-black bg-orange-200 px-3 py-2 rounded-sm text-base cursor-pointer'>
                                Manage Slider
                                <FaSliders className=' text-xl text-black ml-1' />
                            </button>
                        </Link>

                        <button className='flex items-center shadow-xl hover:bg-green-500 text-white bg-[#427dae] px-3 py-2 rounded-sm text-base cursor-pointer' onClick={openModal}>
                            Create Schedule
                            <FaSquarePlus className=' text-xl text-white ml-1' />
                        </button>
                    </div>

                    <div className='flex flex-col-reverse lg:flex-row gap-3 max-w-[80%'>
                        <div className='basis-[100%] lg:basis-[75%] rounded-md my-3 shadow-black'>
                            <h1 className="text-gray-100 text-[25px] uppercase">Schedules</h1>
                            <Schedules x={xy} refetch={refetch} />
                        </div>
                        <div className='basis-[100%] lg:basis-[35%] mt-3 bg-white rounded-md p-2'>
                            <h1 className="text-gray-700 text-[25px] uppercase">Live Feed</h1>
                            <LiveFeed />
                        </div>


                    </div>
                    <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
                </div>

            </div>
            {isOpen &&
                <Modal setDate={setDate} date={date} open={open} setIsOpen={setIsOpen} setInfo={setInfo} info={info} handleSubmit={handleSubmit} />
            }
        </>
    )
}


const Modal = ({ setDate, date, setIsOpen, setInfo, info, handleSubmit }: any) => {

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>

            <div className="fixed top-1/2 left-1/2 transform w-[95%] md:w-[70%]  lg:w-[40%] -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg z-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add Schedule</h2>
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

                <form onSubmit={handleSubmit}>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            Date
                        </label>
                        <input
                            type="date"
                            name=''
                            required
                            value={date}
                            onChange={(e: any) => setDate(e.target.value)}
                            id="name"
                            placeholder="Choose date"
                            className={`${styles.input} !text-gray-700 !text-base`}
                        />
                    </div>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            Information
                        </label>
                        <textarea
                            name=''
                            required
                            maxLength={150}
                            value={info}
                            onChange={(e: any) => setInfo(e.target.value)}
                            id="name"
                            placeholder="Enter description"
                            className={`${styles.input} !text-gray-700 !text-base !py-2`}
                        ></textarea>
                    </div>
                    <div className='w-full flex items-center justify-end'>
                        <input
                            type='submit'
                            value="Create Schedule"
                            className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-base text-white rounded mt-8 cursor-pointer' />
                    </div>
                </form>

            </div>
        </>

    );
};

