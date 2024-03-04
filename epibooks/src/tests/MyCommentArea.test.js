import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import MyCommentArea from "../Comps/MyCommentArea/MyCommentArea";

test("Welcome component is being mounted correctly", () => {
  render(<MyCommentArea />);

  const h3 = screen.getByTestId("h3-test-id")
  expect(h3).toBeInTheDocument()
  expect(h3).toHaveTextContent('Please select a card 😊')
});