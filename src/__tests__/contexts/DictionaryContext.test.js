import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import DictionaryContextProvider, {
  DictionaryContext,
} from "../../contexts/DictionaryContext";
import useFetchData from "../../hooks/useFetchData";
import * as constants from "../../Constants";

jest.mock("../../hooks/useFetchData");

const { ENGLISH, FRENCH } = constants;

const renderTestComponent = (mockValue) => {
  useFetchData.mockReturnValue(mockValue);

  const TestComponent = () => {
    const { dictionary, changeLanguageHandler } = useContext(DictionaryContext);

    return dictionary ? (
      <div>
        <div data-testid="vancouver">{dictionary["VANCOUVER_LANDMARKS"]}</div>
        <button onClick={() => changeLanguageHandler(FRENCH)}>
          Change language
        </button>
      </div>
    ) : null;
  };

  return render(
    <DictionaryContextProvider>
      <TestComponent />
    </DictionaryContextProvider>
  );
};

it("should provide the dictionary without any error", () => {
  const mockValue = {
    data: [
      { VANCOUVER_LANDMARKS: "Vancouver landmarks" },
      { VANCOUVER_LANDMARKS: "Monuments de Vancouver" },
      { VANCOUVER_LANDMARKS: "Monumentos de Vancouver" },
    ],
    error: "",
  };

  renderTestComponent(mockValue);

  expect(screen.getByTestId("vancouver")).toHaveTextContent(
    mockValue.data[ENGLISH]["VANCOUVER_LANDMARKS"]
  );
  expect(screen.queryByTestId("error")).toBeNull();
});

it("should change language", () => {
  const mockValue = {
    data: [
      { VANCOUVER_LANDMARKS: "Vancouver landmarks" },
      { VANCOUVER_LANDMARKS: "Monuments de Vancouver" },
      { VANCOUVER_LANDMARKS: "Monumentos de Vancouver" },
    ],
    error: "",
  };

  renderTestComponent(mockValue);

  expect(screen.getByTestId("vancouver")).toHaveTextContent(
    mockValue.data[ENGLISH]["VANCOUVER_LANDMARKS"]
  );

  userEvent.click(screen.getByText("Change language"));

  expect(screen.getByTestId("vancouver")).toHaveTextContent(
    mockValue.data[FRENCH]["VANCOUVER_LANDMARKS"]
  );
});

it("should set an error if there was a problem fetching the dictionary", () => {
  const mockValue = {
    data: [],
    error:
      "Error while fetching the dictionary.json file from the Google Cloud",
  };

  renderTestComponent(mockValue);

  expect(screen.queryByTestId("vancouver")).toBeNull();
  expect(screen.getByTestId("error")).toHaveTextContent(mockValue.error);
});
