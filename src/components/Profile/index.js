import Loader from 'react-loader-spinner'
import './index.css'

const Profile = props => {
  const {data, status, onretry} = props
  console.log(data, status)

  const renderSuccessProfileView = () => {
    const {name, profileImageUrl, shortBio} = data
    // console.log(name, profileImageUrl, shortBio)
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profileImage" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

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
      return renderSuccessProfileView()
    case 'FAILURE':
      return renderFailureView()
    default:
      return renderLoadingView()
  }
}

export default Profile
