import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch("/users.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ users: data });
      });
  }

  render() {
    var users = this.state.users.map(user => {
      return (
        <div key={user.id}>
          <h1>{user.id}</h1>
          <h1>{user.name}</h1>
          <p>{user.username}</p>
        </div>
      );
    });

    return <div>{users}</div>;
  }
}

export default Users;
