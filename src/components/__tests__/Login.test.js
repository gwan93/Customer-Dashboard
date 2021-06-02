import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from "@testing-library/react";
import Login from '../Login';
afterEach(cleanup);

describe("Login.js", () => {
  // Initializing props
  const state = {
    username: "",
    userId: null
  };
  const setState = jest.fn();
  const setCookie = jest.fn();

  it("renders without crashing", () => {
    render(<Login state={state} setState={setState} setCookie={setCookie}/>);
  });

  it("will show an error message if a field is left blank when submitted", () => {
    const { getByTestId, getByText } = render(<Login state={state} setState={setState} setCookie={setCookie}/>);
    fireEvent.click(getByTestId("login"));
    expect(getByText("Please provide a username and a password.")).toBeInTheDocument();
    expect(setState).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
  })
})