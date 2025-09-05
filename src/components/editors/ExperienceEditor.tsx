import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Experience } from '../../types/resume';

interface ExperienceEditorProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ data, onUpdate }) => {
  const addExperience = () => {
    const newExp: Experience = {
      company: "",
      location: "",
      position: "",
      duration: "",
      technologies: "",
      achievements: [""]
    };
    onUpdate([...data, newExp]);
  };

  const removeExperience = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const newData = data.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onUpdate(newData);
  };

  const addAchievement = (expIndex: number) => {
    const newData = data.map((exp, i) => 
      i === expIndex ? { ...exp, achievements: [...exp.achievements, ""] } : exp
    );
    onUpdate(newData);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const newData = data.map((exp, i) => 
      i === expIndex ? { ...exp, achievements: exp.achievements.filter((_, j) => j !== achIndex) } : exp
    );
    onUpdate(newData);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const newData = data.map((exp, i) => 
      i === expIndex ? { 
        ...exp, 
        achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach)
      } : exp
    );
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      {data.map((exp, expIndex) => (
        <div key={expIndex} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">Experience #{expIndex + 1}</h4>
            <button
              onClick={() => removeExperience(expIndex)}
              className="text-red-600 hover:text-red-700"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateExperience(expIndex, 'duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="06/2021 – Present"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
            <input
              type="text"
              value={exp.technologies}
              onChange={(e) => updateExperience(expIndex, 'technologies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="Python, Django, React, TypeScript, AWS, Docker, Kubernetes, PostgreSQL"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Achievements</label>
              <button
                onClick={() => addAchievement(expIndex)}
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>
            {exp.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex items-start space-x-2 mb-2">
                <textarea
                  value={achievement}
                  onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                  style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                  placeholder="Architected and led the development of..."
                />
                <button
                  onClick={() => removeAchievement(expIndex, achIndex)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        style={{ '--hover-border-color': '#0044ff' } as React.CSSProperties}
      >
        <Plus className="w-5 h-5" />
        <span>Add Experience</span>
      </button>

      <div className="space-y-4">
        <div className="bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400">
          <h4 className="font-semibold text-indigo-800 mb-2">💪 The STAR Method Formula:</h4>
          <div className="text-sm text-indigo-700 space-y-2">
            <div className="bg-white p-3 rounded border">
              <p className="font-semibold">Action Verb + Technology + Quantifiable Result</p>
              <p className="text-xs italic mt-1">Example: "Architected microservices using Docker/K8s, reducing deployment time by 60%"</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-400">
          <h4 className="font-semibold text-red-800 mb-2">❌ Avoid These "Fluff Words":</h4>
          <div className="text-sm text-red-700 space-y-2">
            <p className="font-medium">These words make you sound passive and get filtered out by ATS:</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p>• "Responsible for..."</p>
                <p>• "Assisted with..."</p>
                <p>• "Helped to..."</p>
                <p>• "Worked on..."</p>
              </div>
              <div>
                <p>• "Collaborated on..."</p>
                <p>• "Participated in..."</p>
                <p>• "Contributed to..."</p>
                <p>• "Involved in..."</p>
              </div>
            </div>
            <p className="font-medium text-green-800 mt-2">✅ Instead: Use specific action verbs and quantify your impact!</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-800 mb-2">📊 Numbers Beat Everything:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Even small numbers &gt; no numbers ("Improved by 5%" beats "Improved performance")</li>
            <li>• Show leadership: "Mentored 4 developers", "Led team of 8"</li>
            <li>• Quantify impact: "Reduced costs by 40%", "Increased efficiency by 25%"</li>
            <li>• Show scale: "Processing 10M+ transactions daily"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEditor;