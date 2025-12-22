# 🎓 MySQL Database Integration - Complete Setup

## 📋 Overview

This integration connects your school management portal to your existing MySQL database (**EduPortal**) and fetches data from:
- ✅ **schools** table
- ✅ **users** table
- ✅ **students** table
- ✅ **academic_years** table

## 🎯 Your Database Configuration

**Already configured and ready to use:**

| Setting | Value |
|---------|-------|
| Host | 127.0.0.1 |
| Port | 3306 |
| Username | vinaygoud |
| Password | vinay3339 |
| Database | EduPortal |

## 🚀 Quick Start (Choose Your Method)

### Method 1: Automated (Recommended)

**Windows:**
```bash
cd backend
start.bat
```

**Mac/Linux:**
```bash
cd backend
chmod +x start.sh
./start.sh
```

### Method 2: Manual

```bash
# 1. Test connection
cd backend
python test_connection.py

# 2. Start API server
python main.py
```

### Method 3: Using the Demo Component

Start your frontend application and navigate to the data demo page to test fetching data interactively.

## 📁 Files Created for You

### Backend Files (Python/FastAPI)
```
/backend/
├── config.py              ✅ Your MySQL credentials
├── test_connection.py     ✅ Test database connection
├── fetch_data.py          ✅ Fetch & save data to JSON
├── main.py                ✅ Updated with data sync router
├── start.sh               ✅ Auto-start script (Mac/Linux)
├── start.bat              ✅ Auto-start script (Windows)
├── QUICKSTART.md          ✅ Detailed instructions
└── routers/
    └── data_sync.py       ✅ API endpoints for data fetching
```

### Frontend Files (React/TypeScript)
```
/services/
└── api.ts                 ✅ API service functions

/components/
└── DataFetchDemo.tsx      ✅ Demo UI component
```

### Documentation
```
/MYSQL_DATA_INTEGRATION.md          ✅ Complete guide
/README_DATABASE_INTEGRATION.md     ✅ This file
```

## 🔄 How It Works

```
┌─────────────────────┐
│   MySQL Database    │
│     (EduPortal)     │
│  - schools          │
│  - users            │
│  - students         │
│  - academic_years   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Python Backend     │
│     (FastAPI)       │
│  Port: 8000         │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   REST API          │
│  /api/v1/data/*     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Frontend Service   │
│    (api.ts)         │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  React Components   │
│  (Your Portal)      │
└─────────────────────┘
```

## 📊 Available API Endpoints

**Base URL:** `http://localhost:8000/api/v1/data`

### Core Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /test-connection` | Test database connection | Check if DB is accessible |
| `GET /all` | Fetch all tables at once | Get everything in one call |
| `GET /schools` | Get all schools | List of all schools |
| `GET /users` | Get all users | List of users (passwords removed) |
| `GET /students` | Get all students | List of all students |
| `GET /academic-years` | Get academic years | List of academic years |

### Advanced Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /schools/{id}` | Get specific school by ID |
| `GET /students/{id}` | Get specific student by ID |
| `GET /students/by-class/{class_id}` | Get students by class |
| `GET /students/by-class/{class_id}?section=A` | Get students by class & section |
| `GET /students/search?search=John` | Search students by name |
| `GET /students/search?class_id=10&section=A` | Filter by class and section |
| `GET /students/search?status=active` | Filter by status |

## 💻 Frontend Integration Examples

### Example 1: Fetch All Students

```tsx
import { fetchStudents } from './services/api';

function StudentList() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    fetchStudents().then(result => {
      setStudents(result.data);
    });
  }, []);
  
  return (
    <div>
      <h2>Students ({students.length})</h2>
      {students.map(student => (
        <div key={student.id}>
          {student.first_name} {student.last_name}
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Search Students

```tsx
import { searchStudents } from './services/api';

function StudentSearch() {
  const [results, setResults] = useState([]);
  
  const handleSearch = async (searchTerm: string) => {
    const result = await searchStudents({ search: searchTerm });
    setResults(result.data);
  };
  
  return (
    <div>
      <input 
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search students..."
      />
      <div>Found {results.length} students</div>
    </div>
  );
}
```

### Example 3: Fetch Schools

```tsx
import { fetchSchools } from './services/api';

