import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import "./UpdateQuiz.scss";
import { FcPlus } from "react-icons/fc";
import { putUpdateQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const UpdateQuiz = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setName(dataUpdate.name);
    setDescription(dataUpdate.description);
    setType(dataUpdate.difficulty);
    setImage("");
    if (dataUpdate.image) {
      setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage("");
    }
  };
  const handleSubmit = async () => {
    let res = await putUpdateQuiz(dataUpdate.id, name, description, type, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchQuiz();
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="my-3">
              <select
                className="form-select"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img
                  src={previewImage}
                  style={{
                    width: "225px",
                    height: "225px",
                  }}
                />
              ) : (
                <label>Preview Image</label>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateQuiz;
