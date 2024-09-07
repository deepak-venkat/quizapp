import './index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQ} from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  if (Cookies.get('jwtToken')) {
    return <Navigate to="/" replace />
  }

  const handleLogin = async event => {
    event.preventDefault()
    if (username === '' || password === '') {
      setIsError(true)
      setErrMsg('Please enter a valid Username & Password')
      return
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    try {
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwtToken', data.jwt_token, {expires: 7})
        setIsError(false)
        navigate('/')
      } else {
        const {error_msg} = data
        setIsError(true)
        setErrMsg(error_msg)
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
      setErrMsg(
        'Failed to fetch. Please check your internet connection and try again.',
      )
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div className="form-cont">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="logo">
          <FontAwesomeIcon
            icon={faQ}
            className="logo-icon"
            alt="login website logo"
          />
          <p className="logo-text">NXT Quiz</p>
        </div>
        <div className="input-box">
          <label htmlFor="username" className="label-1">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Enter 'deepak'"
            id="username"
            className="input"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="password" className="label-1">
            PASSWORD
          </label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Enter 'lightstar@1'"
            id="password"
            className="input"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className="checkbox-cont">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={isPasswordVisible}
            onChange={() => setPasswordVisible(prevState => !prevState)}
          />
          <label className="label-2" htmlFor="checkbox">
            Show Password
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        {isError && <p className="error">{errMsg}</p>}
      </form>
    </div>
  )
}

export default Login
