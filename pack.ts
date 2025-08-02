import * as coda from "@codahq/packs-sdk";

export const pack = coda.newPack();

pack.addNetworkDomain("googleapis.com");

pack.setUserAuthentication({
  type: coda.AuthenticationType.OAuth2,
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  scopes: [
    "https://www.googleapis.com/auth/contacts",
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/contacts.other.readonly",
    "profile"
  ],
  additionalParams: {
    access_type: "offline",
    include_granted_scopes: "true",
  },
  getConnectionName: async function (context) {
    try {
      let response = await context.fetcher.fetch({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v1/userinfo",
        cacheTtlSecs: 0,
      });
      return response.body?.name || response.body?.email || "Google Account";
    } catch (error) {
      console.log(`Error getting connection name: ${error.message}`);
      return "Google Account";
    }
  },
});

const ContactGroupSchema = coda.makeObjectSchema({
  properties: {
    resourceName: {
      type: coda.ValueType.String,
      description: "The resource name of the contact group"
    },
    etag: {
      type: coda.ValueType.String,
      description: "The ETag of the contact group"
    },
    name: {
      type: coda.ValueType.String,
      description: "The name of the contact group"
    },
    formattedName: {
      type: coda.ValueType.String,
      description: "The formatted name of the contact group"
    },
    groupType: {
      type: coda.ValueType.String,
      description: "The type of the contact group"
    },
    memberCount: {
      type: coda.ValueType.Number,
      description: "The number of contacts in this group"
    },
    memberResourceNames: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Resource names of contacts in this group"
    }
  },
  displayProperty: "formattedName",
  idProperty: "resourceName",
  featuredProperties: ["formattedName", "memberCount", "groupType"]
});

const ContactSchema = coda.makeObjectSchema({
  properties: {
    resourceName: {
      type: coda.ValueType.String,
      description: "Contact resource name",
      required: true
    },
    etag: {
      type: coda.ValueType.String,
      description: "ETag"
    },
    displayName: {
      type: coda.ValueType.String,
      description: "Display name",
      mutable: true
    },
    givenName: {
      type: coda.ValueType.String,
      description: "First name",
      mutable: true
    },
    familyName: {
      type: coda.ValueType.String,
      description: "Last name",
      mutable: true
    },
    middleName: {
      type: coda.ValueType.String,
      description: "Middle name",
      mutable: true
    },
    emailAddresses: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Email addresses",
      mutable: true
    },
    phoneNumbers: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Phone numbers",
      mutable: true
    },
    organizations: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Organizations",
      mutable: true
    },
    addresses: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Addresses",
      mutable: true
    },
    memberships: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Contact groups this person belongs to"
    },
    photoUrl: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.ImageReference,
      description: "Profile photo"
    },
    birthdays: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Birthdays",
      mutable: true
    },
    lastModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Last modified"
    },
    contactType: {
      type: coda.ValueType.String,
      description: "Regular Contact (editable) or Other Contact (read-only)",
      codaType: coda.ValueHintType.SelectList,
      options: [
        { display: "Regular Contact", value: "CONTACT" },
        { display: "Other Contact", value: "OTHER_CONTACT" }
      ],
      mutable: false 
    },
    sources: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Data sources"
    }
  },
  displayProperty: "displayName",
  idProperty: "resourceName",
  featuredProperties: ["displayName", "emailAddresses", "phoneNumbers", "contactType"]
});

