import React, { Component } from "react";
import Button from "./lib/Buttons";
import { StatusBadge } from "./lib/Badges";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button>Push</Button>
          <StatusBadge label="eesh" size="small" />
        </header>
      </div>
    );
  }
}

export default App;
