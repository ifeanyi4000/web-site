import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGetIncomeAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi';
import { styles } from '../../styles/style';

type Props = {}

export default function AdminIncomeAnalytics({ }: Props) {
    const { data } = useGetIncomeAnalyticsQuery({})
    const analyticsData = data?.order?.last12Months?.map((item: any) => ({
        name: item.month,
        Income: item.totalAmount
    }));

    const minValue = 0

    return (
        <div>
            <div>

                <div className=" " >
                    <div className="mb-5">
                        <h1 className={`${styles.label} !text-[34px] px-5 !text-start dark:text-white`}>
                            Income Analytics
                        </h1>

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
                                <Area type='monotone' dataKey="Income" stroke='#4d6249' fill='#4d62d9' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div >
    )
}

