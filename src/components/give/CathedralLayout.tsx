import React, { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import NotificationIcon from '../notification/NotificationIcon';
import MobileSideBar from '../navBar/MobileSideBar';
import Loader from '../loader/Loader';
import { useGetAllCathedralXQuery } from '../../redux/features/give/cathedralApi';
import CatheralTable from './CathedralTable';

type Props = {};

interface Offering {
  name: string;
  // add other fields as necessary
}

interface CathedralData {
  seed: Offering[];
  data: any;
  isLoading: any
}

export default function CathedralLayout({}: Props) {
  const { isLoading, data } = useGetAllCathedralXQuery<CathedralData>({}, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(prev => !prev);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Offering[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    search(e.target.value);
  };

  const search = (term: string) => {
    if (data) {
      const filteredOfferings = data.seed.filter((user:any) => {
        const searchFields = [user.name.toString()];
        return searchFields.some(field => field.toLowerCase().includes(term.toLowerCase()));
      });
      setSearchResults(filteredOfferings);
    }
  };

  const orderList = searchTerm ? searchResults : data?.seed;

  return (
    <div className='h-screen overflow-x-hidden overflow-y-auto'>
      <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
        <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
          <CiMenuFries className='text-2xl text-white' />
        </div>
        <div className='hidden md:flex flex-row items-center bg-slate-200 rounded-r-md mr-5'>
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
          <div className='flex flex-row items-center'>
            <NotificationIcon />
          </div>
        </div>
      </div>
      <div className='p-3'>
        <div className='flex gap-3 justify-start items-start'>
          <div className='flex items-center text-white px-3 py-2 rounded-sm text-sm md:text-2xl uppercase'>
            SEEDS
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-3'>
          {isLoading ? <Loader /> : <CatheralTable orderlist={orderList} />}
        </div>
      </div>
      <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
    </div>
  );
}
