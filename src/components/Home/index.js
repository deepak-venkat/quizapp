import './index.css'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Header from '../Header'

const Home = () => {
  const [showWarning, setShowWarning] = useState(false)
  const navigate = useNavigate()
  const handleStart = () => {
    setShowWarning(true)
  }

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        navigate('/quiz-game', {replace: true})
      }, 2000) // Redirect after 3 seconds
      return () => clearTimeout(timer) // Clear the timer if the component unmounts
    }
  }, [showWarning, navigate])

  return (
    <>
      <Header />
      <div className="start-quiz-cont">
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
            className="start-image"
          />
          <h1 className="question">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="description">
            Test yourself with these easy quiz questions and answers
          </p>
          <button className="start-btn" type="button" onClick={handleStart}>
            Start Quiz
          </button>
          {showWarning && (
            <p className="warning-box">
              <span>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                  alt="warning icon"
                  className="warning-icon"
                />
              </span>{' '}
              <p>
                All the progress will be lost, if you reload during the quiz
              </p>
            </p>
          )}
        </div>
      </div>
    </>
  )
}
export default Home
