"""
Script to fetch data from MySQL database
Fetches: students, users, schools, academic_years tables
"""
import pymysql
from config import settings
import json
from datetime import date, datetime


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")


def get_db_connection():
    """Create MySQL database connection"""
    return pymysql.connect(
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        user=settings.DB_USER,
        password=settings.DB_PASSWORD,
        database=settings.DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )


def fetch_schools():
    """Fetch all schools from database"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM schools"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
    finally:
        conn.close()


def fetch_users():
    """Fetch all users from database"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM users"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
    finally:
        conn.close()


def fetch_students():
    """Fetch all students from database"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM students"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
    finally:
        conn.close()


def fetch_academic_years():
    """Fetch all academic years from database"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM academic_years"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
    finally:
        conn.close()


def fetch_all_data():
    """Fetch all required data from database"""
    print("Connecting to database...")
    print(f"Database: {settings.DB_NAME}")
    print(f"Host: {settings.DB_HOST}")
    print(f"User: {settings.DB_USER}")
    print("-" * 50)
    
    try:
        schools = fetch_schools()
        print(f"✓ Fetched {len(schools)} schools")
        
        users = fetch_users()
        print(f"✓ Fetched {len(users)} users")
        
        students = fetch_students()
        print(f"✓ Fetched {len(students)} students")
        
        academic_years = fetch_academic_years()
        print(f"✓ Fetched {len(academic_years)} academic years")
        
        print("-" * 50)
        print("Data fetch complete!")
        
        return {
            "schools": schools,
            "users": users,
            "students": students,
            "academic_years": academic_years
        }
    except Exception as e:
        print(f"Error fetching data: {str(e)}")
        return None


def save_to_json(data, filename="database_data.json"):
    """Save fetched data to JSON file"""
    if data:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2, default=json_serial)
        print(f"Data saved to {filename}")


if __name__ == "__main__":
    # Fetch all data
    data = fetch_all_data()
    
    if data:
        # Save to JSON file
        save_to_json(data)
        
        # Print summary
        print("\n" + "=" * 50)
        print("DATA SUMMARY")
        print("=" * 50)
        print(f"Schools: {len(data['schools'])}")
        print(f"Users: {len(data['users'])}")
        print(f"Students: {len(data['students'])}")
        print(f"Academic Years: {len(data['academic_years'])}")
        print("=" * 50)
