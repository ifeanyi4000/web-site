import React, { useState } from 'react'
import NotificationIcon from '../notification/NotificationIcon'
import { CiMenuFries } from 'react-icons/ci'
import { FaSquarePlus } from 'react-icons/fa6'
import MobileSideBar from '../navBar/MobileSideBar'
import { Link } from 'react-router-dom'
import SermonTable from './SermonTable'
import { FaSearch } from 'react-icons/fa'
import { useGetAllSermonQuery } from '../../redux/features/sermon/sermonApi'
import Loader from '../loader/Loader'

type Props = {}

export default function SermonLayout({ }: Props) {
    const [open, setOpen] = useState(false)

    const { isLoading: loadingx, data: datax, refetch } = useGetAllSermonQuery({}, { refetchOnMountOrArgChange: true })

    const toggleSidebar = () => setOpen(prev => !prev)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    };

    const search = (term: any) => {
        const filteredOfferings = datax?.filter((sermon: any) => {
            const searchFields = [sermon.title.toString()];
            return searchFields.some((field) =>
                field.toLowerCase().includes(term.toLowerCase())
            );
        });
        setSearchResults(filteredOfferings);
    };

    const sermonList = searchTerm ? searchResults : datax

    return (
        <>

            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                    <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                        <CiMenuFries className='text-xl md:text-2xl text-white' />
                    </div>
                    <div className='hidden md:flex flex-row items-center bg-slate-200 rounded-r-md mr-5 '>
                        <div className='px-2'>
                            <FaSearch className='text-lg text-gray-900' />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleChange}
                            className='py-2 px-3 outline-none w-full text-black h-[35px] text-base'
                        />
                    </div>

                    <div>
                        <div className='flex flex-row items-center '>

                            <NotificationIcon />
                        </div>
                    </div>


                </div>
                <div className='p-3'>
                    <div className='flex gap-3 justify-end items-end'>
                        <Link to="/create-sermon">
                            <button className='flex items-center shadow-xl hover:bg-green-500 text-white bg-[#427dae] px-3 py-2 rounded-sm text-base'>
                                Create Sermon
                                <FaSquarePlus className=' text-xl text-white ml-1' />
                            </button>
                        </Link>

                    </div>
                    {loadingx ? <Loader /> :
                        <div className='flex flex-col-reverse lg:flex-row gap-3'>
                            <div className='rounded-md my-3 shadow-black w-full' >
                                <h1 className="text-gray-100 text-[25px] ml-4 uppercase">All Sermon</h1>
                                <SermonTable sermons={sermonList} refetch={refetch} />
                            </div>
                        </div>
                    }
                    <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
                </div>

            </div>
        </>
    )
}

