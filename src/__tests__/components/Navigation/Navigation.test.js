import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Navigation from "../../../components/Navigation/Navigation";

describe("Navigation", () => {
  let dictionary;
  let history;
  let renderCheckbox;

  beforeEach(() => {
    dictionary = {
      GAME: "Game",
      HISTORY: "Historical",
      REPOSITORY: "Repository",
      ABOUT: "About",
      CONTACT: "Contact",
    };

    renderCheckbox = true;
  });

  const renderNavigation = () => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <DictionaryContext.Provider value={{ dictionary }}>
        <Router history={history}>
          <Navigation renderCheckbox={renderCheckbox} />
        </Router>
      </DictionaryContext.Provider>
    );
  };

  it("renders the Navigation component correctly", () => {
    const { asFragment } = renderNavigation();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the navigation bar if dictionary hasn't been fetched yet", () => {
    dictionary = "";

    renderNavigation();

    expect(screen.queryByTestId("nav")).toBeNull();
  });

  it("should display the navigation bar once the dictionary has been fetched", () => {
    renderNavigation();

    expect(screen.getByTestId("nav")).toHaveClass("nav");
  });

  it("should display the labels Game, Historical, Repository, About and Contact", () => {
    renderNavigation();

    expect(screen.getByTestId("game")).toHaveTextContent("Game");
    expect(screen.getByTestId("historical")).toHaveTextContent("Historical");
    expect(screen.getByTestId("repository")).toHaveTextContent("Repository");
    expect(screen.getByTestId("about")).toHaveTextContent("About");
    expect(screen.getByTestId("contact")).toHaveTextContent("Contact");
  });

  it("should not collapse the mobile menu", () => {
    renderCheckbox = false;

    renderNavigation();

    userEvent.click(screen.queryByTestId("game"));

    expect(screen.queryByTestId("mobile-menu-chk")).toBeNull();
  });

  it("routes to the Game component", () => {
    renderNavigation();

    userEvent.click(screen.getByTestId("game"));

    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: "/",
      search: "",
      state: null,
    });
    expect(screen.getByTestId("game")).toHaveAttribute("href", "/");
  });

  it("routes to the Historical component", () => {
    renderNavigation();

    userEvent.click(screen.getByTestId("historical"));

    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: "/historical",
      search: "",
      state: null,
    });
    expect(screen.getByTestId("historical")).toHaveAttribute(
      "href",
      "/historical"
    );
  });

  it("routes to the Repository component", () => {
    renderNavigation();

    userEvent.click(screen.getByTestId("repository"));

    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: "/repository",
      search: "",
      state: null,
    });
    expect(screen.getByTestId("repository")).toHaveAttribute(
      "href",
      "/repository"
    );
  });

  it("routes to the About component", () => {
    renderNavigation();

    userEvent.click(screen.getByTestId("about"));

    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: "/about",
      search: "",
      state: null,
    });
    expect(screen.getByTestId("about")).toHaveAttribute("href", "/about");
  });

  it("routes to the Contact component", () => {
    renderNavigation();

    userEvent.click(screen.getByTestId("contact"));

    expect(history.push).toHaveBeenCalledWith({
      hash: "",
      pathname: "/contact",
      search: "",
      state: null,
    });
    expect(screen.getByTestId("contact")).toHaveAttribute("href", "/contact");
  });
});
