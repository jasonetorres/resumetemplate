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

  const handleEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = () => {
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  const handleUpdatePersonalInfo = (personalInfo: PersonalInfo) => {
    onUpdate({ ...data, personalInfo });
  };

  const handleUpdateSummary = (professionalSummary: ProfessionalSummary) => {
    onUpdate({ ...data, professionalSummary });
  };

  const handleUpdateSkills = (technicalSkills: TechnicalSkills) => {
    onUpdate({ ...data, technicalSkills });
  };

  const handleUpdateExperience = (experience: Experience[]) => {
    onUpdate({ ...data, experience });
  };

  const handleUpdateProjects = (projects: Project[]) => {
    onUpdate({ ...data, projects });
  };

  const handleUpdateEducation = (education: Education[]) => {
    onUpdate({ ...data, education });
  };

  const SectionWithGuidance: React.FC<{ 
    children: React.ReactNode; 
    guidance: React.ReactNode;
    sectionName: string;
  }> = ({ children, guidance, sectionName }) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
      <div className="space-y-4">
        {children}
        {showGuidance && (
          <div className="border-t border-gray-200 pt-3">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2 px-3 py-2 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#0044ff' }}
            >
              <span>💡 Tips for {sectionName}</span>
            </button>
            
            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">Tips for {sectionName}</h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    {guidance}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="resume-content" className="max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
      {/* Role-Specific Tips - Only show when guidance is enabled */}
      {showGuidance && (
        <div className="mb-8">
          <RoleSpecificTips />
        </div>
      )}

      {/* Personal Info */}
      <SectionWithGuidance guidance={<PersonalInfoGuidance />} sectionName="Personal Info">
        <EditableSection
          title="Personal Information"
          isEditing={editingSection === 'personal'}
          onEdit={() => handleEdit('personal')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <PersonalInfoEditor
              data={data.personalInfo}
              onUpdate={handleUpdatePersonalInfo}
            />
          }
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center">{data.personalInfo.name}</h1>
              <button
                onClick={() => handleEdit('personal')}
                className="ml-2 sm:ml-3 flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: '#0044ff' }}
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <h2 className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">{data.personalInfo.title}</h2>
            <div className="text-gray-600 text-xs sm:text-sm">
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
                <span className="break-all">{data.personalInfo.email}</span>
                <span className="hidden sm:inline">▪</span>
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-1">
                <span className="break-all">{data.personalInfo.website}</span>
                <span className="hidden sm:inline">▪</span>
                <span className="break-all">{data.personalInfo.linkedin}</span>
                <span className="hidden sm:inline">▪</span>
                <span className="break-all">{data.personalInfo.github}</span>
              </div>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Professional Summary */}
      <SectionWithGuidance guidance={<SummaryGuidance />} sectionName="Professional Summary">
        <EditableSection
          title="Professional Summary"
          isEditing={editingSection === 'summary'}
          onEdit={() => handleEdit('summary')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <ProfessionalSummaryEditor
              data={data.professionalSummary}
              onUpdate={handleUpdateSummary}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 border-black flex-1">
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
              {data.professionalSummary.content}
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Technical Skills */}
      <SectionWithGuidance guidance={<SkillsGuidance />} sectionName="Technical Skills">
        <EditableSection
          title="Technical Skills"
          isEditing={editingSection === 'skills'}
          onEdit={() => handleEdit('skills')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <TechnicalSkillsEditor
              data={data.technicalSkills}
              onUpdate={handleUpdateSkills}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 border-black flex-1">
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
                {data.technicalSkills.languages && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                    <div className="font-semibold text-gray-800">Languages:</div>
                    <div className="sm:col-span-3 text-gray-700">{data.technicalSkills.languages}</div>
                  </div>
                )}
                
                {data.technicalSkills.frameworks && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                    <div className="font-semibold text-gray-800">Frameworks & Libraries:</div>
                    <div className="sm:col-span-3 text-gray-700">{data.technicalSkills.frameworks}</div>
                  </div>
                )}
                
                {data.technicalSkills.tools && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                    <div className="font-semibold text-gray-800">Tools & Platforms:</div>
                    <div className="sm:col-span-3 text-gray-700">{data.technicalSkills.tools}</div>
                  </div>
                )}
                
                {data.technicalSkills.methodologies && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                    <div className="font-semibold text-gray-800">Methodologies:</div>
                    <div className="sm:col-span-3 text-gray-700">{data.technicalSkills.methodologies}</div>
                  </div>
                )}
                
                {data.technicalSkills.certifications && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm">
                    <div className="font-semibold text-gray-800">Certifications:</div>
                    <div className="sm:col-span-3 text-gray-700">{data.technicalSkills.certifications}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Professional Experience */}
      <SectionWithGuidance guidance={<ExperienceGuidance />} sectionName="Experience">
        <EditableSection
          title="Professional Experience"
          isEditing={editingSection === 'experience'}
          onEdit={() => handleEdit('experience')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <ExperienceEditor
              data={data.experience}
              onUpdate={handleUpdateExperience}
            />
          }
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 border-black flex-1">
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
              {data.experience.map((exp, index) => (
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
      {/* Projects - Only show if there are projects or if editing */}
      {(data.projects.length > 0 || editingSection === 'projects') && (
        <SectionWithGuidance guidance={<ProjectsGuidance />} sectionName="Projects">
          <EditableSection
            title="Projects"
            isEditing={editingSection === 'projects'}
            onEdit={() => handleEdit('projects')}
            onSave={handleSave}
            onCancel={handleCancel}
            editor={
              <ProjectsEditor
                data={data.projects}
                onUpdate={handleUpdateProjects}
              />
            }
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 border-black flex-1">
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
              {data.projects.length > 0 ? (
                <div className="space-y-4">
                  {data.projects.map((project, index) => (
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
              ) : (
                <div className="text-gray-500 italic text-sm">
                  No projects added yet. Click "Edit" to add your first project.
                </div>
              )}
            </div>
          </EditableSection>
        </SectionWithGuidance>
      )}

      {/* Add Projects Button - Only show if no projects exist and not editing */}
      {data.projects.length === 0 && editingSection !== 'projects' && (
        <div className="mb-6">
          <button
            onClick={() => handleEdit('projects')}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors flex items-center justify-center space-x-2"
          >
            <span>+ Add Projects Section</span>
          </button>
        </div>
      )}

      {/* Education */}
      {/* Education - Only show if there is education or if editing */}
      {(data.education.length > 0 || editingSection === 'education') && (
        <SectionWithGuidance guidance={<EducationGuidance />} sectionName="Education">
          <EditableSection
            title="Education"
            isEditing={editingSection === 'education'}
            onEdit={() => handleEdit('education')}
            onSave={handleSave}
            onCancel={handleCancel}
            editor={
              <EducationEditor
                data={data.education}
                onUpdate={handleUpdateEducation}
              />
            }
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 border-black flex-1">
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
              {data.education.length > 0 ? (
                <div className="space-y-2">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{edu.institution} | {edu.duration}</h4>
                      <div className="text-gray-700 text-sm sm:text-base">{edu.degree}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic text-sm">
                  No education added yet. Click "Edit" to add your education.
                </div>
              )}
            </div>
          </EditableSection>
        </SectionWithGuidance>
      )}

      {/* Add Education Button - Only show if no education exists and not editing */}
      {data.education.length === 0 && editingSection !== 'education' && (
        <div className="mb-4">
          <button
            onClick={() => handleEdit('education')}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors flex items-center justify-center space-x-2"
          >
            <span>+ Add Education Section</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;