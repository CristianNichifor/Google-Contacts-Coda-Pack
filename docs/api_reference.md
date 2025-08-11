# Google Contacts Coda Pack - Complete API Reference

Complete reference for all pack functions with 85+ field support, international capabilities, and comprehensive contact management.

## 📊 Sync Tables

### Contacts
Main sync table with comprehensive two-way sync support for 85+ fields.

**Formula:** `SyncContacts`

**Parameters:**
- `contactTypeFilter` (optional): "CONTACT", "OTHER_CONTACT", or empty for all
- `groupFilter` (optional): Contact group resource name for filtering
- `maxResults` (optional): Maximum contacts to sync (default: 2000, max: 10000)

**Usage in Coda:**
Configure these parameters in the sync table settings, not as function calls.

**Field Categories:**
- **Extended Names (11 fields):** displayName, prefix, givenName, middleName, familyName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs
- **Communications (22 fields):** 10 emails + labels, 10 phones + labels, allEmails, allPhones arrays
- **Addresses (35 fields):** 5 complete addresses with street, street2, city, postcode, country, POBox, label
- **Organization (3 fields):** organization, jobTitle, department
- **Personal (13 fields):** birthday, website, notes, 10 significant dates + labels
- **Advanced (22 fields):** relatedPeople, 10 custom fields + labels
- **System (6 fields):** resourceName, etag, contactType, lastModified, memberships, photoUrl

### ContactGroups
Syncs all contact groups with detailed member information.

**Formula:** `SyncContactGroups`

**Parameters:**
- `maxResults` (optional): Maximum groups to sync (default: 1000)

**Returns:** Contact groups with member counts and resource names

---

## 🔧 Contact Management Actions

### CreateContact
Creates a new contact with comprehensive field support.

**Parameters (21 total):**
```javascript
CreateContact(
  givenName,              // Required: First name
  familyName,             // Optional: Last name
  middleName,             // Optional: Middle name
  primaryEmail,           // Optional: Primary email
  primaryEmailLabel,      // Optional: Email label (work, home, other, etc.)
  primaryPhone,           // Optional: Primary phone
  primaryPhoneLabel,      // Optional: Phone label (mobile, work, home, etc.)
  organization,           // Optional: Company name
  jobTitle,              // Optional: Job title
  department,            // Optional: Department
  primaryAddressCountry, // Optional: Country (from 249 supported)
  primaryAddressStreet,  // Optional: Street address
  primaryAddressStreet2, // Optional: Apt/Suite
  primaryAddressPostcode,// Optional: Postal code
  primaryAddressCity,    // Optional: City
  primaryAddressPOBox,   // Optional: PO Box
  primaryAddressLabel,   // Optional: Address label (home, work, other)
  notes,                 // Optional: Notes
  website,               // Optional: Website URL
  birthday,              // Optional: Birthday (Date object)
  contactGroup           // Optional: Group resource name
)
```

**Examples:**
```javascript
// Comprehensive contact creation
CreateContact(
  "John",                    // givenName
  "Doe",                     // familyName
  "Michael",                 // middleName
  "john.doe@company.com",    // primaryEmail
  "work",                    // primaryEmailLabel
  "+1-555-0123",            // primaryPhone
  "mobile",                 // primaryPhoneLabel
  "Acme Corporation",        // organization
  "Senior Manager",          // jobTitle
  "Sales",                   // department
  "United States",           // primaryAddressCountry
  "123 Business Street",     // primaryAddressStreet
  "Suite 100",              // primaryAddressStreet2
  "12345",                  // primaryAddressPostcode
  "Business City",          // primaryAddressCity
  "PO Box 456",             // primaryAddressPOBox
  "work",                   // primaryAddressLabel
  "Professional notes",      // notes
  "https://company.com",     // website
  Date(1990,5,15),          // birthday
  "contactGroups/salesTeam"  // contactGroup
)

// Minimal contact
CreateContact("Jane", "Smith")

// Contact with email only
CreateContact("Bob", "Wilson", "", "bob@example.com", "work")
```

**Returns:** Complete contact object with all fields populated

### UpdateContact  
Updates existing contact with extensive field support (85+ parameters).

