import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import Sidebar from '../components/navBar/Sidebar'
import HomeLayout from '../components/home/HomeLayout'

type Props = {}

export default function HomePage({ }: Props) {
    const { userInfo } = useSelector((state: any) => state.auth)

    return (
        <>
            <div className='flex lg:hidden overflow-hidden overflow-x-hidden bg-gray-900'>
                <div className='flex-1 overflow-y-auto'>
                <HomeLayout />
                </div>
            </div>
            <div className='hidden lg:flex h-screen overflow-hidden overflow-x-hidden bg-[#202d49]'>
                <div className='basis-[0%] lg:basis-[15%] h-[100vh]'>
                    <Sidebar />
                </div>


                <div className='basis-[85%]'>
                    <HomeLayout />
                </div>
            </div>
        </>
    )
}