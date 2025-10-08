// "use client";
// import React from "react";
// import { useFormContext } from "react-hook-form";
// import SelectField from "@/components/SelectField";

// const Step7 = () => {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const contractType = watch("contractType");
//   const certificates = watch("certificates");
//   const skills = watch("skills");
//   const remotePolicy = watch("remotePolicy");

//   const pillClass = (isActive) =>
//     `px-2 py-1 rounded-full border transition text-xs bg-g-600 leading-4 font-medium ${
//       isActive
//         ? "text-white border-primary "
//         : "bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
//     }`;

//   return (
//     <div className="w-full mx-auto bg-g-900 px-20 pt-20 space-y-10">
//       <div>
//         <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
//           Contract Type
//         </label>
//         <div className="flex gap-2 flex-wrap">
//           {["Regular Employment", "Fixed-term", "Freelance", "Internship"].map(
//             (option) => (
//               <button
//                 type="button"
//                 key={option}
//                 onClick={() => setValue("contractType", option)}
//                 className={`px-4 py-2 rounded-full border bg-g-600 transition text-sm leading-5 font-medium ${
//                   contractType == option
//                     ? "text-white border-primary "
//                     : "text-g-200  border-g-500 hover:bg-g-700"
//                 }
//     `}
//               >
//                 {option}
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       <div>
//         <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
//           Remote Policy
//         </label>
//         <div className="flex gap-2 flex-wrap">
//           {["On-site", "Hybrid", "Remote"].map((option) => (
//             <button
//               type="button"
//               key={option}
//               onClick={() => setValue("remotePolicy", option)}
//               className={`px-4 py-2 rounded-full border bg-g-600 transition text-sm leading-5 font-medium ${
//                 remotePolicy == option
//                   ? "text-white border-primary "
//                   : "text-g-200  border-g-500 hover:bg-g-700"
//               }
//     `}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className=" w-1/2 flex flex-col gap-10">
//         <div>
//           <SelectField
//             label="Certificates"
//             name="certificates"
//             placeholder="Select Certificates"
//             multiple
//             options={[
//               "CCNA",
//               "AWS Certified Cloud Practitioner",
//               "AWS Certified SysOps Administrator - Associate",
//             ]}
//             register={register}
//             setValue={setValue}
//             errors={errors}
//           />
//           <div className="flex gap-2 mt-4 flex-wrap">
//             {certificates?.map((certificate) => (
//               <button key={certificate} className={`${pillClass()}`}>
//                 {certificate}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div>
//           <SelectField
//             label="Skills"
//             name="skills"
//             placeholder="Skills"
//             multiple
//             options={["Analytical Thinking", "Advanced Red Team Operations"]}
//             register={register}
//             setValue={setValue}
//             errors={errors}
//           />
//           <div className="flex gap-2 mt-4 flex-wrap">
//             {skills?.map((skill) => (
//               <button key={skill} className={`${pillClass()}`}>
//                 {skill}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step7;

"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import SelectField from "@/components/SelectField";

const Step7 = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const contractType = watch("contractType");
  const certificates = watch("certificates");
  const skills = watch("skills");
  const remotePolicy = watch("remotePolicy");

  const pillClass = (isActive) =>
    `px-2 py-1 rounded-full border transition text-xs bg-g-600 leading-4 font-medium ${
      isActive
        ? "text-white border-primary "
        : "bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
    }`;

  return (
    <div className="w-full mx-auto bg-g-900 px-20 pt-20 space-y-10">
      <div>
        <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
          Contract Type
        </label>
        <div className="flex gap-2 flex-wrap">
          {["Regular Employment", "Fixed-term", "Freelance", "Internship"].map(
            (option) => (
              <button
                type="button"
                key={option}
                onClick={() => setValue("contractType", option)}
                className={`px-4 py-2 rounded-full border bg-g-600 transition text-sm leading-5 font-medium ${
                  contractType == option
                    ? "text-white border-primary "
                    : "text-g-200  border-g-500 hover:bg-g-700"
                }
    `}
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
          Remote Policy
        </label>
        <div className="flex gap-2 flex-wrap">
          {["On-site", "Hybrid", "Remote"].map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setValue("remotePolicy", option)}
              className={`px-4 py-2 rounded-full border bg-g-600 transition text-sm leading-5 font-medium ${
                remotePolicy == option
                  ? "text-white border-primary "
                  : "text-g-200  border-g-500 hover:bg-g-700"
              }
    `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className=" w-1/2 flex flex-col gap-10">
        <div>
          <SelectField
            label="Certificates"
            name="certificates"
            placeholder="Select Certificates"
            multiple
            options={[
              "CCNA",
              "AWS Certified Cloud Practitioner",
              "AWS Certified SysOps Administrator - Associate",
            ]}
            rules={{
              validate: (value) =>
                value.length > 0 || "Please select at least one certificate",
            }}
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {certificates?.map((certificate) => (
              <button key={certificate} className={`${pillClass()}`}>
                {certificate}
              </button>
            ))}
          </div>
        </div>
        <div>
          <SelectField
            label="Skills"
            name="skills"
            placeholder="Skills"
            multiple
            options={["Analytical Thinking", "Advanced Red Team Operations"]}
            rules={{
              validate: (value) =>
                value.length > 0 || "Please select at least one skill",
            }}
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {skills?.map((skill) => (
              <button key={skill} className={`${pillClass()}`}>
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step7;
