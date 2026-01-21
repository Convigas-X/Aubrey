export interface Property {
  id: string;
  name: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: 'For Sale' | 'Sold';
}

export const properties: Property[] = [
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
  name: 'Historic College Park Bungalow',
  address: '567 Edgewater Dr, Orlando, FL 32804',
  price: '$625,000',
  beds: 3,
  baths: 2,
  sqft: 1850,
  image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
  status: 'For Sale' as const,
},
{
  id: '6',
  name: 'Golf Course Paradise',
  address: '890 Fairway Ln, Isleworth, FL 34786',
  price: '$1,750,000',
  beds: 5,
  baths: 4,
  sqft: 5500,
  image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80',
  status: 'For Sale' as const,
},
{
  id: "7",
  name: "Stylish Downtown Loft",
  address: "123 Orange Ave, Orlando, FL 32801",
  price: '$425,000',
  beds: 2,
  baths: 2,
  sqft: 1400,
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
  status: 'For Sale' as const,
},
{
  id: "8",
  name: "Family-Friendly Suburban Home",
  address: "456 Oak Tree Ln, Oviedo, FL 32765",
  price: '$545,000',
  beds: 4,
  baths: 3,
  sqft: 2600,
  image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
  status: 'For Sale' as const,
},
{
  id: "9",
  name: "Waterfront Luxury Condo",
  address: "789 Marina Way, Orlando, FL 32839",
  price: '$695,000',
  beds: 3,
  baths: 2,
  sqft: 2100,
  image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80",
  status: 'For Sale' as const,
},
];
