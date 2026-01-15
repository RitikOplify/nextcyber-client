"use client";
import { asyncGetCompanies } from "@/store/actions/companiesAction";
import { Loader2, SlidersHorizontal } from "lucide-react";
import CompanyCard from "@/components/cards/CompanyCard";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationSearchInput from "@/components/helper/LocationSearchInput";
import AdvancePagination from "@/components/ui/AdvancePagination";
import CompanyFilter from "@/components/filters/CompanyFilter";
import Search from "@/components/ui/Search";
import { removeCompanies } from "@/store/slices/companySlice";

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
          location: locationSearch || "",
          industry: filterData.industry,
          companySize: filterData.companySize,
        }).filter(([_, value]) => value !== "")
      ),
    };
    return params;
  }, [page, debouncedSearchTerm, locationSearch]);

  const fetchCompanies = useCallback(() => {
    setLoading(true);
    const params = buildParams();
    if (debouncedSearchTerm) {
      dispatch(asyncGetCompanies(params, setLoading)).then((data) => {
        setTotalPages(data?.totalPages || 1);
        setLoading(false);
      });
    }

    if (companies?.length === 0 && !debouncedSearchTerm) {
      dispatch(asyncGetCompanies("", setLoading)).then((data) => {
        setTotalPages(data?.totalPages || 1);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, buildParams]);

  const handleSearch = () => {
    setLoading(true);
    const params = buildParams();
    dispatch(asyncGetCompanies(buildParams(), setLoading)).then((data) => {
      setTotalPages(data?.totalPages || 1);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const clearOnUnmount = () => {
    dispatch(removeCompanies());
  };

  return (
    <>
      <div className="h-[calc(100vh-100.6px)] grid grid-rows-[auto_1fr_auto] relative overflow-y-hidden!">
        <div className="sticky top-0 z-10 flex flex-col items-center md:flex-row gap-4">
          <div className="relative w-full md:w-2/5">
            <Search
              value={searchTerm}
              setValue={setSearchTerm}
              placeholder="Search companies..."
              className="w-full!"
              clearOnUnmount={clearOnUnmount}
            />
          </div>

          <div className="relative w-full md:w-2/5">
            <LocationSearchInput
              selectedPlace={locationSearch}
              onPlaceSelected={(locationData) =>
                setLocationSearch(
                  locationData.city && locationData.state
                    ? `${locationData?.city}, ${locationData?.state}, ${locationData?.country}`
                    : ""
                )
              }
              clearOnUnmount={clearOnUnmount}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSearch}
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
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
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

      {showFilter && (
        <CompanyFilter
          isOpen={showFilter}
          onClose={handleToggleFilter}
          filterData={filterData}
          setFilterData={setFilterData}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default CompaniesPage;
