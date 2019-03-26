import React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

function Receiver(props) {
  return (
    <form>
      <TextField 
        id="receiver-auth"
        label="Enter your victim's auth token" 
        placeholder="Bearer 107-xxxxxxxxxxxxxxxxxxxxx" 
        description="Go to Yammer to take their auth token"
      />
    </form>
  );  
}

export default Receiver;