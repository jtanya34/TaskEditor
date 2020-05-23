import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

//components
import Login from "./components/Login";
import Workflows from "./components/Workflows";
import { NavBar } from "./static/NavBar";
import CreateWorkflow from "./components/CreateWorkflow";

//css
import "./css/main.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  handleChange(event) {
    let fields = this.state.fields;
    fields.forEach((field) => {
      if (field.name === event.currentTarget.name) {
        field.value = event.currentTarget.value;
        field.errors = [];
      }
    });
    this.setState({ fields, valid: true });
  }

  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="empty-view">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/workflow/:id" component={CreateWorkflow} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
