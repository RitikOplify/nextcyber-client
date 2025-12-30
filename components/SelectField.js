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
  showErrors = true,

  /* ✅ NEW (non-breaking) */
  isSearch = true,
  optionLabel = "label",
  optionValue = "value",
}) => {
  // Always call hook unconditionally
  const formContext = useFormContext();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const isUsingRHF = formContext && formContext.control && name;

  /* ----------------------------------------
     Normalize options (string | object)
  ---------------------------------------- */
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string") {
      return { label: opt, value: opt };
    }
    return {
      label: opt?.[optionLabel],
      value: opt?.[optionValue],
    };
  });

  /* ----------------------------------------
     Filter options
  ---------------------------------------- */
  const filteredOptions = isSearch
    ? normalizedOptions.filter((opt) =>
        opt.label?.toLowerCase().includes(search.toLowerCase())
      )
    : normalizedOptions;

  /* ----------------------------------------
     Close dropdown on outside click
  ---------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ----------------------------------------
     Sync external value
  ---------------------------------------- */
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  /* ----------------------------------------
     Select handler
  ---------------------------------------- */
  const handleSelect = (option, currentValue, changeFn) => {
    let newValue;

    if (multiple) {
      newValue = currentValue?.includes(option.value)
        ? currentValue.filter((v) => v !== option.value)
        : [...(currentValue || []), option.value];
    } else {
      newValue = option.value;
      setOpen(false);
    }

    setInternalValue(newValue);
    changeFn?.(newValue);
  };

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
          className="w-full py-4 px-5 text-sm leading-5 rounded-lg border border-g-500 bg-g-700 text-g-300 text-left min-h-[48px] flex items-center justify-between cursor-pointer"
        >
          <div className="flex flex-wrap gap-2">
            {!multiple && currentValue ? (
              <span className="text-g-200">
                {normalizedOptions.find((o) => o.value === currentValue)?.label}
              </span>
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
            {isSearch && (
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
            )}

            <ul className={`max-h-48 overflow-y-auto`}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option, currentValue, onChange)}
                    className={`px-4 py-2 cursor-pointer text-g-200 hover:text-white last:border-b-0 border-b border-g-300/50 ${
                      multiple
                        ? currentValue?.includes(option.value)
                          ? `bg-primary/80 text-white hover:bg-primary/25 `
                          : "hover:bg-g-700"
                        : currentValue === option.value
                        ? "bg-primary/80 text-white"
                        : "hover:bg-g-700 "
                    }`}
                  >
                    {option.label}
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

  /* ======================================================
     REACT HOOK FORM MODE
  ====================================================== */
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
                  <span className="text-g-200">
                    {normalizedOptions.find((o) => o.value === value)?.label}
                  </span>
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
                {isSearch && (
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
                )}

                <ul className="max-h-48 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => {
                          let newValue;

                          if (multiple) {
                            newValue = value?.includes(option.value)
                              ? value.filter((v) => v !== option.value)
                              : [...(value || []), option.value];
                          } else {
                            newValue = option.value;
                            setOpen(false);
                          }

                          rhfOnChange(newValue);
                          onChange?.(newValue);
                        }}
                        className={`px-4 py-2 cursor-pointer text-g-200 hover:text-white ${
                          multiple
                            ? value?.includes(option.value)
                              ? `bg-primary/80 text-white hover:bg-primary/25 border-b border-g-300/50`
                              : "hover:bg-g-600"
                            : value === option.value
                            ? "bg-primary/80"
                            : "hover:bg-g-600 "
                        }`}
                      >
                        {option.label}
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

            {rhfError && showErrors && (
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
