import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  executeFormulaFromPackDef, executeSyncFormulaFromPackDefSingleIteration,
  executeUpdateFormulaFromPackDef, newMockSyncExecutionContext, newJsonFetchResponse,
} from '@codahq/packs-sdk/dist/development';
import {pack} from '../pack';

// SDK helpers return schema-normalized (PascalCase) result keys.
const options = {};
const person = (id: string, extra = {}) => ({
  resourceName: `people/${id}`, etag: `etag-${id}`,
  names: [{givenName: id, familyName: 'Example', displayName: `${id} Example`}],
  metadata: {sources: [{type: 'CONTACT'}]}, ...extra,
});
const apiError = (statusCode: number) => Object.assign(new Error(`People API ${statusCode}`), {statusCode});

// A strict request queue: no credentials, real fetcher, or network fallback.
function mockApi(steps: {method: string; path: string; body?: any; error?: Error; check?: (request: any, url: URL) => void}[]) {
  const context = newMockSyncExecutionContext();
  const remaining = [...steps];
  const unexpected: string[] = [];
  context.fetcher.fetch.callsFake(async request => {
    const step = remaining.shift();
    const url = new URL(request.url);
    try {
      assert.ok(step, `Unexpected request: ${request.method} ${request.url}`);
      assert.equal(url.origin, 'https://people.googleapis.com');
      assert.equal(request.method, step.method);
      assert.equal(url.pathname, step.path);
      step.check?.(request, url);
    } catch (error) {
      unexpected.push(String(error));
      throw error;
    }
    if (step.error) throw step.error;
    return newJsonFetchResponse(step.body ?? {});
  });
  return {context, done() { assert.deepEqual(unexpected, []); assert.equal(remaining.length, 0, 'Unconsumed API requests'); }};
}
const sync = (context: any, params: any[]) =>
  executeSyncFormulaFromPackDefSingleIteration(pack, 'Contacts', params, context, options);
const formula = (context: any, name: string, params: any[]) =>
  executeFormulaFromPackDef(pack, name, params, context, options);

test('regular sync follows pages, skips deleted rows, and filters group membership', async () => {
  const member = (id: string) => person(id, {memberships: [{contactGroupMembership: {contactGroupResourceName: 'contactGroups/team'}}]});
  const api = mockApi([
    {method: 'GET', path: '/v1/people/me/connections', body: {connections: [person('deleted', {metadata: {deleted: true}}), person('outside'), member('first')], nextPageToken: 'second'}, check: (_, url) => assert.equal(url.searchParams.has('pageToken'), false)},
    {method: 'GET', path: '/v1/people/me/connections', body: {connections: [member('last')]}, check: (_, url) => assert.equal(url.searchParams.get('pageToken'), 'second')},
  ]);
  const result = await sync(api.context, ['CONTACT', 'contactGroups/team', 10]);
  assert.deepEqual(result.result.map(row => row.ResourceName), ['people/first', 'people/last']);
  assert.equal(result.continuation, undefined);
  api.done();
});

test('other contacts paginate and stop at the shared result limit', async () => {
  const other = (id: string) => person(id, {resourceName: `otherContacts/${id}`});
  const api = mockApi([
    {method: 'GET', path: '/v1/people/me/connections', body: {connections: [person('regular')]}},
    {method: 'GET', path: '/v1/otherContacts', body: {otherContacts: [other('one')], nextPageToken: 'next'}, check: (_, url) => assert.equal(url.searchParams.get('pageSize'), '2')},
    {method: 'GET', path: '/v1/otherContacts', body: {otherContacts: [other('two'), other('excess')], nextPageToken: 'unused'}, check: (_, url) => assert.equal(url.searchParams.get('pageToken'), 'next')},
  ]);
  const result = await sync(api.context, ['', '', 3]);
  assert.deepEqual(result.result.map(row => row.ResourceName), ['people/regular', 'otherContacts/one', 'otherContacts/two']);
  assert.deepEqual(result.result.map(row => row.ContactType), ['CONTACT', 'OTHER_CONTACT', 'OTHER_CONTACT']);
  api.done();
});

test('one-contact sync sends a positive page size and stops after one row', async () => {
  const api = mockApi([{method: 'GET', path: '/v1/people/me/connections', body: {connections: [person('one'), person('two')], nextPageToken: 'unused'}, check: (_, url) => assert.equal(url.searchParams.get('pageSize'), '1')}]);
  const result = await sync(api.context, ['CONTACT', '', 1]);
  assert.deepEqual(result.result.map(row => row.ResourceName), ['people/one']);
  api.done();
});

test('sync caps API pages at 1000 for oversized requested limits', async () => {
  const api = mockApi([{method: 'GET', path: '/v1/people/me/connections', body: {}, check: (_, url) => assert.equal(url.searchParams.get('pageSize'), '1000')}]);
  assert.deepEqual((await sync(api.context, ['CONTACT', '', 50000])).result, []);
  api.done();
});

test('a failed later page fails the sync instead of reporting a partial success', async () => {
  const api = mockApi([
    {method: 'GET', path: '/v1/people/me/connections', body: {connections: [person('first')], nextPageToken: 'next'}},
    {method: 'GET', path: '/v1/people/me/connections', error: apiError(503)},
  ]);
  await assert.rejects(sync(api.context, ['CONTACT']), /Failed to sync contacts.*503/);
  api.done();
});

