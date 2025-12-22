# Quick Start Guide - MySQL Data Fetching

This guide will help you fetch data from your MySQL database (EduPortal) and display it in the frontend.

## 🎯 Your Database Configuration

Your MySQL credentials (already configured in `/backend/config.py`):
- **Host:** 127.0.0.1
- **Port:** 3306
- **User:** vinaygoud
- **Password:** vinay3339
- **Database:** EduPortal

## 📋 Prerequisites

1. **MySQL Server Running**
   ```bash
   # Check if MySQL is running
   mysql -u vinaygoud -p
   # Enter password: vinay3339
   # Then run: SHOW DATABASES;
   ```

2. **Python 3.8+ Installed**
   ```bash
   python --version
   ```

3. **pip (Python Package Manager)**
   ```bash
   pip --version
   ```

## 🚀 Setup Steps

### Step 1: Install Python Dependencies

```bash
cd backend
pip install fastapi uvicorn pymysql python-multipart
```

Or install all dependencies:
```bash
pip install -r requirements.txt
```

### Step 2: Test Database Connection

Run the standalone fetch script:

```bash
cd backend
python fetch_data.py
```

This will:
- Connect to your MySQL database
- Fetch data from: schools, users, students, academic_years
- Display the count of records
- Save data to `database_data.json`

**Expected Output:**
```
Connecting to database...
Database: EduPortal
Host: 127.0.0.1
User: vinaygoud
--------------------------------------------------
✓ Fetched X schools
✓ Fetched X users
✓ Fetched X students
✓ Fetched X academic years
--------------------------------------------------
Data fetch complete!
Data saved to database_data.json
```

### Step 3: Start the Backend API Server

```bash
cd backend
python main.py
```

The API will be available at: `http://localhost:8000`

**Expected Output:**
```
Starting School Management System v1.0.0
Database URL: 127.0.0.1:3306/EduPortal
INFO:     Started server process [xxxxx]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 4: Test API Endpoints

#### Test Connection
```bash
curl http://localhost:8000/api/v1/data/test-connection
```

**Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "database": "EduPortal",
  "version": "8.0.x"
}
```

#### Fetch All Schools
```bash
curl http://localhost:8000/api/v1/data/schools
```

#### Fetch All Students
```bash
curl http://localhost:8000/api/v1/data/students
```

#### Fetch All Users
```bash
curl http://localhost:8000/api/v1/data/users
```

#### Fetch All Academic Years
```bash
curl http://localhost:8000/api/v1/data/academic-years
```

#### Fetch All Data at Once
```bash
curl http://localhost:8000/api/v1/data/all
```

### Step 5: View API Documentation

Open in browser:
- **Swagger UI:** http://localhost:8000/api/docs
- **ReDoc:** http://localhost:8000/api/redoc

## 🎨 Frontend Integration

### Option 1: Use the Demo Component

1. The demo component is already created at `/components/DataFetchDemo.tsx`
2. Import it in your main App:

```tsx
import { DataFetchDemo } from './components/DataFetchDemo';

// In your routing or main component:
<DataFetchDemo />
```

### Option 2: Use the API Service Directly

```tsx
import { fetchStudents, fetchSchools } from './services/api';

// In your component:
const [students, setStudents] = useState([]);

useEffect(() => {
  async function loadStudents() {
    const result = await fetchStudents();
    setStudents(result.data);
  }
  loadStudents();
}, []);
```

## 📊 Available API Endpoints

### Data Sync Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/data/test-connection` | Test database connection |
| GET | `/api/v1/data/all` | Fetch all data (schools, users, students, academic_years) |
| GET | `/api/v1/data/schools` | Fetch all schools |
| GET | `/api/v1/data/schools/{id}` | Fetch specific school |
| GET | `/api/v1/data/users` | Fetch all users (passwords removed) |
| GET | `/api/v1/data/students` | Fetch all students |
| GET | `/api/v1/data/students/{id}` | Fetch specific student |
| GET | `/api/v1/data/students/by-class/{class_id}` | Fetch students by class |
| GET | `/api/v1/data/students/search` | Search students with filters |
| GET | `/api/v1/data/academic-years` | Fetch all academic years |

### Search Students Example

```bash
# Search by name
curl "http://localhost:8000/api/v1/data/students/search?search=John"

# Filter by class and section
curl "http://localhost:8000/api/v1/data/students/search?class_id=10&section=A"

# Multiple filters
curl "http://localhost:8000/api/v1/data/students/search?search=Kumar&class_id=10&status=active"
```

## 🔍 Troubleshooting

### Error: Connection refused

**Problem:** Backend server is not running

**Solution:**
```bash
cd backend
python main.py
```

### Error: Access denied for user

**Problem:** MySQL credentials are incorrect

**Solution:** Check `/backend/config.py` and verify:
- DB_HOST = "127.0.0.1"
- DB_USER = "vinaygoud"
- DB_PASSWORD = "vinay3339"
- DB_NAME = "EduPortal"

### Error: Unknown database 'EduPortal'

**Problem:** Database doesn't exist

**Solution:**
```sql
mysql -u vinaygoud -p
-- Enter password
CREATE DATABASE EduPortal;
```

### Error: Table doesn't exist

**Problem:** Tables don't exist in database

**Solution:** Make sure your MySQL database has these tables:
- schools
- users
- students
- academic_years

Check with:
```sql
USE EduPortal;
SHOW TABLES;
```

### Port 8000 already in use

**Solution:** Use a different port
```bash
python main.py --port 8001
```

Or find and kill the process:
```bash
# Mac/Linux
lsof -i :8000
kill -9 <PID>

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

## 📝 Example: Fetching Students for Your Portal

Here's how to update your Student Management component to use real data:

```tsx
import React, { useState, useEffect } from 'react';
import { fetchStudents } from '../services/api';

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const result = await fetchStudents();
      setStudents(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Students ({students.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Admission No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.admission_no}</td>
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.class_id}</td>
              <td>{student.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## 🎯 Next Steps

1. **Test the connection:** Run `python backend/fetch_data.py`
2. **Start the API:** Run `python backend/main.py`
3. **Test in browser:** Open http://localhost:8000/api/docs
4. **Integrate in frontend:** Use the DataFetchDemo component or API service
5. **Update existing components:** Replace mock data with real API calls

## 📚 Additional Resources

- FastAPI Documentation: https://fastapi.tiangolo.com/
- PyMySQL Documentation: https://pymysql.readthedocs.io/
- API Testing: http://localhost:8000/api/docs

## ⚠️ Important Notes

1. **Security:** Passwords are automatically removed from user data in API responses
2. **CORS:** Frontend must run on localhost:3000, localhost:5173, or localhost:8080
3. **Database:** Only reads data, does not modify your existing MySQL database
4. **Tables Required:** Make sure you have these tables in your EduPortal database:
   - schools
   - users
   - students
   - academic_years

## 🆘 Need Help?

If you encounter any issues:
1. Check if MySQL server is running
2. Verify credentials in `/backend/config.py`
3. Ensure all required Python packages are installed
4. Check backend console for error messages
5. Test each endpoint individually in the Swagger UI
