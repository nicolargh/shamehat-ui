import React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

function Button(props) {
  return (
    <center>
      <PrimaryButton onClick={props.onClick}>{props.value}</PrimaryButton>
    </center>
  );  
}

export default Button;