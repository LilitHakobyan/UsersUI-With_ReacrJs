import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

const User = (props) => {
    console.log(props.isActive);
    let active;
    let admin;
    if(props.isActive===true)
       active="V";
       else
       active="X";
       if(props.isAdministrator===true)
       admin="V";
       else
       admin="X";

  return (  
    <tr>
    <td> X V </td>
    <td> {props.fullName}</td>
    <td>{props.emailAddress}</td>
    <td>{active}</td>
    <td >{admin}</td>    
    </tr>
  );
};

const UserList = (props) => {
  return (
    <div className="container">
    <div className="row">
      <div className="col s12 board">
        <table id="simple-board">
          <thead>
          <tr className="header-row">
           <th>Actions</th>
           <th>Name</th>
           <th>Email Address</th>
           <th>Active?</th>
           <th>Admin?</th>
          </tr>
          </thead>       
          <tbody>
            {props.users.map(user => <User {...user} />)}
           </tbody>
         </table>
      </div>
    </div>
  </div>
  )
}

class Form extends React.Component {
  handleSubmit=(event)=>{
  event.preventDefault();
 axios.get(`http://localhost:55029/api/users`)
      .then(resp => {
        this.props.onSubmit(resp.data);
      })
  };
  render() {
      return (
          <form onSubmit={this.handleSubmit}>
              <button type="submit">Load Users List</button>
          </form>
      );
  }
}

class App extends React.Component {

  state={
    users:[]
  };
  addNewCard=(userInfo)=>
  {
      this.setState(prevState =>({
          users: prevState.users.concat(userInfo)
      }));
  };

  render() {
      return (
          <div>
              <Form onSubmit={this.addNewCard}/>
              <UserList users={this.state.users}/>
          </div>
      );
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

export default App;