function extractContactData(person: any) {
  const names = person.names || [];
  const primaryName = names.find((n: any) => n.metadata?.primary) || names[0] || {};
  
  const emails = (person.emailAddresses || []).map((e: any) => e.value).filter(Boolean);
  const phones = (person.phoneNumbers||[]).map((p: any) => p.value).filter(Boolean);
  const organizations = (person.organizations || []).map((o: any) => o.name).filter(Boolean);
  
  // Google's address format is a quite messy
  const addresses = (person.addresses || []).map((a: any) => {
    if (a.formattedValue) return a.formattedValue;
    return [a.streetAddress, a.city, a.region, a.postalCode, a.country]
      .filter(Boolean).join(', ');
  }).filter(Boolean);
  
  const memberships = (person.memberships || [])
    .map((m: any) => m.contactGroupMembership?.contactGroupResourceName)
    .filter(Boolean);
  
  // Parse birthdays - Google stores them in such a weird way
  const birthdays = (person.birthdays || []).map((b: any) => {
    const date = b.date;
    if (date) {
      return `${date.year || ''}/${date.month || ''}/${date.day || ''}`
        .replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
    }
    return null;
  }).filter(Boolean);
  
  const photoUrl = person.photos?.find((p: any) => p.metadata?.primary)?.url;
  
  // Figure out what type of contact this is:
  const sources = person.metadata?.sources || [];
  const sourceTypes = sources.map((s: any) => s.type).filter(Boolean);
  const hasContact = sourceTypes.includes("CONTACT");
  const hasOtherContact = sourceTypes.includes("OTHER_CONTACT");
  
  let contactType = "CONTACT";
  if (hasOtherContact && !hasContact) {
    contactType = "OTHER_CONTACT";
  }
  
  return {
    resourceName: person.resourceName,
    etag: person.etag,
    displayName: primaryName.displayName || emails[0] || phones[0] || '',
    givenName: primaryName.givenName || '',
    familyName: primaryName.familyName || '',
    middleName: primaryName.middleName || '',
    emailAddresses: emails,
    phoneNumbers: phones,
    organizations: organizations,
    addresses: addresses,
    memberships: memberships,
    photoUrl: photoUrl,
    birthdays: birthdays,
    lastModified: person.metadata?.sources?.[0]?.updateTime,
    contactType: contactType,
    sources: sourceTypes
  };
}

