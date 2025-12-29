"use client";
import { useEffect, useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import StudentCard from "@/components/cards/StudentCard";
import { asyncGetCandidates } from "@/store/actions/candidateAction";
import { useDispatch, useSelector } from "react-redux";
import CandidateFilter from "@/components/filters/CandidateFilter";

export default function CandidatesPage() {
  const { candidates } = useSelector((state) => state.candidate);
  const [favorites, setFavorites] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    location: false,
    contractType: false,
    salary: false,
    skills: false,
    experience: false,
  });
  const [loading, setLoading] = useState(true);
  const [locationSearch, setLocationSearch] = useState("");
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const handleToggleFilter = () => setShowFilter(!showFilter);
  const [filterData, setFilterData] = useState({
    location: "",
    experience: "",
    skills: [],
    salaryRange: [0, 0],
    contractType: "",
    experienceRange: [0, 1],
  });

  const toggleFavorite = (index) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleFetchCandidates = () => {
    dispatch(asyncGetCandidates()).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    handleFetchCandidates();
  }, []);


  return (
    <div className="min-h-screen bg-g-900 text-white">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div className="relative w-full md:w-2/5">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-g w-5 h-5" />
            <input
              type="text"
              placeholder="Search for candidates, skills..."
              className="w-full bg-zinc-900 border border-g-600 rounded-lg py-3.5 pl-12 pr-4 text-g-300 placeholder-gray-500 focus:outline-none focus:border-zinc-700"
            />
          </div>

          <div className="relative w-full md:w-2/5">
            <LocationSearchInput
              selectedPlace={locationSearch}
              onPlaceSelected={(locationData) =>
                setLocationSearch(
                  `${locationData.city}, ${locationData.state}, ${locationData.country}`
                )
              }
            />
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("location")}
                className="flex items-center gap-2 bg-primary border border-g-600 rounded-lg px-8 py-3.5 text-gray-300 hover:border-zinc-700 transition-colors"
              >
                Search
              </button>
            </div>

            <div className="relative">
              <button
                onClick={handleToggleFilter}
                className="flex items-center gap-2 bg-zinc-900 border border-g-600 rounded-lg px-12 py-3.5 text-gray-300 hover:border-zinc-700 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {  
          loading ? (
            <div className="flex justify-center items-center col-span-full py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
          candidates?.map((candidate, index) => (
            <StudentCard
              key={candidate.id}
              candidate={candidate}
              index={index}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))
          )
        }
        </div>
      </div>

      {
        <CandidateFilter
          filterData={filterData}
          isOpen={showFilter}
          onClose={handleToggleFilter}
          setFilterData={setFilterData}
        />
      }
    </div>
  );
}
