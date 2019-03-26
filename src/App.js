import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import Giver from './Giver.js'
import Button from './Button.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alias: null
    };
  }


  handleSubmit() {
    var nameValue = document.getElementById("alias").value;
    if (!nameValue) {
      nameValue = "anonymous"
    }
    this.setState({
      alias: nameValue,
    })
  }

  handleLeaderboard() {

  }

  render() {

    return (
        <div class="container App">
          <div class="section heading">
            Shamehatting username!
          </div>
          <div class="section">
            <Giver />
          </div>
          <div class="section text-left">
            <Button value="Submit shamehat" onClick={() => this.handleSubmit() } />
            <p />
            <Button value="View leaderboard" onClick={() => this.handleLeaderboard() } />
            <p />
            {this.state.alias &&
              <div class="alert alert-primary" role="alert">
                Submitted shamehat for username by {this.state.alias}!
              </div>
            }
          </div>
        </div>
    );
  }
}

export default App;
