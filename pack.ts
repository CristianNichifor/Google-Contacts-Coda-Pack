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
    prompt: "consent"
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
// COUNTRIES DATA
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

//---------------------------------------------------------------------------------------------------------------------------//
// HELPER FUNCTIONS
//---------------------------------------------------------------------------------------------------------------------------//

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

// Single configuration object for all field types and their mappings
const FIELD_LABEL_CONFIG = {
  email: {
    options: [
      "home", "work", "other",
      "personal", "business", "school", "university"
    ],
    mapping: {
      'home': 'home',
      'work': 'work',
      'other': 'other',
      'personal': 'home',     // Maps to Google's "home"
      'business': 'work',     // Maps to Google's "work"
      'school': 'other',      // Maps to Google's "other"
      'university': 'other'   // Maps to Google's "other"
    }
  },
  phone: {
    options: [
      "home", "work", "other", "mobile", "main",
      "home fax", "work (fax)", "google voice", "pager",
      "cell", "office", "landline", "business"
    ],
    mapping: {
      'home': 'home',
      'work': 'work',
      'other': 'other',
      'mobile': 'mobile',
      'main': 'main',
      'home fax': 'homeFax',
      'work (fax)': 'workFax',
      'google voice': 'googleVoice',
      'pager': 'pager',
      'cell': 'mobile',       // Maps to Google's "mobile"
      'office': 'work',       // Maps to Google's "work"
      'landline': 'home',     // Maps to Google's "home"
      'business': 'work'      // Maps to Google's "work"
    }
  },
  address: {
    options: [
      "home", "work", "other",
      "office", "personal", "mailing", "shipping"
    ],
    mapping: {
      'home': 'home',
      'work': 'work',
      'other': 'other',
      'office': 'work',       // Maps to Google's "work"
      'personal': 'home',     // Maps to Google's "home"
      'mailing': 'other',     // Maps to Google's "other"
      'shipping': 'other'     // Maps to Google's "other"
    }
  }
} as const;

// Extract individual constants for backward compatibility and easy access
const EMAIL_LABEL_OPTIONS: string[] = [...FIELD_LABEL_CONFIG.email.options];
const PHONE_LABEL_OPTIONS: string[] = [...FIELD_LABEL_CONFIG.phone.options];
const ADDRESS_LABEL_OPTIONS: string[] = [...FIELD_LABEL_CONFIG.address.options];

const EMAIL_LABEL_MAPPING = FIELD_LABEL_CONFIG.email.mapping;
const PHONE_LABEL_MAPPING = FIELD_LABEL_CONFIG.phone.mapping;
const ADDRESS_LABEL_MAPPING = FIELD_LABEL_CONFIG.address.mapping;

// Create reverse mappings automatically
const REVERSE_LABEL_MAPPINGS = {
  email: Object.fromEntries(
    Object.entries(EMAIL_LABEL_MAPPING).map(([key, value]) => [value.toLowerCase(), key])
  ),
  phone: Object.fromEntries(
    Object.entries(PHONE_LABEL_MAPPING).map(([key, value]) => [value.toLowerCase(), key])
  ),
  address: Object.fromEntries(
    Object.entries(ADDRESS_LABEL_MAPPING).map(([key, value]) => [value.toLowerCase(), key])
  )
};

// Helper function to get label type mapping for Google API
function mapLabelToGoogleType(label: string, fieldType: 'email' | 'phone' | 'address'): string {
  if (!label) return 'other';

  const config = FIELD_LABEL_CONFIG[fieldType];
  if (!config) return 'other';

  const labelLower = label.toLowerCase();
  return config.mapping[labelLower] || 'other';
}

// Helper function to map Google API type back to our label format
function mapGoogleTypeToLabel(googleType: string, fieldType: 'email' | 'phone' | 'address'): string {
  if (!googleType) return 'other';

  const reverseMapping = REVERSE_LABEL_MAPPINGS[fieldType];
  if (!reverseMapping) return 'other';

  const typeLower = googleType.toLowerCase();
  return reverseMapping[typeLower] || 'other';
}

// Utility function to get options for a specific field type
function getFieldLabelOptions(fieldType: 'email' | 'phone' | 'address'): string[] {
  return [...(FIELD_LABEL_CONFIG[fieldType]?.options || [])];
}

// Utility function to validate if a label is valid for a field type
function isValidLabel(label: string, fieldType: 'email' | 'phone' | 'address'): boolean {
  if (!label) return false;

  const config = FIELD_LABEL_CONFIG[fieldType];
  if (!config) return false;

  const labelLower = label.toLowerCase();
  return labelLower in config.mapping;
}

