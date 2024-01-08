import React, { useEffect, useState } from "react";

const Check = (props) => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const newColors = props.answers.map((item, index) => {
            if (item === props.correctanswer[index]) {
                setScore((prevScore) => prevScore + 1);
            }
        })
    }, [])
    return (
        <div className="score">You scored {score}/5 correct answers</div>

    )
}
export default Check;