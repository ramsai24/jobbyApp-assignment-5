import Loader from 'react-loader-spinner'
import JobItem from '../Job Item'

import './index.css'

const JobsContainer = props => {
  const {jobsData, status, onretry} = props
  console.log(jobsData, status)
  const renderSuccessJobsDataView = () => (
    <ul className="jobs-container">
      {jobsData.map(eachJob => (
        <JobItem key={eachJob.id} jobData={eachJob} />
      ))}
    </ul>
  )

  const onRetry = () => onretry()
  const renderFailureView = () => (
    <div>
      <button type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switch (status) {
    case 'SUCCESS':
      return renderSuccessJobsDataView()
    case 'FAILURE':
      return renderFailureView()
    default:
      return renderLoadingView()
  }
}

export default JobsContainer
