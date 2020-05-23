import React from "react";
import { Input } from "../atoms/input";
import { Tick } from "./Tick";

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
        className={"tick"}
        onHandleChange={onHandleChange}
        flowState={props.node.flowState}
        nextFlowState={props.nextFlowState}
        prevFlowState={props.prevFlowState}
        ClickNode={true}
      />
      <Input
        name={"title"}
        onHandleChange={onHandleChange}
        value={props.node.title}
      />
      <Input
        name={"content"}
        onHandleChange={onHandleChange}
        value={props.node.content}
      />
    </div>
  );
};