// Utility function to get all valid Google API types for a field
function getValidGoogleTypes(fieldType: 'email' | 'phone' | 'address'): string[] {
  const config = FIELD_LABEL_CONFIG[fieldType];
  return config ? Object.values(config.mapping) : [];
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
function createGoogleDate(dateInput: string | Date): { year?: number; month?: number; day?: number } | null {
  let parsed;

  if (dateInput instanceof Date) {
    // Handle Date object
    parsed = {
      year: dateInput.getFullYear(),
      month: dateInput.getMonth() + 1,
      day: dateInput.getDate()
    };
  } else if (typeof dateInput === 'string') {
    parsed = parseDate(dateInput);
    if (!parsed) return null;
  } else {
    return null;
  }

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
function validateContactData(contactData: any, isUpdate: boolean = false): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Only validate names for CREATE operations, not UPDATE operations
  if (!isUpdate) {
    // Validate names (only for create operations)
    if (!contactData.names || contactData.names.length === 0) {
      errors.push('Contact must have at least one name');
    } else {
      const primaryName = contactData.names[0];
      if (!primaryName.givenName && !primaryName.familyName && !primaryName.displayName) {
        errors.push('Contact must have at least a first name, last name, or display name');
      }
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

  // Get primary email (special case)
  const primaryEmail = contact.primaryEmail;
  if (primaryEmail && primaryEmail.trim() && isValidEmail(primaryEmail)) {
    emails.push(primaryEmail.trim()); // ← This is correct for extract function
  }

  // Get emails 2-10
  for (let i = 2; i <= 10; i++) {
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

  // Get primary phone (special case)
  const primaryPhone = contact.primaryPhone;
  if (primaryPhone && primaryPhone.trim()) {
    phones.push(primaryPhone.trim());
  }

  // Get phones 2-10
  for (let i = 2; i <= 10; i++) {
    const phone = contact[`phone${i}`];
    if (phone && phone.trim()) {
      phones.push(phone.trim());
    }
  }

  // Remove duplicates using filter
  return phones.filter((phone, index) => phones.indexOf(phone) === index);
}

// Helper function for logging operations
function logContactOperation(operation: string, resourceName: string, details?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Contact ${operation}: ${resourceName}`, details ? JSON.stringify(details, null, 2) : '');
}

// Helper function to extract organization data from Google API response
function extractOrganizationData(organizations: any[]): { name: string; title: string; department: string } {
  if (!organizations || organizations.length === 0) {
    return { name: '', title: '', department: '' };
  }

  const primaryOrg = organizations.find((org: any) => org.metadata?.primary) || organizations[0];

  return {
    name: primaryOrg.name || '',
    title: primaryOrg.title || '',
    department: primaryOrg.department || ''
  };
}

// Helper function to create organization data for Google API
function createOrganizationData(name: string, title: string, department: string): any[] {
  if (!name && !title && !department) {
    return [];
  }

  return [{
    name: name || '',
    title: title || '',
    department: department || '',
    metadata: { primary: true }
  }];
}

// Helper function to validate organization data
function validateOrganizationData(name: string, title: string, department: string): boolean {
  // At least one field should have content
  return Boolean(name?.trim() || title?.trim() || department?.trim());
}

// Helper function to format related people string from relations array
function formatRelatedPeopleFromRelations(relations: any[]): string {
  if (!relations || relations.length === 0) return '';

  return relations
    .map(rel => `${rel.person || ''}: ${rel.type || ''}`)
    .filter(rel => rel !== ': ')
    .join(', ');
}

// Helper function to parse related people string to relations array
function parseRelatedPeopleToRelations(relatedPeopleStr: string): any[] {
  if (!relatedPeopleStr || !relatedPeopleStr.trim()) {
    return [];
  }

  const relatedList = relatedPeopleStr.split(',');
  return relatedList.map((rel: string) => {
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

// Helper function to extract custom field data by index
function extractCustomFieldByIndex(userDefined: any[], index: number): { value: string; label: string } {
  const field = userDefined?.[index];
  if (!field) return { value: '', label: '' };

  return {
    value: field.value || '',
    label: field.key || ''
  };
}

// Helper function to create custom fields array from individual fields
function createCustomFieldsArray(customFields: { [key: string]: string }): any[] {
  const userDefined = [];

  for (let i = 1; i <= 10; i++) {
    const fieldValue = customFields[`customField${i}`];
    const labelValue = customFields[`customField${i}Label`];

    if (fieldValue && fieldValue.trim()) {
      userDefined.push({
        key: labelValue || `Custom Field ${i}`,
        value: fieldValue.trim()
      });
    }
  }

  return userDefined;
}


//---------------------------------------------------------------------------------------------------------------------------//
// CONTACT SCHEMA DEFINITION
//---------------------------------------------------------------------------------------------------------------------------//

// Core identifiers (READ-ONLY)
const ContactSchemaProperties: coda.ObjectSchemaProperties<string> = {
  resourceName: {
    type: coda.ValueType.String,
    description: "The resource name of the contact"
  },
  etag: {
    type: coda.ValueType.String,
    description: "The ETag of the contact"
  },

  // Name fields
  displayName: {
    type: coda.ValueType.String,
    description: "The display name of the contact",
    mutable: false // Computed from other name fields
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

  // 10 Email fields
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
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
    options: EMAIL_LABEL_OPTIONS,
    mutable: true
  },

  // Compiled email list (READ-ONLY)
  allEmails: {
    type: coda.ValueType.Array,
    items: { type: coda.ValueType.String },
    description: "All email addresses (compiled from email1-10)"
  },

  // 10 Phone fields
  primaryPhone: {
    type: coda.ValueType.String,
    description: "Primary phone",
    mutable: true
  },
  primaryPhoneLabel: {
    type: coda.ValueType.String,
    description: "Primary phone label",
    codaType: coda.ValueHintType.SelectList,
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
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
    options: PHONE_LABEL_OPTIONS,
    mutable: true
  },

  // Compiled phone list (READ-ONLY)
  allPhones: {
    type: coda.ValueType.Array,
    items: { type: coda.ValueType.String },
    description: "All phone numbers (compiled from phone1-10)"
  },

  // Organization info
  organization: {
    type: coda.ValueType.String,
    description: "Organization name",
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

  // Primary Address fields
  primaryAddressStreet: {
    type: coda.ValueType.String,
    description: "Primary address street",
    mutable: true
  },
  primaryAddressStreet2: {
    type: coda.ValueType.String,
    description: "Primary address street 2",
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
    options: ADDRESS_LABEL_OPTIONS,
    mutable: true
  },

  // Address 2 fields 
  address2Street: {
    type: coda.ValueType.String,
    description: "Address 2 street",
    mutable: true
  },
  address2Street2: {
    type: coda.ValueType.String,
    description: "Address 2 street 2",
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
    options: ADDRESS_LABEL_OPTIONS,
    mutable: true
  },

  // Address 3 fields
  address3Street: {
    type: coda.ValueType.String,
    description: "Address 3 street",
    mutable: true
  },
  address3Street2: {
    type: coda.ValueType.String,
    description: "Address 3 street 2",
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
    options: ADDRESS_LABEL_OPTIONS,
    mutable: true
  },

  // Address 4 fields
  address4Street: {
    type: coda.ValueType.String,
    description: "Address 4 street",
    mutable: true
  },
  address4Street2: {
    type: coda.ValueType.String,
    description: "Address 4 street 2",
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
    options: ADDRESS_LABEL_OPTIONS,
    mutable: true
  },

  // Address 5 fields
  address5Street: {
    type: coda.ValueType.String,
    description: "Address 5 street",
    mutable: true
  },
  address5Street2: {
    type: coda.ValueType.String,
    description: "Address 5 street 2",
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
    options: ADDRESS_LABEL_OPTIONS,
    mutable: true
  },

  // Additional info
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

  // 10 Significant dates with labels
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

  // Related contacts fields
  relatedPeople: {
    type: coda.ValueType.String,
    description: "Related people (comma-separated: 'Name: Relationship, Name2: Relationship2')",
    mutable: true
  },

  // 10 custom fields with labels
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

// Contact schema
const ContactSchema = coda.makeObjectSchema({
  properties: ContactSchemaProperties,
  displayProperty: "displayName",
  idProperty: "resourceName",
  featuredProperties: [
    "displayName",
    "givenName",
    "familyName",
    "primaryEmail",
    "primaryPhone",
    "organization",
    "jobTitle",
    "allEmails",
    "allPhones"
  ]
});

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
      description: "The type of the contact group (SYSTEM_CONTACT_GROUP or USER_CONTACT_GROUP)"
    },
    memberCount: {
      type: coda.ValueType.Number,
      description: "The number of contacts in this group"
    },
    memberResourceNames: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Resource names of contacts in this group"
    },
    
    isDeprecated: {
      type: coda.ValueType.Boolean,
      description: "Whether this group is deprecated by Google and cannot be modified"
    },
    isCustomGroup: {
      type: coda.ValueType.Boolean,
      description: "Whether this is a user-created custom group (can always be modified)"
    },
    canModify: {
      type: coda.ValueType.Boolean,
      description: "Whether this group can be modified (add/remove contacts, rename, delete)"
    },
    canDelete: {
      type: coda.ValueType.Boolean,
      description: "Whether this group can be deleted (only custom groups)"
    },
    canRename: {
      type: coda.ValueType.Boolean,
      description: "Whether this group can be renamed (only custom groups)"
    },
    
    // Text status fields for readable information
    status: {
      type: coda.ValueType.String,
      description: "Human-readable status of the group"
    },
    statusIcon: {
      type: coda.ValueType.String,
      description: "Text indicator for group status (ACTIVE, BLOCKED, SYSTEM, READONLY)"
    },
    
    // Additional helpful fields
    createdByUser: {
      type: coda.ValueType.Boolean,
      description: "Whether this group was created by the user (vs Google system)"
    },
    isSystemGroup: {
      type: coda.ValueType.Boolean,
      description: "Whether this is a Google system group"
    },
    
    // Operational recommendations
    recommendedAction: {
      type: coda.ValueType.String,
      description: "Recommended action for this group type"
    }
  },
  displayProperty: "formattedName",
  idProperty: "resourceName",
  featuredProperties: [
    "formattedName", 
    "canModify",
    "canDelete", 
    "isDeprecated",
    "isCustomGroup",
    "status",
    "memberCount", 
    "groupType"
  ]
});

// Helper function to determine group characteristics and status
function analyzeContactGroup(groupResourceName: string, groupType?: string): {
  isDeprecated: boolean;
  isCustomGroup: boolean;
  canModify: boolean;
  status: string;
  statusIcon: string;
} {
  const deprecatedGroups = [
    'contactGroups/friends',
    'contactGroups/family',
    'contactGroups/coworkers'
  ];

  const modifiableSystemGroups = [
    'contactGroups/myContacts',
    'contactGroups/starred'
  ];

  const isDeprecated = deprecatedGroups.includes(groupResourceName);
  const isCustomGroup = groupType === 'USER_CONTACT_GROUP';
  const isModifiableSystem = modifiableSystemGroups.includes(groupResourceName);
  const canModify = (isCustomGroup || isModifiableSystem) && !isDeprecated;

  let status, statusIcon;
  if (isDeprecated) {
    status = 'Deprecated (Cannot Modify)';
    statusIcon = 'BLOCKED';
  } else if (isCustomGroup) {
    status = 'Custom Group (Full Access)';
    statusIcon = 'ACTIVE';
  } else if (isModifiableSystem) {
    status = 'System Group (Can Modify Members)';
    statusIcon = 'SYSTEM';
  } else {
    status = 'System Group (Read Only)';
    statusIcon = 'READONLY';
  }

  return { isDeprecated, isCustomGroup, canModify, status, statusIcon };
}

// Helper function to create group result object with all status fields
function createGroupResult(group: any): any {
  const analysis = analyzeContactGroup(group.resourceName, group.groupType);
  
  // Determine specific capabilities
  const canDelete = analysis.isCustomGroup && !analysis.isDeprecated;
  const canRename = analysis.isCustomGroup && !analysis.isDeprecated;
  const createdByUser = analysis.isCustomGroup;
  const isSystemGroup = !analysis.isCustomGroup;
  
  // Generate recommendations
  let recommendedAction;
  if (analysis.isDeprecated) {
    const groupName = group.resourceName.split('/')[1];
    recommendedAction = `Create replacement: CreateContactGroup("${groupName}")`;
  } else if (analysis.canModify) {
    recommendedAction = 'Ready for all group operations';
  } else {
    recommendedAction = 'Read-only - create custom group for modifications';
  }

  return {
    resourceName: group.resourceName,
    etag: group.etag,
    name: group.name,
    formattedName: group.formattedName,
    groupType: group.groupType,
    memberCount: group.memberCount || 0,
    memberResourceNames: group.memberResourceNames || [],
    
    // Checkbox status fields
    isDeprecated: analysis.isDeprecated,
    isCustomGroup: analysis.isCustomGroup,
    canModify: analysis.canModify,
    canDelete: canDelete,
    canRename: canRename,
    createdByUser: createdByUser,
    isSystemGroup: isSystemGroup,
    
    // Text status fields
    status: analysis.status,
    statusIcon: analysis.statusIcon,
    recommendedAction: recommendedAction
  };
}

//---------------------------------------------------------------------------------------------------------------------------//
// DATA EXTRACTION FUNCTION
//---------------------------------------------------------------------------------------------------------------------------//

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
        primaryAddressCountry: convertCountryCodeToName(addr.countryCode || ''),
        primaryAddressStreet: cleanAddressComponent(addr.streetAddress || ''),
        primaryAddressStreet2: cleanAddressComponent(addr.extendedAddress || ''),
        primaryAddressPostcode: cleanAddressComponent(addr.postalCode || ''),
        primaryAddressCity: cleanAddressComponent(addr.city || ''),
        primaryAddressPOBox: cleanAddressComponent(addr.poBox || ''),
        primaryAddressLabel: mapGoogleTypeToLabel(addr.type || '', 'address')
      };
    } else {
      // All other addresses (index 1+ becomes address2, address3, etc.)
      const addressNum = index + 1;
      return {
        [`address${addressNum}Country`]: convertCountryCodeToName(addr.countryCode || ''),
        [`address${addressNum}Street`]: cleanAddressComponent(addr.streetAddress || ''),
        [`address${addressNum}Street2`]: cleanAddressComponent(addr.extendedAddress || ''),
        [`address${addressNum}Postcode`]: cleanAddressComponent(addr.postalCode || ''),
        [`address${addressNum}City`]: cleanAddressComponent(addr.city || ''),
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

  // Extract organization data using helper function
  const organizationData = extractOrganizationData(organizations);

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
    organization: organizationData.name,
    jobTitle: organizationData.title,
    department: organizationData.department,

    // 5 addresses (spread all address fields)
    ...getAddressByIndex(0),
    ...getAddressByIndex(1),
    ...getAddressByIndex(2),
    ...getAddressByIndex(3),
    ...getAddressByIndex(4),

    // Additional info
    notes: biographies[0]?.value || '',
    website: urls[0]?.value || '',

    birthday: birthdays[0] ? formatDate(`${birthdays[0].date?.year || 1900}-${birthdays[0].date?.month || 1}-${birthdays[0].date?.day || 1}`) : '',

    ...(() => {
      const fields: any = {};
      for (let i = 1; i <= 10; i++) {
        const sigDate = getSignificantDateByIndex(i - 1);
        fields[`significantDate${i}`] = sigDate.date;
        fields[`significantDate${i}Label`] = sigDate.label;
      }
      return fields;
    })(),

    // Related people as comma-separated string
    relatedPeople: formatRelatedPeopleFromRelations(relations),

    // 10 custom fields
    customField1: extractCustomFieldByIndex(userDefined, 0).value,
    customField1Label: extractCustomFieldByIndex(userDefined, 0).label,
    customField2: extractCustomFieldByIndex(userDefined, 1).value,
    customField2Label: extractCustomFieldByIndex(userDefined, 1).label,
    customField3: extractCustomFieldByIndex(userDefined, 2).value,
    customField3Label: extractCustomFieldByIndex(userDefined, 2).label,
    customField4: extractCustomFieldByIndex(userDefined, 3).value,
    customField4Label: extractCustomFieldByIndex(userDefined, 3).label,
    customField5: extractCustomFieldByIndex(userDefined, 4).value,
    customField5Label: extractCustomFieldByIndex(userDefined, 4).label,
    customField6: extractCustomFieldByIndex(userDefined, 5).value,
    customField6Label: extractCustomFieldByIndex(userDefined, 5).label,
    customField7: extractCustomFieldByIndex(userDefined, 6).value,
    customField7Label: extractCustomFieldByIndex(userDefined, 6).label,
    customField8: extractCustomFieldByIndex(userDefined, 7).value,
    customField8Label: extractCustomFieldByIndex(userDefined, 7).label,
    customField9: extractCustomFieldByIndex(userDefined, 8).value,
    customField9Label: extractCustomFieldByIndex(userDefined, 8).label,
    customField10: extractCustomFieldByIndex(userDefined, 9).value,
    customField10Label: extractCustomFieldByIndex(userDefined, 9).label,

    // Read-only fields
    memberships: memberships,
    photoUrl: photoUrl,
    lastModified: person.metadata?.sources?.[0]?.updateTime,
    contactType: contactType
  };

  // Add compiled lists using helper functions (after all individual fields are set)
  (contactData as any).allEmails = compileAllEmails(contactData);
  (contactData as any).allPhones = compileAllPhones(contactData);

  return contactData;
}

//---------------------------------------------------------------------------------------------------------------------------//
// UPDATE CONTACT FUNCTION - Core two-way sync logic
//---------------------------------------------------------------------------------------------------------------------------//

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
    if (newValue.organization !== undefined || newValue.jobTitle !== undefined || newValue.department !== undefined) {
      const organization = newValue.organization !== undefined ? newValue.organization : previousValue.organization || "";
      const jobTitle = newValue.jobTitle !== undefined ? newValue.jobTitle : previousValue.jobTitle || "";
      const department = newValue.department !== undefined ? newValue.department : previousValue.department || "";

      updateData.organizations = createOrganizationData(organization, jobTitle, department);
      updateMask.push("organizations");
    }

    // Handle address updates - support all 5 addresses
    const addressFields = [
      // Primary address fields
      'primaryAddressCountry', 'primaryAddressStreet', 'primaryAddressStreet2', 'primaryAddressPostcode', 'primaryAddressCity', 'primaryAddressPOBox', 'primaryAddressLabel',
      // All other address fields
      'address2Country', 'address2Street', 'address2Street2', 'address2Postcode', 'address2City', 'address2POBox', 'address2Label',
      'address3Country', 'address3Street', 'address3Street2', 'address3Postcode', 'address3City', 'address3POBox', 'address3Label',
      'address4Country', 'address4Street', 'address4Street2', 'address4Postcode', 'address4City', 'address4POBox', 'address4Label',
      'address5Country', 'address5Street', 'address5Street2', 'address5Postcode', 'address5City', 'address5POBox', 'address5Label'
    ];

    const addressesChanged = addressFields.some(field => newValue[field] !== undefined);

    if (addressesChanged) {
      let addresses = [];

      // Handle primary address (special case)
      const primaryCountry = newValue.primaryAddressCountry !== undefined ? newValue.primaryAddressCountry : previousValue.primaryAddressCountry;
      const primaryStreet = newValue.primaryAddressStreet !== undefined ? newValue.primaryAddressStreet : previousValue.primaryAddressStreet;
      const primaryStreet2 = newValue.primaryAddressStreet2 !== undefined ? newValue.primaryAddressStreet2 : previousValue.primaryAddressStreet2;
      const primaryPostcode = newValue.primaryAddressPostcode !== undefined ? newValue.primaryAddressPostcode : previousValue.primaryAddressPostcode;
      const primaryCity = newValue.primaryAddressCity !== undefined ? newValue.primaryAddressCity : previousValue.primaryAddressCity;
      const primaryPoBox = newValue.primaryAddressPOBox !== undefined ? newValue.primaryAddressPOBox : previousValue.primaryAddressPOBox;
      const primaryLabel = newValue.primaryAddressLabel !== undefined ? newValue.primaryAddressLabel : previousValue.primaryAddressLabel;

      if (hasAddressContent(primaryCountry, primaryStreet, primaryStreet2, primaryPostcode, primaryCity, primaryPoBox)) {
        addresses.push({
          country: convertCountryNameToCode(primaryCountry || ''),
          countryCode: convertCountryNameToCode(primaryCountry || ''),
          streetAddress: cleanAddressComponent(primaryStreet || ''),
          extendedAddress: cleanAddressComponent(primaryStreet2 || ''),
          postalCode: cleanAddressComponent(primaryPostcode || ''),
          city: cleanAddressComponent(primaryCity || ''),
          poBox: cleanAddressComponent(primaryPoBox || ''),
          type: mapLabelToGoogleType(primaryLabel || 'other', 'address'),
          metadata: { primary: true }
        });
      }

      // Handle addresses from 2 to 5
      for (let i = 2; i <= 5; i++) {
        const country = newValue[`address${i}Country`] !== undefined ? newValue[`address${i}Country`] : previousValue[`address${i}Country`];
        const street = newValue[`address${i}Street`] !== undefined ? newValue[`address${i}Street`] : previousValue[`address${i}Street`];
        const street2 = newValue[`address${i}Street2`] !== undefined ? newValue[`address${i}Street2`] : previousValue[`address${i}Street2`];
        const postcode = newValue[`address${i}Postcode`] !== undefined ? newValue[`address${i}Postcode`] : previousValue[`address${i}Postcode`];
        const city = newValue[`address${i}City`] !== undefined ? newValue[`address${i}City`] : previousValue[`address${i}City`];
        const poBox = newValue[`address${i}POBox`] !== undefined ? newValue[`address${i}POBox`] : previousValue[`address${i}POBox`];
        const label = newValue[`address${i}Label`] !== undefined ? newValue[`address${i}Label`] : previousValue[`address${i}Label`];

        if (hasAddressContent(street, street2, city, postcode, country, poBox)) {
          addresses.push({
            country: convertCountryNameToCode(country || ''),
            countryCode: convertCountryNameToCode(country || ''),
            streetAddress: cleanAddressComponent(street || ''),
            extendedAddress: cleanAddressComponent(street2 || ''),
            postalCode: cleanAddressComponent(postcode || ''),
            city: cleanAddressComponent(city || ''),
            poBox: cleanAddressComponent(poBox || ''),
            type: mapLabelToGoogleType(label || 'other', 'address'),
            metadata: { primary: false }
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
      updateData.relations = parseRelatedPeopleToRelations(newValue.relatedPeople);
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
      const customFieldsData: { [key: string]: string } = {};

      // Collect all custom field data
      for (let i = 0; i < 10; i++) {
        const fieldValue = newValue[customFields[i]] !== undefined ? newValue[customFields[i]] : previousValue[customFields[i]];
        const labelValue = newValue[customFieldLabels[i]] !== undefined ? newValue[customFieldLabels[i]] : previousValue[customFieldLabels[i]];

        customFieldsData[`customField${i + 1}`] = fieldValue || '';
        customFieldsData[`customField${i + 1}Label`] = labelValue || '';
      }

      updateData.userDefined = createCustomFieldsArray(customFieldsData);
      updateMask.push("userDefined");
    }

    if (updateMask.length === 0) {
      logContactOperation('UPDATE_NO_CHANGES', resourceName);
      return previousValue;
    }

    // Validate the update data before sending
    const validation = validateContactData(updateData);
    if (!validation.isValid) {
      throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
    }

    logContactOperation('UPDATE_CONTACT_START', resourceName, { fields: updateMask });

    const response = await context.fetcher.fetch({
      method: "PATCH",
      url: `https://people.googleapis.com/v1/${resourceName}:updateContact?updatePersonFields=${updateMask.join(",")}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updateData, etag: etag })
    });

    const updatedContact = extractContactData(response.body);
    logContactOperation('UPDATE_CONTACT_SUCCESS', resourceName);
    return updatedContact;

  } catch (error) {
    logContactOperation('UPDATE_CONTACT_ERROR', update.previousValue.resourceName, { error: error.message });

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
// SYNC TABLES - CONTACTS AND CONTACT GROUPS
//---------------------------------------------------------------------------------------------------------------------------//

// Contact Groups Sync Table
pack.addSyncTable({
  name: "ContactGroups",
  description: "Contact groups from Google Contacts with status indicators",
  identityName: "ContactGroup",
  schema: ContactGroupSchema,
  formula: {
    name: "SyncContactGroups",
    description: "Sync contact groups from Google Contacts with status information",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "maxResults",
        description: "Maximum number of groups to sync (default: 1000)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.Boolean,
        name: "includeDeprecated",
        description: "Include deprecated groups in results (default: true)",
        optional: true,
      }),
    ],
    execute: async function ([maxResults, includeDeprecated], context) {
      try {
        const limit = Math.min(maxResults || 1000, 1000);
        const showDeprecated = includeDeprecated !== false; // Default to true
        
        logContactOperation('SYNC_GROUPS_START', 'all', { maxResults: limit, includeDeprecated: showDeprecated });

        const response = await context.fetcher.fetch({
          method: "GET",
          url: `https://people.googleapis.com/v1/contactGroups?pageSize=${limit}`,
          cacheTtlSecs: 60,
        });

        const groups = response.body.contactGroups || [];
        const results = [];

        for (const group of groups) {
          try {
            // Skip deprecated groups if not requested
            const analysis = analyzeContactGroup(group.resourceName, group.groupType);
            if (analysis.isDeprecated && !showDeprecated) {
              continue;
            }

            // Get detailed group information including member count
            let detailGroup;
            try {
              const detailResponse = await context.fetcher.fetch({
                method: "GET",
                url: `https://people.googleapis.com/v1/${group.resourceName}?maxMembers=10000`,
                cacheTtlSecs: 300
              });
              detailGroup = detailResponse.body;
            } catch (detailError) {
              logContactOperation('SYNC_GROUP_DETAIL_ERROR', group.resourceName, { error: detailError.message });
              detailGroup = group;
            }

            // Use createGroupResult to populate ALL fields including the new checkboxes
            const result = createGroupResult({
              resourceName: group.resourceName,
              etag: group.etag,
              name: group.name,
              formattedName: group.formattedName,
              groupType: group.groupType,
              memberCount: detailGroup.memberCount || 0,
              memberResourceNames: detailGroup.memberResourceNames || []
            });

            results.push(result);
          } catch (groupError) {
            logContactOperation('SYNC_GROUP_ERROR', group.resourceName, { error: groupError.message });
            // Still include basic group info if processing fails
            const fallbackResult = createGroupResult({
              resourceName: group.resourceName,
              etag: group.etag,
              name: group.name,
              formattedName: group.formattedName,
              groupType: group.groupType,
              memberCount: 0,
              memberResourceNames: []
            });
            results.push(fallbackResult);
          }
        }

        logContactOperation('SYNC_GROUPS_SUCCESS', 'all', { 
          groupCount: results.length,
          deprecated: results.filter(g => g.isDeprecated).length,
          custom: results.filter(g => g.isCustomGroup).length,
          modifiable: results.filter(g => g.canModify).length
        });
        
        return { result: results };
      } catch (error) {
        logContactOperation('SYNC_GROUPS_ERROR', 'all', { error: error.message });
        throw new coda.UserVisibleError(`Failed to sync contact groups: ${error.message}`);
      }
    }
  }
});

// Main Contacts Sync Table with Two-Way Sync
pack.addSyncTable({
  name: "Contacts",
  description: "Google Contacts with comprehensive two-way sync (10 emails, 10 phones, 5 addresses, organizations, etc.)",
  identityName: "Contact",
  schema: ContactSchema,
  formula: {
    name: "SyncContacts",
    description: "Sync contacts from Google Contacts with full field support",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "contactTypeFilter",
        description: "Filter by contact type",
        optional: true,
        // ENHANCED: Select list for better UX (backward compatible - same values)
        autocomplete: [
          { display: "All Contacts", value: "" },
          { display: "Regular Contacts (Editable)", value: "CONTACT" },
          { display: "Other Contacts (Gmail Auto-Contacts)", value: "OTHER_CONTACT" }
        ]
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "groupFilter",
        description: "Filter by contact group resource name (regular contacts only)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "maxResults",
        description: "Maximum contacts to sync (default: 2000, max: 10000)",
        optional: true,
      }),
    ],
    execute: async function ([contactTypeFilter, groupFilter, maxResults], context) {
      try {
        const limit = Math.min(maxResults || 2000, 10000);
        const results: any[] = [];

        logContactOperation('SYNC_CONTACTS_START', 'all', {
          contactTypeFilter,
          groupFilter,
          maxResults: limit
        });

        // ENHANCED: Sync regular contacts (CONTACT type) with deletion handling
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
                // ENHANCED: Handle deleted contacts (skip them) - Note: only works with sync tokens
                if (person.metadata?.deleted === true) {
                  logContactOperation('DELETED_CONTACT_DETECTED', person.resourceName || 'unknown', {
                    deletedAt: new Date().toISOString()
                  });
                  continue; // Skip deleted contacts
                }

                const contactData = extractContactData(person);

                // Apply group filter if specified
                if (groupFilter && !contactData.memberships.includes(groupFilter)) {
                  continue;
                }

                if (contactData.contactType === "CONTACT") {
                  results.push(contactData);
                }

                if (results.length >= limit) break;
              } catch (extractError) {
                const resourceName = String(person?.resourceName || 'unknown');
                logContactOperation('EXTRACT_ERROR', resourceName, { error: extractError.message });
              }
            }

            if (pageCount > 20) break;
          } while (nextPageToken && results.length < limit);
        }

        // ENHANCED: Sync other contacts (OTHER_CONTACT type) with deletion handling
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
                // ENHANCED: Handle deleted Other Contacts
                if (person.metadata?.deleted === true) {
                  logContactOperation('DELETED_OTHER_CONTACT_DETECTED', person.resourceName || 'unknown');
                  continue; // Skip deleted contacts
                }

                const contactData = extractContactData(person);
                contactData.contactType = "OTHER_CONTACT";
                results.push(contactData);

                if (results.length >= limit) break;
              } catch (extractError) {
                const resourceName = String(person?.resourceName || 'unknown');
                logContactOperation('EXTRACT_OTHER_ERROR', resourceName, { error: extractError.message });
              }
            }

            if (pageCount > 20) break;
          } while (nextPageToken && results.length < limit);
        }

        logContactOperation('SYNC_CONTACTS_SUCCESS', 'all', {
          contactCount: results.length,
          contactTypes: contactTypeFilter || 'all',
          regularContacts: results.filter(c => c.contactType === 'CONTACT').length,
          otherContacts: results.filter(c => c.contactType === 'OTHER_CONTACT').length
        });

        return { result: results };
      } catch (error) {
        logContactOperation('SYNC_CONTACTS_ERROR', 'all', { error: error.message });

        if (error.statusCode === 401) {
          throw error;
        }
        // Handle other errors with user-friendly messages
        throw new coda.UserVisibleError(`Failed to sync contacts: ${error.message}`);
      }
    },

    // Two-way sync configuration (unchanged for compatibility)
    maxUpdateBatchSize: 10,

    executeUpdate: async function (args, updates, context) {
      logContactOperation('BATCH_UPDATE_START', 'batch', { updateCount: updates.length });

      const jobs = updates.map(async (update) => {
        try {
          // ENHANCED: Check if contact was deleted in Google before updating
          try {
            await context.fetcher.fetch({
              method: "GET",
              url: `https://people.googleapis.com/v1/${String(update.previousValue.resourceName)}?personFields=metadata`,
              cacheTtlSecs: 0
            });
          } catch (checkError) {
            if (checkError.statusCode === 404) {
              logContactOperation('UPDATE_SKIPPED_DELETED', String(update.previousValue.resourceName));
              throw new coda.UserVisibleError(`Contact was deleted in Google Contacts: ${String(update.previousValue.displayName) || 'Unknown Contact'}`);
            }
            // Other errors are handled by the main update function
          }

          return await updateContact(context, update);
        } catch (error) {
          const resourceName = String(update?.previousValue?.resourceName || update?.newValue?.resourceName || 'unknown');
          logContactOperation('BATCH_UPDATE_ITEM_ERROR', resourceName, { error: error.message });
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
// FORMULAS
//---------------------------------------------------------------------------------------------------------------------------//

// READ CONTACT - Get contact details
pack.addFormula({
  name: "ReadContact",
  description: "Read detailed information about a specific contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name (e.g., people/c123456789)"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  execute: async function ([resourceName], context) {
    try {
      logContactOperation('READ_CONTACT_START', resourceName);

      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,nicknames,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata,biographies,urls,events,relations,userDefined`,
        cacheTtlSecs: 60
      });

      const contact = extractContactData(response.body);
      logContactOperation('READ_CONTACT_SUCCESS', resourceName);
      return contact;
    } catch (error) {
      logContactOperation('READ_CONTACT_ERROR', resourceName, { error: error.message });

      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Contact not found: ${resourceName}`);
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError('Permission denied. Please check your Google Contacts permissions.');
      }

      throw new coda.UserVisibleError(`Failed to read contact: ${error.message}`);
    }
  }
});

// CREATE CONTACT
pack.addFormula({
  name: "CreateContact",
  description: "Create a new contact with all essential primary fields",
  parameters: [
    // === CORE NAME FIELDS ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name (required)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "middleName",
      description: "Middle name",
      optional: true
    }),

    // === PRIMARY EMAIL ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryEmail",
      description: "Primary email address",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryEmailLabel",
      description: "Primary email label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),

    // === PRIMARY PHONE ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryPhone",
      description: "Primary phone number",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryPhoneLabel",
      description: "Primary phone label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),

    // === ORGANIZATION INFO ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "organization",
      description: "Organization/company name",
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
      name: "department",
      description: "Department",
      optional: true
    }),

    // === PRIMARY ADDRESS ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressCountry",
      description: "Primary address country",
      autocomplete: COUNTRY_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressStreet",
      description: "Primary address street",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressStreet2",
      description: "Primary address street 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressPostcode",
      description: "Primary address postcode",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressCity",
      description: "Primary address city",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressPOBox",
      description: "Primary address PO Box",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryAddressLabel",
      description: "Primary address label",
      autocomplete: ADDRESS_LABEL_OPTIONS,
      optional: true
    }),

    // === PERSONAL INFO ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Notes about the contact",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "website",
      description: "Website URL",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "birthday",
      description: "Birthday",
      optional: true
    }),

    // === GROUP ASSIGNMENT ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactGroup",
      description: "Contact group resource name to add contact to",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([
    // Name fields
    givenName, familyName, middleName,
    // Primary email
    primaryEmail, primaryEmailLabel,
    // Primary phone
    primaryPhone, primaryPhoneLabel,
    // Organization
    organization, jobTitle, department,
    // Primary address
    primaryAddressCountry, primaryAddressStreet, primaryAddressStreet2, primaryAddressPostcode, primaryAddressCity, primaryAddressPOBox, primaryAddressLabel,
    // Personal info
    notes, website, birthday,
    // Group assignment
    contactGroup
  ], context) {
    try {
      if (!givenName || !givenName.trim()) {
        throw new coda.UserVisibleError("First name is required");
      }

      logContactOperation('CREATE_CONTACT_START', givenName);

      const contactData: any = {
        names: [{
          givenName: givenName.trim(),
          familyName: familyName ? familyName.trim() : "",
          middleName: middleName ? middleName.trim() : ""
        }]
      };

      // Add primary email if provided
      if (primaryEmail && isValidEmail(primaryEmail)) {
        contactData.emailAddresses = [{
          value: normalizeEmail(primaryEmail),
          type: mapLabelToGoogleType(primaryEmailLabel || 'other', 'email'),
          metadata: { primary: true }
        }];
      }

      // Add primary phone if provided
      if (primaryPhone && isValidPhone(primaryPhone)) {
        contactData.phoneNumbers = [{
          value: normalizePhoneNumber(primaryPhone),
          type: mapLabelToGoogleType(primaryPhoneLabel || 'other', 'phone'),
          metadata: { primary: true }
        }];
      }

      // Add organization info if provided
      if ((organization && organization.trim()) || (jobTitle && jobTitle.trim()) || (department && department.trim())) {
        contactData.organizations = createOrganizationData(
          organization || '',
          jobTitle || '',
          department || ''
        );
      }


      // Build primary address if provided
      if (hasAddressContent(primaryAddressCountry, primaryAddressStreet, primaryAddressStreet2, primaryAddressPostcode, primaryAddressCity, primaryAddressPOBox)) {
        contactData.addresses = [{
          countryCode: convertCountryNameToCode(primaryAddressCountry || ''),
          streetAddress: cleanAddressComponent(primaryAddressStreet || ''),
          extendedAddress: cleanAddressComponent(primaryAddressStreet2 || ''),
          postalCode: cleanAddressComponent(primaryAddressPostcode || ''),
          city: cleanAddressComponent(primaryAddressCity || ''),
          poBox: cleanAddressComponent(primaryAddressPOBox || ''),
          type: mapLabelToGoogleType(primaryAddressLabel || 'other', 'address'),
          metadata: { primary: true }
        }];
      }

      // Add personal info
      if (birthday) {
        const googleDate = createGoogleDate(birthday);
        if (googleDate) {
          contactData.birthdays = [{ date: googleDate }];
        }
      }

      if (website && website.trim()) {
        contactData.urls = [{ value: website.trim() }];
      }

      if (notes && notes.trim()) {
        contactData.biographies = [{ value: notes.trim(), contentType: "TEXT_PLAIN" }];
      }

      // Validate the contact data
      const validation = validateContactData(contactData); // Default false for isUpdate
      if (!validation.isValid) {
        throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
      }

      const createResponse = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });

      const createdContact = extractContactData(createResponse.body);

      // Add to group if specified
      if (contactGroup && contactGroup.trim()) {
        try {
          await context.fetcher.fetch({
            method: "POST",
            url: `https://people.googleapis.com/v1/${contactGroup}/members:modify`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resourceNamesToAdd: [createdContact.resourceName]
            })
          });
          logContactOperation('ADD_TO_GROUP_SUCCESS', createdContact.resourceName, { group: contactGroup });
        } catch (groupError) {
          logContactOperation('ADD_TO_GROUP_ERROR', createdContact.resourceName, {
            group: contactGroup,
            error: groupError.message
          });
        }
      }

      logContactOperation('CREATE_CONTACT_SUCCESS', createdContact.resourceName);
      return createdContact;
    } catch (error) {
      logContactOperation('CREATE_CONTACT_ERROR', givenName, { error: error.message });
      throw new coda.UserVisibleError(`Failed to create contact: ${error.message}`);
    }
  }
});

// UPDATE CONTACT
pack.addFormula({
  name: "UpdateContact",
  description: "Update an existing contact's information with all available fields",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    }),

    // === CORE NAME FIELDS ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "middleName",
      description: "Middle name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "prefix",
      description: "Name prefix (Mr., Mrs., Dr., etc.)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "suffix",
      description: "Name suffix (Jr., Sr., III, etc.)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "nickname",
      description: "Nickname",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phoneticFirst",
      description: "Phonetic spelling of first name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phoneticMiddle",
      description: "Phonetic spelling of middle name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phoneticLast",
      description: "Phonetic spelling of last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "fileAs",
      description: "How the contact should be filed",
      optional: true
    }),

    // === EMAIL FIELDS (10 emails) ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryEmail",
      description: "Primary email address",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryEmailLabel",
      description: "Primary email label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email2",
      description: "Email 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email2Label",
      description: "Email 2 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email3",
      description: "Email 3",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email3Label",
      description: "Email 3 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email4",
      description: "Email 4",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email4Label",
      description: "Email 4 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email5",
      description: "Email 5",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email5Label",
      description: "Email 5 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email6",
      description: "Email 6",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email6Label",
      description: "Email 6 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email7",
      description: "Email 7",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email7Label",
      description: "Email 7 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email8",
      description: "Email 8",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email8Label",
      description: "Email 8 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email9",
      description: "Email 9",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email9Label",
      description: "Email 9 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email10",
      description: "Email 10",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email10Label",
      description: "Email 10 label",
      autocomplete: EMAIL_LABEL_OPTIONS,
      optional: true
    }),

    // === PHONE FIELDS (10 phones) ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryPhone",
      description: "Primary phone number",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "primaryPhoneLabel",
      description: "Primary phone label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone2",
      description: "Phone 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone2Label",
      description: "Phone 2 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone3",
      description: "Phone 3",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone3Label",
      description: "Phone 3 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone4",
      description: "Phone 4",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone4Label",
      description: "Phone 4 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone5",
      description: "Phone 5",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone5Label",
      description: "Phone 5 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone6",
      description: "Phone 6",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone6Label",
      description: "Phone 6 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone7",
      description: "Phone 7",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone7Label",
      description: "Phone 7 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone8",
      description: "Phone 8",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone8Label",
      description: "Phone 8 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone9",
      description: "Phone 9",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone9Label",
      description: "Phone 9 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone10",
      description: "Phone 10",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phone10Label",
      description: "Phone 10 label",
      autocomplete: PHONE_LABEL_OPTIONS,
      optional: true
    }),

    // === ORGANIZATION INFO ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "organization",
      description: "Organization/company name",
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
      name: "department",
      description: "Department",
      optional: true
    }),

    // === ADDRESS FIELDS (5 addresses) ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1Country",
      description: "Address 1 country",
      autocomplete: COUNTRY_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1Street",
      description: "Address 1 street",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1Street2",
      description: "Address 1 street 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1Postcode",
      description: "Address 1 postcode",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1City",
      description: "Address 1 city",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1POBox",
      description: "Address 1 PO Box",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address1Label",
      description: "Address 1 label",
      autocomplete: ADDRESS_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2Country",
      description: "Address 2 country",
      autocomplete: COUNTRY_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2Street",
      description: "Address 2 street",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2Street2",
      description: "Address 2 street 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2Postcode",
      description: "Address 2 postcode",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2City",
      description: "Address 2 city",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2POBox",
      description: "Address 2 PO Box",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address2Label",
      description: "Address 2 label",
      autocomplete: ADDRESS_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3Country",
      description: "Address 3 country",
      autocomplete: COUNTRY_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3Street",
      description: "Address 3 street",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3Street2",
      description: "Address 3 street 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3Postcode",
      description: "Address 3 postcode",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3City",
      description: "Address 3 city",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3POBox",
      description: "Address 3 PO Box",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address3Label",
      description: "Address 3 label",
      autocomplete: ADDRESS_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4Country",
      description: "Address 4 country",
      autocomplete: COUNTRY_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4Street",
      description: "Address 4 street",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4Street2",
      description: "Address 4 street 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4Postcode",
      description: "Address 4 postcode",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4City",
      description: "Address 4 city",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4POBox",
      description: "Address 4 PO Box",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address4Label",
      description: "Address 4 label",
      autocomplete: ADDRESS_LABEL_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5Country",
      description: "Address 5 country",
      autocomplete: COUNTRY_OPTIONS,
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5Street",
      description: "Address 5 street",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5Street2",
      description: "Address 5 street 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5Postcode",
      description: "Address 5 postcode",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5City",
      description: "Address 5 city",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5POBox",
      description: "Address 5 PO Box",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "address5Label",
      description: "Address 5 label",
      autocomplete: ADDRESS_LABEL_OPTIONS,
      optional: true
    }),

    // === PERSONAL INFO ===
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "birthday",
      description: "Birthday",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "website",
      description: "Website URL",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Notes about the contact",
      optional: true
    }),

    // === SIGNIFICANT DATES ===
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "significantDate1",
      description: "Significant date 1",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "significantDate1Label",
      description: "Significant date 1 label (anniversary, other)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "significantDate2",
      description: "Significant date 2",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "significantDate2Label",
      description: "Significant date 2 label (anniversary, other)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "significantDate3",
      description: "Significant date 3",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "significantDate3Label",
      description: "Significant date 3 label (anniversary, other)",
      optional: true
    }),

    // === RELATED PEOPLE ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "relatedPeople",
      description: "Related people (format: 'Name1:relationship1,Name2:relationship2')",
      optional: true
    }),

    // === CUSTOM FIELDS ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField1",
      description: "Custom field 1 value",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField1Label",
      description: "Custom field 1 label",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField2",
      description: "Custom field 2 value",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField2Label",
      description: "Custom field 2 label",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField3",
      description: "Custom field 3 value",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField3Label",
      description: "Custom field 3 label",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField4",
      description: "Custom field 4 value",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField4Label",
      description: "Custom field 4 label",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField5",
      description: "Custom field 5 value",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "customField5Label",
      description: "Custom field 5 label",
      optional: true
    }),

    // === GROUP ASSIGNMENT ===
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactGroup",
      description: "Contact group resource name to add contact to",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([
    resourceName,
    // Name fields
    givenName, familyName, middleName, prefix, suffix, nickname, phoneticFirst, phoneticMiddle, phoneticLast, fileAs,
    // Email fields (10 emails)
    primaryEmail, primaryEmailLabel, email2, email2Label, email3, email3Label, email4, email4Label, email5, email5Label,
    email6, email6Label, email7, email7Label, email8, email8Label, email9, email9Label, email10, email10Label,
    // Phone fields (10 phones)
    primaryPhone, primaryPhoneLabel, phone2, phone2Label, phone3, phone3Label, phone4, phone4Label, phone5, phone5Label,
    phone6, phone6Label, phone7, phone7Label, phone8, phone8Label, phone9, phone9Label, phone10, phone10Label,
    // Organization
    organization, jobTitle, department,
    // Address fields (5 addresses)
    address1Country, address1Street, address1Street2, address1Postcode, address1City, address1POBox, address1Label,
    address2Country, address2Street, address2Street2, address2Postcode, address2City, address2POBox, address2Label,
    address3Country, address3Street, address3Street2, address3Postcode, address3City, address3POBox, address3Label,
    address4Country, address4Street, address4Street2, address4Postcode, address4City, address4POBox, address4Label,
    address5Country, address5Street, address5Street2, address5Postcode, address5City, address5POBox, address5Label,
    // Personal info
    birthday, website, notes,
    // Significant dates
    significantDate1, significantDate1Label, significantDate2, significantDate2Label, significantDate3, significantDate3Label,
    // Related people
    relatedPeople,
    // Custom fields
    customField1, customField1Label, customField2, customField2Label, customField3, customField3Label,
    customField4, customField4Label, customField5, customField5Label,
    // Group assignment
    contactGroup
  ], context) {
    try {
      logContactOperation('UPDATE_CONTACT_START', resourceName);

      // Get current contact with fresh etag (CRITICAL: No caching if wanting to get a fresh etag!)
      const getResponse = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,nicknames,emailAddresses,phoneNumbers,organizations,addresses,biographies,urls,birthdays,events,relations,userDefined`,
        cacheTtlSecs: 0
      });

      const currentContact = getResponse.body;
      const etag = currentContact.etag;

      const updateData: any = {};
      const updateMask: string[] = [];

      // Handle name updates (any name field change)
      if (givenName !== undefined || familyName !== undefined || middleName !== undefined || prefix !== undefined || suffix !== undefined || phoneticFirst !== undefined || phoneticMiddle !== undefined || phoneticLast !== undefined || fileAs !== undefined) {
        const currentName = currentContact.names?.[0] || {};
        updateData.names = [{
          givenName: givenName !== undefined ? givenName : (currentName.givenName || ""),
          familyName: familyName !== undefined ? familyName : (currentName.familyName || ""),
          middleName: middleName !== undefined ? middleName : (currentName.middleName || ""),
          honorificPrefix: prefix !== undefined ? prefix : (currentName.honorificPrefix || ""),
          honorificSuffix: suffix !== undefined ? suffix : (currentName.honorificSuffix || ""),
          phoneticGivenName: phoneticFirst !== undefined ? phoneticFirst : (currentName.phoneticGivenName || ""),
          phoneticMiddleName: phoneticMiddle !== undefined ? phoneticMiddle : (currentName.phoneticMiddleName || ""),
          phoneticFamilyName: phoneticLast !== undefined ? phoneticLast : (currentName.phoneticFamilyName || ""),
          displayNameLastFirst: fileAs !== undefined ? fileAs : (currentName.displayNameLastFirst || "")
        }];
        updateMask.push("names");
      }

      // Handle nickname update
      if (nickname !== undefined) {
        updateData.nicknames = nickname ? [{ value: nickname }] : [];
        updateMask.push("nicknames");
      }

      // Handle email updates (all 10 emails)
      if (primaryEmail !== undefined || email2 !== undefined || email3 !== undefined || email4 !== undefined || email5 !== undefined ||
        email6 !== undefined || email7 !== undefined || email8 !== undefined || email9 !== undefined || email10 !== undefined ||
        primaryEmailLabel !== undefined || email2Label !== undefined || email3Label !== undefined || email4Label !== undefined || email5Label !== undefined ||
        email6Label !== undefined || email7Label !== undefined || email8Label !== undefined || email9Label !== undefined || email10Label !== undefined) {

        const currentEmails = currentContact.emailAddresses || [];
        let emails = [];

        // Handle emails 1-10
        const emailParams = [
          [primaryEmail, primaryEmailLabel], [email2, email2Label], [email3, email3Label], [email4, email4Label], [email5, email5Label],
          [email6, email6Label], [email7, email7Label], [email8, email8Label], [email9, email9Label], [email10, email10Label]
        ];

        emailParams.forEach(([emailValue, labelValue], index) => {
          let currentEmail, currentLabel;

          if (index === 0) {
            // Primary email
            currentEmail = currentEmails.find((e: any) => e.metadata?.primary)?.value || '';
            currentLabel = currentEmails.find((e: any) => e.metadata?.primary)?.type || 'other';
          } else {
            currentEmail = currentEmails[index]?.value || '';
            currentLabel = currentEmails[index]?.type || 'other';
          }

          const finalEmail = emailValue !== undefined ? emailValue : currentEmail;
          const finalLabel = labelValue !== undefined ? labelValue : currentLabel;

          if (finalEmail && isValidEmail(finalEmail)) {
            emails.push({
              value: normalizeEmail(finalEmail),
              type: mapLabelToGoogleType(finalLabel || 'other', 'email'),
              metadata: { primary: index === 0 }
            });
          }
        });

        // Add remaining current emails
        const remainingEmails = currentEmails.slice(10);
        emails = [...emails, ...remainingEmails];

        updateData.emailAddresses = deduplicateContactFields(emails);
        updateMask.push("emailAddresses");
      }

      // Handle phone updates (all 10 phones)
      if (primaryPhone !== undefined || phone2 !== undefined || phone3 !== undefined || phone4 !== undefined || phone5 !== undefined ||
        phone6 !== undefined || phone7 !== undefined || phone8 !== undefined || phone9 !== undefined || phone10 !== undefined ||
        primaryPhoneLabel !== undefined || phone2Label !== undefined || phone3Label !== undefined || phone4Label !== undefined || phone5Label !== undefined ||
        phone6Label !== undefined || phone7Label !== undefined || phone8Label !== undefined || phone9Label !== undefined || phone10Label !== undefined) {

        const currentPhones = currentContact.phoneNumbers || [];
        let phones = [];

        // Handle phones 1-10
        const phoneParams = [
          [primaryPhone, primaryPhoneLabel], [phone2, phone2Label], [phone3, phone3Label], [phone4, phone4Label], [phone5, phone5Label],
          [phone6, phone6Label], [phone7, phone7Label], [phone8, phone8Label], [phone9, phone9Label], [phone10, phone10Label]
        ];

        phoneParams.forEach(([phoneValue, labelValue], index) => {
          let currentPhone, currentLabel;

          if (index === 0) {
            // Primary phone
            currentPhone = currentPhones.find((p: any) => p.metadata?.primary)?.value || '';
            currentLabel = currentPhones.find((p: any) => p.metadata?.primary)?.type || 'other';
          } else {
            currentPhone = currentPhones[index]?.value || '';
            currentLabel = currentPhones[index]?.type || 'other';
          }

          const finalPhone = phoneValue !== undefined ? phoneValue : currentPhone;
          const finalLabel = labelValue !== undefined ? labelValue : currentLabel;

          if (finalPhone && isValidPhone(finalPhone)) {
            phones.push({
              value: normalizePhoneNumber(finalPhone),
              type: mapLabelToGoogleType(finalLabel || 'other', 'phone'),
              metadata: { primary: index === 0 }
            });
          }
        });

        // Add remaining current phones
        const remainingPhones = currentPhones.slice(10);
        phones = [...phones, ...remainingPhones];

        updateData.phoneNumbers = deduplicateContactFields(phones);
        updateMask.push("phoneNumbers");
      }

      // Handle organization updates
      if (organization !== undefined || jobTitle !== undefined || department !== undefined) {
        const currentOrgs = currentContact.organizations || [];
        const currentOrg = currentOrgs[0] || {};

        const orgName = organization !== undefined ? organization : (currentOrg.name || "");
        const orgTitle = jobTitle !== undefined ? jobTitle : (currentOrg.title || "");
        const orgDept = department !== undefined ? department : (currentOrg.department || "");

        updateData.organizations = createOrganizationData(orgName, orgTitle, orgDept);
        updateMask.push("organizations");
      }

      // Handle address updates (all 5 addresses)
      const addressParams = [
        [address1Country, address1Street, address1Street2, address1Postcode, address1City, address1POBox, address1Label],
        [address2Country, address2Street, address2Street2, address2Postcode, address2City, address2POBox, address2Label],
        [address3Country, address3Street, address3Street2, address3Postcode, address3City, address3POBox, address3Label],
        [address4Country, address4Street, address4Street2, address4Postcode, address4City, address4POBox, address4Label],
        [address5Country, address5Street, address5Street2, address5Postcode, address5City, address5POBox, address5Label]
      ];

      const hasAddressUpdates = addressParams.some(params => params.some(param => param !== undefined));

      if (hasAddressUpdates) {
        const currentAddresses = currentContact.addresses || [];
        let addresses = [];

        addressParams.forEach((params, index) => {
          const [country, street, street2, postcode, city, poBox, label] = params;
          const currentAddr = currentAddresses[index] || {};

          const finalCountry = country !== undefined ? country : (convertCountryCodeToName(currentAddr.countryCode) || '');
          const finalStreet = street !== undefined ? street : (currentAddr.streetAddress || '');
          const finalStreet2 = street2 !== undefined ? street2 : (currentAddr.extendedAddress || '');
          const finalPostcode = postcode !== undefined ? postcode : (currentAddr.postalCode || '');
          const finalCity = city !== undefined ? city : (currentAddr.city || '');
          const finalPoBox = poBox !== undefined ? poBox : (currentAddr.poBox || '');
          const finalLabel = label !== undefined ? label : (currentAddr.type || 'other');

          if (hasAddressContent(finalCountry, finalStreet, finalStreet2, finalPostcode, finalCity, finalPoBox)) {
            addresses.push({
              country: convertCountryNameToCode(finalCountry),
              countryCode: convertCountryNameToCode(finalCountry),
              streetAddress: cleanAddressComponent(finalStreet),
              extendedAddress: cleanAddressComponent(finalStreet2),
              postalCode: cleanAddressComponent(finalPostcode),
              city: cleanAddressComponent(finalCity),
              poBox: cleanAddressComponent(finalPoBox),
              type: mapLabelToGoogleType(finalLabel, 'address'),
              metadata: { primary: index === 0 }
            });
          }
        });

        // Add remaining current addresses
        const remainingAddresses = currentAddresses.slice(5);
        addresses = [...addresses, ...remainingAddresses];

        updateData.addresses = addresses;
        updateMask.push("addresses");
      }

      // Handle personal info updates
      if (birthday !== undefined) {
        if (birthday) {
          const googleDate = createGoogleDate(birthday);
          updateData.birthdays = googleDate ? [{ date: googleDate }] : [];
        } else {
          updateData.birthdays = [];
        }
        updateMask.push("birthdays");
      }

      if (website !== undefined) {
        updateData.urls = website ? [{ value: website }] : [];
        updateMask.push("urls");
      }

      if (notes !== undefined) {
        updateData.biographies = notes ? [{ value: notes, contentType: "TEXT_PLAIN" }] : [];
        updateMask.push("biographies");
      }

      // Handle significant dates
      if (significantDate1 !== undefined || significantDate1Label !== undefined || significantDate2 !== undefined || significantDate2Label !== undefined || significantDate3 !== undefined || significantDate3Label !== undefined) {
        const currentEvents = currentContact.events || [];
        let events = [];

        const dateParams = [
          [significantDate1, significantDate1Label],
          [significantDate2, significantDate2Label],
          [significantDate3, significantDate3Label]
        ];

        dateParams.forEach(([dateValue, labelValue], index) => {
          const currentDate = currentEvents[index]?.date;
          const currentLabel = currentEvents[index]?.type;

          const finalDate = dateValue !== undefined ? dateValue : currentDate;
          const finalLabel = labelValue !== undefined ? labelValue : currentLabel;

          if (finalDate) {
            const googleDate = createGoogleDate(finalDate);
            if (googleDate) {
              events.push({
                date: googleDate,
                type: finalLabel || 'other'
              });
            }
          }
        });

        // Add remaining current events
        const remainingEvents = currentEvents.slice(3);
        events = [...events, ...remainingEvents];

        updateData.events = events;
        updateMask.push("events");
      }

      // Handle related people
      if (relatedPeople !== undefined) {
        updateData.relations = parseRelatedPeopleToRelations(relatedPeople);
        updateMask.push("relations");
      }

      // Handle custom fields
      if (customField1 !== undefined || customField1Label !== undefined || customField2 !== undefined || customField2Label !== undefined ||
        customField3 !== undefined || customField3Label !== undefined || customField4 !== undefined || customField4Label !== undefined ||
        customField5 !== undefined || customField5Label !== undefined) {

        const currentUserDefined = currentContact.userDefined || [];
        const customFieldsData: { [key: string]: string } = {};

        // Handle custom fields 1-5
        const customFieldParams = [
          [customField1, customField1Label, 'Custom Field 1'],
          [customField2, customField2Label, 'Custom Field 2'],
          [customField3, customField3Label, 'Custom Field 3'],
          [customField4, customField4Label, 'Custom Field 4'],
          [customField5, customField5Label, 'Custom Field 5']
        ];

        customFieldParams.forEach(([fieldValue, labelValue, defaultLabel], index) => {
          const currentField = currentUserDefined[index];

          const finalValue = fieldValue !== undefined ? fieldValue : (currentField?.value || '');
          const finalLabel = labelValue !== undefined ? labelValue : (currentField?.key || defaultLabel);

          customFieldsData[`customField${index + 1}`] = finalValue;
          customFieldsData[`customField${index + 1}Label`] = finalLabel;
        });

        // Preserve remaining custom fields
        for (let i = 5; i < currentUserDefined.length; i++) {
          customFieldsData[`customField${i + 1}`] = currentUserDefined[i].value;
          customFieldsData[`customField${i + 1}Label`] = currentUserDefined[i].key;
        }

        updateData.userDefined = createCustomFieldsArray(customFieldsData);
        updateMask.push("userDefined");
      }

      // Ensure we have something to update
      if (updateMask.length === 0) {
        throw new coda.UserVisibleError("No fields provided for update. Please specify at least one field to update.");
      }

      // Validate update data
      const validation = validateContactData(updateData, true); // Pass true for isUpdate
      if (!validation.isValid) {
        throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
      }

      updateData.etag = etag;

      // Perform the update
      const updateResponse = await context.fetcher.fetch({
        method: "PATCH",
        url: `https://people.googleapis.com/v1/${resourceName}:updateContact?updatePersonFields=${updateMask.join(",")}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });

      const updatedContact = extractContactData(updateResponse.body);
      logContactOperation('UPDATE_CONTACT_SUCCESS', resourceName);
      return updatedContact;
    } catch (error) {
      logContactOperation('UPDATE_CONTACT_ERROR', resourceName, { error: error.message });

      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Contact not found: ${resourceName}`);
      } else if (error.statusCode === 409) {
        throw new coda.UserVisibleError('Contact was modified by another source. Please refresh and try again.');
      }

      throw new coda.UserVisibleError(`Failed to update contact: ${error.message}`);
    }
  }
});

// DELETE CONTACT - Delete contact (with proper Other Contact handling)
pack.addFormula({
  name: "DeleteContact",
  description: "Delete a contact from Google Contacts (regular contacts only)",
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

      // Check if this is an Other Contact (cannot be deleted)
      if (resourceName.includes('otherContacts/')) {
        throw new coda.UserVisibleError(
          "Other Contacts cannot be deleted via the Google API. " +
          "Other Contacts are auto-generated from Gmail interactions and are read-only. " +
          "If you want to manage this contact, use 'CopyOtherContactToContacts' first to create an editable version."
        );
      }

      await context.fetcher.fetch({
        method: "DELETE",
        url: `https://people.googleapis.com/v1/${resourceName}:deleteContact`
      });

      logContactOperation('DELETE_CONTACT_SUCCESS', resourceName);
      return `Contact deleted: ${resourceName}`;
    } catch (error) {
      logContactOperation('DELETE_CONTACT_ERROR', resourceName, { error: error.message });

      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Contact not found: ${resourceName}`);
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError('Permission denied. You may not have permission to delete this contact.');
      }

      throw new coda.UserVisibleError(`Failed to delete contact: ${error.message}`);
    }
  }
});

// COPY CONTACT - General contact copying with field selection
pack.addFormula({
  name: "CopyContact",
  description: "Copy a contact with selective field copying",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "sourceResourceName",
      description: "Resource name of the contact to copy"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "nameSuffix",
      description: "Suffix to add to name (default: 'Copy')",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyEmails",
      description: "Copy email addresses (default: true)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyPhones",
      description: "Copy phone numbers (default: true)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyOrganization",
      description: "Copy organization info (default: true)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyAddresses",
      description: "Copy addresses (default: true)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyOtherFields",
      description: "Copy other fields (notes, website, dates, etc.) (default: true)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([sourceResourceName, nameSuffix, copyEmails, copyPhones, copyOrganization, copyAddresses, copyOtherFields], context) {
    try {
      logContactOperation('COPY_CONTACT_START', sourceResourceName);

      // Get the source contact
      const getResponse = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${sourceResourceName}?personFields=names,emailAddresses,phoneNumbers,organizations,addresses,birthdays,biographies,urls,events,relations,userDefined,nicknames`,
      });

      const sourceContact = getResponse.body;
      const suffix = nameSuffix || "Copy";

      // Build the copy data based on selected options (default all to true)
      const copyData: any = {};

      // Always copy names (with suffix)
      if (sourceContact.names && sourceContact.names.length > 0) {
        const originalName = sourceContact.names[0];
        copyData.names = [{
          givenName: originalName.givenName || "",
          familyName: originalName.familyName ? `${originalName.familyName} ${suffix}` : suffix,
          middleName: originalName.middleName || "",
          honorificPrefix: originalName.honorificPrefix || "",
          honorificSuffix: originalName.honorificSuffix || ""
        }];
      } else {
        copyData.names = [{ givenName: "Copy", familyName: "" }];
      }

      // Copy emails (default: true)
      if ((copyEmails !== false) && sourceContact.emailAddresses) {
        copyData.emailAddresses = sourceContact.emailAddresses.map((email: any) => ({
          value: email.value,
          type: email.type || 'other'
        }));
      }

      // Copy phones (default: true)
      if ((copyPhones !== false) && sourceContact.phoneNumbers) {
        copyData.phoneNumbers = sourceContact.phoneNumbers.map((phone: any) => ({
          value: phone.value,
          type: phone.type || 'other'
        }));
      }

      // Copy organization (default: true)
      if ((copyOrganization !== false) && sourceContact.organizations) {
        copyData.organizations = sourceContact.organizations.map((org: any) => ({
          name: org.name || "",
          title: org.title || "",
          department: org.department || ""
        }));
      }

      // Copy addresses (default: true)
      if ((copyAddresses !== false) && sourceContact.addresses) {
        copyData.addresses = sourceContact.addresses.map((addr: any) => ({
          country: addr.country || "",
          streetAddress: addr.streetAddress || "",
          extendedAddress: addr.extendedAddress || "",
          postalCode: addr.postalCode || "",
          city: addr.city || "",
          poBox: addr.poBox || "",
          type: addr.type || 'other'
        }));
      }

      // Copy other fields (default: true)
      if (copyOtherFields !== false) {
        if (sourceContact.biographies) {
          copyData.biographies = sourceContact.biographies.map((bio: any) => ({
            value: bio.value,
            contentType: bio.contentType || "TEXT_PLAIN"
          }));
        }

        if (sourceContact.urls) {
          copyData.urls = sourceContact.urls.map((url: any) => ({
            value: url.value
          }));
        }

        if (sourceContact.birthdays) {
          copyData.birthdays = sourceContact.birthdays.map((birthday: any) => ({
            date: birthday.date
          }));
        }

        if (sourceContact.events) {
          copyData.events = sourceContact.events.map((event: any) => ({
            date: event.date,
            type: event.type
          }));
        }

        if (sourceContact.relations) {
          copyData.relations = sourceContact.relations.map((relation: any) => ({
            person: relation.person,
            type: relation.type
          }));
        }

        if (sourceContact.userDefined) {
          copyData.userDefined = sourceContact.userDefined.map((field: any) => ({
            key: field.key,
            value: field.value
          }));
        }

        if (sourceContact.nicknames) {
          copyData.nicknames = sourceContact.nicknames.map((nickname: any) => ({
            value: nickname.value
          }));
        }
      }

      // Validate the copy data
      const validation = validateContactData(copyData);
      if (!validation.isValid) {
        throw new coda.UserVisibleError(`Invalid contact data: ${validation.errors.join(', ')}`);
      }

      // Create the copied contact
      const createResponse = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(copyData)
      });

      const copiedContact = extractContactData(createResponse.body);
      logContactOperation('COPY_CONTACT_SUCCESS', copiedContact.resourceName);
      return copiedContact;
    } catch (error) {
      logContactOperation('COPY_CONTACT_ERROR', sourceResourceName, { error: error.message });
      throw new coda.UserVisibleError(`Failed to copy contact: ${error.message}`);
    }
  }
});

// COPY OTHER CONTACT TO CONTACTS - Convert other contact to regular contact
pack.addFormula({
  name: "CopyOtherContactToContacts",
  description: "Copy an 'Other Contact' to your main contacts list",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Resource name of the Other Contact to copy"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyNames",
      description: "Copy names (default: true)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyEmails",
      description: "Copy email addresses (default: true)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "copyPhones",
      description: "Copy phone numbers (default: true)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([resourceName, copyNames, copyEmails, copyPhones], context) {
    try {
      logContactOperation('COPY_OTHER_CONTACT_START', resourceName);

      if (!resourceName.includes('otherContacts/')) {
        throw new coda.UserVisibleError("This formula is only for Other Contacts. Use CopyContact for regular contacts.");
      }

      // Build copyMask based on parameters (default all to true)
      const selectedFields = [];
      if (copyNames !== false) selectedFields.push("names");
      if (copyEmails !== false) selectedFields.push("emailAddresses");
      if (copyPhones !== false) selectedFields.push("phoneNumbers");

      const copyMask = selectedFields.join(",");

      const response = await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${resourceName}:copyOtherContactToMyContactsGroup`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          copyMask: copyMask,
          readMask: "names,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata"
        })
      });

      const copiedContact = extractContactData(response.body);
      logContactOperation('COPY_OTHER_CONTACT_SUCCESS', copiedContact.resourceName);
      return copiedContact;
    } catch (error) {
      logContactOperation('COPY_OTHER_CONTACT_ERROR', resourceName, { error: error.message });
      throw new coda.UserVisibleError(`Failed to copy Other Contact: ${error.message}`);
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
      description: "Contact group resource name (e.g., contactGroups/myContacts)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceName",
      description: "Contact resource name (e.g., people/c123456789)"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceName], context) {
    try {
      // Pre-validation for deprecated groups
      const deprecatedGroups = [
        'contactGroups/friends',
        'contactGroups/family',
        'contactGroups/coworkers'
      ];

      if (deprecatedGroups.includes(groupResourceName)) {
        const groupName = groupResourceName.split('/')[1];
        throw new coda.UserVisibleError(
          `❌ Cannot add contacts to deprecated "${groupName}" group.\n\n` +
          `Google has deprecated this system group and it can no longer be modified.\n\n` +
          `SOLUTIONS:\n` +
          `• Create a custom group: CreateContactGroup("${groupName}")\n` +
          `• Use "contactGroups/myContacts" for general contacts\n` +
          `• Use "contactGroups/starred" for important contacts\n\n` +
          `Deprecated groups: friends, family, coworkers`
        );
      }

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
      return `✅ Contact successfully added to group: ${contactResourceName} → ${groupResourceName}`;
    } catch (error) {
      logContactOperation('ADD_TO_GROUP_ERROR', contactResourceName, { group: groupResourceName, error: error.message });

      if (error.statusCode === 400 && error.message?.includes('deprecated system contact group')) {
        const groupName = groupResourceName.split('/')[1] || 'system group';
        throw new coda.UserVisibleError(
          `Cannot modify deprecated "${groupName}" group.\n\n` +
          `This Google system group is no longer supported.\n\n` +
          `SOLUTIONS:\n` +
          `• Create a custom group: CreateContactGroup("${groupName}")\n` +
          `• Use "contactGroups/myContacts" instead\n` +
          `• Use "contactGroups/starred" for important contacts`
        );
      } else if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `Contact or group not found.\n\n` +
          `Please verify:\n` +
          `• Contact exists: ${contactResourceName}\n` +
          `• Group exists: ${groupResourceName}\n\n` +
          `Use SearchContacts() to find contact resource names.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `Permission denied.\n\n` +
          `You may not have permission to modify this contact group.\n` +
          `Try reconnecting your Google account or check group permissions.`
        );
      }

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
      description: "Contact group resource name (e.g., contactGroups/myContacts)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceName",
      description: "Contact resource name (e.g., people/c123456789)"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceName], context) {
    try {
      // Pre-validate for deprecated groups
      const deprecatedGroups = [
        'contactGroups/friends',
        'contactGroups/family',
        'contactGroups/coworkers'
      ];

      if (deprecatedGroups.includes(groupResourceName)) {
        const groupName = groupResourceName.split('/')[1];
        throw new coda.UserVisibleError(
          `Cannot remove contacts from deprecated "${groupName}" group.\n\n` +
          `Google has deprecated this system group and it can no longer be modified.\n\n` +
          `NOTE: If this contact is in a deprecated group, you cannot remove it via API.\n` +
          `The contact will remain in this deprecated group until Google removes it.`
        );
      }

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
      return `✅ Contact successfully removed from group: ${contactResourceName} ← ${groupResourceName}`;
    } catch (error) {
      logContactOperation('REMOVE_FROM_GROUP_ERROR', contactResourceName, { group: groupResourceName, error: error.message });

      if (error.statusCode === 400 && error.message?.includes('deprecated system contact group')) {
        const groupName = groupResourceName.split('/')[1] || 'system group';
        throw new coda.UserVisibleError(
          `Cannot modify deprecated "${groupName}" group.\n\n` +
          `This Google system group is no longer supported.\n\n` +
          `NOTE: Contacts in deprecated groups cannot be removed via API.`
        );
      } else if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `Contact or group not found.\n\n` +
          `Please verify:\n` +
          `• Contact exists: ${contactResourceName}\n` +
          `• Group exists: ${groupResourceName}\n` +
          `• Contact is actually in this group\n\n` +
          `Use SearchContacts() to find contact resource names.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `Permission denied.\n\n` +
          `You may not have permission to modify this contact group.\n` +
          `Try reconnecting your Google account or check group permissions.`
        );
      }

      throw new coda.UserVisibleError(`Failed to remove contact from group: ${error.message}`);
    }
  }
});

// Batch Add Contacts to Group
pack.addFormula({
  name: "BatchAddContactsToGroup",
  description: "Add multiple contacts to a contact group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "groupResourceName",
      description: "Contact group resource name (e.g., contactGroups/myContacts)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceNames",
      description: "Comma-separated list of contact resource names (e.g., 'people/c123,people/c456,people/c789')"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceNames], context) {
    try {
      // Pre-validate for deprecated groups
      const deprecatedGroups = [
        'contactGroups/friends',
        'contactGroups/family',
        'contactGroups/coworkers'
      ];

      if (deprecatedGroups.includes(groupResourceName)) {
        const groupName = groupResourceName.split('/')[1];
        throw new coda.UserVisibleError(
          `Cannot add contacts to deprecated "${groupName}" group.\n\n` +
          `Google has deprecated this system group and it can no longer be modified.\n\n` +
          `SOLUTIONS:\n` +
          `• Create a custom group: CreateContactGroup("${groupName}")\n` +
          `• Use "contactGroups/myContacts" for general contacts\n` +
          `• Use "contactGroups/starred" for important contacts\n\n` +
          `Deprecated groups: friends, family, coworkers`
        );
      }

      const resourceNames = contactResourceNames.split(',').map(name => name.trim()).filter(Boolean);

      if (resourceNames.length === 0) {
        throw new coda.UserVisibleError(
          `No contact resource names provided.\n\n` +
          `Please provide comma-separated contact resource names:\n` +
          `Example: "people/c123,people/c456,people/c789"`
        );
      }

      if (resourceNames.length > 500) {
        throw new coda.UserVisibleError(
          `Too many contacts (${resourceNames.length}).\n\n` +
          `Maximum 500 contacts can be added at once.\n` +
          `Please split into smaller batches.`
        );
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
      return `✅ Successfully added ${resourceNames.length} contacts to group: ${groupResourceName}`;
    } catch (error) {
      logContactOperation('BATCH_ADD_TO_GROUP_ERROR', groupResourceName, { error: error.message });

      if (error.statusCode === 400 && error.message?.includes('deprecated system contact group')) {
        const groupName = groupResourceName.split('/')[1] || 'system group';
        throw new coda.UserVisibleError(
          `Cannot modify deprecated "${groupName}" group.\n\n` +
          `This Google system group is no longer supported.\n\n` +
          `SOLUTIONS:\n` +
          `• Create a custom group: CreateContactGroup("${groupName}")\n` +
          `• Use "contactGroups/myContacts" instead`
        );
      } else if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `Group not found: ${groupResourceName}\n\n` +
          `Please check the group resource name.\n` +
          `Use the ContactGroups sync table to see available groups.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `Permission denied.\n\n` +
          `You may not have permission to modify this contact group.\n` +
          `Try reconnecting your Google account or check group permissions.`
        );
      } else if (error.statusCode === 400) {
        throw new coda.UserVisibleError(
          `Invalid request.\n\n` +
          `Check that:\n` +
          `• All contact resource names are valid\n` +
          `• Contact resource names are formatted correctly (people/c...)\n` +
          `• Contacts exist and are accessible\n\n` +
          `Error details: ${error.message}`
        );
      }

      throw new coda.UserVisibleError(`Failed to add contacts to group: ${error.message}`);
    }
  }
});

