import React from "react";
import "@testing-library/jest-dom";
import AllTheBooks from "../Comps/AllTheBooks/AllTheBooks";
import { screen, render } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from '../../src/reducers/books/booksSlice'
import { act } from "react-dom/test-utils";

axios.get.mockResolvedValueOnce({
  data: {
    results: [
      {
        asin: "1940026091",
        title: "Pandemic (The Extinction Files, Book 1)",
        img: "https://images-na.ssl-images-amazon.com/images/I/91xrEMcvmQL.jpg",
        price: 7.81,
        category: "scifi",
      },
    ],
  }
});

const reducer = combineReducers({
  booksData: booksReducer,
});

const store = configureStore({
  reducer,
});

test("if the books rendered are the same amout of the json returned from the fetch", async () => {
  render(
    <Provider store={store}>
      <AllTheBooks />
    </Provider>
  );
  act(() => {
    console.log(screen.debug());
  })
  expect("container-test").toBeInTheDocument();
});
