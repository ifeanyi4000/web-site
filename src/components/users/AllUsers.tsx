import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, } from '@mui/material'
import { FiEye } from "react-icons/fi"
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useUpdateRoleMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";
import { styles } from "../styles/style";
import { RiTextDirectionR } from "react-icons/ri";


type Props = {
    userList: any
    refetch: any
}

export default function AllUsers({ userList, refetch }: Props) {
    const [active, setActive] = useState(false)
    const [id, setId] = useState("")
    const [role, setRole] = useState("")
    const [updateRole, { error: updateError, isSuccess: updateSuccess }] = useUpdateRoleMutation<any>({})
    const [name, setName] = useState("")


    const handleUpdateRole = async () => {

        await updateRole({ id, role })

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
            toast.success("User role update successfully")
            setActive(false)
        }

    }, [updateError, updateSuccess])



    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        {
            field: "avatar",
            headerName: "Profile P.",
            flex: 0.2,
            renderCell: (params: any) => {
                return <div className='flex justify-center items-center mt-3'>
                    <img src={params?.row?.avatar || "/noavatar.png"} alt="" className='h-8 w-8 rounded-full flex justify-center items-center' />
                </div>
            },
        },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "gender", headerName: "Gender", flex: 0.2 },
        { field: "tithe", headerName: "Tithe Number", flex: 0.3 },
        { field: "type", headerName: "Account Type", flex: 0.3 },
        { field: "role", headerName: "Role", flex: 0.2 },
        { field: "createdAt", headerName: "Created At", flex: 0.2 },
        {
            field: "  ", headerName: "View", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Link to={`/view-profile/${params.row.id}`}>
                            <Button>
                                <FiEye className="text-blue-100 hover:text-red-200" size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        },
        {
            field: "   ", headerName: "Update Role", flex: 0.3, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setActive(!active)
                            setId(params.row.id)
                            setName(params.row.name)
                        }}>
                            <RiTextDirectionR className="text-blue-100 hover:text-red-200" size={20} />
                        </Button>
                    </>
                )
            }
        },

    ]

    const rows: any = []


    {
        userList && userList?.forEach((item: any) => {
            rows.push({
                id: item?._id,
                avatar: item?.avatar?.url,
                name: item?.name,
                gender: item?.gender,
                tithe: item?.tithe_number,
                type: item?.accountType,
                role: item?.role,
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
                    {active && (
                        <Modal
                            open={active}
                            onClose={() => setActive(!active)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-[30%] left-[50%] w-[90%] md:w-[60%] lg:w-[30%] -translate-x-1/2 bg-gray-800   p-3 rounded-md">
                                <h1 className={`${styles.title} !text-lg dark:!text-white`}>
                                    Grant Access
                                </h1>
                                <div className='flex w-full items-center flex-col mb-6 mt-3'>
                                    <input type='text'
                                        placeholder='Enter user id'
                                        className={`${styles.input}`}
                                        disabled
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <br />
                                    <select

                                        required
                                        value={role}
                                        onChange={(e: any) => setRole(e.target.value)}
                                        id="category"
                                        className={`${styles.input} !text-blue-500 custom-select`}
                                    >
                                        <option value=''>--Please select Role--</option>
                                        <option value='admin'>Admin</option>
                                        <option value='user'>User</option>
                                        <option value='staff-tithe'>Staff</option>
                                    </select>
                                    <div className={`${styles.button} h-[30px] bg-blue-400 !rounded-md mt-6 !text-base !text-white`}
                                        onClick={handleUpdateRole}
                                    >
                                        Update Role
                                    </div>
                                </div>

                            </Box>

                        </Modal>
                    )}
                </Box>
            </div>
        </>
    )
}


