import { IoArrowBackOutline } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { useGetUserOrderForUserQuery } from '../redux/features/order/paytitheOrder';
import { DataGrid } from "@mui/x-data-grid";
import { Box } from '@mui/material'
import Loader from '../components/loader/Loader';

type Props = {}

export default function SeeAllOnlineTithesPaid({ }: Props) {
    const { id: ID } = useParams<{ id: string }>();
    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    const { data, isLoading } = useGetUserOrderForUserQuery(ID)
    const datax = data?.orders
    
    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.5 },
        {
            field: "amount", headerName: "Amount", flex: 0.4, renderCell: (params: any) => {
                return (
                    <div>
                        {formatCurrency(params.row.amount)}
                    </div>
                )
            }
        },
        { field: "tithe", headerName: "Tithe Number", flex: 0.3 },
        { field: "type", headerName: "Account Type", flex: 0.3 },
        {
            field: "offline ", headerName: "Paid", flex: 0.3, renderCell: (params: any) => {
                return (
                    <div>
                        <div className='bg-green-800 text-white text-base p-1 rounded-md mt-1 text-center'>Online</div>
                    </div>

                )
            }
        },
        { field: "month", headerName: "Month", flex: 0.3 },
    ]


    const rows: any = []


    {
        datax && datax?.map((item: any) => {
            rows.push({
                id: item?._id,
                avatar: item?.avatar?.url,
                name: item?.name,
                amount: item?.amount,
                tithe: item?.tithe_number,
                type: item?.accountType,
                month: item?.month,
            })
        })
    }
    
    return (
        <>
            <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto pb-10 '>
                <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                    <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                        <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6 flex flex-row gap-5 items-center'>
                            <Link to="/app-users">
                                <div>
                                    <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                                </div>
                            </Link>


                            <div className='text-[25px] font-semibold text-white'>User Online Tithe Paid </div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-24'>

                    <>
                        {isLoading ? <Loader /> : (
                            <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
                                <Box>
                                    <Box m="40px 0 0 0" height="80vh" sx={{
                                        "& .MuiDataGrid-root": {
                                            border: " none",
                                            outline: "none"
                                        },
                                        "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                            color: "#ffffff"
                                        },
                                        "& .MuiDataGrid-sortIcon": {
                                            color: "#FFFFFF"
                                        },
                                        "& .MuiDataGrid-row": {
                                            color: "#FFFFFF",
                                            borderBottom:
                                                "1px solid #ccc!important"
                                        },
                                        "& .MuiTablePagination-root": {
                                            color: "#ffffff"
                                        },
                                        "& .MuiDataGrid-cell": {
                                            borderBottom: "none"
                                        },
                                        "& .name-column-cell": {
                                            color: "#ffffff"
                                        },
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "#A4A9FC",
                                            color: "#000",
                                            borderBottom: "none"
                                        },
                                        "& .MultiDataGrid-virtualScroller": {
                                            backgroundColor: "#1f2a40"
                                        },
                                        "& .MultiDataGrid-footerContainer": {
                                            color: "#000",
                                            borderTop: "none",
                                            backgroundColor: "#A4A9FC",
                                        },
                                        "& .MultiCheckbox-root": {
                                            color: `#000 !important`,
                                        },
                                        "& .MultiDataGrid-toolbarContainer .MuiButton-text": {
                                            color: `#fff !important`,
                                        },
                                    }}
                                    >
                                       <DataGrid checkboxSelection rows={rows} columns={columns} />
                                    </Box>

                                </Box>
                            </div>
                        )}
                    </>
                </div>

            </div>
        </>
    )
}

