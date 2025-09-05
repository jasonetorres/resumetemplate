import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const SummaryGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-purple-50 rounded-lg shadow-sm border border-purple-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-purple-600" />
          <h4 className="font-bold text-purple-900">Professional Summary - Your "Mini Cover Letter"</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-purple-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-purple-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-purple-800 space-y-3">
          <div className="bg-red-100 p-3 rounded border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-red-800">Critical: Most Resumes Fail Here</p>
            </div>
            <p className="text-red-700">90% of tech resumes get rejected because they don't tailor this section to each job. This is your make-or-break section.</p>
          </div>

          <div className="bg-purple-100 p-3 rounded">
            <p className="font-semibold mb-2">📋 The Winning Formula (Use This Exact Structure)</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li><strong>Experience:</strong> "X+ years of experience as [role] in [industry]"</li>
              <li><strong>Primary Skills:</strong> Your main technical expertise</li>
              <li><strong>Secondary Skills:</strong> What makes you unique</li>
              <li><strong>Key Achievement:</strong> One quantified win</li>
              <li><strong>Education/Certs:</strong> Relevant credentials</li>
            </ol>
          </div>
          
          <div className="bg-white p-3 rounded border border-purple-200">
            <p className="font-semibold mb-2">🎯 ATS Optimization Reality</p>
            <ul className="space-y-1">
              <li>• Must match 60%+ of job description keywords</li>
              <li>• Use exact phrases from the job posting</li>
              <li>• Include industry-specific terminology</li>
              <li>• Avoid AI-generated language (gets flagged)</li>
            </ul>
          </div>

          <div className="bg-green-100 p-3 rounded">
            <p className="font-semibold mb-2">💡 What Actually Works in 2025</p>
            <ul className="space-y-1">
              <li>• Mention specific technologies from job description</li>
              <li>• Include years of experience (recruiters scan for this)</li>
              <li>• Add one impressive metric or achievement</li>
              <li>• Show progression and growth mindset</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryGuidance;