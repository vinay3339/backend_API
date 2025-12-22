# Dynamic Schema Evolution Feature

## Overview

The Dynamic Schema Evolution feature automatically detects new fields in API request bodies and adds them as columns to the database tables. This allows you to extend your database schema on-the-fly without manually running ALTER TABLE commands.

## How It Works

When you make a POST (create) or PUT (update) request to the Students or Teachers API endpoints, the system will:

1. **Inspect the request data** - Check all fields in the request body
2. **Compare with existing schema** - Identify fields that don't exist in the database table
3. **Auto-create columns** - Automatically add new columns to the table using ALTER TABLE
4. **Insert/Update data** - Proceed with the normal create or update operation

## Supported Endpoints

### Students API
- `POST /api/students/` - Create student with dynamic schema
- `PUT /api/students/{student_id}` - Update student with dynamic schema

### Teachers API
- `POST /api/teachers/` - Create teacher with dynamic schema
- `PUT /api/teachers/{teacher_id}` - Update teacher with dynamic schema

## Column Type Mapping

The system automatically determines the SQL column type based on the Python value type:

| Python Type | SQL Type | Example |
|-------------|----------|---------|
| `str` (≤ 255 chars) | `VARCHAR(255)` | "John Doe" |
| `str` (> 255 chars) | `TEXT` | Long text content |
| `int` | `INT` | 25 |
| `float` | `FLOAT` | 98.5 |
| `bool` | `TINYINT(1)` | true/false |
| `datetime` | `DATETIME` | "2024-01-15T10:30:00" |
| `date` | `DATE` | "2024-01-15" |
| `None` | `TEXT` | null |

## Protected Fields

The following fields are **protected** and will **NOT** be auto-created:
- `id`
- `created_at`
- `updated_at`
- `hashed_password`

## Usage Examples

### Example 1: Add a New Field to Student

**Request:**
```bash
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "2024001",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "2010-05-15",
    "custom_field_1": "Custom Value",
    "student_talent": "Music",
    "emergency_contact_2": "9876543210"
  }'
```

**What Happens:**
1. System detects `custom_field_1`, `student_talent`, and `emergency_contact_2` don't exist in the `students` table
2. Automatically executes:
   ```sql
   ALTER TABLE students ADD COLUMN custom_field_1 VARCHAR(255) NULL;
   ALTER TABLE students ADD COLUMN student_talent VARCHAR(255) NULL;
   ALTER TABLE students ADD COLUMN emergency_contact_2 VARCHAR(255) NULL;
   ```
3. Inserts the student record with all fields

**Console Output:**
```
Schema evolution: Added columns to 'students' table: ['custom_field_1', 'student_talent', 'emergency_contact_2']
```

### Example 2: Update Teacher with New Field

**Request:**
```bash
curl -X PUT "http://localhost:8000/api/teachers/5" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "certification_status": "Advanced",
    "training_hours": 120,
    "preferred_subjects": "Mathematics, Physics"
  }'
```

**What Happens:**
1. System detects `certification_status`, `training_hours`, and `preferred_subjects` are new fields
2. Automatically adds these columns to the `teachers` table
3. Updates the teacher record with all provided values

### Example 3: Add Numeric and Boolean Fields

**Request:**
```bash
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "2024002",
    "first_name": "Alice",
    "last_name": "Smith",
    "scholarship_amount": 5000.50,
    "is_scholarship_student": true,
    "attendance_percentage": 95.5
  }'
```

**What Happens:**
1. `scholarship_amount` → Creates `FLOAT` column
2. `is_scholarship_student` → Creates `TINYINT(1)` column
3. `attendance_percentage` → Creates `FLOAT` column

## Programmatic Usage

You can also use the dynamic schema utilities in your own code:

```python
from utils.dynamic_schema import auto_evolve_schema, get_dynamic_columns

# Auto-evolve schema for a table
schema_changes = auto_evolve_schema(db, "students", request_data)

# Get list of dynamic columns
dynamic_cols = get_dynamic_columns(db, "students", exclude_standard=True)
```

## Security Considerations

### ⚠️ Important Security Notes

1. **Production Use**: This feature is designed for development and testing. In production, you should:
   - Disable auto-evolution
   - Use proper database migrations (Alembic)
   - Validate and sanitize all input data

2. **Protected Fields**: System automatically blocks certain field names to prevent security issues

