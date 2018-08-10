import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";

const jsonEls = document.querySelectorAll("script[type='application/json']");
const initialState = [...jsonEls].reduce((acc, el) => {
  return { ...acc, [el.id]: JSON.parse(el.textContent) };
}, {});

const reduxStore = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
