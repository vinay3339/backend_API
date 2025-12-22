"""
Script to apply dynamic schema evolution to all router files
This updates exams, fees, marks, attendance, and transport routers
"""

import os
import re

# Define the import block to add
IMPORT_BLOCK = """import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.dynamic_schema import auto_evolve_schema
"""

# Router configurations: (filename, table_name, model_name)
ROUTERS = [
    ('exams.py', 'exams', 'Exam'),
    ('fees.py', 'fee_structures', 'FeeStructure'),  # Main table for fees
    ('marks.py', 'marks', 'Mark'),
    ('attendance.py', 'attendance', 'Attendance'),
    ('transport.py', 'transport_routes', 'TransportRoute'),
]

def add_imports_to_file(filepath):
    """Add dynamic schema imports to a router file"""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if imports already exist
    if 'from utils.dynamic_schema import auto_evolve_schema' in content:
        print(f"✓ {filepath} already has imports")
        return False
    
    # Find the last import statement
    import_pattern = r'(from .+ import .+\n)'
    imports = list(re.finditer(import_pattern, content))
    
    if imports:
        last_import = imports[-1]
        insert_pos = last_import.end()
        
        # Insert the new imports
        new_content = (
            content[:insert_pos] + 
            '\n' + IMPORT_BLOCK + '\n' +
            content[insert_pos:]
        )
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        
        print(f"✓ Added imports to {filepath}")
        return True
    else:
        print(f"✗ Could not find imports in {filepath}")
        return False


def add_schema_evolution_to_create(filepath, table_name, model_name):
    """Add schema evolution to POST endpoint"""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already updated
    if 'auto_evolve_schema(db,' in content:
        print(f"✓ {filepath} already has schema evolution")
        return False
    
    # Pattern to find create function
    create_pattern = r'(@router\.post\([^)]+\)[\s\S]*?async def create_\w+\([^)]+\):[\s\S]*?"""[\s\S]*?""")'
    
    match = re.search(create_pattern, content)
    if match:
        # Find where to insert (after docstring)
        insert_pos = match.end()
        
        schema_code = f"""
    # Auto-evolve schema
    data_dict = \w+_data.dict()
    schema_changes = auto_evolve_schema(db, "{table_name}", data_dict)
    
    if schema_changes:
        print(f"Schema evolution: Added columns to '{table_name}' table: {{list(schema_changes.keys())}}")
    
"""
        
        # Find the actual variable name
        var_match = re.search(r'(\w+)_data:', content[match.start():match.end()])
        if var_match:
            var_name = var_match.group(1)
            schema_code = schema_code.replace('\\w+_data', f'{var_name}_data')
        
        # Insert the code
        # This is a simplified version - actual implementation needs more careful insertion
        print(f"⚠ {filepath} - Manual update recommended for POST endpoint")
        return False
    else:
        print(f"✗ Could not find create function in {filepath}")
        return False


def main():
    """Main function to update all routers"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    routers_dir = os.path.join(script_dir, 'routers')
    
    print("Updating router files with dynamic schema evolution...\n")
    
    for filename, table_name, model_name in ROUTERS:
        filepath = os.path.join(routers_dir, filename)
        
        if not os.path.exists(filepath):
            print(f"✗ File not found: {filepath}")
            continue
        
        print(f"\nProcessing {filename}...")
        
        # Add imports
        add_imports_to_file(filepath)
        
        # Note: Full automation of POST/PUT updates is complex
        # The script above shows the pattern, but manual updates are safer
        print(f"  → Please manually add schema evolution code to POST and PUT endpoints")
    
    print("\n" + "="*60)
    print("MANUAL STEPS REQUIRED:")
    print("="*60)
    print("""
For each router file (exams.py, fees.py, marks.py, attendance.py, transport.py):

1. In the POST (create) endpoint, add after the docstring:
   
   data_dict = {var}_data.dict()
   schema_changes = auto_evolve_schema(db, "{table}", data_dict)
   if schema_changes:
       print(f"Schema evolution: Added columns to '{table}' table: {{list(schema_changes.keys())}}")

2. In the PUT (update) endpoint, add before the update loop:
   
   update_data = {var}_data.dict(exclude_unset=True)
   schema_changes = auto_evolve_schema(db, "{table}", update_data)
   if schema_changes:
       print(f"Schema evolution: Added columns to '{table}' table: {{list(schema_changes.keys())}}")
       db.expire_all()

3. Wrap the object creation in try-except for graceful fallback
""")


if __name__ == "__main__":
    main()
