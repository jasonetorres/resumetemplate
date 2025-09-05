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
  const [tempData, setTempData] = useState<CoverLetterData>(data);

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

  const handleUpdateCoverLetter = (updatedData: Omit<CoverLetterData, 'personalInfo'>) => {
    setTempData({ ...tempData, ...updatedData });
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
              data={tempData.personalInfo}
              onUpdate={handleUpdatePersonalInfo}
            />
          }
        >
          <div className="text-right mb-6 sm:mb-8">
            <div className="flex items-center justify-end mb-2">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{tempData.personalInfo.name}</h1>
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
              <div>{tempData.personalInfo.email}</div>
              <div>{tempData.personalInfo.phone}</div>
              <div className="break-all">{tempData.personalInfo.linkedin}</div>
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
              data={tempData}
              onUpdate={handleUpdateCoverLetter}
            />
          }
        >
          <div className="space-y-4 sm:space-y-6">
            {/* Date and Recipient Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-900 text-sm sm:text-base">{tempData.recipientInfo.date}</div>
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
              <div className="text-gray-900 font-semibold text-sm sm:text-base">{tempData.recipientInfo.hiringManager}</div>
              <div className="text-gray-700 text-sm sm:text-base">{tempData.recipientInfo.company}</div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <div className="text-gray-900 font-semibold text-sm sm:text-base">Re: {tempData.recipientInfo.position}</div>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>Dear {tempData.recipientInfo.hiringManager},</p>
              
              <div className="whitespace-pre-line">{tempData.content.opening}</div>
              
              <div className="whitespace-pre-line">{tempData.content.body}</div>
              
              <div className="whitespace-pre-line">{tempData.content.closing}</div>
              
              <p>Sincerely,<br />{tempData.personalInfo.name}</p>
            </div>
          </div>
        </EditableSection>
      </SectionWithGuidance>
    </div>
  );
};

export default CoverLetterPreview;