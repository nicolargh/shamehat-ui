import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import axios from 'axios'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Giver from './Giver.js'
import Receiver from './Receiver.js'
import Button from './Button.js'
import ReceiverTable from './ReceiverTable.js'
import GiverTable from './GiverTable.js'
import ShameGif from './ShameGif.js'
import YammerMessage from './YammerMessage.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      giver: null,
      receiver: null,
      time: null,
      messageUrl: null,
      allReceivers: null,
      allGivers: null
    };

    axios.get('/receivers')
      .then(json => this.setState({
        allReceivers: json.data
      })
    )
      axios.get('/givers')
      .then(json => this.setState({
        allGivers: json.data
      })
    )
  }

  updateState(giver, receiver, messageUrl, allReceivers, allGivers) {
    this.setState({
      giver: giver,
      receiver: receiver,
      time: (new Date()).toISOString(),
      messageUrl: messageUrl,
      allReceivers: allReceivers ? allReceivers : this.state.allReceivers,
      allGivers: allGivers ? allGivers : this.state.allGivers
    })  
  }

  handleSubmit() {
    var giver = document.getElementById("giver-alias").value;
    var receiverToken = document.getElementById("receiver-auth").value;
    var message = document.getElementById("yammer-message").value;
    if (!giver) {
      giver = "anonymous"
    }

    axios.get('/user', {
      params: {
        token: "Bearer " + receiverToken,
        giver: giver,
        message: message
      }
    }).then(json => this.updateState(giver, json.data.full_name, json.data.messageUrl, json.data.receivers, json.data.givers))

  }

  render() {
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
                <div className="column giver-section"><Giver /></div>
                <div className="column receiver-section"><Receiver /></div>
              </div>
              <div className="p-4"><iframe id="graphqlFrame" title="Yammer Graphql iFrame" width="100%" height="50" src="https://www.yammer.com/graphql?" /></div>
              <center><div className="yammer-message"><YammerMessage /></div></center>
              <div className="submit-button"><Button value="Submit shamehat" onClick={() => this.handleSubmit() } /></div>
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
              {this.state.messageUrl === null &&
                <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                  Submitted shamehat for {this.state.receiver} by {this.state.giver} at {this.state.time}!
                </MessageBar>
              }
              {this.state.messageUrl &&
                <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                  Submitted shamehat for {this.state.receiver} by {this.state.giver} at {this.state.time}! View your shamehat message <Link href={this.state.messageUrl}>here.</Link>
                </MessageBar>
              }
            </div>
          }

          <div className="row p-2">
            <div className="column giver-section">
              <Text variant="xxLarge">Top Shamehat Police</Text>
              <GiverTable data={this.state.allGivers}/>
            </div>
            <div className="column receiver-section">
              <Text variant="xxLarge">Top Shamehat Wearers</Text>
              <ReceiverTable data={this.state.allReceivers}/>
            </div>
          </div>
        </div> 
    );
  }
}

export default App;
