# Deployment Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB instance (local or cloud)
- OpenAI API key (optional)

## Environment Setup

### Development

1. Copy environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nextgen-analyzer
JWT_SECRET=your_secure_random_string_here
AI_API_KEY=sk-your-openai-api-key
AI_API_URL=https://api.openai.com/v1/chat/completions
NODE_ENV=development
```

### Production

Use environment variables from your hosting platform.

## Local Development

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Start MongoDB
mongod

# Run development server
npm run dev
```

Access at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Production Build

### Build Frontend

```bash
cd client
npm run build
```

This creates an optimized build in `client/dist/`

### Serve Static Files

Update `server/index.js` to serve static files:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
```

## Deployment Options

### Option 1: Heroku

1. Create `Procfile`:
```
web: node server/index.js
```

2. Deploy:
```bash
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

### Option 2: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
cd client
vercel
```

**Backend (Railway):**
1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically

### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build commands:
   - Build: `npm install && cd client && npm install && npm run build`
   - Run: `npm start`
3. Add MongoDB database
4. Set environment variables

### Option 4: AWS EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# Follow MongoDB installation guide

# Clone repository
git clone your-repo-url
cd nextgen-code-analyzer

# Install dependencies
npm install
cd client && npm install && npm run build && cd ..

# Install PM2
sudo npm install -g pm2

# Start application
pm2 start server/index.js --name nextgen-analyzer
pm2 save
pm2 startup
```

### Option 5: Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy source
COPY . .

# Build frontend
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server/index.js"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/nextgen-analyzer
      - JWT_SECRET=${JWT_SECRET}
      - AI_API_KEY=${AI_API_KEY}
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Deploy:
```bash
docker-compose up -d
```

## MongoDB Cloud (Atlas)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nextgen-analyzer
```

## Environment Variables Checklist

- [ ] PORT
- [ ] MONGODB_URI
- [ ] JWT_SECRET (use strong random string)
- [ ] AI_API_KEY (optional)
- [ ] AI_API_URL
- [ ] NODE_ENV=production

## Post-Deployment

1. Test all features
2. Monitor logs
3. Set up error tracking (Sentry)
4. Configure backups
5. Set up SSL certificate
6. Configure domain

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Health Check Endpoint

Add to `server/index.js`:
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});
```

## Troubleshooting

### MongoDB Connection Issues
- Check connection string
- Verify network access in MongoDB Atlas
- Check firewall rules

### Build Failures
- Clear node_modules and reinstall
- Check Node.js version
- Verify all dependencies

### API Errors
- Check environment variables
- Verify API keys
- Check CORS configuration

## Security Checklist

- [ ] Use HTTPS
- [ ] Set secure JWT_SECRET
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use helmet.js
- [ ] Sanitize inputs
- [ ] Keep dependencies updated

## Performance Tips

- Enable gzip compression
- Use CDN for static assets
- Implement caching
- Optimize database queries
- Use connection pooling
- Monitor memory usage
