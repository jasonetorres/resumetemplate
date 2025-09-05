import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Education } from '../../types/resume';

interface EducationEditorProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const EducationEditor: React.FC<EducationEditorProps> = ({ data, onUpdate, onSave, onCancel }) => {
  const [localData, setLocalData] = useState<Education[]>(data);

  const handleSave = () => {
    onUpdate(localData);
    onSave?.();
  };

  const handleCancel = () => {
    setLocalData(data);
    onCancel?.();
  };

  // Auto-save changes as user types
  const handleUpdate = (newData: Education[]) => {
    setLocalData(newData);
  };

  const handleBlur = () => {
    onUpdate(localData);
  };

  const addEducation = () => {
    const newEdu: Education = {
      institution: "",
      degree: "",
      duration: ""
    };
    handleUpdate([...localData, newEdu]);
  };

  const removeEducation = (index: number) => {
    const newData = localData.filter((_, i) => i !== index);
    setLocalData(newData);
    onUpdate(newData);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newData = localData.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    handleUpdate(newData);
  };

  return (
    <div className="space-y-6">
      {localData.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">Education #{index + 1}</h4>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="State University"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="Bachelor of Science in Computer Science, Magna Cum Laude"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={edu.duration}
                onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="08/2013 – 05/2017"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        style={{ '--hover-border-color': '#0044ff' } as React.CSSProperties}
      >
        <Plus className="w-5 h-5" />
        <span>Add Education</span>
      </button>

      <div className="bg-pink-50 p-4 rounded-md border-l-4 border-pink-400">
        <h4 className="font-semibold text-pink-800 mb-2">📍 Strategic Placement Guide:</h4>
        <div className="text-sm text-pink-700 space-y-2">
          <div className="bg-white p-2 rounded border">
            <strong>5+ Years Experience:</strong> Bottom (save space for skills/experience)
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Recent Graduate:</strong> Top (it's your main qualification)
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Include if 3.5+ GPA:</strong> Magna Cum Laude, relevant coursework
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationEditor;