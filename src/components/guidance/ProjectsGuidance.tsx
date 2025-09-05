import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp, AlertTriangle, Lightbulb } from 'lucide-react';

const ProjectsGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-orange-50 rounded-lg shadow-sm border border-orange-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-orange-600" />
          <h4 className="font-bold text-orange-900">Projects - Your Technical Showcase</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-orange-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-orange-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-orange-800 space-y-3">
          <div className="bg-blue-100 p-3 rounded border border-blue-300">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <p className="font-semibold text-blue-800">Strategic Placement</p>
            </div>
            <ul className="text-blue-700 space-y-1">
              <li>• <strong>New Grads:</strong> Place BEFORE experience section</li>
              <li>• <strong>Career Changers:</strong> Lead with relevant projects</li>
              <li>• <strong>Experienced:</strong> Keep after experience, focus on recent work</li>
            </ul>
          </div>

          <div className="bg-orange-100 p-3 rounded">
            <p className="font-semibold mb-2">🎯 What Actually Impresses Recruiters</p>
            <ul className="space-y-1">
              <li>• <strong>Live URLs:</strong> Always include GitHub + demo links</li>
              <li>• <strong>User Impact:</strong> "Serving 500+ active users" beats technical details</li>
              <li>• <strong>Modern Stack:</strong> Use current, in-demand technologies</li>
              <li>• <strong>Full-Stack:</strong> Show both frontend and backend skills</li>
              <li>• <strong>Real Problems:</strong> Solve actual business/user needs</li>
            </ul>
          </div>
          
          <div className="bg-white p-3 rounded border border-orange-200">
            <p className="font-semibold mb-2">📊 Project Types That Get Interviews</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="font-medium text-orange-900">High-Impact:</p>
                <ul className="space-y-1 text-xs">
                  <li>• SaaS applications</li>
                  <li>• API integrations</li>
                  <li>• Data visualization</li>
                  <li>• Mobile apps</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-orange-900">Avoid:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Tutorial follow-alongs</li>
                  <li>• Basic CRUD apps</li>
                  <li>• Outdated tech stacks</li>
                  <li>• Broken demo links</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-100 p-3 rounded border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-red-800">Common Project Mistakes</p>
            </div>
            <ul className="text-red-700 space-y-1">
              <li>• No live demo or GitHub link</li>
              <li>• Focusing on features instead of impact</li>
              <li>• Using outdated or basic technologies</li>
              <li>• No metrics or user feedback</li>
              <li>• Poor project descriptions</li>
            </ul>
          </div>

          <div className="bg-green-100 p-3 rounded">
            <p className="font-semibold mb-2 text-green-800">💡 Pro Tips for Project Descriptions</p>
            <ul className="text-green-700 space-y-1">
              <li>• Lead with the problem you solved</li>
              <li>• Mention specific technologies prominently</li>
              <li>• Include performance metrics when possible</li>
              <li>• Show progression and learning</li>
              <li>• Always include working links</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsGuidance;