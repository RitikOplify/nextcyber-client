import { useState, useEffect, useCallback, use } from "react";
import { X, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCandidates } from "@/store/actions/candidateAction";
import RangeFilter from "../ui/RangeFilter";
<<<<<<< Updated upstream
import { asyncGetDropdown } from "@/store/actions/dropdownAction";
import SelectField from "../SelectField";
=======
>>>>>>> Stashed changes

export default function CandidateFilter({
  isOpen,
  onClose,
  filterData = {},
  setFilterData = () => {},
  setLoading,
}) {
  // Local state
  const [FormData, setFormData] = useState({
    contractType: filterData.contractType || "TEMPORARY",
    remotePolicy: filterData.remotePolicy || "onsite",
    salaryRange: filterData.salaryRange || [0, 0],
    experienceRange: filterData.experienceRange || { min: 0, max: 10 },
    skills: filterData.skills || [],
  });
  const dispatch = useDispatch();
  const [loadingLocal, setLoadingLocal] = useState({
    resetLoading: false,
    applyLoading: false,
  });
  const { skillsDropdown } = useSelector((state) => state.dropdown);

  // Sync with external filterData
  useEffect(() => {
    if (filterData) {
      setFormData({
        contractType: filterData.contractType || "TEMPORARY",
        remotePolicy: filterData.remotePolicy || "onsite",
        experienceRange: filterData.experienceRange,
        salaryRange: filterData.salaryRange,
        skills: filterData.skills,
      });
    }
  }, [filterData]);

  const fetchDropdowns = useCallback(() => {
    if (skillsDropdown?.length === 0)
      dispatch(asyncGetDropdown({ name: "skills" }));
  }, [skillsDropdown, dispatch]);

  const handleContractTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, contractType: type }));
    setFilterData((prev) => ({ ...prev, contractType: type }));
  };

  const handleRemotePolicyChange = (policy) => {
    setFormData((prev) => ({ ...prev, remotePolicy: policy }));
    setFilterData((prev) => ({ ...prev, remotePolicy: policy }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const newSkills = [...(filterData.skills || []), skillInput.trim()];
      setFilterData({ ...filterData, skills: newSkills });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = (filterData.skills || []).filter(
      (s) => s !== skillToRemove
    );
    setFilterData({ ...filterData, skills: updatedSkills });
  };

  const handleReset = () => {
    setLoadingLocal((prev) => ({ ...prev, resetLoading: true }));
    setLoading(true);
    setFormData({
      contractType: "TEMPORARY",
      remotePolicy: "onsite",
      salaryRange: [0, 0],
      experienceRange: { min: 0, max: 10 },
      skills: [],
    });

    setFilterData({
      location: "",
      experienceRange: { min: 0, max: 10 },
      skills: [],
      salaryRange: [0, 0],
      contractType: "TEMPORARY",
      remotePolicy: "onsite",
    });
    dispatch(asyncGetCandidates())
      .then(() => {
        setLoading(false);
        setLoadingLocal((prev) => ({ ...prev, resetLoading: false }));
      })
      .finally(() => {
        setLoading(false);
        setLoadingLocal((prev) => ({ ...prev, resetLoading: false }));
      });
    console.log("Filters have been reset", FormData.experienceRange);
  };

  const handleApply = () => {
    setLoadingLocal((prev) => ({ ...prev, applyLoading: true }));
    setLoading(true);
    setFilterData({
      ...filterData,
      contractType: FormData.contractType,
      remotePolicy: FormData.remotePolicy,
      salaryRange: [FormData.salaryRange[0], FormData.salaryRange[1]],
      experienceRange: FormData.experienceRange,
      skills: FormData.skills,
    });
    const params = {
      contractType: FormData.contractType?.toUpperCase(),
      remotePolicy: FormData.remotePolicy?.toUpperCase(),
      salary:
        FormData.salaryRange[0] && FormData.salaryRange[1]
          ? `${FormData.salaryRange[0]}-${FormData.salaryRange[1]}`
          : null,
      experience: `${FormData.experienceRange.min}-${FormData.experienceRange.max}`,
      skills: FormData.skills.join(",") || [],
    };
    console.log("Applying filters with params:", params);
    dispatch(asyncGetCandidates(params))
      .then(() => {
        setLoading(false);
        setLoadingLocal((prev) => ({ ...prev, applyLoading: false }));
      })
      .finally(() => {
        setLoadingLocal((prev) => ({ ...prev, applyLoading: false }));
        onClose();
      });
  };

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 z-50 w-full max-w-[360px] backdrop-blur-[40px] bg-g-900/40 text-g-100 max-h-screen p-6 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-g-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto pr-2 flex-1 pb-24">
        {/* Contract Type */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Contract Type</h3>
          <div className="space-y-3">
            {[
              { value: "TEMPORARY", label: "Temporary employment" },
              { value: "PERMANENT", label: "Fixed term" },
              { value: "FREELANCE", label: "Freelance" },
              { value: "INTERNSHIP", label: "Internship" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={FormData.contractType === value}
                  onChange={() => handleContractTypeChange(value)}
                  className="w-4 h-4 rounded border-2 border-gray-600 checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Remote Policy */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Remote Policy</h3>
          <div className="space-y-3">
            {[
              { value: "onsite", label: "On-site" },
              { value: "hybrid", label: "Hybrid" },
              { value: "remote", label: "Remote" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={FormData.remotePolicy === value}
                  onChange={() => handleRemotePolicyChange(value)}
                  className="w-4 h-4 rounded border-2 border-gray-600 checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Salary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Min.</label>
              <input
                type="text"
                value={FormData.salaryRange[0]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryRange: [e.target.value, prev.salaryRange[1]],
                  }))
                }
                placeholder="e.g. 50,000"
                className="w-full rounded-lg px-3 py-2.5 text-sm bg-g-700 border border-g-500 outline-none text-g-300 placeholder-[#6A6B6C] focus:outline-none mb-3"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Max.</label>
              <input
                type="text"
                value={FormData.salaryRange[1]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salaryRange: [prev.salaryRange[0], e.target.value],
                  }))
                }
                placeholder="e.g. 150,000"
                className="w-full rounded-lg px-3 py-2.5 text-sm bg-g-700 border border-g-500 outline-none text-g-300 placeholder-[#6A6B6C] focus:outline-none mb-3"
              />
            </div>
          </div>
        </div>

        {/* Experience Range - Fixed & Improved */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Experience</h3>
<<<<<<< Updated upstream
=======

          {/* <div className="flex justify-between text-sm text-gray-300 mb-5">
            <span>
              {minExp === 0
                ? "Fresher"
                : `${minExp} year${minExp > 1 ? "s" : ""}`}
            </span>
            <span>
              {maxExp === 10
                ? "10+ years"
                : `${maxExp} year${maxExp > 1 ? "s" : ""}`}
            </span>
          </div>
          <div className="relative h-10 px-1">
            <div className="absolute inset-x-0 top-4 h-1.5 bg-neutral-700 rounded-full"></div>

            <div
              className="absolute top-4 h-1.5 bg-blue-600 rounded-full transition-all"
              style={{
                left: `${(minExp / 10) * 100}%`,
                right: `${100 - (maxExp / 10) * 100}%`,
              }}
            />

            <input
              type="range"
              min="0"
              max="10"
              value={minExp}
              onChange={(e) => handleExperienceChange(0, e.target.value)}
              className="absolute w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-g-900 [&::-webkit-slider-thumb]:cursor-pointer focus:[&::-webkit-slider-thumb]:ring-4 focus:[&::-webkit-slider-thumb]:ring-primaborder-primary/30"
              style={{ zIndex: minExp > maxExp - 1 ? 3 : 2 }}
            />

            <input
              type="range"
              min="0"
              max="10"
              value={maxExp}
              onChange={(e) => handleExperienceChange(1, e.target.value)}
              className="absolute w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-g-900 [&::-webkit-slider-thumb]:cursor-pointer focus:[&::-webkit-slider-thumb]:ring-4 focus:[&::-webkit-slider-thumb]:ring-primaborder-primary/30"
              style={{ zIndex: maxExp < minExp + 1 ? 3 : 2 }}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>0 yrs</span>
            <span>10+ yrs</span>
          </div> */}

>>>>>>> Stashed changes
          <RangeFilter
            min={0}
            max={10}
            step={1}
<<<<<<< Updated upstream
            value={FormData.experienceRange}
            onChange={(newRange) => {
              setFormData((prev) => ({ ...prev, experienceRange: newRange }));
            }}
=======
            onChange={({ min, max }) => handleExperienceChange(0, min) || handleExperienceChange(1, max)}
>>>>>>> Stashed changes
          />
        </div>

        {/* Skills */}
        <div className="mb-8">
          <SelectField
            label="Skills"
            options={skillsDropdown}
            value={FormData?.skills}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, skills: value }))
            }
            multiple={true}
            onAdd={handleAddSkill}
            placeholder="Type a skill and press Add"
            selectedOptions={FormData?.skills || []}
            onRemove={handleRemoveSkill}
            isCreatable={true}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-g-900/80 backdrop-blur-md border-t border-neutral-800">
        <div className="max-w-[360px] mx-auto flex gap-3">
          <button
            disabled={loadingLocal.resetLoading}
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 bg-g-700 hover:bg-neutral-750 text-gray-300 py-3 rounded-lg transition-colors font-medium cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{loadingLocal.resetLoading ? "Resetting..." : "Reset"}</span>
          </button>
          <button
            disabled={loadingLocal.applyLoading}
            onClick={handleApply}
            className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium cursor-pointer"
          >
            <span>
              {loadingLocal.applyLoading ? "Applying..." : "Apply Filters"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
