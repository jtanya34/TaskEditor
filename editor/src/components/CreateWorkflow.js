import React, { Component } from "react";
import _ from "lodash";
import { getCookie } from "../utils/gen_fun";

import { WorkflowBar } from "./WorkflowBar";
import { Node } from "./Node";
import { element } from "prop-types";

class CreateWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workflow: {
        nodes: {},
        state: "pending",
        name: "",
        totalNodes: 0,
      },
    };
  }

  componentDidMount() {
    let { workflowId } = this.props;
    let workflow = {};
    workflow[workflowId] = this.state.workflow;
    this.setState({
      workflow,
    });
  }
  AddNode = (workflowId) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    let totalNodes = this.state.workflow[workflowId].totalNodes;
    updatedWorkflow[workflowId].nodes[totalNodes] = {
      flowState: "pending",
      title: "",
      content: "",
    };
    updatedWorkflow[workflowId].totalNodes += 1;

    this.setState({
      workflow: updatedWorkflow,
    });
  };
  DeleteNode = (workflowId) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    let totalNodes = this.state.workflow[workflowId].totalNodes;
    delete updatedWorkflow[workflowId].nodes[totalNodes - 1];
    updatedWorkflow[workflowId].totalNodes -= 1;

    this.setState({
      workflow: updatedWorkflow,
    });
  };

  onAnswerChange = (workflowId, node, index) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    updatedWorkflow[workflowId].nodes[index] = node;

    this.setState({
      workflow: updatedWorkflow,
    });
  };

  render() {
    let login = getCookie("login");
    let { workflowId } = this.props;
    if (this.state.workflow[workflowId]) {
      var { nodes, totalNodes } =
        this.state.workflow && this.state.workflow[workflowId];
    }

    return (
      <div>
        {login ? (
          <div>
            <WorkflowBar
              workflowId={workflowId}
              AddNode={this.AddNode}
              DeleteNode={this.DeleteNode}
            />
            <div className="nodes">
              {_.times(totalNodes, (index) => {
                return (
                  <Node
                    node={nodes[index]}
                    nodeIndex={index}
                    workflowId={workflowId}
                    onAnswerChange={this.onAnswerChange}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}{" "}
      </div>
    );
  }
}

export default CreateWorkflow;
