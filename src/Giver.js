import React from 'react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

function Giver(props) {
  return (
    <form>
      <TextField
        id="giver-alias"
        label="Enter your name (for credit)" 
        placeholder="Mr. Shamehat policeman" 
        description="Leave blank to remain anonymous"
      />
    </form>
  );  
}

export default Giver;