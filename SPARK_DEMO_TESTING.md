# Spark API Demo Testing Guide

## 🎮 Demo Access Token

```
Demo Token: 5uqf0yuds7gx11j942363fss1
```

**Use this token to test the Spark API before getting live MLS access.**

---

## ✅ What You Can Do With Demo Token

- ✅ Test API endpoints
- ✅ Understand response structure
- ✅ Build frontend components
- ✅ Test search functionality
- ✅ **NO CHARGES** - Free to use

## ❌ Demo Limitations

- ❌ Only returns **example/mock data**
- ❌ Does **NOT** show real MLS fields
- ❌ Data structure may differ from your MLS
- ❌ Cannot search real listings

---

## 🔧 Setup Demo Token

### 1. Update Frontend .env
```env
# Spark API Demo Configuration
VITE_SPARK_API_KEY=5uqf0yuds7gx11j942363fss1
VITE_SPARK_API_URL=https://sparkapi.com/v1
VITE_USE_DEMO_DATA=true
```

### 2. Update Backend .env (server/.env)
```env
# Spark Demo Token
SPARK_API_KEY=5uqf0yuds7gx11j942363fss1
SPARK_API_URL=https://sparkapi.com/v1
NODE_ENV=development
```

---

## 📡 Test API Calls

### Using cURL

#### Test 1: Get All Listings
```bash
curl -X GET "https://sparkapi.com/v1/listings" \
  -H "Authorization: Bearer 5uqf0yuds7gx11j942363fss1" \
  -H "X-SparkApi-User-Agent: RealEstate360/1.0"
```

#### Test 2: Search Listings
```bash
curl -X GET "https://sparkapi.com/v1/listings?city=Orlando&minPrice=500000" \
  -H "Authorization: Bearer 5uqf0yuds7gx11j942363fss1" \
  -H "X-SparkApi-User-Agent: RealEstate360/1.0"
```

#### Test 3: Get Single Listing
```bash
curl -X GET "https://sparkapi.com/v1/listings/12345" \
  -H "Authorization: Bearer 5uqf0yuds7gx11j942363fss1" \
  -H "X-SparkApi-User-Agent: RealEstate360/1.0"
```

---

## 💻 Create Demo Spark Service

Create new file: `src/services/sparkApi.ts`

