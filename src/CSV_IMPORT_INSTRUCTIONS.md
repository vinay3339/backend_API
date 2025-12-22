# CSV Import Instructions for Student Management

## How to Import Students

1. **Click "Import CSV" button** in the Student Management header
2. **Choose an option:**
   - **Upload CSV File** - Select your prepared CSV file
   - **Download Template** - Get a sample CSV file to fill in

3. **Review the preview** of students to be imported
4. **Check for any errors or warnings**
5. **Click "Import X Student(s)"** to confirm

## CSV File Format

### Required Columns
- **firstName** - Student's first name
- **lastName** - Student's last name
- **admissionNo** - Unique admission number (must not exist in system)
- **class** - Grade/Class level (e.g., 9, 10, 11)
- **section** - Section within the class (e.g., A, B, C)
- **email** - Student's email address
- **phone** - Contact phone number (e.g., +1 234-567-8901)
- **gender** - Must be: Male, Female, or Other
- **dob** - Date of birth in YYYY-MM-DD format

### Optional Columns
- **address** - Street address
- **city** - City name
- **state** - State/Province abbreviation
- **zipCode** - Postal/ZIP code
- **status** - Active, Inactive, or Suspended (defaults to Active if not provided)

## Sample CSV Format

```csv
firstName,lastName,admissionNo,class,section,email,phone,gender,dob,address,city,state,zipCode,status
John,Doe,ADM2024101,9,A,john.doe@school.edu,+1 234-567-8901,Male,2010-03-15,123 Main St,Springfield,IL,62701,Active
Jane,Smith,ADM2024102,10,B,jane.smith@school.edu,+1 234-567-8902,Female,2009-07-22,456 Oak Ave,Springfield,IL,62702,Active
```

## Important Notes

1. **File Format:** Must be a .csv (comma-separated values) file
2. **Headers:** First row must contain column headers (case-sensitive)
3. **Unique Admission Numbers:** Each admissionNo must be unique and not already exist
4. **Date Format:** Dates must be in YYYY-MM-DD format (e.g., 2010-03-15)
5. **No Commas in Values:** If a field contains a comma, wrap it in quotes
6. **Validation:** The system will check for errors before importing
7. **Partial Import:** If some rows have errors, only valid rows will be imported

## Error Handling

The import dialog will show warnings for:
- Missing required fields
- Duplicate admission numbers
- Invalid data formats
- Column count mismatches

Only valid rows will be imported. Invalid rows will be listed in the warnings section.

## After Import

- All imported students will have "Active" status by default
- No user accounts are created automatically
- You can edit individual student details after import
- You can create user accounts from the Student Details page
- Students appear immediately in the Students List

## Tips

1. **Download Template First:** Use the "Download Template" option to get the correct format
2. **Test with Small File:** Start with 2-3 students to verify the format
3. **Check Data:** Review all data in the preview before confirming import
4. **Keep Backup:** Keep a copy of your original CSV file
5. **Excel Users:** Save as "CSV (Comma delimited) (*.csv)" not "CSV UTF-8"

## Common Issues

**Issue:** "Missing required columns" error
- **Solution:** Make sure first row has all required column headers with exact spelling

**Issue:** "Admission number already exists" error  
- **Solution:** Check your CSV for duplicate admission numbers or existing students

**Issue:** "Column count mismatch" error
- **Solution:** Ensure each row has the same number of columns as the header row

**Issue:** File won't upload
- **Solution:** Verify file extension is .csv (not .xlsx or .txt)
