import React from 'react';

function Button(props) {
  return (
      <button 
        type="button" 
        class="btn btn-primary"
        onClick={props.onClick}
      >
        {props.value}
      </button>
  );  
}

export default Button;