// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown, X, Search } from "lucide-react";

// const SelectField = ({
//   label,
//   name,
//   options = [],
//   multiple = false,
//   placeholder = "Select an option",
//   register,
//   setValue,
//   getValues,
//   errors,
//   defaultValue = multiple ? [] : "",
//   onChange,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(defaultValue);
//   const [search, setSearch] = useState("");
//   const dropdownRef = useRef(null);

//   // Filtered options based on search
//   const filteredOptions = options.filter((opt) =>
//     opt.toLowerCase().includes(search.toLowerCase())
//   );

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Sync with RHF and call onChange safely
//   useEffect(() => {
//     setValue?.(name, selected);
//     onChange?.(selected);
//   }, [selected, name, setValue, onChange]);

//   const handleSelect = (option) => {
//     if (multiple) {
//       setSelected((prev) =>
//         prev.includes(option)
//           ? prev.filter((item) => item !== option)
//           : [...prev, option]
//       );
//     } else {
//       setSelected(option);
//       setOpen(false);
//     }
//   };

//   const handleRemove = (option) => {
//     if (multiple) {
//       setSelected((prev) => prev.filter((item) => item !== option));
//     } else {
//       setSelected("");
//     }
//   };

//   return (
//     <div className="w-full relative" ref={dropdownRef}>
//       {label && (
//         <label className="block mb-1 text-sm font-medium text-g-200 leading-5">
//           {label}
//         </label>
//       )}

//       <div
//         onClick={() => setOpen(!open)}
//         className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left min-h-[48px] flex items-center justify-between cursor-pointer"
//       >
//         <div className="flex flex-wrap gap-2">
//           {!multiple && selected ? (
//             <span>{selected}</span>
//           ) : (
//             <span className="text-g-300">{placeholder}</span>
//           )}
//         </div>
//         <ChevronDown
//           size={18}
//           className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
//         />
//       </div>

//       {open && (
//         <div className="absolute z-50 mt-1 w-full bg-g-700 border border-g-600 rounded-lg overflow-hidden">
//           <div className="flex items-center gap-2 px-4 py-3 border-b border-g-500">
//             <Search size={16} className="text-g-300" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent outline-none text-sm text-g-300 placeholder-g-300"
//             />
//           </div>

//           {/* Options */}
//           <ul className="max-h-48 overflow-y-auto">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <li
//                   key={option}
//                   onClick={() => handleSelect(option)}
//                   className={`px-4 py-2 cursor-pointer text-g-200 hover:text-white ${
//                     multiple
//                       ? selected.includes(option)
//                         ? `bg-primary/80 text-white hover:bg-primary/25 border-b border-g-300/50`
//                         : "hover:bg-g-600"
//                       : selected === option
//                       ? "bg-primary/80"
//                       : "hover:bg-g-600 "
//                   }`}
//                 >
//                   {option}
//                 </li>
//               ))
//             ) : (
//               <li className="px-3 py-2 text-sm text-g-300 text-center">
//                 No results found
//               </li>
//             )}
//           </ul>
//         </div>
//       )}

//       {/* RHF error */}
//       {errors?.[name] && (
//         <p className="mt-1 text-sm text-red-400">{errors[name].message}</p>
//       )}

//       {/* Hidden input fallback for RHF register */}
//       {register && !setValue && (
//         <input type="hidden" value={selected} {...register(name)} />
//       )}
//     </div>
//   );
// };

// export default SelectField;

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";

