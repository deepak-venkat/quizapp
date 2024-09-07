import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import GameResult from './components/GameResult'
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'
import Failure from './components/Failure'
import Protected from './components/Protected'

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Protected element={Home} />} />
    <Route path="/quiz-game" element={<Protected element={QuizGame} />} />
    <Route path="/game-results" element={<Protected element={GameResult} />} />
    <Route path="/game-report" element={<Protected element={GameReport} />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="/failure" element={<Failure />} />
    <Route path="*" element={<Navigate to="/not-found" replace />} />
  </Routes>
)

export default App
