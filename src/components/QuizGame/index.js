import './index.css'
import {useNavigate} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import {useState, useEffect} from 'react'
import Header from '../Header'

const QuizGame = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [activeQue, setActiveQue] = useState({})
  const [index, setIndex] = useState(0)
  const [timerCount, setTimerCount] = useState(15)
  const [resetTimer, setResetTimer] = useState(false) // resetToggling
  const [selectObj, setSelectedObj] = useState({
    selectedOptId: undefined,
    isSelected: false,
    isCorrect: false,
  })
  const [totalScore, setTotalScore] = useState(0)
  const [unansweredList, setUnansweredList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/assess/questions')
        if (response.ok) {
          const data = await response.json()
          setQuestions(data.questions)
        } else {
          navigate('/failure')
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setActiveQue(questions[index])
    if (questions[index]) setIsLoading(false)
  }, [questions, index, activeQue, isLoading])

  useEffect(() => {
    const clearId = setInterval(() => {
      setTimerCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(clearId)
          setIsLoading(true)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
    return () => clearInterval(clearId)
  }, [resetTimer])

  useEffect(() => {
    if (timerCount === 0) {
      if (!selectObj.isSelected)
        setUnansweredList(prevState => [...prevState, activeQue])
      setIndex(prevIndex => prevIndex + 1)
      setResetTimer(prevState => !prevState)
      setTimerCount(15)
      setSelectedObj({
        selectedOptId: undefined,
        isSelected: false,
        isCorrect: false,
      })
    }
  }, [timerCount])

  const handleNext = () => {
    if (!selectObj.isSelected)
      setUnansweredList(prevState => [...prevState, activeQue])
    setIndex(index + 1)
    setResetTimer(prevState => !prevState)
    setTimerCount(15)
    setSelectedObj({
      selectedOptId: undefined,
      isSelected: false,
      isCorrect: false,
    })
  }

  const handleSelect = id => {
    const {options} = activeQue
    const correctOptId = options.find(option => option.is_correct).id
    if (!selectObj.isSelected) {
      const isCorrect = correctOptId === id
      setSelectedObj(prevObj => ({
        ...prevObj,
        selectedOptId: id,
        isSelected: true,
        isCorrect,
      }))
      if (isCorrect) setTotalScore(prevState => prevState + 1)
    }
  }

  const handleSubmit = () => {
    navigate('/game-results', {
      state: {totalScore, unansweredList},
      replace: true,
    })
  }

  const renderDefaultOptions = () => {
    const {options} = activeQue
    const correctOptId = options.find(option => option.is_correct).id
    return (
      <ul className="default-options">
        {options.map((option, i) => {
          const isCorrect =
            selectObj.isSelected &&
            option.id === selectObj.selectedOptId &&
            selectObj.isCorrect
          const isWrong =
            selectObj.isSelected &&
            option.id === selectObj.selectedOptId &&
            !selectObj.isCorrect
          const isDisplayCrctOnWrong =
            selectObj.isSelected && option.id === correctOptId

          return (
            <li key={option.id}>
              <button
                className={`option-btn ${
                  isCorrect || isDisplayCrctOnWrong ? 'correct-btn' : ''
                } ${isWrong ? 'wrong-btn' : ''}  `}
                onClick={() => handleSelect(option.id)}
              >
                {String.fromCharCode(65 + i)}. {option.text}
              </button>
              {(isCorrect || isDisplayCrctOnWrong) && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                  alt="correct checked circle"
                  className="res-icon"
                />
              )}
              {isWrong && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                  alt="incorrect checked circle"
                  className="res-icon"
                />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const renderImageOptions = () => {
    const {options} = activeQue
    const correctOptId = options.find(option => option.is_correct).id
    return (
      <ul className="image-options">
        {options.map(option => {
          const isCorrect =
            selectObj.isSelected &&
            option.id === selectObj.selectedOptId &&
            selectObj.isCorrect
          const isWrong =
            selectObj.isSelected &&
            option.id === selectObj.selectedOptId &&
            !selectObj.isCorrect
          const isDisplayCrctOnWrong =
            selectObj.isSelected && option.id === correctOptId

          return (
            <li key={option.id}>
              <button
                className="img-btn"
                onClick={() => handleSelect(option.id)}
              >
                <img
                  src={option.image_url}
                  alt={option.text}
                  className="img-option"
                />
              </button>
              {(isCorrect || isDisplayCrctOnWrong) && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                  alt="correct checked circle"
                  className="res-icon-2"
                />
              )}
              {isWrong && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                  alt="incorrect checked circle"
                  className="res-icon-2"
                />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const renderSingleSelectOptions = () => {
    const {options} = activeQue
    const correctOptId = options.find(option => option.is_correct).id
    return (
      <ul className="radio-options">
        {options.map(option => {
          const isCorrect =
            selectObj.isSelected &&
            option.id === selectObj.selectedOptId &&
            selectObj.isCorrect
          const isWrong =
            selectObj.isSelected &&
            option.id === selectObj.selectedOptId &&
            !selectObj.isCorrect
          const isDisplayCrctOnWrong =
            selectObj.isSelected && option.id === correctOptId

          return (
            <li key={option.id}>
              <div className="radio-cont">
                <input
                  id={option.id}
                  type="radio"
                  value={option.id}
                  checked={selectObj.selectedOptId === option.id}
                  onChange={() => handleSelect(option.id)}
                />
                <label htmlFor={option.id}>{option.text}</label>
              </div>
              {(isCorrect || isDisplayCrctOnWrong) && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                  alt="correct checked circle"
                  className="res-icon-3"
                />
              )}
              {isWrong && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                  alt="incorrect checked circle"
                  className="res-icon-3"
                />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const renderOptionsView = () => {
    switch (activeQue.options_type) {
      case 'DEFAULT':
        return renderDefaultOptions()
      case 'IMAGE':
        return renderImageOptions()
      case 'SINGLE_SELECT':
        return renderSingleSelectOptions()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="quiz-game">
        {isLoading ? (
          <div className="card loader-cont">
            <div data-testid="loader">
              <TailSpin color="#0ea5e9" height={35} width={35} />
            </div>
          </div>
        ) : (
          <div className="card-2">
            <div className="top-box">
              <div className="que-num-box">
                <p className="que-text">Question</p>
                <p className="que-num">{index + 1}/10</p>
              </div>
              <div className="timer">
                <p className="count">{timerCount}</p>
              </div>
            </div>
            <div className="que-box">
              <p className="question">{activeQue.question_text}</p>
              {renderOptionsView()}
              {index < 9 ? (
                <button className="next-btn" onClick={handleNext}>
                  Next Question
                </button>
              ) : (
                <button
                  type="button"
                  className="next-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default QuizGame
