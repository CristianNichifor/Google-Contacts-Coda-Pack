import * as coda from "@codahq/packs-sdk";

export const pack = coda.newPack();

pack.addNetworkDomain("googleapis.com");

pack.setUserAuthentication({
  type: coda.AuthenticationType.OAuth2,
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  scopes: [
    "https://www.googleapis.com/auth/contacts",
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/contacts.other.readonly",
    "profile"
  ],
  additionalParams: {
    access_type: "offline",
    include_granted_scopes: "true",
  },
  getConnectionName: async function (context) {
    try {
      let response = await context.fetcher.fetch({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v1/userinfo",
        cacheTtlSecs: 0,
      });
      return response.body?.name || response.body?.email || "Google Account";
    } catch (error) {
      console.log(`Error getting connection name: ${error.message}`);
      return "Google Account";
    }
  },
});

//---------------------------------------------------------------------------------------------------------------------------//
// Countries Data and Helper Functions
//---------------------------------------------------------------------------------------------------------------------------//

const COUNTRIES_DATA = [
  { "name": "Afghanistan", "code": "AF" },
  { "name": "Åland Islands", "code": "AX" },
  { "name": "Albania", "code": "AL" },
  { "name": "Algeria", "code": "DZ" },
  { "name": "American Samoa", "code": "AS" },
  { "name": "Andorra", "code": "AD" },
  { "name": "Angola", "code": "AO" },
  { "name": "Anguilla", "code": "AI" },
  { "name": "Antarctica", "code": "AQ" },
  { "name": "Antigua and Barbuda", "code": "AG" },
  { "name": "Argentina", "code": "AR" },
  { "name": "Armenia", "code": "AM" },
  { "name": "Aruba", "code": "AW" },
  { "name": "Australia", "code": "AU" },
  { "name": "Austria", "code": "AT" },
  { "name": "Azerbaijan", "code": "AZ" },
  { "name": "Bahamas", "code": "BS" },
  { "name": "Bahrain", "code": "BH" },
  { "name": "Bangladesh", "code": "BD" },
  { "name": "Barbados", "code": "BB" },
  { "name": "Belarus", "code": "BY" },
  { "name": "Belgium", "code": "BE" },
  { "name": "Belize", "code": "BZ" },
  { "name": "Benin", "code": "BJ" },
  { "name": "Bermuda", "code": "BM" },
  { "name": "Bhutan", "code": "BT" },
  { "name": "Bolivia", "code": "BO" },
  { "name": "Bosnia and Herzegovina", "code": "BA" },
  { "name": "Botswana", "code": "BW" },
  { "name": "Bouvet Island", "code": "BV" },
  { "name": "Brazil", "code": "BR" },
  { "name": "British Indian Ocean Territory", "code": "IO" },
  { "name": "Brunei Darussalam", "code": "BN" },
  { "name": "Bulgaria", "code": "BG" },
  { "name": "Burkina Faso", "code": "BF" },
  { "name": "Burundi", "code": "BI" },
  { "name": "Cambodia", "code": "KH" },
  { "name": "Cameroon", "code": "CM" },
  { "name": "Canada", "code": "CA" },
  { "name": "Cape Verde", "code": "CV" },
  { "name": "Cayman Islands", "code": "KY" },
  { "name": "Central African Republic", "code": "CF" },
  { "name": "Chad", "code": "TD" },
  { "name": "Chile", "code": "CL" },
  { "name": "China", "code": "CN" },
  { "name": "Christmas Island", "code": "CX" },
  { "name": "Cocos (Keeling) Islands", "code": "CC" },
  { "name": "Colombia", "code": "CO" },
  { "name": "Comoros", "code": "KM" },
  { "name": "Congo", "code": "CG" },
  { "name": "Congo, The Democratic Republic of the", "code": "CD" },
  { "name": "Cook Islands", "code": "CK" },
  { "name": "Costa Rica", "code": "CR" },
  { "name": "Cote D'Ivoire", "code": "CI" },
  { "name": "Croatia", "code": "HR" },
  { "name": "Cuba", "code": "CU" },
  { "name": "Cyprus", "code": "CY" },
  { "name": "Czech Republic", "code": "CZ" },
  { "name": "Denmark", "code": "DK" },
  { "name": "Djibouti", "code": "DJ" },
  { "name": "Dominica", "code": "DM" },
  { "name": "Dominican Republic", "code": "DO" },
  { "name": "Ecuador", "code": "EC" },
  { "name": "Egypt", "code": "EG" },
  { "name": "El Salvador", "code": "SV" },
  { "name": "Equatorial Guinea", "code": "GQ" },
  { "name": "Eritrea", "code": "ER" },
  { "name": "Estonia", "code": "EE" },
  { "name": "Ethiopia", "code": "ET" },
  { "name": "Falkland Islands (Malvinas)", "code": "FK" },
  { "name": "Faroe Islands", "code": "FO" },
  { "name": "Fiji", "code": "FJ" },
  { "name": "Finland", "code": "FI" },
  { "name": "France", "code": "FR" },
  { "name": "French Guiana", "code": "GF" },
  { "name": "French Polynesia", "code": "PF" },
  { "name": "French Southern Territories", "code": "TF" },
  { "name": "Gabon", "code": "GA" },
  { "name": "Gambia", "code": "GM" },
  { "name": "Georgia", "code": "GE" },
  { "name": "Germany", "code": "DE" },
  { "name": "Ghana", "code": "GH" },
  { "name": "Gibraltar", "code": "GI" },
  { "name": "Greece", "code": "GR" },
  { "name": "Greenland", "code": "GL" },
  { "name": "Grenada", "code": "GD" },
  { "name": "Guadeloupe", "code": "GP" },
  { "name": "Guam", "code": "GU" },
  { "name": "Guatemala", "code": "GT" },
  { "name": "Guernsey", "code": "GG" },
  { "name": "Guinea", "code": "GN" },
  { "name": "Guinea-Bissau", "code": "GW" },
  { "name": "Guyana", "code": "GY" },
  { "name": "Haiti", "code": "HT" },
  { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
  { "name": "Holy See (Vatican City State)", "code": "VA" },
  { "name": "Honduras", "code": "HN" },
  { "name": "Hong Kong", "code": "HK" },
  { "name": "Hungary", "code": "HU" },
  { "name": "Iceland", "code": "IS" },
  { "name": "India", "code": "IN" },
  { "name": "Indonesia", "code": "ID" },
  { "name": "Iran, Islamic Republic Of", "code": "IR" },
  { "name": "Iraq", "code": "IQ" },
  { "name": "Ireland", "code": "IE" },
  { "name": "Isle of Man", "code": "IM" },
  { "name": "Israel", "code": "IL" },
  { "name": "Italy", "code": "IT" },
  { "name": "Jamaica", "code": "JM" },
  { "name": "Japan", "code": "JP" },
  { "name": "Jersey", "code": "JE" },
  { "name": "Jordan", "code": "JO" },
  { "name": "Kazakhstan", "code": "KZ" },
  { "name": "Kenya", "code": "KE" },
  { "name": "Kiribati", "code": "KI" },
  { "name": "Korea, Democratic People'S Republic of", "code": "KP" },
  { "name": "Korea, Republic of", "code": "KR" },
  { "name": "Kuwait", "code": "KW" },
  { "name": "Kyrgyzstan", "code": "KG" },
  { "name": "Lao People'S Democratic Republic", "code": "LA" },
  { "name": "Latvia", "code": "LV" },
  { "name": "Lebanon", "code": "LB" },
  { "name": "Lesotho", "code": "LS" },
  { "name": "Liberia", "code": "LR" },
  { "name": "Libyan Arab Jamahiriya", "code": "LY" },
  { "name": "Liechtenstein", "code": "LI" },
  { "name": "Lithuania", "code": "LT" },
  { "name": "Luxembourg", "code": "LU" },
  { "name": "Macao", "code": "MO" },
  { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
  { "name": "Madagascar", "code": "MG" },
  { "name": "Malawi", "code": "MW" },
  { "name": "Malaysia", "code": "MY" },
  { "name": "Maldives", "code": "MV" },
  { "name": "Mali", "code": "ML" },
  { "name": "Malta", "code": "MT" },
  { "name": "Marshall Islands", "code": "MH" },
  { "name": "Martinique", "code": "MQ" },
  { "name": "Mauritania", "code": "MR" },
  { "name": "Mauritius", "code": "MU" },
  { "name": "Mayotte", "code": "YT" },
  { "name": "Mexico", "code": "MX" },
  { "name": "Micronesia, Federated States of", "code": "FM" },
  { "name": "Moldova, Republic of", "code": "MD" },
  { "name": "Monaco", "code": "MC" },
  { "name": "Mongolia", "code": "MN" },
  { "name": "Montenegro", "code": "ME" },
  { "name": "Montserrat", "code": "MS" },
  { "name": "Morocco", "code": "MA" },
  { "name": "Mozambique", "code": "MZ" },
  { "name": "Myanmar", "code": "MM" },
  { "name": "Namibia", "code": "NA" },
  { "name": "Nauru", "code": "NR" },
  { "name": "Nepal", "code": "NP" },
  { "name": "Netherlands", "code": "NL" },
  { "name": "Netherlands Antilles", "code": "AN" },
  { "name": "New Caledonia", "code": "NC" },
  { "name": "New Zealand", "code": "NZ" },
  { "name": "Nicaragua", "code": "NI" },
  { "name": "Niger", "code": "NE" },
  { "name": "Nigeria", "code": "NG" },
  { "name": "Niue", "code": "NU" },
  { "name": "Norfolk Island", "code": "NF" },
  { "name": "Northern Mariana Islands", "code": "MP" },
  { "name": "Norway", "code": "NO" },
  { "name": "Oman", "code": "OM" },
  { "name": "Pakistan", "code": "PK" },
  { "name": "Palau", "code": "PW" },
  { "name": "Palestinian Territory, Occupied", "code": "PS" },
  { "name": "Panama", "code": "PA" },
  { "name": "Papua New Guinea", "code": "PG" },
  { "name": "Paraguay", "code": "PY" },
  { "name": "Peru", "code": "PE" },
  { "name": "Philippines", "code": "PH" },
  { "name": "Pitcairn", "code": "PN" },
  { "name": "Poland", "code": "PL" },
  { "name": "Portugal", "code": "PT" },
  { "name": "Puerto Rico", "code": "PR" },
  { "name": "Qatar", "code": "QA" },
  { "name": "Reunion", "code": "RE" },
  { "name": "Romania", "code": "RO" },
  { "name": "Russian Federation", "code": "RU" },
  { "name": "Rwanda", "code": "RW" },
  { "name": "Saint Helena", "code": "SH" },
  { "name": "Saint Kitts and Nevis", "code": "KN" },
  { "name": "Saint Lucia", "code": "LC" },
  { "name": "Saint Pierre and Miquelon", "code": "PM" },
  { "name": "Saint Vincent and the Grenadines", "code": "VC" },
  { "name": "Samoa", "code": "WS" },
  { "name": "San Marino", "code": "SM" },
  { "name": "Sao Tome and Principe", "code": "ST" },
  { "name": "Saudi Arabia", "code": "SA" },
  { "name": "Senegal", "code": "SN" },
  { "name": "Serbia", "code": "RS" },
  { "name": "Seychelles", "code": "SC" },
  { "name": "Sierra Leone", "code": "SL" },
  { "name": "Singapore", "code": "SG" },
  { "name": "Slovakia", "code": "SK" },
  { "name": "Slovenia", "code": "SI" },
  { "name": "Solomon Islands", "code": "SB" },
  { "name": "Somalia", "code": "SO" },
  { "name": "South Africa", "code": "ZA" },
  { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
  { "name": "Spain", "code": "ES" },
  { "name": "Sri Lanka", "code": "LK" },
  { "name": "Sudan", "code": "SD" },
  { "name": "Suriname", "code": "SR" },
  { "name": "Svalbard and Jan Mayen", "code": "SJ" },
  { "name": "Swaziland", "code": "SZ" },
  { "name": "Sweden", "code": "SE" },
  { "name": "Switzerland", "code": "CH" },
  { "name": "Syrian Arab Republic", "code": "SY" },
  { "name": "Taiwan", "code": "TW" },
  { "name": "Tajikistan", "code": "TJ" },
  { "name": "Tanzania, United Republic of", "code": "TZ" },
  { "name": "Thailand", "code": "TH" },
  { "name": "Timor-Leste", "code": "TL" },
  { "name": "Togo", "code": "TG" },
  { "name": "Tokelau", "code": "TK" },
  { "name": "Tonga", "code": "TO" },
  { "name": "Trinidad and Tobago", "code": "TT" },
  { "name": "Tunisia", "code": "TN" },
  { "name": "Turkey", "code": "TR" },
  { "name": "Turkmenistan", "code": "TM" },
  { "name": "Turks and Caicos Islands", "code": "TC" },
  { "name": "Tuvalu", "code": "TV" },
  { "name": "Uganda", "code": "UG" },
  { "name": "Ukraine", "code": "UA" },
  { "name": "United Arab Emirates", "code": "AE" },
  { "name": "United Kingdom", "code": "GB" },
  { "name": "United States", "code": "US" },
  { "name": "United States Minor Outlying Islands", "code": "UM" },
  { "name": "Uruguay", "code": "UY" },
  { "name": "Uzbekistan", "code": "UZ" },
  { "name": "Vanuatu", "code": "VU" },
  { "name": "Venezuela", "code": "VE" },
  { "name": "Viet Nam", "code": "VN" },
  { "name": "Virgin Islands, British", "code": "VG" },
  { "name": "Virgin Islands, U.S.", "code": "VI" },
  { "name": "Wallis and Futuna", "code": "WF" },
  { "name": "Western Sahara", "code": "EH" },
  { "name": "Yemen", "code": "YE" },
  { "name": "Zambia", "code": "ZM" },
  { "name": "Zimbabwe", "code": "ZW" }
];

const COUNTRY_NAME_TO_CODE = Object.fromEntries(COUNTRIES_DATA.map(c => [c.name, c.code]));
const COUNTRY_CODE_TO_NAME = Object.fromEntries(COUNTRIES_DATA.map(c => [c.code, c.name]));
const COUNTRY_OPTIONS = COUNTRIES_DATA.map(country => country.name);

function convertCountryNameToCode(countryName: string): string {
  return COUNTRY_NAME_TO_CODE[countryName] || countryName;
}

function convertCountryCodeToName(countryCode: string): string {
  return COUNTRY_CODE_TO_NAME[countryCode] || countryCode;
}

// Helper function to normalize phone numbers
function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[\s\-\(\)\.]/g, '');
}

// Helper function to normalize email addresses
function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.toLowerCase().trim();
}