```typescript
import type { Property } from '@/data/properties';

const SPARK_API_URL = import.meta.env.VITE_SPARK_API_URL || 'https://sparkapi.com/v1';
const SPARK_API_KEY = import.meta.env.VITE_SPARK_API_KEY || '';
const USE_DEMO = import.meta.env.VITE_USE_DEMO_DATA === 'true';

export class SparkApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = SPARK_API_KEY;
    this.baseUrl = SPARK_API_URL;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    try {
      if (!this.apiKey) {
        console.warn('⚠️ Spark API key not configured');
        return { error: 'API key not configured' };
      }

      const queryParams = new URLSearchParams(params).toString();
      const url = `${this.baseUrl}${endpoint}${queryParams ? '?' + queryParams : ''}`;
      
      console.log(`📡 Spark API: ${url}`);
      if (USE_DEMO) console.log('🎮 Using DEMO token');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-SparkApi-User-Agent': 'RealEstate360/1.0',
          'Content-Type': 'application/json',
        },
      });

      console.log(`📊 Response: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Spark API error:', errorText);
        throw new Error(`Spark API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Spark API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private transformSparkListing(listing: any): Property {
    const fields = listing.StandardFields || {};
    
    return {
      id: String(listing.Id || listing.ListingKey || Math.random()),
      name: fields.UnparsedAddress || fields.StreetName || 'Beautiful Property',
      address: `${fields.UnparsedAddress || ''}, ${fields.City || ''}, ${fields.StateOrProvince || ''} ${fields.PostalCode || ''}`.replace(/^,\s*/, ''),
      price: fields.ListPrice ? `$${fields.ListPrice.toLocaleString()}` : '$0',
      beds: fields.BedsTotal || fields.BedroomsTotal || 0,
      baths: fields.BathsTotal || fields.BathroomsTotal || 0,
      sqft: fields.BuildingAreaTotal || fields.LivingArea || 0,
      image: fields.Photos?.[0]?.Uri || 
              fields.Photos?.[0]?.Url || 
              'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
      status: fields.MlsStatus === 'Active' ? 'For Sale' : 'Sold'
    };
  }

  async getListings(filters?: {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
  }): Promise<Property[]> {
    try {
      const params: Record<string, string> = {};
      
      if (filters?.city) params['city'] = filters.city;
      if (filters?.minPrice) params['minPrice'] = filters.minPrice;
      if (filters?.maxPrice) params['maxPrice'] = filters.maxPrice;
      if (filters?.beds) params['bedrooms'] = filters.beds;

      const response = await this.makeRequest('/listings', params);
      
      if (response.error) {
        console.warn('⚠️ Using mock data due to API error');
        return this.getMockProperties();
      }

      // Spark API returns data in D.Results structure
      const listings = response.D?.Results || [];
      console.log(`✅ Found ${listings.length} listings`);
      
      return listings.map((listing: any) => this.transformSparkListing(listing));
    } catch (error) {
      console.error('❌ Failed to fetch listings:', error);
      return this.getMockProperties();
    }
  }

  async getListingById(id: string): Promise<Property | null> {
    try {
      const response = await this.makeRequest(`/listings/${id}`);
      
      if (response.error || !response.D?.Results?.[0]) {
        return null;
      }

      return this.transformSparkListing(response.D.Results[0]);
    } catch (error) {
      console.error('❌ Failed to fetch listing:', error);
      return null;
    }
  }

  private getMockProperties(): Property[] {
    // Return your existing mock data
    return [
      {
        id: '1',
        name: 'Luxury Lakefront Estate',
        address: '1234 Lakeshore Dr, Windermere, FL 34786',
        price: '$2,850,000',
        beds: 6,
        baths: 5,
        sqft: 7200,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
        status: 'For Sale' as const,
      },
      // ... add more mock properties
    ];
  }
}

export const sparkApi = new SparkApiService();
```

---

## 🧪 Quick Test Script

Create `test-spark.html` for browser testing:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Spark API Test</title>
</head>
<body>
  <h1>Spark API Demo Test</h1>
  <button onclick="testApi()">Test API</button>
  <pre id="result"></pre>

  <script>
    const DEMO_TOKEN = '5uqf0yuds7gx11j942363fss1';
    
    async function testApi() {
      const result = document.getElementById('result');
      result.textContent = 'Loading...';
      
      try {
        const response = await fetch('https://sparkapi.com/v1/listings', {
          headers: {
            'Authorization': `Bearer ${DEMO_TOKEN}`,
            'X-SparkApi-User-Agent': 'Test/1.0'
          }
        });
        
        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        result.textContent = 'Error: ' + error.message;
      }
    }
  </script>
</body>
</html>
```

---

## 📊 Expected Demo Response Structure

```json
{
  "D": {
    "Success": true,
    "Results": [
      {
        "Id": "20100000000000000000000000",
        "ResourceUri": "/v1/listings/20100000000000000000000000",
        "StandardFields": {
          "ListingKey": "20100000000000000000000000",
          "ListPrice": 850000,
          "UnparsedAddress": "123 Main St",
          "City": "Orlando",
          "StateOrProvince": "FL",
          "PostalCode": "32801",
          "BedsTotal": 4,
          "BathsTotal": 3,
          "BuildingAreaTotal": 3200,
          "MlsStatus": "Active",
          "Photos": [
            {
              "Uri": "https://example.com/photo1.jpg"
            }
          ]
        }
      }
    ]
  }
}
```

---

## 🔑 Key Differences from Live Data

| Aspect | Demo Data | Live Data |
|--------|-----------|-----------|
| **Photos** | Placeholder URLs | Real listing photos |
| **Addresses** | Fake/example | Real addresses |
| **Prices** | Random values | Actual prices |
| **Fields** | Standard set | MLS-specific fields |
| **Search** | Limited filters | Full filter support |

---

## ✅ Testing Checklist

- [ ] API connection works
- [ ] Listings endpoint returns data
- [ ] Search filters work
- [ ] Data transforms correctly
- [ ] Error handling works
- [ ] Frontend displays properly
- [ ] Loading states work
- [ ] Fallback to mock data works

---

## 🚀 Next Steps After Testing

1. **Test with demo token** ✅
2. **Build frontend components**
3. **Apply for live MLS access**
4. **Replace demo token with live token**
5. **Deploy to production**

---

## 💡 Pro Tips

1. **Build everything with demo token first** - No charges while testing
2. **Handle both structures** - Demo and live may differ slightly
3. **Always have fallback** - Mock data for API failures
4. **Test error states** - Network failures, invalid tokens
5. **Cache responses** - Reduce API calls

---

## 🐛 Common Issues

### "401 Unauthorized"
```
Solution: Check token is correct and header format is:
Authorization: Bearer 5uqf0yuds7gx11j942363fss1
```

### "No listings found"
```
Solution: Demo has limited data. Try without filters first.
```

### CORS errors
```
Solution: Use backend proxy. Demo token still needs proper CORS setup.
```

---

## 📞 Support

- **Demo Issues:** api-support@fbsdata.com
- **Token Questions:** Include token in email
- **Documentation:** https://sparkplatform.com/docs

---

## 🎯 Summary

| | Demo Token | Live Token |
|---|---|---|
| **Cost** | FREE | $50/mo |
| **Data** | Example only | Real MLS |
| **Testing** | ✅ Perfect | ❌ Wait for approval |
| **Duration** | Unlimited | Ongoing |

**Use demo token NOW to build your app, then switch to live token later!** 🚀
