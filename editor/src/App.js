import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

//components
import Login from "./components/Login";
import { Workflows } from "./components/Workflows";
import { CreateWorkflow } from "./components/CreateWorkflow";
import { NavBar } from "./static/NavBar";

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

  async handleLogin(event) {}
  render() {
    return (
      <BrowserRouter>
        <div className="empty-view">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/createworkflow" component={CreateWorkflow} />
            {/* <Route  path="/editauthor" render={props => <Editauthor author={this.state.author} {...props} />} /> */}
            {/* <Route  path="/addbook" render={props => <Addbook addbook={this.addbook} {...props} />} />
             <Route  path="/addauthor" render={props => <Addauthor addauthor={this.addauthor} {...props} />} />
              */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
