import './index.css'
import Header from '../Header'

const Failure = () => (
  <>
    <Header />
    <div className="failure-bg">
      <div className="card card-adjust">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="not found"
          className="failure-img"
        />
        <p className="swr">Something went wrong</p>
        <p className="swr-text">Our server are busy please try again </p>
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  </>
)

export default Failure
