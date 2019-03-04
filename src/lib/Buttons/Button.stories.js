import React from "react";
import ButtonReadme from "./Button.md";
import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";
import { withReadme } from "storybook-readme";

import Button from "./";

storiesOf("Button", module)
  .addDecorator(withReadme(ButtonReadme))
  .add("Default", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Default Button</h3>
        <h4>Used in places where the intent is not defined</h4>
        <div className="demo">
          <Button
            onClick={action("button-click")}
            className={text("className", "Button")}
          >
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Primary", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Primary Button</h3>
        <h4>
          An orange color button is used to denote the bookflow paths like
          "Select hotel", "Book" , "Make Payment" etc.
        </h4>
        <div className="demo">
          <Button type="primary" onClick={action("button-click")}>
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Secondary", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Secondary Button</h3>
        <h4>
          Used to denote action points which are not "booking" or "payment"
        </h4>
        <div className="demo">
          <Button type="secondary" onClick={action("button-click")}>
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Disabled", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Disabled Button</h3>
        <h4>
          Disables hover and pointer effects. Use to disable click while loading
          or on error
        </h4>
        <div className="demo">
          <Button
            type="secondary"
            disabled={boolean("Disabled", true)}
            onClick={action("button-click")}
          >
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Busy", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Busy Button</h3>
        <h4>
          Denotes an busy or waiting states while the UI waits for a response.
          Disables the button while waiting.
        </h4>
        <div className="demo">
          <Button type="secondary" busy>
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Full", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Full Button</h3>
        <h4>Takes up 100% width of available space</h4>
        <div className="demo">
          <Button type="secondary" full>
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Outline", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Outline Button</h3>
        <h4>Used in places where the intent is not defined</h4>
        <div className="demo">
          <Button type="secondary" outline onClick={action("button-click")}>
            {text("Label", "Hello")}
          </Button>
        </div>
      </div>
    </div>
  ))

  .add("Size", () => (
    <div className="cont storybook">
      <div className="block">
        <h3>Size</h3>
        <h4>The button comes in different sizes</h4>

        <div className="demo">
          <Button type="secondary" size="sm" onClick={action("button-click")}>
            Small
          </Button>
        </div>

        <div className="demo">
          <Button type="secondary" onClick={action("button-click")}>
            Small
          </Button>
        </div>
      </div>
    </div>
  ));