// Helper function to format display names consistently
function formatDisplayName(givenName: string, familyName: string, email: string, phone: string): string {
  if (givenName || familyName) {
    return [givenName, familyName].filter(Boolean).join(' ').trim();
  }
  if (email) return email;
  if (phone) return phone;
  return 'Unnamed Contact';
}

// Helper function to safely get nested property
function safeGet(obj: any, path: string[], defaultValue: any = '') {
  try {
    return path.reduce((current, key) => current?.[key], obj) || defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone format (basic validation)
function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const cleanPhone = normalizePhoneNumber(phone);
  return cleanPhone.length >= 7 && /^\+?[\d\s\-\(\)\.]+$/.test(phone);
}

// Helper function to get label type mapping for Google API
function mapLabelToGoogleType(label: string, fieldType: 'email' | 'phone' | 'address'): string {
  if (!label) return 'other';

  const labelLower = label.toLowerCase();

  switch (fieldType) {
    case 'email':
      const emailMap: { [key: string]: string } = {
        'work': 'work',
        'home': 'home',
        'other': 'other',
        'custom': 'other'
      };
      return emailMap[labelLower] || 'other';

    case 'phone':
      const phoneMap: { [key: string]: string } = {
        'mobile': 'mobile',
        'work': 'work',
        'home': 'home',
        'main': 'main',
        'work_fax': 'workFax',
        'home_fax': 'homeFax',
        'pager': 'pager',
        'other': 'other'
      };
      return phoneMap[labelLower] || 'other';

    case 'address':
      const addressMap: { [key: string]: string } = {
        'home': 'home',
        'work': 'work',
        'other': 'other'
      };
      return addressMap[labelLower] || 'other';

    default:
      return 'other';
  }
}

// Helper function to map Google API type back to our label format
function mapGoogleTypeToLabel(googleType: string, fieldType: 'email' | 'phone' | 'address'): string {
  if (!googleType) return 'other';

  const typeLower = googleType.toLowerCase();

  switch (fieldType) {
    case 'phone':
      const phoneMap: { [key: string]: string } = {
        'mobile': 'mobile',
        'work': 'work',
        'home': 'home',
        'main': 'main',
        'workfax': 'work_fax',
        'homefax': 'home_fax',
        'pager': 'pager',
        'other': 'other'
      };
      return phoneMap[typeLower] || 'other';

    default:
      return typeLower || 'other';
  }
}

// Helper function to clean and validate address components
function cleanAddressComponent(component: string): string {
  if (!component) return '';
  return component.trim().replace(/\s+/g, ' ');
}

// Helper function to check if address has any meaningful content
function hasAddressContent(street: string, street2: string, city: string, postcode: string, country: string, poBox: string): boolean {
  return Boolean(
    cleanAddressComponent(street) ||
    cleanAddressComponent(street2) ||
    cleanAddressComponent(city) ||
    cleanAddressComponent(postcode) ||
    cleanAddressComponent(country) ||
    cleanAddressComponent(poBox)
  );
}

// Helper function to format date consistently (YYYY-MM-DD)
function formatDate(dateInput: string | Date): string {
  if (!dateInput) return '';

  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
}

// Helper function to parse date from various formats
function parseDate(dateStr: string): { year?: number; month?: number; day?: number } | null {
  if (!dateStr) return null;

  try {
    // Handle YYYY-MM-DD format
    const dashMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (dashMatch) {
      return {
        year: parseInt(dashMatch[1]),
        month: parseInt(dashMatch[2]),
        day: parseInt(dashMatch[3])
      };
    }

    // Handle MM/DD/YYYY format
    const slashMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
      return {
        year: parseInt(slashMatch[3]),
        month: parseInt(slashMatch[1]),
        day: parseInt(slashMatch[2])
      };
    }

    // Try parsing as a date object
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    }

    return null;
  } catch {
    return null;
  }
}

// Helper function to create date object for Google API
function createGoogleDate(dateStr: string): { year?: number; month?: number; day?: number } | null {
  const parsed = parseDate(dateStr);
  if (!parsed) return null;

  // Validate date components
  if (parsed.year && (parsed.year < 1000 || parsed.year > 9999)) return null;
  if (parsed.month && (parsed.month < 1 || parsed.month > 12)) return null;
  if (parsed.day && (parsed.day < 1 || parsed.day > 31)) return null;

  return parsed;
}

// Helper function to deduplicate contact fields
function deduplicateContactFields<T extends { value: string }>(fields: T[]): T[] {
  if (!fields || fields.length <= 1) return fields || [];

  const seen = new Set<string>();
  return fields.filter(field => {
    if (!field.value) return false;
    const normalizedValue = field.value.toLowerCase().trim();
    if (seen.has(normalizedValue)) return false;
    seen.add(normalizedValue);
    return true;
  });
}

