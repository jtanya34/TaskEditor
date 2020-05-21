import React, { Component } from "react";
import { getCookie } from "../utils/gen_fun";
import CreateWorkflow from "./CreateWorkflow";

class Workflows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workflows: {
        3456: {
          nodes: {
            0: {
              flowState: "pending",
              title: "",
              content: "",
            },
          },
          state: "pending",
          name: "",
          totalNodes: 1,
        },
      },
    };
  }
  onSave = (workflowId,workflow) => {
    console.log('save')
    let updatedWorkflows = Object.assign({}, this.state.workflows);
    updatedWorkflows[workflowId] = workflow;
    this.setState({
      workflows: updatedWorkflows,
    });
  };
  render() {
    let { workflows } = this.state;
    if (getCookie("login"))
      return (
        <CreateWorkflow
          workflows={workflows}
          workflowId={"2345"}
          onSave={this.onSave}
        />
      );
    this.props.history.push("/");
    return "";
  }
}

export default Workflows;
