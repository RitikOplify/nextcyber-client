import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CandidateFilter from "@/components/filters/CandidateFilter";


const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));


jest.mock("@/store/actions/candidateAction", () => ({
  asyncGetCandidates: jest.fn(() => Promise.resolve()),
}));

import { asyncGetCandidates } from "@/store/actions/candidateAction";


jest.mock("@/components/ui/RangeFilter", () => {
  return ({ value, onChange }) => (
    <button
      data-testid="range-filter"
      onClick={() => onChange({ min: 2, max: 5 })}
    >
      Range {value.min}-{value.max}
    </button>
  );
});


const baseFilterData = {
  location: "",
  experienceRange: { min: 0, max: 10 },
  skills: [],
  salaryRange: [0, 0],
  contractType: "TEMPORARY",
  remotePolicy: "onsite",
};

const renderFilter = (props = {}) => {
  const setFilterData = jest.fn();
  const setLoading = jest.fn();
  const onClose = jest.fn();

  render(
    <CandidateFilter
      isOpen={true}
      filterData={baseFilterData}
      setFilterData={setFilterData}
      setLoading={setLoading}
      onClose={onClose}
      {...props}
    />
  );

  return { setFilterData, setLoading, onClose };
};


describe("CandidateFilter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("renders filter panel when open", () => {
    renderFilter();

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Contract Type")).toBeInTheDocument();
    expect(screen.getByText("Remote Policy")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    const { container } = render(
      <CandidateFilter isOpen={false} />
    );

    expect(container.firstChild).toBeNull();
  });


  test("calls onClose when close icon is clicked", () => {
    const onClose = jest.fn();

    render(
      <CandidateFilter
        isOpen={true}
        filterData={baseFilterData}
        setFilterData={jest.fn()}
        setLoading={jest.fn()}
        onClose={onClose}
      />
    );

    fireEvent.click(
      screen.getAllByRole("button")[0]
    );

    expect(onClose).toHaveBeenCalled();
  });


  test("updates contract type on selection", () => {
    const { setFilterData } = renderFilter();

    fireEvent.click(
      screen.getByText("Freelance")
    );

    expect(setFilterData).toHaveBeenCalled();
  });


  test("updates remote policy on selection", () => {
    const { setFilterData } = renderFilter();

    fireEvent.click(screen.getByText("Remote"));

    expect(setFilterData).toHaveBeenCalled();
  });


  test("updates min and max salary inputs", () => {
    renderFilter();

    const minInput = screen.getByPlaceholderText(
      "e.g. 50,000"
    );
    const maxInput = screen.getByPlaceholderText(
      "e.g. 150,000"
    );

    fireEvent.change(minInput, {
      target: { value: "50000" },
    });
    fireEvent.change(maxInput, {
      target: { value: "150000" },
    });

    expect(minInput.value).toBe("50000");
    expect(maxInput.value).toBe("150000");
  });


  test("updates experience range via RangeFilter", () => {
    const { setFilterData } = renderFilter();

    fireEvent.click(
      screen.getByTestId("range-filter")
    );

    expect(setFilterData).toHaveBeenCalledWith(
      expect.objectContaining({
        experienceRange: { min: 2, max: 5 },
      })
    );
  });


  test("adds and removes a skill", () => {
    const setFilterData = jest.fn();

    render(
      <CandidateFilter
        isOpen={true}
        filterData={{ ...baseFilterData, skills: [] }}
        setFilterData={setFilterData}
        setLoading={jest.fn()}
        onClose={jest.fn()}
      />
    );

    const skillInput = screen.getByPlaceholderText(
      "Type skill and press Enter"
    );

    fireEvent.change(skillInput, {
      target: { value: "React" },
    });

    fireEvent.keyDown(skillInput, {
      key: "Enter",
      code: "Enter",
    });

    expect(setFilterData).toHaveBeenCalled();
  });








});
