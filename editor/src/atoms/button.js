import React from "react";
import cx from 'classnames'
export const Button = (props) => {
  

  const onClick = () => {
    props.onClick(props.workflowId);
  };
  return (
    <button 
    className={cx('btn', props.class) }
    style ={{backgroundColor:props.color}}
    onClick={onClick}>
   {props.name}
  </button>
  );
};
