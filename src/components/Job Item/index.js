import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationPin} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobData} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div className="job-box">
          <div className="company-logo-title-rating-container">
            <img src={companyLogoUrl} alt="company logo" />
            <div className="title-rating">
              <h1>{title}</h1>
              <p>
                <AiFillStar />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-employmentType-container">
            <p>
              <MdLocationPin />
              {location}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
