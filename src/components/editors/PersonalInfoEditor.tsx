import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoEditorProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ data, onUpdate }) => {
  // Use data directly instead of local state to prevent focus issues

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const newData = { ...data, [field]: value };
    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="John D. Eveloper, BSc"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Professional Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Senior Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Phone</label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="555-555-5555"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">LinkedIn</label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">GitHub</label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="github.com/yourusername"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonalInfoEditor);