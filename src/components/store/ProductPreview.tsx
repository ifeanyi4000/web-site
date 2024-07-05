import { Link, useParams } from 'react-router-dom';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import { IoArrowBackOutline } from 'react-icons/io5';
import Loader from '../loader/Loader';

type Props = {}

export default function ProductPreview({ }: Props) {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true });
    const productDataFind = data?.find((i: any) => i?._id === id);


    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };


    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
            <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/store">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>
                        <div className='text-[25px] font-semibold text-white'>Product Detail</div>
                    </div>
                </div>
            </div>
            {isLoading ? <Loader /> :
                <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
                    <div className="product-details">
                        <h1 className='text-gray-100 mb-1 text-[25px] font-medium'>Name: {productDataFind?.name}</h1>
                        <p className='text-gray-100 mb-1 text-[18px] font-medium'>Price: {formatCurrency(productDataFind?.price)}</p>
                        <p className='text-gray-100 mb-1 text-[18px] font-medium'>Offer Price: {formatCurrency(productDataFind?.offer)}</p>
                        <p className='text-gray-100 mb-1 text-[18px] font-medium'>Category: {productDataFind?.category}</p>
                        <p className='text-gray-100 mb-1 text-[18px] font-medium'>Description: {productDataFind?.desc}</p>
                        <p className='text-gray-100 mb-1 text-[18px] font-medium'>Stock: {productDataFind?.stock}</p>
                        <p className='text-gray-100 mb-1 text-[18px] font-medium'>Approved: {productDataFind?.isApprove ? "Yes" : "No"}</p>
                        <div className="flex flex-row ">
                            {productDataFind?.images?.map((image: any) => (
                                <img key={image._id} src={image.url} alt={`Image of ${productDataFind?.name}`} className='h-[200px] w-[200px] ml-3 mt-6' />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}