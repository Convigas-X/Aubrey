import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow requests from your domains
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://realestate36.realtor',
  'https://www.realestate36.realtor',
  'https://realestate360.realtor',
  'https://www.realestate360.realtor',
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// IDX API proxy endpoint
app.get('/api/idx/*', async (req, res) => {
  try {
    const apiKey = process.env.VITE_IDX_API_KEY;
    
    if (!apiKey) {
      console.error('❌ API key not configured in environment');
      return res.status(500).json({ error: 'IDX API key not configured' });
    }

    // Extract the actual IDX endpoint from the request
    const idxEndpoint = req.params[0];
    const queryParams = new URLSearchParams(req.query).toString();
    
    // CORRECT IDX BROKER API FORMAT
    // Based on official documentation: https://developers.idxbroker.com/
    // Base URL: https://api.idxbroker.com/
    // Headers:
    //   - Content-Type: application/x-www-form-urlencoded (required)
    //   - accesskey: YOUR_KEY (required)
    //   - outputtype: json (optional)
    
    // Build the correct URL
    // IDX uses paths like /clients/featured or /clients/listcomponents
    let correctEndpoint;
    
    if (idxEndpoint === 'clients/listings') {
      // For property listings, use /clients/featured (agent's featured listings)
      // NOTE: IDX Broker API ONLY returns listings belonging to agents on the account
      // It does NOT return full MLS data
      correctEndpoint = '/clients/featured';
    } else if (idxEndpoint === 'properties') {
      // Alternative endpoint for properties
      correctEndpoint = '/clients/featured';
    } else {
      // Use the endpoint as provided
      correctEndpoint = '/' + idxEndpoint;
    }
    
    // Add query parameters if any
    const urlWithParams = correctEndpoint + (queryParams ? '?' + queryParams : '');
    const idxUrl = `https://api.idxbroker.com${urlWithParams}`;
    
    console.log(`📡 Proxying request to: ${idxUrl}`);
    console.log(`🔑 Using API key: ${apiKey.substring(0, 10)}...`);

    const response = await fetch(idxUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // REQUIRED by IDX API
        'accesskey': apiKey, // REQUIRED - API key
        'outputtype': 'json', // Optional but recommended
      },
    });

    console.log(`📊 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ IDX API error response:', errorBody);
      throw new Error(`IDX API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    console.log(`✅ Successfully fetched ${data?.length || Object.keys(data || {}).length} items`);
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from IDX API',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test endpoint to verify API key works
app.get('/test-idx', async (req, res) => {
  try {
    const apiKey = process.env.VITE_IDX_API_KEY;
    
    console.log('🧪 Testing IDX API connection...');
    
    // Test with the correct endpoint
    const response = await fetch('https://api.idxbroker.com/clients/featured', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': apiKey,
        'outputtype': 'json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Test failed:', response.status, errorText);
      return res.status(response.status).json({ 
        success: false, 
        error: errorText,
        message: 'IDX API returned error. This could mean:' +
          ' 1) API key is invalid, ' +
          ' 2) Account has no featured listings, ' +
          ' 3) API access is not enabled on the account.'
      });
    }

    const data = await response.json();
    console.log(`✅ Test successful! Found ${data?.length || 0} listings`);
    
    res.json({ 
      success: true, 
      data: data, 
      count: data?.length || 0,
      message: data?.length > 0 ? 
        `Successfully connected! Found ${data.length} featured listings.` :
        'Connected successfully, but account has no featured listings. Mock data will be used.'
    });
  } catch (error) {
    console.error('❌ Test error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      message: 'Failed to connect to IDX API. Check API key and network connection.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 IDX Proxy Server running on http://localhost:${PORT}`);
  console.log(`📍 Proxy endpoint: http://localhost:${PORT}/api/idx/*`);
  console.log(`🩺 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test-idx`);
  console.log(`\n💡 IMPORTANT: IDX Broker API only returns agent/listing office featured listings.`);
  console.log(`   It does NOT provide full MLS data. If you need full MLS listings,`);
  console.log(`   contact IDX Broker about their Spark API or other solutions.`);
});