// Helper function to validate contact data before API calls
function validateContactData(contactData: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate names
  if (!contactData.names || contactData.names.length === 0) {
    errors.push('Contact must have at least one name');
  } else {
    const primaryName = contactData.names[0];
    if (!primaryName.givenName && !primaryName.familyName && !primaryName.displayName) {
      errors.push('Contact must have at least a first name, last name, or display name');
    }
  }

  // Validate emails
  if (contactData.emailAddresses) {
    contactData.emailAddresses.forEach((email: any, index: number) => {
      if (email.value && !isValidEmail(email.value)) {
        errors.push(`Invalid email format at position ${index + 1}: ${email.value}`);
      }
    });
  }

  // Validate phones
  if (contactData.phoneNumbers) {
    contactData.phoneNumbers.forEach((phone: any, index: number) => {
      if (phone.value && !isValidPhone(phone.value)) {
        errors.push(`Invalid phone format at position ${index + 1}: ${phone.value}`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helper function to compile all email addresses from numbered fields
function compileAllEmails(contact: any): string[] {
  const emails: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const email = contact[`email${i}`];
    if (email && email.trim() && isValidEmail(email)) {
      emails.push(email.trim());
    }
  }
  // Remove duplicates using filter
  return emails.filter((email, index) => emails.indexOf(email) === index);
}

// Helper function to compile all phone numbers from numbered fields
function compileAllPhones(contact: any): string[] {
  const phones: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const phone = contact[`phone${i}`];
    if (phone && phone.trim()) {
      phones.push(phone.trim());
    }
  }
  // Remove duplicates using filter
  return phones.filter((phone, index) => phones.indexOf(phone) === index);
}

 // Core identifiers (ONLY READ-ONLY)
const ContactSchemaProperties: coda.ObjectSchemaProperties<string> = {
  resourceName: {
    type: coda.ValueType.String,
    description: "The resource name of the contact"
  },
  etag: {
    type: coda.ValueType.String,
    description: "The ETag of the contact"
  },

  // Name fields (ALL MUTABLE)
  displayName: {
    type: coda.ValueType.String,
    description: "The display name of the contact",
    mutable: true
  },
  prefix: {
    type: coda.ValueType.String,
    description: "Name prefix (Mr., Mrs., Dr., etc.)",
    mutable: true
  },
  givenName: {
    type: coda.ValueType.String,
    description: "First name",
    mutable: true
  },
  middleName: {
    type: coda.ValueType.String,
    description: "Middle name",
    mutable: true
  },
  familyName: {
    type: coda.ValueType.String,
    description: "Last name",
    mutable: true
  },
  suffix: {
    type: coda.ValueType.String,
    description: "Name suffix (Jr., Sr., III, etc.)",
    mutable: true
  },
  phoneticFirst: {
    type: coda.ValueType.String,
    description: "Phonetic spelling of first name",
    mutable: true
  },
  phoneticMiddle: {
    type: coda.ValueType.String,
    description: "Phonetic spelling of middle name",
    mutable: true
  },
  phoneticLast: {
    type: coda.ValueType.String,
    description: "Phonetic spelling of last name",
    mutable: true
  },
  nickname: {
    type: coda.ValueType.String,
    description: "Nickname",
    mutable: true
  },
  fileAs: {
    type: coda.ValueType.String,
    description: "How the contact should be filed",
    mutable: true
  },

  // 10 Email fields (ALL MUTABLE)
  primaryEmail: {
    type: coda.ValueType.String,
    description: "Primary email",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  primaryEmailLabel: {
    type: coda.ValueType.String,
    description: "Primary email label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email2: {
    type: coda.ValueType.String,
    description: "Email 2",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email2Label: {
    type: coda.ValueType.String,
    description: "Email 2 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email3: {
    type: coda.ValueType.String,
    description: "Email 3",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email3Label: {
    type: coda.ValueType.String,
    description: "Email 3 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email4: {
    type: coda.ValueType.String,
    description: "Email 4",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email4Label: {
    type: coda.ValueType.String,
    description: "Email 4 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email5: {
    type: coda.ValueType.String,
    description: "Email 5",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email5Label: {
    type: coda.ValueType.String,
    description: "Email 5 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email6: {
    type: coda.ValueType.String,
    description: "Email 6",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email6Label: {
    type: coda.ValueType.String,
    description: "Email 6 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email7: {
    type: coda.ValueType.String,
    description: "Email 7",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email7Label: {
    type: coda.ValueType.String,
    description: "Email 7 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email8: {
    type: coda.ValueType.String,
    description: "Email 8",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email8Label: {
    type: coda.ValueType.String,
    description: "Email 8 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email9: {
    type: coda.ValueType.String,
    description: "Email 9",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email9Label: {
    type: coda.ValueType.String,
    description: "Email 9 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },
  email10: {
    type: coda.ValueType.String,
    description: "Email 10",
    codaType: coda.ValueHintType.Email,
    mutable: true
  },
  email10Label: {
    type: coda.ValueType.String,
    description: "Email 10 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["work", "home", "other", "custom"],
    mutable: true
  },

  // Compiled email list (ONLY READ-ONLY)
  allEmails: {
    type: coda.ValueType.Array,
    items: { type: coda.ValueType.String },
    description: "All email addresses (compiled from email1-10)"
  },

  // 10 Phone fields (ALL MUTABLE)
  primaryPhone: {
    type: coda.ValueType.String,
    description: "Primary phone",
    mutable: true
  },
  primaryPhoneLabel: {
    type: coda.ValueType.String,
    description: "Primary phone label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone2: {
    type: coda.ValueType.String,
    description: "Phone 2",
    mutable: true
  },
  phone2Label: {
    type: coda.ValueType.String,
    description: "Phone 2 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone3: {
    type: coda.ValueType.String,
    description: "Phone 3",
    mutable: true
  },
  phone3Label: {
    type: coda.ValueType.String,
    description: "Phone 3 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone4: {
    type: coda.ValueType.String,
    description: "Phone 4",
    mutable: true
  },
  phone4Label: {
    type: coda.ValueType.String,
    description: "Phone 4 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone5: {
    type: coda.ValueType.String,
    description: "Phone 5",
    mutable: true
  },
  phone5Label: {
    type: coda.ValueType.String,
    description: "Phone 5 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone6: {
    type: coda.ValueType.String,
    description: "Phone 6",
    mutable: true
  },
  phone6Label: {
    type: coda.ValueType.String,
    description: "Phone 6 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone7: {
    type: coda.ValueType.String,
    description: "Phone 7",
    mutable: true
  },
  phone7Label: {
    type: coda.ValueType.String,
    description: "Phone 7 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone8: {
    type: coda.ValueType.String,
    description: "Phone 8",
    mutable: true
  },
  phone8Label: {
    type: coda.ValueType.String,
    description: "Phone 8 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone9: {
    type: coda.ValueType.String,
    description: "Phone 9",
    mutable: true
  },
  phone9Label: {
    type: coda.ValueType.String,
    description: "Phone 9 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },
  phone10: {
    type: coda.ValueType.String,
    description: "Phone 10",
    mutable: true
  },
  phone10Label: {
    type: coda.ValueType.String,
    description: "Phone 10 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["mobile", "work", "home", "main", "work_fax", "home_fax", "pager", "other"],
    mutable: true
  },

  // Compiled phone list (ONLY READ-ONLY)
  allPhones: {
    type: coda.ValueType.Array,
    items: { type: coda.ValueType.String },
    description: "All phone numbers (compiled from phone1-10)"
  },

  // Organization info (ALL MUTABLE)
  company: {
    type: coda.ValueType.String,
    description: "Company name",
    mutable: true
  },
  jobTitle: {
    type: coda.ValueType.String,
    description: "Job title",
    mutable: true
  },
  department: {
    type: coda.ValueType.String,
    description: "Department",
    mutable: true
  },

  // Primary Address fields (ALL MUTABLE)
  primaryAddressStreet: {
    type: coda.ValueType.String,
    description: "Primary address street",
    mutable: true
  },
  primaryAddressStreet2: {
    type: coda.ValueType.String,
    description: "Primary address street line 2",
    mutable: true
  },
  primaryAddressCity: {
    type: coda.ValueType.String,
    description: "Primary address city",
    mutable: true
  },
  primaryAddressPostcode: {
    type: coda.ValueType.String,
    description: "Primary address postcode",
    mutable: true
  },
  primaryAddressCountry: {
    type: coda.ValueType.String,
    description: "Primary address country",
    codaType: coda.ValueHintType.SelectList,
    options: COUNTRY_OPTIONS,
    mutable: true
  },
  primaryAddressPOBox: {
    type: coda.ValueType.String,
    description: "Primary address PO Box",
    mutable: true
  },
  primaryAddressLabel: {
    type: coda.ValueType.String,
    description: "Primary address label",
    codaType: coda.ValueHintType.SelectList,
    options: ["home", "work", "other"],
    mutable: true
  },

  // Address 2 fields (ALL MUTABLE)
  address2Street: {
    type: coda.ValueType.String,
    description: "Address 2 street",
    mutable: true
  },
  address2Street2: {
    type: coda.ValueType.String,
    description: "Address 2 street line 2",
    mutable: true
  },
  address2City: {
    type: coda.ValueType.String,
    description: "Address 2 city",
    mutable: true
  },
  address2Postcode: {
    type: coda.ValueType.String,
    description: "Address 2 postcode",
    mutable: true
  },
  address2Country: {
    type: coda.ValueType.String,
    description: "Address 2 country",
    codaType: coda.ValueHintType.SelectList,
    options: COUNTRY_OPTIONS,
    mutable: true
  },
  address2POBox: {
    type: coda.ValueType.String,
    description: "Address 2 PO Box",
    mutable: true
  },
  address2Label: {
    type: coda.ValueType.String,
    description: "Address 2 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["home", "work", "other"],
    mutable: true
  },

  // Address 3 fields (ALL MUTABLE)
  address3Street: {
    type: coda.ValueType.String,
    description: "Address 3 street",
    mutable: true
  },
  address3Street2: {
    type: coda.ValueType.String,
    description: "Address 3 street line 2",
    mutable: true
  },
  address3City: {
    type: coda.ValueType.String,
    description: "Address 3 city",
    mutable: true
  },
  address3Postcode: {
    type: coda.ValueType.String,
    description: "Address 3 postcode",
    mutable: true
  },
  address3Country: {
    type: coda.ValueType.String,
    description: "Address 3 country",
    codaType: coda.ValueHintType.SelectList,
    options: COUNTRY_OPTIONS,
    mutable: true
  },
  address3POBox: {
    type: coda.ValueType.String,
    description: "Address 3 PO Box",
    mutable: true
  },
  address3Label: {
    type: coda.ValueType.String,
    description: "Address 3 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["home", "work", "other"],
    mutable: true
  },

  // Address 4 fields (ALL MUTABLE)
  address4Street: {
    type: coda.ValueType.String,
    description: "Address 4 street",
    mutable: true
  },
  address4Street2: {
    type: coda.ValueType.String,
    description: "Address 4 street line 2",
    mutable: true
  },
  address4City: {
    type: coda.ValueType.String,
    description: "Address 4 city",
    mutable: true
  },
  address4Postcode: {
    type: coda.ValueType.String,
    description: "Address 4 postcode",
    mutable: true
  },
  address4Country: {
    type: coda.ValueType.String,
    description: "Address 4 country",
    codaType: coda.ValueHintType.SelectList,
    options: COUNTRY_OPTIONS,
    mutable: true
  },
  address4POBox: {
    type: coda.ValueType.String,
    description: "Address 4 PO Box",
    mutable: true
  },
  address4Label: {
    type: coda.ValueType.String,
    description: "Address 4 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["home", "work", "other"],
    mutable: true
  },

  // Address 5 fields (ALL MUTABLE)
  address5Street: {
    type: coda.ValueType.String,
    description: "Address 5 street",
    mutable: true
  },
  address5Street2: {
    type: coda.ValueType.String,
    description: "Address 5 street line 2",
    mutable: true
  },
  address5City: {
    type: coda.ValueType.String,
    description: "Address 5 city",
    mutable: true
  },
  address5Postcode: {
    type: coda.ValueType.String,
    description: "Address 5 postcode",
    mutable: true
  },
  address5Country: {
    type: coda.ValueType.String,
    description: "Address 5 country",
    codaType: coda.ValueHintType.SelectList,
    options: COUNTRY_OPTIONS,
    mutable: true
  },
  address5POBox: {
    type: coda.ValueType.String,
    description: "Address 5 PO Box",
    mutable: true
  },
  address5Label: {
    type: coda.ValueType.String,
    description: "Address 5 label",
    codaType: coda.ValueHintType.SelectList,
    options: ["home", "work", "other"],
    mutable: true
  },

  // Additional info (ALL MUTABLE)
  notes: {
    type: coda.ValueType.String,
    description: "Notes about the contact",
    mutable: true
  },
  website: {
    type: coda.ValueType.String,
    description: "Website URL",
    codaType: coda.ValueHintType.Url,
    mutable: true
  },
  birthday: {
    type: coda.ValueType.String,
    description: "Birthday",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },

  // 10 Significant dates with labels (ALL MUTABLE)
  significantDate1: {
    type: coda.ValueType.String,
    description: "Significant date 1",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate1Label: {
    type: coda.ValueType.String,
    description: "Significant date 1 label",
    mutable: true
  },
  significantDate2: {
    type: coda.ValueType.String,
    description: "Significant date 2",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate2Label: {
    type: coda.ValueType.String,
    description: "Significant date 2 label",
    mutable: true
  },
  significantDate3: {
    type: coda.ValueType.String,
    description: "Significant date 3",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate3Label: {
    type: coda.ValueType.String,
    description: "Significant date 3 label",
    mutable: true
  },
  significantDate4: {
    type: coda.ValueType.String,
    description: "Significant date 4",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate4Label: {
    type: coda.ValueType.String,
    description: "Significant date 4 label",
    mutable: true
  },
  significantDate5: {
    type: coda.ValueType.String,
    description: "Significant date 5",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate5Label: {
    type: coda.ValueType.String,
    description: "Significant date 5 label",
    mutable: true
  },
  significantDate6: {
    type: coda.ValueType.String,
    description: "Significant date 6",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate6Label: {
    type: coda.ValueType.String,
    description: "Significant date 6 label",
    mutable: true
  },
  significantDate7: {
    type: coda.ValueType.String,
    description: "Significant date 7",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate7Label: {
    type: coda.ValueType.String,
    description: "Significant date 7 label",
    mutable: true
  },
  significantDate8: {
    type: coda.ValueType.String,
    description: "Significant date 8",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate8Label: {
    type: coda.ValueType.String,
    description: "Significant date 8 label",
    mutable: true
  },
  significantDate9: {
    type: coda.ValueType.String,
    description: "Significant date 9",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate9Label: {
    type: coda.ValueType.String,
    description: "Significant date 9 label",
    mutable: true
  },
  significantDate10: {
    type: coda.ValueType.String,
    description: "Significant date 10",
    codaType: coda.ValueHintType.Date,
    mutable: true
  },
  significantDate10Label: {
    type: coda.ValueType.String,
    description: "Significant date 10 label",
    mutable: true
  },

  // Related contacts field (ALL MUTABLE)
  relatedPeople: {
    type: coda.ValueType.String,
    description: "Related people (comma-separated: 'Name: Relationship, Name2: Relationship2')",
    mutable: true
  },

  // 10 custom fields with labels (ALL MUTABLE)
  customField1: {
    type: coda.ValueType.String,
    description: "Custom field 1 value",
    mutable: true
  },
  customField1Label: {
    type: coda.ValueType.String,
    description: "Custom field 1 label",
    mutable: true
  },
  customField2: {
    type: coda.ValueType.String,
    description: "Custom field 2 value",
    mutable: true
  },
  customField2Label: {
    type: coda.ValueType.String,
    description: "Custom field 2 label",
    mutable: true
  },
  customField3: {
    type: coda.ValueType.String,
    description: "Custom field 3 value",
    mutable: true
  },
  customField3Label: {
    type: coda.ValueType.String,
    description: "Custom field 3 label",
    mutable: true
  },
  customField4: {
    type: coda.ValueType.String,
    description: "Custom field 4 value",
    mutable: true
  },
  customField4Label: {
    type: coda.ValueType.String,
    description: "Custom field 4 label",
    mutable: true
  },
  customField5: {
    type: coda.ValueType.String,
    description: "Custom field 5 value",
    mutable: true
  },
  customField5Label: {
    type: coda.ValueType.String,
    description: "Custom field 5 label",
    mutable: true
  },
  customField6: {
    type: coda.ValueType.String,
    description: "Custom field 6 value",
    mutable: true
  },
  customField6Label: {
    type: coda.ValueType.String,
    description: "Custom field 6 label",
    mutable: true
  },
  customField7: {
    type: coda.ValueType.String,
    description: "Custom field 7 value",
    mutable: true
  },
  customField7Label: {
    type: coda.ValueType.String,
    description: "Custom field 7 label",
    mutable: true
  },
  customField8: {
    type: coda.ValueType.String,
    description: "Custom field 8 value",
    mutable: true
  },
  customField8Label: {
    type: coda.ValueType.String,
    description: "Custom field 8 label",
    mutable: true
  },
  customField9: {
    type: coda.ValueType.String,
    description: "Custom field 9 value",
    mutable: true
  },
  customField9Label: {
    type: coda.ValueType.String,
    description: "Custom field 9 label",
    mutable: true
  },
  customField10: {
    type: coda.ValueType.String,
    description: "Custom field 10 value",
    mutable: true
  },
  customField10Label: {
    type: coda.ValueType.String,
    description: "Custom field 10 label",
    mutable: true
  },

  // Read-only fields (NOT mutable as this is managed by Google)
  memberships: {
    type: coda.ValueType.Array,
    items: { type: coda.ValueType.String },
    description: "Contact group memberships"
  },
  photoUrl: {
    type: coda.ValueType.String,
    description: "Contact photo URL",
    codaType: coda.ValueHintType.ImageReference
  },
  lastModified: {
    type: coda.ValueType.String,
    description: "Last modified date",
    codaType: coda.ValueHintType.DateTime
  },
  contactType: {
    type: coda.ValueType.String,
    description: "Contact type (CONTACT or OTHER_CONTACT)"
  }
};

// We create the complete schema...
const ContactSchemaComplete = coda.makeObjectSchema({
  properties: ContactSchemaProperties,
  displayProperty: "displayName",
  idProperty: "resourceName",
  featuredProperties: [
    "displayName",
    "givenName",
    "familyName",
    "primaryEmail",
    "primaryPhone",
    "company",
    "jobTitle",
    "allEmails",
    "allPhones"
  ]
});


function extractContactData(person: any) {
  const names = person.names || [];
  const primaryName = names.find((n: any) => n.metadata?.primary) || names[0] || {};

  const emails = person.emailAddresses || [];
  const phones = person.phoneNumbers || [];
  const addresses = person.addresses || [];
  const organizations = person.organizations || [];
  const biographies = person.biographies || [];
  const urls = person.urls || [];
  const birthdays = person.birthdays || [];
  const events = person.events || [];
  const relations = person.relations || [];
  const userDefined = person.userDefined || [];
  const nicknames = person.nicknames || [];

  const memberships = (person.memberships || [])
    .map((m: any) => m.contactGroupMembership?.contactGroupResourceName)
    .filter(Boolean);

  const photoUrl = person.photos?.find((p: any) => p.metadata?.primary)?.url;

  const sources = person.metadata?.sources || [];
  const sourceTypes = sources.map((s: any) => s.type).filter(Boolean);
  const hasContact = sourceTypes.includes("CONTACT");
  const hasOtherContact = sourceTypes.includes("OTHER_CONTACT");

  let contactType = "CONTACT";
  if (hasOtherContact && !hasContact) {
    contactType = "OTHER_CONTACT";
  }

  // Helper function to get email by index
  const getEmailByIndex = (index: number) => {
    const email = emails[index];
    return email ? normalizeEmail(email.value) : '';
  };

  // Helper function to get email label by index
  const getEmailLabelByIndex = (index: number) => {
    if (!emails[index]) return '';
    const type = emails[index].type;
    if (type) return mapGoogleTypeToLabel(type, 'email');
    return '';
  };

  // Helper function to get phone by index
  const getPhoneByIndex = (index: number) => {
    const phone = phones[index];
    return phone ? normalizePhoneNumber(phone.value) : '';
  };

  // Helper function to get phone label by index
  const getPhoneLabelByIndex = (index: number) => {
    if (!phones[index]) return '';
    const type = phones[index].type;
    if (type) return mapGoogleTypeToLabel(type, 'phone');
    return '';
  };

  // Helper function to extract address by index
  const getAddressByIndex = (index: number) => {
    const addr = addresses[index] || {};

    if (index === 0) {
      // Primary address with index 0
      return {
        primaryAddressStreet: cleanAddressComponent(addr.streetAddress || ''),
        primaryAddressStreet2: cleanAddressComponent(addr.extendedAddress || ''),
        primaryAddressCity: cleanAddressComponent(addr.city || ''),
        primaryAddressPostcode: cleanAddressComponent(addr.postalCode || ''),
        primaryAddressCountry: cleanAddressComponent(addr.countryCode || ''),
        primaryAddressPOBox: cleanAddressComponent(addr.poBox || ''),
        primaryAddressLabel: mapGoogleTypeToLabel(addr.type || '', 'address')
      };
    } else {
      // All other addresses (index 1+ becomes address2, address3, etc.)
      const addressNum = index + 1;
      return {
        [`address${addressNum}Street`]: cleanAddressComponent(addr.streetAddress || ''),
        [`address${addressNum}Street2`]: cleanAddressComponent(addr.extendedAddress || ''),
        [`address${addressNum}City`]: cleanAddressComponent(addr.city || ''),
        [`address${addressNum}Postcode`]: cleanAddressComponent(addr.postalCode || ''),
        [`address${addressNum}Country`]: cleanAddressComponent(addr.countryCode || ''),
        [`address${addressNum}POBox`]: cleanAddressComponent(addr.poBox || ''),
        [`address${addressNum}Label`]: mapGoogleTypeToLabel(addr.type || '', 'address')
      };
    }
  };

  // Helper function to extract significant dates (up to 10 from events)
  const getSignificantDateByIndex = (index: number) => {
    const event = events[index];
    if (!event || !event.date) return { date: '', label: '' };

    const date = event.date;
    let dateString = '';
    if (date.year && date.month && date.day) {
      dateString = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    }

    return {
      date: dateString,
      label: (event.type || 'other').toLowerCase()
    };
  };

  // Helper function to extract custom field by index
  const getCustomFieldByIndex = (index: number) => {
    const field = userDefined[index];
    if (!field) return { value: '', label: '' };

    return {
      value: field.value || '',
      label: field.key || ''
    };
  };

  // Create related people string from relations
  const formatRelatedPeople = () => {
    if (!relations.length) return '';
    return relations
      .map(rel => `${rel.person || ''}: ${rel.type || ''}`)
      .filter(rel => rel !== ': ')
      .join(', ');
  };

  // Create display name using helper function
  const displayName = formatDisplayName(
    primaryName.givenName || '',
    primaryName.familyName || '',
    emails[0]?.value || '',
    phones[0]?.value || ''
  );

  // Create the base contact object
  const contactData = {
    resourceName: person.resourceName,
    etag: person.etag,
    displayName: displayName,

    // Extended name fields
    prefix: primaryName.honorificPrefix || '',
    givenName: primaryName.givenName || '',
    middleName: primaryName.middleName || '',
    familyName: primaryName.familyName || '',
    suffix: primaryName.honorificSuffix || '',
    phoneticFirst: primaryName.phoneticGivenName || '',
    phoneticMiddle: primaryName.phoneticMiddleName || '',
    phoneticLast: primaryName.phoneticFamilyName || '',
    nickname: nicknames[0]?.value || '',
    fileAs: primaryName.displayNameLastFirst || '',

    // 10 emails with labels
    primaryEmail: getEmailByIndex(0),
    primaryEmailLabel: getEmailLabelByIndex(0),
    email2: getEmailByIndex(1),
    email2Label: getEmailLabelByIndex(1),
    email3: getEmailByIndex(2),
    email3Label: getEmailLabelByIndex(2),
    email4: getEmailByIndex(3),
    email4Label: getEmailLabelByIndex(3),
    email5: getEmailByIndex(4),
    email5Label: getEmailLabelByIndex(4),
    email6: getEmailByIndex(5),
    email6Label: getEmailLabelByIndex(5),
    email7: getEmailByIndex(6),
    email7Label: getEmailLabelByIndex(6),
    email8: getEmailByIndex(7),
    email8Label: getEmailLabelByIndex(7),
    email9: getEmailByIndex(8),
    email9Label: getEmailLabelByIndex(8),
    email10: getEmailByIndex(9),
    email10Label: getEmailLabelByIndex(9),

    // 10 phones with labels
    primaryPhone: getPhoneByIndex(0),
    primaryPhoneLabel: getPhoneLabelByIndex(0),
    phone2: getPhoneByIndex(1),
    phone2Label: getPhoneLabelByIndex(1),
    phone3: getPhoneByIndex(2),
    phone3Label: getPhoneLabelByIndex(2),
    phone4: getPhoneByIndex(3),
    phone4Label: getPhoneLabelByIndex(3),
    phone5: getPhoneByIndex(4),
    phone5Label: getPhoneLabelByIndex(4),
    phone6: getPhoneByIndex(5),
    phone6Label: getPhoneLabelByIndex(5),
    phone7: getPhoneByIndex(6),
    phone7Label: getPhoneLabelByIndex(6),
    phone8: getPhoneByIndex(7),
    phone8Label: getPhoneLabelByIndex(7),
    phone9: getPhoneByIndex(8),
    phone9Label: getPhoneLabelByIndex(8),
    phone10: getPhoneByIndex(9),
    phone10Label: getPhoneLabelByIndex(9),

    // Organization info
    company: organizations[0]?.name || '',
    jobTitle: organizations[0]?.title || '',
    department: organizations[0]?.department || '',

    // 5 addresses (spread all address fields)
    ...getAddressByIndex(0),
    ...getAddressByIndex(1),
    ...getAddressByIndex(2),
    ...getAddressByIndex(3),
    ...getAddressByIndex(4),

    // Additional info
    notes: biographies[0]?.value || '',
    website: urls[0]?.value || '',

    // Birthday as proper date format
    birthday: birthdays[0] ? formatDate(`${birthdays[0].date?.year || 1900}-${birthdays[0].date?.month || 1}-${birthdays[0].date?.day || 1}`) : '',

    // 10 significant dates
    significantDate1: getSignificantDateByIndex(0).date,
    significantDate1Label: getSignificantDateByIndex(0).label,
    significantDate2: getSignificantDateByIndex(1).date,
    significantDate2Label: getSignificantDateByIndex(1).label,
    significantDate3: getSignificantDateByIndex(2).date,
    significantDate3Label: getSignificantDateByIndex(2).label,
    significantDate4: getSignificantDateByIndex(3).date,
    significantDate4Label: getSignificantDateByIndex(3).label,
    significantDate5: getSignificantDateByIndex(4).date,
    significantDate5Label: getSignificantDateByIndex(4).label,
    significantDate6: getSignificantDateByIndex(5).date,
    significantDate6Label: getSignificantDateByIndex(5).label,
    significantDate7: getSignificantDateByIndex(6).date,
    significantDate7Label: getSignificantDateByIndex(6).label,
    significantDate8: getSignificantDateByIndex(7).date,
    significantDate8Label: getSignificantDateByIndex(7).label,
    significantDate9: getSignificantDateByIndex(8).date,
    significantDate9Label: getSignificantDateByIndex(8).label,
    significantDate10: getSignificantDateByIndex(9).date,
    significantDate10Label: getSignificantDateByIndex(9).label,

    // Related people as comma-separated string
    relatedPeople: formatRelatedPeople(),

    // 10 custom fields
    customField1: getCustomFieldByIndex(0).value,
    customField1Label: getCustomFieldByIndex(0).label,
    customField2: getCustomFieldByIndex(1).value,
    customField2Label: getCustomFieldByIndex(1).label,
    customField3: getCustomFieldByIndex(2).value,
    customField3Label: getCustomFieldByIndex(2).label,
    customField4: getCustomFieldByIndex(3).value,
    customField4Label: getCustomFieldByIndex(3).label,
    customField5: getCustomFieldByIndex(4).value,
    customField5Label: getCustomFieldByIndex(4).label,
    customField6: getCustomFieldByIndex(5).value,
    customField6Label: getCustomFieldByIndex(5).label,
    customField7: getCustomFieldByIndex(6).value,
    customField7Label: getCustomFieldByIndex(6).label,
    customField8: getCustomFieldByIndex(7).value,
    customField8Label: getCustomFieldByIndex(7).label,
    customField9: getCustomFieldByIndex(8).value,
    customField9Label: getCustomFieldByIndex(8).label,
    customField10: getCustomFieldByIndex(9).value,
    customField10Label: getCustomFieldByIndex(9).label,

    // Read-only fields
    memberships: memberships,
    photoUrl: photoUrl,
    lastModified: person.metadata?.sources?.[0]?.updateTime,
    contactType: contactType
  };

  // Add compiled lists (after all individual fields are set)
  const allEmails = [];
  const allPhones = [];

  // Get primary email (special case)
  const primaryEmail = contactData["primaryEmail"];
  if (primaryEmail && primaryEmail.trim() && isValidEmail(primaryEmail)) {
    allEmails.push(primaryEmail.trim());
  }

  // Get emails 2-10
  for (let i = 2; i <= 10; i++) {
    const email = contactData[`email${i}`];
    if (email && email.trim() && isValidEmail(email)) {
      allEmails.push(email.trim());
    }
  }

  // Get primary phone (special case)  
  const primaryPhone = contactData["primaryPhone"];
  if (primaryPhone && primaryPhone.trim()) {
    allPhones.push(primaryPhone.trim());
  }

  // Get phones 2-10
  for (let i = 2; i <= 10; i++) {
    const phone = contactData[`phone${i}`];
    if (phone && phone.trim()) {
      allPhones.push(phone.trim());
    }
  }

  // Add to contactData with de-duplication using filter
  (contactData as any).allEmails = allEmails.filter((email, index) => allEmails.indexOf(email) === index);
  (contactData as any).allPhones = allPhones.filter((phone, index) => allPhones.indexOf(phone) === index);

  return contactData;
}


async function updateContact(context: any, update: any): Promise<any> {
  try {
    const { previousValue, newValue } = update;
    const { resourceName, etag } = previousValue;

    if (previousValue.contactType === "OTHER_CONTACT") {
      throw new coda.UserVisibleError("Can't edit Other contacts. Copy them first using CopyOtherContactToContacts.");
    }

    const updateData: any = {};
    const updateMask: string[] = [];

    // Handle extended name changes
    const nameFields = ['givenName', 'familyName', 'displayName', 'middleName', 'prefix', 'suffix', 'phoneticFirst', 'phoneticMiddle', 'phoneticLast', 'fileAs'];
    const nameChanged = nameFields.some(field => newValue[field] !== undefined);

    if (nameChanged) {
      const givenName = newValue.givenName !== undefined ? newValue.givenName : previousValue.givenName || "";
      const familyName = newValue.familyName !== undefined ? newValue.familyName : previousValue.familyName || "";
      const middleName = newValue.middleName !== undefined ? newValue.middleName : previousValue.middleName || "";
      const displayName = newValue.displayName !== undefined ? newValue.displayName : formatDisplayName(givenName, familyName, previousValue.primaryEmail, previousValue.primaryPhone);
      const prefix = newValue.prefix !== undefined ? newValue.prefix : previousValue.prefix || "";
      const suffix = newValue.suffix !== undefined ? newValue.suffix : previousValue.suffix || "";
      const phoneticFirst = newValue.phoneticFirst !== undefined ? newValue.phoneticFirst : previousValue.phoneticFirst || "";
      const phoneticMiddle = newValue.phoneticMiddle !== undefined ? newValue.phoneticMiddle : previousValue.phoneticMiddle || "";
      const phoneticLast = newValue.phoneticLast !== undefined ? newValue.phoneticLast : previousValue.phoneticLast || "";
      const fileAs = newValue.fileAs !== undefined ? newValue.fileAs : previousValue.fileAs || "";

      updateData.names = [{
        givenName: givenName,
        familyName: familyName,
        middleName: middleName,
        displayName: displayName,
        honorificPrefix: prefix,
        honorificSuffix: suffix,
        phoneticGivenName: phoneticFirst,
        phoneticMiddleName: phoneticMiddle,
        phoneticFamilyName: phoneticLast,
        displayNameLastFirst: fileAs
      }];
      updateMask.push("names");
    }

    // Handle nickname changes
    if (newValue.nickname !== undefined) {
      updateData.nicknames = newValue.nickname ? [{ value: newValue.nickname }] : [];
      updateMask.push("nicknames");
    }

    // Handle email updates - support all 10 emails
    const emailFields = ['primaryEmail', 'email2', 'email3', 'email4', 'email5', 'email6', 'email7', 'email8', 'email9', 'email10'];
    const emailLabelFields = ['primaryEmailLabel', 'email2Label', 'email3Label', 'email4Label', 'email5Label', 'email6Label', 'email7Label', 'email8Label', 'email9Label', 'email10Label'];
    const emailsChanged = emailFields.some(field => newValue[field] !== undefined) ||
      emailLabelFields.some(field => newValue[field] !== undefined);

    if (emailsChanged) {
      let emails = [];

      // Handle all 10 emails
      for (let i = 0; i < 10; i++) {
        const emailValue = newValue[emailFields[i]] !== undefined ? newValue[emailFields[i]] : previousValue[emailFields[i]];
        const labelValue = newValue[emailLabelFields[i]] !== undefined ? newValue[emailLabelFields[i]] : previousValue[emailLabelFields[i]];

        if (emailValue && isValidEmail(emailValue)) {
          emails.push({
            value: normalizeEmail(emailValue),
            type: mapLabelToGoogleType(labelValue || 'other', 'email'),
            metadata: { primary: i === 0 } // First email is primary
          });
        }
      }

      // Deduplicate emails
      emails = deduplicateContactFields(emails);
      updateData.emailAddresses = emails;
      updateMask.push("emailAddresses");
    }

    // Handle phone updates - support all 10 phones
    const phoneFields = ['primaryPhone', 'phone2', 'phone3', 'phone4', 'phone5', 'phone6', 'phone7', 'phone8', 'phone9', 'phone10'];
    const phoneLabelFields = ['primaryPhoneLabel', 'phone2Label', 'phone3Label', 'phone4Label', 'phone5Label', 'phone6Label', 'phone7Label', 'phone8Label', 'phone9Label', 'phone10Label'];
    const phonesChanged = phoneFields.some(field => newValue[field] !== undefined) ||
      phoneLabelFields.some(field => newValue[field] !== undefined);

    if (phonesChanged) {
      let phones = [];

      // Handle all 10 phones
      for (let i = 0; i < 10; i++) {
        const phoneValue = newValue[phoneFields[i]] !== undefined ? newValue[phoneFields[i]] : previousValue[phoneFields[i]];
        const labelValue = newValue[phoneLabelFields[i]] !== undefined ? newValue[phoneLabelFields[i]] : previousValue[phoneLabelFields[i]];

        if (phoneValue && isValidPhone(phoneValue)) {
          phones.push({
            value: normalizePhoneNumber(phoneValue),
            type: mapLabelToGoogleType(labelValue || 'other', 'phone'),
            metadata: { primary: i === 0 } // First phone is primary
          });
        }
      }

      // Deduplicate phones
      phones = deduplicateContactFields(phones);
      updateData.phoneNumbers = phones;
      updateMask.push("phoneNumbers");
    }

    // Handle organization updates
    if (newValue.company !== undefined || newValue.jobTitle !== undefined || newValue.department !== undefined) {
      const company = newValue.company !== undefined ? newValue.company : previousValue.company || "";
      const jobTitle = newValue.jobTitle !== undefined ? newValue.jobTitle : previousValue.jobTitle || "";
      const department = newValue.department !== undefined ? newValue.department : previousValue.department || "";

      if (company || jobTitle || department) {
        updateData.organizations = [{
          name: company,
          title: jobTitle,
          department: department
        }];
      } else {
        updateData.organizations = [];
      }
      updateMask.push("organizations");
    }

    // Handle address updates - support all 5 addresses
    const addressFields = [
      // Primary address fields
      'primaryAddressStreet', 'primaryAddressStreet2', 'primaryAddressCity',
      'primaryAddressPostcode', 'primaryAddressCountry', 'primaryAddressPOBox', 'primaryAddressLabel',
      // All other address fields
      'address2Street', 'address2Street2', 'address2City',
      'address2Postcode', 'address2Country', 'address2POBox', 'address2Label',
      'address3Street', 'address3Street2', 'address3City',
      'address3Postcode', 'address3Country', 'address3POBox', 'address3Label',
      'address4Street', 'address4Street2', 'address4City',
      'address4Postcode', 'address4Country', 'address4POBox', 'address4Label',
      'address5Street', 'address5Street2', 'address5City',
      'address5Postcode', 'address5Country', 'address5POBox', 'address5Label'
    ];


    const addressesChanged = addressFields.some(field => newValue[field] !== undefined);

    if (addressesChanged) {
      let addresses = [];

      // Handle primary address (special case)
      const primaryStreet = newValue.primaryAddressStreet !== undefined ? newValue.primaryAddressStreet : previousValue.primaryAddressStreet;
      const primaryStreet2 = newValue.primaryAddressStreet2 !== undefined ? newValue.primaryAddressStreet2 : previousValue.primaryAddressStreet2;
      const primaryCity = newValue.primaryAddressCity !== undefined ? newValue.primaryAddressCity : previousValue.primaryAddressCity;
      const primaryPostcode = newValue.primaryAddressPostcode !== undefined ? newValue.primaryAddressPostcode : previousValue.primaryAddressPostcode;
      const primaryCountry = newValue.primaryAddressCountry !== undefined ? newValue.primaryAddressCountry : previousValue.primaryAddressCountry;
      const primaryPoBox = newValue.primaryAddressPOBox !== undefined ? newValue.primaryAddressPOBox : previousValue.primaryAddressPOBox;
      const primaryLabel = newValue.primaryAddressLabel !== undefined ? newValue.primaryAddressLabel : previousValue.primaryAddressLabel;

      if (hasAddressContent(primaryStreet, primaryStreet2, primaryCity, primaryPostcode, primaryCountry, primaryPoBox)) {
        addresses.push({
          streetAddress: cleanAddressComponent(primaryStreet || ''),
          extendedAddress: cleanAddressComponent(primaryStreet2 || ''),
          city: cleanAddressComponent(primaryCity || ''),
          postalCode: cleanAddressComponent(primaryPostcode || ''),
          country: convertCountryNameToCode(primaryCountry || ''), // Convert Denmark → DK
          countryCode: convertCountryNameToCode(primaryCountry || ''), // Also set countryCode field
          poBox: cleanAddressComponent(primaryPoBox || ''),
          type: mapLabelToGoogleType(primaryLabel || 'other', 'address'),
          metadata: { primary: true }
        });
      }

      // Handle addresses from 2 to 5
      for (let i = 2; i <= 5; i++) {
        const street = newValue[`address${i}Street`] !== undefined ? newValue[`address${i}Street`] : previousValue[`address${i}Street`];
        const street2 = newValue[`address${i}Street2`] !== undefined ? newValue[`address${i}Street2`] : previousValue[`address${i}Street2`];
        const city = newValue[`address${i}City`] !== undefined ? newValue[`address${i}City`] : previousValue[`address${i}City`];
        const postcode = newValue[`address${i}Postcode`] !== undefined ? newValue[`address${i}Postcode`] : previousValue[`address${i}Postcode`];
        const country = newValue[`address${i}Country`] !== undefined ? newValue[`address${i}Country`] : previousValue[`address${i}Country`];
        const poBox = newValue[`address${i}POBox`] !== undefined ? newValue[`address${i}POBox`] : previousValue[`address${i}POBox`];
        const label = newValue[`address${i}Label`] !== undefined ? newValue[`address${i}Label`] : previousValue[`address${i}Label`];

        if (hasAddressContent(street, street2, city, postcode, country, poBox)) {
          addresses.push({
            streetAddress: cleanAddressComponent(street || ''),
            extendedAddress: cleanAddressComponent(street2 || ''),
            city: cleanAddressComponent(city || ''),
            postalCode: cleanAddressComponent(postcode || ''),
            country: convertCountryNameToCode(country || ''), // Convert Denmark → DK
            countryCode: convertCountryNameToCode(country || ''), // Also set countryCode field
            poBox: cleanAddressComponent(poBox || ''),
            type: mapLabelToGoogleType(label || 'other', 'address'),
            metadata: { primary: false } // Secondary addresses are not primary
          });
        }
      }
      updateData.addresses = addresses;
      updateMask.push("addresses");
    }


    // Handle notes
    if (newValue.notes !== undefined) {
      updateData.biographies = newValue.notes ? [{ value: newValue.notes, contentType: "TEXT_PLAIN" }] : [];
      updateMask.push("biographies");
    }

    // Handle website
    if (newValue.website !== undefined) {
      updateData.urls = newValue.website ? [{ value: newValue.website }] : [];
      updateMask.push("urls");
    }

    // Handle birthday
    if (newValue.birthday !== undefined) {
      if (newValue.birthday) {
        const googleDate = createGoogleDate(newValue.birthday);
        updateData.birthdays = googleDate ? [{ date: googleDate }] : [];
      } else {
        updateData.birthdays = [];
      }
      updateMask.push("birthdays");
    }

    // Handle significant dates - support all 10 dates
    const significantDateFields = ['significantDate1', 'significantDate2', 'significantDate3', 'significantDate4', 'significantDate5',
      'significantDate6', 'significantDate7', 'significantDate8', 'significantDate9', 'significantDate10'];
    const significantDateLabelFields = ['significantDate1Label', 'significantDate2Label', 'significantDate3Label', 'significantDate4Label', 'significantDate5Label',
      'significantDate6Label', 'significantDate7Label', 'significantDate8Label', 'significantDate9Label', 'significantDate10Label'];
    const significantDatesChanged = significantDateFields.some(field => newValue[field] !== undefined) ||
      significantDateLabelFields.some(field => newValue[field] !== undefined);

    if (significantDatesChanged) {
      let events = [];
      for (let i = 0; i < 10; i++) {
        const dateValue = newValue[significantDateFields[i]] !== undefined ? newValue[significantDateFields[i]] : previousValue[significantDateFields[i]];
        const labelValue = newValue[significantDateLabelFields[i]] !== undefined ? newValue[significantDateLabelFields[i]] : previousValue[significantDateLabelFields[i]];

        if (dateValue) {
          const googleDate = createGoogleDate(dateValue);
          if (googleDate) {
            events.push({
              date: googleDate,
              type: labelValue || 'other'
            });
          }
        }
      }
      updateData.events = events;
      updateMask.push("events");
    }

    // Handle related people - parse comma-separated format
    if (newValue.relatedPeople !== undefined) {
      let relations = [];
      if (newValue.relatedPeople && newValue.relatedPeople.trim()) {
        const relatedList = newValue.relatedPeople.split(',');
        relations = relatedList.map((rel: string) => {
          const parts = rel.trim().split(':');
          if (parts.length >= 2) {
            return {
              person: parts[0].trim(),
              type: parts[1].trim()
            };
          } else if (parts.length === 1 && parts[0].trim()) {
            return {
              person: parts[0].trim(),
              type: 'friend'
            };
          }
          return null;
        }).filter(Boolean);
      }
      updateData.relations = relations;
      updateMask.push("relations");
    }

    // Handle custom fields - support all 10 custom fields
    const customFields = ['customField1', 'customField2', 'customField3', 'customField4', 'customField5',
      'customField6', 'customField7', 'customField8', 'customField9', 'customField10'];
    const customFieldLabels = ['customField1Label', 'customField2Label', 'customField3Label', 'customField4Label', 'customField5Label',
      'customField6Label', 'customField7Label', 'customField8Label', 'customField9Label', 'customField10Label'];
    const customFieldsChanged = customFields.some(field => newValue[field] !== undefined) ||
      customFieldLabels.some(field => newValue[field] !== undefined);

    if (customFieldsChanged) {
      let userDefined = [];
      for (let i = 0; i < 10; i++) {
        const fieldValue = newValue[customFields[i]] !== undefined ? newValue[customFields[i]] : previousValue[customFields[i]];
        const labelValue = newValue[customFieldLabels[i]] !== undefined ? newValue[customFieldLabels[i]] : previousValue[customFieldLabels[i]];

        if (fieldValue) {
          userDefined.push({
            key: labelValue || `Custom Field ${i + 1}`,
            value: fieldValue.toString().trim()
          });
        }
      }
      updateData.userDefined = userDefined;
      updateMask.push("userDefined");
    }

    if (updateMask.length === 0) {
      console.log(`No changes detected for contact: ${resourceName}`);
      return previousValue;
    }

    // Validate the update data before sending
    const validation = validateContactData(updateData);
    if (!validation.isValid) {
      throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
    }

    console.log(`Updating contact ${resourceName} with fields: ${updateMask.join(", ")}`);

    const response = await context.fetcher.fetch({
      method: "PATCH",
      url: `https://people.googleapis.com/v1/${resourceName}:updateContact?updatePersonFields=${updateMask.join(",")}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updateData, etag: etag })
    });

    const updatedContact = extractContactData(response.body);
    console.log(`Successfully updated contact: ${resourceName}`);
    return updatedContact;

  } catch (error) {
    console.log(`Error updating contact ${update.previousValue.resourceName}: ${error.message}`);
    if (error.statusCode === 400) {
      throw new coda.UserVisibleError(`Invalid data for update: ${error.message}`);
    } else if (error.statusCode === 401) {
      throw new coda.UserVisibleError('Authentication failed. Please reconnect your Google account.');
    } else if (error.statusCode === 403) {
      throw new coda.UserVisibleError('Permission denied. Please check your Google Contacts permissions.');
    } else if (error.statusCode === 404) {
      throw new coda.UserVisibleError(`Contact not found: ${update.previousValue.resourceName}`);
    } else if (error.statusCode === 409) {
      throw new coda.UserVisibleError('Contact was modified by another source. Please refresh and try again.');
    } else {
      throw new coda.UserVisibleError(`Failed to update contact: ${error.message}`);
    }
  }
}



//---------------------------------------------------------------------------------------------------------------------------//
// Sync Tables bellow - Both Contact Groups and Enhanced Contacts
//---------------------------------------------------------------------------------------------------------------------------//

// Contact Groups Schema
const ContactGroupSchema = coda.makeObjectSchema({
  properties: {
    resourceName: {
      type: coda.ValueType.String,
      description: "The resource name of the contact group"
    },
    etag: {
      type: coda.ValueType.String,
      description: "The ETag of the contact group"
    },
    name: {
      type: coda.ValueType.String,
      description: "The name of the contact group"
    },
    formattedName: {
      type: coda.ValueType.String,
      description: "The formatted name of the contact group"
    },
    groupType: {
      type: coda.ValueType.String,
      description: "The type of the contact group"
    },
    memberCount: {
      type: coda.ValueType.Number,
      description: "The number of contacts in this group"
    },
    memberResourceNames: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Resource names of contacts in this group"
    }
  },
  displayProperty: "formattedName",
  idProperty: "resourceName",
  featuredProperties: ["formattedName", "memberCount", "groupType"]
});

// Helper function for logging operations
function logContactOperation(operation: string, resourceName: string, details?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Contact ${operation}: ${resourceName}`, details ? JSON.stringify(details, null, 2) : '');
}

// Contact Groups Sync Table
pack.addSyncTable({
  name: "ContactGroups",
  description: "Contact groups from Google Contacts",
  identityName: "ContactGroup",
  schema: ContactGroupSchema,
  formula: {
    name: "SyncContactGroups",
    description: "Sync contact groups",
    parameters: [],
    execute: async function ([], context) {
      try {
        logContactOperation('SYNC_GROUPS_START', 'all');

        const response = await context.fetcher.fetch({
          method: "GET",
          url: "https://people.googleapis.com/v1/contactGroups?pageSize=1000",
          cacheTtlSecs: 300,
        });

        const groups = response.body.contactGroups || [];
        const results = [];

        for (const group of groups) {
          try {
            const detailResponse = await context.fetcher.fetch({
              method: "GET",
              url: `https://people.googleapis.com/v1/${group.resourceName}?maxMembers=10000`
            });

            const detailGroup = detailResponse.body;
            results.push({
              resourceName: group.resourceName,
              etag: group.etag,
              name: group.name,
              formattedName: group.formattedName,
              groupType: group.groupType,
              memberCount: detailGroup.memberCount || 0,
              memberResourceNames: detailGroup.memberResourceNames || []
            });
          } catch (detailError) {
            console.log(`Failed to get group details for ${group.resourceName}: ${detailError.message}`);
            results.push({
              resourceName: group.resourceName,
              etag: group.etag,
              name: group.name,
              formattedName: group.formattedName,
              groupType: group.groupType,
              memberCount: 0,
              memberResourceNames: []
            });
          }
        }

        logContactOperation('SYNC_GROUPS_SUCCESS', 'all', { groupCount: results.length });
        return { result: results };
      } catch (error) {
        throw new coda.UserVisibleError(`Failed to sync contact groups: ${error.message}`);
      }
    }
  }
});

// Main Contacts Sync Table with Two-Way Sync
pack.addSyncTable({
  name: "EnhancedContacts",
  description: "Google Contacts with comprehensive two-way sync (10 emails, 10 phones, 5 addresses, extended name fields, compiled lists, etc.)",
  identityName: "Contact",
  schema: ContactSchemaComplete,
  formula: {
    name: "SyncEnhancedContacts",
    description: "Sync contacts with extended fields including compiled email and phone lists",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "contactTypeFilter",
        description: "Filter: 'CONTACT', 'OTHER_CONTACT', or leave empty for all",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "groupFilter",
        description: "Group resource name (regular contacts only)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "maxResults",
        description: "Max contacts (default: 1000)",
        optional: true,
      }),
    ],
    execute: async function ([contactTypeFilter, groupFilter, maxResults], context) {
      try {
        const limit = Math.min(maxResults || 1000, 2000);
        const results: any[] = [];

        logContactOperation('SYNC_CONTACTS_START', 'all', {
          contactTypeFilter,
          groupFilter,
          maxResults: limit
        });

        // Get the regular contacts
        if (!contactTypeFilter || contactTypeFilter === "CONTACT") {
          let url = "https://people.googleapis.com/v1/people/me/connections";
          const params = [
            `pageSize=${Math.min(1000, Math.floor(limit / 2))}`,
            "personFields=names,nicknames,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata,biographies,urls,events,relations,userDefined"
          ];
          url += "?" + params.join("&");

          let nextPageToken = null;
          let pageCount = 0;

          do {
            const pageUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;
            const response = await context.fetcher.fetch({
              method: "GET",
              url: pageUrl,
              cacheTtlSecs: 60,
            });

            const people = response.body.connections || [];
            nextPageToken = response.body.nextPageToken;
            pageCount++;

            for (const person of people) {
              try {
                const contactData = extractContactData(person);

                if (groupFilter && !contactData.memberships.includes(groupFilter)) {
                  continue;
                }

                if (contactData.contactType === "CONTACT") {
                  results.push(contactData);
                }

                if (results.length >= limit) break;
              } catch (extractError) {
                console.log(`Failed to extract contact data for ${person.resourceName}: ${extractError.message}`);
              }
            }

            if (pageCount > 10) break; // Safety limit
          } while (nextPageToken && results.length < limit);
        }

        // Get the "other contacts" (those that Gmail auto-creates based on your interactions, they will stopappearing if you do not interatct with the email addresses)
        if ((!contactTypeFilter || contactTypeFilter === "OTHER_CONTACT") && results.length < limit) {
          let url = "https://people.googleapis.com/v1/otherContacts";
          const params = [
            `pageSize=${Math.min(1000, limit - results.length)}`,
            "readMask=names,emailAddresses,phoneNumbers,photos,metadata"
          ];
          url += "?" + params.join("&");

          let nextPageToken = null;
          let pageCount = 0;

          do {
            const pageUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;
            const response = await context.fetcher.fetch({
              method: "GET",
              url: pageUrl,
              cacheTtlSecs: 60,
            });

            const people = response.body.otherContacts || [];
            nextPageToken = response.body.nextPageToken;
            pageCount++;

            for (const person of people) {
              try {
                const contactData = extractContactData(person);
                contactData.contactType = "OTHER_CONTACT";
                results.push(contactData);

                if (results.length >= limit) break;
              } catch (extractError) {
                console.log(`Failed to extract other contact data for ${person.resourceName}: ${extractError.message}`);
              }
            }

            if (pageCount > 10) break;
          } while (nextPageToken && results.length < limit);
        }

        logContactOperation('SYNC_CONTACTS_SUCCESS', 'all', {
          contactCount: results.length,
          contactTypes: contactTypeFilter || 'all'
        });

        return { result: results };
      } catch (error) {
        throw new coda.UserVisibleError(`Failed to sync contacts: ${error.message}`);
      }
    },

    maxUpdateBatchSize: 10,

    executeUpdate: async function (args, updates, context) {
      const jobs = updates.map(async (update) => {
        try {
          return await updateContact(context, update);
        } catch (error) {
          console.log(`Failed to update contact ${update.previousValue.resourceName}: ${error.message}`);
          return error;
        }
      });

      const completed = await Promise.allSettled(jobs);

      const results = completed.map((job) => {
        if (job.status === "fulfilled") {
          return job.value;
        } else {
          return job.reason;
        }
      });

      const successCount = results.filter(r => r && r.resourceName).length;
      const errorCount = results.filter(r => r instanceof Error).length;

      logContactOperation('BATCH_UPDATE_COMPLETE', 'batch', {
        total: updates.length,
        success: successCount,
        errors: errorCount
      });

      return { result: results };
    }
  }
});

//---------------------------------------------------------------------------------------------------------------------------//
// FORMULAS BELOW
//---------------------------------------------------------------------------------------------------------------------------//

// Create a comprehensive contact with all fields
pack.addFormula({
  name: "CreateComprehensiveContact",
  description: "Create a contact with comprehensive field support",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryEmail",
      description: "Primary email",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryPhone",
      description: "Primary phone",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "company",
      description: "Company",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Notes",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchemaComplete,
  isAction: true,
  execute: async function ([givenName, familyName, primaryEmail, primaryPhone, company, notes], context) {
    try {
      if (!givenName || !givenName.trim()) {
        throw new coda.UserVisibleError("First name is required");
      }

      const contactData: any = {
        names: [{
          givenName: givenName.trim(),
          familyName: familyName ? familyName.trim() : ""
        }]
      };

      if (primaryEmail && isValidEmail(primaryEmail)) {
        contactData.emailAddresses = [{
          value: normalizeEmail(primaryEmail),
          type: 'other',
          metadata: { primary: true }
        }];
      }

      if (primaryPhone && isValidPhone(primaryPhone)) {
        contactData.phoneNumbers = [{
          value: normalizePhoneNumber(primaryPhone),
          type: 'other',
          metadata: { primary: true }
        }];
      }

      if (company && company.trim()) {
        contactData.organizations = [{ name: company.trim() }];
      }

      if (notes && notes.trim()) {
        contactData.biographies = [{
          value: notes.trim(),
          contentType: "TEXT_PLAIN"
        }];
      }

      // Validate the contact data
      const validation = validateContactData(contactData);
      if (!validation.isValid) {
        throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
      }

      logContactOperation('CREATE_CONTACT_START', givenName);

      const createResponse = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });

      const createdContact = extractContactData(createResponse.body);
      logContactOperation('CREATE_CONTACT_SUCCESS', createdContact.resourceName);
      return createdContact;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to create contact: ${error.message}`);
    }
  }
});

// Search contacts
pack.addFormula({
  name: "SearchContacts",
  description: "Search contacts by name or email",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "query",
      description: "Search query"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "limit",
      description: "Max results (default: 25)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Array,
  items: ContactSchemaComplete,
  execute: async function ([query, limit], context) {
    try {
      if (!query || !query.trim()) {
        throw new coda.UserVisibleError("Search query cannot be empty");
      }

      const maxResults = Math.min(limit || 25, 100);

      logContactOperation('SEARCH_CONTACTS_START', query, { maxResults });

      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/people:searchContacts?query=${encodeURIComponent(query.trim())}&pageSize=${maxResults}&readMask=names,nicknames,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata,biographies,urls,events,relations,userDefined`
      });

      const results = response.body.results || [];
      const contacts = results.map((result: any) => extractContactData(result.person));

      logContactOperation('SEARCH_CONTACTS_SUCCESS', query, { resultCount: contacts.length });
      return contacts;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to search contacts: ${error.message}`);
    }
  }
});

// Delete contact
pack.addFormula({
  name: "DeleteContact",
  description: "Delete a contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName], context) {
    try {
      logContactOperation('DELETE_CONTACT_START', resourceName);

      await context.fetcher.fetch({
        method: "DELETE",
        url: `https://people.googleapis.com/v1/${resourceName}:deleteContact`
      });

      logContactOperation('DELETE_CONTACT_SUCCESS', resourceName);
      return `Contact deleted: ${resourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to delete contact: ${error.message}`);
    }
  }
});

// Copy Other Contact to Main Contacts
pack.addFormula({
  name: "CopyOtherContactToContacts",
  description: "Copy an 'Other Contact' to your main contacts list",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Resource name of the Other Contact to copy"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchemaComplete,
  isAction: true,
  execute: async function ([resourceName], context) {
    try {
      logContactOperation('COPY_OTHER_CONTACT_START', resourceName);

      const response = await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${resourceName}:copyOtherContactToMyContactsGroup`
      });

      const copiedContact = extractContactData(response.body);
      logContactOperation('COPY_OTHER_CONTACT_SUCCESS', copiedContact.resourceName);
      return copiedContact;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to copy Other Contact: ${error.message}`);
    }
  }
});

// Update Contact Photo
pack.addFormula({
  name: "UpdateContactPhoto",
  description: "Update a contact's photo",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "photoData",
      description: "Base64 encoded photo data"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName, photoData], context) {
    try {
      logContactOperation('UPDATE_PHOTO_START', resourceName);

      await context.fetcher.fetch({
        method: "PATCH",
        url: `https://people.googleapis.com/v1/${resourceName}:updateContactPhoto`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoBytes: photoData })
      });

      logContactOperation('UPDATE_PHOTO_SUCCESS', resourceName);
      return `Photo updated for contact: ${resourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to update photo: ${error.message}`);
    }
  }
});

// Delete Contact Photo
pack.addFormula({
  name: "DeleteContactPhoto",
  description: "Delete a contact's photo",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName], context) {
    try {
      logContactOperation('DELETE_PHOTO_START', resourceName);

      await context.fetcher.fetch({
        method: "DELETE",
        url: `https://people.googleapis.com/v1/${resourceName}:deleteContactPhoto`
      });

      logContactOperation('DELETE_PHOTO_SUCCESS', resourceName);
      return `Photo deleted for contact: ${resourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to delete photo: ${error.message}`);
    }
  }
});

// Create Contact Group
pack.addFormula({
  name: "CreateContactGroup",
  description: "Create a new contact group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Name of the contact group"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactGroupSchema,
  isAction: true,
  execute: async function ([name], context) {
    try {
      if (!name || !name.trim()) {
        throw new coda.UserVisibleError("Group name is required");
      }

      logContactOperation('CREATE_GROUP_START', name);

      const response = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/contactGroups",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactGroup: {
            name: name.trim()
          }
        })
      });

      const group = response.body;
      const result = {
        resourceName: group.resourceName,
        etag: group.etag,
        name: group.name,
        formattedName: group.formattedName,
        groupType: group.groupType,
        memberCount: 0,
        memberResourceNames: []
      };

      logContactOperation('CREATE_GROUP_SUCCESS', result.resourceName);
      return result;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to create contact group: ${error.message}`);
    }
  }
});

// Update Contact Group Name
pack.addFormula({
  name: "UpdateContactGroupName",
  description: "Update a contact group's name",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "newName",
      description: "New name for the contact group"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "etag",
      description: "ETag of the contact group"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName, newName, etag], context) {
    try {
      if (!newName || !newName.trim()) {
        throw new coda.UserVisibleError("New group name is required");
      }

      logContactOperation('UPDATE_GROUP_START', resourceName);

      await context.fetcher.fetch({
        method: "PUT",
        url: `https://people.googleapis.com/v1/${resourceName}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactGroup: {
            name: newName.trim(),
            etag: etag
          }
        })
      });

      logContactOperation('UPDATE_GROUP_SUCCESS', resourceName);
      return `Contact group name updated: ${resourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to update contact group name: ${error.message}`);
    }
  }
});

