import React, { useState, useEffect } from 'react';
import { ProfessionalSummary } from '../../types/resume';

interface ProfessionalSummaryEditorProps {
  data: ProfessionalSummary;
  onUpdate: (data: ProfessionalSummary) => void;
}

const ProfessionalSummaryEditor: React.FC<ProfessionalSummaryEditorProps> = ({ data, onUpdate }) => {

  const handleChange = (value: string) => {
    const newData = { content: value };
    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Professional Summary</label>
        <textarea
          value={data.content}
          onChange={(e) => handleChange(e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-mono text-sm bg-white text-gray-900"
          style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
          placeholder="Write your professional summary here..."
        />
      </div>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl border-l-4" style={{ borderLeftColor: '#0044ff' }}>
        <h4 className="font-semibold text-blue-900 mb-2 font-inter">🎯 The Formula That Gets Interviews:</h4>
        <div className="text-sm text-blue-800 space-y-2 font-inter">
          <div className="bg-white p-3 rounded-xl border border-blue-200">
            <p className="font-semibold mb-1">1. Experience Statement:</p>
            <p className="italic">"X+ years of professional experience as [Role] in [Industry]"</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200">
            <p className="font-semibold mb-1">2. Primary Skillset:</p>
            <p className="italic">"X years of experience in [main technical skills]"</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200">
            <p className="font-semibold mb-1">3. Secondary Skills:</p>
            <p className="italic">"Proficient in [differentiating technologies/methodologies]"</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200">
            <p className="font-semibold mb-1">4. Key Achievement:</p>
            <p className="italic">"[Action verb] [what you did], [quantified result]"</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200">
            <p className="font-semibold mb-1">5. Education/Certs:</p>
            <p className="italic">"Holder of [degree] and certified as [relevant certification]"</p>
          </div>
        </div>
        <div className="mt-3 p-2 bg-yellow-100 rounded-xl border-l-4 border-yellow-400">
          <p className="text-yellow-800 font-semibold text-xs font-inter">💡 This section alone can get you past ATS screening!</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfessionalSummaryEditor);