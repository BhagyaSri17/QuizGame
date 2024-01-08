import React, {  useState } from "react";
import img1 from "./blob 5.png";
import img2 from "./blobs.png";
import Content from './Content.js';

const Main = () => {
    const [newgame,setGame]=useState(true);
    const [show, setShow] = useState(false);
    const content = () => {

        setShow(true);
        setGame(false);
    }
    
    const restartGame = () => {
        setGame(true);
        setShow(false);
      };
   
    const showdata = show && !newgame? 
    <Content  restartGame={restartGame} /> : (
        <div className="Main">
            <img className="img1" src={img1} alt="imageborder"/>
            <img className="img2" src={img2} alt="imageborder" />
            <h2>Quizzical</h2>
            <p>Check out your Knowledge</p>
            <button onClick={content}>Start quiz</button>

        </div>)
    return (
        <>
            {showdata}

        </>
    )
}
export default Main