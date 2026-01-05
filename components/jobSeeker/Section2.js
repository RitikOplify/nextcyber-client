import React from "react";

function Section2() {
  const companies = [
    "/polarwise.png",
    "/amiri.png",
    "/ciele.png",
    "/larq.png",
    "/y-combinator.svg",
    "/greenhouse.svg",
  ];
  return (
    <div className="overflow-hidden px-5 sm:px-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl leading-8 font-medium text-g-300">
          Trusted by Startups and Agencies
        </h2>
      </div>

      <div className="relative overflow-auto">
        <div className="flex w-full items-center justify-center gap-10">
          {companies.map((company, index) => (
            <div key={`second-${index}`}>
              <img
                src={company}
                className="w-35 shrink-0 object-contain"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section2;
