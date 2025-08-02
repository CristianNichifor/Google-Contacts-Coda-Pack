# Troubleshooting

Common issues and solutions.

## Authentication Problems

### "Authentication expired" daily
This happens when Coda cannot refresh OAuth tokens properly.

**Solution:**
1. Check that pack code allows 401 errors to bubble up
2. Verify OAuth config has `access_type: "offline"`
3. Reconnect Google account with fresh consent

### "Permission denied" error
Missing or insufficient OAuth scopes.

**Solution:**
1. Check OAuth consent screen has required scopes
2. Re-authorize Google account
3. Verify Google People API is enabled

### "Invalid redirect URI"
OAuth redirect URI mismatch.

**Solution:**
1. Ensure redirect URI is exactly the one you get in the pack settings (REdirect URL)
2. No trailing slashes or extra characters
3. Save changes in Google Cloud Console

## Sync Issues

### Other contacts missing data
Other contacts have limited field access by design.

**Expected behavior:**
- Organizations, addresses, birthdays not available
- Only names, emails, phones, photos accessible
- This is a Google API limitation

### Two-way sync not working
Contact edits in Coda not syncing to Google.

**Solutions:**
1. Verify contact type is "Regular Contact" not "Other Contact"
2. Check that schema fields have `mutable: true`
3. Ensure executeUpdate function is implemented correctly
4. Other contacts cannot be edited directly

### Contact groups empty
Group sync fails or shows no members.

**Solutions:**
1. Check API quotas in Google Cloud Console
2. Verify contacts permissions are sufficient
3. Some system groups may be read-only

## Data Issues

### Duplicate contacts
Contacts appearing multiple times.

**Cause:** Contacts may have multiple sources (CONTACT + PROFILE)

**Solution:** Use contact type filters to manage duplicates

### Photos not displaying
Contact photos not loading in Coda.

**Cause:** Photo URLs may require authentication

**Solution:** Photos are read-only, managed by Google

### Missing recent contacts
Newly added contacts not appearing.

**Solutions:**
1. Wait a few minutes for Google sync
2. Manually refresh sync table
3. Check if contact was added to correct account

## Performance Issues

### Slow sync times
Large contact lists take long to sync.

**Solutions:**
1. Reduce maxResults parameter
2. Use contact type filters
3. Sync in smaller batches
4. Use group filters to limit scope

### Rate limit errors
Too many API requests.

**Solutions:**
1. Reduce sync frequency
2. Implement delays between operations
3. Check Google Cloud Console quotas
4. Use batch operations when possible

## API Errors

### 400 Bad Request
Invalid request parameters.

**Common causes:**
1. Invalid field names in copyMask
2. Required parameters missing
3. Malformed contact data

**Solution:** Check API documentation for correct parameters

### 403 Forbidden
Insufficient permissions.

**Solutions:**
1. Verify OAuth scopes are correct
2. Check API is enabled
3. Ensure account has necessary permissions

### 404 Not Found
Contact or resource doesn't exist.

**Solutions:**
1. Verify resource name is correct
2. Contact may have been deleted
3. Check if using correct account

### 429 Rate Limited
Too many requests.

**Solutions:**
1. Implement exponential backoff
2. Reduce request frequency
3. Check quota limits in Google Cloud Console

## Getting Help

1. Check Google People API documentation
2. Review Coda Pack SDK documentation
3. Create issue in this repository
4. Test with smaller datasets first
5. Enable debug logging for detailed errors

## Debug Tips

1. Start with small test dataset
2. Use browser developer tools to inspect network requests
3. Check Coda pack logs for detailed error messages
4. Test OAuth flow in isolation
5. Verify Google Cloud Console configuration step by step
