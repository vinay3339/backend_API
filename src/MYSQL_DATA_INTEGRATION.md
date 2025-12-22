# MySQL Data Integration - Complete Guide

This document explains how to fetch data from your MySQL database (EduPortal) and populate it in the school management portal.

## 📁 Files Created

### Backend Files
1. **`/backend/config.py`** - Database configuration (already updated with your credentials)
2. **`/backend/fetch_data.py`** - Standalone script to fetch data from MySQL
3. **`/backend/test_connection.py`** - Test database connection
4. **`/backend/routers/data_sync.py`** - API endpoints for data fetching
5. **`/backend/main.py`** - Updated to include data sync router

### Frontend Files
6. **`/services/api.ts`** - API service functions for frontend
7. **`/components/DataFetchDemo.tsx`** - Demo component to test data fetching

### Documentation
8. **`/backend/QUICKSTART.md`** - Detailed setup instructions
9. **`/MYSQL_DATA_INTEGRATION.md`** - This file

## 🎯 Your Database Configuration

**Already configured in `/backend/config.py`:**
```python
DB_HOST = "127.0.0.1"
DB_PORT = 3306
DB_USER = "vinaygoud"
DB_PASSWORD = "vinay3339"
DB_NAME = "EduPortal"
```

## 🚀 Quick Start (3 Steps)

### Step 1: Test Database Connection

```bash
cd backend
python test_connection.py
```

**This will:**
- ✅ Test connection to your MySQL database
- ✅ Show MySQL version
- ✅ List all tables in EduPortal database
- ✅ Check if required tables exist (schools, users, students, academic_years)
- ✅ Count records in each table

### Step 2: Start the Backend API

```bash
cd backend
python main.py
```

**Expected output:**
```
Starting School Management System v1.0.0
Database URL: 127.0.0.1:3306/EduPortal
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Test in Browser

Open: **http://localhost:8000/api/docs**

Try these endpoints:
1. `/api/v1/data/test-connection` - Test connection
2. `/api/v1/data/schools` - Get all schools
3. `/api/v1/data/users` - Get all users
4. `/api/v1/data/students` - Get all students
5. `/api/v1/data/academic-years` - Get academic years

## 📊 API Endpoints Created

### Base URL: `http://localhost:8000/api/v1/data`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/test-connection` | GET | Test database connection |
| `/all` | GET | Fetch all data at once |
| `/schools` | GET | Fetch all schools |
| `/schools/{id}` | GET | Fetch specific school |
| `/users` | GET | Fetch all users |
| `/students` | GET | Fetch all students |
| `/students/{id}` | GET | Fetch specific student |
| `/students/by-class/{class_id}` | GET | Students by class |
| `/students/search` | GET | Search students |
| `/academic-years` | GET | Fetch academic years |

## 💻 Frontend Integration

### Option 1: Use the Demo Component

```tsx
import { DataFetchDemo } from './components/DataFetchDemo';

function App() {
  return <DataFetchDemo />;
}
```

The demo component provides:
- ✅ Database connection status
- ✅ Tabs for each data type
- ✅ Fetch buttons
- ✅ JSON data display
- ✅ Record counts
- ✅ Error handling

### Option 2: Use API Service in Your Components

```tsx
import { fetchStudents, fetchSchools } from './services/api';

// In your component
const [students, setStudents] = useState([]);

useEffect(() => {
  async function loadData() {
    const result = await fetchStudents();
    setStudents(result.data);
  }
  loadData();
}, []);
```

## 🔄 Example: Update Student Management Component

Replace mock data with real database data:

```tsx
import React, { useState, useEffect } from 'react';
import { fetchStudents, searchStudents } from '../services/api';

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const result = await fetchStudents();
      setStudents(result.data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    const result = await searchStudents({ search: searchTerm });
    setStudents(result.data);
  };

  if (loading) {
    return <div>Loading students from database...</div>;
  }

  return (
    <div>
      <h2>Students ({students.length})</h2>
      {/* Your existing UI code */}
      <table>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.admission_no}</td>
            <td>{student.first_name} {student.last_name}</td>
            <td>{student.class_id}</td>
            <td>{student.section}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
```

## 📋 Available API Functions

From `/services/api.ts`:

```typescript
// Test connection
await testConnection();

// Fetch all data at once
await fetchAllData();

// Fetch individual tables
await fetchSchools();
await fetchUsers();
await fetchStudents();
await fetchAcademicYears();

// Fetch specific records
await fetchStudentById(123);
await fetchSchoolById(1);

// Search with filters
await searchStudents({
  search: 'John',
  class_id: 10,
  section: 'A',
  status: 'active'
});

// Students by class
await fetchStudentsByClass(10, 'A');
```

