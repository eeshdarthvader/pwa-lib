import React, { Component } from "react";
import Button from "./components/Buttons";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button>Push me</Button>
      </div>
    );
  }
}

export default App;
