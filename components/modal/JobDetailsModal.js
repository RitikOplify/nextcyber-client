import { timeFormatter } from "@/helper";
import {
  X,
  Clock,
  Calendar,
  Users,
  Receipt,
} from "lucide-react";
import Image from "next/image";

export default function JobDetailsModal({ selectedJob, onClose }) {
  return (
    <div className="hidden sm:block bg-g-800 sticky top-[75px] py-4 px-5 flex-1 h-fit rounded-[10px] border border-g-500">
      <div className=" border-b border-dashed border-g-400">
        <div>
            <div className=" flex items-center gap-3">
          <Image
            src={selectedJob?.company?.profilePicture?.url || "/image.png"}
            height={60}
            width={60}
            alt="company-logo"
            className=" rounded-[10px] h-15 w-15 object-cover"
          />
          <h4 className=" font-medium text-xl leading-6 underline decoration-dotted underline-offset-[25%] text-g-100">
            {selectedJob?.company?.companyName}
          </h4>
        </div>
        <div className=" absolute top-4 right-4">
          <button
            onClick={onClose}
            className="bg-red-600 rounded-full p-2 text-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 text-g-200 font-semibold py-4 text-xs leading-4">
            <div className="flex items-center gap-1.5  ">
              <Clock size={16} />
              <span className=" capitalize">
                {selectedJob?.contractType.toLowerCase()}
              </span>
            </div>
            <div className="flex items-center gap-2  ">
              <Users size={16} />
              <span>
                {
                  <span>
                    {`${selectedJob?.minWorkExperience}-${selectedJob?.maxWorkExperience} Years`}
                  </span>
                }
              </span>
            </div>
            <div className="flex items-center gap-2  ">
              <Receipt size={16} />
              <span>{selectedJob?.maxSalary}</span>
            </div>
            <div className="flex items-center gap-2  ">
              <Calendar size={16} />
              <span>Posted on {timeFormatter(selectedJob?.createdAt)}</span>
            </div>
          </div>
          <h2 className=" text-g-200 leading-6 font-medium text-2xl pb-2.5">
            {selectedJob?.title}
          </h2>
        </div>
      </div>
      <div className=" mt-7.5">
        <h5 className=" text-g-200 leading-6 font-medium">Job Description</h5>
        <p className=" text-g-300 font-normal leading-6 mt-3">
          {selectedJob?.jobDescription}
        </p>
      </div>
      <div className="mt-7.5">
        <h5 className="text-g-200 leading-6 font-medium ">
          Key Responsibilities
        </h5>
        <ul className=" text-g-300 font-normal leading-6 mt-3 list-disc pl-5">
          <li>Assist with security monitoring and incident triage.</li>
          <li>Participate in vulnerability scanning and patching.</li>
          <li>Help create security awareness materials.</li>
          <li>Document security procedure and policies.</li>
        </ul>
      </div>
      <div className=" mt-7.5">
        <h5 className=" text-g-200 leading-6 font-medium">Certifications</h5>
        <div className="flex gap-2 items-center mt-3  text-g-200 text-xs  leading-4 font-medium">
          {selectedJob?.certifications &&
            selectedJob.certifications.map((certification, i) => (
              <div
                key={i}
                className="py-1 px-2 bg-g-600 border border-g-500 rounded-full"
              >
                {certification}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-7.5">
        <h5 className="text-g-200 leading-6 font-medium ">Required Skills</h5>
        <ul className=" text-g-300 font-normal leading-6 mt-3 list-disc pl-5">
          {selectedJob?.skills &&
            selectedJob.skills.map((skill, i) => <li key={i}>{skill}</li>)}
        </ul>
      </div>
    </div>
  );
}
