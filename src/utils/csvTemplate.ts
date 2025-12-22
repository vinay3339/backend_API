/**
 * CSV Template utility for Student Import
 */

export const CSV_TEMPLATE_HEADERS = [
  'firstName',
  'lastName',
  'admissionNo',
  'class',
  'section',
  'email',
  'phone',
  'gender',
  'dob',
  'address',
  'city',
  'state',
  'zipCode',
  'status'
];

export const CSV_SAMPLE_DATA = [
  'John,Doe,ADM2024101,9,A,john.doe@school.edu,+1 234-567-8901,Male,2010-03-15,123 Main St,Springfield,IL,62701,Active',
  'Jane,Smith,ADM2024102,10,B,jane.smith@school.edu,+1 234-567-8902,Female,2009-07-22,456 Oak Ave,Springfield,IL,62702,Active',
  'Michael,Brown,ADM2024103,9,A,michael.brown@school.edu,+1 234-567-8903,Male,2010-01-10,789 Pine Rd,Springfield,IL,62703,Active'
];

export function downloadCSVTemplate() {
  const csvContent = [
    CSV_TEMPLATE_HEADERS.join(','),
    ...CSV_SAMPLE_DATA
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'student_import_template.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function generateCSVInstructions(): string {
  return `
CSV Import Instructions:

Required Columns:
- firstName: Student's first name
- lastName: Student's last name
- admissionNo: Unique admission number (must not already exist)
- class: Grade/Class level
- section: Section within the class
- email: Student's email address
- phone: Contact phone number
- gender: Male, Female, or Other
- dob: Date of birth (YYYY-MM-DD format)

Optional Columns:
- address: Street address
- city: City name
- state: State/Province
- zipCode: Postal code
- status: Active, Inactive, or Suspended (defaults to Active)

Notes:
- First row must contain column headers
- All required fields must be filled
- Admission numbers must be unique
- Date format must be YYYY-MM-DD
  `.trim();
}
