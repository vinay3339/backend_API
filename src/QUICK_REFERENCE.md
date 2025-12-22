# 🚀 Quick Reference - MySQL Data Integration

## 🎯 Your Configuration

```
Database: EduPortal
Host:     127.0.0.1:3306
User:     vinaygoud
Password: vinay3339
```

## ⚡ Quick Commands

### Start Everything (Automated)

**Windows:**
```bash
cd backend
start.bat
```

**Mac/Linux:**
```bash
cd backend
./start.sh
```

### Manual Steps

```bash
# 1. Test connection
cd backend
python test_connection.py

# 2. Start API
python main.py

# 3. Open browser
# http://localhost:8000/api/docs
```

## 📊 API Endpoints

```
Base: http://localhost:8000/api/v1/data

GET  /test-connection              Test DB connection
GET  /all                          Get all data
GET  /schools                      Get all schools
GET  /users                        Get all users
GET  /students                     Get all students
GET  /academic-years               Get academic years
GET  /students/search?search=John  Search students
GET  /students/by-class/{id}       Students by class
```

## 💻 Frontend Usage

```tsx
// Import
import { fetchStudents, fetchSchools } from './services/api';

// Fetch students
const result = await fetchStudents();
setStudents(result.data);

// Search students
const result = await searchStudents({ search: 'John' });

// Use demo component
import { DataFetchDemo } from './components/DataFetchDemo';
<DataFetchDemo />
```

## 🧪 Quick Tests

```bash
# Test 1: Connection
curl http://localhost:8000/api/v1/data/test-connection

# Test 2: Get students
curl http://localhost:8000/api/v1/data/students

# Test 3: Get schools
curl http://localhost:8000/api/v1/data/schools

# Test 4: Search
curl "http://localhost:8000/api/v1/data/students/search?search=Kumar"
```

## 🛠️ Common Issues

| Issue | Solution |
|-------|----------|
| Connection refused | `python main.py` |
| Access denied | Check config.py credentials |
| Unknown database | `CREATE DATABASE EduPortal;` |
| Table not found | Verify tables exist in DB |
| CORS error | Check frontend port (3000/5173/8080) |
| Port in use | Kill process on port 8000 |

## 📁 Key Files

```
/backend/
  config.py          - Your DB credentials
  test_connection.py - Test DB
  main.py            - Start API server
  start.sh/bat       - Auto-start script
  
/services/
  api.ts             - API functions
  
/components/
  DataFetchDemo.tsx  - Demo UI
```

## ✅ Checklist

- [ ] MySQL running
- [ ] Database "EduPortal" exists
- [ ] Tables: schools, users, students, academic_years
- [ ] `python test_connection.py` passes
- [ ] `python main.py` starts server
- [ ] http://localhost:8000/api/docs opens
- [ ] `/test-connection` endpoint works
- [ ] Can fetch data

## 🎯 Integration Steps

1. **Backend:** `cd backend && python main.py`
2. **Test:** Open http://localhost:8000/api/docs
3. **Frontend:** Import DataFetchDemo or use api.ts
4. **Replace:** Update components to use fetchStudents(), etc.

## 📚 Documentation

- `README_DATABASE_INTEGRATION.md` - Complete guide
- `backend/QUICKSTART.md` - Detailed setup
- `MYSQL_DATA_INTEGRATION.md` - Full integration docs
- `backend/test_connection.py` - Connection tester
- http://localhost:8000/api/docs - API documentation

## 🎉 Success Indicators

✅ Connection test passes
✅ API docs page loads
✅ Can see data in Swagger UI
✅ Frontend calls work
✅ No CORS errors
✅ Students data displays

---

**Everything ready!** Your portal is now connected to MySQL database (EduPortal) 🚀