// Batch Remove Contacts from Group
pack.addFormula({
  name: "BatchRemoveContactsFromGroup",
  description: "Remove multiple contacts from a contact group",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "groupResourceName",
      description: "Contact group resource name (e.g., contactGroups/myContacts)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "contactResourceNames",
      description: "Comma-separated list of contact resource names (e.g., 'people/c123,people/c456,people/c789')"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([groupResourceName, contactResourceNames], context) {
    try {
      // Pre-validate for deprecated groups
      const deprecatedGroups = [
        'contactGroups/friends',
        'contactGroups/family',
        'contactGroups/coworkers'
      ];

      if (deprecatedGroups.includes(groupResourceName)) {
        const groupName = groupResourceName.split('/')[1];
        throw new coda.UserVisibleError(
          `Cannot remove contacts from deprecated "${groupName}" group.\n\n` +
          `Google has deprecated this system group and it can no longer be modified.\n\n` +
          `NOTE: Contacts in deprecated groups cannot be removed via API.\n` +
          `They will remain until Google removes the deprecated group.`
        );
      }

      const resourceNames = contactResourceNames.split(',').map(name => name.trim()).filter(Boolean);

      if (resourceNames.length === 0) {
        throw new coda.UserVisibleError(
          `No contact resource names provided.\n\n` +
          `Please provide comma-separated contact resource names:\n` +
          `Example: "people/c123,people/c456,people/c789"`
        );
      }

      if (resourceNames.length > 500) {
        throw new coda.UserVisibleError(
          `Too many contacts (${resourceNames.length}).\n\n` +
          `Maximum 500 contacts can be removed at once.\n` +
          `Please split into smaller batches.`
        );
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
      return `✅ Successfully removed ${resourceNames.length} contacts from group: ${groupResourceName}`;
    } catch (error) {
      logContactOperation('BATCH_REMOVE_FROM_GROUP_ERROR', groupResourceName, { error: error.message });

      if (error.statusCode === 400 && error.message?.includes('deprecated system contact group')) {
        const groupName = groupResourceName.split('/')[1] || 'system group';
        throw new coda.UserVisibleError(
          `Cannot modify deprecated "${groupName}" group.\n\n` +
          `This Google system group is no longer supported.\n\n` +
          `NOTE: Contacts in deprecated groups cannot be removed via API.`
        );
      } else if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `Group not found: ${groupResourceName}\n\n` +
          `Please check the group resource name.\n` +
          `Use the ContactGroups sync table to see available groups.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `Permission denied.\n\n` +
          `You may not have permission to modify this contact group.\n` +
          `Try reconnecting your Google account or check group permissions.`
        );
      } else if (error.statusCode === 400) {
        throw new coda.UserVisibleError(
          `Invalid request.\n\n` +
          `Check that:\n` +
          `• All contact resource names are valid\n` +
          `• Contact resource names are formatted correctly (people/c...)\n` +
          `• Contacts exist and are accessible\n` +
          `• Contacts are actually in this group\n\n` +
          `Error details: ${error.message}`
        );
      }

      throw new coda.UserVisibleError(`Failed to remove contacts from group: ${error.message}`);
    }
  }
});

// Search Contacts (helpful for finding resource names)
pack.addFormula({
  name: "SearchContacts",
  description: "Search for contacts by name, email, or other fields",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "query",
      description: "Search query (name, email, phone, organization)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maxResults",
      description: "Maximum number of results to return (default: 10, max: 50)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Array,
  items: ContactSchema,
  execute: async function ([query, maxResults], context) {
    try {
      if (!query || !query.trim()) {
        throw new coda.UserVisibleError("Search query is required");
      }

      const limit = Math.min(maxResults || 10, 50);
      logContactOperation('SEARCH_CONTACTS_START', query, { maxResults: limit });

      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/people:searchContacts?query=${encodeURIComponent(query)}&pageSize=${limit}&readMask=names,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,metadata`,
        cacheTtlSecs: 60
      });

      const people = response.body.results || [];
      const results = people.map((result: any) => {
        try {
          return extractContactData(result.person);
        } catch (extractError) {
          logContactOperation('SEARCH_EXTRACT_ERROR', result.person?.resourceName || 'unknown', { error: extractError.message });
          return null;
        }
      }).filter(Boolean);

      logContactOperation('SEARCH_CONTACTS_SUCCESS', query, { resultCount: results.length });
      return results;
    } catch (error) {
      logContactOperation('SEARCH_CONTACTS_ERROR', query, { error: error.message });
      throw new coda.UserVisibleError(`Failed to search contacts: ${error.message}`);
    }
  }
});

