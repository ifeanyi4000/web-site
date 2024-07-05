import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material'
import { format } from 'timeago.js'
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";


type Props = {
    orderlist: any
}

export default function CatheralTable({ orderlist }: Props) {

    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

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
        { field: "type", headerName: "Type", flex: 0.6 },
        { field: "ref", headerName: "Payment Ref", flex: 0.8 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "view  ", headerName: "View", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <Link to={`/view-profile/${params.row.id}`}>
                                <FiEye className="text-white" size={20} />
                            </Link>
                        </Button>
                    </>

                )
            }
        },
    ]

    const rows: any = []

    {
        orderlist && orderlist.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                amount: item.amount,
                type: item.type,
                ref: item.payment_info,
                createdAt: format(item.createdAt)
            })
        })
    }

    return (
        <>

            <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
                <Box>
                    <Box m="40px 0 0 0" height="70vh" sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            outline: "none"
                        },
                        "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-sortIcon": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-row": {
                            color: "#ebedf0",
                            borderBottom: "1px solid #ccc!important"
                        },
                        "& .MuiTablePagination-root": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .name-column-cell": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#A4A9FC",
                            color: "#091e42",
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            // backgroundColor: "#ebedf0"
                        },
                        "& .MuiDataGrid-footerContainer": {
                            color: "#ebedf0",
                            borderTop: "none",
                        },

                        "& .MuiTablePagination-caption": {
                            color: "#ebedf0",
                        },
                        "& .MuiTablePagination-select": {
                            color: "#ebedf0",
                        },
                        "& .MuiTablePagination-actions": {
                            color: "#ffffff",
                        },
                        "& .MuiCheckbox-root": {
                            color: `#000 !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `#ebedf0 !important`,
                        },
                    }}
                    >
                        <DataGrid checkboxSelection rows={rows} columns={columns} />
                    </Box>

                </Box>
            </div>
        </>
    )
}

