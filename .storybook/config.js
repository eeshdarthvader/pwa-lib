import React from "react";
import { addParameters, configure, addDecorator } from "@storybook/react";
import theme from "./cleartripTheme";
import { withKnobs } from "@storybook/addon-knobs";
import {
  withViewport,
  configureViewport,
  INITIAL_VIEWPORTS
} from "@storybook/addon-viewport";

addDecorator(withKnobs);
addDecorator(withViewport("iphone6"));

addParameters({
  options: {
    theme: theme,
    name: "PWA LIBRARY"
  }
});

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
