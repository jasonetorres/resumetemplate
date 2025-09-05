import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { PersonalInfo, ProfessionalSummary, TechnicalSkills, Experience, Project, Education } from '../types/resume';
import EditableSection from './EditableSection';
import PersonalInfoEditor from './editors/PersonalInfoEditor';
import ProfessionalSummaryEditor from './editors/ProfessionalSummaryEditor';
import TechnicalSkillsEditor from './editors/TechnicalSkillsEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import EducationEditor from './editors/EducationEditor';
import PersonalInfoGuidance from './guidance/PersonalInfoGuidance';
import SummaryGuidance from './guidance/SummaryGuidance';
import SkillsGuidance from './guidance/SkillsGuidance';
import ExperienceGuidance from './guidance/ExperienceGuidance';
import ProjectsGuidance from './guidance/ProjectsGuidance';
import EducationGuidance from './guidance/EducationGuidance';
import RoleSpecificTips from './RoleSpecificTips';

interface ResumePreviewProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
  showGuidance: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onUpdate, showGuidance }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<ResumeData>(data);

  // Update temp data when props change and not editing
  React.useEffect(() => {
    if (!editingSection) {
      setTempData(data);
    }
  }, [data, editingSection]);

  const handleEdit = (section: string) => {
    setTempData(data); // Store current data as temp
    setEditingSection(section);
  };

  const handleSave = () => {
    onUpdate(tempData); // Save temp data to parent
    setEditingSection(null);
  };

  const handleCancel = () => {
    setTempData(data); // Reset temp data to original
    setEditingSection(null);
  };

  const handleUpdatePersonalInfo = (personalInfo: PersonalInfo) => {
    setTempData({ ...tempData, personalInfo });
  };

  const handleUpdateSummary = (professionalSummary: ProfessionalSummary) => {
    setTempData({ ...tempData, professionalSummary });
  };

  const handleUpdateSkills = (technicalSkills: TechnicalSkills) => {
    setTempData({ ...tempData, technicalSkills });
  };

  const handleUpdateExperience = (experience: Experience[]) => {
    setTempData({ ...tempData, experience });
  };

  const handleUpdateProjects = (projects: Project[]) => {
    setTempData({ ...tempData, projects });
  };

  const handleUpdateEducation = (education: Education[]) => {
    setTempData({ ...tempData, education });
  };

  const SectionWithGuidance: React.FC<{ 
    children: React.ReactNode; 
    guidance: React.ReactNode;
  }> = ({ children, guidance }) => (
    <div className={`${showGuidance ? 'space-y-6 lg:grid lg:grid-cols-1 xl:grid-cols-3 lg:gap-6 lg:space-y-0' : ''}`}>
      <div className={showGuidance ? 'xl:col-span-2' : ''}>
        {children}
      </div>
      {showGuidance && (
        <div className="xl:col-span-1">
          {guidance}
        </div>
      )}
    </div>
  );

  return (
    <div id="resume-content" className="max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
      {/* Role-Specific Tips - Only show when guidance is enabled */}
      {showGuidance && (
        <div className="mb-8">
          <RoleSpecificTips />
        </div>
      )}

      {/* Personal Info */}
      <SectionWithGuidance guidance={<PersonalInfoGuidance />}>
        <EditableSection
          title="Personal Information"
          isEditing={editingSection === 'personal'}
          onEdit={() => handleEdit('personal')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <PersonalInfoEditor
              data={tempData.personalInfo}
              onUpdate={handleUpdatePersonalInfo}
            />
          }
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center">{tempData.personalInfo.name}</h1>
              <button
                onClick={() => handleEdit('personal')}
                className="ml-2 sm:ml-3 flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <h2 className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">{tempData.personalInfo.title}</h2>
            <div className="text-gray-600 text-xs sm:text-sm">
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
                <span className="break-all">{tempData.personalInfo.email}</span>
                <span className="hidden sm:inline">▪</span>
                <span>{tempData.personalInfo.phone}</span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-1">
                <span className="break-all">{tempData.personalInfo.website}</span>
                <span className="hidden sm:inline">▪</span>
                <span className="break-all">{tempData.personalInfo.linkedin}</span>
                <span className="hidden sm:inline">▪</span>
                <span className="break-all">{tempData.personalInfo.github}</span>
              </div>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Professional Summary */}
      <SectionWithGuidance guidance={<SummaryGuidance />}>
        <EditableSection
          title="Professional Summary"
          isEditing={editingSection === 'summary'}
          onEdit={() => handleEdit('summary')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <ProfessionalSummaryEditor
              data={tempData.professionalSummary}
              onUpdate={handleUpdateSummary}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 flex-1" style={{ borderColor: '#0044ff' }}>
                PROFESSIONAL SUMMARY
              </h3>
              <button
                onClick={() => handleEdit('summary')}
                className="flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200 ml-2"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {tempData.professionalSummary.content}
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Technical Skills */}
      <SectionWithGuidance guidance={<SkillsGuidance />}>
        <EditableSection
          title="Technical Skills"
          isEditing={editingSection === 'skills'}
          onEdit={() => handleEdit('skills')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <TechnicalSkillsEditor
              data={tempData.technicalSkills}
              onUpdate={handleUpdateSkills}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 flex-1" style={{ borderColor: '#0044ff' }}>
                TECHNICAL SKILLS
              </h3>
              <button
                onClick={() => handleEdit('skills')}
                className="flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200 ml-2"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <div className="space-y-2">
              <div className="space-y-3 sm:space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                  <div className="font-semibold text-gray-800">Languages:</div>
                  <div className="sm:col-span-3 text-gray-700">{tempData.technicalSkills.languages}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                  <div className="font-semibold text-gray-800">Frameworks & Libraries:</div>
                  <div className="sm:col-span-3 text-gray-700">{tempData.technicalSkills.frameworks}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                  <div className="font-semibold text-gray-800">Tools & Platforms:</div>
                  <div className="sm:col-span-3 text-gray-700">{tempData.technicalSkills.tools}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                  <div className="font-semibold text-gray-800">Methodologies:</div>
                  <div className="sm:col-span-3 text-gray-700">{tempData.technicalSkills.methodologies}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                  <div className="font-semibold text-gray-800">Certifications:</div>
                  <div className="sm:col-span-3 text-gray-700">{tempData.technicalSkills.certifications}</div>
                </div>
              </div>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Professional Experience */}
      <SectionWithGuidance guidance={<ExperienceGuidance />}>
        <EditableSection
          title="Professional Experience"
          isEditing={editingSection === 'experience'}
          onEdit={() => handleEdit('experience')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <ExperienceEditor
              data={tempData.experience}
              onUpdate={handleUpdateExperience}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 flex-1" style={{ borderColor: '#0044ff' }}>
                PROFESSIONAL EXPERIENCE
              </h3>
              <button
                onClick={() => handleEdit('experience')}
                className="flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200 ml-2"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <div className="space-y-4 sm:space-y-5">
              {tempData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="mb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">{exp.company} | {exp.location}</h4>
                        <div className="text-gray-700 text-sm sm:text-base">{exp.position} | {exp.duration}</div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm italic mt-1" style={{ color: '#0044ff' }}>
                      Technologies: {exp.technologies}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2 sm:ml-4 text-sm sm:text-base">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Projects */}
      <SectionWithGuidance guidance={<ProjectsGuidance />}>
        <EditableSection
          title="Projects"
          isEditing={editingSection === 'projects'}
          onEdit={() => handleEdit('projects')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <ProjectsEditor
              data={tempData.projects}
              onUpdate={handleUpdateProjects}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 flex-1" style={{ borderColor: '#0044ff' }}>
                PROJECTS
              </h3>
              <button
                onClick={() => handleEdit('projects')}
                className="flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200 ml-2"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <div className="space-y-4">
              {tempData.projects.map((project, index) => (
                <div key={index}>
                  <div className="mb-2">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">{project.name} | {project.duration}</h4>
                    <div className="text-xs sm:text-sm italic" style={{ color: '#0044ff' }}>
                      Technologies: {project.technologies}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2 sm:ml-4 text-sm sm:text-base">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                  {project.url && (
                    <div className="text-xs sm:text-sm mt-1 break-all" style={{ color: '#0044ff' }}>
                      URL: <span className="break-all">{project.url}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Education */}
      <SectionWithGuidance guidance={<EducationGuidance />}>
        <EditableSection
          title="Education"
          isEditing={editingSection === 'education'}
          onEdit={() => handleEdit('education')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <EducationEditor
              data={tempData.education}
              onUpdate={handleUpdateEducation}
            />
          }
        >
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 flex-1" style={{ borderColor: '#0044ff' }}>
                EDUCATION
              </h3>
              <button
                onClick={() => handleEdit('education')}
                className="flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200 ml-2"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <div className="space-y-2">
              {tempData.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">{edu.institution} | {edu.duration}</h4>
                  <div className="text-gray-700 text-sm sm:text-base">{edu.degree}</div>
                </div>
              ))}
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>
    </div>
  );
};

export default ResumePreview;