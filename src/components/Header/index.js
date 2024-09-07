import './index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQ} from '@fortawesome/free-solid-svg-icons'
import {MdLogout} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove('jwtToken')
    navigate('/login')
  }
  return (
    <nav className="nav-cont">
      <div className="header">
        <div className="logo">
          <FontAwesomeIcon
            icon={faQ}
            className="logo-icon"
            alt="website logo"
          />
          <p className="logo-text">NXT Quiz</p>
        </div>
        <div>
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
          <button className="icon-btn" type="button" onClick={handleLogout}>
            <MdLogout className="logout-icon" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
