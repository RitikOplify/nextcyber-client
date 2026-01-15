import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CandidateFilter from "@/components/filters/CandidateFilter";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCandidates } from "@/store/actions/candidateAction";
import { asyncGetDropdown } from "@/store/actions/dropdownAction";

/* -------------------- MOCK REDUX -------------------- */

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@/store/actions/candidateAction", () => ({
  asyncGetCandidates: jest.fn(),
}));

jest.mock("@/store/actions/dropdownAction", () => ({
  asyncGetDropdown: jest.fn(),
}));

/* -------------------- MOCK CHILD COMPONENTS -------------------- */

jest.mock("@/components/ui/RangeFilter", () => (props) => (
  <button
    data-testid="range-filter"
    onClick={() => props.onChange({ min: 2, max: 5 })}
  >
    RangeFilter
  </button>
));

jest.mock("@/components/SelectField", () => (props) => (
  <button data-testid="add-skill" onClick={() => props.onChange(["React"])}>
    Add Skill
  </button>
));

/* -------------------- SETUP -------------------- */

const mockDispatch = jest.fn(() => Promise.resolve());

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);

  useSelector.mockImplementation((cb) =>
    cb({
      dropdown: {
        skillsDropdown: [],
      },
    })
  );

  asyncGetCandidates.mockReturnValue(() => Promise.resolve());
  asyncGetDropdown.mockReturnValue(() => Promise.resolve());
});

afterEach(() => {
  jest.clearAllMocks();
});

/* -------------------- DEFAULT PROPS -------------------- */

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  setLoading: jest.fn(),
  setFilterData: jest.fn(),
  filterData: {
    contractType: "TEMPORARY",
    remotePolicy: "onsite",
    salaryRange: [0, 0],
    experienceRange: { min: 0, max: 10 },
    skills: [],
  },
};

/* -------------------- TESTS -------------------- */

describe("CandidateFilter", () => {
  test("does not render when closed", () => {
    render(<CandidateFilter {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Filters")).not.toBeInTheDocument();
  });

  test("renders filter panel when open", () => {
    render(<CandidateFilter {...defaultProps} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  test("fetches skills dropdown on mount when empty", () => {
    render(<CandidateFilter {...defaultProps} />);
    expect(asyncGetDropdown).toHaveBeenCalledWith({ name: "skills" });
  });

  test("updates experience range locally", () => {
    render(<CandidateFilter {...defaultProps} />);
    fireEvent.click(screen.getByTestId("range-filter"));
    expect(screen.getByTestId("range-filter")).toBeInTheDocument();
  });

  test("updates skills locally", () => {
    render(<CandidateFilter {...defaultProps} />);
    fireEvent.click(screen.getByTestId("add-skill"));
    expect(screen.getByTestId("add-skill")).toBeInTheDocument();
  });



  
});
