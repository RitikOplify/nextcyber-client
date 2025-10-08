// "use client";
// import React from "react";
// import { useFormContext } from "react-hook-form";
// import { ArrowUpToLine } from "lucide-react";
// import SelectField from "@/components/SelectField";

// const Step6 = ({ files, setFiles }) => {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const gender = watch("gender");
//   const selectedNationalities = watch("nationalities");
//   const selectedLocation = watch("location");
//   const selectedLanguage = watch("languages");
//   const profileImage = watch("profilePicture");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setFiles({ ...files, profilePicture: file });
//       setValue("profilePicture", imageURL);
//     }
//   };

//   const pillClass = (isActive) =>
//     `px-2 py-1 rounded-full border transition text-xs leading-4 font-medium ${
//       isActive
//         ? "bg-primary text-white border-primary "
//         : "bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
//     }`;

//   return (
//     <div className="w-full mx-auto bg-g-900 px-20 pt-20 space-y-10">
//       <div className="flex flex-col items-start gap-4">
//         <label className="text-sm font-medium text-g-200 leading-5">
//           Profile Picture
//         </label>
//         <div className="flex items-center gap-6">
//           <div className="w-16 h-16 rounded-full overflow-hidden bg-g-500">
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Profile Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-g-300 text-sm">
//                 No Img
//               </div>
//             )}
//           </div>
//           <label
//             htmlFor="upload"
//             className="flex items-center gap-2 border border-g-400  text-g-200 px-4 py-2 rounded-full cursor-pointer transition"
//           >
//             <ArrowUpToLine size={18} />
//             <span className=" text-base leading-[150%]">Upload Image</span>
//           </label>
//           <input
//             id="upload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
//           Gender preference
//         </label>
//         <div className="flex gap-2 flex-wrap">
//           {["Male", "Female", "Prefer not to say"].map((option) => (
//             <button
//               type="button"
//               key={option}
//               onClick={() => setValue("gender", option)}
//               className={`px-4 py-2 rounded-full border transition text-sm leading-5 bg-g-600 text-g-200  border-g-500 font-medium ${
//                 gender == option ? "border-primary " : " hover:bg-g-700"
//               }
//     `}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
//         <div>
//           <SelectField
//             label="Nationalities"
//             name="nationalities"
//             placeholder="Select Nationalities"
//             multiple
//             options={[
//               "India",
//               "United States",
//               "Canada",
//               "United Kingdom",
//               "Germany",
//               "France",
//             ]}
//             register={register}
//             setValue={setValue}
//             errors={errors}
//           />
//           <div className="flex gap-2 mt-4 flex-wrap">
//             {selectedNationalities?.map((nation) => (
//               <button key={nation} className={`${pillClass()}`}>
//                 {nation}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div>
//           <SelectField
//             label="Location"
//             name="location"
//             placeholder="Search"
//             options={["Pune", "Mumbai", "Delhi", "Bangalore"]}
//             register={register}
//             setValue={setValue}
//             errors={errors}
//           />

//           {selectedLocation && (
//             <button className={`${pillClass()} mt-4`}>{selectedLocation}</button>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
//         <div>
//           <SelectField
//             label="Language"
//             name="languages"
//             placeholder="Search"
//             multiple
//             options={[
//               "English",
//               "Hindi",
//               "Marathi",
//               "French",
//               "Spanish",
//               "German",
//             ]}
//             register={register}
//             setValue={setValue}
//             errors={errors}
//           />
//           <div className="flex gap-2 mt-4 flex-wrap">
//             {selectedLanguage?.map((lan) => (
//               <button key={lan} className={`${pillClass()}`}>
//                 {lan}
//               </button>
//             ))}
//           </div>
//         </div>

//         <SelectField
//           label="Currency"
//           name="currency"
//           placeholder="Search"
//           options={["INR", "USD", "EUR", "GBP", "JPY"]}
//           register={register}
//           setValue={setValue}
//           errors={errors}
//         />
//       </div>
//     </div>
//   );
// };

// export default Step6;

"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ArrowUpToLine } from "lucide-react";
import SelectField from "@/components/SelectField";

const Step6 = ({ files, setFiles }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const gender = watch("gender");
  const selectedNationalities = watch("nationalities");
  const selectedLocation = watch("location");
  const selectedLanguage = watch("languages");
  const profileImage = watch("profilePicture");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFiles({ ...files, profilePicture: file });
      setValue("profilePicture", imageURL);
    }
  };

  const pillClass = (isActive) =>
    `px-2 py-1 rounded-full border transition text-xs leading-4 font-medium ${
      isActive
        ? "bg-primary text-white border-primary "
        : "bg-g-600 text-g-200  border-g-500 hover:bg-g-700"
    }`;

  return (
    <div className="w-full mx-auto bg-g-900 px-20 pt-20 space-y-10">
      <div className="flex flex-col items-start gap-4">
        <label className="text-sm font-medium text-g-200 leading-5">
          Profile Picture
        </label>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-g-500">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-g-300 text-sm">
                No Img
              </div>
            )}
          </div>
          <label
            htmlFor="upload"
            className="flex items-center gap-2 border border-g-400  text-g-200 px-4 py-2 rounded-full cursor-pointer transition"
          >
            <ArrowUpToLine size={18} />
            <span className=" text-base leading-[150%]">Upload Image</span>
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-g-200 leading-5">
          Gender preference
        </label>
        <div className="flex gap-2 flex-wrap">
          {["Male", "Female", "Prefer not to say"].map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setValue("gender", option)}
              className={`px-4 py-2 rounded-full border transition text-sm leading-5 bg-g-600 text-g-200  border-g-500 font-medium ${
                gender == option ? "border-primary " : " hover:bg-g-700"
              }
    `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        <div>
          <SelectField
            label="Nationalities"
            name="nationalities"
            placeholder="Select Nationalities"
            multiple
            options={[
              "India",
              "United States",
              "Canada",
              "United Kingdom",
              "Germany",
              "France",
            ]}
            rules={{
              validate: (value) =>
                value.length > 0 || "Please select at least one nationality",
            }}
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {selectedNationalities?.map((nation) => (
              <button key={nation} className={`${pillClass()}`}>
                {nation}
              </button>
            ))}
          </div>
        </div>
        <div>
          <SelectField
            label="Location"
            name="location"
            placeholder="Search"
            options={["Pune", "Mumbai", "Delhi", "Bangalore"]}
            rules={{
              required: "Location is required",
            }}
          />

          {selectedLocation && (
            <button className={`${pillClass()} mt-4`}>
              {selectedLocation}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        <div>
          <SelectField
            label="Language"
            name="languages"
            placeholder="Search"
            multiple
            options={[
              "English",
              "Hindi",
              "Marathi",
              "French",
              "Spanish",
              "German",
            ]}
            rules={{
              validate: (value) =>
                value.length > 0 || "Please select at least one language",
            }}
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {selectedLanguage?.map((lan) => (
              <button key={lan} className={`${pillClass()}`}>
                {lan}
              </button>
            ))}
          </div>
        </div>

        <SelectField
          label="Currency"
          name="currency"
          placeholder="Search"
          options={["INR", "USD", "EUR", "GBP", "JPY"]}
          rules={{
            required: "Currency is required",
          }}
        />
      </div>
    </div>
  );
};

export default Step6;
