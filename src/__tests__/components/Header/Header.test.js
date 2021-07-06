import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import Header from "../../../components/Header/Header";
import { ENGLISH, FRENCH, SPANISH } from "../../../Constants";

describe("Header", () => {
  let dictionary;
  let changeLanguageHandler;

  beforeEach(() => {
    dictionary = {
      ENGLISH_HINT: "English",
      FRENCH_HINT: "French",
      SPANISH_HINT: "Spanish",
    };
    changeLanguageHandler = jest.fn();
  });

  const renderHeader = () => {
    return render(
      <DictionaryContext.Provider value={{ dictionary, changeLanguageHandler }}>
        <Header />
      </DictionaryContext.Provider>
    );
  };

  it("renders the Header component correctly", () => {
    const { asFragment } = renderHeader();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should apply the images's wrapper class", () => {
    renderHeader();

    expect(screen.getByTestId("flags")).toHaveClass("flags");
  });

  it("should not display the flag's images if dictionary hasn't been fetched yet", () => {
    dictionary = "";

    renderHeader();

    expect(screen.queryByTestId("flags")).toBeNull();
  });

  it("should display the flag's images once the dictionary has been fetched", () => {
    renderHeader();

    const flags = screen.getByTestId("flags");
    expect(flags).toContainElement(screen.getByTestId("english"));
    expect(flags).toContainElement(screen.getByTestId("french"));
    expect(flags).toContainElement(screen.getByTestId("spanish"));
  });

  it("should apply english image element alt attribute and value", () => {
    renderHeader();

    expect(screen.getByTestId("english")).toHaveAttribute(
      "alt",
      dictionary.ENGLISH_HINT
    );
  });

  it("should apply french image element alt attribute and value", () => {
    renderHeader();

    expect(screen.getByTestId("french")).toHaveAttribute(
      "alt",
      dictionary.FRENCH_HINT
    );
  });

  it("should apply spanish image element alt attribute and value", () => {
    renderHeader();

    expect(screen.getByTestId("spanish")).toHaveAttribute(
      "alt",
      dictionary.SPANISH_HINT
    );
  });

  it("should apply english image element title attribute and value", () => {
    renderHeader();

    expect(screen.getByTestId("english")).toHaveAttribute(
      "title",
      dictionary.ENGLISH_HINT
    );
  });

  it("should apply french image element title attribute and value", () => {
    renderHeader();

    expect(screen.getByTestId("french")).toHaveAttribute(
      "title",
      dictionary.FRENCH_HINT
    );
  });

  it("should apply spanish image element title attribute and value", () => {
    renderHeader();

    expect(screen.getByTestId("spanish")).toHaveAttribute(
      "title",
      dictionary.SPANISH_HINT
    );
  });

  it("should change the language to english", () => {
    renderHeader();

    userEvent.click(screen.getByTestId("english"));

    expect(changeLanguageHandler).toHaveBeenCalledTimes(1);
    expect(changeLanguageHandler).toHaveBeenCalledWith(ENGLISH);
  });

  it("should change the language to french", () => {
    renderHeader();

    userEvent.click(screen.getByTestId("french"));

    expect(changeLanguageHandler).toHaveBeenCalledTimes(1);
    expect(changeLanguageHandler).toHaveBeenCalledWith(FRENCH);
  });

  it("should change the language to spanish", () => {
    renderHeader();

    userEvent.click(screen.getByTestId("spanish"));

    expect(changeLanguageHandler).toHaveBeenCalledTimes(1);
    expect(changeLanguageHandler).toHaveBeenCalledWith(SPANISH);
  });
});
