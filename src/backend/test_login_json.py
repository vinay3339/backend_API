"""
Test JSON Login - Quick verification script
"""
import requests
import json

print("=" * 60)
print("🧪 TESTING JSON LOGIN")
print("=" * 60)

# Test JSON login endpoint
print("\n📝 Test 1: JSON Login (/auth/login-json)")
print("-" * 60)

url = "http://localhost:8000/api/v1/auth/login-json"
payload = {
    "username": "admin",
    "password": "demo123"
}

try:
    response = requests.post(url, json=payload)
    
    print(f"URL: {url}")
    print(f"Request: {json.dumps(payload, indent=2)}")
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Token: {data['access_token'][:50]}...")
        print(f"Role: {data['role']}")
        print(f"School ID: {data.get('school_id')}")
        
        # Test using the token
        print("\n" + "=" * 60)
        print("📝 Test 2: Using Token to Get Students")
        print("-" * 60)
        
        token = data['access_token']
        headers = {
            'Authorization': f'Bearer {token}'
        }
        
        students_response = requests.get(
            'http://localhost:8000/api/v1/students/?page=1&page_size=5',
            headers=headers
        )
        
        if students_response.status_code == 200:
            students_data = students_response.json()
            print(f"✅ SUCCESS! Found {students_data['total']} students")
            print(f"Page: {students_data['page']}/{students_data['total_pages']}")
        else:
            print(f"❌ FAILED: {students_response.status_code}")
            print(students_response.text)
        
    else:
        print(f"\n❌ FAILED!")
        print(f"Response: {response.text}")
        
except requests.exceptions.ConnectionError:
    print("❌ Cannot connect to server!")
    print("Make sure backend is running:")
    print("  cd backend && python -m uvicorn main:app --reload")
except Exception as e:
    print(f"❌ Error: {e}")

# Test form login endpoint
print("\n" + "=" * 60)
print("📝 Test 3: Form Login (/auth/login)")
print("-" * 60)

url_form = "http://localhost:8000/api/v1/auth/login"
form_data = {
    "username": "admin",
    "password": "demo123"
}

try:
    response = requests.post(url_form, data=form_data)  # Use 'data' for form
    
    print(f"URL: {url_form}")
    print(f"Request: username={form_data['username']}&password=***")
    print(f"\nStatus Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Token: {data['access_token'][:50]}...")
        print(f"Role: {data['role']}")
    else:
        print(f"\n❌ FAILED!")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 60)
print("✅ TESTING COMPLETE!")
print("=" * 60)
print("\n📚 Summary:")
print("  ✅ /auth/login-json - Use with JSON body")
print("  ✅ /auth/login - Use with form-data")
print("\n💡 Recommended: Use /auth/login-json for modern apps")