// CREATE CONTACT GROUP
pack.addFormula({
  name: "CreateContactGroup",
  description: "Create a new custom contact group with status information",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Name of the contact group"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "skipIfExists",
      description: "Skip creation if a group with this name already exists (default: false)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactGroupSchema,
  isAction: true,
  execute: async function ([name, skipIfExists], context) {
    try {
      if (!name || !name.trim()) {
        throw new coda.UserVisibleError(
          `ERROR: Group name is required.\n\n` +
          `Please provide a valid name for the contact group.`
        );
      }

      const trimmedName = name.trim();

      // Check for existing groups if skipIfExists is true
      if (skipIfExists) {
        try {
          const existingResponse = await context.fetcher.fetch({
            method: "GET",
            url: "https://people.googleapis.com/v1/contactGroups?pageSize=1000",
            cacheTtlSecs: 60
          });

          const existingGroups = existingResponse.body.contactGroups || [];
          const existingGroup = existingGroups.find((g: any) =>
            g.name === trimmedName || g.formattedName === trimmedName
          );

          if (existingGroup) {
            logContactOperation('CREATE_GROUP_SKIPPED', trimmedName, { reason: 'Already exists' });
            return createGroupResult(existingGroup);
          }
        } catch (checkError) {
          // Continue with creation if check fails
          logContactOperation('CREATE_GROUP_CHECK_FAILED', trimmedName, { error: checkError.message });
        }
      }

      logContactOperation('CREATE_GROUP_START', trimmedName);

      const response = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/contactGroups",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactGroup: {
            name: trimmedName
          }
        })
      });

      const group = response.body;
      const result = createGroupResult(group);

      logContactOperation('CREATE_GROUP_SUCCESS', result.resourceName);
      return result;
    } catch (error) {
      logContactOperation('CREATE_GROUP_ERROR', name, { error: error.message });

      if (error.statusCode === 400) {
        throw new coda.UserVisibleError(
          `ERROR: Invalid group name: "${name}"\n\n` +
          `Please check that:\n` +
          `• Name is not empty or whitespace only\n` +
          `• Name doesn't contain invalid characters\n` +
          `• Name is not already in use\n\n` +
          `Error details: ${error.message}`
        );
      } else if (error.statusCode === 409) {
        throw new coda.UserVisibleError(
          `ERROR: Group name conflict: "${name}"\n\n` +
          `A group with this name may already exist.\n` +
          `Try using skipIfExists=true to handle existing groups gracefully.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `ERROR: Permission denied.\n\n` +
          `You may not have permission to create contact groups.\n` +
          `Try reconnecting your Google account.`
        );
      }

      throw new coda.UserVisibleError(`ERROR: Failed to create contact group: ${error.message}`);
    }
  }
});

// READ CONTACT GROUP
pack.addFormula({
  name: "ReadContactGroup",
  description: "Read detailed information about a specific contact group with status",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact group resource name (e.g., contactGroups/myContacts)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "includeMemberDetails",
      description: "Include detailed member information (default: false for performance)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactGroupSchema,
  execute: async function ([resourceName, includeMemberDetails], context) {
    try {
      if (!resourceName || !resourceName.trim()) {
        throw new coda.UserVisibleError(
          `ERROR: Group resource name is required.\n\n` +
          `Example: "contactGroups/myContacts"`
        );
      }

      logContactOperation('READ_GROUP_START', resourceName);

      const maxMembers = includeMemberDetails ? 10000 : 0;
      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?maxMembers=${maxMembers}`,
        cacheTtlSecs: 60
      });

      const group = response.body;
      const result = createGroupResult(group);

      logContactOperation('READ_GROUP_SUCCESS', resourceName);
      return result;
    } catch (error) {
      logContactOperation('READ_GROUP_ERROR', resourceName, { error: error.message });

      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `ERROR: Contact group not found: ${resourceName}\n\n` +
          `Please verify:\n` +
          `• The resource name is correct\n` +
          `• The group exists and is accessible\n` +
          `• You have permission to access this group\n\n` +
          `Use the ContactGroups sync table to see available groups.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `ERROR: Permission denied.\n\n` +
          `You may not have access to this contact group.\n` +
          `Try reconnecting your Google account.`
        );
      }

      throw new coda.UserVisibleError(`ERROR: Failed to read contact group: ${error.message}`);
    }
  }
});

// UPDATE CONTACT GROUP
pack.addFormula({
  name: "UpdateContactGroup",
  description: "Update a contact group's name with validation and error handling",
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
      description: "ETag of the contact group (get from ReadContactGroup or sync table)",
      optional: true
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName, newName, etag], context) {
    try {
      if (!resourceName || !resourceName.trim()) {
        throw new coda.UserVisibleError(
          `ERROR: Group resource name is required.\n\n` +
          `Example: "contactGroups/abc123def456"`
        );
      }

      if (!newName || !newName.trim()) {
        throw new coda.UserVisibleError(
          `ERROR: New group name is required.\n\n` +
          `Please provide a valid name for the contact group.`
        );
      }

      // Check if this is a modifiable group
      const analysis = analyzeContactGroup(resourceName);
      if (!analysis.canModify) {
        if (analysis.isDeprecated) {
          const groupName = resourceName.split('/')[1];
          throw new coda.UserVisibleError(
            `ERROR: Cannot update deprecated "${groupName}" group.\n\n` +
            `This Google system group is no longer supported.\n\n` +
            `SOLUTION: Create a custom group instead:\n` +
            `CreateContactGroup("${newName.trim()}")`
          );
        } else {
          throw new coda.UserVisibleError(
            `ERROR: Cannot update system group.\n\n` +
            `This system group cannot be renamed.\n\n` +
            `SOLUTION: Create a custom group instead:\n` +
            `CreateContactGroup("${newName.trim()}")`
          );
        }
      }

      // Get current etag if not provided
      let currentEtag = etag;
      if (!currentEtag) {
        try {
          const currentResponse = await context.fetcher.fetch({
            method: "GET",
            url: `https://people.googleapis.com/v1/${resourceName}`,
            cacheTtlSecs: 0
          });
          currentEtag = currentResponse.body.etag;
        } catch (etagError) {
          logContactOperation('UPDATE_GROUP_ETAG_ERROR', resourceName, { error: etagError.message });
          throw new coda.UserVisibleError(
            `ERROR: Could not get current group information.\n\n` +
            `Please provide the etag parameter or ensure the group exists.`
          );
        }
      }

      logContactOperation('UPDATE_GROUP_START', resourceName, { newName: newName.trim() });

      await context.fetcher.fetch({
        method: "PUT",
        url: `https://people.googleapis.com/v1/${resourceName}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactGroup: {
            name: newName.trim(),
            etag: currentEtag
          }
        })
      });

      logContactOperation('UPDATE_GROUP_SUCCESS', resourceName);
      return `SUCCESS: Contact group name updated to "${newName.trim()}"`;
    } catch (error) {
      logContactOperation('UPDATE_GROUP_ERROR', resourceName, { error: error.message });

      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `ERROR: Contact group not found: ${resourceName}\n\n` +
          `The group may have been deleted or the resource name is incorrect.`
        );
      } else if (error.statusCode === 409) {
        throw new coda.UserVisibleError(
          `ERROR: Contact group was modified by another source.\n\n` +
          `Please refresh the group information and try again.\n` +
          `The etag may be outdated.`
        );
      } else if (error.statusCode === 400) {
        throw new coda.UserVisibleError(
          `ERROR: Invalid update request.\n\n` +
          `Please check:\n` +
          `• New name is valid: "${newName}"\n` +
          `• ETag is current\n` +
          `• Group can be modified\n\n` +
          `Error details: ${error.message}`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `ERROR: Permission denied.\n\n` +
          `You may not have permission to update this contact group.\n` +
          `Try reconnecting your Google account.`
        );
      }

      throw new coda.UserVisibleError(`ERROR: Failed to update contact group: ${error.message}`);
    }
  }
});

// DELETE CONTACT GROUP
pack.addFormula({
  name: "DeleteContactGroup",
  description: "Delete a contact group with validation and safety checks",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact group resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "deleteContacts",
      description: "Also delete all contacts in the group (DANGEROUS - default: false)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "confirmDeletion",
      description: "Confirm you want to delete this group (required for safety)",
      optional: true
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName, deleteContacts, confirmDeletion], context) {
    try {
      if (!resourceName || !resourceName.trim()) {
        throw new coda.UserVisibleError(
          `ERROR: Group resource name is required.\n\n` +
          `Example: "contactGroups/abc123def456"`
        );
      }

      if (!confirmDeletion) {
        throw new coda.UserVisibleError(
          `ERROR: Deletion confirmation required.\n\n` +
          `Set confirmDeletion=true to confirm you want to delete this group.\n` +
          `This action cannot be undone.`
        );
      }

      // Check if this is a deletable group
      const analysis = analyzeContactGroup(resourceName);
      if (!analysis.isCustomGroup) {
        if (analysis.isDeprecated) {
          const groupName = resourceName.split('/')[1];
          throw new coda.UserVisibleError(
            `ERROR: Cannot delete deprecated "${groupName}" group.\n\n` +
            `Deprecated system groups cannot be deleted via API.\n` +
            `Google will eventually remove them automatically.`
          );
        } else {
          throw new coda.UserVisibleError(
            `ERROR: Cannot delete system group.\n\n` +
            `System contact groups cannot be deleted.\n` +
            `Only custom groups (created by users) can be deleted.`
          );
        }
      }

      // Get group info for logging
      let groupInfo;
      try {
        const infoResponse = await context.fetcher.fetch({
          method: "GET",
          url: `https://people.googleapis.com/v1/${resourceName}?maxMembers=0`,
          cacheTtlSecs: 0
        });
        groupInfo = infoResponse.body;
      } catch (infoError) {
        logContactOperation('DELETE_GROUP_INFO_ERROR', resourceName, { error: infoError.message });
      }

      const shouldDeleteContacts = deleteContacts === true;
      if (shouldDeleteContacts && groupInfo?.memberCount > 0) {
        logContactOperation('DELETE_GROUP_WARNING', resourceName, {
          memberCount: groupInfo.memberCount,
          deleteContacts: true
        });
      }

      logContactOperation('DELETE_GROUP_START', resourceName, {
        deleteContacts: shouldDeleteContacts,
        memberCount: groupInfo?.memberCount || 0
      });

      const url = `https://people.googleapis.com/v1/${resourceName}${shouldDeleteContacts ? '?deleteContacts=true' : ''}`;

      await context.fetcher.fetch({
        method: "DELETE",
        url: url
      });

      const deletionMessage = shouldDeleteContacts && groupInfo?.memberCount > 0
        ? `WARNING: Contact group and ${groupInfo.memberCount} contacts deleted: ${resourceName}`
        : `SUCCESS: Contact group deleted: ${resourceName}`;

      logContactOperation('DELETE_GROUP_SUCCESS', resourceName);
      return deletionMessage;
    } catch (error) {
      logContactOperation('DELETE_GROUP_ERROR', resourceName, { error: error.message });

      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(
          `ERROR: Contact group not found: ${resourceName}\n\n` +
          `The group may have already been deleted or the resource name is incorrect.`
        );
      } else if (error.statusCode === 403) {
        throw new coda.UserVisibleError(
          `ERROR: Permission denied.\n\n` +
          `You may not have permission to delete this contact group.\n` +
          `Note: Only custom groups can be deleted, not system groups.`
        );
      } else if (error.statusCode === 400) {
        throw new coda.UserVisibleError(
          `ERROR: Invalid deletion request.\n\n` +
          `This group cannot be deleted. Possible reasons:\n` +
          `• It's a system group (only custom groups can be deleted)\n` +
          `• It's a deprecated group\n` +
          `• Invalid resource name format\n\n` +
          `Error details: ${error.message}`
        );
      }

      throw new coda.UserVisibleError(`ERROR: Failed to delete contact group: ${error.message}`);
    }
  }
});

