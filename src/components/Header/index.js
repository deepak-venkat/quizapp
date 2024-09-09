import './index.css'
import {MdLogout} from 'react-icons/md'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  const history = useHistory()
  const handleLogout = () => {
    Cookies.remove('jwtToken')
    history.push('/login')
  }
  return (
    <nav className="nav-cont">
      <div className="header">
        <div className="logo">
          <img
            src="https://imgtr.ee/images/2024/09/08/04ae4d6897f9b101acbb63b50658a600.png"
            className="logo-icon"
            alt="logo"
          />
        </div>
        <div>
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <MdLogout className="logout-icon" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
