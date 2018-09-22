import React, { Component } from "react";
import Pagination from "../components/pagination";
import NotificationSystem from 'react-notification-system';
import auth from "../services/auth";
import axios from 'axios';
class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      data: [],
       page: 1,
      pages: 0,
      error: ""
    };
  }



  componentDidMount() {
  this.fetchPosts(this.state.page);
  }


async fetchPosts(page) {
  var self = this;
  try {
    const response = await axios.get('/posts', {
     headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Access: auth.getToken()
      },
      data: { page: page },

//data: { page: this.state.page },
});
      
 if (response.status >= 200 && response.status < 300) {
        
         self.setState({ posts: response.data.posts, pages: parseInt(response.data.pages),
         page: parseInt(response.data.page) });

            } else {
              
                this._notificationSystem.addNotification({
                message: 'Password not present, please check and try again',
                level: 'error',
                position: 'tc'
            });
                
            }


  } catch (error) {
    console.error(error);
  }
}


    handleChangePage(page) {
    this.fetchPosts(page);
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

    return (
      <div>

                <NotificationSystem ref="notificationSystem" noAnimation={true}/>
      {posts}
      
 <Pagination page={this.state.page}
                        pages={this.state.pages}
                        handleChangePage={this.handleChangePage} />
                        </div>

      );
  }
}

export default Posts;
