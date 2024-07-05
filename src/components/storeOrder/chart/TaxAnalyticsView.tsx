import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGetStoreTaxAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type Props = {}

export default function TaxAnalyticsView({ }: Props) {
    const { data } = useGetStoreTaxAnalyticsQuery<any>({})
    const analyticsData = data?.order?.last12Months?.map((item: any) => ({
        name: item.month,
        Tax_Payout: item.totalAmount
    }));


    const minValue = 0

    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
            <div className='border-b border-gray-700 shadow-md bg-gray-900'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/store-transaction-analysis">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>
                        <div className='text-[25px] font-semibold text-white'>Tax Analysis</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6'>
                <div className="mb-5">
                    <p className='px-5 text-white mt-4'>
                        Last 12 months analytics data {""}
                    </p>

                </div>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={analyticsData} margin={{ top: 20, right: 30, bottom: 0 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type='monotone' dataKey="Tax_Payout" stroke='#4d6249' fill='#4d62d9' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div >
    )
}

