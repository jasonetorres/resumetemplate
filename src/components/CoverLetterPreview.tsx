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
    <div id="cover-letter-content" className="max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
      {/* Cover Letter Guidance */}
      {showGuidance && (
        <div className="mb-8">
          <CoverLetterGuidance />
        </div>
      )}

      {/* Personal Info Header */}
      <SectionWithGuidance guidance={<div></div>}>
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
                className="ml-2 sm:ml-3 flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: '#0044ff' }}
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
      <SectionWithGuidance guidance={<CoverLetterGuidance />}>
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
                className="flex items-center space-x-1 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: '#0044ff' }}
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