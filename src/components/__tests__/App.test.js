import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import App from '../../App';

describe("App.js", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
})