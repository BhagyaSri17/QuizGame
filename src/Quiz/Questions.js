import React, { useEffect, useState } from "react";

const Question = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    const shuffleoptions = (options) => {
      const shuffledoptions = [...options];
      for (let i = shuffledoptions.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledoptions[i], shuffledoptions[j]] = [shuffledoptions[j], shuffledoptions[i]];
      }
      return shuffledoptions;
    }
    setShuffledOptions(shuffleoptions([...props.item.incorrect_answers,
    props.item.correct_answer
    ]));
  }, [props.item]);

  if (!props.item || !props.item.incorrect_answers) {
    // Handle the case where props.item or its properties are undefined
    return null;
  }

  const handleOptionSelect = (answer) => {
    if (!props.checkanswer) {
      setSelectedAnswer((prevSelectedAnswer) => (prevSelectedAnswer === answer ? null : answer));
      props.updateSelectedAnswers(answer);
    }
  };
  const decodeHtmlEntities = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const isCorrect = (option) => {
    return props.item && props.item.correct_answer && props.item.correct_answer.includes(option);
  };


  return (
    <div className="QA">
      {decodeHtmlEntities(props.item.question)}
      <div className="Answers">
        <ul>
          {shuffledOptions.map((option, index) => (
            <li key={index}>
              <label
                htmlFor={`question-${props.item.question}-${option}`}
                style={{

                  padding: '5px',
                  borderRadius: '10px',
                  width: 'auto',
                  backgroundColor: props.checkanswer ? isCorrect(option)
                    ? '#94D7A2'
                    : selectedAnswer === option ? '#F8BCBC' : 'white' : selectedAnswer === option ? '#D6DBF5' : 'white',
                  color: props.checkanswer ? isCorrect(option) ? '#293264' : '#7e96c4' : '#293264',
                  cursor: props.checkanswer ? 'not-allowed' : 'pointer',
                  border: props.checkanswer ? isCorrect(option) ? 'none' : selectedAnswer === option ? 'none' : '1px solid #7e96c4' : selectedAnswer === option ? 'none' : '1px solid #4D5B9E',
                }}>
                <input
                  type="radio"
                  id={`question-${props.item.question}-${option}`}
                  name={`question-${props.item.question}`}  // Use a unique name for each question
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleOptionSelect(option)}
                  style={{ display: 'none' }}
                />
                {decodeHtmlEntities(option)}
              </label>  </li>
          ))
          }
        </ul>
      </div>
      <hr></hr>
    </div>
  )
}
export default Question