# Google Contacts Coda Pack (Beta)

Comprehensive Google Contacts Coda Pack with full two-way sync support. Manage regular contacts and Gmail "other contacts" directly in Coda tables with complete CRUD operations, contact groups, batch updates etc
![Google Contacts](https://img.shields.io/badge/Google-Contacts-green)
![Two Way Sync](https://img.shields.io/badge/Two%20Way-Sync-orange)

## ✨ Features

### 🔄 **Complete Two-Way Sync**
- Edit contacts directly in Coda tables
- Changes automatically sync back to Google Contacts
- Batch updates with smart conflict resolution
- Real-time validation and error handling

### 📇 **Comprehensive Contact Management**
- **Regular Contacts**: Full CRUD operations with all fields
- **Other Contacts**: Read-only Gmail auto-contacts with conversion capabilities
- **10 Email addresses** per contact with customizable labels
- **10 Phone numbers** per contact with type classification
- **5 Addresses** per contact with full geographic details
- **Extended name fields**: prefix, suffix, phonetic spellings, nicknames
- **Organization details**: company, job title, department
- **Personal information**: birthday, website, notes
- **10 Significant dates** with custom labels
- **10 Custom fields** with user-defined labels
- **Related people**: relationship tracking

### 👥 **Advanced Contact Groups**
- **Create, update, and delete** custom contact groups
- **Add/remove contacts** individually or in batches (up to 500 contacts)
- **Smart group analysis**: deprecated, modifiable, and system group detection
- **Group filtering** in sync tables for organized contact management
- **Status indicators**: active, blocked, system, read-only group types

### 🎯 **Intelligent Operations**
- **Search contacts** by name, email, phone, or organization
- **Copy contacts** with selective field copying
- **Convert Other Contacts** to editable Regular Contacts
- **Duplicate contact handling** with automatic deduplication
- **Country code conversion** with full international support
- **Phone/email normalization** for data consistency

### 🔐 **Enterprise-Grade Security**
- **OAuth 2.0** with automatic token refresh
- **Secure credential storage** via Coda's infrastructure
- **Minimal API permissions** (contacts and profile only)
- **No data persistence** - direct API passthrough
- **Comprehensive error handling** with user-friendly messages

## 🚀 Quick Start

### Prerequisites
1. **Google Cloud Console** project with People API enabled
2. **OAuth 2.0 credentials** configured with redirect URI: `https://coda.io/packsAuth/oauth2`
3. **Coda workspace** with pack installation permissions

### Required Google API Scopes
```
https://www.googleapis.com/auth/contacts
https://www.googleapis.com/auth/contacts.readonly  
https://www.googleapis.com/auth/contacts.other.readonly
profile
```

### Installation Steps
1. **Download** `pack.ts` from this repository
2. **Upload** to [Coda Pack Studio](https://coda.io/packs/build)
3. **Configure** OAuth 2.0 credentials in pack settings
4. **Publish** and add to your Coda document
5. **Authenticate** with your Google account

## 📊 Sync Tables

### Contacts Table
**Two-way sync** with complete contact management:
- **Real-time editing**: Change any field directly in the table
- **Automatic validation**: Invalid data prevented before sync
- **Bulk operations**: Update multiple contacts simultaneously
- **Filter options**: By contact type, groups, or search criteria
- **Maximum sync**: 10,000 contacts (configurable)

### Contact Groups Table
**Complete group management** with status analysis:
- **Group capabilities**: View what each group can/cannot do
- **Member counts**: See contact distribution across groups
- **Status indicators**: Active, deprecated, system, or custom groups
- **Modification guidance**: Clear next steps for each group type

## 🔧 Available Formulas

### Contact Operations
- **`CreateContact()`** - Create new contacts with all field support
- **`ReadContact(resourceName)`** - Get detailed contact information
- **`UpdateContact(resourceName, ...fields)`** - Update any contact fields
- **`DeleteContact(resourceName)`** - Remove regular contacts
- **`CopyContact(resourceName, options)`** - Duplicate contacts selectively
- **`SearchContacts(query, maxResults)`** - Find contacts by any criteria

### Contact Group Operations
- **`CreateContactGroup(name)`** - Create custom contact groups
- **`ReadContactGroup(resourceName)`** - Get group details and members
- **`UpdateContactGroup(resourceName, newName)`** - Rename custom groups
- **`DeleteContactGroup(resourceName)`** - Remove custom groups
- **`ListModifiableContactGroups()`** - Show actionable groups only

### Group Membership Management
- **`AddContactToGroup(groupName, contactName)`** - Single contact assignment
- **`RemoveContactFromGroup(groupName, contactName)`** - Single contact removal
- **`BatchAddContactsToGroup(groupName, contactList)`** - Bulk assignments (up to 500)
- **`BatchRemoveContactsFromGroup(groupName, contactList)`** - Bulk removals (up to 500)

### Special Operations
- **`CopyOtherContactToContacts(resourceName)`** - Convert read-only Other Contacts
- **`ExplainContactLimitations(resourceName)`** - Comprehensive limitation analysis

## 💡 Usage Examples

### Two-Way Sync Workflow
```
1. Create sync table: Contacts
2. Edit contact in table: Change phone number
3. Automatic sync: Updates Google Contacts
4. Team collaboration: Multiple users can edit
5. Real-time validation: Prevents data errors
```

### Contact Group Organization
```
1. Create groups: CreateContactGroup("Clients 2025")
2. Add contacts: BatchAddContactsToGroup("contactGroups/abc123", "people/c1,people/c2")
3. Filter table: Use group filter in sync table
4. Manage members: Add/remove as needed
```

### Other Contact Conversion
```
1. Find Other Contact: In sync table (contactType = "OTHER_CONTACT")
2. Convert to editable: CopyOtherContactToContacts("otherContacts/c123")
3. Edit new contact: Use any operation on the new Regular Contact
4. Organize: Add to groups and manage normally
```

### Advanced Contact Creation
```javascript
CreateContact(
  "John",                           // givenName (required)
  "Smith",                          // familyName
  "Michael",                        // middleName
  "john.smith@company.com",         // primaryEmail
  "work",                           // primaryEmailLabel
  "+1-555-123-4567",               // primaryPhone
  "mobile",                         // primaryPhoneLabel
  "Acme Corporation",               // organization
  "Senior Developer",               // jobTitle
  "Engineering",                    // department
  "United States",                  // primaryAddressCountry
  "123 Main St",                    // primaryAddressStreet
  "Suite 456",                      // primaryAddressStreet2
  "12345",                          // primaryAddressPostcode
  "New York",                       // primaryAddressCity
  "",                               // primaryAddressPOBox
  "work",                           // primaryAddressLabel
  "Software developer and team lead", // notes
  "https://linkedin.com/in/johnsmith", // website
  "1990-05-15",                     // birthday
  "contactGroups/myContacts"        // contactGroup
)
```

## 🔄 Contact Field Support

### Core Contact Data
- **Names**: Given, family, middle, prefix, suffix, display name
- **Phonetic names**: For international contacts
- **Nicknames**: Alternative names and aliases
- **Filing preferences**: Custom contact organization

### Communication Details
- **Emails (10 max)**: Work, home, personal, business, school, university, other
- **Phones (10 max)**: Home, work, mobile, main, fax, Google Voice, pager, other
- **Addresses (5 max)**: Home, work, office, personal, mailing, shipping, other
- **Websites**: Primary URL per contact

### Professional Information
- **Organization**: Company/institution name
- **Job Title**: Professional role
- **Department**: Organizational unit
- **Custom fields (10 max)**: Industry-specific data

### Personal Information
- **Birthday**: Full date support
- **Significant dates (10 max)**: Anniversary, other important dates
- **Notes**: Free-form text information
- **Related people**: Family, friends, colleagues with relationship types

### Contact Groups & Metadata
- **Group memberships**: Multiple group assignments
- **Contact type**: Regular vs Other Contact classification
- **Photos**: Read-only profile image URLs
- **Last modified**: Automatic timestamp tracking

## 🚨 Important Limitations

### Other Contacts (otherContacts/*)
- **Cannot be deleted** - Google API restriction
- **Cannot be edited** - Read-only by design
- **Limited fields** - Names, emails, phones only
- **No group assignment** - Cannot be organized
- **Solution**: Use `CopyOtherContactToContacts()` to create editable versions

### Contact Groups
- **Deprecated groups** (friends, family, coworkers) - Cannot be modified
- **System groups** - Limited modification capabilities
- **Custom groups** - Full control (create, edit, delete, manage members)

### API Limits
- **Sync table maximum**: 10,000 contacts per sync
- **Batch operations**: 500 contacts maximum per batch
- **Rate limiting**: Automatic handling with exponential backoff
- **Validation**: Real-time field validation before API calls

## 🛠️ Technical Architecture

### Google APIs
- **Google People API v1** - Complete contact management
- **OAuth 2.0** - Secure authentication with automatic refresh
- **RESTful operations** - Standard HTTP methods for all operations

### Data Flow
1. **Coda Table Edit** → **Pack Validation** → **Google API Update**
2. **Google Contacts** → **API Fetch** → **Pack Processing** → **Coda Table**
3. **Two-way sync** with conflict resolution and error recovery

### Performance Optimizations
- **Smart caching** - Reduces redundant API calls
- **Batch processing** - Efficient multi-contact operations
- **Deduplication** - Automatic duplicate contact prevention
- **Connection pooling** - Optimal API request management

## 🔐 Security & Privacy

### Data Protection
- **No data storage** - Direct API passthrough only
- **Encrypted transmission** - All data encrypted in transit
- **Minimal permissions** - Only necessary scopes requested
- **Token security** - OAuth tokens managed by Coda infrastructure

### Compliance
- **Google API Terms** - Full compliance with usage policies
- **Data handling** - No persistent storage of user contact data
- **Privacy by design** - Minimal data access and processing

## 🎯 Business Use Cases

### CRM Integration
- **Contact synchronization** between Google Contacts and Coda CRM
- **Lead management** with contact group organization
- **Team collaboration** on shared contact databases

### Event Management
- **Attendee lists** from Google Contacts
- **RSVP tracking** with contact group filtering  
- **Vendor management** with custom fields and notes

### Sales & Marketing
- **Customer segmentation** using contact groups
- **Campaign targeting** with filtered contact lists
- **Lead scoring** using custom fields and notes

### Team Coordination
- **Shared contact databases** with real-time updates
- **Department-specific views** using group filters
- **Contact assignment** and responsibility tracking

## 📚 Troubleshooting

### Common Issues

**Authentication Problems**
- Verify OAuth credentials in Google Cloud Console
- Check redirect URI: `https://coda.io/packsAuth/oauth2`
- Ensure People API is enabled

**Sync Failures**
- Check contact data validation (emails, phones format)
- Verify contact type (Other Contacts are read-only)
- Review API rate limits and quotas

**Group Operations**
- Confirm group type (deprecated groups cannot be modified)
- Verify contact group resource names
- Check permissions for group modifications

**Performance Issues**
- Reduce sync table size (max 10,000 contacts)
- Use filters to limit scope
- Implement delays for bulk operations

### Debug Tips
1. **Start small** - Test with limited contact sets
2. **Check resource names** - Ensure correct format and validity
3. **Review error messages** - Pack provides detailed error information
4. **Use search functions** - Find correct resource names easily
5. **Test incrementally** - Build complexity gradually

## 📞 Support

- **Documentation**: Complete guides in `/docs` folder
- **Issues**: Create GitHub issues for bugs or feature requests  
- **Community**: Use discussions for questions and best practices
- **Examples**: Reference implementation examples in documentation

## 🙏 Acknowledgments

- **Google People API Team** - Comprehensive contacts API
- **Coda Development Team** - Excellent pack development platform
- **Community Contributors** - Testing, feedback, and improvements
- **Open Source Community** - Libraries and tools that make this possible

---

**Made with ❤️ for the Coda community**

*Transform your contact management with the power of comprehensive two-way sync between Google Contacts and Coda.*
