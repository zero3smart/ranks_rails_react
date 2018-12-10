import React, { Component } from "react";



import CommentBox from "../components/CommentBox";

class PostShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            comment: "",
            id: "",
            post: "",

            title: "",
            error: "",
            body: "",
            commentable_id: "",
            commentable_type: ""
        };
    }

    componentDidMount() {
        this.fetchPost();
        this.getComments();
    }

    fetchPost() {
        return fetch("/posts/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",

            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    title: json.title,
                    post: this.props.match.params.id,
                    id: json.id
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    postComment(e) {
        this.setState({ body: e.target.value });
    }
    getComments =() => {

        console.log(this);
       return fetch("/posts/" + this.props.match.params.id + "/comments", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",

            }
        })
            .then(response => {
                return response.json();

            })

            .catch(err => {
                console.log(err);
            });
    }


  // transform Contentful entries to objects that react-commentbox expects.
   // normalizeComment = (comment) => {

     //   const { id} = comment;
       // const {body }= comment;

        //return {
          //  id,
            //body: body,
            //bodyDisplay: body

     //   };
    //}





        // make an API call to post a comment
    comment = (comment) => {
        console.log(this)
 return fetch("/comments", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                comment: {
                    commentable_id: this.props.match.params.id,
                    //body: this.state.body,
                    commentable_type: "Post",
                    comment: this.state.comment

                }
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
           ///do something later


                } else {
                    return response.json();
                    //let errors = response.json();
                    //throw errors;
                }
            })
            .then(response => {
                this.setState({
                    errors: response
                });
            })
            .catch(err => {});
    }

    submitComment() {
        fetch("/comments", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                comment: {
                    commentable_id: this.props.match.params.id,
                    body: this.state.body,
                    commentable_type: "Post"
                }
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    this.setState({
                    body: response

                });


                } else {
                    return response.json();
                    //let errors = response.json();
                    //throw errors;
                }
            })
            .then(response => {
                this.setState({
                    errors: response
                });
            })
            .catch(err => {});
    }

    render() {
        return (
            <div>
                {this.state.title}
                <div>
                    <h2>Comments</h2>

                    <CommentBox
                        getComments={this.getComments}
                        //normalizeComment={ this.normalizeComment }
                        comment={this.comment}
                    />
                </div>
            </div>

            /// <form>
            ///  <textarea
            ///   name="comment"
            //  rows={this.props.textareaRows}
            //  placeholder="post a comment"
            //  value={this.state.body}
            // onChange={this.postComment.bind(this)}
            ///>
            // <button
            //   onClick={this.submitComment.bind(this)}
            // type="submit"
            // >
            //   Submit
            //</button>
            ///</form>
        );
    }
}

export default PostShow;