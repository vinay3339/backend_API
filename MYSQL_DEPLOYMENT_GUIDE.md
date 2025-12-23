# MySQL Database Setup for Render Deployment

## Option 1: Use PlanetScale (Recommended - Free MySQL)

1. **Sign up at PlanetScale**: https://planetscale.com/
2. **Create a database**
3. **Get connection string** from dashboard
4. **Set environment variable** in Render:
   ```
   DATABASE_URL=mysql+pymysql://username:password@host/database?ssl_ca=/etc/ssl/certs/ca-certificates.crt
   ```

## Option 2: Use Railway MySQL

1. **Sign up at Railway**: https://railway.app/
2. **Create MySQL service**
3. **Get connection details**
4. **Set environment variables** in Render:
   ```
   DATABASE_URL=mysql+pymysql://username:password@host:port/database
   ```

## Option 3: Use JawsDB (Heroku Add-on, works with Render)

1. **Sign up at JawsDB**: https://www.jawsdb.com/
2. **Create MySQL instance**
3. **Get connection URL**
4. **Set in Render environment**

## Render Environment Variables Setup

In your Render dashboard, add these environment variables:

### Required Variables:
```
DATABASE_URL=mysql+pymysql://username:password@host:port/database
SECRET_KEY=your-super-secret-key-here
DEBUG=false
```

### Optional Variables:
```
DB_HOST=your-host (if not using DATABASE_URL)
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
```

## Quick Setup Commands

1. **Test connection locally**:
   ```bash
   cd src/backend
   python test_connection.py
   ```

2. **Initialize database**:
   ```bash
   python -c "from database import init_db; init_db()"
   ```

## Troubleshooting

- **Connection refused**: Check if DATABASE_URL is set correctly
- **SSL errors**: Add `?ssl_ca=/etc/ssl/certs/ca-certificates.crt` to connection string
- **Timeout errors**: Use connection pooling (already configured)