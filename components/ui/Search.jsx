import { Search as SearchIcon, X } from "lucide-react";
import React from "react";

function Search({ search, setSearch, placeholder }) {
  return (
    <div className="w-[320px]">
      <div className="flex items-center gap-2 bg-[#111214] border border-[#2F3031] rounded-lg px-5 py-4">
        <SearchIcon size={20} className="text-[#9C9C9D] shrink-0" />
        <input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-[#9C9C9D] outline-none w-full"
        />
        {search && (
          <X
            size={20}
            className=" text-g-200 cursor-pointer hover:text-g-100 shrink-0"
            onClick={() => setSearch("")}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
