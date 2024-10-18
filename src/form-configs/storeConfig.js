export const storeMaintainanceConfig = {
 storeName: { label: 'Store Name', type: 'text', readOnly: false },
 storeNumber: { label: 'Store Number', type: 'text', readOnly: false },
 eclipseId: { label: 'Eclipse ID', type: 'text', readOnly: false },
 addressLine1: { label: 'Address Line 1', type: 'text', readOnly: false },
 addressLine2: { label: 'Address Line 2', type: 'text', readOnly: false },
 city: { label: 'City', type: 'text', readOnly: false },
 stateRegion: { label: 'State/Region', type: 'text', readOnly: false },
 postalCode: { label: 'Postal Code', type: 'text', readOnly: false },
 country: { label: 'Country', type: 'text', readOnly: false },
 storeContact: { label: 'Store Contact', type: 'text', readOnly: false },
 storeBuildDate: { label: 'Store Build Date', type: 'text', readOnly: false },
 storeTelephone: { label: 'Store Telephone', type: 'text', readOnly: false },
 storeBuildoutTicketNumber: { label: 'Store Buildout Ticket Number', type: 'text', readOnly: false },
 storeFax: { label: 'Store Fax', type: 'text', readOnly: false },
 associatedProfile: { label: 'Associated Profile', type: 'text', readOnly: true },
 storeEmail: { label: 'Store E-Mail', type: 'text', readOnly: false },
 serviceProviderStoreId: { label: 'Service Provider Store ID', type: 'text', readOnly: false },
 hideStoreFromAllUsers: { label: 'Hide Store From All Users', type: 'checkbox', readOnly: false },
 eclipseStoreReleaseId: { label: 'Eclipse Store Release ID', type: 'text', readOnly: false },
 onlyBidOrdersCanBePlaced: { label: 'Only Bid Orders Can Be Placed', type: 'checkbox', readOnly: false },
 shipToAddressRequired: { label: 'Ship To Address Required', type: 'checkbox', readOnly: false },
 isStoreActive: { label: 'Check if the Store is Active', type: 'checkbox', readOnly: false },
 fmsBillTo: { label: 'FMS Bill-to', type: 'text', readOnly: false },
 fmsShipTo: { label: 'FMS Ship-to', type: 'text', readOnly: false },
 fmsType: { label: 'FMS Type', type: 'select', options: ['CLM'], readOnly: false }
};


export const storeFields = Object.keys(storeMaintainanceConfig);

export const getStoreMaintenanceConfig = (fieldName) => storeMaintainanceConfig[fieldName] || { label: fieldName, type: 'text' };
