import React from "react";
import { addParameters, configure, addDecorator } from "@storybook/react";
import { themes } from "@storybook/theming";
import { setOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import {
  withViewport,
  configureViewport,
  INITIAL_VIEWPORTS
} from "@storybook/addon-viewport";

setOptions({
  name: "PWA LIBRARY",
  url: "https://github.com/airbnb/react-dates",
  addonPanelInRight: false
});

addDecorator(withKnobs);
addDecorator(withViewport("iphone6"));

const req = require.context("../src", true, /\.stories\.js$/);

import "../src/styles/app.scss";
import "./storybook.scss";

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

configureViewport({
  defaultViewport: "iphone6",
  viewports: { ...INITIAL_VIEWPORTS }
});
