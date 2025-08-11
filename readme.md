# Google Contacts Coda Pack (Beta)

Comprehensive two-way sync between Google Contacts and Coda with enterprise-grade field support and international capabilities.

![Coda Pack](https://img.shields.io/badge/Coda-Pack-blue)
![Google Contacts](https://img.shields.io/badge/Google-Contacts-green)
![Two Way Sync](https://img.shields.io/badge/Two%20Way-Sync-orange)

## ✨ Key Features

- 🔄 **Two-Way Sync** - Edit contacts directly in Coda and sync changes back to Google
- 📇 **Extended Fields** - 10 emails, 10 phones, 5 addresses, extended name fields  
- 🌍 **International** - 249 countries, proper address formatting, country codes
- 👥 **Contact Groups** - Create, manage, and assign contacts with full membership tracking
- 🔨 **Full CRUD** - Create, read, update, delete with comprehensive validation
- ⚡ **Batch Operations** - Update multiple contacts simultaneously
- 🎯 **Smart Filtering** - Filter by contact type, groups, search terms
- 🔐 **Secure OAuth** - Automatic token refresh with robust error handling

## 📊 Sync Tables

### Contacts (Two-Way Sync)
The main sync table provides comprehensive contact management with 85+ fields.

**Parameters:**
- `contactTypeFilter` (optional): "CONTACT", "OTHER_CONTACT", or empty for all
- `groupFilter` (optional): Contact group resource name
- `maxResults` (optional): Max contacts to sync (default: 2000, max: 10000)

**Usage in Coda:**
1. Add sync table to your doc
2. Configure parameters in table settings
3. Set up two-way sync for direct editing
4. Use filters and views for organization

**Available Fields:**
- **Extended Names:** prefix, givenName, middleName, familyName, suffix, phoneticFirst/Middle/Last, nickname, fileAs
- **Communications:** 10 emails + labels, 10 phones + labels, allEmails/allPhones arrays
- **Addresses:** 5 complete addresses (street, street2, city, postcode, country, POBox, label)
- **Organization:** organization, jobTitle, department
- **Personal:** birthday, website, notes, photoUrl
- **Advanced:** 10 significant dates + labels, relatedPeople, 10 custom fields + labels
- **System:** resourceName, etag, contactType, lastModified, memberships

### Contact Groups
The sync table for managing contact groups with member tracking.

**Parameters:**
- `maxResults` (optional): Max groups to sync (default: 1000)

## 🔧 Actions & Formulas

### Contact Management
```javascript
// Create with primary fields
CreateContact(
  "John",                      // givenName (required)
  "Doe",                       // familyName
  "Smith",                     // middleName
  "john@company.com",          // primaryEmail
  "work",                      // primaryEmailLabel
  "+1234567890",               // primaryPhone
  "mobile",                    // primaryPhoneLabel
  "Acme Corp",                 // organization
  "Manager",                   // jobTitle
  "Sales",                     // department
  "United States",             // primaryAddressCountry
  "123 Main St",               // primaryAddressStreet
  "Suite 100",                 // primaryAddressStreet2
  "12345",                     // primaryAddressPostcode
  "City",                      // primaryAddressCity
  "PO Box 123",                // primaryAddressPOBox
  "work",                      // primaryAddressLabel
  "Notes here",                // notes
  "https://website.com",       // website
  new Date("1990-01-01"),      // birthday
  "contactGroups/team"         // contactGroup
)

// Update with extensive field support (85+ parameters)
UpdateContact(
  "people/c123",
  "John",                      // givenName
  "Smith",                     // familyName
  "Robert",                    // middleName
  "Dr.",                       // prefix
  "Jr.",                       // suffix
  // ... all extended name fields
  "john@newcompany.com",       // primaryEmail
  "work",                      // primaryEmailLabel
  "personal@email.com",        // email2
  "home",                      // email2Label
  // ... up to email10 + labels
  "+1-555-0123",              // primaryPhone
  "work",                     // primaryPhoneLabel
  // ... up to phone10 + labels
  "New Company",              // organization
  "Director",                 // jobTitle
  "Engineering",              // department
  // ... all 5 address sets
  new Date("1990-05-15"),     // birthday
  "https://newsite.com",      // website
  "Updated notes",            // notes
  // ... significant dates, related people, custom fields
)

// Copy contacts with selective fields
CopyContact("people/c123", "Copy", true, true, true, true, false)

// Convert Other Contacts to editable
CopyOtherContactToContacts("otherContacts/c456", true, true, true)

// Read, delete, get help
ReadContact("people/c123")
DeleteContact("people/c123")
ExplainContactLimitations("people/c123")  // Built-in help system
```

### Group Management
```javascript
CreateContactGroup("Sales Team")
ReadContactGroup("contactGroups/salesTeam")
UpdateContactGroup("contactGroups/salesTeam", "New Name", "etag_value")
DeleteContactGroup("contactGroups/oldTeam", false)  // deleteContacts optional
```

## 🎯 Use Cases

### Enterprise CRM
- Sync contacts with 85+ fields for comprehensive data
- Use custom fields for business-specific data (Employee ID, Lead Score)
- Track relationships and significant dates
- International address support for global operations

### Team Collaboration
- Share contact database via Coda with extended fields
- Team edits sync automatically to Google Contacts
- Organize with contact groups by project/department
- Track contact relationships and important dates

### Contact Organization
- Convert Gmail auto-contacts to editable regular contacts
- Organize with custom contact groups
- Use extended name fields for proper international names
- Manage multiple addresses per contact

## 🌍 International Support

### Countries & Addresses
- **249 countries** with ISO codes and automatic conversion
- **5 complete addresses** per contact with all components
- **Address validation** and formatting
- **Country name ↔ code conversion** utilities

### Extended Name Support
- **Phonetic fields** (phoneticFirst, phoneticMiddle, phoneticLast)
- **Name prefixes/suffixes** (Dr., Jr., Sr., III, etc.)
- **Filing preferences** with fileAs field
- **Nickname support** for informal names

## 🔧 Technical Details

### Field Capacity
- **Total fields:** 85+ per contact
- **Emails:** 10 with smart labels (work, home, personal, business, etc.)
- **Phones:** 10 with standard labels (mobile, work, home, fax, google voice)
- **Addresses:** 5 complete international addresses
- **Custom fields:** 10 user-defined with labels
- **Significant dates:** 10 with custom labels

### Performance
- **Contact limit:** Up to 10,000 contacts per sync
- **Batch updates:** Maximum 10 contacts per operation
- **Smart caching:** Appropriate TTL for different operations
- **Rate limiting:** Built-in Google API quota management

### Data Validation
- **Email validation** with format checking
- **Phone normalization** and validation
- **Address validation** with country code support
- **Duplicate detection** and field deduplication
- **Contact data validation** before API calls

## 🔐 Security & Requirements

### Google Cloud Setup
- Google Cloud Console project
- People API enabled
- OAuth 2.0 credentials with redirect: `https://coda.io/packsAuth/oauth2`

### Required Scopes
```
https://www.googleapis.com/auth/contacts
https://www.googleapis.com/auth/contacts.readonly
https://www.googleapis.com/auth/contacts.other.readonly
profile
```

### Authentication
- OAuth 2.0 with `access_type: "offline"` and `prompt: "consent"`
- Automatic token refresh
- Secure credential storage via Coda platform

## 🚨 Contact Types & Limitations

### Regular Contacts (`people/c...`)
- ✅ **Full CRUD operations** - create, read, update, delete
- ✅ **All 85+ fields** available and editable
- ✅ **Contact group assignment** and management
- ✅ **Two-way sync** with Coda tables

### Other Contacts (`otherContacts/c...`)
- ❌ **Read-only** - cannot edit or delete (Google API limitation)
- ❌ **Limited fields** - only names, emails, phones
- ❌ **No group assignment** possible
- ✅ **Convert to Regular Contact** using `CopyOtherContactToContacts()`

### Built-in Help
Use `ExplainContactLimitations()` for:
- General contact type explanations
- Specific contact analysis with solutions
- Step-by-step conversion workflows
- Troubleshooting guidance

## 📈 Performance Tips

### For Large Contact Lists
- Use `contactTypeFilter: "CONTACT"` for best performance
- Apply group filtering for targeted syncs
- Set `maxResults` parameter (up to 10,000)
- Schedule syncs during off-peak hours

### For Efficient Operations
- Batch contact updates when possible
- Cache group resource names
- Use built-in validation before API calls
- Monitor API quotas in Google Cloud Console

### Field Mapping
- **Emails:** `email1-3` → `primaryEmail, email2-10` with labels
- **Phones:** `phone1-3` → `primaryPhone, phone2-10` with labels
- **Addresses:** Basic → 5 complete international addresses
- **Names:** Basic → Extended with prefix, suffix, phonetic fields
- **New:** Custom fields, significant dates, relationships

## 🤝 Contributing

1. Fork repository
2. Install Coda Pack CLI: `npm install -g @codahq/packs-cli`
3. Validate: `coda validate pack.ts`
4. Test with your Google account
5. Submit pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues:** [GitHub Issues](../../issues) for bugs and features
- **Discussions:** [GitHub Discussions](../../discussions) for questions
- **Built-in Help:** Use `ExplainContactLimitations()` in the pack

---

**Enterprise-ready contact management with comprehensive two-way sync between Google Contacts and Coda.**
