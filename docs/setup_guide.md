# Google Contacts Coda Pack - Setup Guide

Complete step-by-step setup instructions for configuring the Google Contacts Coda Pack.

## 📋 Prerequisites

- Google account (Gmail or Google Workspace)
- Coda workspace with pack development permissions
- Basic understanding of Google Cloud Console
- 10-15 minutes setup time

## 🎯 Overview

This pack requires:
1. **Google Cloud Console** project with People API enabled
2. **OAuth 2.0 credentials** configured properly
3. **Coda Pack** uploaded and configured
4. **Account connection** in your Coda document

---

## Step 1: Google Cloud Console Setup

### 1.1 Create or Select Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Either:
   - **Create new project**: Click "New Project" → Enter name → Create
   - **Use existing**: Select your existing project
4. **Note your Project ID** (you'll need this later)

### 1.2 Enable Google People API

1. In the Cloud Console, navigate to **"APIs & Services" → "Library"**
2. Search for **"Google People API"**
3. Click on the API result
4. Click **"Enable"** button
5. Wait for confirmation that the API is enabled

### 1.3 Configure OAuth Consent Screen

This is **critical** for authorization to work properly.

#### For Gmail Accounts (External Users):
1. Go to **"APIs & Services" → "OAuth consent screen"**
2. Select **"External"** user type → Click "Create"
3. Fill in **required fields**:
   - **App name**: `Google Contacts Coda Pack` (or your preferred name)
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click **"Save and Continue"**

#### For Google Workspace (Internal Users):
1. Select **"Internal"** user type → Click "Create"
2. Fill in the same required fields as above
3. Click **"Save and Continue"**

### 1.4 Add Required Scopes

**This step is essential** - missing scopes will cause permission errors.

1. On the OAuth consent screen, click **"Add or Remove Scopes"**
2. Add these **exact scopes**:
   ```
   https://www.googleapis.com/auth/contacts
   https://www.googleapis.com/auth/contacts.readonly
   https://www.googleapis.com/auth/contacts.other.readonly
   profile
   ```
3. Click **"Update"** → **"Save and Continue"**

### 1.5 Add Test Users (External Apps Only)

If you selected "External" user type:
1. Click **"Add Users"**
2. Add your email address and any other testing emails
3. Click **"Save and Continue"**
4. Review summary → **"Back to Dashboard"**

### 1.6 Create OAuth 2.0 Credentials

**Most important step** - get this wrong and authentication fails.

1. Go to **"APIs & Services" → "Credentials"**
2. Click **"Create Credentials" → "OAuth 2.0 Client IDs"**
3. **Application type**: Select **"Web application"**
4. **Name**: Enter a descriptive name (e.g., "Google Contacts Coda Pack")
5. **Authorized redirect URIs**: 
   - Click **"Add URI"**
   - Enter **exactly**: `https://coda.io/packsAuth/oauth2`
   - ⚠️ **Critical**: This URL must be exact - no typos!
6. Click **"Create"**
7. **Save the credentials**:
   - Copy **Client ID** 
   - Copy **Client Secret**
   - Store these securely (you'll need them for Coda)

---

## Step 2: Coda Pack Configuration

### 2.1 Upload Pack to Coda

1. Go to [Coda Pack Studio](https://coda.io/packs/build)
2. Click **"New Pack"** or **"Upload Pack"**
3. Upload your `pack.ts` file
4. Set pack details:
   - **Name**: "Google Contacts Pack"
   - **Description**: "Comprehensive Google Contacts integration with two-way sync"
   - **Category**: "Productivity"

### 2.2 Configure OAuth in Pack Settings

**Critical configuration step:**

1. In Pack Studio, go to **"Settings" → "Authentication"**
2. Configure OAuth settings:
   - **Client ID**: Paste from Google Cloud Console
   - **Client Secret**: Paste from Google Cloud Console
   - **Authorization URL**: `https://accounts.google.com/o/oauth2/v2/auth`
   - **Token URL**: `https://oauth2.googleapis.com/token`
3. **Save configuration**

### 2.3 Validate and Test Pack

1. Click **"Validate Pack"** to check for errors
2. Fix any validation issues
3. Click **"Build Pack"** 
4. If successful, **"Release Pack"** for use

---

## Step 3: Using Pack in Coda Document

### 3.1 Create Sync Table

1. Open your Coda document
2. Click **"+"** to add content
3. Select **"Table" → "Sync Table"**
4. Find your **"Google Contacts Pack"**
5. Choose **"EnhancedContacts"** table (main sync table)

### 3.2 Connect Google Account

**First-time authentication:**

1. Click **"Connect Account"** in the sync table
2. You'll be redirected to Google's authorization page
3. **Sign in** with the Google account containing your contacts
4. **Grant permissions** - review carefully and click "Allow"
5. Return to Coda (automatic redirect)

### 3.3 Configure Sync Parameters

**Optional but recommended for large contact lists:**

```javascript
// Basic sync (all contacts)
SyncEnhancedContacts()

// Filter by contact type
SyncEnhancedContacts("CONTACT")  // Only editable contacts

// Limit results for testing
SyncEnhancedContacts("", "", 100)  // First 100 contacts
```

### 3.4 Initial Sync

1. Click **"Sync Now"** in your table
2. Wait for contacts to load (may take 1-2 minutes for large lists)
3. Verify contacts appear with all expected fields

---

## Step 4: Test Functionality

### 4.1 Test Two-Way Sync

1. **Find a test contact** in your sync table
2. **Edit the name or email** directly in Coda
3. Wait 30-60 seconds for sync to complete
4. **Check Google Contacts** to verify the change appeared
5. ✅ Success: Changes sync both directions

### 4.2 Test Actions

Try these formulas in your document:

```javascript
// Search contacts
=SearchContacts("john@example.com")

// Create new contact
=CreateContact("Test", "User", "test@example.com")

// Get contact details
=GetContact("people/c123456789")
```

### 4.3 Test Contact Groups

1. Create sync table for **"ContactGroups"**
2. Verify your groups appear
3. Test group actions:
   ```javascript
   =CreateContactGroup("Test Group")
   =AddContactToGroup("people/c123", "contactGroups/newGroup")
   ```

---

## 🚨 Common Setup Issues

### Authentication Errors

**Problem**: "Permission denied" or "Invalid client"
**Solutions**:
- Verify redirect URI is exactly `https://coda.io/packsAuth/oauth2`
- Check that all required scopes are added
- Ensure OAuth consent screen is configured
- Try disconnecting and reconnecting account

### API Errors

**Problem**: "API not found" or "Quota exceeded"
**Solutions**:
- Confirm Google People API is enabled in Cloud Console
- Check API quotas in Cloud Console → APIs & Services → Quotas
- Verify project billing is enabled (if required)

### Sync Issues

**Problem**: Contacts not syncing or missing fields
**Solutions**:
- Use `CONTACT` filter to exclude "Other Contacts" 
- Check contact type - only regular contacts support two-way sync
- Verify pack is using latest version
- Try refreshing sync table

### Performance Issues

**Problem**: Slow sync or timeouts
**Solutions**:
- Use `maxResults` parameter to limit contacts synced
- Filter by contact groups to reduce data volume
- Sync during off-peak hours
- Check internet connection stability

---

## 🔐 Security Best Practices

### Credential Management
- **Never share** your Client Secret publicly
- **Use environment variables** for credentials in development
- **Regularly review** connected applications in Google Account settings
- **Rotate credentials** if compromised

### Access Control
- **Remove test users** when moving to production
- **Use least privilege** - only grant necessary scopes
- **Monitor API usage** in Google Cloud Console
- **Set up billing alerts** to prevent unexpected charges

### Data Protection
- **Review permissions** carefully during OAuth flow
- **Understand data access** - pack can read/write all contacts
- **Use contact groups** to limit scope when possible
- **Regular backups** of important contact data

---

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Google People API enabled in Cloud Console
- [ ] OAuth consent screen configured with all scopes
- [ ] OAuth credentials created with correct redirect URI
- [ ] Pack uploaded and validated in Coda Pack Studio
- [ ] OAuth credentials configured in pack settings
- [ ] Google account successfully connected in Coda
- [ ] Sync table created and contacts loading
- [ ] Two-way sync tested and working
- [ ] Actions tested (search, create, etc.)
- [ ] Contact groups sync working
- [ ] No authentication or permission errors

---

## 🆘 Getting Help

If you encounter issues during setup:

1. **Check our [Troubleshooting Guide](troubleshooting.md)** for common solutions
2. **Verify each step** in this guide was completed correctly
3. **Test with a simple case** first (small contact list, basic sync)
4. **Check Google Cloud Console** quotas and billing
5. **Create an issue** in this repository with detailed error messages

---

## 🎉 Next Steps

Once setup is complete:

1. **Explore advanced features** - contact groups, duplicate detection, vCard export
2. **Set up automation** - use Coda's automation features with contact data
3. **Customize views** - create filtered views for different use cases
4. **Integrate with other packs** - combine with CRM or email packs
5. **Share with team** - give colleagues access to shared contact database

**Congratulations! Your Google Contacts Coda Pack is now ready to use.** 🚀