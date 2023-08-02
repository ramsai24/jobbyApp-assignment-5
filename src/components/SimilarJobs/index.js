import Loader from 'react-loader-spinner'
// import FailureView from '../FailureView'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails, status, retry} = props
  console.log(similarJobDetails, status)

  const renderSuccessSimilarJobsView = () => <div> </div>
  //   const renderFailureView = () => <FailureView jobDataFun={retry} />

  //   const renderLoadingView = () => (
  //     <div className="loader-container" data-testid="loader">
  //       <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  //     </div>
  //   )

  switch (status) {
    case 'SUCCESS':
      return renderSuccessSimilarJobsView()
    // case 'FAILURE':
    //   return renderFailureView()
    default:
      return null
  }
}

export default SimilarJobs
