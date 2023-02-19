import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { getOverview } from "../../../services/apiService";
import { useEffect, useState } from "react";
const DashBoard = (props) => {
  const [dataOverView, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);
  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      // process chart data
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
    console.log(">>> check res: ", res);
  };

  return (
    <div className="dashboard-container">
      <div className="title">DashBoard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total users</span>
            <span className="text-2">
              {dataOverView && dataOverView.users && dataOverView.users.total ? (
                <> {dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countQuiz ? (
                <> {dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countQuestions ? (
                <> {dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {dataOverView && dataOverView.others && dataOverView.others.countAnswers ? (
                <> {dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height={"100%"}>
            <BarChart width={400} height={300} data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#ccc" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
