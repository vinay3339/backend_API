import React from 'react';
import { Users, BookOpen, ClipboardCheck, FileText, TrendingUp, Star } from 'lucide-react';

export const TeacherMyClasses: React.FC = () => {
  const classes = [
    { id: '1', class: 'Class 10', section: 'A', subjects: ['Mathematics'], strength: 42, classTeacher: true },
    { id: '2', class: 'Class 9', section: 'A', subjects: ['Mathematics'], strength: 40, classTeacher: false },
    { id: '3', class: 'Class 9', section: 'B', subjects: ['Mathematics'], strength: 38, classTeacher: false },
    { id: '4', class: 'Class 8', section: 'A', subjects: ['Mathematics'], strength: 35, classTeacher: false },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">My Classes</h1>
        <p className="text-gray-600">Classes and sections assigned to you</p>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all">
            {/* Card Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{classItem.class} - {classItem.section}</h3>
                    {classItem.classTeacher && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-[#FFF5E6] text-[#F1C40F] rounded-full text-xs">
                        <Star className="w-3 h-3" />
                        Class Teacher
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{classItem.subjects.join(', ')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-gray-900">{classItem.strength}</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
              </div>
            </div>

            {/* Card Body - Action Buttons */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:border-[#2D62FF] hover:bg-[#EBF1FF] transition-all group">
                  <Users className="w-4 h-4 text-gray-600 group-hover:text-[#2D62FF]" />
                  <span className="text-sm text-gray-900">Students</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:border-[#2D62FF] hover:bg-[#EBF1FF] transition-all group">
                  <ClipboardCheck className="w-4 h-4 text-gray-600 group-hover:text-[#2D62FF]" />
                  <span className="text-sm text-gray-900">Attendance</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:border-[#2D62FF] hover:bg-[#EBF1FF] transition-all group">
                  <FileText className="w-4 h-4 text-gray-600 group-hover:text-[#2D62FF]" />
                  <span className="text-sm text-gray-900">Homework</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:border-[#2D62FF] hover:bg-[#EBF1FF] transition-all group">
                  <TrendingUp className="w-4 h-4 text-gray-600 group-hover:text-[#2D62FF]" />
                  <span className="text-sm text-gray-900">Marks</span>
                </button>
              </div>
            </div>

            {/* Card Footer - Stats */}
            <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-[#2ECC71]">92%</div>
                  <div className="text-xs text-gray-600">Attendance</div>
                </div>
                <div>
                  <div className="text-sm text-[#2D62FF]">78%</div>
                  <div className="text-xs text-gray-600">Avg Marks</div>
                </div>
                <div>
                  <div className="text-sm text-[#F1C40F]">5</div>
                  <div className="text-xs text-gray-600">Pending HW</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EBF1FF] rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#2D62FF]" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">4</p>
              <p className="text-sm text-gray-600">Total Classes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E6F7F1] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#2ECC71]" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">155</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFF5E6] rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-[#F1C40F]" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">1</p>
              <p className="text-sm text-gray-600">Class Teacher</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFE6E6] rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#E74C3C]" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">12</p>
              <p className="text-sm text-gray-600">Pending Tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
