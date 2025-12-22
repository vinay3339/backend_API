import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Award, Users, Filter } from 'lucide-react';

interface StudentResult {
  id: string;
  rollNumber: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  rank: number;
  status: 'pass' | 'fail';
}

export const ExamResults: React.FC = () => {
  const [filters, setFilters] = useState({
    exam: 'FA1-2024',
    class: '10',
    section: 'A',
  });

  const [results] = useState<StudentResult[]>([
    {
      id: '1',
      rollNumber: '1004',
      name: 'Divya Rani',
      totalMarks: 500,
      obtainedMarks: 456,
      percentage: 91.2,
      grade: 'A1',
      rank: 1,
      status: 'pass',
    },
    {
      id: '2',
      rollNumber: '1008',
      name: 'Anjali Sharma',
      totalMarks: 500,
      obtainedMarks: 445,
      percentage: 89.0,
      grade: 'A1',
      rank: 2,
      status: 'pass',
    },
    {
      id: '3',
      rollNumber: '1001',
      name: 'Aarav Kumar',
      totalMarks: 500,
      obtainedMarks: 425,
      percentage: 85.0,
      grade: 'A+',
      rank: 3,
      status: 'pass',
    },
    {
      id: '4',
      rollNumber: '1006',
      name: 'Lakshmi Devi',
      totalMarks: 500,
      obtainedMarks: 398,
      percentage: 79.6,
      grade: 'A',
      rank: 4,
      status: 'pass',
    },
    {
      id: '5',
      rollNumber: '1002',
      name: 'Sai Priya',
      totalMarks: 500,
      obtainedMarks: 378,
      percentage: 75.6,
      grade: 'A',
      rank: 5,
      status: 'pass',
    },
    {
      id: '6',
      rollNumber: '1005',
      name: 'Krishna Reddy',
      totalMarks: 500,
      obtainedMarks: 325,
      percentage: 65.0,
      grade: 'B+',
      rank: 6,
      status: 'pass',
    },
    {
      id: '7',
      rollNumber: '1009',
      name: 'Rahul Verma',
      totalMarks: 500,
      obtainedMarks: 298,
      percentage: 59.6,
      grade: 'B',
      rank: 7,
      status: 'pass',
    },
    {
      id: '8',
      rollNumber: '1010',
      name: 'Priya Singh',
      totalMarks: 500,
      obtainedMarks: 165,
      percentage: 33.0,
      grade: 'F',
      rank: 8,
      status: 'fail',
    },
  ]);

  const stats = {
    averageScore: (
      results.reduce((sum, r) => sum + r.percentage, 0) / results.length
    ).toFixed(1),
    highestScore: Math.max(...results.map((r) => r.percentage)).toFixed(1),
    lowestScore: Math.min(...results.map((r) => r.percentage)).toFixed(1),
    totalPass: results.filter((r) => r.status === 'pass').length,
    totalFail: results.filter((r) => r.status === 'fail').length,
    topPerformer: results[0]?.name || 'N/A',
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Class-wise Performance</h3>
          <Filter className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FA1-2024">FA1 - 2024-2025</option>
              <option value="FA2-2024">FA2 - 2024-2025</option>
              <option value="SA1-2024">SA1 - 2024-2025</option>
              <option value="TERM1-2024">Term 1 - 2024-2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class</label>
            <select
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Section</label>
            <select
              value={filters.section}
              onChange={(e) => setFilters({ ...filters, section: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Average Score</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-gray-900">{stats.averageScore}%</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Highest Score</span>
            <Award className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-green-600">{stats.highestScore}%</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Lowest Score</span>
            <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-red-600">{stats.lowestScore}%</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Students Passed</span>
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-green-600">{stats.totalPass}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Students Failed</span>
            <Users className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-red-600">{stats.totalFail}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Top Performer</span>
            <Award className="w-4 h-4 text-yellow-600" />
          </div>
          <p className="text-gray-900 text-sm truncate">{stats.topPerformer}</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Student Results - Class {filters.class} Section {filters.section}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing results for {results.length} students
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Total Marks
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Obtained Marks
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Result Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {result.rank <= 3 ? (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            result.rank === 1
                              ? 'bg-yellow-100 text-yellow-700'
                              : result.rank === 2
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {result.rank}
                        </div>
                      ) : (
                        <span className="text-gray-900 ml-2">{result.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{result.rollNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{result.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{result.totalMarks}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{result.obtainedMarks}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{result.percentage.toFixed(1)}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs ${
                          result.grade.startsWith('A1')
                            ? 'bg-green-100 text-green-700'
                            : result.grade.startsWith('A')
                            ? 'bg-blue-100 text-blue-700'
                            : result.grade.startsWith('B')
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {result.grade}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          result.status === 'pass'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
