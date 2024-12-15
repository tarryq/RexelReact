// Define color options once
const COLOR_OPTIONS = ['Unspecified', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'White', 'Gray', 'Cyan', 'Magenta', 'Teal', 'Brown', 'Pink', 'Indigo', 'Gold', 'Silver'];

// Utility function to add a color property to fields
const withColor = (label) => ({
  label,
  type: 'textarea',
  color: { label: `${label} Color`, type: 'select', options: COLOR_OPTIONS }
});

// Account Communication Fields
export const accountCommunication = {
  // Blank Rows
  blankRowsToAdd: { label: 'Blank Rows to Add to End of Lamp Guide', type: 'text' },

  // Account Communication Fields with Colors
  accountSpecificMessage: withColor('Account Specific Message (appears above menu bar)'),
  accountSpecificHeaderText: withColor('Account Specific PDF Lamp Guide Header Text'),
  accountSpecificFooterText: withColor('Account Specific PDF Lamp Guide Page Footer Text'),
  accountSpecificNoteBottom: withColor('Account Specific PDF Lamp Guide Note to Append To BOTTOM of Lamp Guide'),
  accountMessageForShoppingCart: withColor('Account Message For Shopping Cart'),
  accountMessageForReportPage: withColor('Account Message For Report Page'),
  accountMessageForHelpPage: withColor('Account Message For Help Page'),
  accountMessageForHistoryPage: withColor('Account Message For History Page'),
  accountMessageForMaintenancePage: withColor('Account Message For Maintenance Page'),
  accountMessageForProductsPage: withColor('Account Message For Products Page'),
  accountMessageMaxQuantity: withColor('Account Message for Trying to Order More Than Specified Product Max Quantity'),
  messageIfProductCannotBeOrdered: withColor('Message to Display if Product Cannot Be Ordered at a Store'),

  // Store Messaging Fields with Colors
  storeSpecificMessage: withColor('Store Specific Message (appears above menu bar)'),
  storeSpecificHeaderText: withColor('Store Specific Lamp Guide Header Text'),
  storeSpecificFooterText: withColor('Store Specific Lamp Guide Page Footer Text'),
  storeSpecificNoteBottom: withColor('Store Specific PDF Lamp Guide Note to Append To BOTTOM of Lamp Guide'),
  storeMessageForShoppingCart: withColor('Store Message For Shopping Cart'),
  storeMessageForReportPage: withColor('Store Message For Report Page'),
  storeMessageForHelpPage: withColor('Store Message For Help Page'),
  storeMessageForHistoryPage: withColor('Store Message For History Page'),
  storeMessageForMaintenancePage: withColor('Store Message For Maintenance Page'),
  storeMessageForProductsPage: withColor('Store Message For Products Page'),

  fieldToSelect: { label: 'Field to Select', type: 'select', options: ['Option 1', 'Option 2', 'Option 3', 'N/A'] },

};

// Export editable fields
export const EDITABLE_FIELDS_LOCATIONS = Object.keys(accountCommunication);

// Utility function to fetch field configuration
export const getAccountCommunication = (fieldName) => accountCommunication[fieldName] || { label: fieldName, type: 'text' };
