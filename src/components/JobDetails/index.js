import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import FailureView from '../FailureView'
import Skills from '../skills'
import LifeAtCompany from '../LifeAtCompany'
import './index.css'

const JobDetail = props => {
  const {job, status, retry} = props
  //   console.log(job, status)

  const newjobDetails = {
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    lifeAtCompany: job.life_at_company,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    skills: job.skills,
    // .map(each => ({
    //   name: each.name,
    //   imageUrl: each.image_url,
    // })),
    title: job.title,
  }

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    // id,
    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
  } = newjobDetails

  //   console.log(skills)
  //   const newSkillsList = skills.map(each => ({
  //     name: each.name,
  //     imageUrl: each.image_url,
  //   }))

  //   console.log(newSkillsList)

  //   const b = skills.map(each => {
  //     console.log(each)
  //     return {
  //       name: each.name,
  //       imageUrl: each.image_url,
  //     }
  //   })

  //   console.log(b)
  //   const convertSnakeToCamel = args => ({
  //     description: args.description,
  //     imageUrl: args.image_url,
  //   })

  //   const lifeAtCompanyCamel = convertSnakeToCamel(lifeAtCompany)
  //   console.log(lifeAtCompanyCamel)

  const renderSuccessView = () => (
    <div className="job-details-container">
      <div className="company-logo-title-rating-container">
        <img src={companyLogoUrl} alt="job details company logo" />
        <div className="title-rating">
          <h1>{title}</h1>
          <p>
            <AiFillStar />
            {rating}
          </p>
        </div>
      </div>
      <div className="location-employmentType   -package-container">
        <p>
          <FaMapMarkerAlt />
          {location} <BsFillBriefcaseFill />
          {employmentType}
        </p>
        <p>{packagePerAnnum}</p>
      </div>
      <hr />
      <div>
        <div className="visit-container">
          <h1>Description</h1>
          <a className="link" href={companyWebsiteUrl}>
            Visit
            <FiExternalLink className="external-link" />
          </a>
        </div>

        <p>{jobDescription}</p>
      </div>
      <Skills skills={skills} />
      <div>
        <h1>Life at Company</h1>
        <LifeAtCompany lifeAtCompany={lifeAtCompany} />
      </div>
    </div>
  )

  const renderFailureView = () => <FailureView jobDataFun={retry} />

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switch (status) {
    case 'SUCCESS':
      return renderSuccessView()
    case 'FAILURE':
      return renderFailureView()
    default:
      return renderLoadingView()
  }
}

export default JobDetail
