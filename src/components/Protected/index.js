import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const Protected = props => {
  // renaming as Componenet
  if (Cookies.get('jwtToken')) {
    return <Route {...props} />
  }
  return <Redirect to="/login" /> // or window.location.href = '/login' then return null
}

export default Protected
