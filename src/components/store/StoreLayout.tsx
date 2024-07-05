import React, { useState } from 'react'
import { CiDeliveryTruck, CiMenuFries } from 'react-icons/ci'
import NotificationIcon from '../notification/NotificationIcon'
import { Link } from 'react-router-dom'
import { FaSquarePlus } from 'react-icons/fa6'
import ProductTable from './ProductTable'
import MobileSideBar from '../navBar/MobileSideBar'
import { useGetAllProductQuery } from '../../redux/features/product/productApi'
import { FaSearch } from 'react-icons/fa'
import Loader from '../loader/Loader'

type Props = {}

export default function StoreLayout({ }: Props) {
    const [open, setOpen] = useState(false)
    const { isLoading, data, refetch } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true })
    const toggleSidebar = () => setOpen(prev => !prev)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    };

    const search = (term: any) => {
        const filteredOfferings = data?.filter((user: any) => {
            const searchFields = [user.name.toString()];
            return searchFields.some((field) =>
                field.toLowerCase().includes(term.toLowerCase())
            );
        });
        setSearchResults(filteredOfferings);
    };

    const productList = searchTerm ? searchResults : data

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
                        <div className='flex items-center justify-between gap-4'>
                            <Link to="/delivery">
                                <button className='flex items-center shadow-xl hover:bg-orange-600 text-gray-800 bg-orange-300 px-3 py-2 rounded-sm text-base cursor-pointer'>
                                    Delivery Center
                                    <CiDeliveryTruck className=' text-xl text-black ml-1' />
                                </button>
                            </Link>
                            <Link to="/create-product">
                                <button className='flex items-center shadow-xl hover:bg-green-500 text-white bg-[#427dae] px-3 py-2 rounded-sm text-base cursor-pointer'>
                                    Create Product
                                    <FaSquarePlus className=' text-xl text-white ml-1' />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {isLoading ? <Loader /> :
                        <div className='flex flex-col-reverse lg:flex-row gap-3'>
                            <div className='rounded-md my-3 shadow-black w-full' >
                                <h1 className="text-gray-100 text-[25px] ml-4 uppercase">All Product</h1>
                                <ProductTable product={productList} refetch={refetch} />
                            </div>
                        </div>
                    }
                    <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
                </div>

            </div>
        </>
    )
}