import { useEffect } from "react";
import { useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import UpdateQuiz from "./UpdateQuiz";
import DeleteQuiz from "./DeleteQuiz";
const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleEditQuiz = (item) => {
    console.log(item);
    setDataUpdate(item);
    setShowUpdateQuiz(true);
  };
  const handleDeleteQuiz = (item) => {
    setDataDelete(item);
    setShowDeleteQuiz(true);
  };
  return (
    <>
      <div>List Quizzes: </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button className="btn btn-warning" onClick={() => handleEditQuiz(item)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteQuiz(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <UpdateQuiz
        show={showUpdateQuiz}
        setShow={setShowUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
      />
      <DeleteQuiz
        show={showDeleteQuiz}
        setShow={setShowDeleteQuiz}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