async function updateContact(context: any, update: any): Promise<any> {
  try {
    const { previousValue, newValue } = update;
    const { resourceName, etag } = previousValue;
    
    // Can't edit other contacts directly due to People API limits
    if (previousValue.contactType === "OTHER_CONTACT") {
      throw new coda.UserVisibleError("Can't edit Other contacts. Copy them first using CopyOtherContactToContacts.");
    }
    
    const updateData: any = {};
    const updateMask: string[] = [];
    
    // Handle name changes
    if (newValue.givenName !== undefined || newValue.familyName !== undefined || newValue.displayName !== undefined) {
      updateData.names = [{
        givenName: newValue.givenName || previousValue.givenName || "",
        familyName: newValue.familyName || previousValue.familyName || "",
        displayName: newValue.displayName || previousValue.displayName || ""
      }];
      updateMask.push("names");
    }
    
    if (newValue.emailAddresses !== undefined) {
      updateData.emailAddresses = newValue.emailAddresses.map((email: string) => ({ value: email }));
      updateMask.push("emailAddresses");
    }
    
    if (newValue.phoneNumbers !== undefined) {
      updateData.phoneNumbers = newValue.phoneNumbers.map((phone: string) => ({ value: phone }));
      updateMask.push("phoneNumbers");
    }
    
    if (newValue.organizations !== undefined) {
      updateData.organizations = newValue.organizations.map((org: string) => ({ name: org }));
      updateMask.push("organizations");
    }
    
    if (newValue.addresses !== undefined) {
      updateData.addresses = newValue.addresses.map((addr: string) => ({ formattedValue: addr }));
      updateMask.push("addresses");
    }
    
    if (newValue.birthdays !== undefined) {
      updateData.birthdays = newValue.birthdays.map((birthday: string) => {
        const parts = birthday.split('/');
        return {
          date: {
            year: parts[0] ? parseInt(parts[0]) : undefined,
            month: parts[1] ? parseInt(parts[1]) : undefined,
            day: parts[2] ? parseInt(parts[2]) : undefined
          }
        };
      });
      updateMask.push("birthdays");
    }
    
    if (updateMask.length === 0) {
      return previousValue; // Nothing to update
    }
    
    const response = await context.fetcher.fetch({
      method: "PATCH",
      url: `https://people.googleapis.com/v1/${resourceName}:updateContact?updatePersonFields=${updateMask.join(",")}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updateData, etag: etag })
    });
    
    return extractContactData(response.body);
    
  } catch (error) {
    if (error.statusCode === 404) {
      throw new coda.UserVisibleError(`Contact not found: ${update.previousValue.resourceName}`);
    } else if (error.statusCode === 409) {
      throw new coda.UserVisibleError("Contact was changed by someone else. Refresh and try again.");
    } else {
      throw new coda.UserVisibleError(`Update failed: ${error.message}`);
    }
  }
}

pack.addSyncTable({
  name: "ContactGroups",
  description: "Contact groups from Google Contacts",
  identityName: "ContactGroup",
  schema: ContactGroupSchema,
  formula: {
    name: "SyncContactGroups",
    description: "Sync contact groups",
    parameters: [],
    execute: async function ([], context) {
      try {
        const response = await context.fetcher.fetch({
          method: "GET",
          url: "https://people.googleapis.com/v1/contactGroups?pageSize=1000",
          cacheTtlSecs: 300,
        });
        
        const groups = response.body.contactGroups || [];
        const results = [];
        
        for (const group of groups) {
          try {
            // Get member details
            const detailResponse = await context.fetcher.fetch({
              method: "GET",
              url: `https://people.googleapis.com/v1/${group.resourceName}?maxMembers=10000`
            });
            
            const detailGroup = detailResponse.body;
            results.push({
              resourceName: group.resourceName,
              etag: group.etag,
              name: group.name,
              formattedName: group.formattedName,
              groupType: group.groupType,
              memberCount: detailGroup.memberCount || 0,
              memberResourceNames: detailGroup.memberResourceNames || []
            });
          } catch (detailError) {
            // If we can't get details, just use basic info
            results.push({
              resourceName: group.resourceName,
              etag: group.etag,
              name: group.name,
              formattedName: group.formattedName,
              groupType: group.groupType,
              memberCount: 0,
              memberResourceNames: []
            });
          }
        }
        
        return { result: results };
      } catch (error) {
        if (error.statusCode === 401) {
          throw error; // Let Coda handle token refresh as otherwise if we ingest them in code... tokens won't be refreshed by Coda
        }
        
        if (error.statusCode === 403) {
          throw new coda.UserVisibleError("Permission denied. Check your Google contacts permissions.");
        }
        
        throw new coda.UserVisibleError(`Failed to sync groups: ${error.message}`);
      }
    }
  }
});

