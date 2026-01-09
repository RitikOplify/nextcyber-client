import { currencyFormatter, timeFormatter } from "@/helper";
import {
  Clock,
  Calendar,
  Star,
  Zap,
  ArrowUpRight,
  Share2,
  Bookmark,
} from "lucide-react";
import { BiDollarCircle } from "react-icons/bi";

const JobCard = ({ job, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(job)}
      className=" flex flex-col justify-between bg-g-700 rounded-[10px] overflow-hidden shadow-2xl p-5 border border-g-500 hover:border-primary transition-colors cursor-pointer h-full"
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-4">
            <div className="w-15 h-15 bg-gray-300 rounded-2xl border-2 border-dark-yellow flex-shrink-0"></div>

            <div>
              <h2 className="text-white text-md font-bold mb-1 truncate">
                {job?.company?.companyName || "Unknown Company"}
              </h2>
              <p className="text-gray-400 text-xs truncate">
                Posted on {timeFormatter(job?.createdAt)}
              </p>
            </div>
          </div>

          <button className="bg-g-400 hover:bg-g-500 p-2 rounded-lg transition-colors">
            <Bookmark className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-white text-md font-bold mb-2">
            {job?.title || "Job Title Here"}
          </h1>
          <p className="text-gray-400 text-xs">{job?.location || "Location not specified"}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-g-100 bg-g-500 px-3 py-1 rounded text-xs">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 text-xs font-medium">
              {job.contractType}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-g-100 bg-g-500 px-3 py-1 rounded text-xs">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 text-xs font-medium truncate">
              {job.minWorkExperience}-{job.maxWorkExperience} Years
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-g-100 bg-g-500 px-3 py-1 rounded text-xs">
            <BiDollarCircle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 text-xs font-medium">
              {currencyFormatter(job.maxSalary)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 text-primary">
          <div
            className="flex items-center gap-[6px] bg-gradient-to-r px-3 py-1 rounded"
            style={{ background: "#CFFFC8" }}
          >
            <Star className="w-5 h-5" />
            <span className="text-xs font-semibold">Featured</span>
          </div>
          <div
            className="flex items-center gap-[6px] bg-gradient-to-r px-3 py-1 rounded bg-[#E8DFFF]"
          >
            <Zap className="w-5 h-5 text-primary fill-primary" />
            <span className="text-primary text-xs font-semibold">Urgent</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-primary text-white font-medium py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer truncate">
          <span>Apply Now</span>
          <ArrowUpRight className="w-5 h-5" />
        </button>
        <button className="bg-primary text-white p-3.5 rounded-lg transition-colors cursor-pointer">
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;

{
  /* <div
  key={job.id}
  className="bg-g-600 rounded-[10px] p-5 border border-g-500 cursor-pointer"
  onClick={() => {
    setSelectedJob(job);
  }}
>
  <div className="flex justify-between items-center mb-6">
    <div className="flex gap-2">
      <span className="inline-flex text-xs leading-4 font-semibold items-center gap-1.5 p-1 rounded bg-light-blue text-primary">
        <Star size={12} />
        Featured
      </span>

      <span className="inline-flex text-xs leading-4 font-semibold items-center gap-1.5 p-1 rounded  bg-light-blue text-primary">
        <Zap size={12} />
        Urgent
      </span>
    </div>
    <div className="bg-g-500 p-1.5 rounded">
      <Bookmark size={16} className=" text-g-300" />
    </div>
  </div>

  <h3 className="text-sm leading-4 font-semibold text-g-200">{job.title}</h3>
  <p className="text-[#9C9C9D] text-sm">{job.location}</p>

  <div className="mt-6 mb-2 flex items-center capitalize whitespace-nowrap gap-3 text-g-300 text-xs leading-4">
    <div className="flex items-center gap-1.5  ">
      <Clock size={16} />
      <span>{job.contractType.split("_").join(" ").toLowerCase()}</span>
    </div>
    <div className="flex items-center gap-2  ">
      <Users size={16} />
      <span>{`${job?.minWorkExperience}-${job?.maxWorkExperience} Years`}</span>
    </div>
    <div className="flex items-center gap-2  ">
      <DollarSign size={16} />
      <span>{job.maxSalary}</span>
    </div>
  </div>

  <p className="text-g-300 text-xs">Posted on {formatDate(job.createdAt)}</p>

  <div className="flex items-center justify-between mt-11 pt-5.5 border-t border-g-500">
    <div className="flex items-center gap-2 text-[#9C9C9D]">
      <Image
        src={job?.company?.profilePicture?.url}
        height={24}
        width={24}
        alt="company-logo"
        className=" rounded-full h-6 w-6"
      />
      <span>{truncateChars(job?.company?.companyName, 10)}</span>
    </div>
    <button
      title="Apply Job"
      disabled={appliedJob.some((applied) => applied.job.id === job.id)}
      className=" text-g-200 px-4 cursor-pointer disabled:cursor-no-drop py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-g-500"
      onClick={() => {
        applyJob(job.id);
      }}
    >
      Apply Now
    </button>
  </div>
</div>; */
}
