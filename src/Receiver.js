import React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

function Receiver(props) {
  return (
    <form>
      <TextField 
        id="receiver-auth"
        label="Enter your victim's auth token" 
        prefix="Bearer "
        placeholder="107-xxxxxxxxxxxxxxxxxxxxx" 
        description="Copy their bearer token from below! ⤵"
      />
    </form>
  );  
}

export default Receiver;