pack.addSyncTable({
  name: "ContactsWithTwoWaySync",
  description: "Google Contacts with two-way sync",
  identityName: "Contact",
  schema: ContactSchema,
  formula: {
    name: "SyncContacts",
    description: "Sync contacts",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "contactTypeFilter",
        description: "Filter: 'CONTACT', 'OTHER_CONTACT', or leave empty for all",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "groupFilter",
        description: "Group resource name (regular contacts only)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "maxResults",
        description: "Max contacts (default: 1000)",
        optional: true,
      }),
    ],
    execute: async function ([contactTypeFilter, groupFilter, maxResults], context) {
      try {
        const limit = Math.min(maxResults || 1000, 2000);
        const results: any[] = [];
        
        // Get regular contacts
        if (!contactTypeFilter || contactTypeFilter === "CONTACT") {
          let url = "https://people.googleapis.com/v1/people/me/connections";
          const params = [
            `pageSize=${Math.min(1000, Math.floor(limit / 2))}`,
            "personFields=names,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata"
          ];
          url += "?" + params.join("&");
          
          let nextPageToken = null;
          do {
            const pageUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;
            const response = await context.fetcher.fetch({
              method: "GET",
              url: pageUrl,
              cacheTtlSecs: 60,
            });
            
            const people = response.body.connections || [];
            nextPageToken = response.body.nextPageToken;
            
            for (const person of people) {
              const contactData = extractContactData(person);
              
              if (groupFilter && !contactData.memberships.includes(groupFilter)) {
                continue;
              }
              
              if (contactData.contactType === "CONTACT") {
                results.push(contactData);
              }
              
              if (results.length >= limit) break;
            }
          } while (nextPageToken && results.length < limit);
        }
        
        // Get "other contacts" (the Gmail auto-created ones) that google handles
        if ((!contactTypeFilter || contactTypeFilter === "OTHER_CONTACT") && results.length < limit) {
          let url = "https://people.googleapis.com/v1/otherContacts";
          const params = [
            `pageSize=${Math.min(1000, limit - results.length)}`,
            "readMask=names,emailAddresses,phoneNumbers,photos,metadata" // Other contacts have limited fields
          ];
          url += "?" + params.join("&");
          
          let nextPageToken = null;
          do {
            const pageUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;
            const response = await context.fetcher.fetch({
              method: "GET",
              url: pageUrl,
              cacheTtlSecs: 60,
            });
            
            const people = response.body.otherContacts || [];
            nextPageToken = response.body.nextPageToken;
            
            for (const person of people) {
              const contactData = extractContactData(person);
              contactData.contactType = "OTHER_CONTACT";
              results.push(contactData);
              
              if (results.length >= limit) break;
            }
          } while (nextPageToken && results.length < limit);
        }
        
        return { result: results };
      } catch (error) {
        if (error.statusCode === 401) {
          throw error; // Let Coda refresh tokens
        }
        
        if (error.statusCode === 403) {
          throw new coda.UserVisibleError("Permission denied. Check contacts permissions.");
        }
        
        throw new coda.UserVisibleError(`Sync failed: ${error.message}`);
      }
    },
    
    maxUpdateBatchSize: 10,
    
    executeUpdate: async function (args, updates, context) {
      const jobs = updates.map(async (update) => {
        return updateContact(context, update);
      });
      
      const completed = await Promise.allSettled(jobs);
      
      const results = completed.map((job) => {
        if (job.status === "fulfilled") {
          return job.value;
        } else {
          return job.reason;
        }
      });
      
      return { result: results };
    }
  }
});

pack.addFormula({
  name: "CreateContact",
  description: "Create a new contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "emailAddress",
      description: "Email",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phoneNumber",
      description: "Phone",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "organization",
      description: "Company",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([givenName, familyName, emailAddress, phoneNumber, organization], context) {
    const contactData: any = {
      names: [{ givenName, familyName: familyName || "" }]
    };
    
    if (emailAddress) contactData.emailAddresses = [{ value: emailAddress }];
    if (phoneNumber) contactData.phoneNumbers = [{ value: phoneNumber }];
    if (organization) contactData.organizations = [{ name: organization }];
    
    try {
      const response = await context.fetcher.fetch({
        method: "POST",
        url: "https://people.googleapis.com/v1/people:createContact",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });
      
      return extractContactData(response.body);
    } catch (error) {
      throw new coda.UserVisibleError(`Create failed: ${error.message}`);
    }
  }
});

