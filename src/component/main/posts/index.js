import React, { Component } from 'react'
import PostsList from './posts'

class Posts extends Component {
  updatePosts = posts => {
    this.setState({
      posts
    })
  }

  render() {
    if(this.props.posts !== []) {
      return <PostsList posts = { this.props.posts } />
    } else {
      return (
        <div>Loading Posts...</div>
      )
    }
  }
}

export default Posts
