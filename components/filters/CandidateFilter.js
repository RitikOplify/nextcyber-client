import { useState, useEffect } from "react";
import { X, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { asyncGetCandidates } from "@/store/actions/candidateAction";
import RangeFilter from "../ui/RangeFilter";

export default function CandidateFilter({
  isOpen,
  onClose,
  filterData,
  setFilterData,
}) {
  // Local state
  const [selectedContractType, setSelectedContractType] = useState("TEMPORARY");
  const [selectedRemotePolicy, setSelectedRemotePolicy] = useState("onsite");
  const [skillInput, setSkillInput] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [experienceRange, setExperienceRange] = useState([0, 1]); // [min, max] in years
  const dispatch = useDispatch();

  // Sync with external filterData
  useEffect(() => {
    if (filterData) {
      setSelectedContractType(filterData.contractType || "TEMPORARY");
      setSelectedRemotePolicy(filterData.remotePolicy || "onsite");
      setMinSalary(filterData.salaryRange?.[0] || "");
      setMaxSalary(filterData.salaryRange?.[1] || "");
      setExperienceRange(filterData.experienceRange);
    }
  }, [filterData]);

  const handleContractTypeChange = (type) => {
    setSelectedContractType(type);
    setFilterData({ ...filterData, contractType: type });
  };

  const handleRemotePolicyChange = (policy) => {
    setSelectedRemotePolicy(policy);
    setFilterData({ ...filterData, remotePolicy: policy });
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const newSkills = [...(filterData.skills || []), skillInput.trim()];
      setFilterData({ ...filterData, skills: newSkills });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = (filterData.skills || []).filter(
      (s) => s !== skillToRemove
    );
    setFilterData({ ...filterData, skills: updatedSkills });
  };

  const handleExperienceChange = (index, value) => {
    const newRange = [...experienceRange];
    newRange[index] = parseInt(value);

    // Ensure min <= max
    if (index === 0 && newRange[0] > newRange[1]) newRange[1] = newRange[0];
    if (index === 1 && newRange[1] < newRange[0]) newRange[0] = newRange[1];

    setExperienceRange(newRange);
    setFilterData({ ...filterData, experienceRange: newRange });
  };

  const handleReset = () => {
    setSelectedContractType("TEMPORARY");
    setSelectedRemotePolicy("onsite");
    setMinSalary("");
    setMaxSalary("");
    setExperienceRange([0, 3]);
    setSkillInput("");

    setFilterData({
      location: "",
      experienceRange: [0, 3],
      skills: [],
      salaryRange: [0, 0],
      contractType: "TEMPORARY",
      remotePolicy: "onsite",
    });
    dispatch(asyncGetCandidates());
  };

  const handleApply = () => {
    setFilterData({
      ...filterData,
      contractType: selectedContractType,
      remotePolicy: selectedRemotePolicy,
      salaryRange: [
        minSalary ? parseInt(minSalary.replace(/\D/g, "")) || 0 : 0,
        maxSalary ? parseInt(maxSalary.replace(/\D/g, "")) || 0 : 0,
      ],
      experienceRange,
    });
    const params = {
      contractType: selectedContractType?.toUpperCase(),
      remotePolicy: selectedRemotePolicy?.toUpperCase(),
      salary:
        minSalary && maxSalary
          ? `${minSalary ? parseInt(minSalary.replace(/\D/g, "")) : 0}-${
              maxSalary ? parseInt(maxSalary.replace(/\D/g, "")) : 0
            }`
          : null,
      experience: `${experienceRange[0]}-${experienceRange[1]}`,
      skills: filterData.skills.join(",") || [],
    };
    dispatch(asyncGetCandidates(params));
    onClose();
  };

  if (!isOpen) return null;

  const minExp = experienceRange[0];
  const maxExp = experienceRange[1];

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
                  checked={selectedContractType === value}
                  onChange={() => handleContractTypeChange(value)}
                  className="w-4 h-4 rounded border-2 border-gray-600 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-primaborder-primary cursor-pointer"
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
                  checked={selectedRemotePolicy === value}
                  onChange={() => handleRemotePolicyChange(value)}
                  className="w-4 h-4 rounded border-2 border-gray-600 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-primaborder-primary cursor-pointer"
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
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="e.g. 50,000"
                className="w-full bg-g-700 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primaborder-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Max.</label>
              <input
                type="text"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="e.g. 150,000"
                className="w-full bg-g-700 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primaborder-primary"
              />
            </div>
          </div>
        </div>

        {/* Experience Range - Fixed & Improved */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Experience</h3>
          <RangeFilter
            min={0}
            max={10}
            step={1}
            onChange={({ min, max }) =>
              handleExperienceChange(0, min) || handleExperienceChange(1, max)
            }
          />
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-4">Skills</h3>
          <input
            type="text"
            placeholder="Type skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            className="w-full bg-g-700 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primaborder-primary mb-3"
          />
          <div className="flex flex-wrap gap-2">
            {filterData?.skills?.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-g-700 rounded-full px-3 py-1.5 text-sm text-gray-300"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-g-900/80 backdrop-blur-md border-t border-neutral-800">
        <div className="max-w-[360px] mx-auto flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 bg-g-700 hover:bg-neutral-750 text-gray-300 py-3 rounded-lg transition-colors font-medium cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
