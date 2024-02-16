import React from "react";
import {nanoid} from "nanoid"
import { decode } from "html-entities";

export default function Question(props) {
    const answerElements = props.answers.map((answer) => {
        return <h2 key={nanoid()} className="answer">{answer}</h2>
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