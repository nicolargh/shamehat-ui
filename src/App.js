import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import Giver from './Giver.js'
import Receiver from './Receiver.js'
import Button from './Button.js'
// import Table from './Table.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alias: null,
      receiver: null
    };
  }


  handleSubmit() {
    var giver = document.getElementById("giver-alias").value;
    var receiver = document.getElementById("receiver-auth").value;
    if (!giver) {
      giver = "anonymous"
    }
    this.setState({
      alias: giver,
      receiver: receiver
    })
  }

  handleLeaderboard() {

  }

  render() {
    return (
        <div class="container">
          <div class="heading p-5">
            You've been shamehatted!
          </div>
          {this.state.alias === null && 
            <div class="row">
              <div class="column section"><Receiver /></div>
              <div class="column section"><Giver /></div>
            </div>
          }
          {this.state.alias === null && 
            <div class="p-4"><Button value="Submit shamehat" onClick={() => this.handleSubmit() } /></div>
          }
          {this.state.alias &&
            <div class="alert alert-primary" role="alert">
              Submitted shamehat for {this.state.receiver} by {this.state.alias}!
            </div>
          }
        </div> 
    );
  }
}

export default App;
