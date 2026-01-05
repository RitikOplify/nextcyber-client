"use client";
import { asyncGetCompanies } from "@/store/actions/companiesAction";
import {
  Building,
  MapPin,
  MapPinHouse,
  Search,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import CompanyCard from "@/components/cards/CompanyCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationSearchInput from "@/components/helper/LocationSearchInput";

function CompaniesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((state) => state.companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const handleToggleFilter = () => setShowFilter(!showFilter);

  useEffect(() => {
    if (companies.length == 0) dispatch(asyncGetCompanies("", setLoading));
  }, []);

  return (
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

      {/* <div className="pt-5 pb-7.5  flex justify-center">
        <div className=" overflow-hidden  whitespace-nowrap">
          <div className="px-5 border border-g-600 bg-g-700 rounded-lg md:w-[480px] mx-auto ">
            <input
              type="text"
              placeholder="Search for jobs, companies..."
              className="py-4 outline-none"
            />
          </div>
          <div className=" pt-5 flex gap-5 overflow-x-auto scrollbar pb-1 ">
            <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
              <MapPin size={20} />
              <span>Location</span>
            </div>
            <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
              <Users size={20} />
              <span>Company Size</span>
            </div>
            <div className=" px-4 py-2 gap-2 flex items-center rounded-lg bg-g-600 border border-g-500 text-g-200 w-fit">
              <Building size={20} />
              <span>Location</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="overflow-y-auto max-h-full mt-5">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {companies.length > 0 ? (
            companies.map((company, i) => (
              <CompanyCard company={company} key={i} />
            ))
          ) : (
            <div className="flex justify-center items-center col-span-full py-10 text-gray-400">
              No companies found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