**Key Parameters:**
```javascript
UpdateContact(
  resourceName,           // Required: Contact resource name
  // Extended name fields
  givenName,             // Optional: First name
  familyName,            // Optional: Last name
  middleName,            // Optional: Middle name
  prefix,                // Optional: Mr., Dr., etc.
  suffix,                // Optional: Jr., Sr., etc.
  nickname,              // Optional: Nickname
  phoneticFirst,         // Optional: Phonetic first name
  phoneticMiddle,        // Optional: Phonetic middle name
  phoneticLast,          // Optional: Phonetic last name
  fileAs,                // Optional: Filing preference
  
  // All 10 emails with labels
  primaryEmail, primaryEmailLabel,
  email2, email2Label,
  // ... up to email10, email10Label
  
  // All 10 phones with labels
  primaryPhone, primaryPhoneLabel,
  phone2, phone2Label,
  // ... up to phone10, phone10Label
  
  // Organization
  organization, jobTitle, department,
  
  // All 5 addresses (complete address sets)
  address1Country, address1Street, address1Street2, 
  address1Postcode, address1City, address1POBox, address1Label,
  // ... up to address5 fields
  
  // Personal information
  birthday, website, notes,
  
  // Significant dates
  significantDate1, significantDate1Label,
  significantDate2, significantDate2Label,
  significantDate3, significantDate3Label,
  
  // Related people and custom fields
  relatedPeople,
  customField1, customField1Label,
  customField2, customField2Label,
  // ... up to customField5
  
  contactGroup              // Optional: Group assignment
)
```

**Example:**
```javascript
// Update multiple fields
UpdateContact(
  "people/c123456789",
  "Jonathan",                // givenName
  "Smith",                   // familyName
  "Robert",                  // middleName
  "Dr.",                     // prefix
  "PhD",                     // suffix
  "Jon",                     // nickname
  "",                        // phoneticFirst
  "",                        // phoneticMiddle
  "",                        // phoneticLast
  "Smith, Jonathan R.",      // fileAs
  "jonathan.smith@new.com",  // primaryEmail
  "work"                     // primaryEmailLabel
  // ... additional fields as needed
)
```

**Returns:** Updated contact object with all modified fields

### ReadContact
Retrieves detailed information for a specific contact.

**Parameters:**
- `resourceName` (required): Contact resource name (e.g., "people/c123456789")

**Example:**
```javascript
ReadContact("people/c123456789")
```

**Returns:** Complete contact object with all 85+ fields

### DeleteContact
Deletes a contact from Google Contacts.

**Parameters:**
- `resourceName` (required): Contact resource name

**Example:**
```javascript
DeleteContact("people/c123456789")
```

**Returns:** Success confirmation message

**Note:** Only works with regular contacts (people/c...), not other contacts (otherContacts/c...)

### CopyContact
Copies a contact with selective field copying options.

**Parameters:**
```javascript
CopyContact(
  sourceResourceName,     // Required: Contact to copy
  nameSuffix,            // Optional: Suffix for name (default: "Copy")
  copyEmails,            // Optional: Copy emails (default: true)
  copyPhones,            // Optional: Copy phones (default: true)
  copyOrganization,      // Optional: Copy organization (default: true)
  copyAddresses,         // Optional: Copy addresses (default: true)
  copyOtherFields        // Optional: Copy other fields (default: true)
)
```

**Example:**
```javascript
// Copy contact with selective fields
CopyContact("people/c123", "Backup", true, true, false, true, false)
```

**Returns:** New contact object

### CopyOtherContactToContacts
Converts "Other Contact" to editable regular contact.

**Parameters:**
```javascript
CopyOtherContactToContacts(
  resourceName,          // Required: Other contact resource name
  copyNames,            // Optional: Copy names (default: true)
  copyEmails,           // Optional: Copy emails (default: true)
  copyPhones            // Optional: Copy phones (default: true)
)
```

**Example:**
```javascript
CopyOtherContactToContacts("otherContacts/c987654321", true, true, true)
```

**Returns:** New regular contact object

**Note:** Original other contact remains unchanged

---

## 👥 Contact Group Management

### CreateContactGroup
Creates a new contact group.

**Parameters:**
- `name` (required): Name for the contact group

**Example:**
```javascript
CreateContactGroup("Enterprise Sales Team")
```

**Returns:** Contact group object with resource name

### ReadContactGroup
Reads detailed contact group information.

**Parameters:**
- `resourceName` (required): Contact group resource name

