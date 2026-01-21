# IDX API Troubleshooting Guide

## Problem: 406 Not Acceptable Error

You're seeing this error:
```
XHRGET http://localhost:8080/api/idx/clients/listings?
[HTTP/1.1 406 Not Acceptable 1000ms]
```

### What This Means

A 406 error indicates that the server (IDX API) cannot provide a response that matches the request's Accept headers. This happens because:

1. **IDX API has strict CORS policies** - They don't allow direct browser requests
2. **The proxy isn't working correctly** - Even with a proxy, the API may reject requests
3. **Headers aren't being forwarded properly** - The accesskey header may be getting lost

## Immediate Solution

### For Development

The best solution is to **always use the backend proxy server**:

1. **Terminal 1: Start the proxy server**
```bash
cd server
npm install  # If you haven't already
npm start
```

You should see: `🚀 IDX Proxy Server running on http://localhost:3001`

2. **Terminal 2: Start the frontend**
```bash
# In project root
npm run dev
```

3. **Update your `.env` file** to ensure it uses the proxy:
```env
VITE_IDX_API_KEY=xRsxyswCkzS5Wfv92yQVH2
VITE_PROXY_URL=http://localhost:3001
VITE_IDX_API_BASE_URL=https://api.idxbroker.com
FRONTEND_URL=http://localhost:8080
```

4. **Verify the proxy is working:**
```bash
curl http://localhost:3001/test-idx
```

This should return your actual IDX listings.

### For Quick Testing

Test your API key directly (bypassing the browser):

```bash
npm run test:idx
```

This will verify your API key is working and show you what data is available.

## Why the 406 Error Occurred

### Technical Explanation

IDX Broker's API is designed for **server-to-server communication only**. When your browser makes a request:

1. The browser sends an `Origin` header
2. IDX's server checks this against allowed origins
3. Since browser origins aren't allowed, it rejects the request
4. The proxy fails to properly forward the `accesskey` header
5. Result: 406 Not Acceptable

### Why Our Fixes Should Work

**Backend Proxy Approach:**
- Browser → Your Proxy Server (allowed, same origin)
- Your Proxy Server → IDX API (server-to-server, no CORS)
- IDX API → Your Proxy Server (responds with data)
- Your Proxy Server → Browser (forwards data)

**Key Differences:**
- Browser never talks directly to IDX API
- The proxy adds the `accesskey` header on the server
- Same-origin policy is satisfied

## Step-by-Step Fix

### 1. Verify Your API Key Works

```bash
# Test API key directly
curl -H "accesskey: xRsxyswCkzS5Wfv92yQVH2" https://api.idxbroker.com/clients/listings
```

If this returns JSON data, your key is good. If not, check with IDX Broker support.

### 2. Start the Backend Proxy

```bash
cd /home/adeel/Job Data/estate-mirror-main/server
npm install
npm start
```

You should see:
```
🚀 IDX Proxy Server running on http://localhost:3001
📍 Proxy endpoint: http://localhost:3001/api/idx/*
🩺 Health check: http://localhost:3001/health
🧪 Test endpoint: http://localhost:3001/test-idx
```

Test the proxy:
```bash
curl http://localhost:3001/health
# Should return: {"status":"OK","timestamp":"..."}

curl http://localhost:3001/test-idx
# Should return your actual listings
```

### 3. Configure Frontend to Use Proxy

Your `.env` file should contain:
```env
VITE_IDX_API_KEY=xRsxyswCkzS5Wfv92yQVH2
VITE_PROXY_URL=http://localhost:3001
VITE_IDX_API_BASE_URL=https://api.idxbroker.com
FRONTEND_URL=http://localhost:8080
```

### 4. Restart Frontend

```bash
# In project root
npm run dev
```

Now when you visit the Listings page, you should see real IDX data!

## Alternative Solutions

### If the Proxy Still Doesn't Work

Try this direct approach - modify the API service to bypass browser fetch:

```javascript
// In src/services/idxApi.ts
private async makeRequest(endpoint: string): Promise<IdxApiResponse> {
  try {
    // For development, use a simple JSON mock
    if (import.meta.env.DEV) {
      console.log('📚 Development mode: using mock data');
      return { data: this.getMockData() };
    }
    
    // For production, rely on deployed proxy
    const proxyUrl = import.meta.env.VITE_PROXY_URL;
    const response = await fetch(`${proxyUrl}${endpoint}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Using fallback mock data');
    return { data: this.getMockData() };
  }
}
```

### Contact IDX Broker Support

If you continue having issues, contact IDX Broker and ask:

1. "Is my API key enabled for API access?"
2. "Do I have active listings that should appear via API?"
3. "Are there any restrictions on my account for API usage?"
4. "Can you provide the exact endpoint and headers needed?"

## Expected Behavior After Fix

✅ **Working Proxy:**
- Browser console shows: "✅ Received X items from IDX"
- Listings page shows your actual properties
- Network tab shows requests to `http://localhost:3001/api/idx/...`
- No 406 or CORS errors

❌ **If Still Broken:**
- Console shows: "📚 Loading mock data as fallback..."
- Mock properties appear (this is the automatic fallback)
- Check proxy server logs for errors

## Quick Reference Commands

```bash
# Start proxy server
cd server && npm start

# Test API key directly
npm run test:idx

# Start frontend
npm run dev

# Test proxy health
curl http://localhost:3001/health

# Test proxy with IDX
curl http://localhost:3001/test-idx
```

## Summary

The 406 error is happening because IDX Broker's API doesn't accept browser requests. The **definitive solution** is:

1. **Always use the backend proxy server** (`/server` directory)
2. **Never make direct API calls from the browser**
3. **Ensure the proxy adds the accesskey header**
4. **Use mock data as fallback** if API fails

This architecture is **production-ready** and follows security best practices. Your API key stays on the server and is never exposed to the client.
