import React from "react";
import "@testing-library/jest-dom";
import AllTheBooks from "../Comps/AllTheBooks/AllTheBooks";
import { screen, render } from "@testing-library/react";

test("if the books rendered are the same amout of the json returned from the fetch", () => {
  render(<AllTheBooks />);
});
