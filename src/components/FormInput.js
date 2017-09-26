import React from 'react';

function FormInput(props) {
  return (
    <input
      type={props.inputType}
      className={props.cName}
      valueLink={props.valueLink}
      placeholder={props.pholder}/>
  );
}

export default FormInput;
