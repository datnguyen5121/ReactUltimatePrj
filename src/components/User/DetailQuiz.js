import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
import { Breadcrumb, NavLink } from "react-bootstrap";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setdataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
            // console.log('item answers: ',item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setdataQuiz(data);
      // console.log('check dataquiz: ', data);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };
  const handleCheckbox = (answersId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answersId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      // console.log(b);
    }
    let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setdataQuiz(dataQuizClone);
    }
  };
  const handleFinishQuiz = async () => {
    console.log("checkdataquiz ", dataQuiz);

    let arr = { quizId: quizId, answers: [] };
    if (dataQuiz && dataQuiz.length > 0) {
      let arrNew = [];
      dataQuiz.forEach((item, index) => {
        let questionId = item.questionId;
        let userAnswerId = [];
        item.answers.map((check) => {
          if (check.isSelected === true) {
            userAnswerId.push(check.id);
          }
        });
        arrNew.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      console.log(arrNew);
      arr.answers = arrNew;

      let res = await postSubmitQuiz(arr);
      console.log("check res: ", res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("something wrongs....");
      }
    }
    console.log(arr);
  };
  return (
    <>
      <Breadcrumb className="quiz-detail-new-header">
        <NavLink to="/" className="breadcrumb-item"></NavLink>
        <NavLink to="/users" className="breadcrumb-item"></NavLink>
        <Breadcrumb.Item active></Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="q-body">
            <img />
          </div>
          <div className="q-content">
            <Question
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
              index={index}
              handleCheckbox={handleCheckbox}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              Prev
            </button>
            <button onClick={() => handleNext()} className="btn btn-primary ">
              Next
            </button>
            <button onClick={() => handleFinishQuiz()} className="btn btn-warning ">
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setIndex}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
