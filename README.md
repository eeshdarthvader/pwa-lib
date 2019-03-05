<p align="center">
  <img src="https://res.cloudinary.com/cleartrip/image/upload/h_100/v1551791273/PWALibrary_dchini.png" >
</p>

# Mobile Web React Component Library

Simple React App for Reusable React Components in mobile Web Application (PWA)


[NPM package](https://www.npmjs.com/package/pwa-lib)


To use this as component Library in other projects

```
yarn add pwa-lib
```

In your App

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Button, CodeBadge } from "pwa-lib";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Button>Push Me</Button>
      <CodeBadge label="eesh" size="small" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

## Folder Structure

After creation, your project should look like this:

```
PWA-LIB/
  .storybook
     yourTheme.js
     config.js
     storybook.scss
     webpack.config.js
  README.md
  node_modules/
  package.json
  dist/
     bundled.js
  config/
  public/
    index.html
  src/
    lib/
      Buttons
	Button.stories.js
	index.jsx
	Button.jsx
      Badges
      Counter
      Divider
      Form
      Modal
      Pageloader
      Radio
      Sticky
      Ripple
    constants/
    styles/
      components/
      app.scss
    utils/
    app.js
    index.js
  .babelrc
  .gitignore
  yarn.lock
  paths.js


```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `yarn build`

Builds the app for production to the `dist` folder.<br>
Entry point is `/src/lib/index.js`
It correctly bundles React in production mode and optimizes the build for the best performance.

<br>
Your app is ready to be published to npm

### `yarn storybook`

Runs the storybook to tests all the React component in isolation.

### Prerequisites

```
node
```

### Installing

Install dependencies

```
yarn install
```

Start the development Server

```
yarn start
```

## Authors

- **Eesh Tyagi**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
