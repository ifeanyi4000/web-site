import React, { useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { useGetOrdersAnalyticsQuery } from '../redux/features/analytics/analyticsApi'
import { useGetTotalIncomeQuery } from '../redux/features/order/paytitheOrder'
import AdminIncomeAnalytics from '../components/analytics/expenses/AdminIncomeAnalytics'

type Props = {}

export default function OrderAnalysis({ }: Props) {

    const { data, isLoading, isError, refetch } = useGetOrdersAnalyticsQuery({});

    useEffect(() => {
        refetch(); // Fetch data when the component mounts or whenever it re-renders
    }, [refetch]);

    // Transform data for rendering in the chart
    const analyticsData = data?.order.last12Months.map((item: any) => ({
        name: item.month,
        count: item.count
    })) || [];

    const { data: income } = useGetTotalIncomeQuery({})

    const data1 = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },]

    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    return (
        <>
            <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
                <div className=' border-b border-gray-700 shadow-md bg-gray-900'>
                    <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                        <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6 flex flex-row gap-5 items-center'>
                            <Link to="/">
                                <div>
                                    <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                                </div>
                            </Link>


                            <div className='text-[25px] font-semibold text-white'>Paid Tithe Analysis </div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6'>
                <h4 className='text-blue-50 text-[16px] my-2'>Total Tithe income</h4>
                <h1 className="text-[20px] md:text-[35px] text-yellow-300 mb-7">{formatCurrency(income?.totalAmount)}</h1>
                    <div className="w-full"> 
                        <ResponsiveContainer width="100%" height={380}>
                            <AreaChart data={data?.order?.last12Months}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type='monotone' dataKey="count" stroke='#4d6249' fill='#4d62d9' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <AdminIncomeAnalytics />
                </div>

            </div>
        </>
    )
}