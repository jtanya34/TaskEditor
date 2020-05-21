import React from "react";

export const WorkflowBar = (props) => {
  return (
    <div className="workflow_bar">
      <div>
        <input
          id="WorkflowName"
          type="text"
          label="WorkflowName"
          placeholder="WorkflowName"
        />
      </div>
      <div className="buttons">
        <button
          className="btn shuffle"
          // onClick={() => handleLogin()}
          // disabled={isButtonDisabled}
        >
          Shuffle
        </button>
        <button
          className="btn delete"
          onClick={() => props.DeleteNode(props.workflowId)}
        >
          Delete
        </button>
        <button
          className="btn add_node"
          onClick={() => props.AddNode(props.workflowId)}
        >
          Add Node
        </button>
        <button className="btn save">Save</button>
      </div>
    </div>
  );
};
