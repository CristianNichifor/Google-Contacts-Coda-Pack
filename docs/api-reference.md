# API Reference

Complete reference for all pack functions including contact and group management.

## Sync Tables

### ContactsWithTwoWaySync
Syncs all contacts with full editing support.

**Parameters:**
- `contactTypeFilter` (optional): "CONTACT" or "OTHER_CONTACT"
- `groupFilter` (optional): Contact group resource name
- `maxResults` (optional): Maximum contacts to return (default: 1000)

**Examples:**

SyncContacts()                           // All contacts
SyncContacts("CONTACT")                  // Regular contacts only
SyncContacts("OTHER_CONTACT")            // Other contacts only  
SyncContacts("CONTACT", "contactGroups/myContacts")  // Filtered by group
SyncContacts("", "", 500)                // Limit to 500 contacts

Returns: Array of contact objects with two-way sync support
ContactGroups
Syncs all contact groups with member information.
Parameters: None
Example: 

SyncContactGroups()

Returns: Array of contact group objects with member counts and resource names
Contact Actions
CreateContact
Creates a new contact in Google Contacts with optional group assignment.
Parameters:

givenName (required): First name
familyName (optional): Last name
emailAddress (optional): Email address
phoneNumber (optional): Phone number
organization (optional): Company name
contactGroup (optional): Group resource name for immediate assignment

Examples:

CreateContact("John", "Doe", "john@example.com", "+1234567890", "Acme Corp")
CreateContact("Jane", "Smith")  // Minimal contact
CreateContact("Bob", "Wilson", "bob@example.com", "", "", "contactGroups/salesTeam")  // With group

Returns: Created contact object with group membership if assigned
Note: Uses two-step process - creates contact first, then adds to group if specified.
UpdateContact
Updates an existing contact's information.
Parameters:
resourceName (required): Contact resource name
givenName (optional): New first name
familyName (optional): New last name
emailAddress (optional): New email address
phoneNumber (optional): New phone number

Example:

UpdateContact("people/c123", "John", "Smith", "john.smith@email.com")
Returns: Updated contact object
Note: Only works with regular contacts, not other contacts. Group memberships cannot be changed via this action.
DeleteContact
Deletes a contact from Google Contacts.
Parameters:

resourceName (required): Contact resource name

Example:

DeleteContact("people/c123")
Returns: Success message
Note: Only works with regular contacts, not other contacts.
CopyOtherContactToContacts
Converts an "other contact" to a regular editable contact.
Parameters:

otherContactResourceName (required): Other contact resource name


Example:
CopyOtherContactToContacts("people/c456")
Returns: New regular contact object
Note: Original other contact remains unchanged. Only copies names, emails, and phone numbers.
Group Management Actions
CreateContactGroup
Creates a new contact group.
Parameters:

groupName (required): Name for the new contact group

Example:
CreateContactGroup("Sales Team")
CreateContactGroup("Project Alpha Members")
Returns: New contact group object with resource name
AddContactToGroup
Adds an existing contact to a contact group.
Parameters:

contactResourceName (required): Contact resource name
groupResourceName (required): Group resource name

Example:
AddContactToGroup("people/c123", "contactGroups/salesTeam")
Returns: Success message
Note: Only works with regular contacts. Contact must exist before adding to group.
RemoveContactFromGroup
Removes a contact from a contact group.
Parameters:

contactResourceName (required): Contact resource name
groupResourceName (required): Group resource name

Example:
RemoveContactFromGroup("people/c123", "contactGroups/oldTeam")
Returns: Success message
Note: Only works with regular contacts. Does not delete the contact, only removes group membership.
Search and Utility Functions
SearchContacts
Searches for contacts by name, email, or other criteria.
Parameters:

query (required): Search term
limit (optional): Maximum results (default: 25)

Examples:
SearchContacts("john@example.com")
SearchContacts("John Smith", 10)
SearchContacts("Acme Corp", 15)
Returns: Array of matching contacts
GetContact
Retrieves detailed information for a specific contact.
Parameters:

resourceName (required): Contact resource name

Example:
GetContact("people/c123")
Returns: Contact object with full details
ExplainOtherContactDeletion
Explains why other contacts cannot be deleted and provides alternatives.
Parameters:

otherContactResourceName (required): Other contact resource name

