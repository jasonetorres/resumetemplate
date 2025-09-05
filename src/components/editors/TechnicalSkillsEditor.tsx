import React, { useState, useEffect } from 'react';
import { TechnicalSkills } from '../../types/resume';

interface TechnicalSkillsEditorProps {
  data: TechnicalSkills;
  onUpdate: (data: TechnicalSkills) => void;
}

const TechnicalSkillsEditor: React.FC<TechnicalSkillsEditorProps> = ({ data, onUpdate }) => {

  const handleChange = (field: keyof TechnicalSkills, value: string) => {
    const newData = { ...data, [field]: value };
    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Programming Languages</label>
        <input
          type="text"
          value={data.languages}
          onChange={(e) => handleChange('languages', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Python, JavaScript, TypeScript, Java, SQL, Go"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Frameworks & Libraries</label>
        <input
          type="text"
          value={data.frameworks}
          onChange={(e) => handleChange('frameworks', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Django, Flask, React, Node.js, Spring Boot"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Tools & Platforms</label>
        <input
          type="text"
          value={data.tools}
          onChange={(e) => handleChange('tools', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Jenkins, Git"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Methodologies</label>
        <input
          type="text"
          value={data.methodologies}
          onChange={(e) => handleChange('methodologies', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Agile, Scrum, Kanban, Test-Driven Development (TDD), CI/CD"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Certifications</label>
        <input
          type="text"
          value={data.certifications}
          onChange={(e) => handleChange('certifications', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="AWS Certified Solutions Architect - Professional"
        />
      </div>

      <div className="space-y-4">
        <div className="bg-gray-600 p-4 rounded-xl border-l-4" style={{ borderLeftColor: '#0044ff' }}>
          <h4 className="font-semibold text-white mb-2 font-inter">🔥 2025 In-Demand Skills:</h4>
          <div className="text-sm text-gray-300 space-y-2 font-inter">
            <div><strong>AI/ML:</strong> Python, TensorFlow, PyTorch, LangChain, OpenAI API</div>
            <div><strong>Cloud:</strong> AWS/Azure advanced services, Kubernetes, Terraform</div>
            <div><strong>Security:</strong> Zero Trust, SIEM, Incident Response, Compliance</div>
            <div><strong>DevOps:</strong> CI/CD, Infrastructure as Code, Monitoring</div>
          </div>
        </div>
        
        <div className="bg-red-900/30 p-4 rounded-xl border-l-4 border-red-400">
          <h4 className="font-semibold text-red-300 mb-2 font-inter">❌ Skills That Hurt Your Chances:</h4>
          <ul className="text-sm text-red-200 space-y-1 font-inter">
            <li>• Entry-level certs if you have 5+ years experience</li>
            <li>• Outdated technologies (unless specifically required)</li>
            <li>• Skills not relevant to your target role</li>
            <li>• Generic terms like "Microsoft Office"</li>
          </ul>
        </div>
        
        <div className="bg-yellow-900/30 p-4 rounded-xl border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-300 mb-2 font-inter">🎯 ATS Optimization Strategy:</h4>
          <ul className="text-sm text-yellow-200 space-y-1 font-inter">
            <li>• Aim for 60%+ keyword match with job descriptions</li>
            <li>• Use exact terminology from job postings</li>
            <li>• Include both acronyms and full names (AWS & Amazon Web Services)</li>
            <li>• Create role-specific resume versions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechnicalSkillsEditor);