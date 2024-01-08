
import React, { useEffect, useState } from "react";
import img1 from "./blob 5.png";
import img2 from "./blobs.png";
import QA from "./Questions.js";
import Checkanswers from "./CheckAnswers.js";
const Content = (props) => {
  const [data, setdata] = React.useState({ results: [] });
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=32&difficulty=easy&type=multiple");
        const result = await response.json();
        setdata(result);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchInfo();
  }, []);

  const [check, setcheck] = useState(false);
  const restartQuiz = () => {
    setcheck(false);
    setSelectedAnswers([]); // Reset selected answers
     props.restartGame(); // Reset color answers
  };

  const checkans = () => {
    setcheck(true);
  };

  const updateSelectedAnswers = (questionIndex, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const Correctanswer = data.results.map((item) => item.correct_answer);
  const CheckCorrect = check ? <Checkanswers answers={selectedAnswers} correctanswer={Correctanswer} /> : null
  return (
    <div className="Content">
      <img className="img1" src={img1} alt="imageborder" />
      <img className="img2" src={img2} alt="imageborder" />
      <div className="block">
        {data.results.map((item, index) => (
          <QA key={index} item={item}
            updateSelectedAnswers={(answer) => updateSelectedAnswers(index, answer)}
            checkanswer={check}
          />
        ))}
      </div>
      {CheckCorrect}
      <div className="btn">
        <button onClick={check ? restartQuiz : checkans}>{check ? "Play Again" : "Check Answers"}</button>
      </div>
    </div>
  )
}
export default Content