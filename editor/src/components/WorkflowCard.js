import React from "react";
import { Tick } from "./Tick";
import { DeleteImg } from "../assets/images/delete";
import { useHistory } from "react-router-dom";

export const WorkflowCard = (props) => {
  const history = useHistory();
  const onHandleChange = (key, value) => {
    let { state, workflowId } = props;
    if (key === "state") {
      state = value;
    }

    props.onAnswerChange(workflowId, state);
  };

  return (
    <div
      className="workflowCard"
      onClick={() => {
        history.push(`/workflow/${props.workflowId}`);
      }}
    >
      <DeleteImg
        onClick={(e) => {
          props.onDelete(props.workflowId);
          e.stopPropagation();
        }}
      />
      <div className="card">
        <span className="workflowname">{props.workflowName}</span>
        <div className="state">
          <span className="status">{props.state}</span>
          <Tick
            className={"tick"}
            onHandleChange={onHandleChange}
            state={props.state}
            ClickWorkflow={true}
            nodeState={props.nodeState}
          />
        </div>
      </div>
    </div>
  );
};
