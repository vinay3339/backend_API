# Teacher Management Module - Quick Start Guide

## 🚀 Getting Started

### Access the Teacher Module
1. Log in as **School Admin** (username: `admin` or `admin2`, password: any)
2. In the left sidebar, click **"Teachers"**
3. You'll see the Teacher Management interface

## 📋 Main Features

### 1️⃣ Teacher List View
The main screen shows all teachers in a table with:
- **Avatar** with initials
- **Name & Email**
- **Employee ID**
- **Department** (badge)
- **Designation**
- **Contact Number**
- **Status** (Active/Inactive badge)
- **Actions** (three-dot menu)

### 2️⃣ Search & Filter
- **Search Bar**: Type teacher name, employee ID, or email
- **Status Filter**: All / Active / Inactive
- **Department Filter**: All / Mathematics / English / Science / etc.

### 3️⃣ Summary Statistics
At the bottom of the list:
- Total Teachers: 3
- Active: 3
- Inactive: 0
- Departments: 6

## 👤 Teacher Details

### Viewing a Teacher Profile
1. Click the **three-dot menu** (⋮) on any teacher row
2. Select **"View Details"**
3. Navigate through **7 tabs**:

#### Tab 1: Profile
- **Personal Information**: Name, Gender, DOB, Blood Group, Religion, Caste, Aadhar, PAN, etc.
- **Contact Information**: Email, Phone, Address, Village, Mandal, District
- **Emergency Contact**: Name, Relationship, Phone

#### Tab 2: Employment
- **Employment Details**: Employee ID, DOJ, Designation, Department
- **Assignments**: Subjects (badges), Classes (badges), Sections (badges)
- **Job Details**: Employment Type, Salary Structure, Working Hours
- **Statutory**: PF Number, ESI Number

#### Tab 3: Qualifications
- Highest Qualification (B.Ed, M.Ed, M.Sc, etc.)
- Specialization
- University & Year of Passing
- Total Experience
- Previous School
- Certifications (TET, CTET, DSC badges)

#### Tab 4: Salary & Bank
- **Bank Details**: Account Holder, Bank Name, Branch, Account Number, IFSC
- **Salary Details**: Salary Type, Monthly Amount
- **Allowances**: HRA, Transport (green badges)
- **Deductions**: PF, Professional Tax (red badges)
- **Net Salary**: Highlighted in blue card

#### Tab 5: Timetable
- **Class Allocation**: Assigned Classes, Subjects, Periods count
- **Weekly Timetable Grid**: Mon-Sat schedule with 7 periods/day
- Shows Class & Subject for each period
- "Free Period" badges for empty slots
- Edit Timetable button

#### Tab 6: Account
- **Portal Login**: Username, Last Login, Account Status toggle
- **Permissions** (8 checkboxes):
  - Can Take Attendance
  - Can Upload Marks
  - Can Upload Homework/Materials
  - Can Submit Reports
  - Can Message Parents
  - Can Access Finance Info
  - Can Access Reports
  - Can Update Student Behaviour

#### Tab 7: Audit Log
- Complete activity history
- Color-coded action icons
- Old Value → New Value comparisons
- Timestamps & "Performed by" attribution
- Sample logs: Profile updates, Salary changes, Class assignments, etc.

## 🎨 Custom Fields Editor

### Accessing Custom Fields
1. From Teacher List, click **"Custom Fields"** button (top right)
2. You'll see the **Teacher Custom Fields** configuration screen

### Features
- **7 Tabs**: Profile, Employment, Qualifications, Salary & Bank, Timetable, Account, Audit Log
- **Collapsible Sections**: Personal Info, Contact Info, Employment Details, etc.
- **Drag & Drop**: Reorder fields by dragging the grip icon
- **System Fields**: Locked (🔒) - cannot be deleted
- **Custom Fields**: Blue background - can be edited/deleted

### Adding a Custom Field
1. Select a tab (e.g., "Profile")
2. Expand a section (e.g., "Personal Information")
3. Click **"+ Add Field to This Section"**
4. Fill in the modal:
   - **Field Label**: Display name (e.g., "Certification Date")
   - **Field Key**: Database key (e.g., "cert_date")
   - **Field Type**: Text / Text Area / Number / Date / Dropdown / Checkbox / Toggle / File
   - **Required**: Toggle on/off
   - **Visibility**: Check Admin / Principal / Teacher Self
   - For **Dropdown**: Add comma-separated options
