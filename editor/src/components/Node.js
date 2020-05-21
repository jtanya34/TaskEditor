import React from "react";
import { Input } from "../atoms/input";
import { Tick } from "../assets/images/tick";

export const Node = (props) => {
  const onHandleChange = (key, value) => {
    let { flowState, title, content, nodeId } = props.node;
    if (key === "title") {
      title = value;
    } else if (key === "content") {
      content = value;
    } else {
      flowState = value;
    }

    props.onAnswerChange(
      props.workflowId,
      { flowState, title, content, nodeId },
      props.nodeIndex
    );
  };
  return (
    <div className="node">
      <Tick
        onHandleChange={onHandleChange}
        flowState={props.node.flowState}
        nextFlowState={props.nextFlowState}
        prevFlowState={props.prevFlowState}
      />
      <Input name={"title"} onHandleChange={onHandleChange} />
      <Input name={"content"} onHandleChange={onHandleChange} />
    </div>
  );
};
