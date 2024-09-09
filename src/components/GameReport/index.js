import './index.css'
import '../QuizGame/index.css'
import {useLocation} from 'react-router-dom'
import Header from '../Header'

const GameReport = () => {
  const location = useLocation()
  const {unansweredList, totalScore} = location.state || {
    unansweredList: [],
    totalScore: 0,
  }
  const unansweredCount = unansweredList.length

  const renderDefaultOptions = options => (
    <ul className="default-options options-adjust">
      {options.map((option, index) => {
        const isCorrect = option.is_correct === 'true'

        return (
          <li key={option.id}>
            <button
              type="button"
              className={`option-btn ${isCorrect ? 'correct-btn' : ''}`}
            >
              {String.fromCharCode(65 + index)}. {option.text}
            </button>
            {isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked circle"
                className="res-icon"
              />
            )}
          </li>
        )
      })}
    </ul>
  )

  const renderImageOptions = options => (
    <ul className="image-options options-adjust">
      {options.map(option => {
        const isCorrect = option.is_correct === 'true'
        return (
          <li key={option.id}>
            <button className="img-btn" type="button">
              <img
                src={option.image_url}
                alt={option.text}
                className="img-option"
              />
            </button>
            {isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked circle"
                className="res-icon-2"
              />
            )}
          </li>
        )
      })}
    </ul>
  )

  const renderSingleSelectOptions = options => (
    <ul className="radio-options options-adjust">
      {options.map(option => {
        const isCorrect = option.is_correct === 'true'

        return (
          <li key={option.id}>
            <div className="radio-cont">
              <input
                id={option.id}
                type="radio"
                value={option.id}
                checked={isCorrect}
              />
              <label htmlFor={option.id}>{option.text}</label>
            </div>
            {isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked circle"
                className="res-icon-3"
              />
            )}
          </li>
        )
      })}
    </ul>
  )

  const renderOptionsView = unattemptedQuestion => {
    switch (unattemptedQuestion.options_type) {
      case 'DEFAULT':
        return renderDefaultOptions(unattemptedQuestion.options)
      case 'IMAGE':
        return renderImageOptions(unattemptedQuestion.options)
      case 'SINGLE_SELECT':
        return renderSingleSelectOptions(unattemptedQuestion.options)
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="game-report-cont">
        <div className="report-card">
          <div className="report-box">
            <div className="report-circle">
              <p className="circle-text">
                <span>10</span>/10
              </p>
            </div>
            <div className="report-categories">
              <div className="category">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="category-img"
                />
                <p className="category-text">{totalScore} Correct answers</p>
              </div>
              <div className="category">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="category-img"
                />
                <p className="category-text">
                  {10 - totalScore - unansweredCount} Wrong answers
                </p>
              </div>
              <div className="category">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="category-img"
                />
                <p className="category-text">{unansweredCount} Unattempted</p>
              </div>
            </div>
          </div>
          {unansweredCount === 0 ? (
            <div className="attempted-all-cont">
              <p className="attempted-text">Attempted all the questions</p>
            </div>
          ) : (
            <div className="unattempted-cont">
              <h1 className="unattempted-head">Unattempted Questions</h1>
              <ul className="unattempted-list">
                {unansweredList.map(unattemptedQuestion => (
                  <li key={unattemptedQuestion.id} className="question-options">
                    <p className="question question-adjust">
                      {unattemptedQuestion.question_text}
                    </p>
                    {renderOptionsView(unattemptedQuestion)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GameReport
