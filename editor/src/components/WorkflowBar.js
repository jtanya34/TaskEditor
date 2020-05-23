import React, { useEffect, useState } from "react";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { getRandomInt } from "../utils/gen_fun";
import _ from "lodash";
import cx from "classnames";


export const WorkflowBar = (props) => {
  
  const [shuffle, setShuffle] = useState(true);
  const onHandleChange = (key, value) => {
    props.WorkflowName(props.workflowId, value);
  };
  const onShuffleChange = (nodes) => {
    let totalNodes = Object.keys(nodes).length - 1;
    let rndNo1 = getRandomInt(0, totalNodes);
    let rndNo2 = getRandomInt(0, totalNodes);
    if (rndNo1 !== rndNo2) {
      let node = nodes[rndNo1];
      nodes[rndNo1] = nodes[rndNo2];
      nodes[rndNo2] = node;
    }
    props.onShuffleNodes(props.workflowId, nodes);
  };

  useEffect(() => {
    if (props && props["nodes"]) {
      let totalNodes = Object.keys(props.nodes).length;
      _.times(totalNodes, (index) => {
        if (props.nodes[index].flowState !== "completed") {
          setShuffle(false);
        } else {
          setShuffle(true);
        }
      });
    }
  });
  return (
    <div className="workflow_bar">
      <div>
        <Input
          name={"WorkflowName"}
          value={props.name}
          onHandleChange={onHandleChange}
          workflowId={props.workflowId}
        />
      </div>
      <div className="buttons">
        <button
          className={cx("btn", "shuffle", shuffle === false ? "hide" : "")}
          onClick={() => {
            onShuffleChange(props.nodes);
          }}
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
        <button 
        className="btn save" onClick={() => props.onSave()}>
          Save
        </button>
        <Button
        color={'#0d47a1'}
        onClick={()=>props.history.push('/workflows')}
        name='Show Workflows'
        />
      </div>
    </div>
  );
};
