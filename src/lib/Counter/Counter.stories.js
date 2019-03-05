import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";

import { Counter, Count } from "./";
import { pluralize } from "Utils";

import { State, Store } from "@sambego/storybook-state";

const store = new Store({
  adults: {
    count: 1
  },
  children: {
    count: 1
  }
});

storiesOf("Counter", module).add("Default", () => (
  <div className="cont storybook">
    <div className="block">
      <h3>Counter</h3>
      <h4>
        Used as increment or decrement counter across pages in react application
      </h4>
      <div className="demo">
        <State store={store}>
          {s => {
            return (
              <Counter
                value={{
                  adults: s.adults.count,
                  children: s.children.count
                }}
                maxValue={10}
                onChange={a => {
                  store.set({
                    adults: { count: a.adults },
                    children: { count: a.children }
                  });
                }}
              >
                <Count id="adults" minValue={1}>
                  {count => <p>{pluralize(count, "Adult")} </p>}
                </Count>
                <Count id="children">
                  {count => <p>{pluralize(count, "Child", "ren")} </p>}
                </Count>
              </Counter>
            );
          }}
        </State>
      </div>
    </div>
  </div>
));
