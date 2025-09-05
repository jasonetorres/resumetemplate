import React from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

interface ExportConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  exportType: string;
  documentType?: string;
}

const ExportConfirmationModal: React.FC<ExportConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  exportType,
  documentType = 'resume'
}) => {
  if (!isOpen) return null;

  const resumeChecklist = [
    {
      category: "Professional Summary",
      items: [
        "Tailored to the specific job you're applying for",
        "Includes years of experience and specific role title",
        "Contains at least one quantified achievement",
        "Mentions relevant certifications or education"
      ]
    },
    {
      category: "Technical Skills",
      items: [
        "Matches 60%+ of keywords from the job description",
        "Lists most relevant skills first",
        "Removes entry-level certs if you have 5+ years experience",
        "Groups skills by category for easy scanning"
      ]
    },
    {
      category: "Professional Experience",
      items: [
        "Uses action verbs (Architected, Spearheaded, Engineered)",
        "Includes quantified results and metrics",
        "Shows impact, not just job duties",
        "Mentions specific technologies used"
      ]
    },
    {
      category: "General Format",
      items: [
        "No typos or grammatical errors",
        "Consistent formatting and dates",
        "Professional email address and contact info",
        "All URLs work and are professional"
      ]
    }
  ];

  const coverLetterChecklist = [
    {
      category: "Header & Recipient Info",
      items: [
        "Your contact information is complete and professional",
        "Hiring manager's name is correct (not 'To Whom It May Concern')",
        "Company name and position title are accurate",
        "Date is current and properly formatted"
      ]
    },
    {
      category: "Opening Paragraph",
      items: [
        "Clearly states the position you're applying for",
        "Mentions how you learned about the opportunity",
        "Includes a compelling hook or qualification summary",
        "Shows enthusiasm for the specific role"
      ]
    },
    {
      category: "Body Content",
      items: [
        "Highlights 2-3 most relevant achievements with numbers",
        "Shows knowledge of the company and role",
        "Explains why you're interested in this specific company",
        "Demonstrates cultural fit and values alignment"
      ]
    },
    {
      category: "Closing & Format",
      items: [
        "Includes a clear call to action",
        "Professional closing and signature",
        "One page maximum length",
        "No typos or grammatical errors"
      ]
    }
  ];

  const checklist = documentType === 'cover-letter' ? coverLetterChecklist : resumeChecklist;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-inter">
                Ready to Export Your {documentType === 'cover-letter' ? 'Cover Letter' : 'Resume'}? Let's Double-Check!
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mt-2 font-inter text-sm sm:text-base">
            Before you {exportType.toLowerCase()}, make sure your {documentType === 'cover-letter' ? 'cover letter' : 'resume'} passes these critical checks:
          </p>
        </div>

        <div className="p-6 space-y-6">
          {checklist.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <h3 className="font-semibold text-gray-900 font-inter flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>{section.category}</span>
              </h3>
              <div className="space-y-2 ml-4">
                {section.items.map((item, itemIndex) => (
                  <label key={itemIndex} className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 font-inter leading-relaxed">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 font-inter">Critical Reminder</h4>
                <p className="text-sm text-red-700 mt-1 font-inter">
                  {documentType === 'cover-letter' 
                    ? "Generic cover letters get ignored. Make sure you've personalized this for the specific company and role."
                    : "90% of resumes get rejected by ATS systems. Make sure you've customized this resume for the specific job you're applying to, not using a generic version."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 font-inter">Pro Tip</h4>
                <p className="text-sm text-blue-700 mt-1 font-inter">
                  {documentType === 'cover-letter'
                    ? "Research the hiring manager and company before sending. Personalized cover letters get 50% more responses."
                    : "Save different versions for different roles. A tailored resume gets 3x more interviews than a generic one."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-3 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-medium font-inter text-sm sm:text-base"
          >
            Let Me Review More
          </button>
          <button
            onClick={onConfirm}
            className="px-4 sm:px-6 py-2 sm:py-3 text-white rounded-full hover:opacity-90 transition-all duration-200 font-medium font-inter text-sm sm:text-base"
            style={{ backgroundColor: '#0044ff' }}
          >
            Yes, {exportType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportConfirmationModal;