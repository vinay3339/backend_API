# 📚 MySQL Integration - Documentation Index

Complete guide to connecting your School Management Portal to MySQL database (EduPortal).

## 🎯 Your Database

- **Database:** EduPortal
- **Host:** 127.0.0.1:3306
- **User:** vinaygoud
- **Password:** vinay3339
- **Tables:** schools, users, students, academic_years

## 📖 Documentation Files

### 🚀 Quick Start (Read This First!)

| File | Description | When to Use |
|------|-------------|-------------|
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | One-page quick reference | Quick commands & troubleshooting |
| **[README_DATABASE_INTEGRATION.md](README_DATABASE_INTEGRATION.md)** | Complete setup guide | Step-by-step integration |

### 📘 Detailed Guides

| File | Description |
|------|-------------|
| [MYSQL_DATA_INTEGRATION.md](MYSQL_DATA_INTEGRATION.md) | Comprehensive integration guide |
| [backend/QUICKSTART.md](backend/QUICKSTART.md) | Backend setup instructions |
| [backend/README.md](backend/README.md) | Full backend API documentation |

## 🔧 Backend Files

### Scripts

| File | Purpose | Command |
|------|---------|---------|
| `test_connection.py` | Test DB connection | `python test_connection.py` |
| `fetch_data.py` | Fetch & save data to JSON | `python fetch_data.py` |
| `main.py` | Start API server | `python main.py` |
| `start.sh` | Auto-start (Mac/Linux) | `./start.sh` |
| `start.bat` | Auto-start (Windows) | `start.bat` |

### Configuration

| File | Purpose |
|------|---------|
| `config.py` | Database credentials (already configured) |
| `requirements.txt` | Python dependencies |
| `.env.example` | Environment template |

### API Code

| File | Purpose |
|------|---------|
| `routers/data_sync.py` | API endpoints for data fetching |
| `models.py` | Database models |
| `schemas.py` | Request/response schemas |
| `auth.py` | Authentication utilities |

## 💻 Frontend Files

| File | Purpose | Usage |
|------|---------|-------|
| `services/api.ts` | API service functions | `import { fetchStudents } from './services/api'` |
| `components/DataFetchDemo.tsx` | Demo UI component | `<DataFetchDemo />` |

## 🎯 Quick Start Commands

### Windows
```bash
cd backend
start.bat
```

### Mac/Linux
```bash
cd backend
chmod +x start.sh
./start.sh
```

### Manual
```bash
cd backend
python test_connection.py  # Test first
python main.py             # Start API
```

## 📊 API Endpoints

**Base URL:** `http://localhost:8000/api/v1/data`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/test-connection` | GET | Test database connection |
| `/all` | GET | Fetch all data at once |
| `/schools` | GET | Get all schools |
| `/schools/{id}` | GET | Get specific school |
| `/users` | GET | Get all users |
| `/students` | GET | Get all students |
| `/students/{id}` | GET | Get specific student |
| `/students/by-class/{class_id}` | GET | Students by class |
| `/students/search` | GET | Search students |
| `/academic-years` | GET | Get academic years |

## 🧪 Testing

### 1. Test Connection
```bash
python backend/test_connection.py
```

### 2. Start API
```bash
python backend/main.py
```

### 3. Test Endpoints

**Browser:** http://localhost:8000/api/docs

**Command line:**
```bash
# Test connection
curl http://localhost:8000/api/v1/data/test-connection

# Get students
curl http://localhost:8000/api/v1/data/students

# Search students
curl "http://localhost:8000/api/v1/data/students/search?search=John"
```

## 💻 Frontend Integration

### Option 1: Demo Component
```tsx
import { DataFetchDemo } from './components/DataFetchDemo';

function App() {
  return <DataFetchDemo />;
}
```

### Option 2: API Service
```tsx
import { fetchStudents, searchStudents } from './services/api';

// Fetch all students
const result = await fetchStudents();
setStudents(result.data);

// Search students
const result = await searchStudents({ 
  search: 'John',
  class_id: 10,
  section: 'A'
});
```

### Option 3: Direct in Components
```tsx
useEffect(() => {
  async function loadStudents() {
    const response = await fetch('http://localhost:8000/api/v1/data/students');
    const data = await response.json();
    setStudents(data.data);
  }
  loadStudents();
}, []);
```

## 🛠️ Troubleshooting

| Issue | Quick Fix | Documentation |
|-------|-----------|---------------|
| Connection refused | Start backend: `python main.py` | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| Access denied | Check config.py credentials | [README_DATABASE_INTEGRATION.md](README_DATABASE_INTEGRATION.md) |
| Unknown database | Create database in MySQL | [backend/QUICKSTART.md](backend/QUICKSTART.md) |
| CORS error | Check frontend port | [MYSQL_DATA_INTEGRATION.md](MYSQL_DATA_INTEGRATION.md) |

## 📦 Installation

### Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

**Or install minimal:**
```bash
pip install fastapi uvicorn pymysql python-multipart
```

### Check Installation
```bash
python --version  # Should be 3.8+
pip --version
mysql --version   # MySQL should be running
```

## ✅ Verification Checklist

Use this checklist to verify your setup:

- [ ] MySQL server running
- [ ] Database "EduPortal" exists
- [ ] Tables exist: schools, users, students, academic_years
- [ ] Python 3.8+ installed
- [ ] pip installed
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Config has correct credentials (`backend/config.py`)
- [ ] Connection test passes (`python test_connection.py`)
- [ ] API starts (`python main.py`)
- [ ] API docs accessible (http://localhost:8000/api/docs)
- [ ] Test endpoint works (`/api/v1/data/test-connection`)
- [ ] Can fetch schools
- [ ] Can fetch students
- [ ] Can fetch users
- [ ] Can fetch academic years
- [ ] Frontend can call API (no CORS errors)

## 🎯 Integration Workflow

```
Step 1: Setup Backend
├── Install dependencies
├── Configure database
└── Test connection

Step 2: Start API Server
├── python main.py
├── Verify http://localhost:8000/api/docs
└── Test endpoints

Step 3: Frontend Integration
├── Use DataFetchDemo component (quick test)
├── Or use API service (api.ts)
└── Replace mock data in components

Step 4: Update Components
├── StudentManagement → fetchStudents()
├── SchoolSelector → fetchSchools()
├── UserManagement → fetchUsers()
└── AcademicYear → fetchAcademicYears()
```

## 📚 Learning Path

**For Beginners:**
1. Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. Run `python test_connection.py`
3. Follow [README_DATABASE_INTEGRATION.md](README_DATABASE_INTEGRATION.md)
4. Test with DataFetchDemo component

**For Experienced Developers:**
1. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
2. Review `backend/routers/data_sync.py` for API code
3. Use `services/api.ts` in your components
4. Read [backend/README.md](backend/README.md) for API details

## 🔒 Security Notes

- ✅ Passwords automatically removed from user data
- ✅ Read-only access (no database modifications)
- ✅ CORS protection enabled
- ✅ Input validation via Pydantic
- ⚠️ Update credentials for production
- ⚠️ Use environment variables in production
- ⚠️ Add authentication for production

## 🎉 Success Indicators

Your integration is working when:

✅ `test_connection.py` passes all checks
✅ API server starts without errors
✅ http://localhost:8000/api/docs loads
✅ Swagger UI shows all endpoints
✅ Test connection endpoint returns success
✅ Can fetch data from all 4 tables
✅ Frontend calls API without CORS errors
✅ Data displays in components

## 📞 Getting Help

If you need help:

1. **Check Documentation:**
   - [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick fixes
   - [README_DATABASE_INTEGRATION.md](README_DATABASE_INTEGRATION.md) - Troubleshooting section
   - [backend/QUICKSTART.md](backend/QUICKSTART.md) - Detailed setup

2. **Test Components:**
   - Run `python test_connection.py`
   - Check MySQL is running: `mysql -u vinaygoud -p`
   - Verify tables: `SHOW TABLES;` in MySQL

3. **Check Logs:**
   - Backend console output
   - Browser console (F12)
   - Network tab for API calls

4. **Verify Setup:**
   - Review checklist above
   - Test each step individually
   - Check API docs at http://localhost:8000/api/docs

## 🚀 Next Steps

After completing the integration:

1. **Test Everything**
   - All API endpoints work
   - Frontend can fetch data
   - No errors in console

2. **Update Components**
   - Replace mock data with API calls
   - Add loading states
   - Add error handling

3. **Enhance Features**
   - Add pagination
   - Implement filters
   - Add data caching
   - Add real-time updates

4. **Production Ready**
   - Use environment variables
   - Add authentication
   - Enable HTTPS
   - Add rate limiting

---

**You're all set!** 🎉 Your school management portal is now connected to your MySQL database.

Choose a documentation file above based on your needs and start integrating!
