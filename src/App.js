import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './component/navbar/navbar'
import MainLayout from './component/main/index'
import './App.css'

class App extends Component {
  state = {
    isAuthenticated: false,
    token: '',
    user: null,
    posts: []
  }

  loginSuccess = (isAuthenticated, token, user) => {
    this.setState({
      isAuthenticated,
      token,
      user
    })
  }

  setPosts = posts => {
    this.setState({
      posts
    })
  }

  render() {
    return (
      <Container>
        <Navbar
          isAuthenticated = { this.state.isAuthenticated }
          loginSuccess = { this.loginSuccess }
          setPosts = { this.setPosts }
        />
      {
        this.state.isAuthenticated === true
        ? <MainLayout
            name = { this.state.user.name}
            setPosts = { this.setPosts }
            posts = { this.state.posts }
          />
        : <div>Login to continue </div>
      }
      </Container>
    );
  }
}

export default App;
