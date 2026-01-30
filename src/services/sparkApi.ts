import type { Property } from '@/data/properties';

// Environment detection - production vs development
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') === false;

// Use local proxy in development, Vercel API in production
const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:3001';

// In production on Vercel, use the serverless function
// In development, use the local proxy server
const SPARK_API_URL = isProduction 
  ? '/api/spark'  // Vercel serverless function
  : `${PROXY_URL}/api/spark`;  // Local proxy

const SPARK_API_KEY = import.meta.env.VITE_SPARK_API_KEY || '';
const USE_DEMO = import.meta.env.VITE_USE_DEMO_DATA === 'true' || !SPARK_API_KEY;

export class SparkApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = SPARK_API_KEY;
    this.baseUrl = SPARK_API_URL;
    
    console.log(`🔧 Spark API: Environment=${isProduction ? 'production' : 'development'}`);
    console.log(`🔗 Spark API: Base URL=${this.baseUrl}`);
    
    if (USE_DEMO) {
      console.log('🎮 Spark API: Running in DEMO mode');
    }
    
    if (!this.apiKey) {
      console.warn('⚠️ Spark API: No API key configured');
    }
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

      // Check if using proxy (proxy URL contains /api/spark)
      const isUsingProxy = this.baseUrl.includes('/api/spark');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Only add auth header for direct API calls (not proxy)
      if (!isUsingProxy) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
        headers['X-SparkApi-User-Agent'] = 'RealEstate360/1.0';
        console.log('🔑 Using direct API auth');
      } else {
        console.log('🔄 Using proxy (auth handled server-side)');
      }

      const response = await fetch(url, { method: 'GET', headers });

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
    
    // Format price
    let price = '$0';
    if (fields.ListPrice) {
      price = `$${fields.ListPrice.toLocaleString()}`;
    }

    // Build address
    const addressParts = [
      fields.UnparsedAddress,
      fields.City,
      fields.StateOrProvince,
      fields.PostalCode
    ].filter(Boolean);
    
    const address = addressParts.join(', ') || 'Address not available';

    // Get image
    const image = fields.Photos?.[0]?.Uri || 
                  fields.Photos?.[0]?.Url || 
                  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80';

    return {
      id: String(listing.Id || listing.ListingKey || Math.random()),
      name: fields.UnparsedAddress || 'Beautiful Property',
      address: address,
      price: price,
      beds: fields.BedsTotal || fields.BedroomsTotal || 0,
      baths: fields.BathsTotal || fields.BathroomsTotal || 0,
      sqft: fields.BuildingAreaTotal || fields.LivingArea || 0,
      image: image,
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
      
      if (listings.length === 0) {
        console.warn('⚠️ No listings found, using mock data');
        return this.getMockProperties();
      }
      
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
      {
        id: '5',
        name: 'Downtown Orlando Loft',
        address: '555 Central Blvd, Orlando, FL 32801',
        price: '$650,000',
        beds: 2,
        baths: 2,
        sqft: 1800,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
        status: 'For Sale' as const,
      },
      {
        id: '6',
        name: 'Dr. Phillips Estate',
        address: '8887 Bay Vista Blvd, Orlando, FL 32836',
        price: '$1,450,000',
        beds: 5,
        baths: 4,
        sqft: 5200,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
        status: 'For Sale' as const,
      },
    ];

    console.log('✅ Loaded', mockData.length, 'mock properties');
    return mockData;
  }
}

export const sparkApi = new SparkApiService();
