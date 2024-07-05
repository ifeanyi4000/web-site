import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from "react-icons/fi"
import { format } from 'timeago.js'
import { styles } from '../styles/style';
import { useDeleteSermonMutation } from '../../redux/features/sermon/sermonApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdOndemandVideo } from 'react-icons/md';


type Props = {
    sermons: any;
    refetch: any
} 

export default function SermonTable({ sermons, refetch }: Props) {
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [blogId, setBlogId] = useState("")

    const [deleteBlog, { error, isSuccess }] = useDeleteSermonMutation({})

    const handleDelete = async () => {
        const id = blogId
        await deleteBlog(id)
    }
    // play youtube video
    // Check if ID exists and create the YouTube embed URL
    const video = `https://www.youtube.com/embed/${blogId}`

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Sermon deleted successfully")
            setOpen(false)
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "avatar",
            headerName: "Cover",
            flex: 0.7,
            renderCell: (params: any) => {
                return <div className='flex justify-center items-center mt-3'>
                    <img src={params?.row?.avatar || "/noavatar.png"} alt="" className='h-[35px] w-[35px] rounded-full flex justify-center items-center' />
                </div>
            },
        },
        { field: "name", headerName: "Title", flex: 1 },
        { field: "category", headerName: "Category", flex: 0.5 },
        { field: "status", headerName: "Status", flex: 0.5 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "view ", headerName: "Video", flex: 0.4, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setActive(!active)
                            setBlogId(params.row.view)
                        }}>
                            <MdOndemandVideo className="dark:text-red-500 text-black" size={30} />
                        </Button>
                    </>
                )
            }
        },

        {
            field: " edit   ", headerName: "Edit", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/edit-sermon/${params.row.id}`}>
                            <Button>
                                <FiEdit2 className="dark:text-green-500 text-black" size={20} />
                            </Button>
                        </Link>
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
        sermons && sermons.forEach((item: any) => {
            rows.push({
                id: item._id,
                avatar: item?.thumbnail?.url,
                name: item.title,
                category: item.category,
                status: item.isApprove,
                view: item.videoId,
                createdAt: format(item.createdAt)
            })
        })
    }

    return (
        <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
            <Box m="20px">
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
                {open && (
                    <Modal
                        open={open}
                        onClose={() => setOpen(!open)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="absolute top-[30%] left-[50%] -translate-x-1/2 dark:bg-gray-700 p-3 rounded-md">
                            <h1 className={`${styles.title} !text-lg !font-normal dark:text-white`}>
                                Are you sure you want to delete this Sermon ?
                            </h1>
                            <div className='flex w-full items-center justify-around mb-6 mt-3'>
                                <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] !text-sm`}
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

                {active && (
                    <Modal
                        open={active}
                        onClose={() => setActive(!active)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="absolute top-[30%] left-[50%] w-[40%] -translate-x-1/2 dark:bg-gray-700 p-3 rounded-md">
                            <div style={{ position: "relative", width: "100%", height: "0", paddingBottom: "56.25%" }}>
                                <iframe
                                    style={{
                                        border: 0,
                                        width: "100%",
                                        height: "100%",
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                    src={video}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </Box>
                    </Modal>
                )}
            </Box>
        </div >
    )
}

