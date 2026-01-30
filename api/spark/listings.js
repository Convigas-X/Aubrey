// Vercel Serverless Function for Spark API - Listings endpoint
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sparkKey = process.env.VITE_SPARK_API_KEY || process.env.SPARK_API_KEY;
    
    if (!sparkKey) {
      console.error('❌ Spark API key not configured');
      return res.status(500).json({ error: 'Spark API key not configured' });
    }

    // Build query params
    const queryParams = new URLSearchParams();
    if (req.query.city) queryParams.append('city', req.query.city);
    if (req.query.minPrice) queryParams.append('minPrice', req.query.minPrice);
    if (req.query.maxPrice) queryParams.append('maxPrice', req.query.maxPrice);
    if (req.query.bedrooms) queryParams.append('bedrooms', req.query.bedrooms);
    
    const queryString = queryParams.toString();
    const sparkUrl = `https://sparkapi.com/v1/listings${queryString ? '?' + queryString : ''}`;
    
    console.log(`📡 Spark API Proxy: ${sparkUrl}`);

    const response = await fetch(sparkUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sparkKey}`,
        'X-SparkApi-User-Agent': 'RealEstate360/1.0',
        'Content-Type': 'application/json',
      },
    });

    console.log(`📊 Spark Status: ${response.status}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ Spark API error:', errorBody);
      return res.status(response.status).json({ 
        error: 'Spark API error',
        details: errorBody 
      });
    }

    const data = await response.json();
    const resultCount = data.D?.Results?.length || 0;
    console.log(`✅ Spark Success! ${resultCount} listings found`);
    
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Spark Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Spark API',
      details: error.message 
    });
  }
}
