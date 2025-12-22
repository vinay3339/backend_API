import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, Clock, MapPin, User } from 'lucide-react';

interface ExamSlot {
  id: string;
  examName: string;
  class: string;
  section: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  invigilator: string;
}

export const ExamTimetable: React.FC = () => {
  const [examSlots, setExamSlots] = useState<ExamSlot[]>([
    {
      id: '1',
      examName: 'SA1',
      class: '10',
      section: 'A',
      subject: 'Mathematics',
      date: '2024-09-15',
      startTime: '09:00',
      endTime: '12:00',
      roomNumber: 'Room 101',
      invigilator: 'Dr. Ramarao',
    },
    {
      id: '2',
      examName: 'SA1',
      class: '10',
      section: 'A',
      subject: 'Physics',
      date: '2024-09-17',
      startTime: '09:00',
      endTime: '12:00',
      roomNumber: 'Room 101',
      invigilator: 'Prof. Lakshmi',
    },
    {
      id: '3',
      examName: 'SA1',
      class: '10',
      section: 'A',
      subject: 'Chemistry',
      date: '2024-09-19',
      startTime: '09:00',
      endTime: '12:00',
      roomNumber: 'Room 101',
      invigilator: 'Dr. Krishna',
    },
    {
      id: '4',
      examName: 'SA1',
      class: '10',
      section: 'A',
      subject: 'English',
      date: '2024-09-21',
      startTime: '09:00',
      endTime: '12:00',
      roomNumber: 'Room 101',
      invigilator: 'Ms. Priya',
    },
    {
      id: '5',
      examName: 'SA1',
      class: '10',
      section: 'A',
      subject: 'Telugu',
      date: '2024-09-23',
      startTime: '09:00',
      endTime: '12:00',
      roomNumber: 'Room 101',
      invigilator: 'Mr. Venkat',
    },
  ]);

  const [filters, setFilters] = useState({
    exam: 'SA1',
    class: '10',
    section: 'A',
  });

  const [showModal, setShowModal] = useState(false);

  // Group slots by date
  const groupedSlots = examSlots.reduce((acc, slot) => {
    const date = slot.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, ExamSlot[]>);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FA1">FA1 - 2024-2025</option>
              <option value="SA1">SA1 - 2024-2025</option>
              <option value="TERM1">Term 1 - 2024-2025</option>
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
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Exams</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-gray-900">{examSlots.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Exam Days</span>
            <Calendar className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-gray-900">{Object.keys(groupedSlots).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Start Date</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-gray-900">
            {new Date(examSlots[0]?.date || '').toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
            })}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">End Date</span>
            <Calendar className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-gray-900">
            {new Date(examSlots[examSlots.length - 1]?.date || '').toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
            })}
          </p>
        </div>
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">
              Exam Timetable - Class {filters.class} Section {filters.section}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{filters.exam} - 2024-2025</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Exam Slot
          </button>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(groupedSlots).map(([date, slots]) => (
            <div key={date} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h4 className="text-gray-900">{formatDate(date)}</h4>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {slots.map((slot) => (
                  <div key={slot.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-gray-900">{slot.subject}</h4>
                          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {slot.examName}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{slot.roomNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{slot.invigilator}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>
                              Class {slot.class} - Section {slot.section}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Exam Slot Modal */}
      {showModal && <AddExamSlotModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

// Add Exam Slot Modal
const AddExamSlotModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    examName: 'SA1',
    class: '10',
    section: 'A',
    subject: '',
    date: '',
    startTime: '09:00',
    endTime: '12:00',
    roomNumber: '',
    invigilator: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding exam slot:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Add Exam Slot</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Exam Name</label>
                <select
                  value={formData.examName}
                  onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="FA1">FA1</option>
                  <option value="SA1">SA1</option>
                  <option value="TERM1">Term 1</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="10">Class 10</option>
                  <option value="9">Class 9</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Room Number</label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="e.g., Room 101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Invigilator</label>
                <select
                  value={formData.invigilator}
                  onChange={(e) => setFormData({ ...formData, invigilator: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Teacher</option>
                  <option value="Dr. Ramarao">Dr. Ramarao</option>
                  <option value="Prof. Lakshmi">Prof. Lakshmi</option>
                  <option value="Dr. Krishna">Dr. Krishna</option>
                  <option value="Ms. Priya">Ms. Priya</option>
                  <option value="Mr. Venkat">Mr. Venkat</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Exam Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
