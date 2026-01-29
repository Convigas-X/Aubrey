# Spark API Setup Guide - Full MLS Access

## 🎯 What is Spark API?

**Spark API** is the modern replacement for RETS that gives you **FULL MLS DATA ACCESS** (not just agent's listings like IDX Broker API).

### Spark API vs IDX Broker API

| Feature | IDX Broker API | Spark API |
|---------|---------------|-----------|
| **Data Access** | Only agent's listings | Full MLS database |
| **Cost** | Free with IDX account | $50/month per MLS |
| **Setup** | Simple | Requires MLS approval |
| **Best For** | Basic IDX display | Full MLS search/portals |

---

## 💰 Pricing

| Item | Cost |
|------|------|
| Developer Registration | **FREE** |
| Per MLS Access | **$50/month** |
| Multiple API keys (same MLS) | No extra charge |

---

## 📝 Step-by-Step Setup

### Step 1: Register as Developer (FREE)

1. Go to: **https://sparkplatform.com**
2. Click **"Sign Up"** (top right)
3. Complete **Developer Registration** form
4. Wait for activation email (within 3 business days)
5. You'll receive **demo API credentials** for testing

📧 Contact: `api-support@fbsdata.com` for questions

---

### Step 2: Determine API Key Type

#### Choose Your Role:

| Role | Use Case | Public Display? |
|------|----------|-----------------|
| **IDX** | Website displaying listings | ✅ Yes |
| **VOW** | Registration-required listings | ✅ Yes (after login) |
| **Private** | Back-office tools, CRM | ❌ No |

**For Real Estate 360:** Choose **IDX** role

---

### Step 3: Find Your MLS in Datamart

1. Login at: **https://sparkplatform.com/login**
2. Click **"Datamart"** (top left)
3. Enter payment method (if first time)
4. Search for your MLS (e.g., "Stellar MLS", "Bright MLS", "CRMLS")
5. Review available data plans

**Popular Florida MLSs:**
- Stellar MLS (covers Central Florida including Orlando)
- Miami MLS
- Beaches MLS

---

### Step 4: Enroll in Data Plan

1. Click **"PLANS & PRICING"** on your MLS
2. Review pricing and terms
3. Accept Terms & Conditions
4. Choose option:
   - ✅ **"I am requesting data to build a site or app for a specific broker or agent"**
   - Or **"I am requesting to build sites or apps for multiple brokers"** (generic agent)
5. Enter **Flexmls username** (or request generic agent)
6. Describe your project:
   ```
   Building a real estate website for Real Estate 360 brokerage 
   in Orlando, FL. Need IDX data display for property search, 
   featured listings, and neighborhood pages. Public access website.
   ```
7. Click **"PURCHASE WITH APPROVAL"**

---

### Step 5: Wait for MLS Approval

- MLS will review your application
- Approval chain via email
- You'll receive **live API credentials** by email
- Timeline: Usually **3-7 business days**

---

## 🔧 After Approval: Integration

### API Credentials Format

You'll receive:
```
API Key: xxxxxxxxxxxxxxxxxxxxxxxx
Secret: xxxxxxxxxxxxxxxxxxxxxxxx
MLS: Your MLS Code (e.g., 'stellar')
Endpoint: https://sparkapi.com/v1/
```

### Update Your .env Files

**Frontend (.env):**
```env
# Remove IDX Broker
# VITE_IDX_API_KEY=...

# Add Spark API
VITE_SPARK_API_KEY=your_spark_api_key
VITE_SPARK_API_URL=https://sparkapi.com/v1
VITE_PROXY_URL=https://api.realestate360.realtor
```

**Backend (server/.env):**
```env
# Spark API (Secret)
SPARK_API_KEY=your_spark_api_key
SPARK_API_SECRET=your_spark_api_secret

# CORS (same)
FRONTEND_URL=https://realestate360.realtor,https://www.realestate360.realtor
```

---

## 📡 Spark API Endpoints

### Key Endpoints You'll Use:

```javascript
// Get all listings
GET /listings

// Search listings
GET /listings?city=Orlando&minPrice=500000

// Get single listing
GET /listings/{id}

// Get photos
GET /listings/{id}/photos

// Get open houses
GET /listings/{id}/openhouses
```

### Example Response
```json
{
  "D": {
    "Results": [
      {
        "Id": "12345",
        "StandardFields": {
          "ListingKey": "12345",
          "ListPrice": 850000,
          "City": "Orlando",
          "StateOrProvince": "FL",
          "BedsTotal": 4,
          "BathsTotal": 3,
          "MLSAreaMinor": "Windermere"
        }
      }
    ]
  }
}
```

---

## 🆘 If No Data Plan Available

Some MLSs don't offer public data plans. In that case:

### Contact the MLS Directly

Email template:
```
Subject: API Access Request for [Brokerage Name]

Dear [MLS Name] Team,

I am requesting API access for our real estate website.

Details:
- Brokerage: Real Estate 360
- Website: https://realestate360.realtor
- Use Case: IDX property search and display
- API Role Needed: IDX
- Flexmls Username: [your_username]

We need full MLS data access to provide property search 
functionality for our clients in Central Florida.

Please let me know the approval process.

Thank you,
[Your Name]
[Your Title]
Real Estate 360
```

---

## ⚡ Quick Start Checklist

- [ ] Register at sparkplatform.com (FREE)
- [ ] Wait for developer approval (3 days)
- [ ] Find your MLS in Datamart
- [ ] Enroll in IDX data plan ($50/mo)
- [ ] Wait for MLS approval (3-7 days)
- [ ] Receive API credentials
- [ ] Update backend proxy for Spark API
- [ ] Test API connection
- [ ] Deploy updated website

---

## 📞 Support Contacts

| Issue | Contact |
|-------|---------|
| Developer Registration | api-support@fbsdata.com |
| IDX Products (Plugin/SmartFrame) | idx@flexmls.com |
| Phone | 866-320-9977 |
| Website | fbsproducts.com |

---

## 🔄 Migration from IDX Broker to Spark

### What Changes:

**API Service (`src/services/idxApi.ts`):**
```typescript
// OLD - IDX Broker
const response = await fetch('https://api.idxbroker.com/clients/featured');

// NEW - Spark API
const response = await fetch('https://sparkapi.com/v1/listings', {
  headers: {
    'X-SparkApi-User-Agent': 'YourApp/1.0',
    'Authorization': `Bearer ${apiKey}`
  }
});
```

**Data Structure:**
- Spark uses nested `D.Results` structure
- Field names are different (StandardFields prefix)
- More detailed property data available

---

## 💡 Pro Tips

1. **Start with demo credentials** - Test the API before paying
2. **Request generic agent** - If building for multiple agents
3. **Cache responses** - Reduce API calls and save costs
4. **Use photos endpoint** - Better image handling
5. **Check rate limits** - Usually 1000 requests/hour

---

## 📚 Resources

- **Documentation:** https://sparkplatform.com/docs
- **API Reference:** https://sparkapi.com/v1
- **Datamart:** https://sparkplatform.com/appstore/datamart
- **Postman Collection:** Available in Spark documentation

---

## 🎉 Summary

| Step | Action | Time | Cost |
|------|--------|------|------|
| 1 | Register as developer | 10 min | FREE |
| 2 | Wait for approval | 3 days | FREE |
| 3 | Enroll in MLS plan | 15 min | $50/mo |
| 4 | Wait for MLS approval | 3-7 days | - |
| 5 | Integrate API | 1-2 days | - |

**Total Time:** ~2 weeks  
**Total Cost:** $50/month per MLS

**Result:** Full MLS database access for Real Estate 360! 🚀
