import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobDetail from '../JobDetails'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const jwtToken = Cookies.get('jwt_token')

class JobItemDetails extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    // const {data} = this.props
    // console.log(data)
    // const {salaryRangesList, employmentTypesList} = data
    // console.log(salaryRangesList, employmentTypesList)

    this.state = {
      jobDetails: [],
      similarJobs: [],
      status: 'INITIAL',
    }
  }

  componentDidMount() {
    this.jobsItemData()
  }

  jobsItemData = async () => {
    this.setState({status: 'LOADING'})

    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    // console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    const updatedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }

    // console.log(updatedData)
    const {jobDetails, similarJobs} = updatedData
    // console.log(similarJobs)

    if (response.ok) {
      this.setState({jobDetails, similarJobs, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  retry = () => this.jobsItemData()

  render() {
    const {jobDetails, similarJobs, status} = this.state
    // console.log(jobDetails, similarJobs, status)

    return (
      <div className="job-item-details-bg-container">
        <Header />
        <JobDetail job={jobDetails} status={status} retry={this.retry} />

        {/* <SimilarJobs similarJobDetails={similarJobs} status={status} /> */}
      </div>
    )
  }
}

export default JobItemDetails
