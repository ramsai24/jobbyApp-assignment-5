import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import './index.css'

const JobDetails = props => {
  const {jobDetails, status, retry} = props
  console.log(jobDetails, status)

  const renderSuccessJobDetailsView = () => <div> </div>
  const renderFailureView = () => <FailureView jobDataFun={retry} />

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switch (status) {
    case 'SUCCESS':
      return renderSuccessJobDetailsView()
    case 'FAILURE':
      return renderFailureView()
    default:
      return renderLoadingView()
  }
}

export default JobDetails
