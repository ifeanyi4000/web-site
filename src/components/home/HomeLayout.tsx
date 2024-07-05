import { useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import MobileSideBar from '../navBar/MobileSideBar'
import AllAdminTitheRecords from './titheRecords/AllAdminTitheRecords'
import { useGetAllOrdersQuery } from '../../redux/features/order/paytitheOrder'
import Loader from '../loader/Loader'
import NotificationIcon from '../notification/NotificationIcon'

type Props = {}

export default function HomeLayout({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)
    const { isLoading, data } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true })
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    };

    const search = (term:any) => {
        const filteredUsers = data?.orders?.filter((user:any) => {
            // Convert tithe_number to string and number for searching
            const searchFields = [
                user.name.toLowerCase(),
                user.tithe_number.toString(),
                user.tithe_number // Keep the number format for comparison
            ];

            // Check if any field includes the search term (string) or matches the term (number)
            return searchFields.some((field) => {
                if (typeof field === 'number' && !isNaN(term)) {
                    // Compare numbers directly
                    return field === Number(term);
                } else {
                    // Compare strings
                    return field.toString().toLowerCase().includes(term.toString().toLowerCase());
                }
            });
        });
        setSearchResults(filteredUsers);
    };
    const orderList = searchTerm ? searchResults : data?.orders;

    return (
        <>
            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                    <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                        <CiMenuFries className='text-2xl text-gray-500' />
                    </div>
                    <div className='hidden md:flex flex-row items-center bg-slate-200 rounded-r-md mr-5 '>
                        <div className='px-2'>
                            <FaSearch className='text-lg text-gray-900' />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, or  tithe number"
                            value={searchTerm}
                            onChange={handleChange}
                            className='py-2 text-sm px-3 outline-none w-full text-black h-[35px] text-base'
                        />
                    </div>

                    <div>
                        <div className='flex flex-row items-center '>

                            <NotificationIcon />
                        </div>
                    </div>


                </div>
                <div className='p-3'>
                    <div className='flex gap-3 justify-start items-start'>
                        <div className='flex uppercase items-center  text-white px-3 py-2 rounded-sm text-sm md:text-2xl font-medium'>
                            New Tithe Records
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-3 max-w-[80%'>
                        {isLoading ? <Loader /> : (
                            <AllAdminTitheRecords orderList={orderList} />
                        )}
                    </div>

                </div>
                <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
            </div>
        </>
    )
}