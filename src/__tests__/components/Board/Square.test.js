import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Square from "../../../components/Board/Square";

describe("Square", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Square />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should apply the props", () => {
    const url =
      "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2Fdefault.jpg?alt=media";

    render(<Square win="win" disabled={true} id={100} image={"default"} />);

    expect(screen.getByTestId("square")).toHaveAttribute("class", "win");
    expect(screen.getByTestId("square")).toHaveAttribute("disabled");
    expect(screen.getByTestId("square")).toHaveAttribute("id", "100");
    expect(screen.getByTestId("square")).toHaveAttribute(
      "style",
      expect.stringContaining(url)
    );
  });
});
