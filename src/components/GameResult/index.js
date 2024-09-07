import './index.css'
import {useLocation, useNavigate} from 'react-router-dom'
import Header from '../Header'

const GameResult = () => {
  const location = useLocation()
  const {totalScore, unansweredList} = location.state || {
    totalScore: 0,
    unansweredList: [],
  }
  const isWon = totalScore >= 5
  const percentage = (totalScore / 10) * 100
  const navigate = useNavigate()

  const handleReport = () => {
    navigate('/game-report', {
      state: {unansweredList, totalScore},
      replace: true,
    })
  }

  return (
    <>
      <Header />
      <div className="game-result-cont">
        <div className={`card-3 ${!isWon ? 'no-bg-img' : ''} `}>
          {isWon ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
              alt="congrats"
              className="won-img"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png "
              alt="lose"
              className="lose-img"
            />
          )}
          <p className="res-text">{isWon ? 'Congrats!' : 'You Lose!'}</p>
          <p className="res-percent">{percentage}% Correctly Answered</p>
          <p className="success-text">Quiz completed successfully.</p>
          <p className="attempted-crct">
            You attempted {totalScore} out of 10 questions as correct.
          </p>
          <button className="report-btn" onClick={handleReport}>
            Report
          </button>
        </div>
      </div>
    </>
  )
}

export default GameResult
