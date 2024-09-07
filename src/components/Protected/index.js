import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

const Protected = ({element: Component}) => {
  // renaming as Componenet
  if (Cookies.get('jwtToken')) {
    return <Component />
  }
  return <Navigate to="/login" replace />
}

export default Protected
