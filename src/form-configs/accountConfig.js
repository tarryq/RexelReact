
export const accountConfig = {
 eclipseId: { label: 'Eclipse ID', type: 'text', readOnly: false },
 eclipseUsername: { label: 'Eclipse Username', type: 'text', readOnly: false },
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
 eclipseOrderServiceFee: { label: 'Eclipse Order Service/Handling Fee', type: 'number' },
 orderConfirmationEmails: { label: 'Order Confirmation Emails', type: 'text' },

 startingOrderStatus: {
  label: 'Starting Order Status',
  type: 'select',
  options: ['B-Bid', 'Other options...']
 },
 customerPONumber: { label: 'Customer PO Number', type: 'text' },
 includeOrderPDFWithConfirmation: { label: 'Include Order PDF With Confirmation', type: 'checkbox' },
 accountOrdersThroughSRMS: { label: 'Account Orders Through SRMS', type: 'checkbox' },
 poMustBeEntered: { label: 'PO # Must be Entered', type: 'checkbox' },
 addLampGuideOrderInfo: { label: 'Add Lamp Guide Order Info', type: 'checkbox' },
 accountIsActive: { label: 'Account is Active', type: 'checkbox' },
 hideAccount: { label: 'Hide Account', type: 'checkbox' },
 oneInvoicePerOrder: { label: 'One Invoice per Order', type: 'checkbox' },
 shoppingCartCompanyPrompt: {
  label: 'Shopping Cart Company Prompt',
  type: 'select',
  options: ['Do Not Show', 'Other options...']
 },
 maxEachesBeforeForcingBidStatus: { label: 'Max Eaches Before Forcing Bid Status', type: 'number' },
 maxCasesBeforeForcingBidStatus: { label: 'Max Cases Before Forcing Bid Status', type: 'number' },
 accountUsesSingleBilling: { label: 'Account Uses Single Billing', type: 'checkbox' },
 useNewProductGridSystem: { label: 'Use New Product Grid System', type: 'checkbox' },

 // Branch details
 branchId: { label: 'Branch ID', type: 'text' },
 branchAccountName: { label: 'Branch Account Name', type: 'text' },
 branchEclipseId: { label: 'Branch Eclipse ID', type: 'text' },
 branchUsername: { label: 'Branch Username', type: 'text' },
 branchPassword: { label: 'Branch Password', type: 'password' },

 // Default Store User Settings
 userCanEnterOrders: { label: 'User Can Enter Orders', type: 'checkbox' },
 userCanApproveOrders: { label: 'User Can Approve Orders', type: 'checkbox' },
 enableMyAccountMenu: { label: 'Enable \'My Account\' Menu', type: 'checkbox' },
 enableMessagesMenu: { label: 'Enable \'Messages\' Menu', type: 'checkbox' },
 canSendMessages: { label: 'Can Send Messages', type: 'checkbox' },
 enableReportsMenu: { label: 'Enable \'Reports\' Menu', type: 'checkbox' },
 serviceProviderLogin: { label: 'Service Provider Login', type: 'checkbox' },
 enableProductsMenu: { label: 'Enable \'Products\' Menu', type: 'checkbox' },
 enableMyCartMenu: { label: 'Enable \'My Cart\' Menu', type: 'checkbox' },
 enableTrackingMenu: { label: 'Enable \'Tracking\' Menu', type: 'checkbox' },
 enableInstructionsMenu: { label: 'Enable \'Instructions\' Menu', type: 'checkbox' },

 // Budgeting Information
 accountUsesBudgets: { label: 'Account Uses Budgets', type: 'checkbox' },
 includeShippingInLimits: { label: 'Include Shipping in Limits', type: 'checkbox' },
 includeTaxInLimits: { label: 'Include Tax in Limits', type: 'checkbox' },
 displayBudgetInfoInHeader: { label: 'Display Budget Info in Header', type: 'checkbox' },
 displaySpendInfoInHeader: { label: 'Display Spend Info in Header', type: 'checkbox' },
 sendConfirmationToOrderApprover: { label: 'Send Confirmation To Order Approver', type: 'checkbox' },
 overBudgetUsernames: { label: 'Send \'over budget\' messages to usernames', type: 'text' },
 accountSpecificOverBudgetMessage: { label: 'Account-specific \'order over budget\' message', type: 'textarea' },

 // Additional fields
 accountNotes: { label: 'Account Notes', type: 'textarea' },
 accountLampGuidePageHeaderText: { label: 'Account Lamp Guide Page Header Text', type: 'text' },
 accountSpecialShippingInstructions: { label: 'Account Special Shipping Instructions', type: 'textarea' },
};


export const EDITABLE_FIELDS = Object.keys(accountConfig);

export const getAccountConfig = (fieldName) => accountConfig[fieldName] || { label: fieldName, type: 'text' };
