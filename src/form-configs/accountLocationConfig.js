export const locationConfig = {
  // Location Mnemonic Settings
  locationIsActive: { label: 'Location is Active', type: 'checkbox' },
  locationName: { label: 'Location Name', type: 'text' },
  locationDescription: { label: 'Location Description', type: 'textarea' },
  locationHeaderBackgroundColor: { label: 'Location Header Background Color', type: 'select', options: ['Unspecified', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'White', 'Gray', 'Cyan', 'Magenta', 'Teal', 'Brown', 'Pink', 'Indigo', 'Gold', 'Silver'] },

  // Display Options
  displayActiveLocationOnly: { label: 'Display Active Locations Only', type: 'checkbox' },

  // Product Details
  accountLocations: { label: 'Current Defined Locations for Account with Description and Display Order in Parentheses', type: 'list' },
  productsLocatedAtSelectedLocation: { label: 'Products Located at Selected Location', type: 'textarea' },
  moveProductsToLocation: { label: 'To Location', type: 'list' },
  deactivateFromLocationToLocation: { label: "De-activate 'from' Location After Product is Moved to the 'to' Location", type: 'checkbox' },

  // Dropdown Field
  fieldToSelect: { label: 'Field to Select', type: 'select', options: ['Option 1', 'Option 2', 'Option 3', 'N/A'] },

  // Change Log
  reasonForChange: { label: 'Reason for Change', type: 'textarea' }
};

export const EDITABLE_FIELDS_LOCATIONS = Object.keys(locationConfig);

export const getLocationConfig = (fieldName) => locationConfig[fieldName] || { label: fieldName, type: 'text' };
