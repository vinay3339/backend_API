/**
 * API Service for fetching data from backend
 */

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Generic fetch function
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Test database connection
export async function testConnection() {
  return fetchAPI('/data/test-connection');
}

// Fetch all data
export async function fetchAllData() {
  return fetchAPI('/data/all');
}

// Fetch schools
export async function fetchSchools() {
  return fetchAPI('/data/schools');
}

// Fetch users
export async function fetchUsers() {
  return fetchAPI('/data/users');
}

// Fetch students
export async function fetchStudents() {
  return fetchAPI('/data/students');
}

// Fetch academic years
export async function fetchAcademicYears() {
  return fetchAPI('/data/academic-years');
}

// Fetch students by class
export async function fetchStudentsByClass(classId: number, section?: string) {
  const sectionParam = section ? `&section=${section}` : '';
  return fetchAPI(`/data/students/by-class/${classId}?${sectionParam}`);
}

// Search students
export async function searchStudents(params: {
  search?: string;
  class_id?: number;
  section?: string;
  status?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append('search', params.search);
  if (params.class_id) queryParams.append('class_id', params.class_id.toString());
  if (params.section) queryParams.append('section', params.section);
  if (params.status) queryParams.append('status', params.status);
  
  return fetchAPI(`/data/students/search?${queryParams.toString()}`);
}

// Fetch specific student
export async function fetchStudentById(studentId: number) {
  return fetchAPI(`/data/students/${studentId}`);
}

// Fetch specific school
export async function fetchSchoolById(schoolId: number) {
  return fetchAPI(`/data/schools/${schoolId}`);
}
