"""
Simple script to test MySQL database connection
"""
import pymysql
from config import settings

def test_connection():
    """Test MySQL connection and display database info"""
    print("=" * 60)
    print("TESTING MYSQL DATABASE CONNECTION")
    print("=" * 60)
    print(f"\nConnection Details:")
    print(f"  Host:     {settings.DB_HOST}")
    print(f"  Port:     {settings.DB_PORT}")
    print(f"  User:     {settings.DB_USER}")
    print(f"  Database: {settings.DB_NAME}")
    print("-" * 60)
    
    try:
        # Attempt connection
        print("\n[1/4] Connecting to MySQL server...")
        connection = pymysql.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("✓ Connection successful!")
        
        # Get database version
        print("\n[2/4] Checking database version...")
        with connection.cursor() as cursor:
            cursor.execute("SELECT VERSION() as version")
            result = cursor.fetchone()
            print(f"✓ MySQL Version: {result['version']}")
        
        # List tables
        print("\n[3/4] Listing tables in database...")
        with connection.cursor() as cursor:
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            
            if tables:
                print(f"✓ Found {len(tables)} tables:")
                for i, table in enumerate(tables, 1):
                    table_name = list(table.values())[0]
                    print(f"   {i}. {table_name}")
            else:
                print("⚠ No tables found in database")
        
        # Check required tables
        print("\n[4/4] Checking required tables...")
        required_tables = ['schools', 'users', 'students', 'academic_years']
        table_names = [list(t.values())[0] for t in tables]
        
        all_present = True
        for req_table in required_tables:
            if req_table in table_names:
                # Count records
                with connection.cursor() as cursor:
                    cursor.execute(f"SELECT COUNT(*) as count FROM {req_table}")
                    count = cursor.fetchone()['count']
                    print(f"   ✓ {req_table}: {count} records")
            else:
                print(f"   ✗ {req_table}: NOT FOUND")
                all_present = False
        
        connection.close()
        
        # Final status
        print("\n" + "=" * 60)
        if all_present:
            print("SUCCESS! All required tables are present.")
            print("\nYou can now run:")
            print("  1. python fetch_data.py     - To fetch and save data")
            print("  2. python main.py           - To start the API server")
        else:
            print("WARNING! Some required tables are missing.")
            print("Please create the missing tables in your database.")
        print("=" * 60)
        
        return True
        
    except pymysql.err.OperationalError as e:
        print(f"\n✗ Connection failed: {e}")
        print("\nTroubleshooting:")
        print("  1. Check if MySQL server is running")
        print("  2. Verify credentials in config.py:")
        print(f"     - Host: {settings.DB_HOST}")
        print(f"     - User: {settings.DB_USER}")
        print(f"     - Database: {settings.DB_NAME}")
        print("  3. Make sure the database exists:")
        print(f"     CREATE DATABASE {settings.DB_NAME};")
        return False
        
    except Exception as e:
        print(f"\n✗ Error: {type(e).__name__}: {e}")
        return False


if __name__ == "__main__":
    test_connection()