test('UpdateContact fetches an uncached etag and preserves unedited name fields', async () => {
  const api = mockApi([
    {method: 'GET', path: '/v1/people/one', body: person('one'), check: request => assert.equal(request.cacheTtlSecs, 0)},
    {method: 'PATCH', path: '/v1/people/one:updateContact', body: person('one', {etag: 'new-etag'}), check: (request, url) => {
      const body = JSON.parse(request.body);
      assert.equal(body.etag, 'etag-one');
      assert.equal(body.names[0].givenName, 'Changed');
      assert.equal(body.names[0].familyName, 'Example');
      assert.equal(url.searchParams.get('updatePersonFields'), 'names');
      assert.equal(body.emailAddresses, undefined);
    }},
  ]);
  assert.equal((await formula(api.context, 'UpdateContact', ['people/one', 'Changed'])).Etag, 'new-etag');
  api.done();
});

test('UpdateContact surfaces etag conflicts without a blind retry', async () => {
  const api = mockApi([
    {method: 'GET', path: '/v1/people/one', body: person('one')},
    {method: 'PATCH', path: '/v1/people/one:updateContact', error: apiError(409)},
  ]);
  await assert.rejects(formula(api.context, 'UpdateContact', ['people/one', 'Changed']), /modified by another source.*refresh/);
  api.done();
});

test('sync updates preserve result order across successful, conflicting, and deleted contacts', async () => {
  const context = newMockSyncExecutionContext();
  const patches: any[] = [];
  context.fetcher.fetch.callsFake(async request => {
    const url = new URL(request.url);
    assert.equal(url.origin, 'https://people.googleapis.com');
    if (request.method === 'GET') {
      assert.equal(request.cacheTtlSecs, 0);
      if (url.pathname === '/v1/people/deleted') throw apiError(404);
      assert.ok(['/v1/people/good', '/v1/people/conflict'].includes(url.pathname));
      return newJsonFetchResponse({});
    }
    assert.equal(request.method, 'PATCH');
    patches.push(request);
    if (url.pathname === '/v1/people/conflict:updateContact') throw apiError(409);
    assert.equal(url.pathname, '/v1/people/good:updateContact');
    return newJsonFetchResponse(person('good', {etag: 'updated'}));
  });
  const updates = ['good', 'conflict', 'deleted'].map(id => ({
    previousValue: {resourceName: `people/${id}`, etag: `old-${id}`, givenName: id, familyName: 'Example', contactType: 'CONTACT'},
    newValue: {givenName: 'Changed'}, updatedFields: ['givenName'],
  }));
  const result = await executeUpdateFormulaFromPackDef(pack, 'Contacts', [], context, updates);
  assert.equal(result.result[0].finalValue.resourceName, 'people/good');
  assert.equal(result.result[0].finalValue.etag, 'updated');
  assert.match(result.result[1].error.message, /modified by another source/);
  assert.match(result.result[2].error.message, /deleted in Google Contacts/);
  assert.equal(context.fetcher.fetch.callCount, 5);
  assert.equal(patches.length, 2);
  assert.deepEqual(patches.map(request => JSON.parse(request.body).etag).sort(), ['old-conflict', 'old-good']);
});

for (const name of ['BatchAddContactsToGroup', 'BatchRemoveContactsFromGroup']) {
  test(`${name} rejects 501 contacts without an API request`, async () => {
    const api = mockApi([]);
    await assert.rejects(formula(api.context, name, ['contactGroups/team', Array.from({length: 501}, (_, i) => `people/c${i}`).join(',')]), /Maximum 500/);
    api.done();
  });
  test(`${name} accepts exactly 500 contacts with the correct request body`, async () => {
    const ids = Array.from({length: 500}, (_, i) => `people/c${i}`);
    const key = name === 'BatchAddContactsToGroup' ? 'resourceNamesToAdd' : 'resourceNamesToRemove';
    const api = mockApi([{method: 'POST', path: '/v1/contactGroups/team/members:modify', check: request => assert.deepEqual(JSON.parse(request.body), {[key]: ids})}]);
    assert.match(await formula(api.context, name, ['contactGroups/team', ids.join(', ')]), /500 contacts/);
    api.done();
  });
}

test('other contacts remain read-only during sync updates', async () => {
  const api = mockApi([{method: 'GET', path: '/v1/otherContacts/one'}]);
  const result = await executeUpdateFormulaFromPackDef(pack, 'Contacts', [], api.context, [{
    previousValue: {resourceName: 'otherContacts/one', contactType: 'OTHER_CONTACT'},
    newValue: {givenName: 'Changed'}, updatedFields: ['givenName'],
  }]);
  assert.match(result.result[0].error.message, /Can't edit Other contacts/);
  api.done();
});

test('group sync retains list data when one detail request fails', async () => {
  const group = (id: string) => ({resourceName: `contactGroups/${id}`, etag: id, name: id, groupType: 'USER_CONTACT_GROUP', memberCount: 2});
  const api = mockApi([
    {method: 'GET', path: '/v1/contactGroups', body: {contactGroups: [group('one'), group('two')]}},
    {method: 'GET', path: '/v1/contactGroups/one', error: apiError(503)},
    {method: 'GET', path: '/v1/contactGroups/two', body: {...group('two'), memberCount: 3}},
  ]);
  const result = await executeSyncFormulaFromPackDefSingleIteration(pack, 'ContactGroups', [], api.context);
  assert.deepEqual(result.result.map(row => [row.ResourceName, row.MemberCount]), [['contactGroups/one', 2], ['contactGroups/two', 3]]);
  api.done();
});

test('SearchContacts escapes queries and caps the page size', async () => {
  const api = mockApi([{method: 'GET', path: '/v1/people:searchContacts', body: {results: [{person: person('found')}]}, check: (_, url) => {
    assert.equal(url.searchParams.get('query'), 'Ada & Bob');
    assert.equal(url.searchParams.get('pageSize'), '50');
  }}]);
  const result = await formula(api.context, 'SearchContacts', ['Ada & Bob', 1000]);
  assert.equal(result[0].ResourceName, 'people/found');
  api.done();
});
