import { renderHook, act } from "@testing-library/react-hooks";
import useImages from "../../hooks/useImages";

describe("useImages", () => {

  it("should default the images 0 to the user and 1 to the computer", () => {
    const { result } = renderHook(() => useImages());

    expect(result.current.images).toEqual({ user: 0, computer: 1 });
  });

  it("should default to different images when passed the same to both the user and the computer", () => {
    const { result } = renderHook(() => useImages(0, 0));

    expect(result.current.images).not.toEqual({ user: 0, computer: 0 });
  });

  it("should refresh image user", () => {
    const { result } = renderHook(() => useImages());
    const user = result.current.images.user;
    const computer = result.current.images.computer;

    jest.spyOn(global.Math, "floor").mockReturnValueOnce(0);
    act(() => {
      result.current.refreshImage({ target: { id: "user" } });
    });

    expect(result.current.images.user).not.toEqual(user);
    expect(result.current.images.computer).toEqual(computer);
  });

  it("should refresh image computer", () => {
    const { result } = renderHook(() => useImages());
    const user = result.current.images.user;
    const computer = result.current.images.computer;

    act(() => {
      result.current.refreshImage({ target: { id: "computer" } });
    });

    expect(result.current.images.user).toEqual(user);
    expect(result.current.images.computer).not.toEqual(computer);
  });
});
