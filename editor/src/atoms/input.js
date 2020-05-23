import React, { useState } from "react";

export const Input = (props) => {
  const [value, setValue] = useState("");

  const onChange = (e, props) => {
    setValue(e.target.value);
    props.onHandleChange(props.name, e.target.value);
  };
  return (
    <textarea
      id={props.name}
      type="text"
      label={props.name}
      placeholder={props.name}
      onChange={(e) => onChange(e, props)}
      className={props.className}
      value={props.value}
    />
  );
};
