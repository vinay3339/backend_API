import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

export const TransportAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendance = [
    { id: '1', student: 'Aarav Kumar', route: 'R-14', morningBoarding: 'present', eveningBoarding: 'present', alertsSent: 0, driverNotes: '' },
    { id: '2', student: 'Sai Priya', route: 'R-22', morningBoarding: 'absent', eveningBoarding: 'present', alertsSent: 1, driverNotes: 'Parent informed' },
    { id: '3', student: 'Divya Rani', route: 'R-08', morningBoarding: 'present', eveningBoarding: 'present', alertsSent: 0, driverNotes: '' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-2">Select Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Mark All Boarded</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Attendance</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Students</span>
          <p className="text-gray-900 mt-1">{attendance.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Morning Present</span>
          <p className="text-green-600 mt-1">{attendance.filter(a => a.morningBoarding === 'present').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Evening Present</span>
          <p className="text-green-600 mt-1">{attendance.filter(a => a.eveningBoarding === 'present').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Alerts Sent</span>
          <p className="text-orange-600 mt-1">{attendance.reduce((s, a) => s + a.alertsSent, 0)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Transport Attendance</h3>
          <p className="text-sm text-gray-600 mt-1">Mark daily boarding status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Morning Boarding</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Evening Boarding</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Alerts Sent</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Driver Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{record.student}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{record.route}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      {record.morningBoarding === 'present' ? (
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Present
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Absent
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      {record.eveningBoarding === 'present' ? (
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Present
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Absent
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded text-xs ${record.alertsSent > 0 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>{record.alertsSent}</span>
                  </td>
                  <td className="px-6 py-4"><span className="text-sm text-gray-600">{record.driverNotes || '—'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
