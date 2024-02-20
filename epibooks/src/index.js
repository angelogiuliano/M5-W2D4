import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// redux
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from '../src/reducers/books/booksSlice'

const reducer = combineReducers({
  booksData: booksReducer,
});

const store = configureStore({
  reducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
