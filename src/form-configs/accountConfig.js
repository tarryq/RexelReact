// accountFieldConfig.js

export const accountConfig = {
 
 eclipseId: { label: 'Eclipse ID', type: 'text', readOnly: true },
 eclipseUsername: { label: 'Eclipse Username', type: 'text', readOnly: true },
 eclipsePassword: { label: 'Eclipse Password', type: 'password' },
 account: { label: 'Account Name', type: 'text', readOnly: true },
 addressLine1: { label: 'Address Line 1', type: 'text' },
 addressLine2: { label: 'Address Line 2', type: 'text' },
 city: { label: 'City', type: 'text' },
 stateRegion: { label: 'State/Region', type: 'text' },
 zipCode: { label: 'Zip Code', type: 'text' },
 country: { label: 'Country', type: 'text' },
 contactName: { label: 'Contact Name', type: 'text' },
 contactTelephone: { label: 'Contact Telephone', type: 'text' },
 contactFax: { label: 'Contact Fax', type: 'text' },
 contactEmail: { label: 'Contact Email', type: 'text' },
 formalCompanyName: { label: 'Formal Company Name', type: 'text', readOnly: true },
 wholeOrderMultiplier: { label: 'Whole Order Multiplier', type: 'number' },
 defaultShippingMethod: {
  label: 'Default Shipping Method',
  type: 'select',
  options: ['UPS GROUND', 'FedEx', 'USPS']
 },
 serviceProvider: { label: 'Service Provider', type: 'text' },
 accountPrefix: { label: 'Account Prefix', type: 'text', readOnly: true },
 eclipseOrderServiceFee: { label: 'Eclipse Order Service Fee', type: 'number' },
 orderConfirmationEmails: { label: 'Order Confirmation Emails', type: 'text' },
};

export const EDITABLE_FIELDS = [
 'eclipseId',
 'eclipseUsername',
 'eclipsePassword',
 'account',
 'addressLine1',
 'addressLine2',
 'city',
 'stateRegion',
 'zipCode',
 'country',
 'contactName',
 'contactTelephone',
 'contactFax',
 'contactEmail',
 'formalCompanyName',
 'wholeOrderMultiplier',
 'defaultShippingMethod',
 'serviceProvider',
 'accountPrefix',
 'eclipseOrderServiceFee',
 'orderConfirmationEmails'
];

export const getAccountConfig = (fieldName) => accountConfig[fieldName] || { label: fieldName, type: 'text' };
