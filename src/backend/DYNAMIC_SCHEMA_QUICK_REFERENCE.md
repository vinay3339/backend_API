# Dynamic Schema Evolution - Quick Reference

## 🚀 Quick Start

### What It Does
Automatically adds new database columns when you include new fields in your API requests.

### Supported Operations
- ✅ `POST /api/students/` - Create student
- ✅ `PUT /api/students/{id}` - Update student
- ✅ `POST /api/teachers/` - Create teacher
- ✅ `PUT /api/teachers/{id}` - Update teacher

## 📋 Common Use Cases

### Add Custom Field to Student
```bash
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "2024001",
    "first_name": "John",
    "last_name": "Doe",
    "custom_field_name": "Custom Value"  # ← New field auto-creates column
  }'
```

### Add Multiple Custom Fields
```bash
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "2024002",
    "first_name": "Alice",
    "last_name": "Smith",
    "student_hobby": "Music",              # ← VARCHAR(255)
    "scholarship_amount": 5000.50,         # ← FLOAT
    "is_scholarship": true,                # ← TINYINT(1)
    "parent_occupation": "Engineer",       # ← VARCHAR(255)
    "special_notes": "Very long text..."   # ← TEXT
  }'
```

### Update Teacher with New Field
```bash
curl -X PUT "http://localhost:8000/api/teachers/5" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "certification_level": "Advanced",     # ← New column created
    "training_hours": 120                  # ← New INT column
  }'
```

## 🔧 Data Type Mapping

| Your Data | Column Type Created |
|-----------|---------------------|
| `"text"` | VARCHAR(255) |
| `"very long text..."` | TEXT |
| `123` | INT |
| `123.45` | FLOAT |
| `true` or `false` | TINYINT(1) |
| `"2024-01-15"` | DATE |
| `null` | TEXT (nullable) |

## 🛡️ Protected Fields (Won't Auto-Create)

- `id`
- `created_at`
- `updated_at`
- `hashed_password`

## ⚙️ Configuration

### Enable/Disable Feature

**To Disable (for Production):**

Edit `/backend/routers/students.py` and `/backend/routers/teachers.py`:

```python
# Comment out these lines in POST and PUT endpoints:
# schema_changes = auto_evolve_schema(db, "students", data_dict)
```

**Or use Environment Variable:**

```bash
# In .env file
ENABLE_DYNAMIC_SCHEMA=false

# In code (add to students.py and teachers.py)
from config import ENABLE_DYNAMIC_SCHEMA

if ENABLE_DYNAMIC_SCHEMA:
    schema_changes = auto_evolve_schema(db, "students", data_dict)
```

## 🔍 Verify Changes

### Check What Columns Were Added
```bash
# MySQL
mysql -u eduportal_user -p eduportal -e "SHOW COLUMNS FROM students;"

# Or check specific columns
mysql -u eduportal_user -p eduportal -e "SHOW COLUMNS FROM students LIKE 'custom_%';"
```

### View Schema Changes in Console
When the API runs, you'll see output like:
```
Schema evolution: Added columns to 'students' table: ['custom_hobby', 'scholarship_amount']
```

## 📊 Testing Examples

### Test with curl
```bash
# 1. Login
TOKEN=$(curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@school.com&password=Admin@123" | jq -r '.access_token')

# 2. Create student with custom fields
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "TEST001",
    "first_name": "Test",
    "last_name": "User",
    "my_custom_field": "Test Value",
    "another_field": 100
  }'

# 3. Verify in database
mysql -u eduportal_user -p eduportal -e "SELECT my_custom_field, another_field FROM students WHERE admission_no='TEST001';"
```

### Test with Python
```python
import requests

# Login
login_response = requests.post(
    "http://localhost:8000/api/auth/login",
    data={"username": "admin@school.com", "password": "Admin@123"}
)
token = login_response.json()["access_token"]

# Create student with custom fields
headers = {"Authorization": f"Bearer {token}"}
student_data = {
    "school_id": 1,
    "admission_no": "PYTHON001",
    "first_name": "Python",
    "last_name": "Test",
    "custom_field_1": "Value 1",
    "custom_field_2": 42,
    "is_custom": True
}

response = requests.post(
    "http://localhost:8000/api/students/",
    headers=headers,
    json=student_data
)
print(response.json())
```

## ⚠️ Important Notes

### Development vs Production

| Environment | Recommendation |
|-------------|----------------|
| **Development** | ✅ Enable - Great for rapid prototyping |
| **Testing** | ✅ Enable - Good for schema exploration |
| **Staging** | ⚠️ Use with caution - Document changes |
| **Production** | ❌ Disable - Use Alembic migrations instead |

### Best Practices

1. **Naming**: Use descriptive, consistent field names
   ```json
   ✅ "student_hobby": "Music"
   ✅ "parent_occupation": "Engineer"
   ❌ "f1": "Music"
   ❌ "data": "Engineer"
   ```

2. **Data Types**: Send correct types
   ```json
   ✅ "age": 15                    # INT
   ✅ "gpa": 3.85                  # FLOAT
   ✅ "is_active": true            # TINYINT
   ❌ "age": "15"                  # Would create VARCHAR
   ```

3. **Documentation**: Keep track of custom fields you add
   ```bash
   # Create a fields tracking file
   echo "custom_hobby - Student's hobby (VARCHAR)" >> custom_fields.txt
   ```

## 🔧 Troubleshooting

### Column Not Created?
- Check if field name is in protected list
- Check console for error messages
- Verify database permissions

### Type Mismatch Error?
- Ensure consistent data types across requests
- First request determines the column type

### Permission Denied?
```sql
-- Grant ALTER permission
GRANT ALTER ON eduportal.* TO 'eduportal_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📝 Example Workflow: Adding Student Custom Fields

```bash
# Step 1: Check current schema
mysql -u eduportal_user -p eduportal -e "DESCRIBE students;"

# Step 2: Login to API
TOKEN=$(curl -s -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@school.com&password=Admin@123" | jq -r '.access_token')

# Step 3: Create student with new fields
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "NEW2024001",
    "first_name": "John",
    "last_name": "Doe",
    "student_talent": "Music",
    "emergency_contact_name": "Jane Doe",
    "emergency_contact_phone": "9876543210"
  }' | jq

# Step 4: Verify new columns
mysql -u eduportal_user -p eduportal -e "DESCRIBE students;" | grep -E "(student_talent|emergency_)"

# Step 5: Retrieve student data
curl -X GET "http://localhost:8000/api/students/1" \
  -H "Authorization: Bearer $TOKEN" | jq
```

## 🎯 Summary

| Feature | Status |
|---------|--------|
| Auto-create columns | ✅ Enabled |
| Supports Students API | ✅ Yes |
| Supports Teachers API | ✅ Yes |
| Type inference | ✅ Automatic |
| Production ready | ⚠️ Use migrations instead |
| Requires permissions | ✅ ALTER TABLE needed |

---

**Need More Info?** See the full documentation in `DYNAMIC_SCHEMA_EVOLUTION.md`
