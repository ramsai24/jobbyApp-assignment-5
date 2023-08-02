import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../Profile'
import JobsContainer from '../JobsContainer'

import './index.css'

const jwtToken = Cookies.get('jwt_token')

class Jobs extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    // const {data} = this.props
    // console.log(data)
    // const {salaryRangesList, employmentTypesList} = data
    // console.log(salaryRangesList, employmentTypesList)

    this.state = {
      jobsList: [],
      profile: [],
      status: 'INITIAL',
      salaryRange: '',
      employmentTypeList: [],
    }
  }

  componentDidMount() {
    this.getProfile()
    this.jobsData()
  }

  jobsData = async () => {
    this.setState({status: 'LOADING'})
    const {salaryRange, employmentTypeList} = this.state
    console.log(salaryRange, employmentTypeList)

    const joinEmpLst = employmentTypeList.join(',')
    console.log(joinEmpLst)
    // const url = 'https://apis.ccbp.in/jobs'
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinEmpLst}&minimum_package=${salaryRange}&search=${''}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    const {jobs} = data

    const updatedListData = jobs.map(eachJob => ({
      id: eachJob.id,
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
      packagePerAnnum: eachJob.package_per_annum,
    }))

    // console.log(updatedListData)

    if (response.ok) {
      this.setState({jobsList: updatedListData, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  getProfile = async () => {
    this.setState({status: 'LOADING'})
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

    const updatedProfileData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    if (response.ok) {
      this.setState({profile: updatedProfileData, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  check = event => {
    // console.log(event.target.value)
    const type = event.target.value
    const {employmentTypeList} = this.state

    if (employmentTypeList.includes(type)) {
      const updateList = employmentTypeList.filter(each => each !== type)
      this.setState({employmentTypeList: updateList}, this.jobsData)
    } else {
      this.setState(
        prev => ({
          employmentTypeList: [...prev.employmentTypeList, type],
        }),
        this.jobsData,
      )
    }
  }

  salaryCheck = event => {
    console.log(event.target.value)
    this.setState({salaryRange: event.target.value}, this.jobsData)
  }

  retryCall = () => this.getProfile()

  render() {
    const {profile, jobsList, status, employmentTypeList} = this.state
    const {data} = this.props
    const {employmentTypesList, salaryRangesList} = data
    // console.log(profile, jobsList, status)
    // console.log(`employmentTypeList :${employmentTypeList}`)
    // console.log(employmentTypeList)
    // console.log(jobsList)

    return (
      <div className="jobs-bg-container">
        <Header />
        <div>
          <div className="left-side-Menu">
            <div className="profile-container">
              <Profile
                data={profile}
                status={status}
                onretry={this.retryCall}
              />
            </div>
            <h1>Type of Employment</h1>
            <hr />
            <ul>
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    id="label"
                    value={each.employmentTypeId}
                    type="checkbox"
                    onClick={this.check}
                  />
                  <label htmlFor="label">{each.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    id="salarylabel"
                    value={each.salaryRangeId}
                    type="radio"
                    onClick={this.salaryCheck}
                    name="salaryRange"
                  />
                  <label htmlFor="salarylabel">{each.label}</label>
                </li>
              ))}
            </ul>
            {/* <ul>
              {jobsList.map(each => (
                <li key={each.id}>{each.packagePerAnnum}</li>
              ))}
            </ul> */}
          </div>
          <div>
            <div>
              <input type="search" />
            </div>
            <JobsContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
