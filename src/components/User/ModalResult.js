import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult, setShowAnwers } = props;

  const handleClose = () => setShow(false);
  console.log("check data: ", dataModalResult);
  const handleSetShowAnwers = () => {
    setShowAnwers(true);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleSetShowAnwers()}>
            Show answers
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
