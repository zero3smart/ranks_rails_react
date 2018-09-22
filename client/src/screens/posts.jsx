import React, { Component } from "react";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch("/posts.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ posts: data });
      });
  }

  render() {
    var posts = this.state.posts.map(post => {
      return (
        <div key={post.id}>
          <h1>{post.id}</h1>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      );
    });

    return <div>{posts}</div>;
  }
}

export default Posts;
