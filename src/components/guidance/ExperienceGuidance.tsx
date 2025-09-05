import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, AlertTriangle, Target } from 'lucide-react';

const ExperienceGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-indigo-50 rounded-lg shadow-sm border border-indigo-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          <h4 className="font-bold text-indigo-900">Professional Experience - Show Impact, Not Duties</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-indigo-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-indigo-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-indigo-800 space-y-3">
          <div className="bg-red-100 p-3 rounded border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-red-800">Instant Rejection Triggers</p>
            </div>
            <ul className="text-red-700 space-y-1">
              <li>• "Responsible for..." (shows no impact)</li>
              <li>• Copy-pasted job descriptions</li>
              <li>• No quantifiable results</li>
              <li>• Generic bullet points</li>
              <li>• Missing technologies used</li>
            </ul>
          </div>

          <div className="bg-indigo-100 p-3 rounded">
            <p className="font-semibold mb-2">🎯 The STAR Method Formula</p>
            <div className="bg-white p-2 rounded border border-indigo-200 mb-2">
              <p className="font-mono text-xs">
                <strong>[Action Verb]</strong> + <strong>[Technology]</strong> + <strong>[Context]</strong> + <strong>[Quantified Result]</strong>
              </p>
            </div>
            <p className="text-xs italic">Example: "Architected microservices using Docker/Kubernetes, reducing deployment time by 60% and serving 10M+ daily users"</p>
          </div>
          
          <div className="bg-white p-3 rounded border border-indigo-200">
            <p className="font-semibold mb-2">❌ Avoid These "Fluff Words"</p>
            <div className="text-xs text-red-700 space-y-1">
              <p className="font-medium mb-2">These words make you sound generic and get filtered out by ATS:</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p>• "Responsible for..."</p>
                  <p>• "Assisted with..."</p>
                  <p>• "Helped to..."</p>
                  <p>• "Worked on..."</p>
                </div>
                <div>
                  <p>• "Collaborated on..."</p>
                  <p>• "Participated in..."</p>
                  <p>• "Contributed to..."</p>
                  <p>• "Involved in..."</p>
                </div>
              </div>
              <p className="font-medium mt-2 text-indigo-700">Instead: Start with specific action verbs and quantify your impact!</p>
            </div>
          </div>

          <div className="bg-green-100 p-3 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <p className="font-semibold text-green-800">What Hiring Managers Actually Want</p>
            </div>
            <ul className="text-green-700 space-y-1">
              <li>• Senior qualities (resourceful, independent)</li>
              <li>• Process improvement mindset</li>
              <li>• Leadership potential (even without title)</li>
              <li>• Quantified business impact</li>
              <li>• Modern tech stack experience</li>
            </ul>
          </div>

          <div className="bg-yellow-100 p-3 rounded">
            <p className="font-semibold mb-2 text-yellow-800">💡 Numbers Game Reality</p>
            <p className="text-yellow-700 text-xs">Even small numbers beat no numbers. "Improved performance by 15%" &gt; "Improved performance significantly"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceGuidance;