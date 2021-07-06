import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CategoryContextProvider, {
  CategoryContext,
} from "../../contexts/CategoryContext";
import useFetchData from "../../hooks/useFetchData";

jest.mock("../../hooks/useFetchData");

const renderTestComponent = (mockValue) => {
  useFetchData.mockReturnValue(mockValue);

  const TestComponent = () => {
    const { categories } = useContext(CategoryContext);

    return (
      <div>
        {categories && <div data-testid="categories">{categories.length}</div>}
      </div>
    );
  };

  return render(
    <CategoryContextProvider>
      <TestComponent />
    </CategoryContextProvider>
  );
};

it("should provide the categories", () => {
  const mockValue = {
    data: [
      { id: 0, name: "HAVANA_LANDMARKS", folder: "habana" },
      { id: 1, name: "MONTREAL_LANDMARKS", folder: "montreal" },
      { id: 2, name: "VANCOUVER_LANDMARKS", folder: "vancouver" },
      { id: 3, name: "SPAIN_LANDMARKS", folder: "spain" },
      { id: 4, name: "GERMANY_LANDMARKS", folder: "germany" },
      { id: 5, name: "SOCCER_PLAYERS", folder: "soccer" },
      { id: 6, name: "FRUITS_AND_VEGETABLES", folder: "fruits" },
      { id: 7, name: "ANIMALS", folder: "animals" },
      { id: 8, name: "PUPPIES", folder: "puppies" },
      { id: 9, name: "SEINFELD", folder: "seinfeld" },
    ],
    error: "",
  };

  renderTestComponent(mockValue);

  expect(screen.getByTestId("categories")).toHaveTextContent("10");
  expect(screen.queryByTestId("error")).toBeNull();
});

it("should set an error if there was problem fetching the categories", () => {
  const error =
    "Error while fetching the category.json file from the Google Cloud";
  const mockValue = { data: "", error };

  renderTestComponent(mockValue);

  expect(screen.queryByTestId("categories")).toBeNull();
  expect(screen.getByTestId("error")).toHaveTextContent(error);
});
