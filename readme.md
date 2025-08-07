# Google Contacts Coda Pack

A comprehensive Google Contacts integration for Coda with full two-way sync capabilities, extended field support, and advanced contact management features.

![Coda Pack](https://img.shields.io/badge/Coda-Pack-blue)
![Google Contacts](https://img.shields.io/badge/Google-Contacts-green)
![Two Way Sync](https://img.shields.io/badge/Two%20Way-Sync-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)

## ✨ Key Features

- 🔄 **Full Two-Way Sync** - Edit contacts directly in Coda and sync changes back to Google
- 📇 **Extended Contact Fields** - Support for 10 emails, 10 phones, 5 addresses, and extended name fields
- 👥 **Contact Groups** - Create, manage, and assign contacts to groups
- 🔨 **Complete CRUD Operations** - Create, read, update, delete contacts with full validation
- ⚡ **Batch Operations** - Update multiple contacts simultaneously
- 🎯 **Smart Filtering** - Filter by contact type, groups, search terms, or custom criteria
- 🔐 **Secure OAuth** - Automatic token refresh with proper error handling
- 📊 **Rich Data Support** - Birthdays, addresses, organizations, custom fields, and more
- 🌍 **International Support** - Country codes, address formatting, and localization
- 📱 **Contact Deduplication** - Smart duplicate detection and merging

## 📋 Table of Contents

- [Installation](#installation)
- [Setup Guide](#setup-guide)
- [Sync Tables](#sync-tables)
- [Actions & Formulas](#actions--formulas)
- [Extended Field Support](#extended-field-support)
- [Use Cases](#use-cases)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Performance Tips](#performance-tips)
- [Limitations](#limitations)
- [Contributing](#contributing)

## 🚀 Installation

### Prerequisites
- Google Cloud Console project with People API enabled
- OAuth 2.0 credentials configured for web application
- Coda workspace with pack development permissions

### Quick Start
1. **Download** `pack.ts` from this repository
2. **Upload** to [Coda Pack Studio](https://coda.io/packs/build)
3. **Configure** OAuth credentials in pack settings
4. **Connect** your Google account
5. **Create** sync tables in your Coda document

### Detailed Setup
For complete setup instructions, see our [Setup Guide](docs/setup-guide.md).

## 📊 Sync Tables

### Enhanced Contacts (Two-Way Sync)
The main sync table with comprehensive field support and two-way synchronization.

```javascript
// Sync all contacts
SyncEnhancedContacts()

// Filter by contact type
SyncEnhancedContacts("CONTACT")        // Editable regular contacts only
SyncEnhancedContacts("OTHER_CONTACT")  // Gmail auto-contacts (read-only)

// Filter by contact group
SyncEnhancedContacts("CONTACT", "contactGroups/work")

// Limit results for better performance
SyncEnhancedContacts("", "", 500)      // First 500 contacts

// Combined filters
SyncEnhancedContacts("CONTACT", "contactGroups/team", 100)
```

**Supported Fields:**
- **Extended Names:** prefix, givenName, middleName, familyName, suffix, displayName, phoneticName
- **Communications:** 10 emails with labels, 10 phones with labels
- **Addresses:** 5 complete addresses with all components
- **Organization:** company, jobTitle, department
- **Personal:** birthday, notes, website, photo
- **Compiled Lists:** allEmails, allPhones (read-only arrays)
- **Metadata:** contactType, lastModified, groups

### Contact Groups
Manage and sync contact groups for organization.

```javascript
// Sync all contact groups
SyncContactGroups()
```

**Group Fields:**
- resourceName, name, formattedName
- groupType, memberCount
- memberResourceNames (array of contact IDs)

## 🔧 Actions & Formulas

### Contact Management

#### Create Contacts
```javascript
// Basic contact creation
CreateContact("John", "Doe", "john@example.com", "+1234567890", "Acme Corp")

// Minimal contact (name only)
CreateContact("Jane", "Smith")

// With group assignment
CreateContact("Bob", "Wilson", "bob@example.com", "", "", "contactGroups/salesTeam")

// Extended contact creation with all name fields
CreateExtendedContact("John", "Doe", "john@example.com", "+1234567890", "Acme Corp", "Dr.", "Jr.")
```

#### Update Contacts
```javascript
// Update basic fields
UpdateContact("people/c123", "John", "Smith", "john.smith@email.com")

// Two-way sync automatically handles updates when you edit the sync table
```

#### Delete Contacts
```javascript
// Delete regular contacts (Other contacts cannot be deleted)
DeleteContact("people/c123")
```

#### Contact Conversion
```javascript
// Convert "Other Contact" to editable regular contact
CopyOtherContactToContacts("people/c456")
```

### Group Management

#### Create & Manage Groups
```javascript
// Create new contact group
CreateContactGroup("Sales Team")
CreateContactGroup("Project Alpha")

// Add contacts to groups
AddContactToGroup("people/c123", "contactGroups/salesTeam")

// Remove from groups
RemoveContactFromGroup("people/c123", "contactGroups/oldTeam")
```

### Search & Discovery

#### Contact Search
```javascript
// Search by email
SearchContacts("john@example.com")

// Search by name with limit
SearchContacts("John Smith", 10)

// Search by company
SearchContacts("Acme Corp", 25)

// Get specific contact details
GetContact("people/c123")
```

### Advanced Features

#### Contact Deduplication
```javascript
// Find potential duplicates
FindDuplicateContacts("people/c123")

// Merge contacts (keeps first, deletes second)
MergeContacts("people/c123", "people/c456")

// Duplicate with custom naming
DuplicateContact("people/c123", "Copy")
```

#### Data Export
```javascript
// Export contact as vCard
ExportContactAsVCard("people/c123")
```

## 🌟 Extended Field Support

### Name Fields
- **prefix:** Mr., Mrs., Dr., Prof., etc.
- **givenName:** First name
- **middleName:** Middle name or initial  
- **familyName:** Last name / surname
- **suffix:** Jr., Sr., III, PhD, etc.
- **displayName:** Formatted display name
- **phoneticName:** Phonetic pronunciation

### Communication Fields
- **10 Email addresses** with customizable labels (work, home, other, custom)
- **10 Phone numbers** with standard labels (mobile, work, home, fax, etc.)
- **Compiled arrays:** `allEmails` and `allPhones` for easy access

### Address Fields (5 Complete Addresses)
Each address includes:
- Street address and extended address (apartment, suite)
- City, postal/zip code, country
- PO Box support
- Address type labels (home, work, other)

### Organization & Personal
- **Company information:** name, job title, department
- **Personal details:** birthday, notes, website
- **Custom fields:** User-defined key-value pairs
- **Contact groups:** Multiple group memberships
- **Photos:** Profile picture URLs (read-only)

## 🎯 Use Cases

### CRM & Sales Management
1. **Sync contacts** to Coda for enhanced CRM functionality
2. **Add custom columns** (Lead Status, Deal Value, Last Contact Date)
3. **Use Coda automations** for follow-up workflows
4. **Two-way sync** keeps Google Contacts updated automatically

### Team Collaboration
1. **Share contact database** with team via Coda document
2. **Team members edit** contacts directly in shared tables
3. **Changes sync automatically** to everyone's Google Contacts
4. **Group management** for project-based organization

### Contact Organization
1. **Create contact groups** for different categories (customers, vendors, team)
2. **Batch assign contacts** to appropriate groups
3. **Move contacts between groups** as relationships change
4. **Convert Gmail auto-contacts** to editable contacts

### Data Management
1. **Import contacts** from CSV/Excel via Coda's import features
2. **Use formulas** to create contacts programmatically
3. **Validate and clean** contact data with Coda's data tools
4. **Export to vCard** for backup or migration

### Advanced Workflows
1. **Duplicate detection** and merging
2. **Contact enrichment** with external data sources
3. **Automated group assignment** based on contact properties
4. **Integration** with other Coda packs for comprehensive workflows

## 📚 API Reference

For complete API documentation, see our [API Reference Guide](docs/api-reference.md).

### Quick Reference

#### Contact Operations
- `CreateContact(givenName, familyName, email, phone, company, group?)`
- `UpdateContact(resourceName, givenName, familyName, email)`
- `DeleteContact(resourceName)`
- `GetContact(resourceName)`
- `SearchContacts(query, maxResults?)`

#### Group Operations
- `CreateContactGroup(name)`
- `AddContactToGroup(contactId, groupId)`
- `RemoveContactFromGroup(contactId, groupId)`

#### Advanced Operations
- `CopyOtherContactToContacts(resourceName)`
- `FindDuplicateContacts(resourceName)`
- `MergeContacts(keepContact, deleteContact)`
- `DuplicateContact(resourceName, suffix?)`
- `ExportContactAsVCard(resourceName)`

## 🚨 Troubleshooting

### Common Issues

#### Authentication Problems
- **Daily token expiration:** Ensure OAuth configuration has `access_type: "offline"`
- **Permission denied:** Verify all required scopes are granted in Google Cloud Console
- **Account reconnection:** Re-authorize if 401 errors persist

#### Sync Issues
- **Two-way sync not working:** Ensure contact type is "CONTACT" (regular contacts)
- **Missing fields:** Other contacts have limited field access - use `CopyOtherContactToContacts`
- **Schema mismatch:** Check that `mutable: true` is set for editable fields

#### Performance Issues
- **Large contact lists:** Use filtering and pagination (`maxResults` parameter)
- **Rate limiting:** Monitor API quotas in Google Cloud Console
- **Slow sync:** If you have a lot of contacts

### Error Codes
- **400:** Bad request (invalid data format)
- **401:** Authentication expired (automatic refresh)
- **403:** Permission denied (check scopes)
- **404:** Resource not found (contact/group deleted)
- **409:** Conflict (concurrent modification)
- **429:** Rate limit exceeded

For detailed troubleshooting, see our [Troubleshooting Guide](docs/troubleshooting.md).

## 📈 Performance Tips

### For Large Contact Lists
- Use `contactType` filters to sync only needed contacts
- Implement pagination with `maxResults` parameter
- Filter by specific groups to reduce data volume
- Schedule syncs during off-peak hours

### For Efficient Operations
- **Batch operations:** Group multiple updates together
- **Cache group IDs:** Store group resource names for reuse
- **Validate data:** Check formats before API calls
- **Monitor quotas:** Track API usage in Google Cloud Console

### For Better User Experience
- **Set up result columns** for immediate action feedback
- **Use contact type filters** in table views
- **Create separate views** for different workflows
- **Regular sync refreshes** for up-to-date data

## 📊 Limitations

### Google API Limitations
- **Rate limits:** 100 requests per 100 seconds per user
- **Other contacts:** Limited field access (name, email, phone only)
- **Photos:** Read-only URLs, cannot upload/modify
- **Group operations:** Require separate API calls

### Pack Limitations
- **Batch size:** Maximum 10 updates per operation
- **Other contact editing:** Must copy to regular contacts first
- **Group deletion:** Not supported via API
- **System groups:** Cannot be modified (starred, myContacts, etc.)

### Coda Platform Limitations
- **Token storage:** Managed by Coda OAuth system
- **Sync frequency:** Controlled by Coda's sync mechanism
- **Field types:** Limited to pack-defined schema types

## 🤝 Contributing

I welcome contributions to improve the Google Contacts Coda Pack!

### Development Setup
1. **Clone** this repository
2. **Install** Coda Pack CLI: `npm install -g @codahq/packs-cli`
3. **Validate** pack: `coda validate pack.ts`
4. **Test** locally: `coda upload pack.ts`

### Contribution Guidelines
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes with proper TypeScript typing
4. **Test** thoroughly with your Google account
5. **Submit** a pull request with detailed description

### Areas for Contribution
- Additional contact field support
- Enhanced duplicate detection algorithms
- Better error handling and user messages
- Performance optimizations
- Documentation improvements

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** Check our [docs](docs/) folder
- **Issues:** Create an [issue](../../issues) for bugs or feature requests
- **Discussions:** Use [discussions](../../discussions) for questions
- **Email:** Contact pack maintainers for urgent issues

## 🔗 Related Resources

- [Coda Pack SDK Documentation](https://coda.io/packs/build/latest/)
- [Google People API Reference](https://developers.google.com/people)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Made with ❤️ for the Coda community**

*Last updated: August 2025*
