import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Historical from "../../../components/Board/Historical";

jest.mock(
  "../../../components/Board/Square",
  () =>
    ({ disabled, id, image, win }) => {
      const firebaseUrl = `url(https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F${image}.jpg?alt=media)`;
      return (
        <button
          className={win}
          data-testid="square"
          disabled={disabled}
          id={id}
          style={{ backgroundImage: firebaseUrl }}
        ></button>
      );
    }
);

describe("Historical", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Historical
        folder="soccer"
        imageUser={0}
        imageComputer={1}
        players={[0, 0, 1, 2, 0, 0, 0, 0, 0]}
        winners={[]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with 3 winning squares", () => {
    const { getAllByTestId } = render(
      <Historical
        folder="soccer"
        imageUser={0}
        imageComputer={1}
        players={[1, 1, 1, 2, 2, 2, 0, 0, 0]}
        winners={[0, 1, 2]}
      />
    );

    const squares = getAllByTestId("square");

    expect(squares[0]).toHaveClass("win");
    expect(squares[1]).toHaveClass("win");
    expect(squares[2]).toHaveClass("win");
  });
});
