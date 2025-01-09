import React, { useEffect, useRef, useState } from 'react';

const SearchableDropdown = ({
 options,
 value,
 onChange,
 labelKey,
 valueKey,
 label,
 disabled,
 placeholder = "Search..."
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState('');
 const dropdownRef = useRef(null);

 const selectedOption = options?.find(opt => opt[valueKey] === value);

 const filteredOptions = options?.filter(option =>
  option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
 );

 useEffect(() => {
  const handleClickOutside = (event) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsOpen(false);
   }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleSelect = (option) => {
  onChange({ target: { value: option[valueKey] } });
  setIsOpen(false);
  setSearchTerm('');
 };

 return (
  <div className="flex items-center gap-2" ref={dropdownRef}>
   <label className="block text-sm font-medium text-gray-700 w-[140px]">
    {label}:
   </label>
   <div className="relative w-full">
    <div
     className={`border rounded-md p-2 flex justify-between items-center cursor-pointer ${disabled ? 'bg-gray-100' : 'bg-white'
      }`}
     onClick={() => !disabled && setIsOpen(!isOpen)}
    >
     <span className="truncate">
      {selectedOption ? selectedOption[labelKey] : 'Select...'}
     </span>
     <svg
      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
     >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
     </svg>
    </div>

    {isOpen && (
     <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
      <div className="p-2 border-b">
       <div className="relative">
        <input
         type="text"
         className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         placeholder={placeholder}
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
        />
       </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
       {filteredOptions?.map((option) => (
        <div
         key={option[valueKey]}
         className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option[valueKey] === value ? 'bg-blue-50 text-blue-600' : ''
          }`}
         onClick={() => handleSelect(option)}
        >
         {option[labelKey]}
        </div>
       ))}
       {filteredOptions?.length === 0 && (
        <div className="px-4 py-2 text-gray-500">No results found</div>
       )}
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

export default SearchableDropdown;