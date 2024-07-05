import { Link } from 'react-router-dom';
import { useOderCountQuery, useTotalDeliveryStatQuery, useTotalIncomeQuery, useTotalIncomeTaxQuery, useTotalRejectedOrderStatQuery } from '../../redux/features/storeOrder/storeOrderApi';
import { FaMagnifyingGlassChart } from 'react-icons/fa6';

type Props = {}

export default function OrderCount({ }: Props) {
    const { data } = useOderCountQuery<any>({});
    const { data: income } = useTotalIncomeQuery<any>({});
    const { data: rejected } = useTotalRejectedOrderStatQuery<any>({});
    const { data: tax } = useTotalIncomeTaxQuery<any>({});
    const { data: d_fee } = useTotalDeliveryStatQuery<any>({});

    // currency Converter
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3  h-[15vh">
            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                <h1 className="text-[16px] md:text-[20px] text-white uppercase">Order</h1>
                <h4 className='text-blue-50 text-[14px] my-2'>Successful Pickup & Delivery Order</h4>
                <h1 className="text-[16px] md:text-[18px] text-yellow-300">{data?.ordersCount}</h1>

                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to="/store-order-table-view">
                        <div>
                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                        </div>
                    </Link>

                </div>
            </div>
            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                <h1 className="text-[16px] md:text-[20px] text-white uppercase">Rejected Order</h1>
                <h4 className='text-blue-50 text-[14px] my-2'>Total Order Rejected</h4>
                <h1 className="text-[16px] md:text-[18px] text-yellow-300">{rejected?.ordersCount}</h1>
            </div>
            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                <h1 className="text-[16px] md:text-[20px] text-white uppercase">Revenue</h1>
                <h4 className='text-blue-50 text-[14px] my-2'>All Product Sold</h4>
                <h1 className="text-[16px] md:text-[18px] text-yellow-300">{formatCurrency(income?.totalAmount)}</h1>

                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to="/store-order-income-view">
                        <div>
                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                        </div>
                    </Link>

                </div>
            </div>
            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                <h1 className="text-[16px] md:text-[20px] text-white uppercase">Tax</h1>
                <h4 className='text-blue-50 text-[14px] my-2'>All Items Successfully Sold</h4>
                <h1 className="text-[16px] md:text-[18px] text-yellow-300">{formatCurrency(tax?.totalAmount)}</h1>

                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to="/store-order-tax-view">
                        <div>
                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                        </div>
                    </Link>

                </div>
            </div>
            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                <h1 className="text-[16px] md:text-[20px] text-white uppercase">Delivery</h1>
                <h4 className='text-blue-50 text-[14px] my-2'>Delivery Expenses From Day One</h4>
                <h1 className="text-[16px] md:text-[18px] text-yellow-300">{formatCurrency(d_fee?.totalAmount)}</h1>

                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to="/store-order-fee-view">
                        <div>
                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

// Modal table