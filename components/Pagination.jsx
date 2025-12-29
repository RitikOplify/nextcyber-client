import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalPages,
}) {
  return (
    <>
      <div className="flex justify-between items-center px-5 py-3 bg-[#111214]">
        <div className="flex items-center gap-1.5">
          <span className="text-[#9C9C9D]">Rows per page</span>
          <div className="relative rounded-md border border-[#2F3031]">
            <select
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                setPageSize(Number(e.target.value));
              }}
              className="outline-none appearance-none w-full pl-2 pr-4 py-1.5 text-xs cursor-pointer text-g-200 font-normal"
            >
              {[10, 20, 30].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span className=" ml-4"></span>

            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-[#9C9C9D]" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className={`${
              page === 1
                ? "text-[#9C9C9D] cursor-not-allowed"
                : "text-text cursor-pointer"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <p className="text-[#9C9C9D]">
            {page} of {totalPages}
          </p>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className={` ${
              page === totalPages
                ? "text-[#9C9C9D] cursor-not-allowed"
                : "text-text cursor-pointer"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
