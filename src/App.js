import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import axios from 'axios'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import Giver from './Giver.js'
import Receiver from './Receiver.js'
import Button from './Button.js'
import ReceiverTable from './ReceiverTable.js'
import GiverTable from './GiverTable.js'
import ShameGif from './ShameGif.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      giver: null,
      receiver: null,
      time: null
    };
  }

  updateState(giver, receiver) {
    this.setState({
      giver: giver,
      receiver: receiver,
      time: Date.now()
    })  
  }

  handleSubmit() {
    var giver = document.getElementById("giver-alias").value;
    var receiverToken = document.getElementById("receiver-auth").value;
    if (!giver) {
      giver = "anonymous"
    }

    axios.get('/user', {
      params: {
        token: "Bearer " + receiverToken
      }
    }).then(json => this.updateState(giver, json.data.full_name))

  }

  render() {
    const giverData = [
      {name: "Person 1", times: 10},
      {name: "Person 2", times: 11},
      {name: "Person 3", times: 100},
      {name: "Person 4", times: 5},
      {name: "Person 5", times: 1},
      {name: "Person 6", times: 8},
      {name: "Person 7", times: 15},
      {name: "Person 8", times: 10}
    ]
    const receiverData = [
      {id: 1, name: "Person 1", lastTime: 1553632625, times: 1},
      {id: 2, name: "Person 2", lastTime: 1553632525, times: 30},
      {id: 3, name: "Person 3", lastTime: 1553632615, times: 13},
      {id: 4, name: "Person 4", lastTime: 1553532625, times: 21},
      {id: 5, name: "Person 5", lastTime: 1553636999, times: 68},
      {id: 6, name: "Person 6", lastTime: 1553234625, times: 90},
      {id: 7, name: "Person 7", lastTime: 1553631235, times: 13},
      {id: 8, name: "Person 8", lastTime: 1553635999, times: 2}
    ]

    let heading;
    if (this.state.giver === null) {
      heading = "It's time to shamehat!"
    } else {
      heading = "You've been given a shamehat!"
    }

    return (
        <div class="container">
          <div class="heading p-5">{heading}</div>
          {this.state.giver === null && 
            <div class="row">
              <div class="column section"><Receiver /></div>
              <div class="column section"><Giver /></div>
            </div>
          }
          {this.state.giver === null && 
            <div class="p-4"><Button value="Submit shamehat" onClick={() => this.handleSubmit() } /></div>
          }
          {this.state.giver && this.state.receiver === null &&
            <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
              Could not authenticate user. Shamehat not submitted!
            </MessageBar>
          }
          {this.state.giver && this.state.receiver && 
            <div>
              <ShameGif />
              <p />
              <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                Submitted shamehat for {this.state.receiver} by {this.state.giver} at {this.state.time}!
              </MessageBar>
            </div>
          }

          <div class="row p-4">
            <div class="column section">
              <large>Top Shamehat Wearers</large>
              <ReceiverTable data={receiverData}/>
            </div>
            <div class="column section">
              <large>Top Shamehat Police</large>
              <GiverTable data={giverData}/>
            </div>
          </div>
        </div> 
    );
  }
}

export default App;