function SchoolList() {
  const [schools, setSchools] = useState([]);
  
  useEffect(() => {
    fetchSchools().then(result => {
      setSchools(result.data);
    });
  }, []);
  
  return (
    <div>
      {schools.map(school => (
        <div key={school.id}>
          <h3>{school.school_name}</h3>
          <p>{school.city}, {school.state}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Use the Demo Component

```tsx
import { DataFetchDemo } from './components/DataFetchDemo';

function App() {
  return (
    <div>
      <DataFetchDemo />
    </div>
  );
}
```

The demo component provides:
- ✅ Connection status indicator
- ✅ Tabs for each data type
- ✅ Fetch buttons
- ✅ JSON data viewer
- ✅ Record counts
- ✅ Error handling
- ✅ API endpoint documentation

## 🧪 Testing Your Setup

### Test 1: Database Connection

```bash
cd backend
python test_connection.py
```

**Expected output:**
```
============================================
✓ Connection successful!
✓ MySQL Version: 8.0.x
✓ Found tables: schools, users, students, academic_years
✓ schools: X records
✓ users: X records
✓ students: X records
✓ academic_years: X records
SUCCESS! All required tables are present.
============================================
```

### Test 2: Start API Server

```bash
python main.py
```

**Expected output:**
```
Starting School Management System v1.0.0
Database URL: 127.0.0.1:3306/EduPortal
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Test 3: API Documentation

Open: http://localhost:8000/api/docs

You should see Swagger UI with all available endpoints.

### Test 4: Test Connection Endpoint

**Using Browser:**
```
http://localhost:8000/api/v1/data/test-connection
```

**Using curl:**
```bash
curl http://localhost:8000/api/v1/data/test-connection
```

**Expected response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "database": "EduPortal",
  "version": "8.0.x"
}
```

### Test 5: Fetch Students

**Using Browser:**
```
http://localhost:8000/api/v1/data/students
```

**Using curl:**
```bash
curl http://localhost:8000/api/v1/data/students
```

**Expected response:**
```json
{
  "success": true,
  "count": 150,
  "data": [
    {
      "id": 1,
      "admission_no": "ADM001",
      "first_name": "John",
      "last_name": "Doe",
      ...
    }
  ]
}
```

## 🛠️ Troubleshooting

### Issue 1: "Connection refused"

**Symptom:** Cannot connect to backend API

**Solution:**
```bash
# Make sure backend is running
cd backend
python main.py
```

---

### Issue 2: "Access denied for user"

**Symptom:** MySQL authentication error

**Solution:**
1. Verify credentials in `/backend/config.py`
2. Test MySQL connection:
```bash
mysql -u vinaygoud -p
# Enter password: vinay3339
```

---

### Issue 3: "Unknown database 'EduPortal'"

**Symptom:** Database doesn't exist

**Solution:**
```sql
-- Create database
mysql -u vinaygoud -p
CREATE DATABASE EduPortal;
```

---

### Issue 4: "Table doesn't exist"

**Symptom:** Required tables not found

**Solution:**
```sql
-- Check existing tables
USE EduPortal;
SHOW TABLES;
```

Required tables:
- schools
- users
- students
- academic_years

---

### Issue 5: CORS Error

**Symptom:** "Access blocked by CORS policy"

**Solution:**
1. Make sure frontend runs on allowed port (3000, 5173, or 8080)
2. Or add your port to `ALLOWED_ORIGINS` in `/backend/config.py`

---

### Issue 6: Port 8000 in use

**Symptom:** "Address already in use"

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :8000
kill -9 <PID>
```

## 📦 Dependencies

**Python packages (installed automatically):**
- fastapi - Web framework
- uvicorn - ASGI server
- pymysql - MySQL connector
- python-multipart - File upload support

**To install manually:**
```bash
pip install fastapi uvicorn pymysql python-multipart
```

## 🔒 Security Features

1. **Password Protection:** User passwords are automatically removed from API responses
2. **Read-Only Access:** API only reads data, doesn't modify database
3. **CORS Protection:** Only allowed origins can access API
4. **Input Validation:** All inputs validated using Pydantic schemas

## ✅ Verification Checklist

Before starting, ensure:

- [ ] MySQL server is running
- [ ] Database "EduPortal" exists
- [ ] Tables exist: schools, users, students, academic_years
- [ ] Python 3.8+ is installed
- [ ] pip is installed
- [ ] Backend dependencies installed
- [ ] Config.py has correct credentials
- [ ] Test connection passes (`python test_connection.py`)
- [ ] Backend server starts successfully (`python main.py`)
- [ ] API docs accessible (http://localhost:8000/api/docs)
- [ ] Test endpoint works (`/api/v1/data/test-connection`)
- [ ] Can fetch data from each table

## 🎯 Next Steps

1. **Test Connection**
   ```bash
   cd backend
   python test_connection.py
   ```

2. **Start Backend**
   ```bash
   python main.py
   ```

3. **Open API Docs**
   ```
   http://localhost:8000/api/docs
   ```

4. **Test Endpoints**
   - Try `/data/test-connection`
   - Try `/data/schools`
   - Try `/data/students`

5. **Integrate in Frontend**
   - Import `DataFetchDemo` component
   - Or use API service functions from `/services/api.ts`
   - Replace mock data with real API calls

6. **Update Components**
   - StudentManagement → use `fetchStudents()`
   - TeacherManagement → use `fetchTeachers()` (when available)
   - Classes → use `fetchClasses()` (when available)

## 📚 Additional Resources

- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **PyMySQL Docs:** https://pymysql.readthedocs.io/
- **API Testing:** http://localhost:8000/api/docs
- **Backend Quickstart:** `/backend/QUICKSTART.md`
- **Full Integration Guide:** `/MYSQL_DATA_INTEGRATION.md`

## 🎉 Success!

If you've followed the steps above, you now have:

✅ Working connection to your MySQL database (EduPortal)
✅ Backend API running on port 8000
✅ API endpoints for fetching schools, users, students, and academic years
✅ Frontend service functions ready to use
✅ Demo component for testing
✅ Complete documentation

**Your portal is now connected to your MySQL database!** 🚀

---

**Need help?** Check the troubleshooting section or review `/backend/QUICKSTART.md` for detailed instructions.
