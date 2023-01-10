import { useState } from 'react'
import Start from './components/Start'
import Questions from './components/Questions'
import './App.css'

function App() {
  const [quiz, setQuiz] = useState(false)

  function startQuiz(){
    setQuiz(true)
    
  }
  return (
    <main>
      {quiz ?
        <Questions /> :
        <Start 
          startQuiz={startQuiz}/> 
      }
    </main>
  )
}

export default App
