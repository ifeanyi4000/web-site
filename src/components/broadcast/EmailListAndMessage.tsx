import React, {useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai';
import { useCreateMessageMutation, useDeleteMessagesMutation, useGetAllMessagesQuery } from '../../redux/features/marketing/marketingApi';
import { toast } from 'react-toastify';
import { format } from 'timeago.js'
import { styles } from '../styles/style';
import Loader from '../loader/Loader';

type Props = {}

export default function EmailListAndMessage({ }: Props) {
    const { isLoading, data, refetch } = useGetAllMessagesQuery({}, { refetchOnMountOrArgChange: true })

    const [createMessage, { error: updateError, isSuccess: updateSuccess, isLoading: loading }] = useCreateMessageMutation({})

    const [deleteMessages, { error: ErrorDelete, isSuccess }] = useDeleteMessagesMutation({})
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [userId, setUserId] = useState("")

    const [message, setMessage] = useState("")
    const [subject, setSubject] = useState("")

    const dataReg = {
        message,
        subject
    }

    const handleUpdateRole = async () => {
        const data = dataReg
        await createMessage(data)

    }


    const handleDelete = async () => {
        const id = userId;
        await deleteMessages(id)
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
            toast.success("Email sent and created successfully!")
            setActive(false)
        }

        if (isSuccess) {
            refetch()
            toast.success("User deleted successfully")
            setOpen(false)
        }
        if (ErrorDelete) {
            if ("data" in ErrorDelete) {
                const errorMessage = ErrorDelete as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, ErrorDelete, updateError, updateSuccess])



    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "from", headerName: "From", flex: 0.4 },
        { field: "to", headerName: "Reciepients", flex: 0.4 },
        { field: "subject", headerName: "Subject", flex: 0.6 },
        { field: "message", headerName: "Message", flex: 1 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "", headerName: "Delete", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setOpen(!open)
                            setUserId(params.row.id)
                        }}>
                            <AiOutlineDelete className="dark:text-white text-black" size={20} />
                        </Button>
                    </>
                )
            }
        },

    ]

    const rows: any = []

    {
        data && data.forEach((item: any) => {
            rows.push({
                id: item._id,
                from: item.from,
                to: item.to,
                subject: item.subject,
                message: item.message,
                createdAt: format(item.createdAt)
            })
        })
    }


    return (
        <>
            {isLoading ? <Loader /> : (
                <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
                    <Box>
                        <div className='w-full flex justify-end'>
                            <div className={`${styles.button} !w-[130px] md:!w-[180px]  !text-white !text-[12px] md:!text-sm`}
                                onClick={() => {
                                    setActive(!active)
                                }}>
                                Send New Message
                            </div>
                        </div>
                        <Box m="40px 0 0 0" height="60vh" sx={{
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
                                <Box className="absolute top-[20%] left-[50%] w-[90%] md:w-[60%] lg:w-[35%] -translate-x-1/2 bg-gray-800   p-3 rounded-md">
                                    <h1 className={`${styles.title} !text-lg dark:!text-white`}>
                                        Users Email Marketing
                                    </h1>
                                    <div className='flex w-full items-center flex-col mb-6 mt-3'>
                                        <input type='text'
                                            placeholder='Enter email subject'
                                            className={`${styles.input}`}
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />

                                        <br />
                                        <textarea name='' id='' cols={30} rows={8}
                                            placeholder='Write new message...'
                                            value={message}
                                            onChange={(e: any) => setMessage(e.target.value)}
                                            className={`${styles.input} h-[20vh] p-2`}></textarea>



                                        <div className={`${styles.button} h-[30px] bg-blue-400 !rounded-md mt-6 !text-sm`}
                                            onClick={handleUpdateRole}
                                        >
                                            Send Message
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
                                <Box className="absolute top-[30%] left-[50%] -translate-x-1/2 bg-white p-3 rounded-md">
                                    <h1 className={`${styles.title} !text-sm md:!text-lg`}>
                                        Are you sure you want to delete message?
                                    </h1>
                                    <div className='flex w-full items-center justify-around mb-6 mt-3'>
                                        <div className={`${styles.button} !w-[100px] h-[25px] bg-[#57c7a3] !text-sm`}
                                            onClick={() => setOpen(!open)}
                                        >
                                            Cancel
                                        </div>
                                        <div className={`${styles.button} !w-[100px] h-[30px] bg-[crimson] !text-sm`}
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