// Delete Contact Group
pack.addFormula({
  name: "DeleteContactGroup",
  description: "Delete a contact group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "deleteContacts",
      description: "Whether to delete all contacts in the group",
      optional: true
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName, deleteContacts], context) {
    try {
      logContactOperation('DELETE_GROUP_START', resourceName);

      const url = `https://people.googleapis.com/v1/${resourceName}${deleteContacts ? '?deleteContacts=true' : ''}`;

      await context.fetcher.fetch({
        method: "DELETE",
        url: url
      });

      logContactOperation('DELETE_GROUP_SUCCESS', resourceName);
      return `Contact group deleted: ${resourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to delete contact group: ${error.message}`);
    }
  }
});

// Add Contact to Group
pack.addFormula({
  name: "AddContactToGroup",
  description: "Add a contact to a contact group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "groupResourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceName], context) {
    try {
      logContactOperation('ADD_TO_GROUP_START', contactResourceName, { group: groupResourceName });

      await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${groupResourceName}/members:modify`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceNamesToAdd: [contactResourceName]
        })
      });

      logContactOperation('ADD_TO_GROUP_SUCCESS', contactResourceName, { group: groupResourceName });
      return `Contact added to group: ${contactResourceName} → ${groupResourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to add contact to group: ${error.message}`);
    }
  }
});

// Remove Contact from Group
pack.addFormula({
  name: "RemoveContactFromGroup",
  description: "Remove a contact from a contact group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "groupResourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceName], context) {
    try {
      logContactOperation('REMOVE_FROM_GROUP_START', contactResourceName, { group: groupResourceName });

      await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${groupResourceName}/members:modify`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceNamesToRemove: [contactResourceName]
        })
      });

      logContactOperation('REMOVE_FROM_GROUP_SUCCESS', contactResourceName, { group: groupResourceName });
      return `Contact removed from group: ${contactResourceName} ← ${groupResourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to remove contact from group: ${error.message}`);
    }
  }
});

