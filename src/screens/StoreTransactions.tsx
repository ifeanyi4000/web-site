import OrderLayout from '../components/storeOrder/OrderLayout'
import Sidebar from '../components/navBar/Sidebar'

type Props = {}

export default function StoreTransactions({}: Props) {
  return (
    <>
    <div className='flex lg:hidden overflow-hidden overflow-x-hidden bg-gray-900'>
      <div className='flex-1 overflow-y-auto'>
      <OrderLayout />
      </div>
    </div>
    <div className='hidden lg:flex h-screen overflow-hidden overflow-x-hidden bg-[#202d49]'>
      <div className='basis-[0%] lg:basis-[15%] h-[100vh]'>
        <Sidebar />
      </div>
      <div className='basis-[85%]'>
        <OrderLayout />
      </div>
    </div>
  </>
  )
}