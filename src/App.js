import React, { Component } from "react";
import Button from "./lib/Buttons";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button>Push</Button>
        </header>
      </div>
    );
  }
}

export default App;
