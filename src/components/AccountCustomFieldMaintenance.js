import React, { useState } from 'react';

const AccountCustomField = () => {
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [fields, setFields] = useState([
    {
      id: 1,
      name: 'Empty_Cart_Message',
      description: 'If specified, overrides default empty cart message',
      used: false,
      value: '',
      category: 'Cart'
    },
    {
      id: 2,
      name: 'Order_Confirmation_Message',
      description: 'If specified, overrides default order confirmation message',
      used: false,
      value: '',
      category: 'Order'
    },
    {
      id: 3,
      name: 'Order_Confirmation_Hide_Header',
      description: 'If included and true, the Header section on the order confirmation page will be hidden',
      used: false,
      value: '',
      category: 'Order'
    },
    {
      id: 4,
      name: 'Hide_Customer_PO',
      description: 'If included and set to \'true\', the customer po number prompt will not display on the checkout screen',
      used: true,
      value: 'True',
      category: 'System'
    }
  ]);

  const filteredFields = fields.filter(field =>
    (category === 'All' || field.category === category) &&
    (field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#4B449D] mb-2">
            Account Custom Field Maintenance
          </h1>
          <p className="text-gray-600">Configure and manage custom fields for your account</p>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D] transition-all"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D] transition-all"
          >
            <option value="All">All Categories</option>
            <option value="Cart">Cart Settings</option>
            <option value="Order">Order Settings</option>
            <option value="System">System Settings</option>
          </select>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredFields.map(field => (
            <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#4B449D] bg-opacity-10 text-[#4B449D]">
                        {field.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{field.description}</p>
                  </div>
                  <button className="ml-4 text-[#4B449D] hover:text-opacity-70 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center mt-2 mb-2">
                    <input
                      type="checkbox"
                      checked={field.used}
                      onChange={() => {
                        const updatedFields = fields.map(f =>
                          f.id === field.id ? { ...f, used: !f.used } : f
                        );
                        setFields(updatedFields);
                      }}
                      className='checkbox'
                      style={{
                        '--chkbg': field.used ? '#4B449D' : 'white',
                        '--chkfg': 'white'
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable</span>
                  </label>

                  {field.used && (
                    <div className="flex-1">
                      {field.name === 'Hide_Customer_PO' ? (
                        <select
                          value={field.value}
                          onChange={(e) => {
                            const updatedFields = fields.map(f =>
                              f.id === field.id ? { ...f, value: e.target.value } : f
                            );
                            setFields(updatedFields);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D] transition-all"
                        >
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => {
                            const updatedFields = fields.map(f =>
                              f.id === field.id ? { ...f, value: e.target.value } : f
                            );
                            setFields(updatedFields);
                          }}
                          placeholder="Enter value..."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D] transition-all"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountCustomField;

// import React, { useState } from 'react';

// const AccountCustomField = () => {
//   const [category, setCategory] = useState('All');
//   const [fields, setFields] = useState([
//     {
//       id: 1,
//       name: 'Empty_Cart_Message',
//       description: 'If specified, overrides default empty cart message',
//       used: false,
//       value: '',
//     },
//     {
//       id: 2,
//       name: 'Order_Confirmation_Message',
//       description: 'If specified, overrides default order confirmation message',
//       used: false,
//       value: '',
//     },
//     {
//       id: 3,
//       name: 'Order_Confirmation_Hide_Header',
//       description: 'If included and true, the Header section on the order confirmation page will be hidden',
//       used: false,
//       value: '',
//     },
//     {
//       id: 4,
//       name: 'Order_Confirmation_Hide_Details',
//       description: 'If included and true, the Detail area on the order confirmation page will be hidden',
//       used: false,
//       value: '',
//     },
//     {
//       id: 5,
//       name: 'Hide_Customer_PO',
//       description: 'If included and set to \'true\', the customer po number prompt will not display on the checkout screen',
//       used: true,
//       value: 'True',
//     },
//     {
//       id: 6,
//       name: 'Fiscal_Year_Start_Month',
//       description: 'If included, default fiscal year start month of 1 is overridden',
//       used: false,
//       value: '',
//     },
//     {
//       id: 7,
//       name: 'Hide_Entered_by_field',
//       description: 'if included, hides entered_by_field',
//       used: false,
//       value: '',
//     },
//     {
//       id: 8,
//       name: 'Hide_Contact_Us_Link',
//       description: 'if included, hides contact us on all pages',
//       used: false,
//       value: '',
//     },
//     {
//       id: 9,
//       name: 'Service_Provider',
//       description: 'if included, tells which service provider is associated with account',
//       used: false,
//       value: '',
//     },
//   ]);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-semibold text-[#4B449D] mb-6">
//         Account Custom Field Maintenance
//       </h1>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Custom Field Category:
//         </label>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D] transition-all"
//         >
//           <option value="All">All</option>
//           <option value="Order">Order</option>
//           <option value="Cart">Cart</option>
//           <option value="System">System</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="bg-[#4B449D] text-white">
//               <th className="px-4 py-3 text-left">Custom Field</th>
//               <th className="px-4 py-3 text-center w-24">Used</th>
//               <th className="px-4 py-3 text-left">Value</th>
//               <th className="px-4 py-3 text-center w-24">Option</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fields.map((field, index) => (
//               <tr key={field.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
//                 <td className="px-4 py-3">
//                   <div className="font-medium text-gray-900">{field.name}</div>
//                   <div className="text-gray-500 text-sm mt-1">{field.description}</div>
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <input
//                     type="checkbox"
//                     checked={field.used}
//                     onChange={() => {
//                       const updatedFields = [...fields];
//                       updatedFields[index].used = !field.used;
//                       setFields(updatedFields);
//                     }}
//                     className="w-4 h-4 text-[#4B449D] border-gray-300 rounded focus:ring-[#4B449D]"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   {field.name === 'Hide_Customer_PO' ? (
//                     <select
//                       value={field.value}
//                       onChange={(e) => {
//                         const updatedFields = [...fields];
//                         updatedFields[index].value = e.target.value;
//                         setFields(updatedFields);
//                       }}
//                       className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D]"
//                     >
//                       <option value="True">True</option>
//                       <option value="False">False</option>
//                     </select>
//                   ) : (
//                     <input
//                       type="text"
//                       value={field.value}
//                       onChange={(e) => {
//                         const updatedFields = [...fields];
//                         updatedFields[index].value = e.target.value;
//                         setFields(updatedFields);
//                       }}
//                       className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4B449D] focus:border-[#4B449D] w-full"
//                     />
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <button className="text-[#4B449D] hover:text-[#6055b5] font-medium transition-colors">
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// export default AccountCustomField;