3. **SQL Injection Protection**: Field names are validated and sanitized before use in SQL queries

4. **Permission Checks**: All endpoints require proper authentication and role-based access

## Disabling Dynamic Schema Evolution

To disable this feature (recommended for production):

1. **Option 1 - Remove the auto_evolve_schema calls:**
   ```python
   # In students.py and teachers.py, comment out or remove:
   # schema_changes = auto_evolve_schema(db, "students", data_dict)
   ```

2. **Option 2 - Add an environment variable:**
   
   In `backend/config.py`, add:
   ```python
   ENABLE_DYNAMIC_SCHEMA = os.getenv("ENABLE_DYNAMIC_SCHEMA", "false").lower() == "true"
   ```
   
   Then wrap the auto_evolve_schema calls:
   ```python
   from config import ENABLE_DYNAMIC_SCHEMA
   
   if ENABLE_DYNAMIC_SCHEMA:
       schema_changes = auto_evolve_schema(db, "students", data_dict)
   ```

3. **Option 3 - Use Alembic migrations** (recommended for production):
   ```bash
   # Install Alembic
   pip install alembic
   
   # Initialize Alembic
   alembic init alembic
   
   # Create a migration
   alembic revision --autogenerate -m "Add new custom fields"
   
   # Apply migration
   alembic upgrade head
   ```

## Logging and Monitoring

All schema changes are logged to the console. You can enhance logging by modifying `/backend/utils/dynamic_schema.py`:

```python
import logging
logger = logging.getLogger(__name__)

# In add_column_to_table method:
logger.info(f"Successfully added column '{column_name}' ({column_type}) to table '{table_name}'")
```

## Troubleshooting

### Issue: Column not being created

**Cause**: Field name might be in protected list or invalid
**Solution**: Check the field name and ensure it's not in the protected fields list

### Issue: Type mismatch error

**Cause**: Trying to insert wrong data type into an existing column
**Solution**: Ensure consistent data types for the same field across requests

### Issue: Permission denied

**Cause**: Database user doesn't have ALTER TABLE permissions
**Solution**: Grant necessary permissions:
```sql
GRANT ALTER ON eduportal.* TO 'eduportal_user'@'localhost';
FLUSH PRIVILEGES;
```

### Issue: Column already exists error

**Cause**: Attempting to add a column that already exists
**Solution**: The system should handle this automatically. If error persists, check database manually:
```sql
SHOW COLUMNS FROM students;
```

## Best Practices

1. **Testing**: Always test in development environment first
2. **Validation**: Validate data types before sending to API
3. **Documentation**: Document all custom fields you add
4. **Migrations**: For production, use proper migration tools
5. **Backups**: Always backup database before enabling this feature
6. **Field Naming**: Use consistent, descriptive field names
7. **Data Types**: Send correct data types in requests to ensure proper column types

## Performance Considerations

- **First Request**: Adding a new column takes additional time (typically < 100ms)
- **Subsequent Requests**: Normal performance after column is created
- **Table Locks**: ALTER TABLE operations may briefly lock the table
- **Large Tables**: Schema changes on large tables may take longer

## API Response

When a schema change occurs, you'll see the column creation logged in the server console, but the API response remains unchanged - you'll get the standard success response.

## Example Complete Workflow

```bash
# 1. Login to get token
TOKEN=$(curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@school.com&password=Admin@123" | jq -r '.access_token')

# 2. Create student with new custom fields
curl -X POST "http://localhost:8000/api/students/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "2024NEW001",
    "first_name": "Test",
    "last_name": "Student",
    "custom_hobby": "Reading",
    "parent_occupation": "Engineer",
    "sibling_count": 2
  }'

# 3. Verify columns were added
mysql -u eduportal_user -p eduportal -e "SHOW COLUMNS FROM students LIKE 'custom_%';"

# 4. Update student with another new field
curl -X PUT "http://localhost:8000/api/students/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "achievement_awards": "Math Olympiad Gold Medal"
  }'
```

## Summary

The Dynamic Schema Evolution feature provides flexibility during development and testing by automatically adapting your database schema to match API requests. While convenient for rapid prototyping, it should be used with caution and disabled in production environments in favor of proper database migration tools.

For production deployments, always use Alembic or similar migration tools to manage schema changes in a controlled, versioned manner.
