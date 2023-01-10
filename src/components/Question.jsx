import { useState } from "react";
import { decode } from "he"
import { nanoid } from "nanoid"


export default function Question(props){
    
    const [ random, setRandom ] = useState(Math.random())
    
    const { 
        question ,
        correct_answer : correctAnswer,
        incorrect_answers : incorrectAnswers,
        selectedAnswer 
    } = props.question

    const incorrectAnswersEls = incorrectAnswers.map(answer => {

        const incorrectAnswersElsClassname = `btn-primary 
        ${ selectedAnswer === answer ? "btn-selected" : "" }
        ${props.showAnswers ? selectedAnswer === answer ? "btn-wrong" : "btn-greyed-out" : ""}
        `

        return (
            <button
                key={nanoid()}
                className={incorrectAnswersElsClassname}
                onClick={()=> props.handleSelectChoice(props.id, answer)}
            >
                { decode(answer) }
            </button>
            )
    })

    const correctAnswerElClassname = ` btn-primary
    ${selectedAnswer === correctAnswer ? "btn-selected" : ""}
    ${props.showAnswers && "btn-correct"}
    `

    const correctAnswerEl = 
        <button
            key={nanoid()}
            className={correctAnswerElClassname}
            onClick={()=> props.handleSelectChoice(props.id, correctAnswer)}
        >
            { decode(correctAnswer) }
        </button>
    

    incorrectAnswersEls.push(correctAnswerEl)
    
    const answersElements = incorrectAnswersEls.sort(() => 0.5 - random)

    return (
        <div className="question">
            <h3 className="question-text">{decode(question)}</h3>
            <div className="answers">
                {answersElements}
            </div>
            <hr />
        </div>
    )
}