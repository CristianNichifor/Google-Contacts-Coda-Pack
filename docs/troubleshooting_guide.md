# Google Contacts Coda Pack - Complete Troubleshooting Guide

Comprehensive troubleshooting guide for the enhanced Google Contacts Coda Pack with 85+ field support and international capabilities.

## 🚨 Quick Diagnostics

### Is your issue related to:
- [Authentication/Login Problems](#authentication-issues) 🔐
- [Sync Not Working](#sync-issues) 🔄  
- [Missing Contacts/Data](#data-issues) 📊
- [Performance/Speed](#performance-issues) ⚡
- [Actions Not Working](#action-issues) 🔧
- [Google API Errors](#api-errors) 🌐
- [International/Extended Fields](#international-field-issues) 🌍

---

## 🔐 Authentication Issues

### Problem: "Authentication Required" or "Invalid Credentials"

**Symptoms:**
- Red error message in sync table
- "Please connect your account" prompts
- OAuth flow doesn't complete

**Solutions:**

#### 1. Verify OAuth Configuration
```bash
# Check these exact values in Coda Pack settings:
Authorization URL: https://accounts.google.com/o/oauth2/v2/auth
Token URL: https://oauth2.googleapis.com/token
Redirect URI: https://coda.io/packsAuth/oauth2
```

#### 2. Reconnect Google Account
1. In Coda document, find sync table
2. Click **"Connected Accounts"** 
3. **"Disconnect"** Google account
4. **"Connect Account"** again
5. Complete OAuth flow fresh

#### 3. Check Google Cloud Console
1. Go to **"APIs & Services" → "Credentials"**
2. Verify OAuth client has redirect URI: `https://coda.io/packsAuth/oauth2`
3. Check **"OAuth consent screen"** status is not "Needs Verification"

### Problem: "Access Denied" or "Insufficient Permissions"

**Symptoms:**
- OAuth flow completes but sync fails
- "Permission denied" errors
- Some features work, others don't

**Solutions:**

#### 1. Verify Required Scopes
Ensure **all** these scopes are added in OAuth consent screen:
```
https://www.googleapis.com/auth/contacts
https://www.googleapis.com/auth/contacts.readonly  
https://www.googleapis.com/auth/contacts.other.readonly
profile
```

#### 2. Re-authorize with Fresh Consent
1. Go to [Google Account Permissions](https://myaccount.google.com/permissions)
2. Find your Coda/Pack app
3. **"Remove access"**
4. Reconnect in Coda with fresh authorization

#### 3. Check User Type Configuration
- **External apps**: Add your email to "Test users"
- **Internal apps**: Ensure you're using Google Workspace account

### Problem: "Daily Authentication Required"

**Symptoms:**
- Need to reconnect every day
- Refresh token not working
- Authentication expires quickly

**Solutions:**

#### 1. Verify Pack OAuth Configuration
The pack includes proper refresh token configuration:
```javascript
// Pack configuration includes:
additionalParams: {
  access_type: "offline",
  include_granted_scopes: "true",
  prompt: "consent"
}
```

#### 2. Check Google Cloud Console Settings
1. **"APIs & Services" → "Credentials"**  
2. Edit your OAuth 2.0 Client
3. Ensure **"Web application"** type is selected
4. Verify redirect URI is correct

#### 3. Reset OAuth Application
1. Create **new OAuth credentials** in Google Cloud
2. Update **Client ID/Secret** in Coda Pack settings
3. Force fresh authorization flow

---

## 🔄 Sync Issues

### Problem: Two-Way Sync Not Working

**Symptoms:**
- Changes in Coda don't appear in Google Contacts
- Contacts sync from Google but not back
- "Read-only" behavior in sync table

**Solutions:**

#### 1. Verify Contact Type
```javascript
// Only CONTACT type supports two-way sync
// OTHER_CONTACT is read-only

// Use built-in helper to understand limitations:
=ExplainContactLimitations("people/c123456789")
=ExplainContactLimitations("otherContacts/c987654321")
```

#### 2. Check Field Mutability
- Only fields marked `mutable: true` can be edited
- System fields (resourceName, etag, displayName) are read-only
- Other Contacts have severely limited field access

#### 3. Convert Other Contacts
```javascript
// Make Other Contacts editable:
=CopyOtherContactToContacts("otherContacts/c123456", true, true, true)
```

#### 4. Use Correct Sync Table Configuration
Configure sync table parameters properly:
- **Contact Type Filter**: "CONTACT" for editable contacts only
- **Max Results**: Start with 2000 or less for performance
- **Group Filter**: Optional, use specific group resource name

### Problem: Sync Table Empty or Slow

**Symptoms:**
- No contacts appear after sync
- Sync takes very long time
- "Loading..." state persists

**Solutions:**

#### 1. Check API Quotas
1. Go to **Google Cloud Console → "APIs & Services" → "Quotas"**
2. Search for **"People API"**
3. Verify quotas are not exceeded
4. Default limit: 100 requests per 100 seconds per user

#### 2. Reduce Sync Scope
Configure sync table with smaller scope:
- **Contact Type Filter**: "CONTACT" (excludes read-only other contacts)
- **Max Results**: Start with 100-500 for testing
- **Group Filter**: Use specific group if you have many contacts

#### 3. Check Network/Performance
- Try syncing from different network
- Clear browser cache
- Use incognito/private browsing mode
- Test during off-peak hours

### Problem: Changes Not Syncing

**Symptoms:**
- Edit contact in Coda
- Change doesn't appear in Google Contacts
- No error messages shown

**Solutions:**

#### 1. Verify Change Detection
- Wait 30-60 seconds after editing
- Batch updates process up to 10 contacts at once
- Manual refresh may be needed

#### 2. Check for Conflicts
- ETag conflicts from concurrent modifications
- Automatic conflict resolution using fresh etag fetch
- Try refreshing sync table and re-editing

#### 3. Validate Data Format
```javascript
// Common format issues:
- Invalid email format (use proper email validation)
- Invalid phone number format (minimum 7 digits)
- Invalid date format (use Date objects or YYYY-MM-DD)
- Country names must match supported 249 countries
```

---

## 📊 Data Issues

### Problem: Missing Contacts

**Symptoms:**
- Contacts visible in Google but not Coda
- Contact count doesn't match
- Specific contacts never sync

**Solutions:**

#### 1. Check Contact Sources
Different contact types have different capabilities:
- **CONTACT**: Full access, editable, all 85+ fields
- **OTHER_CONTACT**: Limited fields (names, emails, phones only), read-only

#### 2. Use Appropriate Sync Table Parameters
In sync table configuration:
- **Contact Type Filter**: Leave empty for all, or "CONTACT"/"OTHER_CONTACT"
- **Group Filter**: Use group resource name to filter by group
- **Max Results**: Increase if you have many contacts (max: 10,000)

#### 3. Check Contact Groups
Some contacts may be in specific groups:
- Sync ContactGroups table to see all groups
- Use group resource names for filtering
- System groups vs user-created groups

### Problem: Missing Contact Fields

**Symptoms:**
- Contact syncs but missing emails/phones
- Partial contact information
- Empty fields that should have data

**Solutions:**

#### 1. Verify Contact Type Limitations
- **Other Contacts**: Only name, email, phone available
- **Regular Contacts**: All 85+ fields available
- Use `ExplainContactLimitations()` for specific contact analysis

#### 2. Check Extended Field Support
The pack supports extensive fields:
```javascript
// Extended name fields
prefix, givenName, middleName, familyName, suffix,
phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs

// Multiple communication fields
primaryEmail through email10 (with labels)
primaryPhone through phone10 (with labels)
allEmails, allPhones (compiled arrays)

// Complete address sets
primaryAddress through address5 (full international addresses)

// Personal and business fields
birthday, website, notes, organization, jobTitle, department

// Advanced fields
significantDate1-10 (with labels), relatedPeople, customField1-10 (with labels)
```

#### 3. Data Validation Issues
- Invalid email/phone formats are filtered out during sync
- Empty or malformed data is skipped
- Check original Google Contacts for data quality
- Use pack validation helpers for data checking

### Problem: International Characters/Addresses

**Symptoms:**
- International names not displaying correctly
- Address formatting issues
- Country codes not converting properly

**Solutions:**

#### 1. Use Extended Name Fields
```javascript
// For international names:
phoneticFirst: "ジョン"    // Japanese phonetic
phoneticMiddle: "マイケル"
phoneticLast: "ドウ"
nickname: "Johnny"        // Common English name
```

#### 2. Verify Country Support
- Pack supports 249 countries with automatic code conversion
- Country names must match supported list exactly
- Use country picker in address fields

#### 3. Address Formatting
```javascript
// Each of 5 addresses includes:
street, street2, city, postcode, country, POBox, label
// With proper international formatting and validation
```

---

## ⚡ Performance Issues

### Problem: Slow Sync Performance

**Symptoms:**
- Sync takes minutes to complete
- Browser becomes unresponsive
- Timeout errors

**Solutions:**

#### 1. Optimize Sync Parameters
Configure sync table for better performance:
- **Contact Type Filter**: "CONTACT" (faster than including other contacts)
- **Max Results**: Start with 1000, increase gradually
- **Group Filter**: Use specific groups to reduce data volume

#### 2. Batch Operations Optimization
- Sync processes up to 10 contact updates per batch
- Avoid editing many contacts simultaneously
- Use manual sync during testing, automatic for production

#### 3. System Optimization
- Close other browser tabs
- Clear browser cache
- Use wired internet connection
- Update browser to latest version
- Consider contact database size (10,000 contact limit)

### Problem: API Rate Limiting

**Symptoms:**
- "Rate limit exceeded" errors
- 429 HTTP status codes
- Intermittent sync failures

**Solutions:**

#### 1. Understanding Rate Limits
- Google People API: 100 requests per 100 seconds per user
- Pack includes automatic retry logic with exponential backoff
- Large contact lists may hit limits during initial sync

#### 2. Monitor API Usage
1. **Google Cloud Console → "APIs & Services" → "Quotas"**
2. Check People API usage vs limits
3. Review quota allocation and trends

#### 3. Optimization Strategies
- Use contact type filtering to reduce API calls
- Sync during off-peak hours for large datasets
- Consider breaking very large contact lists into groups

---

## 🔧 Action Issues

### Problem: Actions Not Working

**Symptoms:**
- CreateContact fails
- UpdateContact has no effect  
- ReadContact returns no results

**Solutions:**

#### 1. Verify Action Syntax
```javascript
// Correct syntax for enhanced pack:

// Create contact with extended fields
=CreateContact(
  "John",                      // givenName (required)
  "Doe",                       // familyName
  "Michael",                   // middleName
  "john.doe@company.com",      // primaryEmail
  "work",                      // primaryEmailLabel
  "+1-555-0123",              // primaryPhone
  "mobile",                   // primaryPhoneLabel
  "Acme Corp",                // organization
  "Manager",                  // jobTitle
  "Sales",                    // department
  "United States",            // primaryAddressCountry
  "123 Main St",              // primaryAddressStreet
  "Suite 100",                // primaryAddressStreet2
  "12345",                    // primaryAddressPostcode
  "City",                     // primaryAddressCity
  "",                         // primaryAddressPOBox
  "work",                     // primaryAddressLabel
  "Notes here",               // notes
  "https://website.com",      // website
  Date(1990,5,15),           // birthday
  "contactGroups/teamId"      // contactGroup
)

// Update contact with extended fields
=UpdateContact(
  "people/c123456789",        // resourceName (required)
  "Jonathan",                 // givenName
  "Smith",                    // familyName
  "Robert",                   // middleName
  "Dr.",                      // prefix
  "Jr."                       // suffix
  // ... up to 85+ parameters available
)

// Read contact details
=ReadContact("people/c123456789")

// Get help for specific contact
=ExplainContactLimitations("people/c123456789")
```

#### 2. Check Resource Names
```javascript
// Resource names must be exact:
"people/c1234567890abcdef"      // Regular contact (correct)
"otherContacts/c1234567890ab"   // Other contact (correct)

// Invalid formats:
"c1234567890abcdef"            // Missing prefix
"people/123"                   // Wrong format
```

#### 3. Validate Input Data
- **Email**: Must pass regex validation
- **Phone**: Must be at least 7 digits and valid format
- **Names**: givenName required for contact creation
- **Countries**: Must match one of 249 supported countries
- **Dates**: Use Date objects or YYYY-MM-DD format

### Problem: Group Operations Failing

**Symptoms:**
- Cannot create contact groups
- Group assignments don't work
- UpdateContactGroup fails

**Solutions:**

#### 1. Use Correct Group Functions
```javascript
// Available group management functions:
=CreateContactGroup("Team Name")
=ReadContactGroup("contactGroups/resourceName")
=UpdateContactGroup("contactGroups/resourceName", "New Name", "etag_value")
=DeleteContactGroup("contactGroups/resourceName", false)
```

#### 2. Group Assignment in CreateContact
```javascript
// Group assignment works during contact creation:
=CreateContact("John", "Doe", "", "john@example.com", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "contactGroups/teamId")
```

#### 3. Verify Group Resource Names
- Get correct names from ContactGroups sync table
- Format: "contactGroups/[groupId]"
- Cannot modify system groups (starred, myContacts)
- Only user-created groups are editable

---

## 🌍 International & Extended Field Issues

### Problem: Phonetic Names Not Working

**Symptoms:**
- Phonetic name fields empty
- International pronunciation not preserved
- Character encoding issues

**Solutions:**

#### 1. Use Extended Name Fields
```javascript
=UpdateContact(
  "people/c123456789",
  "José",           // givenName
  "García",         // familyName
  "",               // middleName
  "",               // prefix
  "",               // suffix
  "",               // nickname
  "Ho-SAY",         // phoneticFirst
  "",               // phoneticMiddle
  "Gar-SEE-ah"      // phoneticLast
)
```

#### 2. Verify UTF-8 Support
- Pack supports full UTF-8 character encoding
- Test with simple international characters first
- Check browser encoding settings

### Problem: Address/Country Issues

**Symptoms:**
- Country codes not converting
- International addresses formatting incorrectly
- Postal codes not validating

**Solutions:**

#### 1. Use Supported Countries
- Pack supports 249 countries with automatic conversion
- Enter country names, not codes: "United Kingdom" not "GB"
- Check supported country list if validation fails

#### 2. Complete Address Components
```javascript
// Each address supports full international formatting:
street, street2, city, postcode, country, POBox, label
// Use all relevant components for proper formatting
```

### Problem: Custom Fields Not Saving

**Symptoms:**
- Custom field values disappear
- Labels not preserved
- Business data not syncing

**Solutions:**

#### 1. Use Proper Custom Field Syntax
```javascript
=UpdateContact(
  "people/c123456789",
  undefined, undefined, undefined, undefined, undefined, // Skip name fields
  undefined, undefined, undefined, undefined, undefined, // Skip email fields
  // ... skip other fields to reach custom fields
  "Employee ID 12345",    // customField1
  "Employee Info",        // customField1Label
  "Department Code: SALES", // customField2
  "Internal Data"         // customField2Label
)
```

#### 2. Verify Field Support
- Pack supports 10 custom fields with labels
- Each custom field can have user-defined label
- Data preserved across sync operations

---

## 🌐 API Errors

### Common Error Codes and Solutions

#### 400 - Bad Request
**Cause**: Invalid data format or missing required fields
**Solutions**:
- Validate email formats using pack's built-in validation
- Ensure phone numbers meet minimum 7-digit requirement
- Check date formats (use Date objects or YYYY-MM-DD)
- Verify country names match supported list
- Remove invalid characters from text fields

#### 401 - Unauthorized  
**Cause**: Authentication expired or invalid
**Solutions**:
- Pack includes automatic token refresh
- If persistent, reconnect Google account
- Check OAuth configuration in pack settings
- Verify scopes in consent screen

#### 403 - Forbidden
**Cause**: Insufficient permissions or API disabled
**Solutions**:
- Verify Google People API is enabled
- Check OAuth scopes include all 4 required permissions
- Re-authorize with fresh consent
- Check if contact is read-only (Other Contact type)

#### 404 - Not Found
**Cause**: Contact or group doesn't exist
**Solutions**:
- Verify resource name is correct format
- Check if contact was deleted in Google Contacts
- Use ReadContact to test specific resource names
- Resource names change when contacts are merged

#### 409 - Conflict
**Cause**: Contact modified by another source
**Solutions**:
- Pack automatically fetches fresh etag before updates
- Refresh sync table to get latest version
- Check for concurrent modifications in Google Contacts
- Retry operation with latest data

#### 429 - Rate Limited
**Cause**: Too many API requests
**Solutions**:
- Pack includes automatic retry with exponential backoff
- Reduce sync frequency for large datasets
- Use contact type filtering to reduce API calls
- Consider increasing API quotas for heavy usage

#### 500 - Server Error
**Cause**: Google API temporary issue
**Solutions**:
- Pack includes retry logic for temporary failures
- Check Google API status page
- Try again during off-peak hours
- Contact Google Cloud Support for persistent issues

---

## 🔍 Debugging Steps

### Step 1: Basic Diagnostics
1. **Check pack validation**: Ensure latest version installed
2. **Test with ExplainContactLimitations()**: Get specific contact help
3. **Test with minimal data**: Single contact, basic fields
4. **Check browser console**: Look for JavaScript errors

### Step 2: Isolate the Problem
1. **Test in incognito mode**: Rule out browser cache issues
2. **Try different contact**: Rule out data-specific issues  
3. **Test different actions**: See if problem is action-specific
4. **Check with different account**: Rule out account-specific issues

### Step 3: Advanced Diagnostics
```javascript
// Use built-in diagnostic functions:
=ExplainContactLimitations()                    // General overview
=ExplainContactLimitations("people/c123")       // Regular contact analysis
=ExplainContactLimitations("otherContacts/c456") // Other contact limitations

// Test basic operations:
=ReadContact("people/c123456789")               // Test contact access
=CreateContact("Test", "User")                  // Test contact creation
```

---

## 🆘 Getting Additional Help

### Before Asking for Help
1. **Work through this troubleshooting guide** systematically
2. **Use ExplainContactLimitations()** for contact-specific help
3. **Try the solutions** for your specific symptoms
4. **Gather error messages** and reproduction steps
5. **Test with minimal case** (single contact, basic operation)

### Where to Get Help
1. **Built-in Help System**: 
   ```javascript
   =ExplainContactLimitations()                    // General help
   =ExplainContactLimitations("people/c123")       // Specific contact help
   ```

2. **GitHub Issues**: Create detailed issue with:
   - Exact error messages
   - Steps to reproduce
   - Expected vs actual behavior
   - Pack version and configuration details (no secrets!)

3. **Coda Community**: Search existing topics or create new topic with details

4. **Google Cloud Support**: For Google API specific issues
   - Check [Google API Status](https://status.cloud.google.com/)
   - Review [People API documentation](https://developers.google.com/people)

### Information to Include in Support Requests
- **Pack version**: Check in Coda Pack Studio
- **Error message**: Full text of any error messages
- **Steps to reproduce**: Detailed sequence that causes problem
- **Expected behavior**: What should happen?
- **Actual behavior**: What actually happens?
- **Browser/OS**: Chrome/Safari/Firefox on Windows/Mac/Linux
- **Account type**: Gmail vs Google Workspace
- **Contact volume**: Approximate number of contacts
- **Contact types**: Regular vs Other contacts
- **Field complexity**: Basic vs extended fields being used

---

## ✅ Prevention Tips

### Regular Maintenance
- **Monitor API quotas** monthly in Google Cloud Console
- **Use ExplainContactLimitations()** to understand contact capabilities
- **Review connected applications** in Google Account settings
- **Update pack** when new versions available
- **Clean contact data** using pack's validation features

### Best Practices
- **Test changes** on small contact groups first
- **Use contact type filtering** for better performance
- **Leverage extended fields** for comprehensive contact data
- **Use international features** for global contact management
- **Document custom workflows** for team members

### Performance Optimization
- **Filter sync tables** to relevant contacts only (use "CONTACT" filter)
- **Use appropriate result limits** (start with 1000-2000 contacts)
- **Schedule heavy operations** during off-peak hours
- **Monitor browser memory usage** during large syncs
- **Use group filtering** for targeted contact management

---

**Still having issues?** Use the built-in `ExplainContactLimitations()` function for immediate help, or reach out to the community! 🤝
