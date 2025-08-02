# Google Contacts Coda Pack

Comprehensive Google Contacts Coda Pack with two-way sync support. Manage regular contacts and Gmail "other contacts" directly in Coda tables. Features: CRUD operations, contact groups, batch updates, and seamless OAuth token refresh. Edit contacts in Coda and sync changes back to Google automatically.
Two-way sync between Google Contacts and Coda tables. Edit contacts directly in Coda and sync changes back to Google automatically.

## Features

- Sync regular contacts and Gmail "other contacts"
- Two-way editing - change contacts in Coda, sync to Google
- Contact groups management
- Create, update, delete contacts
- Batch operations
- Automatic OAuth token refresh

## Quick Start

1. Upload pack.ts to Coda Pack Studio
2. Configure OAuth with Google Cloud Console credentials
3. Create sync table in your Coda doc
4. Connect Google account and start syncing

## Usage

### Sync Tables
- **Contacts** - All contacts with two-way sync
- **Contact Groups** - All contact groups

### Sync Filters
```javascript
// All contacts (regular + other contacts)
SyncContacts()

// Filter by contact type
SyncContacts("CONTACT")                  // Regular contacts only  
SyncContacts("OTHER_CONTACT")            // Other contacts only

// Filter by contact group (regular contacts only)
SyncContacts("CONTACT", "contactGroups/myContacts")

// Limit number of results
SyncContacts("", "", 500)                // First 500 contacts

// Combined filters
SyncContacts("CONTACT", "contactGroups/work", 100)  // Work contacts, max 100

Actions

CreateContact(firstName, lastName, email, phone, company)
UpdateContact(resourceName, firstName, lastName, email, phone)
DeleteContact(resourceName)
CopyOtherContactToContacts(resourceName)
SearchContacts(query, limit)

// Search by email
SearchContacts("john@example.com")

// Search by name with limit
SearchContacts("John Smith", 10)

// Search by company
SearchContacts("Acme Corp", 25)
