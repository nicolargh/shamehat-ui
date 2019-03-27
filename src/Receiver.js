import React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

function renderDescription() {
  return (
      <small>
        Go to <a href="https://www.yammer.com/graphql">Yammer GraphQL</a> to take their auth token
      </small>
    );
}

function Receiver(props) {
  return (
    <form>
      <TextField 
        id="receiver-auth"
        label="Enter your victim's auth token" 
        prefix="Bearer "
        placeholder="107-xxxxxxxxxxxxxxxxxxxxx" 
        onRenderDescription={() => renderDescription()}
      />
    </form>
  );  
}

export default Receiver;