pack.addFormula({
  name: "UpdateContact",
  description: "Update existing contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "givenName",
      description: "First name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "familyName",
      description: "Last name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "emailAddress",
      description: "Email",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "phoneNumber",
      description: "Phone",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([resourceName, givenName, familyName, emailAddress, phoneNumber], context) {
    try {
      // Get current contact first
      const getCurrentResponse = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,emailAddresses,phoneNumbers,etag,metadata`
      });
      
      const currentContact = getCurrentResponse.body;
      const updateMask: string[] = [];
      const updateData: any = {};
      
      if (givenName !== undefined || familyName !== undefined) {
        const currentNames = currentContact.names || [{}];
        const primaryName = currentNames[0] || {};
        
        updateData.names = [{
          ...primaryName,
          givenName: givenName !== undefined ? givenName : primaryName.givenName,
          familyName: familyName !== undefined ? familyName : primaryName.familyName
        }];
        updateMask.push("names");
      }
      
      if (emailAddress !== undefined) {
        updateData.emailAddresses = emailAddress ? [{ value: emailAddress }] : [];
        updateMask.push("emailAddresses");
      }
      
      if (phoneNumber !== undefined) {
        updateData.phoneNumbers = phoneNumber ? [{ value: phoneNumber }] : [];
        updateMask.push("phoneNumbers");
      }
      
      const response = await context.fetcher.fetch({
        method: "PATCH",
        url: `https://people.googleapis.com/v1/${resourceName}:updateContact?updatePersonFields=${updateMask.join(",")}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updateData, etag: currentContact.etag })
      });
      
      return extractContactData(response.body);
    } catch (error) {
      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Contact not found: ${resourceName}`);
      }
      throw new coda.UserVisibleError(`Update failed: ${error.message}`);
    }
  }
});

pack.addFormula({
  name: "DeleteContact",
  description: "Delete a contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([resourceName], context) {
    try {
      await context.fetcher.fetch({
        method: "DELETE",
        url: `https://people.googleapis.com/v1/${resourceName}:deleteContact`
      });
      
      return `Contact deleted: ${resourceName}`;
    } catch (error) {
      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Contact not found: ${resourceName}`);
      }
      throw new coda.UserVisibleError(`Delete failed: ${error.message}`);
    }
  }
});

pack.addFormula({
  name: "CopyOtherContactToContacts",
  description: "Convert an 'other contact' to regular contact",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "otherContactResourceName",
      description: "Other contact resource name"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  isAction: true,
  execute: async function ([otherContactResourceName], context) {
    try {
      const response = await context.fetcher.fetch({
        method: "POST",
        url: `https://people.googleapis.com/v1/${otherContactResourceName}:copyOtherContactToMyContactsGroup`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          copyMask: "names,emailAddresses,phoneNumbers" // Photos not allowed
        })
      });
      
      return extractContactData(response.body);
    } catch (error) {
      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Other contact not found: ${otherContactResourceName}`);
      }
      throw new coda.UserVisibleError(`Copy failed: ${error.message}`);
    }
  }
});

// This piece just explains why you can't delete other contacts (again... Google doing Google things)
pack.addFormula({
  name: "ExplainOtherContactDeletion",
  description: "Why you can't delete other contacts",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "otherContactResourceName",
      description: "Other contact resource name"
    })
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([otherContactResourceName], context) {
    return `Other contacts can't be deleted through the API. They're auto-managed by Gmail based on your email interactions. 

To remove an 'Other contact':
1. Stop emailing them (they'll disappear eventually)
2. Gmail cleans them up automatically over time
3. Filter your Coda table to hide ones you've already processed

For now, just filter out the ones you don't need in your Coda views.`;
  }
});

pack.addFormula({
  name: "SearchContacts",
  description: "Search contacts by name or email",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "query",
      description: "Search query"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "limit",
      description: "Max results",
      optional: true
    })
  ],
  resultType: coda.ValueType.Array,
  items: ContactSchema,
  execute: async function ([query, limit], context) {
    const maxResults = limit || 25;
    try {
      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/people:searchContacts?query=${encodeURIComponent(query)}&pageSize=${maxResults}&readMask=names,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata`
      });
      
      const results = response.body.results || [];
      return results.map((result: any) => extractContactData(result.person));
    } catch (error) {
      throw new coda.UserVisibleError(`Search failed: ${error.message}`);
    }
  }
});

pack.addFormula({
  name: "GetContact",
  description: "Get contact details",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "resourceName",
      description: "Contact resource name"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  execute: async function ([resourceName], context) {
    try {
      const response = await context.fetcher.fetch({
        method: "GET",
        url: `https://people.googleapis.com/v1/${resourceName}?personFields=names,emailAddresses,phoneNumbers,organizations,addresses,memberships,photos,birthdays,metadata`
      });
      
      return extractContactData(response.body);
    } catch (error) {
      if (error.statusCode === 404) {
        throw new coda.UserVisibleError(`Contact not found: ${resourceName}`);
      }
      throw new coda.UserVisibleError(`Failed to get contact: ${error.message}`);
    }
  }
});

pack.addColumnFormat({
  name: "Contact",
  instructions: "Shows Google contact details",
  formulaName: "GetContact",
});
