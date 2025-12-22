import React, { useState } from 'react';
import { Eye, EyeOff, Send, Calendar, Users, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface PublishHistory {
  id: string;
  examName: string;
  class: string;
  section: string;
  publishedTo: string[];
  publishDate: string;
  publishTime: string;
  publishedBy: string;
  studentsCount: number;
  status: 'published' | 'scheduled' | 'draft';
}

export const PublishResults: React.FC = () => {
  const [publishSettings, setPublishSettings] = useState({
    examName: 'SA1-2024',
    class: '10',
    section: 'A',
    publishTo: {
      students: true,
      parents: true,
      teachersOnly: false,
    },
    publishDate: '',
    publishTime: '',
    allowDownload: true,
    customMessage: '',
  });

  const [publishHistory] = useState<PublishHistory[]>([
    {
      id: '1',
      examName: 'FA1 - 2024-2025',
      class: '10',
      section: 'A',
      publishedTo: ['Students', 'Parents'],
      publishDate: '2024-07-15',
      publishTime: '10:00',
      publishedBy: 'Mrs. Administrator',
      studentsCount: 45,
      status: 'published',
    },
    {
      id: '2',
      examName: 'FA2 - 2024-2025',
      class: '10',
      section: 'A',
      publishedTo: ['Teachers Only'],
      publishDate: '2024-09-01',
      publishTime: '09:00',
      publishedBy: 'Mrs. Administrator',
      studentsCount: 45,
      status: 'published',
    },
    {
      id: '3',
      examName: 'SA1 - 2024-2025',
      class: '10',
      section: 'A',
      publishedTo: ['Students', 'Parents'],
      publishDate: '2024-10-05',
      publishTime: '14:00',
      publishedBy: 'Mrs. Administrator',
      studentsCount: 45,
      status: 'scheduled',
    },
  ]);

  const handlePublish = () => {
    console.log('Publishing results:', publishSettings);
    alert('Results published successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Publish Controls */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Publish Exam Results</h3>
          <p className="text-sm text-gray-600 mt-1">
            Control who can view results and when they become available
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Select Exam */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Select Exam <span className="text-red-500">*</span>
              </label>
              <select
                value={publishSettings.examName}
                onChange={(e) =>
                  setPublishSettings({ ...publishSettings, examName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="FA1-2024">FA1 - 2024-2025</option>
                <option value="FA2-2024">FA2 - 2024-2025</option>
                <option value="SA1-2024">SA1 - 2024-2025</option>
                <option value="SA2-2025">SA2 - 2024-2025</option>
                <option value="TERM1-2024">Term 1 - 2024-2025</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Class</label>
              <select
                value={publishSettings.class}
                onChange={(e) => setPublishSettings({ ...publishSettings, class: e.target.value })}
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
                value={publishSettings.section}
                onChange={(e) =>
                  setPublishSettings({ ...publishSettings, section: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>

          {/* Publish To Options */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              Publish Results To <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={publishSettings.publishTo.students}
                  onChange={(e) =>
                    setPublishSettings({
                      ...publishSettings,
                      publishTo: {
                        ...publishSettings.publishTo,
                        students: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900">Students</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Students can view their individual results and report cards
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={publishSettings.publishTo.parents}
                  onChange={(e) =>
                    setPublishSettings({
                      ...publishSettings,
                      publishTo: {
                        ...publishSettings.publishTo,
                        parents: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-gray-900">Parents</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Parents can view their child's results through parent portal
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={publishSettings.publishTo.teachersOnly}
                  onChange={(e) =>
                    setPublishSettings({
                      ...publishSettings,
                      publishTo: {
                        ...publishSettings.publishTo,
                        teachersOnly: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-900">Teachers Only (Internal Review)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Only teachers and admins can view results. Hidden from students and parents.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Schedule Publishing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Publish Date</label>
              <input
                type="date"
                value={publishSettings.publishDate}
                onChange={(e) =>
                  setPublishSettings({ ...publishSettings, publishDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to publish immediately
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Publish Time</label>
              <input
                type="time"
                value={publishSettings.publishTime}
                onChange={(e) =>
                  setPublishSettings({ ...publishSettings, publishTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <label className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <input
                type="checkbox"
                checked={publishSettings.allowDownload}
                onChange={(e) =>
                  setPublishSettings({ ...publishSettings, allowDownload: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div>
                <span className="text-gray-900">Allow Report Card Download</span>
                <p className="text-sm text-gray-600 mt-0.5">
                  Enable students/parents to download PDF report cards
                </p>
              </div>
            </label>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Custom Message to Parents (Optional)
            </label>
            <textarea
              value={publishSettings.customMessage}
              onChange={(e) =>
                setPublishSettings({ ...publishSettings, customMessage: e.target.value })
              }
              rows={4}
              placeholder="Enter a message that will be shown to parents along with the results..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Publish Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              <span>Results will be visible to selected audience after publishing</span>
            </div>
            <button
              onClick={handlePublish}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {publishSettings.publishDate ? 'Schedule Publish' : 'Publish Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Publish History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Publishing History</h3>
          <p className="text-sm text-gray-600 mt-1">Track all published and scheduled results</p>
        </div>

        <div className="divide-y divide-gray-200">
          {publishHistory.map((history) => (
            <div key={history.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-gray-900">{history.examName}</h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs ${
                        history.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : history.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {history.status === 'published' ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Published
                        </span>
                      ) : history.status === 'scheduled' ? (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Scheduled
                        </span>
                      ) : (
                        'Draft'
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block mb-1">Class & Section</span>
                      <span className="text-gray-900">
                        {history.class} - {history.section}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Published To</span>
                      <span className="text-gray-900">{history.publishedTo.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Publish Date & Time</span>
                      <span className="text-gray-900">
                        {new Date(history.publishDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        at {history.publishTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Students</span>
                      <span className="text-gray-900">{history.studentsCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Published By</span>
                      <span className="text-gray-900">{history.publishedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {history.status === 'published' && (
                    <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                      <EyeOff className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
