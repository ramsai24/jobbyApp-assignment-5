import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  usernameInput = event => this.setState({username: event.target.value})

  passwordInput = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmit = async event => {
    const {username, password} = this.state
    console.log(password)
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: ` *${data.error_msg}`})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <form onSubmit={this.onSubmit} className="login-container">
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
                onChange={this.usernameInput}
                value={username}
                className="inputEl"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="inputEl-container">
              <label className="labelEl" value={password} htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.passwordInput}
                className="inputEl"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
