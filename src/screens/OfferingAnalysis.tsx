import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    AreaChart, XAxis, YAxis, Area
} from 'recharts';
import { useGetOfferingAnalyticsQuery } from '../redux/features/analytics/analyticsApi';
import { useGetAllOfferingQuery, useGetTotalOfferingQuery } from '../redux/features/give/offeringApi';

const PieChartComponent = () => {
    const { data: x, isLoading, isError, refetch } = useGetOfferingAnalyticsQuery({});
    const { data: offering } = useGetTotalOfferingQuery({})
    const { data} = useGetAllOfferingQuery({});

    const aggregateData = (data: any) => {
        const aggregated = data?.offerings?.reduce((acc: any, offering: any) => {
            const existingType = acc?.find((item: any) => item.type === offering.type);
            if (existingType) {
                existingType.amount += offering.amount;
            } else {
                acc.push({ type: offering?.type, amount: offering?.amount });
            }
            return acc;
        }, []);
        return aggregated;
    };
    
    const aggregatedData = aggregateData(data);
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
    const analyticsData = x?.order?.last12Months?.map((item: any) => ({
        name: item.month,
        Income: item.totalAmount
    }));

    const minValue = 0

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

       // currency Converter
       const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
            <div className='border-b border-gray-700 shadow-md bg-gray-900'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>
                        <div className='text-[25px] font-semibold text-white'>Offering Analysis</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6'>
            <h4 className='text-blue-50 text-[16px] my-2'>Total income</h4>
            <h1 className="text-[20px] md:text-[35px] text-yellow-300">{formatCurrency(offering?.totalAmount)}</h1>
                <ResponsiveContainer width="100%" height={380}>
                    <PieChart>
                        <Pie
                            data={aggregatedData}
                            dataKey="amount"
                            nameKey="type"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {aggregatedData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6'>
                <h4 className='text-blue-50 text-[16px] my-2'>Monthly Total Offering Income</h4>
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
    </div >
  );
};

export default PieChartComponent;





