import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, } from '@mui/material'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { styles } from "../styles/style";
import { useDeleteScheduleMutation, useUpdateScheduleMutation } from "../../redux/features/live/liveServices";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";


type Props = {
    x: any,
    refetch: any
}

export default function Schedules({ x, refetch }: Props) {
    const [active, setActive] = useState(false)
    const [activeD, setActiveD] = useState(false)
    const [id, setId] = useState("")
    const [updateSchedule, { error: updateError, isSuccess: updateSuccess }] = useUpdateScheduleMutation({})
    const [deleteSchedule, { error: ErrorDelete, isSuccess: success }] = useDeleteScheduleMutation({})
    const [date, setDate] = useState("")
    const [info, setInfo] = useState("")

    const handleUpdateSchedule = async () => {
        await updateSchedule({ id, info, date })
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
            toast.success("Schedule updated successfully")
            setActive(false)
        }

        if (success) {
            refetch()
            toast.success("Schedule deleted successfully")
            setActiveD(false)
        }
        if (ErrorDelete) {
            if ("data" in ErrorDelete) {
                const errorMessage = ErrorDelete as any;
                toast.error(errorMessage.data.message)
            }
        }

    }, [updateError, updateSuccess, ErrorDelete, success])



    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "da", headerName: "Date", flex: 0.5 },
        { field: "in", headerName: "Information", flex: 1 },
        {
            field: "   ", headerName: "Update Service", flex: 0.3, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setActive(!active)
                            setId(params.row.id)
                            setInfo(params.row.in)
                            setDate(params.row.da)
                        }}>
                            <GrUpdate className="text-blue-100 hover:text-red-200" size={20} />
                        </Button>
                    </>
                )
            }
        },
        {
            field: "    ", headerName: "Delete", flex: 0.3, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setActiveD(!activeD)
                            setId(params.row.id)
                        }}>
                            <MdDelete className="text-red-200 hover:text-red-200" size={20} />
                        </Button>
                    </>
                )
            }
        },

    ]

    const rows: any = []


    {
        x && x?.forEach((item: any) => {
            rows.push({
                id: item?._id,
                da: item?.date,
                in: item?.info,
            })
        })
    }

    const handleDelete = async () => {
        await deleteSchedule(id)
    }




    return (
        <>
            <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
                <Box>
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
                            <Box className="absolute top-[30%] left-[50%] w-[90%] md:w-[60%] lg:w-[30%] -translate-x-1/2 bg-gray-800   p-3 rounded-md">
                                <label htmlFor='' className="text-gray-100">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name=''
                                    required
                                    value={date}
                                    onChange={(e: any) => setDate(e.target.value)}
                                    id="name"
                                    placeholder="Choose date"
                                    className={`${styles.input} !text-gray-700 !bg-gray-100 !text-base`}
                                />

                                <div className='my-5 w-full'>
                                    <label htmlFor='' className="text-gray-100">
                                        Information
                                    </label>
                                    <textarea
                                        name=''
                                        required
                                        maxLength={150}
                                        value={info}
                                        onChange={(e: any) => setInfo(e.target.value)}
                                        id="name"
                                        placeholder="Enter description"
                                        className={`${styles.input} !text-gray-700 !bg-gray-100 !text-base !py-2`}
                                    ></textarea>
                                </div>
                                <div className={`${styles.button} h-[30px] bg-blue-400 !rounded-md mt-6 !text-base !text-white`}
                                    onClick={handleUpdateSchedule}
                                >
                                    Update schedule
                                </div>
                            </Box>

                        </Modal>
                    )}

                    {activeD && (
                        <Modal
                            open={activeD}
                            onClose={() => setActive(!activeD)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-[30%] left-[50%] w-[90%] md:w-[60%] lg:w-[30%] -translate-x-1/2 bg-gray-800   p-3 rounded-md">
                                <div className="text-xl text-gray-300 mb-2">Do you want to delete this schedule?</div>
                                <button className="bg-slate-300 p-1 rounded-md mt-2 mr-2" onClick={handleDelete}>Yes</button>  <button onClick={() => setActiveD(false)} className="bg-red-300 p-1 rounded-md mt-2">No</button>
                            </Box>

                        </Modal>
                    )}
                </Box>
            </div >
        </>
    )
}


