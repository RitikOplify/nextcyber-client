import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "@/components/ui/Search";

describe("Search Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });


  test("renders input with placeholder", () => {
    render(
      <Search
        value=""
        setValue={jest.fn()}
        placeholder="Search jobs"
      />
    );

    expect(
      screen.getByPlaceholderText("Search jobs")
    ).toBeInTheDocument();
  });


  test("calls setValue on typing", () => {
    const setValue = jest.fn();

    render(
      <Search
        value=""
        setValue={setValue}
        placeholder="Search"
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Search"),
      { target: { value: "React" } }
    );

    expect(setValue).toHaveBeenCalledWith("React");
  });


  test("shows clear button when value exists", () => {
    render(
      <Search
        value="React"
        setValue={jest.fn()}
        placeholder="Search"
      />
    );

    expect(
      screen.getByRole("button")
    ).toBeInTheDocument();
  });

  test("clears value when clear button is clicked", () => {
    const setValue = jest.fn();

    render(
      <Search
        value="React"
        setValue={setValue}
        placeholder="Search"
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(setValue).toHaveBeenCalledWith("");
  });


  test("uses custom onClick when provided", () => {
    const onClick = jest.fn();

    render(
      <Search
        value="React"
        setValue={jest.fn()}
        onClick={onClick}
        placeholder="Search"
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalled();
  });


  test("clears value on unmount when clearOnUnmount is true", () => {
    const setValue = jest.fn();

    const { unmount } = render(
      <Search
        value="React"
        setValue={setValue}
        placeholder="Search"
        clearOnUnmount={true}
      />
    );

    unmount();

    expect(setValue).toHaveBeenCalledWith("");
  });

  test("does not clear value on unmount when clearOnUnmount is false", () => {
    const setValue = jest.fn();

    const { unmount } = render(
      <Search
        value="React"
        setValue={setValue}
        placeholder="Search"
        clearOnUnmount={false}
      />
    );

    unmount();

    expect(setValue).not.toHaveBeenCalled();
  });
});
