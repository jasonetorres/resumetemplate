import React, { useState } from 'react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoEditorProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ data, onUpdate, onSave, onCancel }) => {
  const [localData, setLocalData] = useState<PersonalInfo>(data);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Full Name</label>
          <input
            type="text"
            value={localData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="John D. Eveloper, BSc"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Professional Title</label>
          <input
            type="text"
            value={localData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Senior Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Email</label>
          <input
            type="email"
            value={localData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Phone</label>
          <input
            type="text"
            value={localData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="555-555-5555"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Website</label>
          <input
            type="url"
            value={localData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">LinkedIn</label>
          <input
            type="text"
            value={localData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">GitHub</label>
          <input
            type="text"
            value={localData.github}
            onChange={(e) => handleChange('github', e.target.value)}
            onBlur={handleBlur}
            onBlur={handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="github.com/yourusername"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoEditor;
