import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import config from '../../config/config'
import './navbar.css'

export default class Navbar extends Component {
  state = {

  }

  responseGoogleSuccess = response => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
    fetch(config.url + 'auth/google', options)
    .then(data => {
      // Successfully logged into the app
      const token = data.headers.get('x-auth-token')
      data.json().then(user => {
        if(token) {
          this.props.loginSuccess(true, token, user)
          const options2 = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          }
          fetch(config.url + 'posts', options2)
            .then(postPromise => {
              postPromise.text()
                .then(data => {
                  this.props.setPosts(JSON.parse(data))
                })
            })
        }
      })
    })
  }

  responseGoogleFailure = response => {
    this.props.loginSuccess(false, "", null)
  }

  handleLogout = response => {
    this.props.loginSuccess(false, "", null)
  }

  render() {
    const logout = this.props.isAuthenticated === true ?
      <GoogleLogout
        className="account centermargin"
        buttonText="Logout"
        onLogoutSuccess={this.handleLogout}
      >
      </GoogleLogout>
    : <GoogleLogin
        className="account centermargin"
        clientId="931728103562-kivlmr53i8ckklnb9lj2nrtthv38qk9a.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={this.responseGoogleSuccess}
        onFailure={this.responseGoogleFailure}
      />
    return (
      <div>
        <Menu secondary>
          <Menu.Item name='MERN App' className="centermargin" />
          <Menu.Menu position='right'>
            { logout }
          </Menu.Menu>
        </Menu>
        <hr />
      </div>
    )
  }
}
