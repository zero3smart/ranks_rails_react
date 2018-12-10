import React, { Component } from "react";

import NotificationSystem from "react-notification-system";



import { Link } from "react-router-dom";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      //page: 1,
      //pages: 0,
      error: ""
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




  fetchPosts(page) {
    //console.log('^^^^^', page);
    var self = this;
    fetch(`/posts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        
      },
     
    })
      .then(data => data.json())
      .then(data => {
        if (data) {
          self.setState({
            posts: data.posts
          
          });
        } else {
          //return resp.json();
          this._notificationSystem.addNotification({
            message: "Something went wrong",
            level: "error",
            position: "tc"
          });
        }
      })

      .catch(err => {});
  }


  render() {
    var posts = this.state.posts.map(post => {
      return (
        <div key={post.id}>
          <ul>
            <li>
              {" "}
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>

            <li>{post.body}</li>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <NotificationSystem ref="notificationSystem" noAnimation={true} />

        {posts}

       
      </div>
    );
  }
}

export default Posts;
