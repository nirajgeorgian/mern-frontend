import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import PostForm from './form/index'
import Posts from './posts/index'

class MainLayout extends Component {

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <PostForm
                name = { this.props.name }
                setPosts = { this.props.setPosts }
                posts = { this.props.posts }
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Posts
                posts = { this.props.posts }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default MainLayout
