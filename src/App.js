import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import GameResult from './components/GameResult'
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'
import Failure from './components/Failure'
import Protected from './components/Protected'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Protected path="/" exact component={Home} />
    <Protected path="/quiz-game" component={QuizGame} />
    <Protected path="/game-results" component={GameResult} />
    <Protected path="/game-report" component={GameReport} />
    <Route path="/not-found" component={NotFound} />
    <Route path="/failure" component={Failure} />
    {/* Redirect all unknown paths to /not-found */}
    <Redirect to="/not-found" />
  </Switch>
)

export default App
