// Vercel Serverless Function - Test Spark API connection
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const sparkKey = process.env.VITE_SPARK_API_KEY || process.env.SPARK_API_KEY;
    
    console.log('🧪 Testing Spark API connection...');
    
    const response = await fetch('https://sparkapi.com/v1/listings', {
      headers: {
        'Authorization': `Bearer ${sparkKey}`,
        'X-SparkApi-User-Agent': 'RealEstate360/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        success: false, 
        error: errorText,
        message: 'Spark API error. Check if token is valid.'
      });
    }

    const data = await response.json();
    const count = data.D?.Results?.length || 0;
    
    res.json({ 
      success: true, 
      count: count,
      isDemo: sparkKey === '5uqf0yuds7gx11j942363fss1',
      message: count > 0 ? `Connected! Found ${count} listings.` : 'Connected but no listings returned.'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
}
