import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import SigninPage from "../SigninPage";
import "@testing-library/jest-dom";
import { useSelector, useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Sign in page test suite", () => {
  it("should render loading component when loading prop is true", () => {
    useSelector.mockReturnValue({
      loading: true,
      error: false,
      userInfo: null,
    });

    render(
      <MemoryRouter>
        <SigninPage location={{ search: "" }} />
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText("Wait a sec...")).toBeInTheDocument();
  });

  it("should render error component when error prop is true", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: "Error signing in",
      userInfo: null,
    });

    render(
      <MemoryRouter>
        <SigninPage location={{ search: "" }} />
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText("Error signing in")).toBeInTheDocument();
  });

  it("should render the signin form when loading and error props are false", () => {
    useSelector.mockReturnValue({
      loading: false,
      error: false,
      userInfo: null,
    });

    render(
      <MemoryRouter>
        <SigninPage location={{ search: "" }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("should call the signin action and redirect to the specified location when form is submitted", () => {
    const signin = jest.fn();
    useDispatch.mockReturnValue(signin);
    useSelector.mockReturnValue({
      loading: false,
      error: false,
      userInfo: null,
    });

    render(
      <MemoryRouter>
        <SigninPage location={{ search: "?redirect=product/123" }} />
      </MemoryRouter>
    );

    screen.getByText("Email").value = "test@example.com";
    screen.getByText("Password").value = "password";
    screen.getByText("Sign in").click();

    expect(signin).toHaveBeenCalled();
  });
});
