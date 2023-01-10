import { useEffect, useState } from "react"
import Question from "./Question"
import { nanoid } from "nanoid"


export default function Questions(){
    const [ questions , setQuestions ] = useState([])
    const [ correctAnswersCount , setCorrectAnswersCount ] = useState(0) 
    const [ gameSwitch , setGameSwitch ] = useState(true)
    const [ showAnswers , setShowAnswers ] = useState(false)
    const [ isGameOver , setIsGameOver ] = useState(false)
    const [ doneLoading, setDoneLoading ] = useState(false)
    
    const isAllAnswered = questions.every(question => question.selectedAnswer !== "")


    useEffect(()=>{

        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            .then(res=> res.json())
            .then(data=> {
                setDoneLoading(true)
                setQuestions(data.results.map(question => {
                    return {
                        ...question,
                        id: nanoid(),
					    selectedAnswer: ""
                    }
                }))
            })
    },[gameSwitch])

    function handleSelectChoice(questionId , answer){
        
        if(!isGameOver){
            setQuestions(prevQuestions => (
                prevQuestions.map(question => (
                    question.id === questionId
                        ? {...question, selectedAnswer: answer }
                        : question
                ))
            ))
        }
    }

    function checkAnswers(){

        if (isAllAnswered) {
            let correctAnswers = 0
            
            questions.forEach(question => {
                if (question.correct_answer === question.selectedAnswer)
                    correctAnswers++
                })
            setCorrectAnswersCount(correctAnswers)
            setIsGameOver(true)
            setShowAnswers(true)
        }

    }

    function resetGame(){
        setGameSwitch(prevState => !prevState)
        setIsGameOver(false)
        setShowAnswers(false)
        setDoneLoading(false)
    }
   
    const questionsElements = questions.map(question => (
		<Question
			key={question.id}
			id={question.id}
			question={question}
			handleSelectChoice={handleSelectChoice}
            showAnswers={showAnswers}
		/>
	))

    return (
        <div className="container">
            {doneLoading && questionsElements}
            <div className="wrapper">
                { showAnswers && 
                <h3>
                    Correct Answers {correctAnswersCount} / 5 
                </h3> 
                }
                { doneLoading && 
                <button 
                    onClick={isGameOver ? resetGame : checkAnswers}
                    className={isAllAnswered ? "check-btn" : "check-btn-greyed-out"}
                >
                    {isGameOver ? "Play again" : "Check answers"}
                </button> 
                }
            </div>
        </div>
    )
}