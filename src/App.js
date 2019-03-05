import React, { Component } from "react";
import Button from "./lib/Buttons";
import { StatusBadge } from "./lib/Badges";
import { Counter, Count } from "./lib/Counter";
import { pluralize } from "./utils";
import "./App.css";
import "../src/styles/app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: {
        count: 1
      },
      children: {
        count: 1
      }
    };
  }
  render() {
    const { adults, children } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Button>Push</Button>
          <StatusBadge label="eesh" size="small" />
          <div className="flex flex-middle flex-around">
            <Counter
              value={{ adults: adults.count, children: children.count }}
              maxValue={10}
              onChange={a => {
                this.setState({ adults: { count: a.adults } });
              }}
            >
              <Count id="adults" minValue={1}>
                {count => <p>{pluralize(count, "Adult")} </p>}
              </Count>
              <Count id="children">
                {count => (
                  <p>{pluralize(count, "Child", "ren")} (2 - 11 yrs) </p>
                )}
              </Count>
            </Counter>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
