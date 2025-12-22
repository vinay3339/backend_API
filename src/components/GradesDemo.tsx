import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ExamsGrades } from './ExamsGrades';
import { StudentMarksTab } from './StudentMarksTab';
import { ClassGradebook } from './ClassGradebook';
import { BookOpen, Award, Users } from 'lucide-react';

export function GradesDemo() {
  const [activeDemo, setActiveDemo] = useState('exams-grades');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 mb-2">Exams & Grades System Demo</h1>
          <p className="text-sm text-gray-600">
            Comprehensive grades management system with three views
          </p>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="max-w-7xl mx-auto">
          <TabsList className="mb-6 flex-wrap h-auto gap-2">
            <TabsTrigger value="exams-grades" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span>1. Exams & Grades (Admin)</span>
            </TabsTrigger>
            <TabsTrigger value="student-marks" className="gap-2">
              <Award className="w-4 h-4" />
              <span>2. Student Marks Tab</span>
            </TabsTrigger>
            <TabsTrigger value="class-gradebook" className="gap-2">
              <Users className="w-4 h-4" />
              <span>3. Class Gradebook</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exams-grades">
            <ExamsGrades />
          </TabsContent>

          <TabsContent value="student-marks">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <StudentMarksTab 
                studentName="Emma Johnson"
                studentClass="10"
                studentSection="A"
              />
            </div>
          </TabsContent>

          <TabsContent value="class-gradebook">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ClassGradebook
                className="10"
                classSection="A"
                subject="Mathematics"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
