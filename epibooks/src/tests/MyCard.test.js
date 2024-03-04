import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MyCard from "../Comps/MyCard/MyCard";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({});

const mockBooks = [
  {
    asin: "123",
    key: "123",
    title: "Book 1",
    desc: "Description 1",
    price: "10",
    src: "path/to/img1.jpg",
  },
  {
    asin: "456",
    key: "456",
    title: "Book 2",
    desc: "Description 2",
    price: "15",
    src: "path/to/img2.jpg",
  },
];

describe("CardElement Component", () => {
  test("renders the correct number of cards based on the books data", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          {mockBooks.map((book) => (
            <MyCard
              key={book.asin}
              title={book.title}
              price={book.price}
              imgSrc={book.img}
              category={book.desc}
              asin={book.asin}
              {...book}
            />
          ))}
        </MemoryRouter>
      </Provider>
    );

    mockBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(book.desc)).toBeInTheDocument();
      expect(screen.getByText(book.price + "$")).toBeInTheDocument();
    });

    expect(mockBooks.length).toBe(2);
  });

  test("card classes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyCard />
        </MemoryRouter>
      </Provider>
    );

    const img = screen.getByTestId("my-image-id");

    const initialClass = img.className;
    expect(initialClass).toContain("card-img-top card-img");
  });
});
