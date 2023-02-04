import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc'
import { useEffect } from 'react';
import _ from 'lodash'

const ModalViewUser = (props) => {
  const {show, setShow, dataView} = props;

  const handleClose = () => {
      setShow(false);
      setEmail("");
      setPassword("");
      setUsername("");
      setRole("");
      setImage("");
      setPreviewImage("");
      props.resetViewData();


  }

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image,setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(()=> {
    console.log('run Effect modalupdateuser');
    if (!_.isEmpty(dataView)) {
        setEmail(dataView.email);
        setUsername(dataView.username);
        setRole(dataView.role);
        setImage('');
        if (dataView.image) {
             setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
        }
    }
  },[dataView]);


  return (
    <>
      <Modal 
                show={show} 
                onHide={handleClose} 
                size="xl"
                backdrop="static"
                className='modal-add-user'  
                >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label  className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        onChange={(event) => 
                        setEmail(event.target.value)
                        }
                        disabled
                        />
                </div>
                <div className="col-md-6">
                    <label  className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={(event) => 
                          setPassword(event.target.value)}
                        disabled
                        />
                </div>
                
                <div className="col-md-6">
                    <label className="form-label">User Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username}
                        onChange={(event) => 
                          setUsername(event.target.value)} disabled/>
                </div>
                <div className="col-md-4">
                    <label  className="form-label">Role</label>
                    <select  className="form-select" onChange={(event) => 
                          setRole(event.target.value)} value={role} disabled>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
               <div className='col-md-12'>
                    <label  className="form-label label-upload" htmlFor='labelUpload'>
                        <FcPlus/>Upload File Image</label>
                    <input 
                        type="file" 
                        id="labelUpload" 
                        hidden disabled
                    />
               </div>
               <div className='col-md-12 img-preview'>
                    {previewImage ? 
                    <img src={previewImage} />
                    :
                    <label>Preview Image</label>
                    }
               </div>
                </form>
    </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser