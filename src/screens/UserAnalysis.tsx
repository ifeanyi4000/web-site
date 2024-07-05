import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis} from 'recharts'
import { useGetUsersAnalyticsQuery } from '../redux/features/analytics/analyticsApi'

type Props = {}

export default function UserAnalysis({ }: Props) {

    const { data, isLoading } = useGetUsersAnalyticsQuery({})
    const analyticsData: any = []
    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count })
    })

    const minValue = 0
    return (
        <>
            <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
                <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                    <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                        <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6 flex flex-row gap-5 items-center'>
                            <Link to="/">
                                <div>
                                    <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                                </div>
                            </Link>


                            <div className='text-[25px] font-semibold text-white'>Users Analysis </div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-24'>
                    <div className="w-full">
                        <ResponsiveContainer width="100%" height={500}>
                            <AreaChart data={analyticsData} margin={{ top: 20, right: 30, bottom: 0 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type='monotone' dataKey="count" stroke='#4d6249' fill='#4d62d9' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </>
    )
}