const SelectField = ({
  label,
  name,
  options = [],
  multiple = false,
  placeholder = "Select an option",
  defaultValue = multiple ? [] : "",
  rules = {},
  onChange,
  value: externalValue,
  error,
}) => {
  // Always call the hook unconditionally - no try-catch
  const formContext = useFormContext();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const dropdownRef = useRef(null);

  // Determine if we're using React Hook Form
  const isUsingRHF = formContext && formContext.control && name;

  // Filtered options based on search
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync external value with internal state
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleSelect = (option, currentValue, onChangeCallback) => {
    let newValue;
    if (multiple) {
      newValue = currentValue.includes(option)
        ? currentValue.filter((item) => item !== option)
        : [...currentValue, option];
    } else {
      newValue = option;
      setOpen(false);
    }

    setInternalValue(newValue);

    if (onChangeCallback) {
      onChangeCallback(newValue);
    }
  };

  // Standalone component (without React Hook Form)
  const renderStandalone = () => {
    const currentValue =
      externalValue !== undefined ? externalValue : internalValue;

    return (
      <div className="w-full relative" ref={dropdownRef}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-g-200 leading-5">
            {label}
          </label>
        )}

        <div
          onClick={() => setOpen(!open)}
          className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left min-h-[48px] flex items-center justify-between cursor-pointer"
        >
          <div className="flex flex-wrap gap-2">
            {!multiple && currentValue ? (
              <span className="text-g-200">{currentValue}</span>
            ) : multiple && currentValue?.length > 0 ? (
              <span className="text-g-200">{currentValue.length} selected</span>
            ) : (
              <span className="text-g-300">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-g-700 border border-g-600 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-g-500">
              <Search size={16} className="text-g-300" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-g-300 placeholder-g-300"
              />
            </div>

            <ul className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelect(option, currentValue, onChange)}
                    className={`px-4 py-2 cursor-pointer text-g-200 hover:text-white ${
                      multiple
                        ? currentValue.includes(option)
                          ? `bg-primary/80 text-white hover:bg-primary/25 border-b border-g-300/50`
                          : "hover:bg-g-600"
                        : currentValue === option
                        ? "bg-primary/80"
                        : "hover:bg-g-600 "
                    }`}
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-g-300 text-center">
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  };

  // With React Hook Form
  if (isUsingRHF) {
    return (
      <Controller
        name={name}
        control={formContext.control}
        defaultValue={defaultValue}
        rules={rules}
        render={({
          field: { value, onChange: rhfOnChange },
          fieldState: { error: rhfError },
        }) => (
          <div className="w-full relative" ref={dropdownRef}>
            {label && (
              <label className="block mb-1 text-sm font-medium text-g-200 leading-5">
                {label}
              </label>
            )}

            <div
              onClick={() => setOpen(!open)}
              className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-600 bg-g-700 text-g-300 text-left min-h-[48px] flex items-center justify-between cursor-pointer"
            >
              <div className="flex flex-wrap gap-2">
                {!multiple && value ? (
                  <span className="text-g-200">{value}</span>
                ) : multiple && value?.length > 0 ? (
                  <span className="text-g-200">{value.length} selected</span>
                ) : (
                  <span className="text-g-300">{placeholder}</span>
                )}
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {open && (
              <div className="absolute z-50 mt-1 w-full bg-g-700 border border-g-600 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-g-500">
                  <Search size={16} className="text-g-300" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-g-300 placeholder-g-300"
                  />
                </div>

                <ul className="max-h-48 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          let newValue;
                          if (multiple) {
                            newValue = value.includes(option)
                              ? value.filter((item) => item !== option)
                              : [...value, option];
                          } else {
                            newValue = option;
                            setOpen(false);
                          }
                          rhfOnChange(newValue);
                          if (onChange) onChange(newValue);
                        }}
                        className={`px-4 py-2 cursor-pointer text-g-200 hover:text-white ${
                          multiple
                            ? value.includes(option)
                              ? `bg-primary/80 text-white hover:bg-primary/25 border-b border-g-300/50`
                              : "hover:bg-g-600"
                            : value === option
                            ? "bg-primary/80"
                            : "hover:bg-g-600 "
                        }`}
                      >
                        {option}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-g-300 text-center">
                      No results found
                    </li>
                  )}
                </ul>
              </div>
            )}

            {rhfError && (
              <p className="mt-1 text-sm text-red-400">{rhfError.message}</p>
            )}
          </div>
        )}
      />
    );
  }

  return renderStandalone();
};

export default SelectField;
