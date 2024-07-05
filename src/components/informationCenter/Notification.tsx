import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material'
import { GrUpdate } from "react-icons/gr";
import { format } from 'timeago.js'
import { useDeleteNotificationPlusMutation, useEditReadMutation, useGetOrderNotificationQuery } from '../../redux/features/notification/notification';
import { toast } from 'react-toastify';
import { styles } from '../styles/style';
import Loader from '../loader/Loader';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {}

export default function Notification({ }: Props) {
    const { isLoading, data, refetch } = useGetOrderNotificationQuery({}, { refetchOnMountOrArgChange: true })
    const [editRead, { error: updateError, isSuccess: updateSuccess }] = useEditReadMutation({})
    const [deleteNotificationPlus, { error: errorD, isSuccess }] = useDeleteNotificationPlusMutation({})
    const [active, setActive] = useState(false)
    const [currentStatus, setCurrentStatus] = useState("")
    const [status, setStatus] = useState("")
    const [notId, setNotId] = useState("")
    const [open, setOpen] = useState(false)
    const [blogId, setBlogId] = useState("")

    const handleDelete = async () => {
        const id = blogId
        await deleteNotificationPlus(id)
    }


    const handleUpdateStatus = async () => {
        const id = notId

        await editRead({ id, status })

    }

    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message)
            }
        }

        if (updateSuccess) {
            refetch()
            toast.success("Notification status update successfully")
            setActive(false)
        }


    }, [updateError, updateSuccess])

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Notification deleted successfully")
            setOpen(false)
        }
        if (errorD) {
            if ("data" in errorD) {
                const errorMessage = errorD as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, errorD])




    const columns = [
        { field: "id", headerName: "ID", flex: 0.4 },
        { field: "title", headerName: "Title", flex: 0.4 },
        { field: "message", headerName: "Message", flex: 1 },
        { field: "status", headerName: "Status", flex: 0.2 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "", headerName: "Update", flex: 0.5, renderCell: (params: any) => {
                return (
                    <>
                        <Button disabled={params.row.status == "read"} onClick={() => {
                            setActive(!active)
                            setNotId(params.row.id)
                            setCurrentStatus(params.row.status)
                        }}>
                            <GrUpdate className=" text-white" size={20} />
                        </Button>
                    </>
                )
            }
        },
        {
            field: "   delete  ", headerName: "Delete", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setOpen(!open)
                            setBlogId(params.row.id)
                        }}>
                            <AiOutlineDelete className="dark:text-red-500 text-black" size={20} />
                        </Button>
                    </>
                )
            }
        },

    ]

    const rows: any = []

    {
        data && data.notifications.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.title,
                message: item.message,
                status: item.status,
                createdAt: format(item.createdAt)
            })
        })
    }


    return (

        <>
            {isLoading ? <Loader /> : (
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
                        {active && (
                            <Modal
                                open={active}
                                onClose={() => setActive(!active)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[30%] left-[50%] w-[90%] md:w-[50%] lg:w-[30%] -translate-x-1/2 bg-gray-800   p-3 rounded-md">
                                    <h1 className={`${styles.title} !text-lg dark:!text-white`}>
                                        Status - {currentStatus}
                                    </h1>
                                    <div className='flex w-full items-center flex-col mb-6 mt-3'>
                                        <select
                                            name='category'
                                            required
                                            value={status}
                                            onChange={(e: any) => setStatus(e.target.value)}
                                            id="category"
                                            className={`${styles.input} text-red-600 custom-select`}
                                        >
                                            <option value='read'>read</option>
                                        </select>

                                        <div className={`${styles.button} h-[30px] bg-blue-400 !rounded-md mt-6 !text-sm`}
                                            onClick={handleUpdateStatus}
                                        >
                                            Update Status
                                        </div>
                                    </div>

                                </Box>

                            </Modal>
                        )}
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[30%] left-[50%] -translate-x-1/2 dark:bg-gray-700 p-3 rounded-md">
                                    <h1 className={`${styles.title} !text-lg dark:text-white font-normal`}>
                                        Are you sure you want to delete Notification ?
                                    </h1>
                                    <div className='flex w-full items-center justify-around mb-6 mt-3'>
                                        <div className={`${styles.button} !font-medium !w-[120px] h-[30px] bg-[#57c7a3] !text-sm`}
                                            onClick={() => setOpen(!open)}
                                        >
                                            Cancel
                                        </div>
                                        <div className={`${styles.button} !w-[120px] h-[30px] bg-[crimson] !text-sm`}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </div>
                                    </div>

                                </Box>

                            </Modal>
                        )}
                    </Box>
                </div>
            )}
        </>

    )
}

