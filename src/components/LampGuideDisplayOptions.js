import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductColumns } from '../store/features/products/productActions';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Select, MenuItem } from '@mui/material';

const LampGuideGrid = ({ selectedStore }) => {
  const dispatch = useDispatch();
  const { productColumns, productLoading } = useSelector((state) => state.products);
  console.log('Product Columns:', productColumns);

  const [columns, setColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [colors, setColors] = useState([]);
  const [sortingOptions, setSortingOptions] = useState({
    sortByVendorPartNumber: true,
    sortByProductCategory: false,
    sortByProductSubCategory: false,
    sortBySequenceNumber: false,
    createPrintedHeaders: false,
    createOnScreenHeaders: false
  });
  const [user, setUser] = useState(null);

  const startEditing = (columnId) => {
    setEditingId(columnId);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveColumnEdit = (index) => {
    setEditingId(null);
  };


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);
  const userId = user?.userId;
  const accountId = selectedStore?.accountID;
  const storeId = selectedStore?.id;

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser?.userId) {
          const response = await fetch(`https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/GetColors?langId=1&userid=${loggedInUser.userId}`);
          const data = await response.json();
          setColors(data);
        }
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    if (userId && accountId) {
      dispatch(fetchProductColumns({ userid: userId, accountid: accountId }));
    }
  }, [dispatch, userId, storeId, accountId]);

  useEffect(() => {
    if (productColumns && productColumns.length > 0) {
      const apiColumns = productColumns
        .filter((col) => col.columnName !== 'N/A')
        .map((col) => ({
          id: col.id,
          columnName: col.columnName,
          displayName: col.accountColumnName || col.gridDisplayLabel,
          width: col.accountColumnWidth,
          orderId: col.orderID,
          alignment: col.cellAlignment === 'C' ? 'center' : col.cellAlignment === 'L' ? 'left' : 'right',
          textColor: col.colorHexCode,
          hideOnPDF: col.doNotDisplayDataOnPDF
        }));
      setAvailableColumns(apiColumns);
    }
  }, [productColumns]);

  const addColumnFromAvailable = (columnData) => {
    setColumns([
      ...columns,
      {
        id: columnData.id,
        accountLabel: columnData.displayName,
        columnName: columnData.columnName,
        width: columnData.width,
        orderId: columnData.orderId,
        hideOnPDF: columnData.hideOnPDF,
        textColor: columnData.textColor,
        alignment: columnData.alignment
      }
    ]);
    setAvailableColumns(availableColumns.filter((col) => col.id !== columnData.id));
  };

  const removeColumn = (index) => {
    const removedColumn = columns[index];
    if (removedColumn) {
      const originalColumn = productColumns.find((col) => col.id === removedColumn.id);
      if (originalColumn) {
        setAvailableColumns([
          ...availableColumns,
          {
            id: originalColumn.id,
            columnName: originalColumn.columnName,
            displayName: originalColumn.accountColumnName || originalColumn.gridDisplayLabel,
            width: originalColumn.accountColumnWidth,
            orderId: originalColumn.orderID,
            alignment: originalColumn.cellAlignment === 'C' ? 'center' : originalColumn.cellAlignment === 'L' ? 'left' : 'right',
            textColor: originalColumn.colorHexCode,
            hideOnPDF: originalColumn.doNotDisplayDataOnPDF
          }
        ]);
      }
    }
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index, key, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][key] = value;
    setColumns(updatedColumns);
  };

  const saveGridChanges = () => {
    alert('Grid changes saved!');
  };

  const saveSortingOptions = () => {
    alert('Sorting and break options saved!');
  };

  const updateSortingOptions = (key, value) => {
    setSortingOptions({ ...sortingOptions, [key]: value });
  };

  const renderColorDropdown = (column, index) => (
    console.log('Column:', column),
    <Select
      value={column.colorID || 0}
      onChange={(e) => {
        updateColumn(index, 'colorID', e.target.value);
        const selectedColor = colors.find(c => c.id === e.target.value);
        updateColumn(index, 'textColor', selectedColor?.name || '-Unspecified-');
      }}
      className="w-full"
      size="small"
    >
      {colors.map((color) => (
        <MenuItem
          key={color.id}
          value={color.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: color.hexCode,
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <span>{color.name}</span>
        </MenuItem>
      ))}
    </Select>
  );

  const renderEditableCell = (column, index, field, type = 'text') => {
    const isEditing = editingId === column.id;

    if (type === 'color') {
      if (isEditing) {
        return renderColorDropdown(column, index);
      }
      const selectedColor = colors.find(c => c.id === column.colorID);
      return (
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: selectedColor?.hexCode || '#FFFFFF',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <span>{column.textColor}</span>
        </div>
      );
    }

    if (type === 'checkbox') {
      return (
        <div className="flex justify-center items-center">
          {isEditing ? (
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer accent-[#4B449D]"
              checked={column[field]}
              onChange={(e) => updateColumn(index, field, e.target.checked)}
            />
          ) : (
            <div className="flex items-center justify-center text-[#4B449D]">
              {column[field] ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </div>
          )}
        </div>
      );
    }

    if (!isEditing) {
      return <span>{column[field]}</span>;
    }

    switch (type) {
      case 'number':
        return (
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={column[field]}
            onChange={(e) => updateColumn(index, field, e.target.value)}
          />
        );
      case 'select':
        return (
          <select
            className="w-full border rounded px-2 py-1"
            value={column[field]}
            onChange={(e) => updateColumn(index, field, e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        );
      default:
        return (
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={column[field]}
            onChange={(e) => updateColumn(index, field, e.target.value)}
          />
        );
    }
  };

  if (productLoading) {
    return <div className='p-6 text-center'>Loading columns...</div>;
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-8xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-[#4B449D]'>Lamp Guide Grid</h1>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Available Columns */}
          <div className='lg:w-1/3'>
            <h2 className='text-xl font-semibold mb-4 text-[#4B449D]'>Available Columns</h2>
            <ul className='border border-[#4B449D] rounded-lg bg-white shadow-md p-4 max-h-80 overflow-y-auto'>
              {availableColumns.map((column) => (
                <li key={column.id} className='flex justify-between items-center py-2 px-3 mb-2 bg-[#F6F5FF] rounded-lg hover:bg-[#E4E2FF]'>
                  <span className='text-gray-700'>{column.displayName}</span>
                  <button className='bg-[#4B449D] text-white px-3 py-1 rounded hover:bg-[#3C387C]' onClick={() => addColumnFromAvailable(column)}>
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Grid Configuration */}
          <div className='lg:w-2/3'>
            <h2 className='text-xl font-semibold mb-4 text-[#4B449D]'>Columns In Use</h2>
            <div className='overflow-auto max-h-[400px]'>
              <table className='min-w-full table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-lg'>
                <thead className='bg-[#4B449D] text-white'>
                  <tr>
                    <th className='border px-4 py-2'>Column</th>
                    <th className='border px-4 py-2'>Account Label</th>
                    <th className='border px-4 py-2'>Width (%)</th>
                    <th className='border px-4 py-2'>Order ID</th>
                    <th className='border px-4 py-2'>Hide on PDF</th>
                    <th className='border px-4 py-2'>Text Color</th>
                    <th className='border px-4 py-2'>Alignment</th>
                    <th className='border px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((column, index) => (
                    <tr key={column.id} className='hover:bg-[#F6F5FF]'>
                      <td className='border px-4 py-2'>{column.columnName}</td>

                      <td className="border px-4 py-2">
                        {renderEditableCell(column, index, 'accountLabel')}
                      </td>
                      <td className="border px-4 py-2">
                        {renderEditableCell(column, index, 'width', 'number')}
                      </td>
                      <td className="border px-4 py-2">
                        {renderEditableCell(column, index, 'orderId', 'number')}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {renderEditableCell(column, index, 'hideOnPDF', 'checkbox')}
                      </td>
                      <td className="border px-4 py-2">
                        {renderEditableCell(column, index, 'textColor', 'color')}
                      </td>
                      <td className="border px-4 py-2">
                        {renderEditableCell(column, index, 'alignment', 'select')}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center gap-2">
                          {editingId === column.id ? (
                            <>
                              <button
                                onClick={() => saveColumnEdit(index)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckIcon />
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="text-red-600 hover:text-red-800"
                              >
                                <CloseIcon />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditing(column.id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <EditIcon />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 ml-2"
                                onClick={() => removeColumn(index)}
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-end mt-4'>
              <button className='btn ml-4 bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#3C387C]' onClick={saveGridChanges}>
                Save Grid Changes
              </button>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4 text-[#4B449D]'>Lamp Guide Sorting & Break Options</h2>
          <div className='bg-white shadow-md rounded-lg p-6 border border-gray-300'>
            {/* Sorting Options */}
            <div>
              <h3 className='text-lg font-semibold mb-2 text-[#4B449D]'>Sorting Options</h3>
              <div className='flex flex-col gap-4'>
                {Object.entries(sortingOptions)
                  .slice(0, 4)
                  .map(([key, value]) => (
                    <label key={key} className='flex items-center'>
                      <input type='checkbox' className='mr-2 checkbox' checked={value} onChange={(e) => updateSortingOptions(key, e.target.checked)} style={{ '--chkbg': sortingOptions[key] ? '#4B449D' : 'white', '--chkfg': 'white', backgroundColor: sortingOptions[key] ? '#4B449D' : 'white', color: 'white' }} />
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </label>
                  ))}
              </div>
            </div>

            {/* Break Options */}
            <div className='mt-6'>
              <h3 className='text-lg font-semibold mb-2 text-[#4B449D]'>Break Options</h3>
              <div className='flex flex-col gap-4'>
                {Object.entries(sortingOptions)
                  .slice(4)
                  .map(([key, value]) => (
                    <label key={key} className='flex items-center'>
                      <input type='checkbox' className='mr-2 checkbox' checked={value} onChange={(e) => updateSortingOptions(key, e.target.checked)}
                        style={{ '--chkbg': sortingOptions[key] ? '#4B449D' : 'white', '--chkfg': 'white', backgroundColor: sortingOptions[key] ? '#4B449D' : 'white', color: 'white' }}
                      />
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </label>
                  ))}
              </div>
            </div>

            <button className='btn mt-6 bg-[#4B449D] text-white px-6 py-2 rounded hover:bg-[#38327D]' onClick={saveSortingOptions}>
              Save Sort and Break Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampGuideGrid;
