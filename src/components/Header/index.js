import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="background-container">
      <nav className="nav-container">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-items-container">
          <li>
            <Link className="nav-link-item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link-item" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logoutBtn" type="button" onClick={onLogOut}>
          Logout
        </button>
      </nav>
      <div className="nav-mobi-container">
        {/* <div> */}
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        {/* </div> */}
        <ul className="nav-items-container">
          <li>
            <Link className="nav-link-item" to="/">
              <AiFillHome className="icons" />
            </Link>
          </li>
          <li>
            <Link className="nav-link-item" to="/Jobs">
              <BsFillBriefcaseFill className="icons" />
            </Link>
          </li>
          <FiLogOut className="nav-link-item icons" onClick={onLogOut} />
        </ul>
      </div>
    </div>
  )
}
export default withRouter(Header)
