# API Reference

Complete reference for all pack functions.

## Sync Tables

### ContactsWithTwoWaySync
Syncs all contacts with full editing support.

**Parameters:**
- `contactTypeFilter` (optional): "CONTACT" or "OTHER_CONTACT"
- `groupFilter` (optional): Contact group resource name
- `maxResults` (optional): Maximum contacts to return (default: 1000)

**Examples:**
```javascript
SyncContacts()                           // All contacts
SyncContacts("CONTACT")                  // Regular contacts only
SyncContacts("OTHER_CONTACT")            // Other contacts only  
SyncContacts("CONTACT", "contactGroups/myContacts")  // Filtered by group
SyncContacts("", "", 500)                // Limit to 500 contacts

Returns: Array of contact objects with two-way sync support
ContactGroups
Syncs all contact groups.
Parameters: None
Example:
javascriptSyncContactGroups()
Returns: Array of contact group objects
Actions
CreateContact
Creates a new contact in Google Contacts.
Parameters:

givenName (required): First name
familyName (optional): Last name
emailAddress (optional): Email address
phoneNumber (optional): Phone number
organization (optional): Company name

Example:
javascriptCreateContact("John", "Doe", "john@example.com", "+1234567890", "Acme Corp")
CreateContact("Jane")  // Minimal contact
Returns: Created contact object
UpdateContact
Updates an existing contact.
Parameters:

resourceName (required): Contact resource name
givenName (optional): New first name
familyName (optional): New last name
emailAddress (optional): New email address
phoneNumber (optional): New phone number

Example:
javascriptUpdateContact("people/c123", "John", "Smith", "john.smith@email.com")
Returns: Updated contact object
DeleteContact
Deletes a contact from Google Contacts.
Parameters:

resourceName (required): Contact resource name

Example:
javascriptDeleteContact("people/c123")
Returns: Success message
Note: Only works with regular contacts, not other contacts.
CopyOtherContactToContacts
Converts an "other contact" to a regular editable contact.
Parameters:

otherContactResourceName (required): Other contact resource name

Example:
javascriptCopyOtherContactToContacts("people/c456")
Returns: New regular contact object
Note: Original other contact remains unchanged.
Formulas
SearchContacts
Searches for contacts by name or email.
Parameters:

query (required): Search term
limit (optional): Maximum results (default: 25)

Example:
javascriptSearchContacts("john@example.com")
SearchContacts("John Smith", 10)
Returns: Array of matching contacts
GetContact
Retrieves detailed information for a specific contact.
Parameters:

resourceName (required): Contact resource name

Example:
javascriptGetContact("people/c123")
Returns: Contact object with full details
Data Structures
Contact Object
javascript{
  resourceName: "people/c123456789",
  etag: "abc123",
  displayName: "John Doe",
  givenName: "John",
  familyName: "Doe",
  middleName: "",
  emailAddresses: ["john@example.com"],
  phoneNumbers: ["+1234567890"],
  organizations: ["Acme Corp"],
  addresses: ["123 Main St, City, State"],
  memberships: ["contactGroups/myContacts"],
  photoUrl: "https://...",
  birthdays: ["1990/5/15"],
  lastModified: "2024-01-15T10:30:00Z",
  contactType: "CONTACT",
  sources: ["CONTACT"]
}
Contact Group Object
javascript{
  resourceName: "contactGroups/myContacts",
  etag: "def456",
  name: "My Contacts",
  formattedName: "My Contacts", 
  groupType: "USER_CONTACT_GROUP",
  memberCount: 150,
  memberResourceNames: ["people/c123", "people/c456"]
}
Contact Types
Regular Contact ("CONTACT")

Full read/write access
All fields available
Can be edited directly in Coda
Can be deleted
Supports all operations

Other Contact ("OTHER_CONTACT")

Read-only access
Limited fields (names, emails, phones, photos only)
Cannot be edited directly
Cannot be deleted
Must use CopyOtherContactToContacts to make editable

Error Handling
Common Error Codes

400: Bad request (invalid parameters)
401: Authentication required (token refresh)
403: Permission denied (insufficient scopes)
404: Resource not found (contact deleted)
429: Rate limit exceeded (too many requests)

Best Practices

Let 401 errors bubble up for automatic token refresh
Implement retry logic for rate limits
Validate parameters before API calls
Handle missing resources gracefully
Use appropriate error messages for users

Limitations
Google API Limits

Other contacts have restricted field access
Some contact groups may be read-only
Rate limits apply to all operations
Photos are read-only references

Pack Limitations

Two-way sync only works with regular contacts
Other contacts cannot be edited directly
Group memberships are read-only in sync table
Batch operations limited to 10 items at once

Performance Tips

Use filters to reduce data volume
Implement caching for frequently accessed data
Use batch operations when available
Monitor API quotas and usage
Optimize sync frequency based on usage patterns
