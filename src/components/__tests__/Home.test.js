import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Home from '../Home';

describe("Home.js", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("shows text and 3 cards of information", () => {
    const { getByText, getByTitle } = render(<Home />);
    expect(getByText("Information when you need it")).toBeInTheDocument();
    expect(getByTitle("Intuitive"));
    expect(getByTitle("Devices"));
    expect(getByTitle("Tree"));
  })
})