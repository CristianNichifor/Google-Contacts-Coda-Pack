# Google Contacts Coda Pack - Complete Setup Guide

Comprehensive step-by-step setup instructions for configuring the enterprise-grade Google Contacts Coda Pack with 85+ fields and international support.

## 📋 Prerequisites

- Google account (Gmail or Google Workspace)
- Coda workspace with pack development permissions
- Basic understanding of Google Cloud Console
- 15-20 minutes setup time

## 🎯 Overview

This pack provides:
- **85+ contact fields** including 10 emails, 10 phones, 5 addresses
- **International support** with 249 countries
- **Two-way sync** with comprehensive field mapping
- **Enterprise features** like custom fields and relationship tracking

**Setup Requirements:**
1. **Google Cloud Console** project with People API enabled
2. **OAuth 2.0 credentials** configured with proper scopes
3. **Coda Pack** uploaded and configured
4. **Account connection** in your Coda document

---

## Step 1: Google Cloud Console Setup

### 1.1 Create or Select Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Either:
   - **Create new project**: Click "New Project" → Enter descriptive name → Create
   - **Use existing**: Select your existing project
4. **Record your Project ID** (needed for reference)

### 1.2 Enable Google People API

1. Navigate to **"APIs & Services" → "Library"**
2. Search for **"Google People API"**
3. Click on the API result
4. Click **"Enable"** button
5. Wait for confirmation (usually 30-60 seconds)

**Verification**: Check that the API appears in "APIs & Services" → "Enabled APIs"

### 1.3 Configure OAuth Consent Screen

**Critical for proper authorization flow:**

#### For Personal Gmail Accounts:
1. Go to **"APIs & Services" → "OAuth consent screen"**
2. Select **"External"** type → Click "Create"
3. Fill in **App Information**:
   - **App name**: `Google Contacts Extra Pack`
   - **User support email**: Your email address
   - **App logo**: Optional but recommended for professional appearance
   - **App domain**: Leave blank unless you have a website
4. **Developer contact information**: Your email address
5. Click **"Save and Continue"**

#### For Google Workspace Accounts:
1. Select **"Internal"** type → Click "Create"
2. Fill in the same information as above
3. **Advantage**: No app verification required for workspace users

### 1.4 Configure Required Scopes

**Essential step - missing scopes cause permission failures:**

1. On the "Scopes" step, click **"Add or Remove Scopes"**
2. Add these **exact scopes** (copy-paste to avoid errors):
   ```
   https://www.googleapis.com/auth/contacts
   https://www.googleapis.com/auth/contacts.readonly
   https://www.googleapis.com/auth/contacts.other.readonly
   profile
   ```
3. **Verify scope descriptions**:
   - First scope: Full read/write access to contacts
   - Second scope: Read-only access to contacts 
   - Third scope: Read access to "Other Contacts" (Gmail auto-contacts)
   - Fourth scope: Basic profile information for connection naming
4. Click **"Update"** → **"Save and Continue"**

### 1.5 Add Test Users (External Apps Only)

**Required for Gmail accounts during development:**

1. In "Test users" section, click **"Add Users"**
2. Add email addresses for testing:
   - Your primary email
   - Any team members who will test
   - Up to 100 test users allowed
3. Click **"Save and Continue"**
4. Review summary → **"Back to Dashboard"**

**Note**: Test users can use the app immediately. For production use, you'll need to submit for verification or keep as "External" for internal use.

### 1.6 Create OAuth 2.0 Credentials

**Most critical configuration step:**

1. Go to **"APIs & Services" → "Credentials"**
2. Click **"Create Credentials" → "OAuth 2.0 Client IDs"**
3. **Application type**: Select **"Web application"**
4. **Name**: Enter descriptive name: `Google Contacts Coda Pack - Production`
5. **Authorized redirect URIs**: 
   - Click **"Add URI"**
   - Enter **exactly**: `https://coda.io/packsAuth/oauth2`
   - ⚠️ **Critical**: This must match Coda's OAuth redirect URI exactly
   - No trailing slashes, no variations
6. Click **"Create"**

### 1.7 Save Credentials Securely

**Download and store credentials safely:**

