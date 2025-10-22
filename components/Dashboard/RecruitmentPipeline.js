import React from "react";

function RecruitmentPipeline() {
  const stats = [
    {
      key: "New Applications",
      value: "78",
    },
    {
      key: "Shortlisted",
      value: "24",
    },
    {
      key: "Interviewing",
      value: "12",
    },
    {
      key: "Offer Sent",
      value: "5",
    },
    {
      key: "Hired",
      value: "2",
    },
  ];
  return (
    <div className="bg-gradient-to-b from-g-500 to-g-600 p-0.5 rounded-[10px] overflow-hidden mt-4">
      <div className="bg-g-600 rounded-lg overflow-hidden p-5">
        <h3 className=" text-g-100 text-base font-semibold leading-6 mt-2.5">
          Recruitment Pipeline
        </h3>
        <p className=" text-g-200 leading-5 font-normal mt-1.5 text-sm">
          Overview of your hiring stages.
        </p>
        <div className="mt-7.5 flex gap-15 flex-wrap">
          {stats.map((stat) => (
            <div>
              <h5 className="text-g-200 leading-5 font-medium mb-3 text-sm">
                {stat.key}
              </h5>
              <span className=" text-dark-green text-2xl leading-8 font-semibold">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecruitmentPipeline;
