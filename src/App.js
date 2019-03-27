import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import axios from 'axios'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
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
      time: null,
      allReceivers: null
    };

    axios.get('/receivers')
      .then(json => this.setState({
        giver: this.state.giver,
        receiver: this.state.receiver,
        time: this.state.time,
        allReceivers: json.data
      })
    )
  }

  updateState(giver, receiver) {
    this.setState({
      giver: giver,
      receiver: receiver,
      time: (new Date()).toISOString(),
      allReceivers: this.state.allReceivers
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

    let heading;
    if (this.state.giver === null) {
      heading = "It's time to shamehat!"
    } else {
      heading = "You've been given a shamehat!"
    }

    return (
        <div className="container">
          <div className="heading p-5">{heading}</div>
          {this.state.giver === null && 
            <div>
            <div className="row p-2">
              <div className="column section"><Giver /></div>
              <div className="column section"><Receiver /></div>
            </div>
            <iframe id="graphqlFrame" title="Yammer Graphql iFrame" width="90%" height="50" src="https://www.yammer.com/graphql?" />
            <div className="p-4"><Button value="Submit shamehat" onClick={() => this.handleSubmit() } /></div>
            </div>
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

          <div className="row p-4">
            <div className="column section">
              <Text variant="xxLarge">Top Shamehat Wearers</Text>
              <ReceiverTable data={this.state.allReceivers}/>
            </div>
            <div className="column section">
              <Text variant="xxLarge">Top Shamehat Police</Text>
              <GiverTable data={giverData}/>
            </div>
          </div>
        </div> 
    );
  }
}

export default App;
