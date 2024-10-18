import React, { useState, useEffect } from 'react';
import { getAccountConfig, EDITABLE_FIELDS } from '../form-configs/accountConfig';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio
} from '@mui/material';

const AccountMaintenance = ({ selectedAccount, accounts, onSave }) => {
  const [accountDetails, setAccountDetails] = useState({});
  const [originalDetails, setOriginalDetails] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const sections = [
    {
      name: 'Account Information',
      fields: ['eclipseId', 'eclipseUsername', 'eclipsePassword', 'account', 'accountPrefix', 'contactName', 'contactTelephone', 'formalCompanyName']
    },
    {
      name: 'Address',
      fields: ['addressLine1', 'addressLine2', 'city', 'stateRegion', 'zipCode', 'country', 'contactFax', 'contactEmail']
    },
    {
      name: 'Order Settings',
      fields: ['wholeOrderMultiplier', 'defaultShippingMethod', 'serviceProvider', 'eclipseOrderServiceFee', 'orderConfirmationEmails', 'startingOrderStatus', 'customerPONumber', 'includeOrderPDFWithConfirmation', 'accountOrdersThroughSRMS', 'accountIsActive', 'hideAccount', 'poMustBeEntered', 'addLampGuideOrderInfo', 'oneInvoicePerOrder', 'shoppingCartCompanyPrompt', 'maxEachesBeforeForcingBidStatus', 'maxCasesBeforeForcingBidStatus', 'accountUsesSingleBilling', 'useNewProductGridSystem', 'accountNotes', 'accountSpecialShippingInstructions']
    },
    {
      name: 'Branch Details',
      fields: ['branchId', 'branchAccountName', 'branchEclipseId', 'branchUsername', 'branchPassword']
    },
    {
      name: 'Default Store User Settings',
      fields: ['userCanEnterOrders', 'userCanApproveOrders', 'enableMyAccountMenu', 'enableMessagesMenu', 'canSendMessages', 'enableReportsMenu', 'serviceProviderLogin', 'enableProductsMenu', 'enableMyCartMenu', 'enableTrackingMenu', 'enableInstructionsMenu']
    },
    {
      name: 'Budgeting Information',
      fields: ['accountUsesBudgets', 'includeShippingInLimits', 'includeTaxInLimits', 'displayBudgetInfoInHeader', 'displaySpendInfoInHeader', 'sendConfirmationToOrderApprover', 'overBudgetUsernames', 'accountSpecificOverBudgetMessage']
    },
    {
      name: 'Additional Settings',
      fields: ['accountLampGuidePageHeaderText']
    }
  ];

  const accountMaintanceOptions = [
    'Start A New Account',
    'Load/Update Account From Eclipse',
    'Calendar',
    'Budgets',
    'Send All Store Guides to SnapCount'
  ];

  useEffect(() => {
    const account = accounts.find(acc => acc.account === selectedAccount);
    if (account) {
      const editableDetails = EDITABLE_FIELDS.reduce((acc, field) => {
        if (field in account) {
          acc[field] = account[field];
        }
        return acc;
      }, {});
      setAccountDetails(editableDetails);
      setOriginalDetails(editableDetails);
      setHasChanges(false);
      setCurrentSection(0);
    }
  }, [selectedAccount, accounts]);

  // Function to check if the details have changed compared to the original
  const checkForChanges = (newDetails) => {
    return JSON.stringify(newDetails) !== JSON.stringify(originalDetails);
  };

  const handleSave = () => {
    const updatedDetails = Object.keys(accountDetails).reduce((acc, key) => {
      const config = getAccountConfig(key);
      if (!config.readOnly) {
        acc[key] = accountDetails[key];
      }
      return acc;
    }, {});
    onSave(updatedDetails);
    setHasChanges(false);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setAccountDetails(originalDetails);
    setHasChanges(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newDetails = {
      ...accountDetails,
      [name]: type === 'checkbox' ? checked : value
    };
    setAccountDetails(newDetails);
    setHasChanges(checkForChanges(newDetails)); // Check for changes here
  };

  const renderField = (fieldName) => {
    const config = getAccountConfig(fieldName);
    const value = accountDetails[fieldName] || '';
    const isReadOnly = config.readOnly || false;

    switch (config.type) {
      case 'select':
        return (
          <div className="form-control w-full mb-4" key={fieldName}>
            <label className="label">
              <span className="label-text font-semibold">{config.label}</span>
            </label>
            <select
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="select select-bordered w-full disabled:opacity-50"
            >
              {config.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-control flex flex-row items-center space-x-2 mb-4" key={fieldName}>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                name={fieldName}
                checked={value}
                onChange={handleInputChange}
                disabled={isReadOnly}
                className="checkbox"
                style={{
                  '--chkbg': value ? '#4B449D' : 'white',
                  '--chkfg': 'white'
                }}
              />
              <span className="label-text font-semibold ml-2">{config.label}</span>
            </label>
          </div>
        );

      case 'textarea':
        return (
          <div className="form-control w-full mb-4" key={fieldName}>
            <label className="label">
              <span className="label-text font-semibold">{config.label}</span>
            </label>
            <textarea
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="textarea textarea-bordered h-24 disabled:opacity-50"
            />
          </div>
        );
      case 'number':
      case 'text':
      default:
        return (
          <div className="form-control w-full mb-4" key={fieldName}>
            <label className="label">
              <span className="label-text font-semibold">{config.label}</span>
            </label>
            <input
              type="text"
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="input input-bordered w-full disabled:opacity-50"
            />
          </div>
        );
    }
  };


  //MUI inputs

  // const renderField = (fieldName) => {
  //   const config = getAccountConfig(fieldName);
  //   const value = accountDetails[fieldName] || '';
  //   const isReadOnly = config.readOnly || false;

  //   const commonProps = {
  //     key: fieldName,
  //     label: config.label,
  //     name: fieldName,
  //     value: value,
  //     onChange: handleInputChange,
  //     fullWidth: true,
  //     disabled: isReadOnly,
  //     InputProps: {
  //       readOnly: isReadOnly,
  //     },
  //   };

  //   switch (config.type) {
  //     case 'select':
  //       return (
  //         <FormControl fullWidth key={fieldName} disabled={isReadOnly}>
  //           <InputLabel>{config.label}</InputLabel>
  //           <Select
  //             {...commonProps}
  //           >
  //             {config.options.map(option => (
  //               <MenuItem key={option} value={option}>{option}</MenuItem>
  //             ))}
  //           </Select>
  //         </FormControl>
  //       );

  //     case 'checkbox':
  //       return (
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               checked={Boolean(value)}
  //               {...commonProps}
  //             />
  //           }
  //           label={config.label}
  //         />
  //       );

  //     case 'radio':
  //       return (
  //         <FormControl component="fieldset" key={fieldName}>
  //           <Typography variant="subtitle1">{config.label}</Typography>
  //           <RadioGroup {...commonProps}>
  //             {config.options.map(option => (
  //               <FormControlLabel
  //                 key={option}
  //                 value={option}
  //                 control={<Radio />}
  //                 label={option}
  //               />
  //             ))}
  //           </RadioGroup>
  //         </FormControl>
  //       );

  //     case 'textarea':
  //       return (
  //         <TextField
  //           {...commonProps}
  //           multiline
  //           rows={4}
  //         />
  //       );
  //     case 'number':
  //     case 'text':
  //     default:
  //       return (
  //         <TextField
  //           {...commonProps}
  //           type={config.type}
  //         />
  //       );
  //   }
  // };

  return (
    <div className='mt-8'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: '#4B449D' }}>
          Account Maintenance: {selectedAccount}
        </h2>
        <div className="flex space-x-2">
          {accountMaintanceOptions.map((option, index) => (
            <button
              key={index}
              className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px]'
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex bg-gray-100 bg-white shadow-md p-6 rounded-lg">
        <ul className="w-1/5 mr-10">
          {sections.map((section, index) => (
            <li
              key={section.name}
              className={`cursor-pointer rounded-md p-2 mb-2 ${index === currentSection ? 'bg-[#4B449D] text-white' : 'hover:bg-gray-200'}`}
              onClick={() => setCurrentSection(index)}
            >
              {section.name}
            </li>
          ))}
        </ul>

        <div className="w-4/5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sections[currentSection].fields.map(fieldName =>
              accountDetails.hasOwnProperty(fieldName) ? renderField(fieldName) : null
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              className='btn btn-sm hover:bg-[#4B449D] hover:border-[#4B449D] hover:outline-none hover:text-white text-[#4B449D] h-[40px] w-[100px]'
              onClick={handleCancel}
              disabled={!hasChanges}
            >
              Cancel
            </button>
            <button
              className='btn btn-sm bg-[#4B449D] text-white hover:bg-[#7873B5] outline-none border-none h-[40px] w-[100px]'
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success">
                Saved successfully!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMaintenance;