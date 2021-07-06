import { renderHook } from "@testing-library/react-hooks";
import useGame from "../../hooks/useGame";

describe("useGame", () => {
  let dispatch;
  let dispatchGame;

  beforeEach(() => {
    dispatch = jest.fn();
    dispatchGame = jest.fn();
  });

  it("should render the game hook correctly", () => {
    const { result } = renderHook(() => useGame(dispatch, dispatchGame));

    expect(result.current.result).toBe("");
  });

  it("should call the init handler", () => {
    const { result } = renderHook(() => useGame(dispatch, dispatchGame));

    result.current.gameInitHandler({ result: 1 });

    expect(dispatchGame).toBeCalled();
  });

  it("should call the over handler", () => {
    const { result } = renderHook(() => useGame(dispatch, dispatchGame));

    result.current.gameOverHandler({ result: 1 });

    expect(dispatch).toBeCalled();
    expect(dispatchGame).toBeCalled();
  });
});
