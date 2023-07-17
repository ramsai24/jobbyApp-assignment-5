import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error_msg: ''}

  render() {
    const {username} = this.state
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="logo-container">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>

          <div className="playLoad-container">
            <div className="inputEl-container">
              <label className="labelEl" htmlFor="username">
                USERNAME
              </label>
              <input
                className="inputEl"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="inputEl-container">
              <label className="labelEl" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="inputEl"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button type="button" className="login-button">
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default Login