1. **Copy Client ID** (starts with numbers, ends with `.apps.googleusercontent.com`)
2. **Copy Client Secret** (random string of characters)
3. **Store securely** - these are sensitive credentials
4. **Download JSON** (optional backup)

**Security Note**: Never commit these credentials to public repositories or share them in plain text.

---

## Step 2: Coda Pack Configuration

### 2.1 Upload Pack to Coda

1. Go to [Coda Pack Studio](https://coda.io/packs/build)
2. Click **"New Pack"**
3. Upload your `pack.ts` file
4. Configure pack metadata:
   - **Name**: "Google Contacts Extra Pack"
   - **Description**: "Comprehensive Google Contacts integration with 85+ fields, international support, and two-way sync"
   - **Category**: "Productivity"
   - **Version**: "1.0.0"

### 2.2 Configure OAuth Authentication

**Configure pack authentication settings:**

1. In Pack Studio, navigate to **"Settings" → "Authentication"**
2. Verify authentication type is set to **"OAuth2"**
3. Enter OAuth credentials from Google Cloud Console:
   - **Client ID**: Paste from Step 1.7
   - **Client Secret**: Paste from Step 1.7
4. **Verify OAuth URLs** match your pack code:
   - Authorization URL: `https://accounts.google.com/o/oauth2/v2/auth`
   - Token URL: `https://oauth2.googleapis.com/token`
5. **Save configuration**

### 2.3 Validate and Deploy Pack

1. Click **"Build Pack"** and check for syntax errors
2. Review syntax errors if any
3. Fix any errors and re-build the pack
4. Click **"Build Pack"** to create deployable version
5. 
**Success Indicator**: Pack appears in your workspace's available packs list.

---

## Step 3: Document Configuration

### 3.1 Create Main Contacts Sync Table

1. Open your Coda document
2. Type `/table` → Select **"Sync table"**
3. Choose **"Google Contacts Enterprise Pack"**
4. Select **"Contacts"** sync table
5. Configure sync parameters:
   ```
   Contact Type Filter: CONTACT (recommended for editable contacts)
   Group Filter: (leave empty initially)
   Max Results: 2000 (adjust based on your contact count)
   ```

### 3.2 Connect Google Account

**First-time authentication process:**

1. Click **"Connect Account"** in the sync table setup
2. **OAuth flow begins**:
   - Redirected to Google's authorization page
   - Sign in with your Google account (the one with contacts)
   - Review permissions carefully
   - Click **"Allow"** to grant access
3. **Return to Coda** (automatic redirect)
4. **Verify connection**: Account name should appear in sync table settings

**Troubleshooting**: If redirect fails, check that your OAuth redirect URI is exactly `https://coda.io/packsAuth/oauth2`

### 3.3 Configure Contact Fields

**Customize which fields to display:**

1. In sync table, click **"Add/Remove Columns"**
2. **Recommended fields for initial setup**:
   - Core: `displayName`, `givenName`, `familyName`
   - Communication: `primaryEmail`, `primaryPhone`, `allEmails`, `allPhones`
   - Organization: `organization`, `jobTitle`
   - System: `contactType`, `lastModified`
3. **Advanced fields** (add as needed):
   - Extended names: `prefix`, `suffix`, `nickname`
   - Multiple contacts: `email2`, `phone2`, etc.
   - Addresses: `primaryAddressStreet`, `primaryAddressCity`, `primaryAddressCountry`
   - Personal: `birthday`, `website`, `notes`
   - Custom: `customField1`, `relatedPeople`

### 3.4 Initial Sync and Verification

1. Click **"Sync Now"** in your contacts table
2. **Monitor sync progress**:
3. **Verify data quality**:
   - Check that contact names appear correctly
   - Verify emails and phones are populated
   - Confirm contact types (should be "CONTACT" for editable contacts)
   - Check international characters display properly

### 3.5 Create Contact Groups Table (Optional)

1. Add another sync table: **"ContactGroups"**
2. Configure with default settings
3. Sync to see your contact groups
4. **Use for filtering**: Copy group resource names to filter main contacts table

---

## Step 4: Test Core Functionality

### 4.1 Test Two-Way Sync

**Critical verification step:**

1. **Select a test contact** (preferably non-critical)
2. **Edit basic fields** in Coda:
   - Change `givenName` from "John" to "Jonathan"
   - Update `primaryEmail` to a test email
   - Modify `organization` field
3. **Wait for sync** (15-45 seconds)
4. **Verify in Google Contacts**:
   - Open [Google Contacts](https://contacts.google.com)
   - Find the same contact
   - Confirm changes appear in Google
5. **Reverse test**:
   - Edit contact in Google Contacts
   - Refresh Coda sync table
   - Verify changes appear in Coda

**Success Criteria**: Changes sync bidirectionally without data loss.

### 4.2 Test Advanced Features

**Test extended field support:**

```coda
// Test contact creation with extended fields
=CreateContact(
  "Jane",                    // givenName
  "Smith",                   // familyName  
  "Marie",                   // middleName
  "jane.smith@company.com",  // primaryEmail
  "work",                    // primaryEmailLabel
  "+1-555-0123",            // primaryPhone
  "mobile",                 // primaryPhoneLabel
  "Acme Corporation",        // organization
  "Senior Manager",          // jobTitle
  "Sales",                   // department
  "United States",           // primaryAddressCountry
  "123 Business St",         // primaryAddressStreet
  "Suite 100",              // primaryAddressStreet2
  "12345",                  // primaryAddressPostcode
  "Business City",          // primaryAddressCity
  "",                       // primaryAddressPOBox
  "work",                   // primaryAddressLabel
  "Professional notes",      // notes
  "https://company.com",     // website
  Date(1990,5,15),          // birthday
  ""                        // contactGroup (optional)
)
```

**Test search and read functions:**

```coda
// Search contacts
=ReadContact("people/c123456789") // Use actual resource name

// Test contact limitations helper
=ExplainContactLimitations("people/c123456789")
=ExplainContactLimitations("otherContacts/c987654321")
```

### 4.3 Test Contact Groups

```coda
// Create new group
=CreateContactGroup("Test Group - Setup Verification")

// Read group details
=ReadContactGroup("contactGroups/testGroup")

// Update group name
=UpdateContactGroup("contactGroups/testGroup", "Updated Test Group", "etag_from_read")
```

### 4.4 Test International Features

**Verify international contact support:**

1. **Create contact with international data**:
   - Name with accented characters: "José García"
   - Phonetic fields: phoneticFirst="Ho-SAY"
   - International address with proper country code
   - Multiple addresses in different countries

2. **Test country code conversion**:
   - Enter "United Kingdom" → Verify converts to "GB"
   - Enter "Deutschland" → Should handle or show error appropriately

---

## Step 5: Advanced Configuration

### 5.1 Performance Optimization

**For large contact databases (1000+ contacts):**

```coda
// Use filtered syncs for better performance
Sync Parameters:
- Contact Type Filter: "CONTACT" (excludes read-only "Other Contacts")
- Max Results: 1000 (start smaller, increase as needed)
- Group Filter: "contactGroups/specificGroup" (if applicable)
```

**Sync scheduling best practices:**
- **Manual sync** during initial setup and testing
- **Hourly sync** for active collaboration scenarios  
- **Daily sync** for maintenance and backup scenarios

---

## 🚨 Troubleshooting Common Issues

### Authentication Problems

**Error: "Invalid client" or "Unauthorized"**
- **Check**: OAuth redirect URI is exactly `https://coda.io/packsAuth/oauth2`
- **Verify**: Client ID and Secret are correctly entered in pack settings
- **Confirm**: All required scopes are added to OAuth consent screen

**Error: "Access denied" or "Insufficient permissions"**
- **Solution**: Verify all 4 scopes are properly configured in Google Cloud Console
- **Check**: OAuth consent screen shows all required scopes
- **Try**: Disconnect and reconnect account in Coda

### Sync Issues

**Problem: Contacts missing or not updating**
- **Filter check**: Use `contactType = "CONTACT"` filter to exclude read-only "Other Contacts"
- **Timing**: Allow 60-90 seconds for sync completion
- **Connection**: Verify Google account connection is active
- **Quotas**: Check Google Cloud Console for API quota limits

**Problem: Two-way sync not working**
- **Contact type**: Only "CONTACT" type supports editing (not "OTHER_CONTACT")
- **Fields**: Verify fields are marked as `mutable: true` in schema
- **Conflicts**: Check for concurrent edits in Google Contacts vs Coda

### Performance Issues

**Problem: Slow sync or timeouts**
- **Reduce scope**: Use `maxResults` parameter to limit contact count
- **Filter data**: Use contact group filtering for specific subsets
- **Timing**: Sync during off-peak hours for better performance
- **Connection**: Verify stable internet connection

**Problem: "Rate limit exceeded"**
- **Cause**: Too many API requests in short time
- **Solution**: Wait 60 seconds and retry
- **Prevention**: Avoid multiple simultaneous sync operations

### Data Quality Issues

**Problem: International characters not displaying**
- **Encoding**: Verify UTF-8 encoding is properly handled
- **Fields**: Use phonetic name fields for pronunciation guides
- **Testing**: Test with simple international characters first

**Problem: Addresses formatting incorrectly**
- **Country codes**: Verify country name matches supported country list  
- **Components**: Check that address components are in correct fields
- **Validation**: Use address validation formulas to identify issues

---

## 🔐 Security & Privacy

### Credential Security
- **Store securely**: Never expose Client ID/Secret in public documents
- **Access control**: Limit who can edit pack authentication settings
- **Rotation**: Periodically rotate OAuth credentials (annually recommended)
- **Monitoring**: Review connected applications in Google Account settings

### Data Privacy
- **Scope awareness**: Pack can access all contacts in connected Google account
- **User consent**: Ensure all users understand data access scope
- **Compliance**: Consider GDPR/privacy regulations for business use
- **Backups**: Maintain separate contact backups for critical data

### Access Management
- **Principle of least privilege**: Only grant access to users who need it
- **Group filtering**: Use contact groups to limit data exposure when possible
- **Audit trail**: Monitor sync table edit history for changes
- **Disconnect unused**: Remove pack access when no longer needed

---

## ✅ Setup Verification Checklist

**Before considering setup complete:**

### Google Cloud Console:
- [ ] Project created with meaningful name
- [ ] Google People API enabled and confirmed
- [ ] OAuth consent screen configured with app information
- [ ] All 4 required scopes added to consent screen
- [ ] OAuth 2.0 credentials created with correct redirect URI
- [ ] Client ID and Secret securely stored

### Coda Pack Studio:
- [ ] Pack uploaded and validated successfully
- [ ] OAuth credentials configured in pack settings
- [ ] Pack built and released to workspace
- [ ] No validation errors or warnings

### Coda Document:
- [ ] Contacts sync table created and configured
- [ ] Google account connected successfully
- [ ] Initial sync completed with contact data visible
- [ ] Contact fields displaying correctly
- [ ] ContactGroups table created (if using groups)

### Functionality Testing:
- [ ] Two-way sync tested and working (edit in Coda → appears in Google)
- [ ] Reverse sync tested (edit in Google → appears in Coda)
- [ ] CreateContact formula tested successfully
- [ ] ReadContact formula works with valid resource names
- [ ] Contact groups functionality verified (if applicable)
- [ ] International characters display correctly
- [ ] No authentication or permission errors

### Performance & Security:
- [ ] Sync performance acceptable for contact database size
- [ ] Contact type filtering configured appropriately
- [ ] Data validation formulas created (recommended)
- [ ] Access permissions properly configured
- [ ] Credentials secured and access monitored

---

## 🆘 Getting Help

### Self-Service Resources:
1. **ExplainContactLimitations()**: Use this built-in pack function for contact-specific help
2. **Google Cloud Console**: Check API quotas and error logs
3. **Coda Community**: Search for pack-related discussions

### Support Escalation:
1. **Pack Repository**: Create detailed GitHub issue with error messages
2. **Coda Support**: Contact for platform-specific sync issues  
3. **Google Cloud Support**: For API quota or billing issues

### Information to Include:
- Pack version and configuration details
- Specific error messages (screenshots helpful)
- Steps to reproduce the issue
- Contact database size and complexity
- Google Cloud Console project information (without sensitive data)

---

**🎉 Congrats! Your Google Contacts Extra Coda Pack is now fully configured and ready for comprehensive contact management.** 
