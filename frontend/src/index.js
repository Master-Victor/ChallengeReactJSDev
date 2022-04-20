import "babel-polyfill";
import "react-app-polyfill/ie11";
import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from './component/app.jsx';

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);

serviceWorker.unregister();
