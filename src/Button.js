import React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

function Button(props) {
  return (
      <DefaultButton
        onClick={props.onClick}
      >
        {props.value}
      </DefaultButton>
  );  
}

export default Button;