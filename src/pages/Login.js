import React, { Component } from 'react';
import auth from '../lib/auth-service';
import './Auth.css';
import { Link } from 'react-router-dom';
// import { AuthConsumer } from '../components/AuthProvider';


class Login extends Component {
  state = {
    username: "",
    password: "",
    isWrong: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
    })
    .catch( error => {
      console.log('hhh',error)
      this.setState({
        isWrong: true,
      })
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, isWrong } = this.state;
    return (
      <div className="auth-container">
        <div className="border-auth-container">
          <form className="form-container" onSubmit={this.handleFormSubmit}>
            <img className="logo" src={require("../images/logo.png")} alt="logo"/>
            <div className="signup-form">
              <div className="signup-input">
                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="username"/>
              </div>
              <div className="signup-input">
                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="password"/>
              </div>
              <input className="auth-button" type="submit" value="Login"/>
            </div>
            <div className="switch-auth">
              { isWrong ? 
                <div className="incorrect-message">
                  <p>Incorrect username or password</p>
                </div>
              : null }
              <p>Don't have an account? 
                <Link to={"/signup"}> Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;