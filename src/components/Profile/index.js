import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const jwtToken = Cookies.get('jwt_token')

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {profileStatus: 'INITIAL', profile: []}
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: 'LOADING'})
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    // console.log(data.profile_details)

    if (response.ok) {
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profile: updatedProfileData, profileStatus: 'SUCCESS'})
    } else {
      this.setState({profileStatus: 'FAILURE'})
    }
  }

  renderSuccessProfileView = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    // console.log(name, profileImageUrl, shortBio)
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profileImage" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  onretryProfile = () => {
    this.getProfile()
  }

  onRetry = () => this.onretryProfile()

  renderFailureView = () => (
    <button type="button" onClick={this.onRetry}>
      Retry
    </button>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileStatus} = this.state
    console.log(`profileApi : ${profileStatus}`)

    switch (profileStatus) {
      case 'SUCCESS':
        return this.renderSuccessProfileView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }
}

export default Profile
