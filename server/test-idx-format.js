#!/usr/bin/env node

// Test different IDX API endpoint formats
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_IDX_API_KEY;

if (!API_KEY) {
  console.error('❌ VITE_IDX_API_KEY not found');
  process.exit(1);
}

const testEndpoints = [
  {
    name: 'Original format',
    url: `https://api.idxbroker.com/clients/listings`,
    headers: { 'accesskey': API_KEY }
  },
  {
    name: 'PHP endpoint with accesskey header',
    url: `https://api.idxbroker.com/clients.php`,
    headers: { 'accesskey': API_KEY }
  },
  {
    name: 'PHP endpoint with apikey param',
    url: `https://api.idxbroker.com/clients.php?apikey=${API_KEY}`,
    headers: {}
  },
  {
    name: 'PHP endpoint with API_KEY param',
    url: `https://api.idxbroker.com/clients.php?API_KEY=${API_KEY}`,
    headers: {}
  },
  {
    name: 'HTTPS with accesskey header',
    url: `https://api.idxbroker.com/clients.php`,
    headers: { 'accesskey': API_KEY }
  },
  {
    name: 'HTTP with accesskey header',
    url: `http://api.idxbroker.com/clients.php`,
    headers: { 'accesskey': API_KEY }
  }
];

console.log('🔍 Testing different IDX API endpoint formats...\n');

testEndpoints.forEach(async (endpoint, index) => {
  try {
    console.log(`\n${index + 1}. Testing: ${endpoint.name}`);
    console.log(`   URL: ${endpoint.url}`);
    
    const response = await fetch(endpoint.url, {
      method: 'GET',
      headers: endpoint.headers
    });
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    const contentType = response.headers.get('content-type');
    console.log(`   Content-Type: ${contentType}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ SUCCESS! Found ${data.length || 0} items`);
    } else {
      const errorText = await response.text();
      console.log(`   ❌ ERROR: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log(`   ❌ EXCEPTION: ${error.message}`);
  }
});

// Also test a simple curl equivalent
console.log('\n\n🔍 Testing with direct fetch...\n');

const apiKey = API_KEY;
const testUrl = `https://api.idxbroker.com/clients.php?apikey=${apiKey}&idxID=*`;

console.log(`Trying: ${testUrl}\n`);

fetch(testUrl, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
.then(async response => {
  console.log(`Status: ${response.status}`);
  console.log(`Content-Type: ${response.headers.get('content-type')}`);
  
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}...`);
})
.catch(error => {
  console.error('Error:', error);
});
