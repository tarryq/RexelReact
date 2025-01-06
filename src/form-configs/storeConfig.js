export const storeMaintainanceConfig = {
 storeName: { label: 'Store Name', type: 'text', readOnly: false },
 storeNumber: { label: 'Store Number', type: 'text', readOnly: false },
 shipToEclipseID: { label: 'Eclipse ID', type: 'text', readOnly: false },
 address1: { label: 'Address Line 1', type: 'text', readOnly: false },
 address2: { label: 'Address Line 2', type: 'text', readOnly: false },
 city: { label: 'City', type: 'text', readOnly: false },
 region: { label: 'State/Region', type: 'text', readOnly: false },
 zipCode: { label: 'Postal Code', type: 'text', readOnly: false },
 country: { label: 'Country', type: 'text', readOnly: false },
 telephone: { label: 'Store Telephone', type: 'text', readOnly: false },
 fax: { label: 'Store Fax', type: 'text', readOnly: false },
 eMail: { label: 'Store E-Mail', type: 'text', readOnly: false },
 storeContactName: { label: 'Store Contact', type: 'text', readOnly: false },
 dateStoreBuilt: { label: 'Store Build Date', type: 'text', readOnly: false },
 originalBuildoutTicket: { label: 'Store Buildout Ticket Number', type: 'text', readOnly: false },
 associatedProfileDisplay: { label: 'Associated Profile', type: 'text', readOnly: true },
 serviceProviderStoreId: { label: 'Service Provider Store ID', type: 'text', readOnly: false },
 hideStoreFromAllButSuperUsers: { label: 'Hide Store From All Users', type: 'checkbox', readOnly: false },
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