Example:
ExplainOtherContactDeletion("people/c456")
Returns: Explanation text with recommendations
Data Structures
Contact Object

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
  memberships: ["contactGroups/myContacts", "contactGroups/salesTeam"],
  photoUrl: "https://...",
  birthdays: ["1990/5/15"],
  lastModified: "2024-01-15T10:30:00Z",
  contactType: "CONTACT",
  sources: ["CONTACT"]

Contact Group Object

  resourceName: "contactGroups/myContacts",
  etag: "def456",
  name: "My Contacts",
  formattedName: "My Contacts", 
  groupType: "USER_CONTACT_GROUP",
  memberCount: 150,
  memberResourceNames: ["people/c123", "people/c456"]

Contact Types
Regular Contact ("CONTACT")

Full read/write access
All fields available
Can be edited directly in Coda
Can be deleted
Can be added to/removed from groups
Supports all operations

Other Contact ("OTHER_CONTACT")

Read-only access
Limited fields (names, emails, phones, photos only)
Cannot be edited directly
Cannot be deleted
Cannot be added to groups
Must use CopyOtherContactToContacts to make editable

Group Management Workflows
Complete Contact Organization Workflow
javascript// 1. Create a new contact group
CreateContactGroup("New Project Team")

// 2. Create contact with immediate group assignment
CreateContact("Alice", "Johnson", "alice@example.com", "+1555-0123", "Tech Corp", "contactGroups/newProjectTeam")

// 3. Add existing contacts to the group
AddContactToGroup("people/c123", "contactGroups/newProjectTeam")
AddContactToGroup("people/c456", "contactGroups/newProjectTeam")

// 4. Remove contacts from old groups
RemoveContactFromGroup("people/c123", "contactGroups/oldProject")

// 5. Search and organize
SearchContacts("Tech Corp", 20)  // Find all company contacts
Group Resource Name Patterns

User-created groups: contactGroups/[groupId]
System groups: contactGroups/myContacts, contactGroups/starred, etc.
Group IDs are generated by Google when creating groups

Error Handling
Common Error Codes

400: Bad request (invalid parameters, malformed data)
401: Authentication required (automatic token refresh)
403: Permission denied (insufficient scopes, access restrictions)
404: Resource not found (contact/group deleted or doesn't exist)
409: Conflict (contact modified by another user)
429: Rate limit exceeded (too many requests)

Group-Specific Errors

Group not found: Invalid group resource name
Contact not found: Invalid contact resource name
Permission denied: Cannot access group (may be system-managed)
Already member: Contact already in group (operation succeeds)
Not a member: Contact not in group for removal (operation succeeds)

Best Practices

Let 401 errors bubble up for automatic token refresh
Implement retry logic for rate limits (429 errors)
Validate resource names before API calls
Handle missing resources gracefully
Use appropriate error messages for users
Check group type before attempting modifications

Limitations
Google API Limits

Other contacts have restricted field access
Some contact groups may be read-only (system groups)
Rate limits apply to all operations
Photos are read-only references
Group operations require separate API calls

Pack Limitations

Two-way sync only works with regular contacts
Other contacts cannot be edited or added to groups directly
Group memberships are read-only in sync table (use actions for changes)
Batch operations limited to 10 items at once
Group assignment in CreateContact is not atomic (contact created even if group assignment fails)

Group Management Limitations

Cannot modify system-created groups (starred, myContacts, etc.)
Cannot delete contact groups through the API
Group membership changes are not reflected in sync tables until next refresh
Maximum group size limits apply (set by Google)

Performance Tips

Use filters to reduce data volume in sync operations
Implement caching for frequently accessed data
Use batch operations when available
Monitor API quotas and usage in Google Cloud Console
Optimize sync frequency based on usage patterns
Group operations efficiently: batch multiple membership changes
Cache group resource names to avoid repeated lookups
Use search judiciously - it counts against API quotas

Result Columns
All actions support result columns for immediate feedback:
Actions Returning Objects

CreateContact: Returns full contact object
UpdateContact: Returns updated contact object
CopyOtherContactToContacts: Returns new regular contact object
GetContact: Returns contact details
CreateContactGroup: Returns new group object

Actions Returning Messages

DeleteContact: Returns deletion confirmation
AddContactToGroup: Returns success message
RemoveContactFromGroup: Returns success message
ExplainOtherContactDeletion: Returns explanation text
