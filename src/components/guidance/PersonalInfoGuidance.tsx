import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';

const PersonalInfoGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-blue-900">Personal Information Tips</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-blue-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-blue-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-blue-800 space-y-3">
          <div className="bg-blue-100 p-3 rounded">
            <p className="font-semibold mb-2">🎯 ATS Optimization</p>
            <ul className="space-y-1">
              <li>• Use your full legal name as it appears on documents</li>
              <li>• Include professional credentials (BSc, MSc, etc.) after your name</li>
              <li>• Use a professional email address (avoid nicknames)</li>
              <li>• Include LinkedIn and GitHub - recruiters check these first</li>
            </ul>
          </div>
          
          <div className="bg-white p-3 rounded border border-blue-200">
            <p className="font-semibold mb-2">⚡ Pro Tips from 100+ Resume Reviews</p>
            <ul className="space-y-1">
              <li>• Your title should match the role you're targeting</li>
              <li>• Use a professional phone number (no funny voicemails)</li>
              <li>• Portfolio website &gt; personal blog for tech roles</li>
              <li>• Keep contact info on one line to save space</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoGuidance;