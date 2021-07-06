import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addGame } from "../../store/gameDB/gameDBActions";

describe("Local Storage", () => {
  let mockLocalStorageValue;
  let initialValue = [];

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => mockLocalStorageValue),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it("should call getItem on render when localStorage is empty", () => {
    mockLocalStorageValue = null;
    const { result } = renderHook(() => {
      return useLocalStorage("testing", initialValue);
    });

    expect(result.current.games).toEqual(initialValue);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("should call getItem on render when localStorage is not empty", () => {
    mockLocalStorageValue = [{ id: 1 }];

    const { result } = renderHook(() => {
      return useLocalStorage("testing", initialValue);
    });

    expect(result.current.games).toEqual(initialValue);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("should call setItem on dispatching an action", () => {
    const game = {
      board: [2, 0, 0, 2, 0, 1, 2, 1, 0],
      categoryId: 0,
      first: 2,
      imageComputer: 1,
      imageUser: 0,
      level: 1,
      result: 1,
      winners: [0, 3, 6],
    };

    const { result } = renderHook(() => {
      return useLocalStorage("testing", initialValue);
    });

    act(() => {
      result.current.dispatch(addGame(game));
    });

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
