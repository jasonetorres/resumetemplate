import React, { useState } from 'react';
import { Minus } from 'lucide-react';
import { TechnicalSkills } from '../../types/resume';

interface TechnicalSkillsEditorProps {
  data: TechnicalSkills;
  onUpdate: (data: TechnicalSkills) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const TechnicalSkillsEditor: React.FC<TechnicalSkillsEditorProps> = ({ data, onUpdate, onSave, onCancel }) => {
  const [localData, setLocalData] = useState<TechnicalSkills>(data);

  const handleChange = (field: keyof TechnicalSkills, value: string) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
  };

  const handleBlur = () => {
    onUpdate(localData);
  };

  const handleSave = () => {
    onUpdate(localData);
    onSave?.();
  };

  const handleCancel = () => {
    setLocalData(data);
    onCancel?.();
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 font-inter">Programming Languages</label>
          <button
            onClick={() => handleChange('languages', '')}
            className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
            title="Remove this category"
          >
            <Minus className="w-3 h-3" />
            <span>Remove</span>
          </button>
        </div>
        {localData.languages && (
          <input
            type="text"
            value={localData.languages}
            onChange={(e) => handleChange('languages', e.target.value)}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Python, JavaScript, TypeScript, Java, SQL, Go"
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 font-inter">Frameworks & Libraries</label>
          <button
            onClick={() => handleChange('frameworks', '')}
            className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
            title="Remove this category"
          >
            <Minus className="w-3 h-3" />
            <span>Remove</span>
          </button>
        </div>
        {localData.frameworks && (
          <input
            type="text"
            value={localData.frameworks}
            onChange={(e) => handleChange('frameworks', e.target.value)}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Django, Flask, React, Node.js, Spring Boot"
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 font-inter">Tools & Platforms</label>
          <button
            onClick={() => handleChange('tools', '')}
            className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
            title="Remove this category"
          >
            <Minus className="w-3 h-3" />
            <span>Remove</span>
          </button>
        </div>
        {localData.tools && (
          <input
            type="text"
            value={localData.tools}
            onChange={(e) => handleChange('tools', e.target.value)}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Jenkins, Git"
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 font-inter">Methodologies</label>
          <button
            onClick={() => handleChange('methodologies', '')}
            className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
            title="Remove this category"
          >
            <Minus className="w-3 h-3" />
            <span>Remove</span>
          </button>
        </div>
        {localData.methodologies && (
          <input
            type="text"
            value={localData.methodologies}
            onChange={(e) => handleChange('methodologies', e.target.value)}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Agile, Scrum, Kanban, Test-Driven Development (TDD), CI/CD"
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 font-inter">Certifications</label>
          <button
            onClick={() => handleChange('certifications', '')}
            className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
            title="Remove this category"
          >
            <Minus className="w-3 h-3" />
            <span>Remove</span>
          </button>
        </div>
        {localData.certifications && (
          <input
            type="text"
            value={localData.certifications}
            onChange={(e) => handleChange('certifications', e.target.value)}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="AWS Certified Solutions Architect - Professional"
          />
        )}
      </div>
    </div>
  );
};

export default TechnicalSkillsEditor;