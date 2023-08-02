import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'
// import {HiMapPin} from 'react-icons/hi'
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
          <div className="location-employmentType-package-container">
            <p>
              <FaMapMarkerAlt />
              {location} <BsFillBriefcaseFill />
              {employmentType}
            </p>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <p>Description</p>
            <p>{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
