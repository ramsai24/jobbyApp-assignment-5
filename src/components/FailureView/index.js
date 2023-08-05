import {withRouter} from 'react-router-dom'
import './index.css'

const FailureView = props => {
  //   console.log(props)
  const {jobDataFun} = props

  const retry = () => jobDataFun()

  return (
    <div className="failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )
}

export default withRouter(FailureView)
