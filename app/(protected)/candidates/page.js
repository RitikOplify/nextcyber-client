"use client";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import StudentCard from "@/components/cards/StudentCard";
import {
  asyncAddCandidateToFavorite,
  asyncGetCandidates,
  asyncRemoveCandidateFromFavorite,
} from "@/store/actions/candidateAction";
import { useDispatch, useSelector } from "react-redux";
import CandidateFilter from "@/components/filters/CandidateFilter";
import toast from "react-hot-toast";
import AdvancePagination from "@/components/ui/AdvancePagination";

export default function CandidatesPage() {
  const { user } = useSelector((state) => state.auth);
  const { candidates, totalPages } = useSelector((state) => state.candidate);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
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
    experienceRange: { min: 0, max: 10 },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Build query params
  const buildParams = useCallback(() => {
    const params = {
      page,
      ...Object.fromEntries(
        Object.entries({
          search: debounceSearchTerm, // Use debounced search term
          location: locationSearch,
        }).filter(([_, value]) => value !== "")
      ),
    };
    return params;
  }, [page, debounceSearchTerm, locationSearch]);

  const handleFetchCandidates = (params) => {
    setLoading(true);

    dispatch(asyncGetCandidates(params)).then(() => {
      setLoading(false);
    });
  };

  const handleSearchCandidates = (params) => {
    setLoading(true);
    dispatch(asyncGetCandidates(params)).then(() => {
      setLoading(false);
    });
  };

  const handleFavoriteToggle = async (candidate) => {
    console.log("Toggling favorite for candidate:", candidate);
    candidate?.favoritedBy
      ?.map(({ company }) => company.id)
      .includes(user?.companyProfile.id)
      ? dispatch(
          asyncRemoveCandidateFromFavorite(
            candidate.id,
            user?.companyProfile.id
          )
        )
      : dispatch(
          asyncAddCandidateToFavorite(candidate.id, user?.companyProfile.id)
        );
  };

  useEffect(() => {
    const params = buildParams();
    if (debounceSearchTerm) {
      setLoading(true);
      dispatch(asyncGetCandidates(params)).then(() => {
        setLoading(false);
      });
    } else {
      handleFetchCandidates(params);
    }
  }, [debounceSearchTerm, page, locationSearch]);

  return (
    <>
      <div className="h-[calc(100vh-100.6px)] grid grid-rows-[auto_1fr_auto] relative overflow-y-hidden!">
        {/* 🔹 Header / Filters (Fixed) */}
        <div className="sticky top-0 z-10 flex flex-col items-center md:flex-row gap-4">
          <div className="relative w-full md:w-2/5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-g w-5 h-5 text-g-300 " />
            <input
              type="text"
              placeholder="Search for candidates, skills..."
              className="w-full rounded-lg py-3.5 pl-12 pr-4 bg-g-700 border border-g-500 outline-none text-g-300 placeholder-[#6A6B6C]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          <div className="flex items-center gap-3">
            <button
              onClick={handleFetchCandidates}
              className="bg-primary rounded-lg px-8 py-3.5 text-gray-300"
            >
              Search
            </button>

            <button
              onClick={handleToggleFilter}
              className="flex items-center gap-2 bg-g-600 border border-g-600 rounded-lg px-12 py-3.5 text-gray-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-full mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading ? (
              <div className="flex justify-center items-center col-span-full py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : candidates?.length > 0 ? (
              candidates.map((candidate, index) => (
                <StudentCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                  handleFavoriteToggle={() => handleFavoriteToggle(candidate)}
                  isFavorite={candidate?.favoritedBy
                    ?.map(({ company }) => company.id)
                    .includes(user?.companyProfile.id)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center col-span-full py-10 text-gray-400">
                No candidates found.
              </div>
            )}
          </div>
        </div>

        {candidates?.length > 0 && !loading && (
          <div className="sticky bottom-0 flex justify-center mt-5">
            <AdvancePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
      <CandidateFilter
        filterData={filterData}
        isOpen={showFilter}
        onClose={handleToggleFilter}
        setFilterData={setFilterData}
      />
    </>
  );
}