// LIST MODIFIABLE CONTACT GROUPS
pack.addFormula({
  name: "ListModifiableContactGroups",
  description: "List all contact groups that can be safely modified (excludes deprecated and read-only groups)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "customGroupsOnly",
      description: "Show only user-created custom groups (default: false)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Array,
  items: ContactGroupSchema,
  execute: async function ([customGroupsOnly], context) {
    try {
      logContactOperation('LIST_MODIFIABLE_GROUPS_START', 'all', { customOnly: customGroupsOnly });

      const response = await context.fetcher.fetch({
        method: "GET",
        url: "https://people.googleapis.com/v1/contactGroups?pageSize=1000",
        cacheTtlSecs: 300
      });

      const groups = response.body.contactGroups || [];
      const results = [];

      for (const group of groups) {
        try {
          const analysis = analyzeContactGroup(group.resourceName, group.groupType);

          // Filter based on requirements
          if (!analysis.canModify) continue;
          if (customGroupsOnly && !analysis.isCustomGroup) continue;

          // Get detailed member info for modifiable groups
          let detailGroup;
          try {
            const detailResponse = await context.fetcher.fetch({
              method: "GET",
              url: `https://people.googleapis.com/v1/${group.resourceName}?maxMembers=10000`,
              cacheTtlSecs: 300
            });
            detailGroup = detailResponse.body;
          } catch (detailError) {
            logContactOperation('LIST_GROUP_DETAIL_ERROR', group.resourceName, { error: detailError.message });
            detailGroup = group;
          }

          const result = createGroupResult({
            ...detailGroup,
            resourceName: group.resourceName,
            etag: group.etag,
            name: group.name,
            formattedName: group.formattedName,
            groupType: group.groupType
          });

          results.push(result);
        } catch (groupError) {
          logContactOperation('LIST_GROUP_ERROR', group.resourceName, { error: groupError.message });
        }
      }

      logContactOperation('LIST_MODIFIABLE_GROUPS_SUCCESS', 'all', {
        totalGroups: groups.length,
        modifiableGroups: results.length,
        customOnly: customGroupsOnly
      });

      return results;
    } catch (error) {
      logContactOperation('LIST_MODIFIABLE_GROUPS_ERROR', 'all', { error: error.message });
      throw new coda.UserVisibleError(`ERROR: Failed to list modifiable contact groups: ${error.message}`);
    }
  }
});

// EXPLAIN CONTACT LIMITATIONS - Comprehensive helper formula for all contact types and limitations
pack.addFormula({
  name: "ExplainContactLimitations",
  description: "Comprehensive explanation of Google Contacts limitations, types, and available alternatives",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name to analyze (optional - leave empty for general explanation)",
      optional: true
    })
  ],
  resultType: coda.ValueType.String,
  execute: async function ([resourceName], context) {
    try {
      // If no resourceName provided, give comprehensive overview
      if (!resourceName || !resourceName.trim()) {
        return "GOOGLE CONTACTS OVERVIEW\n\n" +
          "Google Contacts has two distinct types with different capabilities:\n\n" +

          "REGULAR CONTACTS (people/c...):\n" +
          "   • Full CRUD operations (Create, Read, Update, Delete)\n" +
          "   • All fields are editable (names, emails, phones, addresses, etc.)\n" +
          "   • Can be organized into contact groups\n" +
          "   • Support custom fields and relationships\n" +
          "   • Two-way sync with Coda tables\n" +
          "   • Can be managed via formulas and sync tables\n\n" +

          "OTHER CONTACTS (otherContacts/c...):\n" +
          "   • Cannot be deleted (Google API limitation)\n" +
          "   • Cannot be directly edited or updated\n" +
          "   • Limited field access (names, emails, phones only)\n" +
          "   • Cannot be added to contact groups\n" +
          "   • Read-only by design\n" +
          "   • Auto-generated from Gmail interactions\n\n" +

          "TO ANALYZE A SPECIFIC CONTACT:\n" +
          "Provide a contact's resourceName to get targeted information and solutions.\n\n" +

          "COMMON SOLUTIONS:\n" +
          "• Use 'CopyOtherContactToContacts' to convert Other Contacts to editable Regular Contacts\n" +
          "• Use contact groups to organize Regular Contacts efficiently\n" +
          "• Use sync tables for bulk contact management";
      }

      const isOtherContact = resourceName.includes('otherContacts/');
      const isRegularContact = resourceName.includes('people/');

      if (isOtherContact) {
        return "OTHER CONTACT LIMITATIONS\n\n" +
          `Contact: ${resourceName}\n\n` +

          "WHAT YOU CANNOT DO:\n" +
          "• Delete this contact (Google API restriction)\n" +
          "• Edit or update any fields directly\n" +
          "• Add to contact groups\n" +
          "• Modify via sync table updates\n" +
          "• Access advanced fields (addresses, custom fields, etc.)\n\n" +

          "WHY THESE LIMITATIONS EXIST:\n" +
          "Other Contacts are automatically generated from your Gmail interactions " +
          "and are designed to be read-only references. Google maintains them as " +
          "lightweight contact records without full contact capabilities.\n\n" +

          "RECOMMENDED SOLUTIONS:\n\n" +

          "1. CONVERT TO REGULAR CONTACT:\n" +
          `   Use: CopyOtherContactToContacts("${resourceName}")\n` +
          "   Result: Creates an editable Regular Contact with the same data\n\n" +

          "2. SELECTIVE FIELD COPYING:\n" +
          `   Use: CopyOtherContactToContacts("${resourceName}", true, true, false)\n` +
          "   Options: (copyNames, copyEmails, copyPhones)\n\n" +

          "3. AFTER CONVERSION:\n" +
          "   • The new Regular Contact can be fully edited\n" +
          "   • Can be deleted if no longer needed\n" +
          "   • Can be added to contact groups\n" +
          "   • Original Other Contact remains unchanged\n" +
          "   • Use UpdateContact() or sync table for modifications\n\n" +

          "BEST PRACTICE:\n" +
          "Convert important Other Contacts to Regular Contacts for full management capabilities.";
      }

      else if (isRegularContact) {
        return "REGULAR CONTACT CAPABILITIES\n\n" +
          `Contact: ${resourceName}\n\n` +

          "FULL OPERATIONS AVAILABLE:\n\n" +

          "CREATE & UPDATE:\n" +
          "• Use CreateContact() for new contacts\n" +
          "• Use UpdateContact() for modifications\n" +
          "• Edit directly in sync tables with two-way sync\n" +
          "• Support for 10 emails, 10 phones, 5 addresses\n" +
          "• Custom fields, relationships, and significant dates\n\n" +

          "DELETE:\n" +
          `• Use DeleteContact("${resourceName}")\n` +
          "• Remove from sync tables\n" +
          "• Permanent removal from Google Contacts\n\n" +

          "GROUP MANAGEMENT:\n" +
          "• Add to contact groups for organization\n" +
          "• Use AddContactToGroup() and RemoveContactFromGroup()\n" +
          "• Filter sync tables by group membership\n\n" +

          "ADVANCED FEATURES:\n" +
          "• Full field access (names, emails, phones, addresses)\n" +
          "• Organization details (company, job title, department)\n" +
          "• Personal information (birthday, website, notes)\n" +
          "• Custom fields for specialized data\n" +
          "• Relationship tracking\n\n" +

          "SYNC & AUTOMATION:\n" +
          "• Two-way sync with Coda tables\n" +
          "• Bulk operations via sync table\n" +
          "• Formula-based automation\n" +
          "• Real-time updates\n\n" +

          "RECOMMENDED ACTIONS:\n" +
          "• Use sync tables for bulk management\n" +
          "• Organize with contact groups\n" +
          "• Leverage custom fields for business data\n" +
          "• Set up automations for contact workflows";
      }

      else {
        return "UNRECOGNIZED CONTACT FORMAT\n\n" +
          `Provided: ${resourceName}\n\n` +

          "POSSIBLE ISSUES:\n" +
          "• Invalid resourceName format\n" +
          "• Contact may not exist\n" +
          "• Malformed contact reference\n\n" +

          "EXPECTED FORMATS:\n\n" +

          "Regular Contacts:\n" +
          "   Format: people/c[ID]\n" +
          "   Example: people/c123456789012345678\n" +
          "   Source: Google Contacts main list\n\n" +

          "Other Contacts:\n" +
          "   Format: otherContacts/c[ID]\n" +
          "   Example: otherContacts/c987654321098765432\n" +
          "   Source: Gmail auto-generated contacts\n\n" +

          "TROUBLESHOOTING:\n" +
          "1. Check the resourceName spelling and format\n" +
          "2. Use ReadContact() to verify the contact exists\n" +
          "3. Use SearchContacts() to find the correct resourceName\n" +
          "4. Check if the contact was recently deleted\n\n" +

          "NEXT STEPS:\n" +
          "• Verify the contact exists in Google Contacts\n" +
          "• Use sync tables to browse all available contacts\n" +
          "• Search by name or email to find the correct reference";
      }

    } catch (error) {
      return "ERROR ANALYZING CONTACT\n\n" +
        `Error: ${error.message}\n\n` +

        "GENERAL TROUBLESHOOTING:\n\n" +

        "CONTACT TYPE REFERENCE:\n" +
        "• Regular Contacts: people/c[ID] - Full capabilities\n" +
        "• Other Contacts: otherContacts/c[ID] - Read-only\n\n" +

        "COMMON LIMITATIONS:\n" +
        "• Other Contacts cannot be deleted or edited\n" +
        "• Use CopyOtherContactToContacts() to make them editable\n" +
        "• Regular Contacts support all operations\n\n" +

        "FOR HELP:\n" +
        "• Check Google Contacts API documentation\n" +
        "• Verify contact permissions and access\n" +
        "• Use sync tables to browse available contacts\n" +
        "• Contact support if issues persist";
    }
  }
});
