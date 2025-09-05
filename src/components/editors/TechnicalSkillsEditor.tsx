import React, { useState } from 'react';
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
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Programming Languages</label>
        <input
          type="text"
          value={localData.languages}
          onChange={(e) => handleChange('languages', e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Python, JavaScript, TypeScript, Java, SQL, Go"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Frameworks & Libraries</label>
        <input
          type="text"
          value={localData.frameworks}
          onChange={(e) => handleChange('frameworks', e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Django, Flask, React, Node.js, Spring Boot"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Tools & Platforms</label>
        <input
          type="text"
          value={localData.tools}
          onChange={(e) => handleChange('tools', e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Jenkins, Git"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Methodologies</label>
        <input
          type="text"
          value={localData.methodologies}
          onChange={(e) => handleChange('methodologies', e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Agile, Scrum, Kanban, Test-Driven Development (TDD), CI/CD"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Certifications</label>
        <input
          type="text"
          value={localData.certifications}
          onChange={(e) => handleChange('certifications', e.target.value)}
          onBlur={handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="AWS Certified Solutions Architect - Professional"
        />
      </div>
    </div>
  );
};

export default TechnicalSkillsEditor;