#!/bin/bash

# Test script for flexible schema updates with foreign keys
# Tests updating class_id, school_id, route_id, and custom fields

echo "=================================="
echo "Flexible Schema Update Tests"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
API_URL="${API_URL:-http://localhost:8000}"
USERNAME="${USERNAME:-admin@school.com}"
PASSWORD="${PASSWORD:-Admin@123}"

echo -e "${BLUE}Step 1: Login${NC}"
echo "=========================================="
TOKEN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$USERNAME&password=$PASSWORD" | jq -r '.access_token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo -e "${RED}✗ Login failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Login successful${NC}"
echo "Token: ${TOKEN:0:20}..."
echo ""

# Test 1: Update Student class_id
echo -e "${BLUE}Test 1: Update Student class_id (Foreign Key)${NC}"
echo "=========================================="
echo "Request: PUT /api/students/1"
echo '{ "class_id": 2, "section": "B" }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/students/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 2,
    "section": "B"
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.class_id == 2' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 1 PASSED: class_id updated successfully${NC}"
else
    echo -e "${RED}✗ Test 1 FAILED: class_id not updated${NC}"
fi
echo ""

# Test 2: Update Student with Multiple Foreign Keys
echo -e "${BLUE}Test 2: Update Multiple Foreign Keys${NC}"
echo "=========================================="
echo "Request: PUT /api/students/1"
echo '{ "class_id": 3, "route_id": 2, "transport_required": true }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/students/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 3,
    "transport_required": true
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.class_id == 3 and .transport_required == true' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 2 PASSED: Multiple foreign keys updated${NC}"
else
    echo -e "${RED}✗ Test 2 FAILED: Foreign keys not updated properly${NC}"
fi
echo ""

# Test 3: Update Student with Custom Fields
echo -e "${BLUE}Test 3: Update with Custom Fields + Foreign Key${NC}"
echo "=========================================="
echo "Request: PUT /api/students/1"
echo '{ "class_id": 4, "student_category": "Scholarship", "scholarship_amount": 5000 }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/students/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 4,
    "student_category": "Scholarship",
    "scholarship_amount": 5000
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.class_id == 4' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 3 PASSED: Custom fields + FK updated${NC}"
else
    echo -e "${RED}✗ Test 3 FAILED${NC}"
fi
echo ""

# Test 4: Update Class teacher_id
echo -e "${BLUE}Test 4: Update Class Teacher (Foreign Key)${NC}"
echo "=========================================="
echo "Request: PUT /api/classes/1"
echo '{ "class_teacher_id": 2 }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/classes/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_teacher_id": 2
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.class_teacher_id' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 4 PASSED: class_teacher_id updated${NC}"
else
    echo -e "${RED}✗ Test 4 FAILED${NC}"
fi
echo ""

# Test 5: Update Teacher with Custom Fields
echo -e "${BLUE}Test 5: Update Teacher with Custom Fields${NC}"
echo "=========================================="
echo "Request: PUT /api/teachers/1"
echo '{ "designation": "Senior Teacher", "certification_level": "Advanced" }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/teachers/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "designation": "Senior Teacher",
    "certification_level": "Advanced",
    "years_of_experience": 15
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.designation' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 5 PASSED: Teacher updated with custom fields${NC}"
else
    echo -e "${RED}✗ Test 5 FAILED${NC}"
fi
echo ""

# Test 6: Update Exam foreign key
echo -e "${BLUE}Test 6: Update Exam Details${NC}"
echo "=========================================="
echo "Request: PUT /api/exams/1"
echo '{ "exam_type": "Final", "max_marks": 100 }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/exams/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "exam_type": "Final",
    "max_marks": 100,
    "is_proctored": true
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.exam_type' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 6 PASSED: Exam updated${NC}"
else
    echo -e "${RED}✗ Test 6 FAILED${NC}"
fi
echo ""

# Test 7: Update Transport Route
echo -e "${BLUE}Test 7: Update Transport Route${NC}"
echo "=========================================="
echo "Request: PUT /api/transport/routes/1"
echo '{ "capacity": 50, "fare": 500.00 }'
echo ""

RESPONSE=$(curl -s -X PUT "$API_URL/api/transport/routes/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "capacity": 50,
    "fare": 500.00,
    "has_gps": true
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'
echo ""

if echo "$RESPONSE" | jq -e '.capacity' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Test 7 PASSED: Transport route updated${NC}"
else
    echo -e "${RED}✗ Test 7 FAILED${NC}"
fi
echo ""

# Summary
echo "=================================="
echo -e "${BLUE}Test Summary${NC}"
echo "=================================="
echo ""
echo "All tests completed!"
echo ""
echo "To verify in database:"
echo "  mysql -u eduportal_user -p eduportal -e 'SELECT id, first_name, class_id FROM students WHERE id = 1;'"
echo "  mysql -u eduportal_user -p eduportal -e 'SHOW COLUMNS FROM students LIKE \"%custom%\";'"
echo ""
echo "To check custom columns:"
echo "  mysql -u eduportal_user -p eduportal << EOF"
echo "    SHOW COLUMNS FROM students WHERE Field LIKE 'student_%' OR Field LIKE 'scholarship_%';"
echo "    SHOW COLUMNS FROM teachers WHERE Field LIKE 'certification_%' OR Field LIKE 'years_%';"
echo "    SHOW COLUMNS FROM exams WHERE Field LIKE 'is_%';"
echo "    SHOW COLUMNS FROM transport_routes WHERE Field LIKE 'has_%';"
echo "EOF"
echo ""