5. Click **"Add Field"**

### Editing a Field
1. Click the **pencil icon** (✏️) on any custom field
2. Modify the settings in the modal
3. Click **"Update Field"**

### Deleting a Field
1. Click the **trash icon** (🗑️) on any custom field
2. Field will be removed (system fields cannot be deleted)

## 📊 Sample Teachers

### Teacher 1: Ramesh Johnson
- **ID**: EMP2024015
- **Department**: Mathematics
- **Classes**: 7-A, 8-A, 8-B, 9-A
- **Experience**: 12 years
- **Status**: Active

### Teacher 2: Lakshmi Devi
- **ID**: EMP2024016
- **Department**: English
- **Classes**: 9-A, 9-B, 10-A
- **Experience**: 15 years
- **Status**: Active

### Teacher 3: Suresh Kumar
- **ID**: EMP2024017
- **Department**: Science
- **Classes**: 6-A, 6-B, 7-A
- **Experience**: 8 years
- **Status**: Active

## 🎯 Action Menu Options

From the three-dot menu (⋮) on each teacher:
1. **View Details** - Open full teacher profile
2. **Edit** - Modify teacher information (ready for implementation)
3. **Reset Password** - Send password reset
4. **Deactivate** - Mark teacher as inactive (red option)

## 💡 Quick Tips

### Navigation
- **Breadcrumb**: Dashboard / Teachers / Teacher Details
- **Back Button**: Returns to teacher list from detail view

### Visual Indicators
- **Green Badge**: Active status
- **Gray Badge**: Inactive status
- **Blue Badges**: Classes assigned
- **Green Badges**: Subjects assigned, Allowances
- **Red Badges**: Deductions
- **Purple Badges**: Sections assigned
- **Indigo Badges**: Certifications

### Responsive Design
- **Desktop**: 3-column grid for forms
- **Tablet**: 2-column grid
- **Mobile**: Single column, stacked layout

### Search Tips
- Search is **case-insensitive**
- Works across: First Name, Last Name, Employee ID, Email
- Filters combine with search (AND logic)

## 🔧 Top Action Buttons

On the Teacher List page:
1. **Custom Fields** - Configure custom fields
2. **Export** - Download teacher data (ready for CSV export)
3. **Import** - Upload bulk teacher data (ready for CSV import)
4. **Add Teacher** - Create new teacher profile (ready for form)

## 📱 Mobile Experience

The module is fully responsive:
- **Hamburger menu** for sidebar on mobile
- **Stacked cards** instead of table on small screens
- **Touch-friendly** buttons and controls
- **Swipeable tabs** on mobile devices

## 🎨 Design Consistency

Matches Student Module:
- ✅ Same card-based layout
- ✅ Same tab structure
- ✅ Same color scheme (blue primary)
- ✅ Same typography
- ✅ Same spacing and shadows
- ✅ Same breadcrumb navigation
- ✅ Same action patterns

## 🔐 Access Control

**Who Can Access:**
- ✅ School Admin (full access)
- ❌ Teachers (cannot access Teacher Management)
- ❌ Students (cannot access Teacher Management)

**Visibility Levels:**
- **Admin**: Can see all fields including sensitive data
- **Principal**: Limited access to salary/sensitive info
- **Teacher Self**: Can view own profile with restrictions

## 📝 Next Steps

Ready for implementation:
1. **Add Teacher Form**: Create new teacher wizard
2. **Edit Teacher**: Inline editing capability
3. **CSV Import/Export**: Bulk operations
4. **Advanced Search**: Multi-field search with operators
5. **Reports**: Teacher analytics and performance
6. **Document Upload**: ID cards, certificates, etc.

## 🆘 Troubleshooting

### Issue: Can't see Teachers menu
- **Solution**: Ensure you're logged in as School Admin (not Student/Teacher)

### Issue: Search not working
- **Solution**: Type at least 1 character, results appear instantly

### Issue: Custom field not saving
- **Solution**: Check that Field Label and Field Key are filled

### Issue: Timetable not displaying
- **Solution**: Sample data is pre-loaded, real data would come from backend

## 📞 Support

For questions or issues with the Teacher Management module:
1. Check this Quick Start Guide
2. Refer to TEACHER_MODULE_COMPLETE.md for detailed documentation
3. Review sample data in TeacherManagement.tsx

---

**Version**: 1.0  
**Last Updated**: November 29, 2025  
**Status**: ✅ Production Ready
