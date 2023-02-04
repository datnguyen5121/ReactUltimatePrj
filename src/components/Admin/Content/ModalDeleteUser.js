import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import {  toast } from 'react-toastify';

const ModalDeleteUser=(props) => {
  const {show, setShow, dataDelete, currentPage} = props

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async() => {

    let data = await deleteUser(dataDelete.id);
    console.log('component res:', data);
    if (data && data.EC === 0) {
      console.log('fetch');
      toast.success(data.EM)
      handleClose()
      console.log('hadleclose');
      props.setCurrentPage(1);
      console.log('setcurrentPage');
      await props.fetchListUsersWithPaginate(1)
      console.log('fetchListUsersWithPaginate');
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }

  }
  return (
    <>
   
      <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static"
        >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete The User ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user. Email = 
            <b>{dataDelete && dataDelete.email ? dataDelete.email: ""
            }</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser