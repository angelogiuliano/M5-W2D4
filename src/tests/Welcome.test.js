import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Welcome from "../Comps/Welcome/Welcome";

test("Welcome component is being mounted correctly", () => {
  render(<Welcome />);
  const alert = screen.queryByTestId("alert-test");
  const alertHeading = screen.queryByTestId("alert-heading-test");

  expect(alert).toBeInTheDocument();
  expect(alertHeading).toHaveTextContent("Welcome to EpiBOOKS");
});
