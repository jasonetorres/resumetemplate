import React, { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, AlertTriangle, Target } from 'lucide-react';

const EducationGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-teal-50 rounded-lg shadow-sm border border-teal-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-teal-600" />
          <h4 className="font-bold text-teal-900">Education - Strategic Placement Matters</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-teal-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-teal-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-teal-800 space-y-3">
          <div className="bg-teal-100 p-3 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-teal-600" />
              <p className="font-semibold text-teal-800">Placement Strategy</p>
            </div>
            <ul className="space-y-1">
              <li>• <strong>Experienced (5+ years):</strong> Place at bottom - experience matters more</li>
              <li>• <strong>Recent Grads:</strong> Move to top, include GPA if 3.5+</li>
              <li>• <strong>Career Changers:</strong> Highlight relevant coursework</li>
              <li>• <strong>No Degree:</strong> Focus on certifications and bootcamps</li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded border border-teal-200">
            <p className="font-semibold mb-2">📚 What to Include</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="font-medium text-teal-900">Always Include:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Degree type and major</li>
                  <li>• Institution name</li>
                  <li>• Graduation year</li>
                  <li>• Honors (Magna Cum Laude, etc.)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-teal-900">Optional (if notable):</p>
                <ul className="space-y-1 text-xs">
                  <li>• GPA (if 3.5+)</li>
                  <li>• Relevant coursework</li>
                  <li>• Academic projects</li>
                  <li>• Dean's list</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-100 p-3 rounded">
            <p className="font-semibold mb-2 text-yellow-800">💡 Real Estate Management</p>
            <p className="text-yellow-700">First page is premium space. For experienced professionals, education gets 1-2 lines max. Save space for skills and experience.</p>
          </div>

          <div className="bg-red-100 p-3 rounded border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-red-800">Common Mistakes</p>
            </div>
            <ul className="text-red-700 space-y-1">
              <li>• Taking up too much space for experienced professionals</li>
              <li>• Including irrelevant coursework</li>
              <li>• Listing high school (unless no college)</li>
              <li>• Including low GPAs</li>
              <li>• Over-detailing for senior roles</li>
            </ul>
          </div>

          <div className="bg-green-100 p-3 rounded">
            <p className="font-semibold mb-2 text-green-800">🎯 Alternative Education Paths</p>
            <ul className="text-green-700 space-y-1">
              <li>• Bootcamps: Include if recent and relevant</li>
              <li>• Online courses: Only if from prestigious platforms</li>
              <li>• Self-taught: Emphasize through projects and skills</li>
              <li>• Certifications: Often more valuable than degrees in tech</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationGuidance;