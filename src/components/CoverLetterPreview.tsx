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
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
            buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
          setShowModal(false);
        }
      };

      if (showModal) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showModal]);

    return (
      <div className="space-y-4">
        {children}
        {showGuidance && (
          <div className="border-t border-gray-200 pt-3 relative">
            <button
              ref={buttonRef}
              onClick={() => setShowModal(!showModal)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-md text-sm font-medium transition-all duration-200 hover:bg-slate-600 hover:shadow-md shadow-sm"
            >
              <span>💡 Tips for {sectionName}</span>
            </button>

            {/* Popover */}
            {showModal && (
              <div
                ref={modalRef}
                className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 max-w-2xl w-full max-h-[500px] overflow-y-auto z-50"
              >
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">💡 Tips for {sectionName}</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {guidance}
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
                className="ml-2 sm:ml-3 flex items-center space-x-1 bg-slate-900 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-slate-800 hover:shadow-md transition-all duration-200 shadow-sm"
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
                className="flex items-center space-x-1 bg-slate-900 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-slate-800 hover:shadow-md transition-all duration-200 shadow-sm"
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