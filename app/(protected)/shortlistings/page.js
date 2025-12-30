"use client";
import { use, useCallback, useEffect, useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import StudentCard from "@/components/cards/StudentCard";
import {
  asyncAddCandidateToFavorite,
  asyncGetCandidates,
  asyncRemoveCandidateFromFavorite,
  asyncShortlistedCandidates,
} from "@/store/actions/candidateAction";
import { useDispatch, useSelector } from "react-redux";
import CandidateFilter from "@/components/filters/CandidateFilter";
import Pagination from "@/components/Pagination";

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
    <div className="min-h-screen bg-g-900 text-white">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div className="relative w-full md:w-2/5">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-g w-5 h-5" />
            <input
              type="text"
              placeholder="Search for candidates, skills..."
              className="w-full border rounded-lg py-3.5 pl-12 pr-4 bg-g-700 border-g-500 outline-none"
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

          <div className="flex justify-center items-center gap-3">
            <div className="relative">
              <button
                onClick={handleFetchCandidates}
                className="flex items-center gap-2 bg-primary rounded-lg px-8 py-3.5 text-gray-300 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>

            <div className="relative">
              <button
                onClick={handleToggleFilter}
                className="flex items-center gap-2 bg-g-600 border border-g-600 rounded-lg px-12 py-3.5 text-gray-300 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {loading ? (
            <div className="flex justify-center items-center col-span-full py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : shortlistedCandidates?.length > 0 ? (
            <>
              {shortlistedCandidates?.map((candidate, index) => (
                <StudentCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                  handleFavoriteToggle={() => handleFavoriteToggle(candidate)}
                  isFavorite={candidate?.favoritedBy
                    ?.map(({ company }) => company.id)
                    .includes(user?.companyProfile.id)}
                  style={{
                    background:
                      "radial-gradient(150.01% 100% at 50% 0%, rgba(2, 91, 207, 0.22) 0%, #1B1C1E 42%)",
                  }}
                />
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center col-span-full py-10 text-gray-400">
              No shortlisted candidates found.
            </div>
          )}
        </div>
        {shortlistedCandidates?.length > 0 && !loading && (
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageLimit}
            setPageSize={setPageLimit}
            totalPages={totalPages}
          />
        )}
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
