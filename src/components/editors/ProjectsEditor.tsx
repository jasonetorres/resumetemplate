import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Project } from '../../types/resume';

interface ProjectsEditorProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState<Project[]>(data);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isEditingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isEditingRef.current) {
      setLocalData(data);
    }
  }, [data]);

  const updateWithDebounce = (newData: Project[]) => {
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
  const addProject = () => {
    const newProject: Project = {
      name: "",
      duration: "",
      technologies: "",
      description: [""],
      url: ""
    };
    updateWithDebounce([...localData, newProject]);
  };

  const removeProject = (index: number) => {
    updateWithDebounce(localData.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newData = localData.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    updateWithDebounce(newData);
  };

  const addDescription = (projectIndex: number) => {
    const newData = localData.map((project, i) => 
      i === projectIndex ? { ...project, description: [...project.description, ""] } : project
    );
    updateWithDebounce(newData);
  };

  const removeDescription = (projectIndex: number, descIndex: number) => {
    const newData = localData.map((project, i) => 
      i === projectIndex ? { 
        ...project, 
        description: project.description.filter((_, j) => j !== descIndex) 
      } : project
    );
    updateWithDebounce(newData);
  };

  const updateDescription = (projectIndex: number, descIndex: number, value: string) => {
    const newData = localData.map((project, i) => 
      i === projectIndex ? { 
        ...project, 
        description: project.description.map((desc, j) => j === descIndex ? value : desc)
      } : project
    );
    updateWithDebounce(newData);
  };

  return (
    <div className="space-y-6">
      {localData.map((project, projectIndex) => (
        <div key={projectIndex} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">Project #{projectIndex + 1}</h4>
            <button
              onClick={() => removeProject(projectIndex)}
              className="text-red-600 hover:text-red-700"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(projectIndex, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="Portfolio Tracker Pro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={project.duration}
                onChange={(e) => updateProject(projectIndex, 'duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                placeholder="01/2023 – Present"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => updateProject(projectIndex, 'technologies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="Python, Flask, React, Chart.js, Finnhub API"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project URL (optional)</label>
            <input
              type="text"
              value={project.url || ""}
              onChange={(e) => updateProject(projectIndex, 'url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="github.com/yourusername/projectname"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Project Description</label>
              <button
                onClick={() => addDescription(projectIndex)}
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Description</span>
              </button>
            </div>
            {project.description.map((desc, descIndex) => (
              <div key={descIndex} className="flex items-start space-x-2 mb-2">
                <textarea
                  value={desc}
                  onChange={(e) => updateDescription(projectIndex, descIndex, e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
                  style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
                  placeholder="Developed a full-stack web application for..."
                />
                <button
                  onClick={() => removeDescription(projectIndex, descIndex)}
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
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        style={{ '--hover-border-color': '#0044ff' } as React.CSSProperties}
      >
        <Plus className="w-5 h-5" />
        <span>Add Project</span>
      </button>

      <div className="bg-orange-50 p-4 rounded-md">
        <h4 className="font-semibold text-orange-800 mb-2">🎯 Strategic Project Placement:</h4>
        <div className="text-sm text-orange-700 space-y-2">
          <div className="bg-white p-2 rounded border">
            <strong>New Grads/Career Changers:</strong> Place BEFORE experience section
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Experienced Devs:</strong> Place after experience section
          </div>
          <div className="bg-white p-2 rounded border">
            <strong>Must Include:</strong> Live URLs, user metrics, modern tech stack
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEditor;