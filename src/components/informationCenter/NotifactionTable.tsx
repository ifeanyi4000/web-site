import React, { useState } from 'react'
import MobileSideBar from '../navBar/MobileSideBar'
import { CiMenuFries } from 'react-icons/ci'
import Notification from './Notification'
import NotificationIcon from '../notification/NotificationIcon'


type Props = {}

export default function NotifactionTable({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)

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

            <div className='p-3'>
                <div className='flex flex-col w-full'>
                    <h1 className='text-2xl font-medium uppercase text-gray-100 mb-5'>Notification</h1>
                    <Notification />
                </div>

            </div>

            <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
        </div >
    )
}