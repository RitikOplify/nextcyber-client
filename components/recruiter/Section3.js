import React from "react";

function Section3() {
  return (
    <div className=" pt-50 px-5 sm:px-10 lg:px-20 max-w-[1440px] mx-auto pb-50">
      <h2 className=" text-5xl leading-14 font-medium tracking-[-2%] text-accent-color-1 text-center mb-25">
        How NextCybr Strengthens
        <br />
        Your Career Profile
      </h2>

      <div className="space-y-35">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-sm font-semibold leading-5 tracking-[4%] text-g-300 uppercase">
              Create Job-Tailored Resume
            </p>
            <h3 className="text-g-100 text-4xl leading-[44px] font-medium mt-5">
              Create resume that <br /> 30X your job chances
            </h3>
            <p className="text-g-200 text-xl font-medium leading-6 max-w-lg mt-5">
              Upload your resume and let our NextGen AI Resume Builder craft a
              standout version, designed to catch recruiters&apos; attention and
              help you land the job.
            </p>
            <button className="bg-primary text-white text-xl leading-6 font-medium py-4 px-8 rounded-lg mt-8">
              Create my resume
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <img
              src="/recruiter/AI job description.webp"
              alt="resume"
              className="h-100 rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 flex justify-start">
            <img
              src="/recruiter/track jobseeker.webp"
              alt="certificates"
              className="h-100 rounded-xl"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-5 tracking-[4%] text-g-300 uppercase">
              Personalized Roadmap
            </p>
            <h3 className="text-g-100 text-4xl leading-[44px] font-medium mt-5">
              Personalized Tips to Advance <br /> Your Career
            </h3>
            <p className="text-g-200 text-xl font-medium leading-6 max-w-lg mt-5">
              Instantly see what certifications, training, and projects will
              make you stand out for the exact role you want.
            </p>
            <button className="bg-primary text-white text-xl leading-6 font-medium py-4 px-8 rounded-lg mt-8">
              Show me the roadmap
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-sm font-semibold leading-5 tracking-[4%] text-g-300 uppercase">
              AI Recommended Jobs
            </p>
            <h3 className="text-g-100 text-4xl leading-[44px] font-medium mt-5">
              Let AI scan your profile to find <br /> the right jobs for you
            </h3>
            <p className="text-g-200 text-xl font-medium leading-6 max-w-lg mt-5">
              AI scans your profile and key skills to instantly match you with
              relevant job opportunities, making your job search faster and
              smarter.
            </p>
            <button className="bg-primary text-white text-xl leading-6 font-medium py-4 px-8 rounded-lg mt-8">
              Explore recommended jobs
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <img
              src="/recruiter/Chat with Candidates.webp"
              alt="ai jobs"
              className="h-100 rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 flex justify-start">
            <img
              src="/recruiter/Easy Job Posting.webp"
              alt="roadmap"
              className="h-100 rounded-xl"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-5 tracking-[4%] text-g-300 uppercase">
              Personalized Roadmap
            </p>
            <h3 className="text-g-100 text-4xl leading-[44px] font-medium mt-5">
              Personalized Tips to Advance <br /> Your Career
            </h3>
            <p className="text-g-200 text-xl font-medium leading-6 max-w-lg mt-5">
              Instantly see what certifications, training, and projects will
              make you stand out for the exact role you want.
            </p>
            <button className="bg-primary text-white text-xl leading-6 font-medium py-4 px-8 rounded-lg mt-8">
              Show me the roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;
