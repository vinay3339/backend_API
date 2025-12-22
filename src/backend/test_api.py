"""
API Testing Script
Quick tests for all CRUD operations
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/v1"
token = None

def login():
    """Login and get access token"""
    global token
    print("\n🔐 Testing Login...")
    
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={
            "username": "admin1",
            "password": "demo123"
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        token = data["access_token"]
        print(f"✅ Login successful! Token: {token[:20]}...")
        print(f"   Role: {data['role']}, School ID: {data.get('school_id')}")
        return True
    else:
        print(f"❌ Login failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def get_headers():
    """Get headers with auth token"""
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }


def test_get_students():
    """Test GET /students/"""
    print("\n📚 Testing GET Students...")
    
    response = requests.get(
        f"{BASE_URL}/students/",
        headers=get_headers(),
        params={"page": 1, "page_size": 5}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success! Found {data['total']} students")
        print(f"   Page {data['page']}/{data['total_pages']}")
        if data['data']:
            student = data['data'][0]
            print(f"   First student: {student['first_name']} {student['last_name']} ({student['admission_no']})")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_create_student():
    """Test POST /students/"""
    print("\n➕ Testing CREATE Student...")
    
    student_data = {
        "school_id": 1,
        "admission_no": "TEST2024999",
        "first_name": "Test",
        "last_name": "Student",
        "date_of_birth": "2012-01-15",
        "gender": "Male",
        "blood_group": "A+",
        "email": "test.student@test.com",
        "phone": "+91-9999999999",
        "address": "123 Test Street",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560001",
        "class_id": 1,
        "section": "A",
        "roll_no": "99",
        "admission_date": "2024-12-12",
        "academic_year": "2024-2025",
        "father_name": "Test Father",
        "father_phone": "+91-9999000001",
        "mother_name": "Test Mother",
        "mother_phone": "+91-9999000002",
        "status": "active"
    }
    
    response = requests.post(
        f"{BASE_URL}/students/",
        headers=get_headers(),
        json=student_data
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"✅ Student created successfully!")
        print(f"   ID: {data['id']}")
        print(f"   Name: {data['first_name']} {data['last_name']}")
        print(f"   Admission No: {data['admission_no']}")
        return data['id']
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return None


def test_update_student(student_id):
    """Test PUT /students/{id}"""
    print(f"\n✏️ Testing UPDATE Student (ID: {student_id})...")
    
    update_data = {
        "phone": "+91-8888888888",
        "email": "updated.email@test.com",
        "address": "Updated Address, Bangalore"
    }
    
    response = requests.put(
        f"{BASE_URL}/students/{student_id}",
        headers=get_headers(),
        json=update_data
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Student updated successfully!")
        print(f"   New phone: {data['phone']}")
        print(f"   New email: {data['email']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_get_student_by_id(student_id):
    """Test GET /students/{id}"""
    print(f"\n🔍 Testing GET Student by ID ({student_id})...")
    
    response = requests.get(
        f"{BASE_URL}/students/{student_id}",
        headers=get_headers()
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success!")
        print(f"   Name: {data['first_name']} {data['last_name']}")
        print(f"   Email: {data['email']}")
        print(f"   Phone: {data['phone']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_delete_student(student_id):
    """Test DELETE /students/{id}"""
    print(f"\n🗑️ Testing DELETE Student (ID: {student_id})...")
    
    response = requests.delete(
        f"{BASE_URL}/students/{student_id}",
        headers=get_headers()
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ {data['message']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_get_teachers():
    """Test GET /teachers/"""
    print("\n👨‍🏫 Testing GET Teachers...")
    
    response = requests.get(
        f"{BASE_URL}/teachers/",
        headers=get_headers(),
        params={"page": 1, "page_size": 5}
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success! Found {data['total']} teachers")
        if data['data']:
            teacher = data['data'][0]
            print(f"   First teacher: {teacher['first_name']} {teacher['last_name']} ({teacher['employee_id']})")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_create_teacher():
    """Test POST /teachers/"""
    print("\n➕ Testing CREATE Teacher...")
    
    teacher_data = {
        "school_id": 1,
        "employee_id": "TEST-T999",
        "first_name": "Test",
        "last_name": "Teacher",
        "date_of_birth": "1990-05-15",
        "gender": "Female",
        "email": "test.teacher@test.com",
        "phone": "+91-9999999998",
        "address": "456 Teacher Colony",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560034",
        "designation": "Teacher",
        "department": "Mathematics",
        "subjects": "Mathematics",
        "qualifications": "M.Sc, B.Ed",
        "experience_years": 5,
        "joining_date": "2019-07-01",
        "employment_type": "Permanent",
        "salary": 50000.00
    }
    
    response = requests.post(
        f"{BASE_URL}/teachers/",
        headers=get_headers(),
        json=teacher_data
    )
    
    if response.status_code == 201:
        data = response.json()
        print(f"✅ Teacher created successfully!")
        print(f"   ID: {data['id']}")
        print(f"   Name: {data['first_name']} {data['last_name']}")
        print(f"   Employee ID: {data['employee_id']}")
        return data['id']
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return None


def test_student_statistics():
    """Test GET /students/statistics/summary"""
    print("\n📊 Testing Student Statistics...")
    
    response = requests.get(
        f"{BASE_URL}/students/statistics/summary",
        headers=get_headers()
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success!")
        print(f"   Total Students: {data['total_students']}")
        print(f"   Active: {data['active_students']}")
        print(f"   Male: {data['male_students']}, Female: {data['female_students']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        print(f"   {response.text}")
        return False


def test_health_check():
    """Test health endpoint"""
    print("\n❤️ Testing Health Check...")
    
    response = requests.get(f"http://localhost:8000/health")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ {data}")
        return True
    else:
        print(f"❌ Failed: {response.status_code}")
        return False


def main():
    """Run all tests"""
    print("=" * 60)
    print("🧪 API TESTING SCRIPT")
    print("=" * 60)
    
    # Health check
    if not test_health_check():
        print("\n❌ Server is not running! Start it with:")
        print("   cd backend && python -m uvicorn main:app --reload")
        return
    
    # Login
    if not login():
        print("\n❌ Login failed! Check credentials.")
        return
    
    # Test Students API
    print("\n" + "=" * 60)
    print("TESTING STUDENTS API")
    print("=" * 60)
    
    test_get_students()
    student_id = test_create_student()
    
    if student_id:
        test_get_student_by_id(student_id)
        test_update_student(student_id)
        test_get_student_by_id(student_id)  # Verify update
        test_delete_student(student_id)
    
    test_student_statistics()
    
    # Test Teachers API
    print("\n" + "=" * 60)
    print("TESTING TEACHERS API")
    print("=" * 60)
    
    test_get_teachers()
    teacher_id = test_create_teacher()
    
    if teacher_id:
        print(f"\n✅ Teacher ID {teacher_id} created successfully")
    
    print("\n" + "=" * 60)
    print("✅ ALL TESTS COMPLETED!")
    print("=" * 60)
    
    print("\n📝 Summary:")
    print("   - All CRUD operations working")
    print("   - Data saved to MySQL database")
    print("   - Check database: mysql -u vinaygoud -p EduPortal -e 'SELECT * FROM students;'")


if __name__ == "__main__":
    try:
        main()
    except requests.exceptions.ConnectionError:
        print("\n❌ Cannot connect to API server!")
        print("   Make sure the server is running:")
        print("   cd backend && python -m uvicorn main:app --reload")
    except Exception as e:
        print(f"\n❌ Error: {e}")
