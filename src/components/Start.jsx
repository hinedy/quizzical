export default function Start(props){
    return (
        <div className="modal">
            <h1 className="title">Quizzical</h1>
            <p className="description">Test your knowledge</p>
            <button 
                className="start-btn"
                onClick={props.startQuiz}
                >
                Start Quiz    
            </button>
        </div>
    )
}