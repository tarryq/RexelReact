import React, { useState } from "react";

const ImageMaintenance = () => {
 const [activeTab, setActiveTab] = useState("images");
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedType, setSelectedType] = useState("all");
 const [isLimitedToAccount, setIsLimitedToAccount] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);
 const [description, setDescription] = useState("");
 const [isActive, setIsActive] = useState(false);
 const [isAdidas, setIsAdidas] = useState(false);

 // Sample data
 const imageTypes = ["Account Logo", "Banner", "Product Image"];
 const matchingImages = [
  { id: 1, name: "logo.png", type: "Account Logo", description: "Main logo" },
  {
   id: 2,
   name: "banner.jpg",
   type: "Banner",
   description: "Homepage banner",
  },
 ];

 const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
   setSelectedImage(file);
  }
 };

 return (
  <div className="min-h-screen bg-gray-50 p-6">
   <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="mb-6 flex justify-between items-center">
     <h1 className="text-2xl font-bold text-[#3d3682]">
      Image Maintenance
     </h1>
     <div className="flex gap-3">
      <button className="bg-[#4B449D] text-white px-4 py-2 rounded hover:bg-[#3d3682] transition-colors text-sm">
       Download Image
      </button>
     </div>
    </div>

    {/* Tabs */}
    <div className="bg-white rounded-lg shadow mb-6">
     <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
       {["Images", "Rollover", "Replace"].map((tab) => (
        <button
         key={tab}
         className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === tab.toLowerCase()
           ? "border-[#4B449D] text-[#4B449D]"
           : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
         onClick={() => setActiveTab(tab.toLowerCase())}
        >
         {tab}
        </button>
       ))}
      </nav>
     </div>

     <div className="p-6">
      {activeTab === "images" && (
       <div className="space-y-6">
        {/* Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Search Images
          </label>
          <input
           type="text"
           className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent"
           placeholder="Search by name..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
          />
         </div>
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Image Type
          </label>
          <select
           className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent"
           value={selectedType}
           onChange={(e) => setSelectedType(e.target.value)}
          >
           <option value="all">All Types</option>
           {imageTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>
             {type}
            </option>
           ))}
          </select>
         </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
           <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
           >
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
           </svg>
           <div className="mt-4">
            <label className="cursor-pointer">
             <span className="text-[#4B449D] hover:text-[#3d3682]">
              Upload a file
             </span>
             <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
             />
            </label>
            <p className="text-sm text-gray-500 mt-1">
             or drag and drop
            </p>
           </div>
          </div>
         </div>

         {/* Image Details */}
         <div className="space-y-4">
          <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
           </label>
           <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           />
          </div>

          <div className="flex items-center gap-6">
           <label className="flex items-center gap-2">
            <input
             type="checkbox"
             className="rounded border-gray-300 text-[#4B449D] focus:ring-[#4B449D]"
             checked={isActive}
             onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Is Active</span>
           </label>
           <label className="flex items-center gap-2">
            <input
             type="checkbox"
             className="rounded border-gray-300 text-[#4B449D] focus:ring-[#4B449D]"
             checked={isAdidas}
             onChange={(e) => setIsAdidas(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
             Associate with Adidas
            </span>
           </label>
          </div>
         </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
         <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
          Clear Fields
         </button>
         <button className="bg-[#4B449D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3d3682]">
          Upload Image
         </button>
        </div>
       </div>
      )}

      {activeTab === "rollover" && (
       <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Primary Image */}
         <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Primary Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
           <label className="cursor-pointer">
            <span className="text-[#4B449D] hover:text-[#3d3682]">
             Choose primary image
            </span>
            <input
             type="file"
             className="hidden"
             accept="image/*"
            />
           </label>
          </div>
         </div>

         {/* Rollover Image */}
         <div className="space-y-4">
          <h3 className="font-medium text-gray-900">
           Rollover Image
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
           <label className="cursor-pointer">
            <span className="text-[#4B449D] hover:text-[#3d3682]">
             Choose rollover image
            </span>
            <input
             type="file"
             className="hidden"
             accept="image/*"
            />
           </label>
          </div>
         </div>
        </div>

        <div className="flex justify-end gap-3">
         <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
          Clear Rollover Image
         </button>
         <button className="bg-[#4B449D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3d3682]">
          Save Changes
         </button>
        </div>
       </div>
      )}

      {activeTab === "replace" && (
       <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* From Image */}
         <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Replace From</h3>
          <input
           type="text"
           className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent"
           placeholder="Search image to replace..."
          />
          <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent">
           <option value="">Select Image Type</option>
           {imageTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>
             {type}
            </option>
           ))}
          </select>
          <button className="w-full bg-[#4B449D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3d3682]">
           Search For What To Replace
          </button>
         </div>

         {/* To Image */}
         <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Replace With</h3>
          <input
           type="text"
           className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-transparent"
           placeholder="Search replacement image..."
          />
          <button className="w-full bg-[#4B449D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3d3682]">
           Search For What To Replace With
          </button>
         </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
         <label className="flex items-center gap-2">
          <input
           type="checkbox"
           className="rounded border-gray-300 text-[#4B449D] focus:ring-[#4B449D]"
          />
          <span className="text-sm text-gray-700">
           Delete Image Record
          </span>
         </label>
         <label className="flex items-center gap-2">
          <input
           type="checkbox"
           className="rounded border-gray-300 text-[#4B449D] focus:ring-[#4B449D]"
          />
          <span className="text-sm text-gray-700">
           Make Image Inactive
          </span>
         </label>
        </div>

        <div className="flex justify-end">
         <button className="bg-[#4B449D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3d3682]">
          Replace Image
         </button>
        </div>
       </div>
      )}
     </div>
    </div>

    {/* Where Used Section */}
    <div className="bg-white rounded-lg shadow">
     <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
       Where Used
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
         Accounts
        </h3>
        <div className="border rounded-lg p-4 min-h-[200px]">
         <div className="flex justify-end mb-4">
          <button className="text-sm text-[#4B449D] hover:underline">
           Refresh Account List
          </button>
         </div>
        </div>
        <button className="mt-3 text-sm text-[#4B449D] hover:underline">
         Jump To Product Account Maintenance
        </button>
       </div>
       <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
         Stores
        </h3>
        <div className="border rounded-lg p-4 min-h-[200px]"></div>
        <button className="mt-3 text-sm text-[#4B449D] hover:underline">
         Jump to Product Account Store Maintenance
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ImageMaintenance;
