import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import Contact from "../../../components/Contact/Contact";

describe("Contact", () => {
  let dictionary;
  let error;

  beforeEach(() => {
    dictionary = {
      AUTHOR: "Author:",
      EMAIL: "E-mail:",
      GITHUB: "Github:",
      LINKEDIN: "LinkedIn:",
    };
    error = "";
  });

  const renderContact = () => {
    return render(
      <DictionaryContext.Provider value={{ dictionary, error }}>
        <Contact />
      </DictionaryContext.Provider>
    );
  };

  it("renders the Contact component correctly", () => {
    const { asFragment } = renderContact();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the Contact info if dictionary hasn't been fetched yet", () => {
    dictionary = "";

    renderContact();

    expect(screen.queryByTestId("contact")).toBeNull();
  });

  it("should display a loading message", () => {
    dictionary = "";

    renderContact();

    expect(screen.getByTestId("loading")).toHaveTextContent(
      "Loading the Contact page..."
    );
  });

  it("should display the Contact info and apply the 'contact' class once the dictionary has been fetched", () => {
    renderContact();

    const contact = screen.getByTestId("contact");
    expect(contact).not.toBeNull();
    expect(contact).toHaveClass("contact");
  });

  it("should display the labels Author, E-mail, Github and LinkedIN in the chosen language", () => {
    renderContact();

    expect(screen.getByTestId("authorDescription")).toHaveTextContent(
      dictionary["AUTHOR"]
    );
    expect(screen.getByTestId("emailDescription")).toHaveTextContent(
      dictionary["EMAIL"]
    );
    expect(screen.getByTestId("githubDescription")).toHaveTextContent(
      dictionary["GITHUB"]
    );
    expect(screen.getByTestId("linkedinDescription")).toHaveTextContent(
      dictionary["LINKEDIN"]
    );
  });

  it("should display the contact info", () => {
    const contact = {
      author: "Livan Ojito Villanueva",
      email: "livanojito@gmail.com",
      github: "https://github.com/lojito",
      linkedin: "https://ca.linkedin.com/in/lov",
    };

    renderContact();

    expect(screen.getByTestId("author")).toHaveTextContent(contact.author);
    expect(screen.getByTestId("email")).toHaveTextContent(contact.email);
    expect(screen.getByTestId("github")).toHaveTextContent(contact.github);
    expect(screen.getByTestId("linkedin")).toHaveTextContent(contact.linkedin);
  });
});
