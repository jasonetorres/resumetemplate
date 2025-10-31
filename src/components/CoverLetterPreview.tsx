import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { CoverLetterData } from '../types/resume';
import { PersonalInfo } from '../types/resume';
import EditableSection from './EditableSection';
import PersonalInfoEditor from './editors/PersonalInfoEditor';
import CoverLetterEditor from './editors/CoverLetterEditor';
import CoverLetterGuidance from './guidance/CoverLetterGuidance';

interface CoverLetterPreviewProps {
  data: CoverLetterData;
  onUpdate: (data: CoverLetterData) => void;
  showGuidance: boolean;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data, onUpdate, showGuidance }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Auto-sync personal info changes to cover letter
  React.useEffect(() => {
    // This will be called when personalInfo changes from the resume
  }, [data.personalInfo]);

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

  const handleUpdateCoverLetter = (updatedData: Omit<CoverLetterData, 'personalInfo'>) => {
    onUpdate({ ...data, ...updatedData });
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
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-md hover:-translate-y-0.5 shadow-sm"
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
    <div id="cover-letter-content" className="max-w-4xl mx-auto bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">
      {/* Personal Info Header */}
      <SectionWithGuidance guidance={<div></div>} sectionName="Personal Info">
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
          <div className="text-right mb-6 sm:mb-8">
            <div className="flex items-center justify-end mb-2">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{data.personalInfo.name}</h1>
              <button
                onClick={() => handleEdit('personal')}
                className="ml-2 sm:ml-3 flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-cyan-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            <div className="text-gray-600 text-xs sm:text-sm space-y-1">
              <div>{data.personalInfo.email}</div>
              <div>{data.personalInfo.phone}</div>
              <div className="break-all">{data.personalInfo.linkedin}</div>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>

      {/* Cover Letter Content */}
      <SectionWithGuidance guidance={<CoverLetterGuidance />} sectionName="Cover Letter Writing">
        <EditableSection
          title="Cover Letter Content"
          isEditing={editingSection === 'content'}
          onEdit={() => handleEdit('content')}
          onSave={handleSave}
          onCancel={handleCancel}
          editor={
            <CoverLetterEditor
              data={data}
              onUpdate={handleUpdateCoverLetter}
            />
          }
        >
          <div className="space-y-4 sm:space-y-6">
            {/* Date and Recipient Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-900 text-sm sm:text-base">{data.recipientInfo.date}</div>
              <button
                onClick={() => handleEdit('content')}
                className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-cyan-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <div className="text-gray-900 font-semibold text-sm sm:text-base">{data.recipientInfo.hiringManager}</div>
              <div className="text-gray-700 text-sm sm:text-base">{data.recipientInfo.company}</div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <div className="text-gray-900 font-semibold text-sm sm:text-base">Re: {data.recipientInfo.position}</div>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>Dear {data.recipientInfo.hiringManager},</p>
              
              <div className="whitespace-pre-line">{data.content.opening}</div>
              
              <div className="whitespace-pre-line">{data.content.body}</div>
              
              <div className="whitespace-pre-line">{data.content.closing}</div>
              
              <p>Sincerely,<br />{data.personalInfo.name}</p>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>
    </div>
  );
};

export default CoverLetterPreview;