// Get Contact Details (for debugging or detailed view)
pack.addFormula({
  name: "GetContactDetails",
  description: "Get detailed information about a specific contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchemaComplete,
  execute: async function ([resourceName], context) {
    try {
      logContactOperation('GET_CONTACT_START', resourceName);

      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,nicknames,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata,biographies,urls,events,relations,userDefined`,
        cacheTtlSecs: 0
      });

      const contact = extractContactData(response.body);
      logContactOperation('GET_CONTACT_SUCCESS', resourceName);
      return contact;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to get contact details: ${error.message}`);
    }
  }
});

// Batch Add Contacts to Group
pack.addFormula({
  name: "BatchAddContactsToGroup",
  description: "Add multiple contacts to a group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "groupResourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceNames",
      description: "Comma-separated list of contact resource names"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceNames], context) {
    try {
      const resourceNames = contactResourceNames.split(',').map(name => name.trim()).filter(Boolean);

      if (resourceNames.length === 0) {
        throw new coda.UserVisibleError("At least one contact resource name is required");
      }

      logContactOperation('BATCH_ADD_TO_GROUP_START', groupResourceName, { contacts: resourceNames.length });

      await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${groupResourceName}/members:modify`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceNamesToAdd: resourceNames
        })
      });

      logContactOperation('BATCH_ADD_TO_GROUP_SUCCESS', groupResourceName, { contacts: resourceNames.length });
      return `${resourceNames.length} contacts added to group: ${groupResourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to batch add contacts to group: ${error.message}`);
    }
  }
});

// Batch Remove Contacts from Group
pack.addFormula({
  name: "BatchRemoveContactsFromGroup",
  description: "Remove multiple contacts from a group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "groupResourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceNames",
      description: "Comma-separated list of contact resource names"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceNames], context) {
    try {
      const resourceNames = contactResourceNames.split(',').map(name => name.trim()).filter(Boolean);

      if (resourceNames.length === 0) {
        throw new coda.UserVisibleError("At least one contact resource name is required");
      }

      logContactOperation('BATCH_REMOVE_FROM_GROUP_START', groupResourceName, { contacts: resourceNames.length });

      await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${groupResourceName}/members:modify`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceNamesToRemove: resourceNames
        })
      });

      logContactOperation('BATCH_REMOVE_FROM_GROUP_SUCCESS', groupResourceName, { contacts: resourceNames.length });
      return `${resourceNames.length} contacts removed from group: ${groupResourceName}`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to batch remove contacts from group: ${error.message}`);
    }
  }
});

// Create Contact with Multiple Fields
pack.addFormula({
  name: "CreateAdvancedContact",
  description: "Create a contact with multiple emails, phones, and other fields",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "emails",
      description: "Emails (format: 'primaryEmail:label1,email2:label2')",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phones",
      description: "Phones (format: 'primaryPhone:label1,phone2:label2')",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "company",
      description: "Company",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "jobTitle",
      description: "Job title",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Notes",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchemaComplete,
  isAction: true,
  execute: async function ([givenName, familyName, emails, phones, company, jobTitle, notes], context) {
    try {
      if (!givenName || !givenName.trim()) {
        throw new coda.UserVisibleError("First name is required");
      }

      const contactData: any = {
        names: [{
          givenName: givenName.trim(),
          familyName: familyName ? familyName.trim() : ""
        }]
      };

      // Parse emails
      if (emails && emails.trim()) {
        const emailList = emails.split(',').map(email => {
          const parts = email.trim().split(':');
          const emailValue = parts[0].trim();
          const label = parts.length > 1 ? parts[1].trim() : 'other';

          if (isValidEmail(emailValue)) {
            return {
              value: normalizeEmail(emailValue),
              type: mapLabelToGoogleType(label, 'email'),
              metadata: { primary: false }
            };
          }
          return null;
        }).filter(Boolean);

        if (emailList.length > 0) {
          emailList[0].metadata.primary = true; // First email is primary
          contactData.emailAddresses = deduplicateContactFields(emailList);
        }
      }

      // Parse phones
      if (phones && phones.trim()) {
        const phoneList = phones.split(',').map(phone => {
          const parts = phone.trim().split(':');
          const phoneValue = parts[0].trim();
          const label = parts.length > 1 ? parts[1].trim() : 'other';

          if (isValidPhone(phoneValue)) {
            return {
              value: normalizePhoneNumber(phoneValue),
              type: mapLabelToGoogleType(label, 'phone'),
              metadata: { primary: false }
            };
          }
          return null;
        }).filter(Boolean);

        if (phoneList.length > 0) {
          phoneList[0].metadata.primary = true; // First phone is primary
          contactData.phoneNumbers = deduplicateContactFields(phoneList);
        }
      }

      // Add organization
      if (company || jobTitle) {
        contactData.organizations = [{
          name: company ? company.trim() : "",
          title: jobTitle ? jobTitle.trim() : ""
        }];
      }

      // Add notes
      if (notes && notes.trim()) {
        contactData.biographies = [{
          value: notes.trim(),
          contentType: "TEXT_PLAIN"
        }];
      }

      // Validate the contact data
      const validation = validateContactData(contactData);
      if (!validation.isValid) {
        throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
      }

      logContactOperation('CREATE_ADVANCED_CONTACT_START', givenName);

      const createResponse = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });

      const createdContact = extractContactData(createResponse.body);
      logContactOperation('CREATE_ADVANCED_CONTACT_SUCCESS', createdContact.resourceName);
      return createdContact;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to create advanced contact: ${error.message}`);
    }
  }
});

