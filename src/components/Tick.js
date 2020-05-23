import React, { useState } from "react";
import { TickImg } from "../assets/images/tick";

export const Tick = (props) => {
  let newcolor = "";
  let { flowState, state } = props;
  if (flowState && flowState === "completed") newcolor = "#00c853";
  else if (flowState && flowState === "Inprogress") newcolor = "#2962ff";
  else if (state && state === "completed") newcolor = "#00c853";
  else newcolor = "#616161";
  let [color, setColor] = useState(newcolor);

  const nodeState = () => {
    let { flowState, nextFlowState, prevFlowState } = props;
    if (flowState === "pending") {
      setColor("#2962ff");
      props.onHandleChange("flowState", "Inprogress");
    } else if (
      flowState === "Inprogress" &&
      (prevFlowState === "completed" || prevFlowState === null)
    ) {
      setColor("#00c853");
      props.onHandleChange("flowState", "completed");
    } else if (flowState === "completed" && nextFlowState !== "completed") {
      setColor("#616161");
      props.onHandleChange("flowState", "pending");
    }
  };

  const workflowState = () => {
    let { state, nodeState } = props;
    if (state === "pending" && nodeState !== "pending") {
      setColor("#00c853");
      props.onHandleChange("state", "completed");
    } else if (state === "completed" && nodeState !== "completed") {
      setColor("#616161");
      props.onHandleChange("state", "pending");
    } else if (state === "completed") {
      setColor("#00c853");
    }
  };
  const onClick = (e) => {
    let { ClickNode, ClickWorkflow } = props;

    if (ClickNode) {
      nodeState();
    } else if (ClickWorkflow) {
      workflowState();
    }
    e.stopPropagation();
  };
  return (
    <TickImg
      className={props.className}
      color={color}
      onClick={(e) => onClick(e)}
    />
  );
};
