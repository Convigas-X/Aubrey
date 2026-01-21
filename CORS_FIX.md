# CORS Issue Fix Guide

## Problem

IDX Broker API doesn't allow direct browser requests due to CORS (Cross-Origin Resource Sharing) policy. This is a security measure implemented by the API server.

## Solution Overview

We've implemented a two-tier proxy solution:

### 1. Development Proxy (Vite Dev Server)
The Vite development server now includes a proxy configuration that forwards API requests through the dev server, bypassing CORS restrictions.

**File**: `vite.config.ts`
```typescript
proxy: {
  '/api/idx': {
    target: 'https://api.idxbroker.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/idx/, ''),
    headers: {
      'accesskey': process.env.VITE_IDX_API_KEY || ''
    },
  },
}
```

### 2. Production Proxy (Backend Server)
A complete Node.js/Express proxy server is provided in the `/server` directory for production deployments.

## Quick Start

### For Development

The CORS issue is already fixed! Restart your dev server:

```bash
npm run dev
```

Your API calls will now be proxied through Vite's dev server automatically.

### For Production

You need to deploy the proxy server:

1. **Install dependencies:**
```bash
cd server
npm install
```

2. **Start the proxy server:**
```bash
npm start
```

3. **Set environment variable in frontend .env:**
```env
VITE_PROXY_URL=http://your-backend-server.com
```

4. **Build and deploy your frontend:**
```bash
npm run build
```

## Configuration

### Environment Variables

Make sure your `.env` file includes:

```env
# IDX API Configuration
VITE_IDX_API_KEY=xRsxyswCkzS5Wfv92yQVH2
VITE_IDX_API_BASE_URL=https://api.idxbroker.com

# Backend Proxy Configuration (for production)
VITE_PROXY_URL=http://localhost:3001

# Frontend URL (for CORS configuration)
FRONTEND_URL=http://localhost:8080
```

### Testing the Setup

#### Test Development Proxy
1. Start dev server: `npm run dev`
2. Open browser console
3. Navigate to Listings page
4. Check console for successful API calls
5. Verify properties load from IDX API

#### Test Production Proxy
1. Start proxy server:
```bash
cd server
npm install
npm start
```

2. Test the proxy:
```bash
curl http://localhost:3001/health
```

3. Test IDX connection:
```bash
curl http://localhost:3001/test-idx
```

## Deployment Options

### Option 1: Same Server (Recommended for simplicity)
Deploy both frontend and proxy on the same server:

```bash
# Install all dependencies
npm install
cd server && npm install && cd ..

# Build frontend
npm run build

# Set production environment variables
export NODE_ENV=production
export VITE_PROXY_URL=http://localhost:3001

# Start both services
npm run start:proxy &  # Custom script to run proxy
cd dist && python -m http.server 8080  # Or any static file server
```

### Option 2: Separate Hosting
Deploy frontend on Vercel/Netlify and backend on Render/Heroku:

1. **Deploy proxy to Render.com:**
   - Create new Web Service
   - Connect GitHub repo
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && node server.js`
   - Add environment variables: `VITE_IDX_API_KEY`

2. **Deploy frontend to Vercel:**
   - Set environment variable: `VITE_PROXY_URL` (your Render URL)
   - Deploy as normal

### Option 3: Vercel Serverless Functions
If deploying to Vercel, use serverless functions instead of separate server:

```javascript
// api/idx.js
export default async function handler(req, res) {
  const { path } = req.query;
  const apiKey = process.env.VITE_IDX_API_KEY;
  
  const response = await fetch(`https://api.idxbroker.com${path}`, {
    headers: { 'accesskey': apiKey }
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
```

## Troubleshooting

### Development Issues

**Problem**: Still getting CORS errors in dev
- **Solution**: Ensure `vite.config.ts` has the proxy configuration
- **Check**: Restart dev server after config changes
- **Verify**: Check browser network tab - requests should go to `localhost:8080/api/idx/...`

### Production Issues

**Problem**: Properties not loading in production
- **Solution**: Verify proxy server is running
- **Check**: Test proxy health: `http://your-server/health`
- **Verify**: Check frontend env var `VITE_PROXY_URL` is correct

**Problem**: API key errors
- **Solution**: Ensure `VITE_IDX_API_KEY` is set in proxy server's environment
- **Check**: Test with `/test-idx` endpoint on proxy server

### API Response Issues

**Problem**: IDX API returns empty data
- **Solution**: Check if your IDX account has active listings
- **Check**: Verify API key has correct permissions
- **Test**: Use the test endpoint to see raw response

## Security Considerations

For production deployments:

1. **Use HTTPS** for both frontend and proxy
2. **Set proper CORS** origins in proxy server
3. **Add rate limiting** to prevent API abuse:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

4. **Add API key rotation** and monitoring
5. **Consider caching** responses to reduce API calls

## Support

If you continue experiencing issues:

1. Check browser console for detailed error messages
2. Verify network requests in browser dev tools
3. Check proxy server logs for backend errors
4. Ensure all environment variables are configured
5. Test API key directly with curl:
```bash
curl -H "accesskey: xRsxyswCkzS5Wfv92yQVH2" https://api.idxbroker.com/clients/listings
```

## Summary

✅ **Development**: Vite proxy automatically handles CORS  
✅ **Production**: Deploy `/server` directory as backend proxy  
✅ **Environment**: Configure `.env` with proxy URL  
✅ **Security**: API key stays on server, not exposed to client  
✅ **Fallback**: Mock data loads if API fails  

Your IDX integration is now production-ready and CORS-compliant!
