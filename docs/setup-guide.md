# Setup Guide

Complete setup instructions for the Google Contacts Coda Pack.

## Step 1: Google Cloud Console

### Create Project
1. Go to Google Cloud Console
2. Create new project or select existing
3. Note your project ID

### Enable API
1. Navigate to "APIs & Services" → "Library"
2. Search for "Google People API"
3. Click and enable it

### OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type¨(this applies if you are using a gmail.com account) or "Internal" if using a Google Workspace!
3. Fill required information:
   - App name: Choose any name
   - User support email: Your email
   - Developer contact: Your email
4. Click "Save and Continue"

### Add Scopes
1. Click "Add or Remove Scopes"
2. Add these scopes: 
    https://www.googleapis.com/auth/contacts
    https://www.googleapis.com/auth/contacts.readonly
    https://www.googleapis.com/auth/contacts.other.readonly
    profile
3. Save and continue

### Test Users
1. Add your email as test user
2. Save and continue

### Create Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Application type: "Web application"
4. Name: Choose any name
5. Authorized redirect URIs: Add `https://coda.io/packsAuth/oauth2`
6. Click "Create"
7. Copy Client ID and Client Secret

## Step 2: Coda Pack

### Upload Pack
1. Go to Coda Pack Studio
2. Create new pack
3. Upload the pack.ts file from this repository
4. Set pack name and description

### Configure OAuth
1. In pack settings, add OAuth configuration:
- Client ID: From Google Cloud Console
- Client Secret: From Google Cloud Console
2. Save configuration

### Test Pack
1. Use pack validator to check for errors
2. Fix any issues
3. Release pack for use

## Step 3: Use in Coda

### Create Sync Table
1. In your Coda document, insert table
2. Choose "Sync table"
3. Select your Google Contacts pack
4. Choose "ContactsWithTwoWaySync" table

### Connect Account
1. Click "Connect account"
2. Sign in with your Google account
3. Grant permissions to the app
4. Return to Coda

### Configure Sync
1. Set sync parameters if needed
2. Click "Sync now"
3. Verify contacts appear in table

## Step 4: Test Two-Way Sync

### Edit Contact
1. Find a contact in your sync table
2. Edit the name or email
3. Wait for sync to complete
4. Check Google Contacts to verify change
5. You can edit it either by activating the 2-way sync or using the update contact canva or column button.

### Create Contact
1. Add new row to sync table using the canvas or column button from this pack.
2. Fill in contact details
3. Sync will create contact in Google

### Use Actions
1. Try SearchContacts formula
2. Test CreateContact action
3. Use CopyOtherContactToContacts for other contacts

## Troubleshooting

If you encounter issues:
1. Check Google Cloud Console quotas
2. Verify all scopes are added
3. Ensure redirect URI is correct
4. See troubleshooting.md for common problems

## Security Notes

- Never share Client Secret publicly
- Use environment variables for secrets in production
- Regularly review connected applications
- Remove test users when going to production
