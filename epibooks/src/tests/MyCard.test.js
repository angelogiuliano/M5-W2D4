//!// setupTests.js
import "@testing-library/jest-dom";
import React from "react";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MyCard from "../Comps/MyCard/MyCard";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
  // Add other initial states as needed for your selectors
});

// Mock list of books as you might have from your JSON file
const mockBooks = [
  {
    asin: "123",
    key: "123",
    title: "Book 1",
    desc: "Description 1",
    price: "$10",
    src: "path/to/img1.jpg",
  },
  {
    asin: "456",
    key: "456",
    title: "Book 2",
    desc: "Description 2",
    price: "$15",
    src: "path/to/img2.jpg",
  },
];

const [selectedAsin, setSelectedAsin] = useState(null);
const [selected, setSelected] = useState(null);

const handleCardClick = (asin) => {
    setSelectedAsin(asin);
    setSelected(asin);
  };

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
              onClick={handleCardClick}
              isSelected={selected === book.asin}
              {...book}
            />
          ))}
        </MemoryRouter>
      </Provider>
    );

    mockBooks.forEach((book) => {
      // Check if title, description, and price of each book are rendered
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(book.desc)).toBeInTheDocument();
      expect(screen.getByText(book.price)).toBeInTheDocument();
    });

    // Here replace the previous attempt with the new way of selecting images
    // Verify the total count of modal buttons (images with data-testid='modal-btn')
    expect(mockBooks.length).toBe(2);
  });

  test("card changes color when clicked", () => {
    // Configure the useSelector mock to return the desired values
    // useSelector.mockReturnValue(true); // For example, set isDarkMode to true

    // Render the CardElement component within the Provider with the store
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MyCard />
        </MemoryRouter>
      </Provider>
    );

    // Find the card element
    const card = screen.getByTestId("my-card-id");

    // Save the initial class of the card
    const initialClass = card.className;

    // Verify that the card has an appropriate initial class
    expect(initialClass).toContain("card-img-top card-img");

    // Simulate a click on the card
    act(() => {
      fireEvent.click(card);
    });

    // Verify that the class has changed after the click
    const newClass = card.className;
    expect(newClass).toContain("cardSelected"); // If the component has been clicked, the class should revert to 'card_element'
  });
});