**Example:**
```javascript
ReadContactGroup("contactGroups/salesTeam")
```

**Returns:** Contact group object with member details

### UpdateContactGroup
Updates a contact group's name.

**Parameters:**
```javascript
UpdateContactGroup(
  resourceName,          // Required: Group resource name
  newName,              // Required: New group name
  etag                  // Required: ETag from ReadContactGroup
)
```

**Example:**
```javascript
UpdateContactGroup(
  "contactGroups/salesTeam", 
  "Updated Sales Team Name", 
  "etag_value_from_read"
)
```

**Returns:** Success confirmation message

### DeleteContactGroup
Deletes a contact group.

**Parameters:**
```javascript
DeleteContactGroup(
  resourceName,          // Required: Group resource name
  deleteContacts         // Optional: Also delete contacts (default: false)
)
```

**Example:**
```javascript
DeleteContactGroup("contactGroups/oldTeam", false)
```

**Returns:** Success confirmation message

---

## 🔍 Utility Functions

### ExplainContactLimitations
Comprehensive help system for contact types and limitations.

**Parameters:**
- `resourceName` (optional): Contact resource name to analyze

**Examples:**
```javascript
// General overview
ExplainContactLimitations()

// Analyze specific contact
ExplainContactLimitations("people/c123456789")
ExplainContactLimitations("otherContacts/c987654321")
```

**Returns:** Detailed explanation with solutions and recommendations

---

## 📋 Data Structures

### Complete Contact Object (85+ Fields)
```javascript
{
  // Core identifiers
  resourceName: "people/c123456789",
  etag: "abc123def456",
  
  // Extended names
  displayName: "Dr. John Michael Doe Jr.",
  prefix: "Dr.",
  givenName: "John",
  middleName: "Michael", 
  familyName: "Doe",
  suffix: "Jr.",
  phoneticFirst: "Jon",
  phoneticMiddle: "MY-kel",
  phoneticLast: "Doh",
  nickname: "Johnny",
  fileAs: "Doe, John M.",
  
  // 10 Emails with labels
  primaryEmail: "john.doe@company.com",
  primaryEmailLabel: "work",
  email2: "john@personal.com",
  email2Label: "home",
  // ... up to email10 + email10Label
  
  // Compiled email array
  allEmails: ["john.doe@company.com", "john@personal.com"],
  
  // 10 Phones with labels
  primaryPhone: "+1-555-0123",
  primaryPhoneLabel: "work",
  phone2: "+1-555-0124",
  phone2Label: "mobile",
  // ... up to phone10 + phone10Label
  
  // Compiled phone array
  allPhones: ["+1-555-0123", "+1-555-0124"],
  
  // Organization
  organization: "Acme Corporation",
  jobTitle: "Senior Manager",
  department: "Sales",
  
  // 5 Complete addresses
  primaryAddressStreet: "123 Business St",
  primaryAddressStreet2: "Suite 100",
  primaryAddressCity: "Business City",
  primaryAddressPostcode: "12345",
  primaryAddressCountry: "United States",
  primaryAddressPOBox: "PO Box 456",
  primaryAddressLabel: "work",
  // ... address2 through address5 fields
  
  // Personal information
  birthday: "1990-05-15",
  website: "https://johndoe.com",
  notes: "Important client contact",
  
  // 10 Significant dates
  significantDate1: "2020-01-15",
  significantDate1Label: "anniversary",
  // ... up to significantDate10
  
  // Related people
  relatedPeople: "Jane Doe: spouse, Bob Smith: colleague",
  
  // 10 Custom fields
  customField1: "Employee ID 12345",
  customField1Label: "Employee Information",
  // ... up to customField10
  
  // System fields
  memberships: ["contactGroups/myContacts", "contactGroups/salesTeam"],
  photoUrl: "https://...",
  lastModified: "2024-01-15T10:30:00Z",
  contactType: "CONTACT"
}
```

### Contact Group Object
```javascript
{
  resourceName: "contactGroups/salesTeam",
  etag: "def456ghi789",
  name: "Sales Team",
  formattedName: "Sales Team",
  groupType: "USER_CONTACT_GROUP",
  memberCount: 25,
  memberResourceNames: ["people/c123", "people/c456", "people/c789"]
}
```

---

## 🔄 Contact Types & Capabilities

