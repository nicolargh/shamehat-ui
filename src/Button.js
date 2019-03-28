import React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

function Button(props) {
  return (
    <center>
      <PrimaryButton onClick={props.onClick}><b>{props.value}</b></PrimaryButton>
    </center>
  );  
}

export default Button;