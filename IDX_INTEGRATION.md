# IDX API Integration Guide

This document describes the IDX API integration for the Real Estate 360 project.

## Overview

The IDX API integration allows the application to fetch real-time property listings from IDX Broker instead of using static mock data.

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_IDX_API_KEY=your_api_key_here
VITE_IDX_API_BASE_URL=https://api.idxbroker.com
```

**Important**: Never commit your `.env` file to version control. It has been added to `.gitignore` for security.

### API Key Location

Your API key is: `xRsxyswCkzS5Wfv92yQVH2`

This has been configured in the `.env` file.

## Features

### 1. Property Listings Page (`/src/pages/Listings.tsx`)

- **Real-time Data**: Fetches active listings from IDX API
- **Loading States**: Shows animated spinner while loading
- **Error Handling**: Graceful fallbacks with retry option
- **Filter Tabs**: Switch between 'All Properties', 'For Sale', and 'Sold'
- **Responsive Grid**: 3-column layout on desktop, responsive on mobile
- **Animations**: Smooth fade-in and hover effects using Framer Motion

### 2. IDX API Service (`/src/services/idxApi.ts`)

- **Automatic Fallback**: Uses mock data if API fails or key is missing
- **Data Transformation**: Converts IDX format to match application interface
- **Error Logging**: Comprehensive error handling and logging
- **Type Safety**: Full TypeScript support with proper interfaces

### 3. Property Cards (`/src/components/PropertyCard.tsx`)

- **Luxury Design**: Matches the existing premium theme
- **Gold Accents**: Uses `--accent` color (warm champagne gold)
- **Hover Effects**: Subtle lift and image zoom on hover
- **Status Badges**: "For Sale" badges with proper styling
- **Responsive Images**: Proper aspect ratios and object-fit

## Design System

The integration follows the existing luxury design system:

- **Colors**: Deep charcoal, warm gold accents, cream backgrounds
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Spacing**: Consistent 8px grid system
- **Animations**: Ken burns, fade-up, and slide effects
- **Shadows**: Multi-layer shadows with gold tint

## Usage

### Development

```bash
npm run dev
```

The properties page will automatically fetch listings from IDX API on load.

### Build

```bash
npm run build
```

The application builds successfully with the IDX integration.

## Troubleshooting

### API Issues

If properties aren't loading:
1. Check API key in `.env` file
2. Verify network connection
3. Check browser console for errors
4. The app will automatically show mock data if API fails

### Styling Issues

Ensure Tailwind CSS is properly configured:
- Check `tailwind.config.ts` for custom colors and fonts
- Verify CSS imports in `src/index.css`

## Security

- API key is stored in environment variables
- `.env` file is gitignored
- API key is only used client-side (Vite exposes it to the browser)
- For production, consider implementing a proxy server

## Future Enhancements

- Implement server-side API proxy for better security
- Add property search and filtering
- Implement pagination for large property sets
- Add property detail pages with full IDX data
- Implement saved searches and favorites
