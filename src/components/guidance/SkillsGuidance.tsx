import React, { useState } from 'react';
import { Zap, ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';

const SkillsGuidance: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-emerald-50 rounded-lg shadow-sm border border-emerald-200">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-emerald-900">Technical Skills - ATS Critical Section</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-emerald-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-emerald-600" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-emerald-800 space-y-3">
          <div className="bg-red-100 p-3 rounded border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-red-800">Certification Mistakes That Kill Your Chances</p>
            </div>
            <ul className="text-red-700 space-y-1">
              <li>• Remove entry-level certs if you have 5+ years experience</li>
              <li>• AWS Cloud Practitioner = red flag for senior roles</li>
              <li>• Google IT Certificate = entry-level signal</li>
              <li>• Only list certs relevant to the target role</li>
            </ul>
          </div>

          <div className="bg-emerald-100 p-3 rounded">
            <p className="font-semibold mb-2">🎯 Skills That Actually Get Interviews</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="font-medium text-emerald-900">High-Demand 2025:</p>
                <ul className="space-y-1 text-sm">
                  <li>• AI/ML frameworks</li>
                  <li>• Cloud architecture</li>
                  <li>• DevOps/CI/CD</li>
                  <li>• Microservices</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-emerald-900">Premium Certs:</p>
                <ul className="space-y-1 text-sm">
                  <li>• CISSP, CISM</li>
                  <li>• AWS Solutions Architect</li>
                  <li>• CompTIA CYSA+</li>
                  <li>• Azure Expert</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border border-emerald-200">
            <p className="font-semibold mb-2">📊 ATS Optimization Strategy</p>
            <ul className="space-y-1">
              <li>• Match exact keywords from job description</li>
              <li>• Use both acronyms and full names (AWS & Amazon Web Services)</li>
              <li>• List most relevant skills first</li>
              <li>• Group by category for easy scanning</li>
              <li>• Update for each application</li>
            </ul>
          </div>

          <div className="bg-yellow-100 p-3 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-yellow-600" />
              <p className="font-semibold text-yellow-800">Pro Tip: The Niche Strategy</p>
            </div>
            <p className="text-yellow-700">Specialists earn 40%+ more than generalists. Pick 2-3 core technologies and become the expert.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsGuidance;