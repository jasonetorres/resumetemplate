import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { CoverLetterData } from '../../types/resume';

interface CoverLetterEditorProps {
  data: CoverLetterData;
  onUpdate: (data: Omit<CoverLetterData, 'personalInfo'>) => void;
}

const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({ data, onUpdate }) => {
  const [showTemplates, setShowTemplates] = useState(false);


  const handleRecipientChange = (field: keyof typeof data.recipientInfo, value: string) => {
    const newData = {
      recipientInfo: { ...data.recipientInfo, [field]: value },
      content: data.content
    };
    onUpdate(newData);
  };

  const handleContentChange = (field: keyof typeof data.content, value: string) => {
    const newData = {
      recipientInfo: data.recipientInfo,
      content: { ...data.content, [field]: value }
    };
    onUpdate(newData);
  };

  const coverLetterTemplates = {
    general: {
      name: "General Tech Template (The Classic)",
      description: "Perfect for most tech roles - shows enthusiasm, connects skills, and demonstrates research",
      opening: "I am writing to express my strong interest in the [POSITION] role at [COMPANY]. Having followed your work on [SPECIFIC PROJECT/PRODUCT], I am particularly excited about the opportunity to contribute to [COMPANY'S MISSION/GOAL] and help drive innovation in [RELEVANT AREA].",
      body: "Your job posting emphasizes the need for expertise in [KEY REQUIREMENT 1] and [KEY REQUIREMENT 2]. In my previous role at [PREVIOUS COMPANY], I successfully [SPECIFIC ACHIEVEMENT 1] using [RELEVANT TECHNOLOGY], which directly aligns with your requirements. Additionally, my experience with [KEY REQUIREMENT 2] resulted in [QUANTIFIED RESULT], demonstrating my ability to deliver measurable impact.\n\nWhat particularly draws me to [COMPANY] is [SPECIFIC REASON - could be their tech stack, mission, recent news, or company values]. Your commitment to [COMPANY VALUE/INITIATIVE] resonates with my own professional values, and I believe my background in [RELEVANT AREA] would allow me to contribute meaningfully to your team's objectives.",
      closing: "I am eager to discuss how my experience in [YOUR KEY EXPERTISE] can support [TEAM NAME]'s goals and contribute to [COMPANY]'s continued success. Thank you for considering my application, and I look forward to the opportunity to speak with you further."
    },
    painPoint: {
      name: "Tech-Specific Pain Point Template",
      description: "For when you've identified a specific challenge the company is facing - shows problem-solving mindset",
      opening: "I am excited to apply for the [POSITION] role at [COMPANY]. As someone who has closely followed your platform's evolution, I am particularly interested in contributing to the technical challenges and opportunities that come with [COMPANY'S CURRENT FOCUS/GROWTH].",
      body: "I noticed that [COMPANY] is currently [SPECIFIC CHALLENGE/TECHNOLOGY STACK OBSERVATION]. In my previous role at [PREVIOUS COMPANY], I led a similar initiative where we [SPECIFIC SOLUTION YOU IMPLEMENTED], which resulted in [QUANTIFIED RESULT - e.g., 50% reduction in server costs, 40% improvement in performance]. This experience has given me deep insights into [RELEVANT TECHNICAL AREA] that I believe would be valuable to your team.\n\nBeyond technical skills, I'm drawn to [COMPANY] because of [SPECIFIC REASON]. Your approach to [COMPANY INITIATIVE/VALUE] aligns perfectly with my belief that [YOUR PROFESSIONAL PHILOSOPHY], and I'm excited about the possibility of contributing to [SPECIFIC COMPANY GOAL].",
      closing: "I would welcome the opportunity to discuss how my experience with [YOUR EXPERTISE] and passion for [RELEVANT AREA] can help [COMPANY] overcome [SPECIFIC CHALLENGE] and achieve [COMPANY GOAL]. Thank you for your consideration."
    },
    careerChange: {
      name: "Career Change Template",
      description: "Perfect for transitioning into tech or changing roles within tech - emphasizes transferable skills",
      opening: "I am writing to express my enthusiasm for the [POSITION] role at [COMPANY]. While my background in [PREVIOUS FIELD] may seem unconventional, I believe my unique perspective and newly acquired technical skills make me a strong candidate for this position.",
      body: "Through [HOW YOU LEARNED - bootcamp, self-study, courses], I have developed proficiency in [TECHNICAL SKILLS] and completed projects including [SPECIFIC PROJECT WITH RESULTS]. My background in [PREVIOUS FIELD] has equipped me with [TRANSFERABLE SKILLS] that are directly applicable to this role, particularly in [SPECIFIC AREA].\n\nWhat excites me most about [COMPANY] is [SPECIFIC REASON]. Your commitment to [COMPANY VALUE] resonates with my own journey of continuous learning and growth. I am particularly drawn to [SPECIFIC ASPECT OF THE ROLE/COMPANY] because it combines my passion for [RELEVANT INTEREST] with my new technical expertise.",
      closing: "I am eager to bring my unique perspective and fresh enthusiasm to [COMPANY]. I would love to discuss how my combination of [PREVIOUS EXPERIENCE] and technical skills can contribute to your team's success."
    },
    startup: {
      name: "Startup/Scale-up Template",
      description: "Emphasizes adaptability, ownership, and impact - perfect for fast-growing companies",
      opening: "I am thrilled to apply for the [POSITION] role at [COMPANY]. As someone who thrives in fast-paced, high-growth environments, I am excited about the opportunity to contribute to [COMPANY]'s mission of [COMPANY MISSION] during this pivotal stage of growth.",
      body: "In my experience at [PREVIOUS COMPANY], I wore multiple hats and took ownership of [SPECIFIC RESPONSIBILITIES], which resulted in [QUANTIFIED IMPACT]. This experience taught me the importance of [STARTUP VALUE - e.g., agility, resourcefulness, customer focus] and prepared me to excel in environments where [STARTUP CHARACTERISTIC - e.g., priorities shift quickly, everyone contributes to the bottom line].\n\nWhat draws me to [COMPANY] is [SPECIFIC REASON - could be the product, market opportunity, team, or growth stage]. I'm particularly excited about [SPECIFIC ASPECT] and believe my experience with [RELEVANT SKILL/EXPERIENCE] would be valuable as you [COMPANY'S CURRENT FOCUS/CHALLENGE].",
      closing: "I am excited about the possibility of joining [COMPANY] at this exciting stage and contributing to [SPECIFIC GOAL]. I would love to discuss how my experience and startup mindset can help drive [COMPANY]'s continued growth and success."
    },
    senior: {
      name: "Senior/Leadership Template",
      description: "For senior roles - emphasizes leadership, strategy, and mentoring experience",
      opening: "I am writing to express my interest in the [POSITION] role at [COMPANY]. With [X] years of experience in [FIELD] and a proven track record of [LEADERSHIP ACHIEVEMENT], I am excited about the opportunity to contribute to [COMPANY]'s strategic objectives and help scale your engineering organization.",
      body: "In my current role as [CURRENT TITLE] at [CURRENT COMPANY], I have [LEADERSHIP ACHIEVEMENT WITH NUMBERS]. This experience has given me deep expertise in [TECHNICAL AREA] as well as the leadership skills necessary to [RELEVANT LEADERSHIP SKILL]. I am particularly proud of [SPECIFIC ACHIEVEMENT] which demonstrates my ability to [RELEVANT CAPABILITY].\n\nWhat attracts me to [COMPANY] is [SPECIFIC REASON - could be technical challenges, company stage, mission]. Your focus on [COMPANY FOCUS] aligns with my passion for [RELEVANT AREA], and I believe my experience in [RELEVANT EXPERIENCE] would be valuable as you [COMPANY GOAL/CHALLENGE].",
      closing: "I would welcome the opportunity to discuss how my leadership experience and technical expertise can contribute to [COMPANY]'s continued growth and help build a world-class engineering organization. Thank you for your consideration."
    }
  };

  const applyTemplate = (templateKey: string) => {
    const template = coverLetterTemplates[templateKey as keyof typeof coverLetterTemplates];
    if (template) {
      const newData = {
        recipientInfo: data.recipientInfo,
        content: {
          opening: template.opening,
          body: template.body,
          closing: template.closing
        }
      };
      onUpdate(newData);
      setShowTemplates(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-blue-900 font-inter">📝 Cover Letter Templates</h4>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center space-x-2 px-3 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors font-inter text-sm"
          >
            <span>Choose Template</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {showTemplates && (
          <div className="space-y-3">
            <p className="text-sm text-blue-700 font-inter">
              Select a strategic template based on your situation. Each template provides a proven framework that you can customize.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(coverLetterTemplates).map(([key, template]) => (
                <div key={key} className="bg-white p-3 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                  <h5 className="font-semibold text-blue-900 text-sm font-inter mb-1">{template.name}</h5>
                  <p className="text-xs text-blue-700 font-inter mb-3">{template.description}</p>
                  <button
                    onClick={() => applyTemplate(key)}
                    className="w-full px-3 py-2 text-white rounded-lg hover:opacity-90 transition-all duration-200 font-inter text-sm"
                    style={{ backgroundColor: '#0044ff' }}
                  >
                    Use This Template
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800 font-inter">
                💡 <strong>Pro Tip:</strong> These templates include placeholder text in [BRACKETS]. Replace these with specific information about the company and role you're applying for.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Recipient Information */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4 font-inter">Recipient Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Hiring Manager</label>
            <input
              type="text"
              value={data.recipientInfo.hiringManager}
              onChange={(e) => handleRecipientChange('hiringManager', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="Hiring Manager"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Company</label>
            <input
              type="text"
              value={data.recipientInfo.company}
              onChange={(e) => handleRecipientChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="Tech Company Inc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Position</label>
            <input
              type="text"
              value={data.recipientInfo.position}
              onChange={(e) => handleRecipientChange('position', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Date</label>
            <input
              type="text"
              value={data.recipientInfo.date}
              onChange={(e) => handleRecipientChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
              placeholder="January 15, 2025"
            />
          </div>
        </div>
      </div>

      {/* Letter Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Opening Paragraph</label>
          <textarea
            value={data.content.opening}
            onChange={(e) => handleContentChange('opening', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Express your interest in the position and briefly mention your relevant experience..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Body Paragraphs</label>
          <textarea
            value={data.content.body}
            onChange={(e) => handleContentChange('body', e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Highlight your relevant experience, achievements, and why you're interested in this specific company..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Closing Paragraph</label>
          <textarea
            value={data.content.closing}
            onChange={(e) => handleContentChange('closing', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 font-inter bg-white text-gray-900"
            style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            placeholder="Thank them for their consideration and express your interest in discussing the opportunity..."
          />
        </div>
      </div>

      {/* Cover Letter Tips */}
      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2 font-inter">📝 Cover Letter Best Practices</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-green-800 mb-2 font-inter">✅ Do This:</h5>
            <ul className="text-sm text-green-700 space-y-1 font-inter">
              <li>• Research the hiring manager's name</li>
              <li>• Mention specific company projects/values</li>
              <li>• Use "They need X, I have done Y" format</li>
              <li>• Quantify achievements with numbers</li>
              <li>• Keep it to one page maximum</li>
              <li>• End with a clear call to action</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-red-800 mb-2 font-inter">❌ Avoid This:</h5>
            <ul className="text-sm text-red-700 space-y-1 font-inter">
              <li>• Generic "To Whom It May Concern"</li>
              <li>• Repeating your resume exactly</li>
              <li>• Focusing on what you want vs. what you offer</li>
              <li>• Using the same letter for every application</li>
              <li>• Forgetting to customize [PLACEHOLDER] text</li>
              <li>• Being longer than one page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterEditor;