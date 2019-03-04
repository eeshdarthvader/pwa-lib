import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";

import Badges from "./";

storiesOf("Badge", module).add("Default", () => (
  <div className="cont storybook">
    <div className="block">
      <h3>Default Badge</h3>
      <h4>Used in places where the intent is not defined</h4>
      <div className="demo">
        <Badges onClick={action("button-click")}>
          {text("Label", "Hello")}
        </Badges>
      </div>
    </div>
  </div>
));
