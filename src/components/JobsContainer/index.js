import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import JobItem from '../Job Item'

import './index.css'
import FailureView from '../FailureView'

const JobsContainer = props => {
  //   console.log(props)
  const {jobsData, status, onretry} = props

  //   console.log(jobsData, status)
  const renderSuccessJobsDataView = () => (
    <ul className="jobs-container">
      {jobsData.map(eachJob => (
        <JobItem key={eachJob.id} jobData={eachJob} />
      ))}
    </ul>
  )

  //   const onRetry = () => onretry()
  const renderFailureView = () => (
    <FailureView jobDataFun={onretry} />
    // <div>
    //   <button type="button" onClick={onRetry}>
    //     Retry
    //   </button>
    // </div>
  )
  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderNoJobsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  switch (status) {
    case 'SUCCESS':
      return jobsData.length !== 0
        ? renderSuccessJobsDataView()
        : renderNoJobsView()
    case 'FAILURE':
      return renderFailureView()
    default:
      return renderLoadingView()
  }
}

export default withRouter(JobsContainer)
