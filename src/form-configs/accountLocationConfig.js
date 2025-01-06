export const locationConfig = {
  // Location Mnemonic Settings
  locationIsActive: {
    label: 'Location is Active',
    type: 'checkbox'
  },
  locationName: {
    label: 'Location Name',
    type: 'text'
  },
  locationDescription: {
    label: 'Location Description',
    type: 'textarea'
  },
  locationHeaderBackgroundColor: {
    label: 'Location Header Background Color',
    type: 'select',
    options: ['Unspecified', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'White', 'Gray', 'Cyan', 'Magenta', 'Teal', 'Brown', 'Pink', 'Indigo', 'Gold', 'Silver']
  },

  // Account Locations
  accountLocations: {
    label: 'Current Defined Locations for Account with Description and Display Order in Parentheses',
    type: 'list'
  },

  // Account Location Products
  productsLocatedAtSelectedLocation: {
    label: 'Products Located at Selected Location',
    type: 'list'
  }
};

export const EDITABLE_FIELDS_LOCATIONS = ['accountLocations', 'productsLocatedAtSelectedLocation'];

export const getLocationConfig = (fieldName) =>
  locationConfig[fieldName] || {
    label: fieldName,
    type: 'text'
  };
