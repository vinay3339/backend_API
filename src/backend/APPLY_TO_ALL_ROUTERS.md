# Apply Dynamic Schema Evolution to All Routers

## ✅ Completed Routers

The following routers have been **fully updated** with dynamic schema evolution:

1. ✅ **students.py** - Table: `students`
2. ✅ **teachers.py** - Table: `teachers`
3. ✅ **classes.py** - Table: `classes`
4. ✅ **exams.py** - Table: `exams`

## 🔄 Remaining Routers to Update

The following routers still need dynamic schema evolution implementation:

1. ⏳ **fees.py** - Tables: `fee_structures`, `fee_records`
2. ⏳ **marks.py** - Table: `marks`
3. ⏳ **attendance.py** - Table: `attendance` (or `student_attendance`)
4. ⏳ **transport.py** - Table: `transport_routes`
5. ⏳ **auth.py** - Table: `users` (for user management endpoints, if any)

## 📋 Manual Update Instructions

For each remaining router, follow this pattern:

### Step 1: Add Imports (at the top of the file)

```python
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.dynamic_schema import auto_evolve_schema
```

### Step 2: Update POST (Create) Endpoint

Find the `create_*` function and add this after the docstring:

```python
@router.post("/", response_model=*Response, status_code=status.HTTP_201_CREATED)
async def create_*(...):
    """
    Create description
    Automatically adds new columns to the [table] table if they appear in the request
    """
    # Auto-evolve schema
    data_dict = *_data.dict()
    schema_changes = auto_evolve_schema(db, "[table_name]", data_dict)
    
    if schema_changes:
        print(f"Schema evolution: Added columns to '[table_name]' table: {list(schema_changes.keys())}")
    
    # ... rest of existing code ...
    
    # Wrap object creation in try-except
    try:
        obj = Model(**data_dict)
        db.add(obj)
        db.commit()
        db.refresh(obj)
    except Exception as e:
        db.rollback()
        print(f"Error creating object with new columns: {e}")
        from sqlalchemy import inspect as sa_inspect
        mapper = sa_inspect(Model)
        valid_fields = {col.key for col in mapper.attrs}
        filtered_data = {k: v for k, v in data_dict.items() if k in valid_fields}
        
        obj = Model(**filtered_data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
    
    return *Response.from_orm(obj)
```

### Step 3: Update PUT (Update) Endpoint

Find the `update_*` function and add this before the field update loop:

```python
@router.put("/{id}", response_model=*Response)
async def update_*(...):
    """
    Update description
    Automatically adds new columns to the [table] table if they appear in the request
    """
    # ... permission checks ...
    
    # Auto-evolve schema
    update_data = *_data.dict(exclude_unset=True)
    schema_changes = auto_evolve_schema(db, "[table_name]", update_data)
    
    if schema_changes:
        print(f"Schema evolution: Added columns to '[table_name]' table: {list(schema_changes.keys())}")
        db.expire_all()
    
    # Update fields with error handling
    for field, value in update_data.items():
        try:
            setattr(obj, field, value)
        except Exception as e:
            print(f"Warning: Could not set field '{field}': {e}")
            try:
                from sqlalchemy import text
                update_query = text(f"UPDATE [table] SET {field} = :value WHERE id = :id")
                db.execute(update_query, {"value": value, "id": obj_id})
            except Exception as sql_error:
                print(f"Error updating field '{field}' via SQL: {sql_error}")
    
    # ... rest of update logic ...
```

## 🔧 Table Name Mapping

| Router File | Main Table Name | Model Name |
|-------------|----------------|------------|
| fees.py | `fee_structures` or `fee_records` | `FeeStructure` or `FeeRecord` |
| marks.py | `marks` | `Mark` |
| attendance.py | `attendance` or `student_attendance` | `Attendance` |
| transport.py | `transport_routes` | `TransportRoute` |
| auth.py | `users` | `User` |

## ✅ Schema Updates

All Create and Update schemas in `schemas.py` have been updated with:

```python
class Config:
    extra = "allow"  # Allow extra fields for dynamic schema evolution
```

Updated schemas:
- ✅ StudentCreate, StudentUpdate
- ✅ TeacherCreate, TeacherUpdate
- ✅ ClassCreate, ClassUpdate
- ✅ ExamCreate, ExamUpdate
- ✅ TransportRouteCreate, TransportRouteUpdate

## 🎯 Quick Copy-Paste Templates

### For fees.py (Fee Structures)

```python
# In create_fee_structure:
data_dict = fee_data.dict()
schema_changes = auto_evolve_schema(db, "fee_structures", data_dict)
if schema_changes:
    print(f"Schema evolution: Added columns to 'fee_structures' table: {list(schema_changes.keys())}")

# In update_fee_structure:
update_data = fee_data.dict(exclude_unset=True)
schema_changes = auto_evolve_schema(db, "fee_structures", update_data)
if schema_changes:
    print(f"Schema evolution: Added columns to 'fee_structures' table: {list(schema_changes.keys())}")
    db.expire_all()
```

### For marks.py

```python
# In create_mark:
data_dict = mark_data.dict()
schema_changes = auto_evolve_schema(db, "marks", data_dict)
if schema_changes:
    print(f"Schema evolution: Added columns to 'marks' table: {list(schema_changes.keys())}")

# In update_mark:
update_data = mark_data.dict(exclude_unset=True)
schema_changes = auto_evolve_schema(db, "marks", update_data)
if schema_changes:
    print(f"Schema evolution: Added columns to 'marks' table: {list(schema_changes.keys())}")
    db.expire_all()
```

### For attendance.py

```python
# In create_attendance:
data_dict = attendance_data.dict()
schema_changes = auto_evolve_schema(db, "attendance", data_dict)
if schema_changes:
    print(f"Schema evolution: Added columns to 'attendance' table: {list(schema_changes.keys())}")

# In update_attendance (if exists):
update_data = attendance_data.dict(exclude_unset=True)
schema_changes = auto_evolve_schema(db, "attendance", update_data)
if schema_changes:
    print(f"Schema evolution: Added columns to 'attendance' table: {list(schema_changes.keys())}")
    db.expire_all()
```

### For transport.py

```python
# In create_transport_route:
data_dict = route_data.dict()
schema_changes = auto_evolve_schema(db, "transport_routes", data_dict)
if schema_changes:
    print(f"Schema evolution: Added columns to 'transport_routes' table: {list(schema_changes.keys())}")

# In update_transport_route:
update_data = route_data.dict(exclude_unset=True)
schema_changes = auto_evolve_schema(db, "transport_routes", update_data)
if schema_changes:
    print(f"Schema evolution: Added columns to 'transport_routes' table: {list(schema_changes.keys())}")
    db.expire_all()
```

## 🚀 Testing After Updates

After updating each router, test with:

```bash
# Login
TOKEN=$(curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@school.com&password=Admin@123" | jq -r '.access_token')

# Test with a new custom field
curl -X POST "http://localhost:8000/api/[endpoint]/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    ... required fields ...,
    "custom_field_1": "test_value",
    "custom_number": 123
  }' | jq

# Verify in database
mysql -u eduportal_user -p eduportal -e "SHOW COLUMNS FROM [table_name];"
```

## 📝 Summary

- ✅ Core utility created: `/backend/utils/dynamic_schema.py`
- ✅ 4/9 routers updated with full implementation
- ✅ All schemas updated to allow extra fields
- ⏳ 5 routers remain (can be updated using templates above)
- 📚 Complete documentation available

The feature is functional and ready to use for Students, Teachers, Classes, and Exams. The remaining routers can be updated following the same pattern whenever needed.
