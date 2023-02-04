import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import { useState } from 'react'
import TableUser from './TableUser'
import { useEffect } from "react"
import {getAllUsers, getUserWithPaginate} from '../../../services/apiService'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'
import TableUserPaginate from './TableUserPaginate'
const  ManageUser = (props) => {
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);

    const [dataView, setDataView] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    //component didmount
    useEffect(() => {
        // fetchListUsers(),
        fetchListUsersWithPaginate(currentPage)
    },[]);
    const fetchListUsers = async () => {
         let res = await getAllUsers()
         if(res.EC === 0) {
            setListUsers(res.DT)
         }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page,LIMIT_USER)
        if(res.EC === 0) {
           setListUsers(res.DT.users);
           setPageCount(res.DT.totalPages)

        }
   }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true)
        setDataView(user)
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
    }
    const resetUpdateData = () => {
        setDataUpdate({})
    }
    const resetViewData = () => {
        setDataView({})
    }
    return (
        
            <div className="manage-user-container">
                <div className="title">
                    ManageUser
                </div>
                <div className="users-content">
                    <div className='btn-add-new'>
                        <button className='btn btn-primary' onClick={()=> setShowModalCreateUser(true)}><FcPlus/> Add new users</button>
                    </div>
                    <div className='table-users-container'>
                        {/* <TableUser 
                                listUsers={listUsers}
                                handleClickBtnUpdate={handleClickBtnUpdate}
                                handleClickBtnView={handleClickBtnView}
                                handleClickBtnDelete={handleClickBtnDelete}
                        /> */}
                        <TableUserPaginate
                         listUsers={listUsers}
                         handleClickBtnUpdate={handleClickBtnUpdate}
                         handleClickBtnView={handleClickBtnView}
                         handleClickBtnDelete={handleClickBtnDelete}
                         fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                         pageCount={pageCount}
                         currentPage={currentPage}
                         setCurrentPage={setCurrentPage}
                        />
                    </div>
                        <ModalCreateUser 
                            show={showModalCreateUser} 
                            setShow={setShowModalCreateUser} 
                            fetchListUsers={fetchListUsers}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            />
                        <ModalUpdateUser
                            show={showModalUpdateUser} 
                            setShow={setShowModalUpdateUser}
                            dataUpdate={dataUpdate}
                            fetchListUsers={fetchListUsers}
                            resetUpdateData={resetUpdateData}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}

                        />
                        <ModalViewUser
                            show={showModalViewUser} 
                            setShow={setShowModalViewUser}
                            dataView={dataView}
                            fetchListUsers={fetchListUsers}
                            resetViewData={resetViewData}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}

                        />
                        <ModalDeleteUser
                            show={showModalDeleteUser}
                            setShow={setShowModalDeleteUser}
                            dataDelete = {dataDelete}
                            fetchListUsers={fetchListUsers}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}

                        />
                </div>
            </div>
      
    );
}

export default ManageUser;