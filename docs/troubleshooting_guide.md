# Google Contacts Pack - Troubleshooting Guide

Comprehensive troubleshooting guide for common issues with the Google Contacts Coda Pack.

## 🚨 Quick Diagnostics

### Is your issue related to:
- [Authentication/Login Problems](#authentication-issues) 🔐
- [Sync Not Working](#sync-issues) 🔄  
- [Missing Contacts/Data](#data-issues) 📊
- [Performance/Speed](#performance-issues) ⚡
- [Actions Not Working](#action-issues) 🔧
- [Google API Errors](#api-errors) 🌐

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
```javascript
// Pack should have this configuration:
additionalParams: {
  access_type: "offline",  // Critical for refresh tokens
  include_granted_scopes: "true"
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

// Filter for editable contacts only:
SyncEnhancedContacts("CONTACT")
```

#### 2. Check Field Mutability
- Only fields marked `mutable: true` can be edited
- System fields (resourceName, etag) are always read-only
- Other Contacts cannot be edited directly

#### 3. Convert Other Contacts
```javascript
// Make Other Contacts editable:
=CopyOtherContactToContacts("people/c123456")
```

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
4. Increase quotas if needed

#### 2. Reduce Sync Scope
```javascript
// Start with smaller datasets:
SyncEnhancedContacts("CONTACT", "", 50)  // 50 contacts max

// Filter by group:
SyncEnhancedContacts("CONTACT", "contactGroups/work")
```

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
- Changes sync on next automatic sync cycle
- Manual refresh may be needed

#### 2. Check for Conflicts
- Another user/app modified contact simultaneously
- Google Contacts web interface changed contact
- Sync with latest version and try again

#### 3. Validate Data Format
```javascript
// Common format issues:
- Invalid email format
- Invalid phone number format  
- Invalid date format (use YYYY-MM-DD)
- Empty required fields
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
```javascript
// Different contact types have different visibility:
- CONTACT: Full access, editable
- OTHER_CONTACT: Limited fields, read-only
- PROFILE: User's own profile, special handling
```

#### 2. Use Appropriate Sync Parameters
```javascript
// Sync all contact types:
SyncEnhancedContacts()

// Sync only specific type:
SyncEnhancedContacts("CONTACT")     // Regular contacts
SyncEnhancedContacts("OTHER_CONTACT") // Gmail auto-contacts
```

#### 3. Check Contact Groups
```javascript
// Contact may be in different group:
SyncEnhancedContacts("", "contactGroups/myContacts")
```

### Problem: Missing Contact Fields

**Symptoms:**
- Contact syncs but missing emails/phones
- Partial contact information
- Empty fields that should have data

**Solutions:**

#### 1. Verify Contact Type
- **Other Contacts**: Only name, email, phone available
- **Regular Contacts**: All fields available
- Use `CopyOtherContactToContacts()` to get full fields

#### 2. Check Field Limits
```javascript
// Pack supports:
- 10 email addresses
- 10 phone numbers  
- 5 complete addresses
- Extended name fields
- Organization details
```

#### 3. Data Validation Issues
- Invalid email/phone formats may be filtered out
- Empty or malformed data is skipped
- Check original Google Contacts for data quality

### Problem: Duplicate Contacts

**Symptoms:**
- Same person appears multiple times
- Contacts with similar names/emails
- Sync creates duplicates

**Solutions:**

#### 1. Use Built-in Duplicate Detection
```javascript
// Find duplicates:
=FindDuplicateContacts("people/c123")

// Merge duplicates:
=MergeContacts("people/c123", "people/c456")
```

#### 2. Check Google Contacts Sources
- Same contact from multiple sources (Gmail, manual, etc.)
- Different contact types for same person
- Manual cleanup may be required

#### 3. Prevent Future Duplicates
- Use search before creating new contacts
- Standardize data entry formats
- Regular duplicate cleanup routine

---

## ⚡ Performance Issues

### Problem: Slow Sync Performance

**Symptoms:**
- Sync takes minutes to complete
- Browser becomes unresponsive
- Timeout errors

**Solutions:**

#### 1. Optimize Sync Parameters
```javascript
// Reduce data volume:
SyncEnhancedContacts("CONTACT", "", 100)  // Limit results

// Use specific filters:
SyncEnhancedContacts("CONTACT", "contactGroups/work")

// Avoid syncing "Other Contacts" unless needed
```

#### 2. Batch Operations
- Sync during off-peak hours
- Process in smaller batches
- Avoid simultaneous sync operations

#### 3. System Optimization
- Close other browser tabs
- Clear browser cache
- Use wired internet connection
- Update browser to latest version

### Problem: API Rate Limiting

**Symptoms:**
- "Rate limit exceeded" errors
- 429 HTTP status codes
- Intermittent sync failures

**Solutions:**

#### 1. Monitor API Usage
1. **Google Cloud Console → "APIs & Services" → "Quotas"**
2. Check People API usage vs limits
3. Review quota allocation

#### 2. Implement Retry Logic
- Pack automatically retries rate-limited requests
- Wait longer between operations
- Reduce concurrent operations

#### 3. Increase Quotas (If Needed)
1. Go to Google Cloud Console quotas
2. Request quota increase for People API
3. Justify business need in request

---

## 🔧 Action Issues

### Problem: Actions Not Working

**Symptoms:**
- CreateContact fails
- UpdateContact has no effect  
- SearchContacts returns no results

**Solutions:**

#### 1. Verify Action Syntax
```javascript
// Correct syntax examples:
=CreateContact("John", "Doe", "john@example.com", "+1234567890")
=UpdateContact("people/c123", "John", "Smith", "johnsmith@email.com")
=SearchContacts("john@example.com", 10)
```

#### 2. Check Resource Names
```javascript
// Resource names must be exact:
"people/c1234567890abcdef"  // Correct format
"c1234567890abcdef"         // Missing "people/" prefix
"people/123"                // Invalid format
```

#### 3. Validate Input Data
- **Email**: Must be valid email format
- **Phone**: Must be valid phone format
- **Names**: Cannot be empty for creation
- **Resource Names**: Must exist and be accessible

### Problem: Group Operations Failing

**Symptoms:**
- Cannot create contact groups
- AddContactToGroup fails
- Group assignments don't save

**Solutions:**

#### 1. Check Group Resource Names
```javascript
// Correct format:
"contactGroups/abc123def456"

// Get correct names from ContactGroups sync table
```

#### 2. Verify Group Permissions
- Cannot modify system groups (starred, myContacts)
- User-created groups only
- Check group ownership

#### 3. Two-Step Process
```javascript
// 1. Create contact first:
=CreateContact("John", "Doe", "john@example.com")

// 2. Then add to group:
=AddContactToGroup("people/c123", "contactGroups/work")
```

---

## 🌐 API Errors

### Common Error Codes and Solutions

#### 400 - Bad Request
**Cause**: Invalid data format or missing required fields
**Solutions**:
- Validate email/phone formats
- Ensure required fields are not empty
- Check date formats (YYYY-MM-DD)
- Remove invalid characters

#### 401 - Unauthorized  
**Cause**: Authentication expired or invalid
**Solutions**:
- Reconnect Google account
- Check OAuth configuration
- Verify scopes in consent screen

#### 403 - Forbidden
**Cause**: Insufficient permissions or API disabled
**Solutions**:
- Verify Google People API is enabled
- Check OAuth scopes include all required permissions
- Re-authorize with fresh consent

#### 404 - Not Found
**Cause**: Contact or group doesn't exist
**Solutions**:
- Verify resource name is correct
- Check if contact was deleted
- Use SearchContacts to find valid resource names

#### 409 - Conflict
**Cause**: Contact modified by another source
**Solutions**:
- Refresh sync table to get latest version
- Retry operation with fresh data
- Handle concurrent modifications

#### 429 - Rate Limited
**Cause**: Too many API requests
**Solutions**:
- Reduce sync frequency
- Implement delays between operations
- Request quota increase if needed

#### 500 - Server Error
**Cause**: Google API temporary issue
**Solutions**:
- Retry operation after delay
- Check Google API status page
- Try again during off-peak hours

---

## 🔍 Debugging Steps

### Step 1: Basic Diagnostics
1. **Check pack validation**: Ensure no syntax errors
2. **Verify authentication**: Test with simple SearchContacts
3. **Test with minimal data**: Single contact, basic fields
4. **Check browser console**: Look for JavaScript errors

### Step 2: Isolate the Problem
1. **Test in incognito mode**: Rule out browser cache issues
2. **Try different contact**: Rule out data-specific issues  
3. **Test different actions**: See if problem is action-specific
4. **Check with different account**: Rule out account-specific issues

### Step 3: Gather Information
1. **Copy exact error messages**: Include full text
2. **Note timing**: When did problem start?
3. **Document steps**: Exact sequence that causes issue
4. **Check recent changes**: Pack updates, account changes, etc.

---

## 🆘 Getting Additional Help

### Before Asking for Help
1. **Work through this troubleshooting guide**
2. **Try the solutions for your specific symptoms**
3. **Gather error messages and reproduction steps**
4. **Test with minimal case** (single contact, basic operation)

### Where to Get Help
1. **GitHub Issues**: [Create detailed issue](../../issues) with:
   - Exact error messages
   - Steps to reproduce
   - Expected vs actual behavior
   - Your configuration details (no secrets!)

2. **Coda Community**: [Coda Community Forum](https://community.coda.io)
   - Search existing topics
   - Create new topic with details
   - Tag relevant categories

3. **Google Cloud Support**: For Google API specific issues
   - Check [Google API Status](https://status.cloud.google.com/)
   - Review [People API documentation](https://developers.google.com/people)

### Information to Include in Support Requests
- **Pack version**: Which version are you using?
- **Error message**: Full text of any error messages
- **Steps to reproduce**: Detailed sequence that causes problem
- **Expected behavior**: What should happen?
- **Actual behavior**: What actually happens?
- **Browser/OS**: Chrome/Safari/Firefox on Windows/Mac/Linux
- **Account type**: Gmail vs Google Workspace
- **Contact volume**: Approximate number of contacts

---

## ✅ Prevention Tips

### Regular Maintenance
- **Monitor API quotas** monthly in Google Cloud Console
- **Clean up duplicate contacts** regularly  
- **Review connected applications** in Google Account settings
- **Update pack** when new versions available

### Best Practices
- **Test changes** on small contact groups first
- **Backup important contact data** before major operations
- **Use descriptive group names** for organization
- **Document custom workflows** for team members

### Performance Optimization
- **Filter sync tables** to relevant contacts only
- **Use result columns** for immediate action feedback
- **Schedule heavy operations** during off-peak hours
- **Monitor browser memory usage** during large syncs

---

**Still having issues?** Don't hesitate to reach out! The community is here to help. 🤝