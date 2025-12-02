const BASE_URL = 'http://localhost:3000/api';

async function verify() {
  console.log('Starting Verification...');

  // 1. Register
  console.log('\n1. Testing Register...');
  const uniqueId = Date.now();
  const newUser = {
    name: `Test User ${uniqueId}`,
    nim: `NIM${uniqueId}`,
    email: `test${uniqueId}@example.com`,
    password: 'password123',
  };

  let res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  let data = await res.json();
  console.log('Register Status:', res.status);
  console.log('Register Response:', data);

  if (res.status !== 201) {
    console.error('Registration failed, aborting.');
    return;
  }
  const userId = data.user.id;

  // 2. Login
  console.log('\n2. Testing Login...');
  res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: newUser.email, password: newUser.password }),
  });
  data = await res.json();
  console.log('Login Status:', res.status);
  console.log('Login Response:', data);

  // 3. List Users
  console.log('\n3. Testing List Users...');
  res = await fetch(`${BASE_URL}/users`);
  data = await res.json();
  console.log('List Users Status:', res.status);
  console.log('List Users Count:', data.length);

  // 4. Get User Detail
  console.log(`\n4. Testing Get User Detail (ID: ${userId})...`);
  res = await fetch(`${BASE_URL}/users/${userId}`);
  data = await res.json();
  console.log('Get User Status:', res.status);
  console.log('Get User Response:', data);

  // 5. Update User
  console.log(`\n5. Testing Update User (ID: ${userId})...`);
  const updatedData = {
    name: `Updated Name ${uniqueId}`,
    nim: `UPD${uniqueId}`,
    email: `updated${uniqueId}@example.com`,
  };
  res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  data = await res.json();
  console.log('Update User Status:', res.status);
  console.log('Update User Response:', data);

  // 6. Delete User
  console.log(`\n6. Testing Delete User (ID: ${userId})...`);
  res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  data = await res.json();
  console.log('Delete User Status:', res.status);
  console.log('Delete User Response:', data);

  // Verify Deletion
  res = await fetch(`${BASE_URL}/users/${userId}`);
  console.log('Get Deleted User Status (should be 404):', res.status);
}

verify().catch(console.error);
