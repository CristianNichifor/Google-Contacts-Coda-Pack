# Google Contacts Coda Pack

Two-way sync between Google Contacts and Coda tables with comprehensive group management. Edit contacts directly in Coda and sync changes back to Google automatically.

![Coda Pack](https://img.shields.io/badge/Coda-Pack-blue)
![Google Contacts](https://img.shields.io/badge/Google-Contacts-green)
![Two Way Sync](https://img.shields.io/badge/Two%20Way-Sync-orange)

## ✨ Features

- 🔄 **Two-way sync** - Edit contacts directly in Coda and sync back to Google
- 📇 **All contact types** - Regular contacts + Gmail "other contacts"
- 👥 **Contact groups** - Create groups and manage memberships
- 🔨 **Full CRUD operations** - Create, read, update, delete contacts
- ⚡ **Batch operations** - Update multiple contacts simultaneously
- 🎯 **Smart filtering** - Filter by contact type, groups, or search terms
- 🔐 **Secure OAuth** - Automatic token refresh handling
- 📊 **Result columns** - Immediate feedback for all actions

## 🚀 Quick Start

### Prerequisites
- Google Cloud Console project with People API enabled
- OAuth 2.0 credentials configured
- Coda workspace with pack permissions

### Installation
1. Download `pack.ts` from this repository
2. Upload to [Coda Pack Studio](https://coda.io/packs/build)
3. Configure OAuth credentials
4. Connect your Google account

## 📊 Sync Tables

### Contacts (Two-Way Sync)
```javascript
// Sync all contacts
SyncContacts()

// Filter by type
SyncContacts("CONTACT")        // Regular contacts only
SyncContacts("OTHER_CONTACT")  // Other contacts only

// Filter by group
SyncContacts("CONTACT", "contactGroups/myContacts")

// Limit results
SyncContacts("", "", 500)      // First 500 contacts

// Combined filters
SyncContacts("CONTACT", "contactGroups/work", 100)  // Work contacts, max 100
```

### Contact Groups
```javascript
// Sync all contact groups
SyncContactGroups()
```

## 🔧 Actions & Formulas

### Contact Management
```javascript
// Create contacts
CreateContact("John", "Doe", "john@example.com", "+1234567890", "Acme Corp")
CreateContact("Jane", "Smith")  // Minimal contact

// Create with group assignment
CreateContact("Bob", "Wilson", "bob@example.com", "", "", "contactGroups/salesTeam")

// Update contacts
UpdateContact("people/c123", "John", "Smith", "john.smith@email.com")

// Delete contacts (regular contacts only)
DeleteContact("people/c123")

// Copy other contacts to make them editable
CopyOtherContactToContacts("people/c456")
```

### Group Management
```javascript
// Create new groups
CreateContactGroup("Sales Team")
CreateContactGroup("Project Alpha")

// Manage group memberships
AddContactToGroup("people/c123", "contactGroups/salesTeam")
RemoveContactFromGroup("people/c123", "contactGroups/oldTeam")
```

### Search & Discovery
```javascript
// Search contacts
SearchContacts("john@example.com")
SearchContacts("John Smith", 10)     // With limit
SearchContacts("Acme Corp", 25)      // By company

// Get contact details
GetContact("people/c123")
```

## 🎯 Use Cases

### CRM Workflows
1. **Sync contacts** to Coda table
2. **Add custom columns** (Lead Status, Last Contact Date, Notes)
3. **Use Coda automations** for follow-ups
4. **Two-way sync** keeps Google Contacts updated

### Team Contact Management
1. **Share Coda doc** with team
2. **Team members edit** contacts directly
3. **Changes sync** back to Google automatically
4. **Use contact groups** to organize by project/team

### Contact Organization
1. **Create contact groups** for different categories
2. **Assign contacts** during creation or later
3. **Move contacts** between groups as needed
4. **Convert "other contacts"** to regular contacts

### Data Migration
1. **Export contacts** from old system to CSV
2. **Import CSV** to Coda table
3. **Use CreateContact()** action for bulk import
4. **Verify and clean up** data

## 📚 Documentation

- [Setup Guide](docs/setup-guide.md) - Complete Google Cloud and Coda configuration
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions
- [API Reference](docs/api-reference.md) - Complete function reference with examples

## 🔐 Security & Privacy

- **OAuth 2.0** - Secure authentication with Google
- **No secrets in code** - OAuth credentials stored securely in Coda
- **Minimal permissions** - Only requests necessary Google API scopes
- **Automatic token refresh** - Seamless authentication handling
- **Read-only other contacts** - Gmail auto-contacts remain protected

## 🛠️ Technical Details

### Google APIs Used
- **Google People API v1** - Modern REST API for all contact operations
- **OAuth 2.0** - Secure authentication with automatic token refresh

### Required Scopes
```
https://www.googleapis.com/auth/contacts
https://www.googleapis.com/auth/contacts.readonly
https://www.googleapis.com/auth/contacts.other.readonly
profile
```

### Architecture
- **Two-step contact creation** - Create contact, then assign to group
- **Graceful error handling** - Operations continue even if secondary actions fail
- **Caching** - Smart caching to reduce API calls
- **Rate limiting** - Built-in handling for API quotas

## 📋 Requirements

### Google Cloud Setup
- Google Cloud Console project
- Google People API enabled
- OAuth 2.0 credentials configured
- Authorized redirect URI: `https://coda.io/packsAuth/oauth2`

### Coda Requirements
- Coda workspace
- Pack upload permissions
- Document editing permissions

### Compatibility
- Works with personal Gmail accounts
- Works with Google Workspace accounts
- Supports all contact types and groups

## 🔄 Two-Way Sync Details

### What Syncs
- ✅ **Names** (first, last, middle, display)
- ✅ **Email addresses** (multiple supported)
- ✅ **Phone numbers** (multiple supported)
- ✅ **Organizations** (companies)
- ✅ **Addresses** (multiple supported)
- ✅ **Birthdays** (date format: YYYY/MM/DD)

### Sync Limitations
- ❌ **Other contacts** - Read-only (use copy action to make editable)
- ❌ **Photos** - Read-only URLs
- ❌ **Group memberships** - Use dedicated group actions
- ❌ **System groups** - Cannot be modified

### How It Works
1. **Edit in Coda** - Change any mutable field in sync table
2. **Automatic sync** - Changes detected and sent to Google
3. **Batch processing** - Multiple edits processed efficiently
4. **Conflict resolution** - Handles concurrent edits gracefully

## 🚨 Troubleshooting

### Common Issues

**Authentication expired daily**
- Check OAuth configuration has `access_type: "offline"`
- Ensure 401 errors bubble up for automatic refresh
- Reconnect Google account if needed

**Permission denied errors**
- Verify all required scopes are granted
- Check Google People API is enabled
- Re-authorize with fresh consent

**Other contacts missing fields**
- Expected behavior - Google API limitation
- Only names, emails, phones available
- Use CopyOtherContactToContacts to make editable

**Two-way sync not working**
- Verify contact type is "Regular Contact"
- Check schema fields have `mutable: true`
- Other contacts cannot be edited directly

### Getting Help
1. Check [troubleshooting guide](docs/troubleshooting.md)
2. Review [API reference](docs/api-reference.md)
3. Create an [issue](../../issues) for bugs
4. Test with smaller datasets first

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with your own Google account
5. Submit a pull request

### Development Setup
1. Clone the repository
2. Install Coda Pack CLI: `npm install -g @codahq/packs-cli`
3. Validate pack: `coda validate pack.ts`
4. Upload for testing: `coda upload pack.ts`

## 📈 Performance Tips

### For Large Contact Lists
- Use `maxResults` parameter to limit sync size
- Filter by contact type or group
- Sync during off-peak hours
- Monitor API quotas in Google Cloud Console

### For Efficient Group Management
- Batch group operations when possible
- Cache group resource names
- Use descriptive group names
- Regular cleanup of unused groups

### For Best User Experience
- Set up result columns for immediate feedback
- Use contact type filters in views
- Create separate views for different workflows
- Regular sync table refreshes

## 📊 Limitations

### Google API Limitations
- **Rate limits** - 100 requests per 100 seconds per user
- **Other contacts** - Limited field access
- **Photos** - Read-only URLs only
- **Group operations** - Require separate API calls

### Pack Limitations
- **Batch size** - Maximum 10 updates at once
- **Other contact editing** - Must copy to regular contacts first
- **Group deletion** - Not supported via API
- **System groups** - Cannot be modified

### Coda Limitations
- **Token storage** - Handled by Coda platform
- **Sync frequency** - Controlled by Coda sync settings
- **Result columns** - Limited to pack return types

## 🎯 Roadmap

Future enhancements being considered:
- **Bulk import/export** capabilities
- **Advanced search filters**
- **Contact deduplication** tools
- **Enhanced group management**
- **Custom field mapping**

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google People API team for comprehensive contacts API
- Coda team for excellent pack development platform
- Community contributors and testers

## 📞 Support

- **Documentation**: Check the [docs](docs/) folder
- **Issues**: Create an [issue](../../issues) for bugs or feature requests
- **Discussions**: Use [discussions](../../discussions) for questions
- **Email**: For private inquiries about the pack

---

**Made with ❤️ for the Coda community**

*Transform your contact management with the power of two-way sync between Google Contacts and Coda.*