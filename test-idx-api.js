#!/usr/bin/env node

// Simple test script to verify IDX API connection
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_IDX_API_KEY;

if (!API_KEY) {
  console.error('❌ VITE_IDX_API_KEY not found in .env file');
  process.exit(1);
}

console.log('🔍 Testing IDX API connection...\n');

const test = async () => {
  try {
    console.log('📡 Making request to: https://api.idxbroker.com/clients/listings');
    
    const response = await fetch('https://api.idxbroker.com/clients/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accesskey': API_KEY,
      },
    });

    console.log('📊 Response status:', response.status, response.statusText);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('\n✅ SUCCESS! API is working correctly');
    console.log(`📦 Found ${data.length || 0} listings`);
    
    if (data.length > 0) {
      console.log('\n🏠 First property:', JSON.stringify(data[0], null, 2));
    }

  } catch (error) {
    console.error('\n❌ FAILED:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Verify your API key is correct:', API_KEY.substring(0, 10) + '...');
    console.error('2. Check if your IDX account has active listings');
    console.error('3. Ensure your account has API access enabled');
    console.error('4. Try accessing via curl:');
    console.error(`   curl -H "accesskey: ${API_KEY}" https://api.idxbroker.com/clients/listings`);
    process.exit(1);
  }
};

test();
