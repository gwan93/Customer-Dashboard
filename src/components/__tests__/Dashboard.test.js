import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Dashboard from '../Dashboard';

describe("Dashboard.js", () => {
  it("renders without crashing", () => {
    render(<Dashboard />);
  });
})



// it("uses the mock implementation", () => {
//   const fn = jest.fn((a, b) => 42);
//   fn(1, 2);
//   expect(fn).toHaveReturnedWith(42);
//  });