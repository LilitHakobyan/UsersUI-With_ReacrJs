import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

const Card = (props) => {
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
    //   <div style={{ margin: '1em' }}>
    //       <img width="75" alt="X" src={props.avatar_url} />
    //       <div style={{ display: 'inline-block', marginLeft: 10 }}>
    //           <div> {props.fullName} </div>
    //           <div> {props.emailAddress} </div>
    //           <div> {active} </div> 
    //           <div> {admin} </div>
    //       </div>
    //   </div>
 
    <tr>
    <td> X V </td>
    <td> {props.fullName}</td>
    <td>{props.emailAddress}</td>
    <td>{active}</td>
    <td >{admin}</td>    
    </tr>
  );
};

const CardList = (props) => {

  return (
    //   <div>
    //       {props.cards.map(card => <Card {...card} />)}
    //   </div>
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
           {/* {rows} */}         
          <tbody>
            {props.cards.map(card => <Card {...card} />)}
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
    cards:[ ]
  };
  addNewCard=(cardInfo)=>
  {
      this.setState(prevState =>({
          cards: prevState.cards.concat(cardInfo)
      }));
  };

  render() {
      return (
          <div>
              <Form onSubmit={this.addNewCard}/>
              <CardList cards={this.state.cards}/>
          </div>
      );
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

export default App;