### Regular Contacts (people/c...)
- ✅ **Full CRUD operations** - Create, Read, Update, Delete
- ✅ **All 85+ fields** available and editable
- ✅ **Two-way sync** with Coda tables
- ✅ **Group management** - add/remove from groups
- ✅ **Advanced features** - custom fields, relationships, international support

### Other Contacts (otherContacts/c...)
- ❌ **Read-only** - Cannot edit or delete
- ❌ **Limited fields** - Only names, emails, phones available
- ❌ **No group assignment** possible
- ❌ **No two-way sync** capability
- ✅ **Conversion available** - Use CopyOtherContactToContacts()

**Solution for Other Contacts:**
```javascript
// Convert Other Contact to editable Regular Contact
CopyOtherContactToContacts("otherContacts/c987654321")
// Result: Creates new "people/c..." contact that can be fully managed
```

---

## 🌍 International Support

### Supported Countries
249 countries with automatic country code conversion:
- **Input**: Country names (e.g., "United States", "United Kingdom", "Deutschland")
- **Storage**: ISO country codes (e.g., "US", "GB", "DE")
- **Display**: Full country names in sync tables

### Extended Name Support
- **Phonetic fields** for international name pronunciation
- **Prefix/suffix** support for titles and honors
- **Filing preferences** with fileAs field
- **Nickname support** for informal names

### Address Formatting
- **5 complete addresses** per contact
- **International components** (street, street2, city, postcode, country, POBox)
- **Address validation** and formatting
- **Country-specific** postal code handling

---

## ⚡ Performance & Limitations

### Sync Table Performance
- **Maximum contacts**: 10,000 per sync
- **Recommended limit**: 2,000 for optimal performance
- **Batch updates**: Maximum 10 contacts per operation
- **Field capacity**: All 85+ fields synced efficiently

### API Rate Limits
- **Google People API**: 100 requests per 100 seconds per user
- **Built-in handling**: Automatic retry logic for rate limits
- **Monitoring**: Check Google Cloud Console for quota usage

### Two-Way Sync Limitations
- **Regular contacts only**: Other contacts are read-only
- **Field restrictions**: System fields (resourceName, etag) not editable
- **Group memberships**: Use group actions, not direct sync table editing
- **Conflict resolution**: Last write wins for concurrent edits

### Data Validation
- **Email validation**: Format checking with regex
- **Phone validation**: Length and character validation
- **Country validation**: Must match supported country list
- **Required fields**: First name required for contact creation

---

## 🔒 Security & Best Practices

### Authentication
- **OAuth 2.0** with secure token handling
- **Automatic refresh** for expired tokens
- **Scope validation** for proper permissions

### Data Protection
- **No data persistence** outside Google/Coda systems
- **Secure API communication** over HTTPS
- **User consent required** for all operations

### Error Handling
- **Comprehensive logging** for debugging
- **User-friendly error messages** for common issues
- **Graceful degradation** for API failures

---

## 📖 Quick Reference

### Essential Operations
```javascript
// Contact CRUD
CreateContact("John", "Doe", "", "john@example.com")
ReadContact("people/c123456789")
UpdateContact("people/c123", "Jonathan", "Smith")
DeleteContact("people/c123456789")

// Other Contact conversion
CopyOtherContactToContacts("otherContacts/c987654321")

// Group management
CreateContactGroup("New Team")
ReadContactGroup("contactGroups/teamId")
UpdateContactGroup("contactGroups/teamId", "Updated Name", "etag")
DeleteContactGroup("contactGroups/oldTeam")

// Utility
ExplainContactLimitations("people/c123456789")
```

### Sync Table Configuration
- **All contacts**: Default settings
- **Regular contacts only**: contactTypeFilter = "CONTACT"
- **Specific group**: groupFilter = "contactGroups/targetGroup"
- **Performance limit**: maxResults = 1000

### Common Workflows
1. **Import contacts**: CreateContact() → organize with groups
2. **Clean data**: Use UpdateContact() for standardization
3. **Convert other contacts**: CopyOtherContactToContacts() → manage normally
4. **International contacts**: Use extended name and address fields
5. **Business contacts**: Leverage custom fields and organization data

This comprehensive API reference covers all functionality in the enhanced Google Contacts Coda Pack with 85+ field support and international capabilities.
