import React from "react";

function Step1({ goNext }) {
  const companies = [
    "/polarwise.png",
    "/amiri.png",
    "/ciele.png",
    "/larq.png",
    "/y-combinator.svg",
    "/greenhouse.svg",
  ];
  return (
    <div className="flex flex-col justify-center gap-20 py-20 flex-1  items-center">
      <div className=" text-center">
        <h1 className=" text-g-200 text-2xl leading-8">👋 Welcome, Pradeep</h1>
        <h2 className="text-g-100 text-2xl leading-8 font-medium mt-3">
          Help us get to know you better!
        </h2>
        <button
          onClick={goNext}
          className="px-16 py-3 rounded bg-primary text-white text-sm leading-5 font-medium mt-7.5"
        >
          Let{"'"}s go
        </button>
      </div>

      <div className="relative overflow-auto">
        <div className="flex w-full items-center justify-center gap-10">
          {companies.map((company, index) => (
            <div key={`second-${index}`}>
              <img
                src={company}
                className="w-35 h-8 shrink-0 object-contain"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step1;
