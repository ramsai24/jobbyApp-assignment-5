import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails, status} = props
  console.log(similarJobDetails, status)

  const similarJobDetailsCamel = similarJobDetails.map(each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
    title: each.title,
  }))

  console.log(similarJobDetailsCamel)

  const renderSuccessSimilarJobsView = () => (
    <ul className="similar-jobs-container">
      {similarJobDetailsCamel.map(each => {
        const {
          companyLogoUrl,
          employmentType,
          jobDescription,
          location,
          rating,
          title,
        } = each

        return (
          <li className="similar-job-container" key={each.id}>
            {each.id}
            <div className="company-logo-title-rating-container">
              <img src={companyLogoUrl} alt="similar job company logo" />
              <div className="title-rating">
                <h1>{title}</h1>
                <p>
                  <AiFillStar />
                  {rating}
                </p>
              </div>
            </div>
            <div>
              <h1>Description</h1>

              <p>{jobDescription}</p>
            </div>
            <div className="location-employmentType   -package-container">
              <p>
                <FaMapMarkerAlt />
                {location} <BsFillBriefcaseFill />
                {employmentType}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )

  switch (status) {
    case 'SUCCESS':
      return renderSuccessSimilarJobsView()

    default:
      return null
  }
}

export default SimilarJobs
