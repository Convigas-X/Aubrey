import type { Property } from '@/data/properties';

interface IdxApiResponse {
  data?: any[];
  error?: string;
}

export class IdxApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_IDX_API_KEY || '';
    this.baseUrl = import.meta.env.VITE_IDX_API_BASE_URL || 'https://api.idxbroker.com';
    
    if (!this.apiKey) {
      console.warn('⚠️ IDX API key not found. Using mock data.');
    }
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<IdxApiResponse> {
    try {
      if (!this.apiKey) {
        console.warn('❌ API key not configured');
        return { error: 'API key not configured' };
      }

      // Use the proxy server for all requests (avoids CORS and handles authentication)
      const proxyUrl = import.meta.env.VITE_PROXY_URL || 'http://localhost:3001';
      
      // Map requests to the correct IDX endpoints
      let mappedEndpoint;
      if (endpoint === '/clients/listings') {
        // Map to /clients/featured for agent's featured listings
        // NOTE: IDX Broker API ONLY returns listings belonging to agents on the account
        mappedEndpoint = '/clients/featured';
      } else {
        mappedEndpoint = endpoint;
      }
      
      // Build URL with query parameters
      const queryParams = new URLSearchParams(params);
      const url = `${proxyUrl}/api/idx${mappedEndpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      console.log(`📡 Fetching via proxy: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(`📊 Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error(`IDX API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Received ${data?.length || 0} items`);
      return { data };
    } catch (error) {
      console.error('❌ IDX API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private transformIdxProperty(idxProperty: any): Property {
    // Transform IDX property data to match our Property interface
    // IDX API returns different field names than our mock data
    
    let price = '$0';
    if (idxProperty.listingPrice || idxProperty.price) {
      const priceValue = idxProperty.listingPrice || idxProperty.price;
      const priceNum = parseInt(String(priceValue).replace(/[^0-9]/g, ''));
      price = `$${priceNum.toLocaleString()}`;
    }

    const addressParts = [
      idxProperty.address || idxProperty.unparsedAddress,
      idxProperty.cityName || idxProperty.city,
      idxProperty.state,
      idxProperty.zipcode || idxProperty.postalCode
    ].filter(Boolean);
    
    const address = addressParts.join(', ');

    return {
      id: String(idxProperty.id || idxProperty.listingID || idxProperty.listingNumber || Math.random()),
      name: idxProperty.listingText || idxProperty.title || idxProperty.address || 'Beautiful Property',
      address: address || 'Address not available',
      price: price,
      beds: parseInt(String(idxProperty.bedrooms || idxProperty.bedsTotal || idxProperty.bed || 0)) || 0,
      baths: parseInt(String(idxProperty.bathrooms || idxProperty.bathsTotal || idxProperty.bath || 0)) || 0,
      sqft: parseInt(String(idxProperty.squareFeet || idxProperty.livingArea || idxProperty.sqft || 0)) || 0,
      image: idxProperty.image?.[0]?.url || 
             idxProperty.images?.[0] || 
             idxProperty.photos?.[0]?.url ||
             idxProperty.primaryPhoto?.url ||
             'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
      status: (idxProperty.status === 'Active' || !idxProperty.status) ? 'For Sale' : 'Sold'
    };
  }

  async getActiveListings(): Promise<Property[]> {
    try {
      // IMPORTANT: IDX Broker API only returns agent/featured listings
      // NOT full MLS data. If you need full MLS listings, you need:
      // 1. Spark API access (different product)
      // 2. Direct MLS feed agreement
      // 3. Third-party service like SimplyRETS or RealtyFeed
      
      console.log('🎯 Attempting to fetch featured listings from IDX Broker');
      console.log('ℹ️  Note: IDX API only returns agent/listing office featured listings, not full MLS data');
      
      // Try the correct endpoint for featured listings
      const response = await this.makeRequest('/clients/featured');
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        console.log('✅ Successfully loaded', response.data.length, 'featured listings');
        return response.data.map((item: any) => this.transformIdxProperty(item));
      }

      // If no data, log helpful message
      console.warn('⚠️ IDX API returned no featured listings');
      console.warn('ℹ️  This could mean:');
      console.warn('  1) Your IDX account has no featured/active listings');
      console.warn('  2) You need Spark API or alternative for full MLS data');
      console.warn('  3) Check IDX Broker control panel for listing status');
      
    } catch (error) {
      console.error('❌ Failed to fetch from IDX API:', error);
    }

    // Fallback to mock data (app always works)
    console.log('📚 Loading mock data as fallback...');
    return this.getMockProperties();
  }

  private getMockProperties(): Property[] {
    const mockData: Property[] = [
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
      {
        id: '2',
        name: 'Modern Downtown Penthouse',
        address: '456 City Center Ave, Orlando, FL 32801',
        price: '$1,250,000',
        beds: 3,
        baths: 3,
        sqft: 3200,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
        status: 'For Sale' as const,
      },
      {
        id: '3',
        name: 'Winter Park Charmer',
        address: '789 Park Ave, Winter Park, FL 32789',
        price: '$875,000',
        beds: 4,
        baths: 3,
        sqft: 2800,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
        status: 'For Sale' as const,
      },
      {
        id: '4',
        name: 'Lake Nona Smart Home',
        address: '321 Innovation Way, Orlando, FL 32827',
        price: '$985,000',
        beds: 5,
        baths: 4,
        sqft: 4100,
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
        status: 'For Sale' as const,
      },
    ];

    console.log('✅ Loaded', mockData.length, 'mock properties as fallback');
    return mockData;
  }
}

export const idxApi = new IdxApiService();
