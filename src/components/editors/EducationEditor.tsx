import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Education } from '../../types/resume';

interface EducationEditorProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

const EducationEditor: React.FC<EducationEditorProps> = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState<Education[]>(data);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isEditingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isEditingRef.current) {
      setLocalData(data);
    }
  }, [data]);

  const updateWithDebounce = (newData: Education[]) => {
    setLocalData(newData);
    isEditingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onUpdate(newData);
      isEditingRef.current = false;
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const addEducation = () => {
    const newEdu: Education = {
      institution: "",
      degree: "",
      duration: ""
    };
    updateWithDebounce([...localData, newEdu]);
  };

  const removeEducation = (index: number) => {
    updateWithDebounce(localData.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newData = localData.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    updateWithDebounce(newData);
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