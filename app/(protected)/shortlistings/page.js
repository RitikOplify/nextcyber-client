"use client";
import { use, useCallback, useEffect, useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import StudentCard from "@/components/cards/StudentCard";
import {
  asyncAddCandidateToFavorite,
  asyncRemoveCandidateFromFavorite,
  asyncShortlistedCandidates,
} from "@/store/actions/candidateAction";
import { useDispatch, useSelector } from "react-redux";
import CandidateFilter from "@/components/filters/CandidateFilter";
import AdvancePagination from "@/components/ui/AdvancePagination";

export default function ShortlistingsPage() {
  const { user } = useSelector((state) => state.auth);
  const { shortlistedCandidates, totalPages } = useSelector(
    (state) => state.candidate
  );
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

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
    remotePolicy: "", 
    experienceRange: [0, 1],
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
      limit: pageLimit,
      ...Object.fromEntries(
        Object.entries({
          search: debounceSearchTerm, // Use debounced search term
        }).filter(([_, value]) => value !== "")
      ),
    };
    return params;
  }, [page, pageLimit, debounceSearchTerm]);

  const handleFetchCandidates = () => {
    setLoading(true);
    const params = buildParams();
    dispatch(asyncShortlistedCandidates(params)).then(() => {
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
    handleFetchCandidates();
  }, [page, pageLimit, debounceSearchTerm]);

  return (
    <>
      <div className="h-[calc(100vh-100.6px)] grid grid-rows-[auto_1fr_auto] relative overflow-y-hidden!">
        {/* 🔹 Header / Filters (Fixed) */}
        <div className="sticky top-0 z-10 flex flex-col items-center md:flex-row gap-4">
          <div className="relative w-full md:w-2/5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-g w-5 h-5 text-g-300" />
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
              className="bg-primary rounded-lg px-8 py-3.5 text-gray-300 cursor-pointer"
            >
              Search
            </button>

            <button
              onClick={handleToggleFilter}
              className="flex items-center gap-2 bg-g-600 border border-g-600 rounded-lg px-12 py-3.5 text-gray-300 cursor-pointer"
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
            ) : shortlistedCandidates?.length > 0 ? (
              shortlistedCandidates.map((candidate, index) => (
                <StudentCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                  handleFavoriteToggle={() => handleFavoriteToggle(candidate)}
                  isFavorite={candidate?.favoritedBy
                    ?.map(({ company }) => company.id)
                    .includes(user?.companyProfile.id)}
                    style={{
                      background: "radial-gradient(150.01% 100% at 50% 0%, rgba(2, 91, 207, 0.22) 0%, #1B1C1E 42%)"
                    }}
                    className="hover:border-[#025BCF]!"
                />
              ))
            ) : (
              <div className="flex justify-center items-center col-span-full py-10 text-gray-400">
                No candidates found.
              </div>
            )}
          </div>
        </div>

        {shortlistedCandidates?.length > 0 && !loading && (
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
