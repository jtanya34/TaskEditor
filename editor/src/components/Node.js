import React, { useState } from "react";
import { Input } from "../atoms/input";
import { getCookie } from "../utils/gen_fun";

export const Node = (props) => {
  const onHandleChange = (key, value) => {
    let { flowState, title, content } = props.node;
    if (key === "title") {
      title = value;
    } else {
      content = value;
    }

    props.onAnswerChange(
      props.workflowId,
      { flowState, title, content },
      props.nodeIndex
    );
  };
  return (
    <div className="node">
      <Input name={"title"} onHandleChange={onHandleChange} />
      <Input name={"content"} onHandleChange={onHandleChange} />
    </div>
  );
};