## 🔍 Testing & Verification

### Test 1: Connection Test
```bash
curl http://localhost:8000/api/v1/data/test-connection
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "database": "EduPortal",
  "version": "8.0.x"
}
```

### Test 2: Fetch Students
```bash
curl http://localhost:8000/api/v1/data/students
```

**Expected Response:**
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
      "class_id": 10,
      "section": "A",
      ...
    }
  ]
}
```

### Test 3: Search Students
```bash
curl "http://localhost:8000/api/v1/data/students/search?search=Kumar&class_id=10"
```

## 🛠️ Troubleshooting

### Issue 1: "Connection refused"
**Solution:** Start the backend server
```bash
cd backend
python main.py
```

### Issue 2: "Access denied for user"
**Solution:** Check credentials in `/backend/config.py`

### Issue 3: "Unknown database 'EduPortal'"
**Solution:** Create the database
```sql
CREATE DATABASE EduPortal;
```

### Issue 4: "Table doesn't exist"
**Solution:** Verify tables exist
```sql
USE EduPortal;
SHOW TABLES;
```

Required tables:
- schools
- users  
- students
- academic_years

### Issue 5: CORS Error in Frontend
**Solution:** Make sure frontend runs on:
- http://localhost:3000
- http://localhost:5173
- http://localhost:8080

Or add your port to `ALLOWED_ORIGINS` in `/backend/config.py`

## 📦 Python Dependencies

If you haven't installed dependencies yet:

```bash
cd backend
pip install fastapi uvicorn pymysql python-multipart
```

Or install everything:
```bash
pip install -r requirements.txt
```

## 🎨 Frontend Usage Examples

### Example 1: Display Schools
```tsx
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
```

### Example 2: Student Search
```tsx
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);

const handleSearch = async () => {
  const result = await searchStudents({ search: searchTerm });
  setResults(result.data);
};

return (
  <div>
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search students..."
    />
    <button onClick={handleSearch}>Search</button>
    
    <div>
      {results.map(student => (
        <div key={student.id}>
          {student.first_name} {student.last_name}
        </div>
      ))}
    </div>
  </div>
);
```

### Example 3: Class-wise Students
```tsx
const [classId, setClassId] = useState(10);
const [section, setSection] = useState('A');
const [students, setStudents] = useState([]);

useEffect(() => {
  fetchStudentsByClass(classId, section).then(result => {
    setStudents(result.data);
  });
}, [classId, section]);
```

## 🔒 Security Notes

1. **Passwords Removed:** The API automatically removes password fields from user data
2. **Read-Only:** These endpoints only READ data, they don't modify your database
3. **CORS Protected:** Only allowed origins can access the API
4. **Production:** Use environment variables for credentials in production

## 📈 Data Flow

```
MySQL Database (EduPortal)
         ↓
Python Backend API (FastAPI)
         ↓
REST API Endpoints
         ↓
Frontend API Service (api.ts)
         ↓
React Components
```

## ✅ Verification Checklist

- [ ] MySQL server is running
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Connection test passes (`python test_connection.py`)
- [ ] Backend server running (`python main.py`)
- [ ] API docs accessible (http://localhost:8000/api/docs)
- [ ] Test connection endpoint works
- [ ] Can fetch schools data
- [ ] Can fetch students data
- [ ] Can fetch users data
- [ ] Can fetch academic years data
- [ ] Frontend can call API (no CORS errors)

## 🎯 Next Steps

1. ✅ Test connection: `python backend/test_connection.py`
2. ✅ Start backend: `python backend/main.py`
3. ✅ Open API docs: http://localhost:8000/api/docs
4. ✅ Test endpoints in Swagger UI
5. ✅ Integrate DataFetchDemo component in your app
6. ✅ Replace mock data in your components with real API calls
7. ✅ Update Student Management to use `fetchStudents()`
8. ✅ Update other components similarly

## 📞 Support

If you encounter issues:
1. Check the backend console for error messages
2. Verify MySQL credentials in `/backend/config.py`
3. Test with `curl` commands first
4. Check API documentation at http://localhost:8000/api/docs
5. Review `/backend/QUICKSTART.md` for detailed instructions

---

**You're all set!** 🎉 Your backend is configured to fetch data from your MySQL database (EduPortal) with credentials:
- User: vinaygoud
- Database: EduPortal
- Tables: schools, users, students, academic_years
