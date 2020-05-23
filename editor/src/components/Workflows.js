import React, { Component } from "react";
import { getCookie } from "../utils/gen_fun";
import cx from "classnames";
import _ from "lodash";
import { setCookie } from "../utils/gen_fun";
import { deleteCookie } from "../utils/gen_fun";
import { WorkflowCard } from "./WorkflowCard";
import { Input } from "../atoms/input";
import { getRandomInt } from "../utils/gen_fun";

class Workflows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workflows: {},
      hideDropdown: "hide",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    let workflows = getCookie("workflows");
    if (workflows) {
      this.setState({ workflows: JSON.parse(workflows) });
    } else {
      deleteCookie("workflows");
      setCookie("workflows", JSON.stringify(this.state.workflows), 30);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  createWorkflow = () => {
    let workflowId = getRandomInt(0, 100);
    let updatedWorkflows = Object.assign({}, this.state.workflows);
    updatedWorkflows[workflowId] = {};

    this.props.history.push({ pathname: `/workflow/${workflowId}` });
    this.setState({
      workflows: updatedWorkflows,
    });
  };

  onWorkflowSateChange = (workflowId, state) => {
    let updatedWorkflows = Object.assign({}, this.state.workflows);
    updatedWorkflows[workflowId].state = state;
    deleteCookie("workflows");
    setCookie("workflows", JSON.stringify(updatedWorkflows));
    this.setState({ workflows: updatedWorkflows });
    return;
  };

  onDelete = (workflowId) => {
    let updatedWorkflows = Object.assign({}, this.state.workflows);
    delete updatedWorkflows[workflowId];
    deleteCookie("workflows");
    setCookie("workflows", JSON.stringify(updatedWorkflows));
    this.setState({ workflows: updatedWorkflows });
    return;
  };

  nodeState = (id) => {
    let state = "completed";
    let { workflows } = this.state;
    let { totalNodes, nodes } = workflows[id];
      _.times(totalNodes, (index) => {
        if (
          nodes[index].flowState === "pending" ||
          nodes[index].flowState === "Inprogress"
        ) {
          state = "pending";
        }
      });
    
    return state;
  };

  onFilter = () => {
    this.setState({ hideDropdown: "" });
    return;
  };

  onFilterWorkflow = (event) => {
    let filter = event.currentTarget.id;
    let workflows = JSON.parse(getCookie("workflows"));
    let updatedWorkflows = {};

    if (filter !== "all" || filter !== "") {
      Object.keys(workflows).filter((id) => {
        if (workflows[id].state === filter) {
          updatedWorkflows[id] = workflows[id];
        }
      });
    }
    if (filter === "pending" || filter === "completed") {
      this.setState({ workflows: updatedWorkflows, hideDropdown: "hide" });
    } else {
      this.setState({ hideDropdown: "hide", workflows: workflows });
    }
    return;
  };

  onSearch = (name, value) => {
    let workflows = JSON.parse(getCookie("workflows"));
    let updatedWorkflows = {};
    Object.keys(workflows).filter((id) => {
      if (workflows[id].name === value) {
        updatedWorkflows[id] = workflows[id];
        this.setState({ workflows: updatedWorkflows });
      }
    });
    return;
  };

  render() {
    let { workflows, hideDropdown } = this.state;
    if (getCookie("login"))
      return (
        <div>
          <div className="workflow_bar">
            <div className="filter_search">
              <Input
                name={"Search Workflow"}
                className="search"
                onHandleChange={this.onSearch}
                // workflowId={props.workflowId}
              />
              <div className="dropdown">
                <button
                  type="button"
                  data-toggle="dropdown"
                  className="buttons btn"
                  onClick={this.onFilter}
                >
                  Filter
                </button>
                <ul className={cx("dropdown-menu", hideDropdown)}>
                  <li onClick={this.onFilterWorkflow} id="all">
                    <span>ALL</span>
                  </li>
                  <li onClick={this.onFilterWorkflow} id="completed">
                    <span>COMPLETED</span>
                  </li>
                  <li onClick={this.onFilterWorkflow} id="pending">
                    <span>PENDING</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="buttons">
              <button className={"btn add_node"} onClick={this.createWorkflow}>
                Create Workflow
              </button>
            </div>
          </div>
          <div className="nodes">
            {Object.keys(workflows).map((id) => {
              return (
                <WorkflowCard
                  key={id}
                  onAnswerChange={this.onWorkflowSateChange}
                  onDelete={this.onDelete}
                  workflowId={id}
                  state={workflows[id].state}
                  nodeState={this.nodeState(id)}
                  workflowName={workflows[id].name}
                />
              );
            })}
          </div>
        </div>
      );
    this.props.history.push("/");
    return "";
  }
}

export default Workflows;
