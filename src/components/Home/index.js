import Header from '../Header'
import './index.css'

const Home = props => {
  const redirectToJobsRoute = () => {
    const {history} = props
    // console.log(history)
    history.replace('/Jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-title">Find The Job That Fits Your Life</h1>
        <p>
          Million of people are searching for jobs,salary information company
          reviews. Find the job that fits your abilities and potential.
        </p>
      </div>
      <button
        className="find-jobs-btn"
        type="button"
        onClick={redirectToJobsRoute}
      >
        Find Jobs
      </button>
    </div>
  )
}

export default Home
