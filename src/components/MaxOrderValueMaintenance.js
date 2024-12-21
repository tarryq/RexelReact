import React, { useState } from 'react';

const MaximumOrderValue = () => {
 const [storeOverrides, setStoreOverrides] = useState([]);
 const [selectedStore, setSelectedStore] = useState('');

 const handleAddStore = () => {
  if (selectedStore && !storeOverrides.includes(selectedStore)) {
   setStoreOverrides([...storeOverrides, selectedStore]);
   setSelectedStore('');
  }
 };

 const handleRemoveStore = (storeToRemove) => {
  setStoreOverrides(storeOverrides.filter(store => store !== storeToRemove));
 };

 return (
  <div className="min-h-screen bg-gray-50 p-6">
   <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
     <h1 className="text-2xl font-semibold text-[#4B449D]  mb-8">
      Maximum Order Value Maintenance
     </h1>

     {/* Account Level Default Section */}
     <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
       <div className="flex-grow md:max-w-xs">
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Account level default maximum order value
        </label>
        <input
         type="number"
         className="w-full px-4 py-2 border border-gray-300 select select-bordered"
         placeholder="Enter value"
        />
       </div>
       <div className="flex gap-2">
        <button className=" btn px-4 py-2 bg-[#4B449D] text-white rounded-md hover:bg-[#38327D] transition-colors">
         Update
        </button>
        <button className="btn px-4 py-2 border border-purple-200 text-[#4B449D]  rounded-md hover:bg-purple-50 transition-colors">
         Remove
        </button>
       </div>
      </div>
     </div>

     {/* Store Override Section */}
     <div className="border-t pt-6">
      <div className="grid md:grid-cols-2 gap-6 mb-4">
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Store
        </label>
        <select
         value={selectedStore}
         onChange={(e) => setSelectedStore(e.target.value)}
         className="w-full px-4 py-2 border-gray-300 select select-bordered select-md"
        >
         <option value="">- NEW YORK - AESOP **LAMP**</option>
         <option value="store1">Store 1</option>
         <option value="store2">Store 2</option>
        </select>
       </div>
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Store Override List
        </label>
        <button
         onClick={handleAddStore}
         className="btn w-full px-4 py-2 bg-[#4B449D] text-white rounded-md hover:bg-[#38327D] transition-colors flex items-center justify-center gap-2"
        >
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
         </svg>
         Add to Store Override List
        </button>
       </div>
      </div>

      {/* Override List */}
      <div className="space-y-2">
       {storeOverrides.map((store, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group">
         <span className="text-gray-700">{store}</span>
         <button
          onClick={() => handleRemoveStore(store)}
          className="text-gray-400 hover:text-red-600 transition-colors p-1"
         >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
         </button>
        </div>
       ))}
      </div>
     </div>
    </div>

   </div>
  </div>
 );
};

export default MaximumOrderValue;