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

      // Build URL with query parameters
      const queryParams = new URLSearchParams(params);
      const url = `${this.baseUrl}${endpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      console.log(`📡 Fetching: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Method': 'GET',
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
      console.log('🎯 Fetching listings with API key:', this.apiKey.substring(0, 8) + '...');
      
      // Note: Direct browser calls to IDX Broker API will fail due to CORS
      // This requires a backend proxy server
      const response = await this.makeRequest('/clients/featured');
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        console.log('✅ Successfully loaded', response.data.length, 'listings');
        return response.data.map((item: any) => this.transformIdxProperty(item));
      }

      console.warn('⚠️ IDX API returned no listings, using mock data');
      return this.getMockProperties();
      
    } catch (error) {
      console.error('❌ Failed to fetch from IDX API:', error);
      return this.getMockProperties();
    }
  }

  // Search listings with filters
  async searchListings(filters: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
  }): Promise<Property[]> {
    try {
      console.log('🔍 Searching listings with filters:', filters);
      
      // Build query parameters
      const params: Record<string, string> = {};
      if (filters.location) params.city = filters.location;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.beds) params.bedrooms = filters.beds;
      if (filters.baths) params.bathrooms = filters.baths;

      const response = await this.makeRequest('/clients/listings', params);
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((item: any) => this.transformIdxProperty(item));
      }

      // If no results from API, filter mock data
      return this.filterMockProperties(filters);
      
    } catch (error) {
      console.error('❌ Search failed:', error);
      return this.filterMockProperties(filters);
    }
  }

  private filterMockProperties(filters: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
  }): Property[] {
    let properties = this.getMockProperties();

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      properties = properties.filter(p => 
        p.address.toLowerCase().includes(loc) || 
        p.name.toLowerCase().includes(loc)
      );
    }

    if (filters.minPrice) {
      const min = parseInt(filters.minPrice);
      properties = properties.filter(p => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ''));
        return price >= min;
      });
    }

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice);
      properties = properties.filter(p => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ''));
        return price <= max;
      });
    }

    if (filters.beds) {
      const beds = parseInt(filters.beds);
      properties = properties.filter(p => p.beds >= beds);
    }

    if (filters.baths) {
      const baths = parseInt(filters.baths);
      properties = properties.filter(p => p.baths >= baths);
    }

    return properties;
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

export const idxApi = new IdxApiService();
