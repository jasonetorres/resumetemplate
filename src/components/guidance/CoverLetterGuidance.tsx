import React, { useState } from 'react';
import { Mail, ChevronDown, ChevronUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';

const CoverLetterGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-green-50 rounded-lg shadow-sm border border-green-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-green-600" />
          <h4 className="font-bold text-green-900">Cover Letter Writing Guide</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-green-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-green-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-green-800 space-y-3">
          <div className="bg-green-100 p-3 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <p className="font-semibold text-green-800">The 3-Paragraph Formula</p>
            </div>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border border-green-200">
                <p className="font-medium">1. Opening:</p>
                <p className="text-xs">Hook + Position + Brief qualification summary</p>
              </div>
              <div className="bg-white p-2 rounded border border-green-200">
                <p className="font-medium">2. Body:</p>
                <p className="text-xs">Specific achievements + Company research + Value proposition</p>
              </div>
              <div className="bg-white p-2 rounded border border-green-200">
                <p className="font-medium">3. Closing:</p>
                <p className="text-xs">Call to action + Thank you + Professional sign-off</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-green-200">
            <p className="font-semibold mb-2">🎯 What Makes Cover Letters Work</p>
            <ul className="space-y-1">
              <li>• <strong>Personalization:</strong> Address hiring manager by name</li>
              <li>• <strong>Company Research:</strong> Mention specific projects/values</li>
              <li>• <strong>Quantified Results:</strong> Use numbers from your resume</li>
              <li>• <strong>Enthusiasm:</strong> Show genuine interest in the role</li>
              <li>• <strong>Brevity:</strong> Keep it to one page maximum</li>
            </ul>
          </div>

          <div className="bg-red-100 p-3 rounded border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-red-800">Common Mistakes to Avoid</p>
            </div>
            <ul className="text-red-700 space-y-1">
              <li>• Generic "To Whom It May Concern" openings</li>
              <li>• Repeating your resume word-for-word</li>
              <li>• Focusing on what you want vs. what you offer</li>
              <li>• Being too long (over one page)</li>
              <li>• Forgetting to proofread for typos</li>
            </ul>
          </div>

          <div className="bg-blue-100 p-3 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <p className="font-semibold text-blue-800">Pro Tips for 2025</p>
            </div>
            <ul className="text-blue-700 space-y-1">
              <li>• Research the hiring manager on LinkedIn</li>
              <li>• Mention recent company news or achievements</li>
              <li>• Use keywords from the job description</li>
              <li>• Show cultural fit, not just technical skills</li>
              <li>• End with confidence, not desperation</li>
            </ul>
          </div>

          <div className="bg-yellow-100 p-3 rounded">
            <p className="font-semibold mb-2 text-yellow-800">💡 Industry Insight</p>
            <p className="text-yellow-700 text-xs">
              Only 40% of candidates submit cover letters, but they increase interview chances by 50% when done well. 
              Make yours count by being specific, enthusiastic, and results-focused.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGuidance;