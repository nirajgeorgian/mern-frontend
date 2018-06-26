import React, { Component } from 'react'
import { Form, Container } from 'semantic-ui-react'
import config from '../../../config/config'

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    name: this.props.name,
  }

  handleInput = event => {
    event.preventDefault()
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state, null, 2),
      mode: 'cors',
      cache: 'default'
    }
    fetch(config.url + 'posts', options)
      .then(data => {
        this.setState({
          title: '',
          body: '',
        })
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
      })

  }

  render() {
    return (
      <Container>
        <Form onSubmit = { this.onFormSubmit }>
          <Form.Input
            id = 'title'
            label='Post Title'
            placeholder='Enter your post title'
            onChange = { this.handleInput }
            value = { this.state.title }
          />
          <Form.TextArea
            id = 'body'
            label='Your Post'
            placeholder='Tell us more about your post...'
            onChange = { this.handleInput }
            value = { this.state.body }
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}

export default PostForm
