import React, { useState } from "react";

const LampGuideGrid = () => {
  const [availableColumns, setAvailableColumns] = useState([
    "Ballast Text",
    "Blank Column",
    "Case Price",
    "Extended Price",
    "Fixture Description",
    "Life Expectancy (Months)",
    "Location In Store",
    "Max Order Qty",
    "Price",
  ]);
  const [columns, setColumns] = useState([]);
  const [sortingOptions, setSortingOptions] = useState({
    sortByVendorPartNumber: true,
    sortByProductCategory: false,
    sortByProductSubCategory: false,
    sortBySequenceNumber: false,
    createPrintedHeaders: false,
    createOnScreenHeaders: false,
  });

  const addColumnFromAvailable = (column) => {
    setColumns([
      ...columns,
      {
        accountLabel: column,
        width: "",
        orderId: "",
        hideOnPDF: false,
        textColor: "#000000",
        alignment: "center",
      },
    ]);
    setAvailableColumns(availableColumns.filter((col) => col !== column));
  };

  const addColumnManually = () => {
    setColumns([
      ...columns,
      {
        accountLabel: "",
        width: "",
        orderId: "",
        hideOnPDF: false,
        textColor: "#000000",
        alignment: "center",
      },
    ]);
  };

  const removeColumn = (index) => {
    const removedColumn = columns[index].accountLabel;
    if (removedColumn && !availableColumns.includes(removedColumn)) {
      setAvailableColumns([...availableColumns, removedColumn]);
    }
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index, key, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][key] = value;
    setColumns(updatedColumns);
  };

  const saveGridChanges = () => {
    alert("Grid changes saved!");
  };

  const saveSortingOptions = () => {
    alert("Sorting and break options saved!");
  };

  const updateSortingOptions = (key, value) => {
    setSortingOptions({ ...sortingOptions, [key]: value });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#4B449D]">Lamp Guide Grid</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Available Columns */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-[#4B449D]">
              Available Columns
            </h2>
            <ul className="border border-[#4B449D] rounded-lg bg-white shadow-md p-4 max-h-80 overflow-y-auto">
              {availableColumns.map((column, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 px-3 mb-2 bg-[#F6F5FF] rounded-lg hover:bg-[#E4E2FF]"
                >
                  <span className="text-gray-700">{column}</span>
                  <button
                    className="bg-[#4B449D] text-white px-3 py-1 rounded hover:bg-[#3C387C]"
                    onClick={() => addColumnFromAvailable(column)}
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Grid Configuration */}
          <div className="lg:w-2/3">
            <h2 className="text-xl font-semibold mb-4 text-[#4B449D]">
              Columns In Use
            </h2>
            <div className="overflow-auto max-h-[400px]">
              <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
                <thead className="bg-[#4B449D] text-white">
                  <tr>
                    <th className="border px-4 py-2">Column</th> {/* Added this column */}
                    <th className="border px-4 py-2">Account Label</th>
                    <th className="border px-4 py-2">Width (%)</th>
                    <th className="border px-4 py-2">Order ID</th>
                    <th className="border px-4 py-2">Hide on PDF</th>
                    <th className="border px-4 py-2">Text Color</th>
                    <th className="border px-4 py-2">Alignment</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((column, index) => (
                    <tr key={index} className="hover:bg-[#F6F5FF]">
                      <td className="border px-4 py-2">{column.accountLabel || "Custom Column"}</td> {/* New column */}
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          className="w-full border rounded px-2 py-1"
                          placeholder="Enter Account Label"
                          value={column.accountLabel}
                          onChange={(e) =>
                            updateColumn(index, "accountLabel", e.target.value)
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          placeholder="Width (%)"
                          min="0"
                          max="100"
                          value={column.width}
                          onChange={(e) =>
                            updateColumn(index, "width", e.target.value)
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          placeholder="Order ID"
                          min="1"
                          value={column.orderId}
                          onChange={(e) =>
                            updateColumn(index, "orderId", e.target.value)
                          }
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={column.hideOnPDF}
                          onChange={(e) =>
                            updateColumn(index, "hideOnPDF", e.target.checked)
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="color"
                          className="w-full border rounded"
                          value={column.textColor}
                          onChange={(e) =>
                            updateColumn(index, "textColor", e.target.value)
                          }
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <select
                          className="w-full border rounded px-2 py-1"
                          value={column.alignment}
                          onChange={(e) =>
                            updateColumn(index, "alignment", e.target.value)
                          }
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => removeColumn(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="btn bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#3C387C]"
                onClick={addColumnManually}
              >
                Add New Column
              </button>
              <button
                className="btn ml-4 bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#3C387C]"
                onClick={saveGridChanges}
              >
                Save Grid Changes
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-[#4B449D]">
            Lamp Guide Sorting & Break Options
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
            {/* Sorting Options */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#4B449D]">
                Sorting Options
              </h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2  checkbox"
                    checked={sortingOptions.sortByVendorPartNumber}
                    onChange={(e) =>
                      updateSortingOptions("sortByVendorPartNumber", e.target.checked)
                    }
                    style={{
                      '--chkbg': sortingOptions.sortByVendorPartNumber ? '#4B449D' : 'white',
                      '--chkfg': 'white'
                    }}
                  />
                  Sort By Vendor Part Number
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 checkbox"
                    checked={sortingOptions.sortByProductCategory}
                    onChange={(e) =>
                      updateSortingOptions("sortByProductCategory", e.target.checked)
                    }
                    style={{
                      '--chkbg': sortingOptions.sortByProductCategory ? '#4B449D' : 'white',
                      '--chkfg': 'white'
                    }}
                  />
                  Sort By Product Category
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 checkbox"
                    checked={sortingOptions.sortByProductSubCategory}
                    onChange={(e) =>
                      updateSortingOptions("sortByProductSubCategory", e.target.checked)
                    }
                    style={{
                      '--chkbg': sortingOptions.sortByProductSubCategory ? '#4B449D' : 'white',
                      '--chkfg': 'white'
                    }}
                  />
                  Sort By Product Subcategory
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 checkbox"
                    checked={sortingOptions.sortBySequenceNumber}
                    onChange={(e) =>
                      updateSortingOptions("sortBySequenceNumber", e.target.checked)
                    }
                    style={{
                      '--chkbg': sortingOptions.sortBySequenceNumber ? '#4B449D' : 'white',
                      '--chkfg': 'white'
                    }}
                  />
                  Sort By Sequence Number
                </label>
              </div>
            </div>

            {/* Break Options */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-[#4B449D]">Break Options</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 checkbox"
                    checked={sortingOptions.createPrintedHeaders}
                    onChange={(e) =>
                      updateSortingOptions("createPrintedHeaders", e.target.checked)
                    }
                    style={{
                      '--chkbg': sortingOptions.createPrintedHeaders ? '#4B449D' : 'white',
                      '--chkfg': 'white'
                    }}
                  />
                  Create PRINTED lamp guide section header
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 checkbox"
                    checked={sortingOptions.createOnScreenHeaders}
                    onChange={(e) =>
                      updateSortingOptions("createOnScreenHeaders", e.target.checked)
                    }
                    style={{
                      '--chkbg': sortingOptions.createOnScreenHeaders ? '#4B449D' : 'white',
                      '--chkfg': 'white'
                    }}
                  />
                  Create ON SCREEN lamp guide section header
                </label>
              </div>
            </div>

            {/* Save Button */}
            <button
              className=" btn mt-6 bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#38327D]"
              onClick={saveSortingOptions}
            >
              Save Sort and Break Options
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default LampGuideGrid;
