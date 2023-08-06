import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Profile from '../Profile'
import JobsContainer from '../JobsContainer'

import './index.css'

const jwtToken = Cookies.get('jwt_token')

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

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
      profileStatus: 'INITIAL',
      salaryRange: '',
      employmentTypeList: [],
      search: '',
    }
  }

  componentDidMount() {
    this.getProfile()
    this.jobsData()
  }

  jobsData = async () => {
    this.setState({status: 'LOADING'})
    const {salaryRange, employmentTypeList, search} = this.state
    // console.log(salaryRange, employmentTypeList)

    const joinEmpLst = employmentTypeList.join(',')
    // console.log(joinEmpLst)
    // const url = 'https://apis.ccbp.in/jobs'
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinEmpLst}&minimum_package=${salaryRange}&search=${search}`
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

    const updatedProfileData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    if (response.ok) {
      this.setState({profile: updatedProfileData, profileStatus: 'SUCCESS'})
    } else {
      this.setState({profileStatus: 'FAILURE'})
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
    // console.log(event.target.value)
    this.setState({salaryRange: event.target.value}, this.jobsData)
  }

  retryCall = () => {
    this.getProfile()
    this.jobsData()
  }

  search = event => this.setState({search: event.target.value})

  pressSearch = () => {
    this.jobsData()
  }

  render() {
    const {profile, jobsList, status, profileStatus} = this.state
    // const {data} = this.props
    // console.log(data)
    // const {employmentTypesList, salaryRangesList} = data
    // console.log(profile, jobsList, status)
    // console.log(`employmentTypeList :${employmentTypeList}`)
    // console.log(employmentTypeList)
    // console.log(jobsList)

    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div className="left-side-Menu">
            <div className="profile-container">
              <Profile
                data={profile}
                status={profileStatus}
                onretry={this.retryCall}
              />
            </div>

            <hr />
            <h1>Type of Employment</h1>
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
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
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
          <div className="right-side-jobs-search-container">
            <div className="input-search-container">
              <input
                onChange={this.search}
                type="search"
                className="inputEl"
                placeholder="Search"
              />
              <button
                data-testid="searchButton"
                type="button"
                onClick={this.pressSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <JobsContainer
              jobsData={jobsList}
              status={status}
              onretry={this.retryCall}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
