import React from "react";
import {nanoid} from "nanoid"
import { decode } from "html-entities";

export default function Question(props) {
    const answers = props.answers

    const answerElements = answers.map((answer) => {
        const selectedStyling = {
            background: answer.isSelected ? "#D6DBF5" : ""
        }
    
        return <h2  key={nanoid()} 
                    className="answer" style={selectedStyling} 
                    data-answer={JSON.stringify(answer)} 
                    onClick={(event) => props.selectAnswer(event, props.answers)}>
                {decode(answer.answer)}</h2>
    })

    return (
        <div className="question--segment">
            <h1 className="question">{decode(props.question)}</h1>
            <div className="answers">
                {answerElements}
            </div>
            <hr></hr>
        </div>
    )
}