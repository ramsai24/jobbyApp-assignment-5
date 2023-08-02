import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails, status} = props
  console.log(similarJobDetails, status)

  const renderSuccessSimilarJobsView = () => (
    <div className="color">
      <ul>
        {similarJobDetails.map(each => (
          <li key={each.id}>{each.id}</li>
        ))}
      </ul>
    </div>
  )

  switch (status) {
    case 'SUCCESS':
      return renderSuccessSimilarJobsView()

    default:
      return null
  }
}

export default SimilarJobs
