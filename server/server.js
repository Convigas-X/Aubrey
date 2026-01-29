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

// ==========================================
// SPARK API PROXY (NEW - Full MLS Access)
// ==========================================
app.get('/api/spark/*', async (req, res) => {
  try {
    const sparkKey = process.env.VITE_SPARK_API_KEY || process.env.SPARK_API_KEY;
    
    if (!sparkKey) {
      console.error('❌ Spark API key not configured');
      return res.status(500).json({ error: 'Spark API key not configured' });
    }

    const sparkEndpoint = req.params[0];
    const queryParams = new URLSearchParams(req.query).toString();
    const urlWithParams = '/' + sparkEndpoint + (queryParams ? '?' + queryParams : '');
    const sparkUrl = `https://sparkapi.com/v1${urlWithParams}`;
    
    console.log(`\n🎮 SPARK API PROXY`);
    console.log(`📡 URL: ${sparkUrl}`);
    console.log(`🔑 Key: ${sparkKey.substring(0, 15)}...`);

    const response = await fetch(sparkUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sparkKey}`,
        'X-SparkApi-User-Agent': 'RealEstate360/1.0',
        'Content-Type': 'application/json',
      },
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ Spark API error:', errorBody);
      throw new Error(`Spark API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    const resultCount = data.D?.Results?.length || 0;
    console.log(`✅ Spark Success! ${resultCount} listings found`);
    res.json(data);
  } catch (error) {
    console.error('❌ Spark Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Spark API',
      details: error.message 
    });
  }
});

// Spark API Test Endpoint
app.get('/test-spark', async (req, res) => {
  try {
    const sparkKey = process.env.VITE_SPARK_API_KEY || process.env.SPARK_API_KEY;
    
    console.log('🧪 Testing Spark API connection...');
    console.log(`🔑 Using key: ${sparkKey ? sparkKey.substring(0, 15) + '...' : 'NOT SET'}`);
    
    const response = await fetch('https://sparkapi.com/v1/listings', {
      headers: {
        'Authorization': `Bearer ${sparkKey}`,
        'X-SparkApi-User-Agent': 'RealEstate360/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Spark test failed:', response.status, errorText);
      return res.status(response.status).json({ 
        success: false, 
        error: errorText,
        message: 'Spark API error. Check if token is valid.'
      });
    }

    const data = await response.json();
    const count = data.D?.Results?.length || 0;
    console.log(`✅ Spark test successful! ${count} listings`);
    
    res.json({ 
      success: true, 
      data: data, 
      count: count,
      isDemo: sparkKey === '5uqf0yuds7gx11j942363fss1',
      message: count > 0 ? 
        `Connected! Found ${count} listings.` :
        'Connected but no listings returned.'
    });
  } catch (error) {
    console.error('❌ Spark test error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

// ==========================================
// IDX BROKER API PROXY (Legacy)
// ==========================================
app.get('/api/idx/*', async (req, res) => {
  try {
    const apiKey = process.env.VITE_IDX_API_KEY;
    
    if (!apiKey) {
      console.error('❌ IDX API key not configured');
      return res.status(500).json({ error: 'IDX API key not configured' });
    }

    const idxEndpoint = req.params[0];
    const queryParams = new URLSearchParams(req.query).toString();
    
    let correctEndpoint;
    if (idxEndpoint === 'clients/listings') {
      correctEndpoint = '/clients/featured';
    } else if (idxEndpoint === 'properties') {
      correctEndpoint = '/clients/featured';
    } else {
      correctEndpoint = '/' + idxEndpoint;
    }
    
    const urlWithParams = correctEndpoint + (queryParams ? '?' + queryParams : '');
    const idxUrl = `https://api.idxbroker.com${urlWithParams}`;
    
    console.log(`\n📍 IDX PROXY: ${idxUrl}`);

    const response = await fetch(idxUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': apiKey,
        'outputtype': 'json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`IDX API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    console.log(`✅ IDX Success! ${data?.length || 0} items`);
    res.json(data);
  } catch (error) {
    console.error('❌ IDX Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from IDX API',
      details: error.message 
    });
  }
});

// ==========================================
// HEALTH & INFO ENDPOINTS
// ==========================================
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      spark: process.env.VITE_SPARK_API_KEY ? 'configured' : 'not configured',
      idx: process.env.VITE_IDX_API_KEY ? 'configured' : 'not configured'
    }
  });
});

// Root endpoint with API info
app.get('/', (req, res) => {
  res.json({
    name: 'Real Estate 360 API Proxy',
    version: '1.0.0',
    endpoints: {
      spark: '/api/spark/* - Spark API (Full MLS)',
      idx: '/api/idx/* - IDX Broker (Agent listings)',
      testSpark: '/test-spark - Test Spark connection',
      health: '/health - Server health check'
    },
    domains: allowedOrigins
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Real Estate 360 Proxy Server`);
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`\n📡 Available Endpoints:`);
  console.log(`   • Spark API:  http://localhost:${PORT}/api/spark/*`);
  console.log(`   • IDX Broker: http://localhost:${PORT}/api/idx/*`);
  console.log(`   • Test Spark: http://localhost:${PORT}/test-spark`);
  console.log(`   • Health:     http://localhost:${PORT}/health`);
  console.log(`\n💡 Using Spark Demo Token? Test with: curl http://localhost:${PORT}/test-spark`);
});
