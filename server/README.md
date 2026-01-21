# IDX Proxy Server

Backend proxy server to handle CORS requests to IDX Broker API.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **For development with auto-restart:**
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Proxy IDX API Requests
```
GET /api/idx/*
```

**Example:**
```bash
curl http://localhost:3001/api/idx/clients/listings
```

This will proxy the request to `https://api.idxbroker.com/clients/listings` with your API key.

### Health Check
```
GET /health
```

**Example:**
```bash
curl http://localhost:3001/health
```

### Test IDX Connection
```
GET /test-idx
```

**Example:**
```bash
curl http://localhost:3001/test-idx
```

Returns a sample of your IDX listings to verify the connection works.

## Environment Variables

Create a `.env` file in the parent directory:

```env
VITE_IDX_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:8080
```

## Environment-Specific Instructions

### Development (Local)

The frontend Vite dev server already includes a proxy, so you don't need this server for development. It's provided for production use.

### Production

1. **Deploy this server** to a platform like Render, Heroku, or any Node.js hosting
2. **Set environment variables** on your hosting platform
3. **Configure frontend** to use this proxy by setting `VITE_PROXY_URL` in the frontend `.env`
4. **Update CORS** in this file if needed for your domain

**Example production environment variables:**
```env
VITE_IDX_API_KEY=xRsxyswCkzS5Wfv92yQVH2
FRONTEND_URL=https://yourdomain.com
PORT=10000  # Render.com default port
```

## Deployment

### Deploy to Render.com (Recommended - Free)

1. Go to [Render.com](https://render.com)
2. Create New Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables:
   - `VITE_IDX_API_KEY`: your_key_here
   - `FRONTEND_URL`: your_frontend_url
7. Deploy

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set VITE_IDX_API_KEY=your_key_here
   heroku config:set FRONTEND_URL=your_frontend_url
   ```
5. Deploy: `git push heroku main`

## Testing

After starting the server, test it:

1. Health check:
```bash
curl http://localhost:3001/health
```
Expected: `{"status":"OK","timestamp":"..."}`

2. API test:
```bash
curl http://localhost:3001/test-idx
```
Expected: Sample property data from your IDX account

3. Full listings:
```bash
curl http://localhost:3001/api/idx/clients/listings
```
Expected: All your active listings

## Security

- API key is stored server-side only
- CORS is configured to only allow your frontend domain
- No sensitive data is logged
- Consider adding rate limiting for production:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Troubleshooting

**Problem**: "API key not configured" error
- **Solution**: Ensure `.env` file exists in parent directory with `VITE_IDX_API_KEY`

**Problem**: CORS errors from frontend
- **Solution**: Update `FRONTEND_URL` in `.env` to match your frontend domain exactly

**Problem**: "Cannot fetch" errors
- **Solution**:
  1. Verify API key is correct
  2. Check IDX account has active listings
  3. Test with `/test-idx` endpoint
  4. Check server logs for detailed errors

**Problem**: Port already in use
- **Solution**: Change `PORT` in `.env` file and update `VITE_PROXY_URL` in frontend `.env`

## Support

For issues related to:
- **This proxy server**: Check logs in console
- **IDX API**: Contact IDX Broker support
- **Frontend integration**: See main README.md
