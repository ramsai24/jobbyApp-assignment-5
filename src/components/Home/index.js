import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  //   const redirectToJobsRoute = () => {
  //     const {history} = props
  //     // console.log(history)
  //     history.replace('/Jobs')
  //   }

  <div className="home-bg-container">
    <Header />
    <div className="home-content-container">
      <h1 className="home-title">Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs,salary information company
        reviews. Find the job that fits your abilities and potential.
      </p>
    </div>
    <Link to="/jobs">
      <button
        className="find-jobs-btn"
        type="button"
        //   onClick={redirectToJobsRoute}
      >
        Find Jobs
      </button>
    </Link>
  </div>
)

export default Home
