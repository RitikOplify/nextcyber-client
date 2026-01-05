"use client";
import { asyncGetCompanies } from "@/store/actions/companiesAction";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import CompanyCard from "@/components/cards/CompanyCard";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import AdvancePagination from "@/components/ui/AdvancePagination";
import CompanyFilter from "@/components/filters/CompanyFilter";

function CompaniesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { companies } = useSelector((state) => state.companies);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [locationSearch, setLocationSearch] = useState("");
  const [filterData, setFilterData] = useState({
    location: "",
    industry: "",
    companySize: "",
    sectors: [],
  });
  const [showFilter, setShowFilter] = useState(false);
  const handleToggleFilter = () => setShowFilter(!showFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const buildParams = useCallback(() => {
    const params = {
      page,
      ...Object.fromEntries(
        Object.entries({
          search: debouncedSearchTerm,
          location: locationSearch,
          industry: filterData.industry,
          companySize: filterData.companySize,
        }).filter(([_, value]) => value !== "")
      ),
    };
    return params;
  }, [page, debouncedSearchTerm, locationSearch]);

  useMemo(() => {
    const params = buildParams();
    setLoading(true);
    dispatch(asyncGetCompanies(params, setLoading)).then((data) => {
      setTotalPages(data?.totalPages || 1);
    });
  }, [dispatch, buildParams]);

  useEffect(() => {
    if (companies.length == 0) dispatch(asyncGetCompanies("", setLoading));
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-100.6px)] grid grid-rows-[auto_1fr_auto] relative overflow-y-hidden!">
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
              onClick={() => {}}
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
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading ? (
              <div className="flex justify-center items-center col-span-full py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : companies.length > 0 ? (
              companies.map((company, i) => (
                <CompanyCard company={company} key={i} />
              ))
            ) : (
              <div className="flex justify-center items-center col-span-full py-10 text-gray-400">
                No companies found.
              </div>
            )}
          </div>
          {companies?.length > 0 && !loading && (
            <div className="sticky bottom-0 flex justify-center mt-5">
              <AdvancePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          )}
        </div>
      </div>

      <CompanyFilter
        isOpen={showFilter}
        onClose={handleToggleFilter}
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </>
  );
}

export default CompaniesPage;
