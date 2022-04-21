import "babel-polyfill";
import "react-app-polyfill/ie11";
import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './component/app.jsx';
import Page404 from './component/Page404';
import Example from './component/Example';
import NavBar from './component/NavBar';
import { Provider } from 'react-redux';
import store from './store/store';
ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route index element={<App />} />
        <Route path="*" element={<Page404 />} />
        <Route path='example' element={ <Example/> } />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
