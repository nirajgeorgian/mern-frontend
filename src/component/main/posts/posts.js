import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

class PostsList extends Component {
  render() {
    let posts = this.props.posts
    console.log(posts);
    return (
      <List animated verticalAlign='middle'>
      { posts.map(post => {
        return (
          <List.Item key = { post._id }>
            <List.Icon name='point' />
            <List.Content>
              <List.Header>{ post.title }</List.Header>
              <List.Description>{ post.body } - <small>By { post.name }</small></List.Description>
            </List.Content>
          </List.Item>
        )
      })}
      </List>
    )
  }
}

export default PostsList
