import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
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

  const removeCategory = (field: keyof TechnicalSkills) => {
    const newData = { ...localData, [field]: '' };
    setLocalData(newData);
    onUpdate(newData);
  };

  const addCategory = (field: keyof TechnicalSkills) => {
    const newData = { ...localData, [field]: '' };
    setLocalData(newData);
    onUpdate(newData);
  };

  const handleSave = () => {
    onUpdate(localData);
    onSave?.();
  };

  const handleCancel = () => {
    setLocalData(data);
    onCancel?.();
  };

  const categoryLabels = {
    languages: 'Programming Languages',
    frameworks: 'Frameworks & Libraries',
    tools: 'Tools & Platforms',
    methodologies: 'Methodologies',
    certifications: 'Certifications'
  };

  const categoryPlaceholders = {
    languages: 'Python, JavaScript, TypeScript, Java, SQL, Go',
    frameworks: 'Django, Flask, React, Node.js, Spring Boot',
    tools: 'AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Jenkins, Git',
    methodologies: 'Agile, Scrum, Kanban, Test-Driven Development (TDD), CI/CD',
    certifications: 'AWS Certified Solutions Architect - Professional'
  };

  return (
    <div className="space-y-4">
      {/* Render existing categories */}
      {Object.entries(categoryLabels).map(([key, label]) => {
        const fieldKey = key as keyof TechnicalSkills;
        const hasContent = localData[fieldKey];
        
        if (!hasContent) return null;
        
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 font-inter">{label}</label>
              <button
                onClick={() => removeCategory(fieldKey)}
                className="text-red-600 hover:text-red-700"
                title="Remove this category"
              >
                <Minus className="w-3 h-3" />
              </button>
            </div>
            <input
              type="text"
              value={localData[fieldKey]}
              onChange={(e) => handleChange(fieldKey, e.target.value)}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder={categoryPlaceholders[fieldKey]}
            />
          </div>
        );
      })}

      {/* Add missing categories */}
      {Object.entries(categoryLabels).some(([key]) => !localData[key as keyof TechnicalSkills]) && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2 font-inter">Add Categories:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const fieldKey = key as keyof TechnicalSkills;
              const hasContent = localData[fieldKey];
              
              if (hasContent) return null;
              
              return (
                <button
                  key={key}
                  onClick={() => addCategory(fieldKey)}
                  className="flex items-center space-x-1 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-inter"
                >
                  <Plus className="w-3 h-3" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalSkillsEditor;