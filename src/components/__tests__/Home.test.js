import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Home from '../Home';

describe("Home.js", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });
})