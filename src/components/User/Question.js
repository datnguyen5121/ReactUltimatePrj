import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { BsCheck2 } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

const Question = (props) => {
  const { data, index, showAnwers } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handHandleCheckbox = (event, aId, qId) => {
    // console.log('check: ',event.target.checked);
    props.handleCheckbox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${data.image}`}
            onClick={() => setIsPreviewImage(true)}
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            >
              {" "}
            </Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    disabled={props.isFinish}
                    checked={a.isSelected}
                    value=""
                    onChange={(event) => handHandleCheckbox(event, a.id, data.questionId)}
                  />
                  <label className="form-check-label">{a.description}</label>
                  {showAnwers === true && (
                    <>
                      {a.isSelected === true && a.isCorrect === false && <BsXLg />}
                      {a.isCorrect === true && <BsCheck2 />}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
