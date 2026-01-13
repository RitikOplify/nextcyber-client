import { useState, useEffect } from "react";
import { X, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { asyncGetCandidates } from "@/store/actions/candidateAction";
import RangeFilter from "../ui/RangeFilter";
import SelectField from "../SelectField";

export default function CompanyFilter({
  isOpen,
  onClose,
  filterData,
  setFilterData,
  setLoading,
}) {
  const [companySize, setCompanySize] = useState("");
  const [sectorInput, setSectorInput] = useState("");
  const [loadingLocal, setLoadingLocal] = useState({ resetLoading: false, applyLoading: false });

  const dispatch = useDispatch();

  // Sync with external filterData
  useEffect(() => {
    if (filterData) {
    }
  }, [filterData]);

  const handleAddSector = () => {
    if (sectorInput.trim()) {
      const newSectors = [...(filterData.sectors || []), sectorInput.trim()];
      setFilterData({ ...filterData, sectors: newSectors });
      setSectorInput("");
    }
  };

  const handleRemoveSector = (sectorToRemove) => {
    const updatedSectors = (filterData.sectors || []).filter(
      (s) => s !== sectorToRemove
    );
    setFilterData({ ...filterData, sectors: updatedSectors });
  };

  const handleReset = () => {
    setLoadingLocal((prev) => ({ ...prev, resetLoading: true }));
    setLoading(true);
    setFilterData({
      location: "",
      sectors: [],
      companySize: null,
    });
    setTimeout(() => {
      setLoading(false);
      setLoadingLocal((prev) => ({ ...prev, resetLoading: false }));
    }, 300);
  };

  const handleApply = () => {
    setLoadingLocal((prev) => ({ ...prev, applyLoading: true }));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingLocal((prev) => ({ ...prev, applyLoading: false }));
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 z-50 w-full max-w-[360px] backdrop-blur-[40px] bg-g-900/40 text-g-100 h-screen p-6 flex flex-col">
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
        <div className=" mb-6">
          <SelectField
            label="Company Size"
            options={[
              { label: "1-10", value: "1-10" },
              { label: "11-50", value: "11-50" },
              { label: "51-200", value: "51-200" },
              { label: "201-500", value: "201-500" },
              { label: "501-1000", value: "501-1000" },
              { label: "1001+", value: "1001+" },
            ]}
            placeholder="Select company size"
            value={companySize}
            onChange={(value) => {
              setCompanySize(value);
              setFilterData({ ...filterData, companySize: value });
            }}
          />
        </div>

        <div className="">
          <h3 className="text-sm font-medium mb-2 text-g-100">Sectors</h3>
          <input
            type="text"
            placeholder="Type sector and press Enter"
            value={sectorInput}
            onChange={(e) => setSectorInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSector()}
            className="w-full h-[52px] rounded-lg px-3 py-2.5 text-sm bg-g-700 border border-g-500 outline-none text-g-300 placeholder-[#6A6B6C] focus:outline-none mb-3"
          />
          <div className="flex flex-wrap gap-2">
            {filterData?.sectors?.map((sector, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-g-700 rounded-full px-3 py-1.5 text-sm text-gray-300"
              >
                <span>{sector}</span>
                <button
                  onClick={() => handleRemoveSector(sector)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
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
            {loadingLocal.applyLoading ? "Applying..." : "Apply Filters"}
          </button>
        </div>
      </div>
    </div>
  );
}