// Batch Delete Contacts
pack.addFormula({
  name: "BatchDeleteContacts",
  description: "Delete multiple contacts",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceNames",
      description: "Comma-separated list of contact resource names"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceNames], context) {
    try {
      const contacts = resourceNames.split(',').map(name => name.trim()).filter(Boolean);

      if (contacts.length === 0) {
        throw new coda.UserVisibleError("At least one contact resource name is required");
      }

      logContactOperation('BATCH_DELETE_START', 'batch', { contacts: contacts.length });

      const deletePromises = contacts.map(async (resourceName) => {
        try {
          await context.fetcher.fetch({
            method: "DELETE",
            url: `https://people.googleapis.com/v1/${resourceName}:deleteContact`
          });
          return { success: true, resourceName };
        } catch (error) {
          return { success: false, resourceName, error: error.message };
        }
      });

      const results = await Promise.all(deletePromises);
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      logContactOperation('BATCH_DELETE_SUCCESS', 'batch', {
        total: contacts.length,
        successful,
        failed
      });

      return `Batch delete completed: ${successful} successful, ${failed} failed out of ${contacts.length} contacts`;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to batch delete contacts: ${error.message}`);
    }
  }
});

// Duplicate Contact
pack.addFormula({
  name: "DuplicateContact",
  description: "Create a duplicate of an existing contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Resource name of the contact to duplicate"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "suffix",
      description: "Suffix to add to the name (e.g., 'Copy', '2')",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchemaComplete,
  isAction: true,
  execute: async function ([resourceName, suffix], context) {
    try {
      logContactOperation('DUPLICATE_CONTACT_START', resourceName);

      // First get the original contact
      const getResponse = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,emailAddresses,phoneNumbers,organizations,addresses,birthdays,biographies,urls,events,relations,userDefined`,
      });

      const originalContact = getResponse.body;
      const suffixToAdd = suffix || "Copy";

      // Prepare the duplicate contact data
      const duplicateData: any = {};

      // Copy names with suffix
      if (originalContact.names && originalContact.names.length > 0) {
        const originalName = originalContact.names[0];
        duplicateData.names = [{
          givenName: originalName.givenName || "",
          familyName: originalName.familyName ? `${originalName.familyName} ${suffixToAdd}` : suffixToAdd,
          middleName: originalName.middleName || ""
        }];
      }

      // Copy other fields (excluding photos and metadata)
      if (originalContact.emailAddresses) {
        duplicateData.emailAddresses = originalContact.emailAddresses.map((email: any) => ({
          value: email.value,
          type: email.type
        }));
      }

      if (originalContact.phoneNumbers) {
        duplicateData.phoneNumbers = originalContact.phoneNumbers.map((phone: any) => ({
          value: phone.value,
          type: phone.type
        }));
      }

      if (originalContact.organizations) {
        duplicateData.organizations = originalContact.organizations.map((org: any) => ({
          name: org.name,
          title: org.title,
          department: org.department
        }));
      }

      if (originalContact.addresses) {
        duplicateData.addresses = originalContact.addresses.map((addr: any) => ({
          streetAddress: addr.streetAddress,
          extendedAddress: addr.extendedAddress,
          city: addr.city,
          postalCode: addr.postalCode,
          country: addr.country,
          poBox: addr.poBox,
          type: addr.type
        }));
      }

      if (originalContact.biographies) {
        duplicateData.biographies = originalContact.biographies.map((bio: any) => ({
          value: bio.value,
          contentType: bio.contentType
        }));
      }

      if (originalContact.urls) {
        duplicateData.urls = originalContact.urls.map((url: any) => ({
          value: url.value
        }));
      }

      if (originalContact.birthdays) {
        duplicateData.birthdays = originalContact.birthdays.map((birthday: any) => ({
          date: birthday.date
        }));
      }

      if (originalContact.events) {
        duplicateData.events = originalContact.events.map((event: any) => ({
          date: event.date,
          type: event.type
        }));
      }

      if (originalContact.relations) {
        duplicateData.relations = originalContact.relations.map((relation: any) => ({
          person: relation.person,
          type: relation.type
        }));
      }

      if (originalContact.userDefined) {
        duplicateData.userDefined = originalContact.userDefined.map((field: any) => ({
          key: field.key,
          value: field.value
        }));
      }

      // Create the duplicate contact
      const createResponse = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicateData)
      });

      const duplicatedContact = extractContactData(createResponse.body);
      logContactOperation('DUPLICATE_CONTACT_SUCCESS', duplicatedContact.resourceName);
      return duplicatedContact;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to duplicate contact: ${error.message}`);
    }
  }
});

// Export Contact as vCard
pack.addFormula({
  name: "ExportContactAsVCard",
  description: "Export a contact as vCard format",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  execute: async function ([resourceName], context) {
    try {
      logContactOperation('EXPORT_VCARD_START', resourceName);

      // Get the contact details
      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,emailAddresses,phoneNumbers,organizations,addresses,birthdays,biographies,urls`,
        cacheTtlSecs: 0
      });

      const contact = response.body;

      // Build vCard format
      let vCard = "BEGIN:VCARD\nVERSION:3.0\n";

      // Add name
      if (contact.names && contact.names.length > 0) {
        const name = contact.names[0];
        const fullName = [name.givenName, name.middleName, name.familyName].filter(Boolean).join(' ');
        vCard += `FN:${fullName}\n`;
        vCard += `N:${name.familyName || ''};${name.givenName || ''};${name.middleName || ''};;\n`;
      }

      // Add emails
      if (contact.emailAddresses) {
        contact.emailAddresses.forEach((email: any) => {
          vCard += `EMAIL;TYPE=${email.type || 'OTHER'}:${email.value}\n`;
        });
      }

      // Add phones
      if (contact.phoneNumbers) {
        contact.phoneNumbers.forEach((phone: any) => {
          vCard += `TEL;TYPE=${(phone.type || 'OTHER').toUpperCase()}:${phone.value}\n`;
        });
      }

      // Add organization
      if (contact.organizations && contact.organizations.length > 0) {
        const org = contact.organizations[0];
        if (org.name) vCard += `ORG:${org.name}\n`;
        if (org.title) vCard += `TITLE:${org.title}\n`;
      }

      // Add addresses
      if (contact.addresses) {
        contact.addresses.forEach((addr: any) => {
          const addressParts = [
            addr.poBox || '',
            addr.extendedAddress || '',
            addr.streetAddress || '',
            addr.city || '',
            '', // region
            addr.postalCode || '',
            addr.country || ''
          ];
          vCard += `ADR;TYPE=${(addr.type || 'OTHER').toUpperCase()}:${addressParts.join(';')}\n`;
        });
      }

      // Add birthday
      if (contact.birthdays && contact.birthdays.length > 0) {
        const birthday = contact.birthdays[0].date;
        if (birthday.year && birthday.month && birthday.day) {
          vCard += `BDAY:${birthday.year}-${birthday.month.toString().padStart(2, '0')}-${birthday.day.toString().padStart(2, '0')}\n`;
        }
      }

      // Add notes
      if (contact.biographies && contact.biographies.length > 0) {
        vCard += `NOTE:${contact.biographies[0].value}\n`;
      }

      // Add URLs
      if (contact.urls && contact.urls.length > 0) {
        contact.urls.forEach((url: any) => {
          vCard += `URL:${url.value}\n`;
        });
      }

      vCard += "END:VCARD";

      logContactOperation('EXPORT_VCARD_SUCCESS', resourceName);
      return vCard;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to export contact as vCard: ${error.message}`);
    }
  }
});

// Create Contact with Extended Name Fields
pack.addFormula({
  name: "CreateExtendedContact",
  description: "Create a contact with extended name field support (prefix, suffix, phonetic names, etc.)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryEmail",
      description: "Primary email",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryPhone",
      description: "Primary phone",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "company",
      description: "Company",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "prefix",
      description: "Name prefix (Mr., Dr., etc.)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "suffix",
      description: "Name suffix (Jr., Sr., etc.)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "nickname",
      description: "Nickname",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchemaComplete,
  isAction: true,
  execute: async function ([givenName, familyName, primaryEmail, primaryPhone, company, prefix, suffix, nickname], context) {
    try {
      if (!givenName || !givenName.trim()) {
        throw new coda.UserVisibleError("First name is required");
      }

      const contactData: any = {
        names: [{
          givenName: givenName.trim(),
          familyName: familyName ? familyName.trim() : "",
          honorificPrefix: prefix ? prefix.trim() : "",
          honorificSuffix: suffix ? suffix.trim() : ""
        }]
      };

      if (nickname && nickname.trim()) {
        contactData.nicknames = [{ value: nickname.trim() }];
      }

      if (primaryEmail && isValidEmail(primaryEmail)) {
        contactData.emailAddresses = [{
          value: normalizeEmail(primaryEmail),
          type: 'other',
          metadata: { primary: true }
        }];
      }

      if (primaryPhone && isValidPhone(primaryPhone)) {
        contactData.phoneNumbers = [{
          value: normalizePhoneNumber(primaryPhone),
          type: 'other',
          metadata: { primary: true }
        }];
      }

      if (company && company.trim()) {
        contactData.organizations = [{ name: company.trim() }];
      }

      // Validate the contact data
      const validation = validateContactData(contactData);
      if (!validation.isValid) {
        throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
      }

      logContactOperation('CREATE_EXTENDED_CONTACT_START', givenName);

      const createResponse = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });

      const createdContact = extractContactData(createResponse.body);
      logContactOperation('CREATE_EXTENDED_CONTACT_SUCCESS', createdContact.resourceName);
      return createdContact;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to create extended contact: ${error.message}`);
    }
  }
});
