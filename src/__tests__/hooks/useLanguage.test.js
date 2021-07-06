import React from "react";
import useLanguage from "../../hooks/useLanguage";
import { render, act } from "@testing-library/react";
import { ENGLISH, FRENCH } from "../../Constants";

describe("useLanguage", () => {
  let language, changeLanguageHandler;

  const renderHook = (lang = "") => {
    function HookWrapper() {
      [language, changeLanguageHandler] = useLanguage();
      return null;
    }

    function HookWithLanguageWrapper() {
      [language, changeLanguageHandler] = useLanguage(lang);
      return null;
    }

    if (lang === "") {
      render(<HookWrapper />);
    } else {
      render(<HookWithLanguageWrapper />);
    }
  };

  it("should default the language", () => {
    renderHook();

    expect(language).toBe(ENGLISH);
  });

  it("it shoould set the language", () => {
    renderHook(FRENCH);

    expect(language).toBe(FRENCH);
  });

  it("should change the language", () => {
    renderHook();

    act(() => {
      changeLanguageHandler(FRENCH);
    });

    expect(language).toBe(FRENCH);
  });
});
