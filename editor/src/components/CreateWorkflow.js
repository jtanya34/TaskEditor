import React, { Component } from "react";
import _ from "lodash";
import { getCookie } from "../utils/gen_fun";
import { setCookie } from "../utils/gen_fun";
import { WorkflowBar } from "./WorkflowBar";
import { Node } from "./Node";
import { deleteCookie } from "../utils/gen_fun";

class CreateWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workflow: {
        nodes: {
          0: { flowState: "pending", title: "", content: "", nodeId: 0 },
        },
        state: "pending",
        name: "",
        totalNodes: 1,
      },
    };
  }

  componentDidMount() {
    let { workflowId } = this.props.match.params;
    let workflow = {};
    let workflows = getCookie("workflows");
    workflows = JSON.parse(workflows);
    if (workflows[workflowId]) {
      workflow[workflowId] = workflows[workflowId];
      this.setState({ workflow: workflow });
    } else {
      workflow[workflowId] = this.state.workflow;
      this.setState({
        workflow,
      });
    }
  }
  AddNode = (workflowId) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    let totalNodes = this.state.workflow[workflowId].totalNodes;
    updatedWorkflow[workflowId].nodes[totalNodes] = {
      flowState: "pending",
      title: "",
      content: "",
      nodeId: totalNodes,
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
  workflowNameChange = (workflowId, name) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    updatedWorkflow[workflowId].name = name;

    this.setState({
      workflow: updatedWorkflow,
    });
  };
  onAnswerChange = (workflowId, node, index) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    updatedWorkflow[workflowId].nodes[index] = node;
    updatedWorkflow[workflowId].state =
      node.flowState !== "completed"
        ? "pending"
        : updatedWorkflow[workflowId].state;
    this.setState({
      workflow: updatedWorkflow,
    });
  };

  onShuffleNodes = (workflowId, nodes) => {
    let updatedWorkflow = Object.assign({}, this.state.workflow);
    updatedWorkflow[workflowId].nodes = nodes;

    this.setState({
      workflow: updatedWorkflow,
    });
  };

  onSave = () => {
    let { workflowId } = this.props.match.params;
    let { workflow } = this.state;
    let nodes = workflow[workflowId].nodes;
    let nodesEmpty = false;
    _.times(workflow[workflowId].totalNodes, (index) => {
      if (nodes[index].title === "" || nodes[index].content === "")
        nodesEmpty = true;
    });
    if (workflow[workflowId].name !== "" && !nodesEmpty) {
      let workflows = getCookie("workflows")
        ? JSON.parse(getCookie("workflows"))
        : "";
      workflows[workflowId] = workflow[workflowId];
      deleteCookie("workflows");
      setCookie("workflows", JSON.stringify(workflows));
      this.props.history.push("/workflows");
    }
  };

  render() {
    let login = getCookie("login");
    let { workflowId } = this.props.match.params;
    if (this.state.workflow[workflowId]) {
      var { nodes, totalNodes, name } =
        this.state.workflow && this.state.workflow[workflowId];
    }

    return (
      <div>
        {login ? (
          <div key={workflowId}>
            <WorkflowBar
              workflowId={workflowId}
              AddNode={this.AddNode}
              DeleteNode={this.DeleteNode}
              WorkflowName={this.workflowNameChange}
              onShuffleNodes={this.onShuffleNodes}
              nodes={nodes}
              name={name}
              onSave={this.onSave}
              history={this.props.history}
            />
            <div className="nodes">
              {_.times(totalNodes, (index) => {
                return (
                  <Node
                    key={nodes[index].nodeId}
                    node={nodes[index]}
                    nodeIndex={index}
                    workflowId={workflowId}
                    onAnswerChange={this.onAnswerChange}
                    nextFlowState={
                      index < totalNodes - 1 ? nodes[index + 1].flowState : null
                    }
                    prevFlowState={
                      index !== 0 ? nodes[index - 1].flowState : null
                    }
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
