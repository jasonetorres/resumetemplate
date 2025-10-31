import React, { useState } from 'react';
import { FileText, Download, Edit3, Info, FileDown, Printer, FileType, File, Mail } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ResumePreview from './components/ResumePreview';
import CoverLetterPreview from './components/CoverLetterPreview';
import ExportConfirmationModal from './components/ExportConfirmationModal';
import { ResumeData, CoverLetterData } from './types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "John D. Eveloper, BSc",
    title: "Senior Software Engineer",
    email: "john.d.eveloper@email.com",
    phone: "555-555-5555",
    website: "https://www.google.com/search?q=johndeveloper.com",
    linkedin: "linkedin.com/in/johndeveloper",
    github: "github.com/johndeveloper"
  },
  professionalSummary: {
    content: `Experience: 8+ years of professional experience as a Software Engineer in the fast-paced FinTech sector.

Primary Skillset: 8 years of experience in full-stack application development, engineering and architecting robust, scalable solutions for high-traffic platforms.

Secondary & Tertiary Skillsets: Proficient in cloud-native architecture on AWS and automating CI/CD pipelines with Jenkins and Docker.

Relevant Highlight: Expertise in re-architecting monolithic systems into efficient microservices, reducing latency and improving developer velocity.

Key Achievement: Spearheaded a company-wide shift to a Test-Driven Development (TDD) methodology, increasing code coverage by 45% and reducing critical production bugs by 30% in the first year.

Education & Certifications: Holder of a Bachelor of Science in Computer Science and certified as an AWS Certified Solutions Architect - Professional.`
  },
  technicalSkills: {
    languages: "Python, JavaScript, TypeScript, Java, SQL, Go",
    frameworks: "Django, Flask, React, Node.js, Spring Boot",
    tools: "AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Jenkins, Git, Postman, Terraform",
    methodologies: "Agile, Scrum, Kanban, Test-Driven Development (TDD), CI/CD",
    certifications: "AWS Certified Solutions Architect - Professional, Certified Information Systems Security Professional (CISSP)"
  },
  experience: [
    {
      company: "FinSecure Corp.",
      location: "New York, NY",
      position: "Senior Software Engineer",
      duration: "06/2021 – Present",
      technologies: "Python, Django, React, TypeScript, AWS, Docker, Kubernetes, PostgreSQL",
      achievements: [
        "Architected and led the development of a new real-time fraud detection service using Python and Kinesis, processing over 10 million transactions daily with 99.9% uptime.",
        "Spearheaded the migration of three legacy monolithic applications to a microservices architecture on AWS, resulting in a 40% reduction in server costs and a 50% improvement in deployment frequency.",
        "Engineered a comprehensive suite of internal developer tools and SOPs, which increased team productivity by 25% and reduced new-hire onboarding time by a week.",
        "Mentored a team of 4 junior developers, conducting regular code reviews and training sessions that contributed to a 100% team retention rate over two years."
      ]
    },
    {
      company: "Innovate Solutions LLC",
      location: "San Francisco, CA",
      position: "Software Engineer",
      duration: "05/2017 – 06/2021",
      technologies: "Java, Spring Boot, Angular, JavaScript, Jenkins, MySQL",
      achievements: [
        "Engineered and maintained 15 core features for a client-facing financial analytics platform serving over 50,000 enterprise users.",
        "Created and implemented a CI/CD pipeline using Jenkins and Docker, automating the build and deployment process and reducing manual deployment errors by 95%.",
        "Collaborated with a team of 8 to decompose a monolithic Java application, successfully launching 5 standalone microservices that improved system resilience.",
        "Resolved an average of 20 complex bugs per sprint and improved database query performance by 35% by optimizing SQL and implementing caching layers."
      ]
    }
  ],
  projects: [
    {
      name: "Portfolio Tracker Pro",
      duration: "01/2023 – Present",
      technologies: "Python, Flask, React, Chart.js, Finnhub API",
      description: [
        "Developed a full-stack web application for tracking stock and cryptocurrency portfolios, featuring real-time data visualization and performance analytics.",
        "Engineered a secure user authentication system and integrated a third-party financial data API to serve live market data to over 500 active users."
      ],
      url: "github.com/johndeveloper/portfoliotracker"
    }
  ],
  education: [
    {
      institution: "State University",
      degree: "Bachelor of Science in Computer Science, Magna Cum Laude",
      duration: "08/2013 – 05/2017"
    }
  ]
};

const initialCoverLetterData: CoverLetterData = {
  personalInfo: {
    name: "John D. Eveloper, BSc",
    title: "Senior Software Engineer",
    email: "john.d.eveloper@email.com",
    phone: "555-555-5555",
    website: "https://www.google.com/search?q=johndeveloper.com",
    linkedin: "linkedin.com/in/johndeveloper",
    github: "github.com/johndeveloper"
  },
  recipientInfo: {
    hiringManager: "Hiring Manager",
    company: "Tech Company Inc.",
    position: "Senior Software Engineer",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  },
  content: {
    opening: "I am writing to express my strong interest in the Senior Software Engineer position at Tech Company Inc. With over 8 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am excited about the opportunity to contribute to your innovative team.",
    body: "In my current role at FinSecure Corp., I have successfully architected and led the development of a real-time fraud detection service that processes over 10 million transactions daily with 99.9% uptime. This experience has strengthened my expertise in Python, Django, React, and AWS - technologies that align perfectly with your requirements.\n\nWhat particularly excites me about this opportunity is your company's commitment to innovation and technical excellence. I am eager to bring my experience in microservices architecture and team leadership to help drive your engineering initiatives forward. My background in mentoring junior developers and implementing best practices would allow me to contribute not only as an individual contributor but also as a technical leader.\n\nI am particularly drawn to your recent work in [specific company project/technology], and I believe my experience with similar challenges would allow me to make an immediate impact on your team.",
    closing: "Thank you for considering my application. I would welcome the opportunity to discuss how my technical expertise and passion for building robust, scalable systems can contribute to Tech Company Inc.'s continued success. I look forward to hearing from you."
  }
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData);
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [showGuidance, setShowGuidance] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingExportAction, setPendingExportAction] = useState<(() => void) | null>(null);
  const [exportType, setExportType] = useState<string>('');
  
  // Add key to force re-render when switching tabs to prevent stale state
  const [componentKey, setComponentKey] = useState(0);

  // Auto-sync personal info from resume to cover letter
  const updateResumeData = (newResumeData: ResumeData) => {
    setResumeData(newResumeData);
    // Sync personal info to cover letter
    setCoverLetterData(prev => ({
      ...prev,
      personalInfo: newResumeData.personalInfo
    }));
  };

  const generateCleanHTML = () => {
    const contentId = activeTab === 'resume' ? 'resume-content' : 'cover-letter-content';
    const printContent = document.getElementById(contentId);
    if (printContent) {
      const data = activeTab === 'resume' ? resumeData : coverLetterData;
      const title = activeTab === 'resume' ? 'Resume' : 'Cover Letter';
      
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title} - ${data.personalInfo.name}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
              }
              body { 
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                line-height: 1.5; 
                color: #1f2937;
                max-width: 800px;
                margin: 0 auto;
                padding: 40px;
                background: white;
              }
              .page-break-inside-avoid {
                page-break-inside: avoid;
                break-inside: avoid;
              }
              h1 { 
                font-size: 32px; 
                font-weight: bold; 
                margin-bottom: 8px; 
                color: #1f2937;
              }
              h2 { 
                font-size: 20px; 
                color: #4b5563; 
                margin-bottom: 16px; 
              }
              h3 { 
                font-size: 18px; 
                font-weight: bold; 
                color: #1f2937; 
                margin: 24px 0 16px 0; 
                padding-bottom: 8px; 
                border-bottom: 2px solid #7c3aed; 
              }
              h4 { 
                font-size: 16px; 
                font-weight: bold; 
                margin-bottom: 8px; 
                color: #1f2937;
              }
              p { 
                margin-bottom: 12px; 
                line-height: 1.6;
              }
              ul { 
                margin: 12px 0; 
                padding-left: 24px; 
              }
              li { 
                margin-bottom: 6px; 
                line-height: 1.5;
              }
              .text-center { text-align: center; }
              .mb-8 { margin-bottom: 32px; }
              .mb-6 { margin-bottom: 20px; }
              .mb-4 { margin-bottom: 16px; }
              .mb-2 { margin-bottom: 8px; }
              .mt-1 { margin-top: 4px; }
              .space-y-5 > * + * { margin-top: 20px; }
              .space-y-4 > * + * { margin-top: 16px; }
              .space-y-2 > * + * { margin-top: 12px; }
              .space-x-2 > * + * { margin-left: 8px; }
              .font-semibold { font-weight: 600; }
              .font-bold { font-weight: bold; }
              .text-3xl { font-size: 32px; }
              .text-xl { font-size: 20px; }
              .text-lg { font-size: 18px; }
              .text-sm { font-size: 14px; }
              .text-gray-900 { color: #111827; }
              .text-gray-800 { color: #1f2937; }
              .text-gray-700 { color: #374151; }
              .text-gray-600 { color: #4b5563; }
              .text-purple-600 { color: #0044ff; }
              .italic { font-style: italic; }
              .whitespace-pre-line { 
                white-space: pre-line; 
              }
              .leading-relaxed { 
                line-height: 1.625; 
              }
              .ml-4 { margin-left: 16px; }
              .list-disc { 
                list-style-type: disc; 
              }
              .list-inside { 
                list-style-position: inside; 
              }
              .contact-info {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
              }
              .contact-info span {
                white-space: nowrap;
              }
              .skills-grid {
                display: grid;
                grid-template-columns: 1fr 3fr;
                gap: 16px;
                align-items: start;
              }
              .skills-grid > div:nth-child(odd) {
                font-weight: 600;
                color: #1f2937;
              }
              .skills-grid > div:nth-child(even) {
                color: #374151;
              }
              @media print {
                body { 
                  margin: 0; 
                  padding: 0.75in; 
                  font-size: 12px;
                }
                h3 { page-break-after: avoid; }
                .mb-8 { margin-bottom: 8px !important; }
                .mb-6 { margin-bottom: 6px !important; }
                .mb-4 { margin-bottom: 4px !important; }
                .mb-2 { margin-bottom: 2px !important; }
                .mt-1 { margin-top: 2px !important; }
                .space-y-5 > * + * { margin-top: 4px !important; }
                .space-y-4 > * + * { margin-top: 3px !important; }
                .space-y-2 > * + * { margin-top: 2px !important; }
                h1 { margin-bottom: 4px !important; }
                h2 { margin-bottom: 6px !important; }
                h3 { margin: 8px 0 4px 0 !important; }
                h4 { margin-bottom: 2px !important; }
                p { margin-bottom: 3px !important; }
                ul { margin: 3px 0 !important; }
                li { margin-bottom: 1px !important; }
                .contact-info { margin-bottom: 8px !important; }
                .skills-grid { gap: 8px !important; }
                .page-break-inside-avoid {
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            ${activeTab === 'resume' ? generateResumeHTML(resumeData) : generateCoverLetterHTML(coverLetterData)}
          </body>
        </html>
      `;
    }
    return '';
  };

  const generateResumeHTML = (data: ResumeData) => `
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">${data.personalInfo.name}</h1>
      <h2 class="text-xl text-gray-700 mb-4">${data.personalInfo.title}</h2>
      <div class="contact-info text-gray-600 text-sm">
        <span><a href="mailto:${data.personalInfo.email}" style="color: inherit; text-decoration: none;">${data.personalInfo.email}</a></span>
        <span>▪</span>
        <span><a href="tel:${data.personalInfo.phone}" style="color: inherit; text-decoration: none;">${data.personalInfo.phone}</a></span>
        <span>▪</span>
        <span><a href="${data.personalInfo.website.startsWith('http') ? data.personalInfo.website : 'https://' + data.personalInfo.website}" target="_blank" style="color: inherit; text-decoration: none;">${data.personalInfo.website}</a></span>
        <span>▪</span>
        <span><a href="https://${data.personalInfo.linkedin}" target="_blank" style="color: inherit; text-decoration: none;">${data.personalInfo.linkedin}</a></span>
        <span>▪</span>
        <span><a href="https://${data.personalInfo.github}" target="_blank" style="color: inherit; text-decoration: none;">${data.personalInfo.github}</a></span>
      </div>
    </div>

    ${data.professionalSummary.content.trim() ? `
    <div class="mb-4">
      <h3 class="text-lg font-bold text-gray-900 mb-4">PROFESSIONAL SUMMARY</h3>
      <div class="text-gray-700 leading-relaxed whitespace-pre-line">
${data.professionalSummary.content}
      </div>
    </div>
    ` : ''}

    ${Object.values(data.technicalSkills).some(skill => skill.trim()) ? `
    <div class="mb-4">
      <h3 class="text-lg font-bold text-gray-900 mb-4">TECHNICAL SKILLS</h3>
      <div class="skills-grid text-sm">
        ${data.technicalSkills.languages ? `<div>Languages:</div><div>${data.technicalSkills.languages}</div>` : ''}
        ${data.technicalSkills.frameworks ? `<div>Frameworks & Libraries:</div><div>${data.technicalSkills.frameworks}</div>` : ''}
        ${data.technicalSkills.tools ? `<div>Tools & Platforms:</div><div>${data.technicalSkills.tools}</div>` : ''}
        ${data.technicalSkills.methodologies ? `<div>Methodologies:</div><div>${data.technicalSkills.methodologies}</div>` : ''}
        ${data.technicalSkills.certifications ? `<div>Certifications:</div><div>${data.technicalSkills.certifications}</div>` : ''}
      </div>
    </div>
    ` : ''}

    ${data.experience.length > 0 ? `
    <div class="mb-4 page-break-inside-avoid">
      <h3 class="text-lg font-bold text-gray-900 mb-4">PROFESSIONAL EXPERIENCE</h3>
      <div class="space-y-4">
        ${data.experience.map(exp => `
          <div class="page-break-inside-avoid">
            <div class="mb-2">
              <h4 class="font-bold text-gray-900">${exp.company} | ${exp.location}</h4>
              <div class="text-gray-700">${exp.position} | ${exp.duration}</div>
              <div class="text-sm italic mt-1" style="color: #0044ff;">
                Technologies: ${exp.technologies}
              </div>
            </div>
            <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
              ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${data.projects.length > 0 ? `
    <div class="mb-4 page-break-inside-avoid">
      <h3 class="text-lg font-bold text-gray-900 mb-4">PROJECTS</h3>
      <div class="space-y-4">
        ${data.projects.map(project => `
          <div class="page-break-inside-avoid">
            <div class="mb-2">
              <h4 class="font-bold text-gray-900">${project.name} | ${project.duration}</h4>
              <div class="text-sm italic" style="color: #0044ff;">
                Technologies: ${project.technologies}
              </div>
            </div>
            <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
              ${project.description.map(desc => `<li>${desc}</li>`).join('')}
            </ul>
            ${project.url ? `
              <div class="text-sm mt-1" style="color: #0044ff;">
                URL: <a href="${project.url.startsWith('http') ? project.url : 'https://' + project.url}" target="_blank" style="color: #0044ff; text-decoration: underline;">${project.url}</a>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${data.education.length > 0 ? `
    <div class="mb-2">
      <h3 class="text-lg font-bold text-gray-900 mb-4">EDUCATION</h3>
      <div class="space-y-2">
        ${data.education.map(edu => `
          <div>
            <h4 class="font-bold text-gray-900">${edu.institution} | ${edu.duration}</h4>
            <div class="text-gray-700">${edu.degree}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;

  const generateCoverLetterHTML = (data: CoverLetterData) => `
    <div class="mb-8">
      <div class="text-right mb-6">
        <div class="text-gray-900 font-semibold">${data.personalInfo.name}</div>
        <div class="text-gray-700"><a href="mailto:${data.personalInfo.email}" style="color: inherit; text-decoration: none;">${data.personalInfo.email}</a></div>
        <div class="text-gray-700"><a href="tel:${data.personalInfo.phone}" style="color: inherit; text-decoration: none;">${data.personalInfo.phone}</a></div>
        <div class="text-gray-700"><a href="https://${data.personalInfo.linkedin}" target="_blank" style="color: inherit; text-decoration: none;">${data.personalInfo.linkedin}</a></div>
      </div>
      
      <div class="mb-6">
        <div class="text-gray-900">${data.recipientInfo.date}</div>
      </div>
      
      <div class="mb-6">
        <div class="text-gray-900 font-semibold">${data.recipientInfo.hiringManager}</div>
        <div class="text-gray-700">${data.recipientInfo.company}</div>
      </div>
      
      <div class="mb-6">
        <div class="text-gray-900 font-semibold">Re: ${data.recipientInfo.position}</div>
      </div>
    </div>

    <div class="space-y-4 text-gray-700 leading-relaxed">
      <p>Dear ${data.recipientInfo.hiringManager},</p>
      
      <div class="whitespace-pre-line">${data.content.opening}</div>
      
      <div class="whitespace-pre-line">${data.content.body}</div>
      
      <div class="whitespace-pre-line">${data.content.closing}</div>
      
      <p>Sincerely,<br>${data.personalInfo.name}</p>
    </div>
  `;

  const executeDownloadWord = () => {
    const data = activeTab === 'resume' ? resumeData : coverLetterData;
    const title = activeTab === 'resume' ? 'Resume' : 'Cover Letter';
    
    // Create Word-compatible HTML content
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${title} - ${data.personalInfo.name}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>90</w:Zoom>
              <w:DoNotPromptForConvert/>
              <w:DoNotShowInsertionsAndDeletions/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { 
              font-family: 'Times New Roman', serif; 
              font-size: 12pt; 
              line-height: 1.5; 
              margin: 0.75in;
              color: black;
            }
            h1 { 
              font-size: 18pt; 
              font-weight: bold; 
              text-align: center;
              margin-bottom: 6pt;
            }
            h2 { 
              font-size: 14pt; 
              text-align: center;
              margin-bottom: 12pt;
            }
            h3 { 
              font-size: 12pt; 
              font-weight: bold; 
              margin: 12pt 0 6pt 0;
              border-bottom: 1pt solid black;
              padding-bottom: 3pt;
            }
            h4 { 
              font-size: 12pt; 
              font-weight: bold; 
              margin-bottom: 3pt;
            }
            p { 
              margin-bottom: 6pt; 
            }
            ul { 
              margin: 6pt 0; 
              padding-left: 20pt; 
            }
            li { 
              margin-bottom: 3pt; 
            }
            .contact-info { 
              text-align: center; 
              font-size: 11pt;
              margin-bottom: 12pt;
            }
            .skills-table {
              width: 100%;
              border-collapse: collapse;
            }
            .skills-table td {
              padding: 3pt 6pt;
              vertical-align: top;
            }
            .skills-table td:first-child {
              font-weight: bold;
              width: 25%;
            }
            .tech-used {
              font-style: italic;
              color: #0066cc;
              font-size: 11pt;
            }
          </style>
        </head>
        <body>
          ${activeTab === 'resume' ? generateResumeWordContent(resumeData) : generateCoverLetterWordContent(coverLetterData)}
        </body>
      </html>
    `;

    const blob = new Blob([wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_${title.replace(' ', '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateResumeWordContent = (data: ResumeData) => `
    <h1>${data.personalInfo.name}</h1>
    <h2>${data.personalInfo.title}</h2>
    <div class="contact-info">
      <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a> • 
      <a href="tel:${data.personalInfo.phone}">${data.personalInfo.phone}</a> • 
      <a href="${data.personalInfo.website.startsWith('http') ? data.personalInfo.website : 'https://' + data.personalInfo.website}" target="_blank">${data.personalInfo.website}</a><br>
      <a href="https://${data.personalInfo.linkedin}" target="_blank">${data.personalInfo.linkedin}</a> • 
      <a href="https://${data.personalInfo.github}" target="_blank">${data.personalInfo.github}</a>
    </div>

    ${data.professionalSummary.content.trim() ? `
    <h3>PROFESSIONAL SUMMARY</h3>
    <p>${data.professionalSummary.content.replace(/\n/g, '<br>')}</p>
    ` : ''}

    ${Object.values(data.technicalSkills).some(skill => skill.trim()) ? `
    <h3>TECHNICAL SKILLS</h3>
    <table class="skills-table">
      ${data.technicalSkills.languages ? `<tr><td>Languages:</td><td>${data.technicalSkills.languages}</td></tr>` : ''}
      ${data.technicalSkills.frameworks ? `<tr><td>Frameworks & Libraries:</td><td>${data.technicalSkills.frameworks}</td></tr>` : ''}
      ${data.technicalSkills.tools ? `<tr><td>Tools & Platforms:</td><td>${data.technicalSkills.tools}</td></tr>` : ''}
      ${data.technicalSkills.methodologies ? `<tr><td>Methodologies:</td><td>${data.technicalSkills.methodologies}</td></tr>` : ''}
      ${data.technicalSkills.certifications ? `<tr><td>Certifications:</td><td>${data.technicalSkills.certifications}</td></tr>` : ''}
    </table>
    ` : ''}

    ${data.experience.length > 0 ? `
    <h3>PROFESSIONAL EXPERIENCE</h3>
    ${data.experience.map(exp => `
      <h4>${exp.company} | ${exp.location}</h4>
      <p><strong>${exp.position}</strong> | ${exp.duration}</p>
      <p class="tech-used">Technologies: ${exp.technologies}</p>
      <ul>
        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
      </ul>
    `).join('')}
    ` : ''}

    ${data.projects.length > 0 ? `
    <h3>PROJECTS</h3>
    ${data.projects.map(project => `
      <h4>${project.name} | ${project.duration}</h4>
      <p class="tech-used">Technologies: ${project.technologies}</p>
      <ul>
        ${project.description.map(desc => `<li>${desc}</li>`).join('')}
      </ul>
      ${project.url ? `<p><strong>URL:</strong> <a href="${project.url.startsWith('http') ? project.url : 'https://' + project.url}" target="_blank" style="color: #000000; text-decoration: underline;">${project.url}</a></p>` : ''}
    `).join('')}
    ` : ''}

    ${data.education.length > 0 ? `
    <h3>EDUCATION</h3>
    ${data.education.map(edu => `
      <h4>${edu.institution} | ${edu.duration}</h4>
      <p>${edu.degree}</p>
    `).join('')}
    ` : ''}
  `;

  const generateCoverLetterWordContent = (data: CoverLetterData) => `
    <div style="text-align: right; margin-bottom: 24pt;">
      <p><strong>${data.personalInfo.name}</strong><br>
      <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a><br>
      <a href="tel:${data.personalInfo.phone}">${data.personalInfo.phone}</a><br>
      <a href="https://${data.personalInfo.linkedin}" target="_blank">${data.personalInfo.linkedin}</a></p>
    </div>
    
    <p>${data.recipientInfo.date}</p>
    
    <p><strong>${data.recipientInfo.hiringManager}</strong><br>
    ${data.recipientInfo.company}</p>
    
    <p><strong>Re: ${data.recipientInfo.position}</strong></p>
    
    <p>Dear ${data.recipientInfo.hiringManager},</p>
    
    <p>${data.content.opening.replace(/\n/g, '<br>')}</p>
    
    <p>${data.content.body.replace(/\n/g, '<br>')}</p>
    
    <p>${data.content.closing.replace(/\n/g, '<br>')}</p>
    
    <p>Sincerely,<br>${data.personalInfo.name}</p>
  `;

  const executeDownloadText = () => {
    const data = activeTab === 'resume' ? resumeData : coverLetterData;
    const title = activeTab === 'resume' ? 'Resume' : 'Cover Letter';
    
    const textContent = `
${activeTab === 'resume' ? generateResumeTextContent(resumeData) : generateCoverLetterTextContent(coverLetterData)}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_${title.replace(' ', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateResumeTextContent = (data: ResumeData) => `
${data.personalInfo.name}
${data.personalInfo.title}

Contact Information:
Email: ${data.personalInfo.email}
Phone: ${data.personalInfo.phone}
Website: ${data.personalInfo.website}
LinkedIn: ${data.personalInfo.linkedin}
GitHub: ${data.personalInfo.github}

${data.professionalSummary.content.trim() ? `
================================================================================
PROFESSIONAL SUMMARY
================================================================================

${data.professionalSummary.content}
` : ''}

${Object.values(data.technicalSkills).some(skill => skill.trim()) ? `
================================================================================
TECHNICAL SKILLS
================================================================================

${data.technicalSkills.languages ? `Languages: ${data.technicalSkills.languages}\n` : ''}
${data.technicalSkills.frameworks ? `Frameworks & Libraries: ${data.technicalSkills.frameworks}\n` : ''}
${data.technicalSkills.tools ? `Tools & Platforms: ${data.technicalSkills.tools}\n` : ''}
${data.technicalSkills.methodologies ? `Methodologies: ${data.technicalSkills.methodologies}\n` : ''}
${data.technicalSkills.certifications ? `Certifications: ${data.technicalSkills.certifications}\n` : ''}
` : ''}

${data.experience.length > 0 ? `
================================================================================
PROFESSIONAL EXPERIENCE
================================================================================

${data.experience.map(exp => `
${exp.company} | ${exp.location}
${exp.position} | ${exp.duration}
Technologies: ${exp.technologies}

${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}
` : ''}

${data.projects.length > 0 ? `
================================================================================
PROJECTS
================================================================================

${data.projects.map(project => `
${project.name} | ${project.duration}
Technologies: ${project.technologies}

${project.description.map(desc => `• ${desc}`).join('\n')}
${project.url ? `URL: ${project.url}` : ''}
`).join('\n')}
` : ''}

${data.education.length > 0 ? `
================================================================================
EDUCATION
================================================================================

${data.education.map(edu => `
${edu.institution} | ${edu.duration}
${edu.degree}
`).join('\n')}
` : ''}
  `;

  const generateCoverLetterTextContent = (data: CoverLetterData) => `
${data.personalInfo.name}
${data.personalInfo.email}
${data.personalInfo.phone}
${data.personalInfo.linkedin}

${data.recipientInfo.date}

${data.recipientInfo.hiringManager}
${data.recipientInfo.company}

Re: ${data.recipientInfo.position}

Dear ${data.recipientInfo.hiringManager},

${data.content.opening}

${data.content.body}

${data.content.closing}

Sincerely,
${data.personalInfo.name}
  `;

  const handleExportConfirm = (action: () => void, type: string) => {
    setPendingExportAction(() => action);
    setExportType(type);
    setShowConfirmModal(true);
    setShowExportMenu(false);
  };

  const handleConfirmExport = () => {
    if (pendingExportAction) {
      pendingExportAction();
    }
    setShowConfirmModal(false);
    setPendingExportAction(null);
  };

  const handleCancelExport = () => {
    setShowConfirmModal(false);
    setPendingExportAction(null);
  };

  const executeDownloadPDF = async () => {
    const data = activeTab === 'resume' ? resumeData : coverLetterData;
    const title = activeTab === 'resume' ? 'Resume' : 'Cover Letter';

    const htmlContent = generateCleanHTML();
    if (!htmlContent) return;

    // Parse the HTML to extract just the body content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const bodyContent = doc.body.innerHTML;

    // Create a temporary container with the body content
    const container = document.createElement('div');
    container.innerHTML = bodyContent;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '816px'; // 8.5 inches at 96 DPI
    container.style.background = 'white';
    container.style.padding = '72px'; // 0.75 inch padding
    container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    container.style.fontSize = '12px';
    container.style.lineHeight = '1.5';
    container.style.color = '#000';
    document.body.appendChild(container);

    try {
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate canvas from HTML
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 816,
        windowHeight: container.scrollHeight
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(`${data.personalInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_${title.replace(' ', '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      document.body.removeChild(container);
    }
  };

  const executePrint = () => {
    const htmlContent = generateCleanHTML();
    if (htmlContent) {
      // Create a blob URL with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      const printWindow = window.open(blobUrl, '_blank');

      if (printWindow) {
        // Wait for content to load then print
        setTimeout(() => {
          if (printWindow && !printWindow.closed) {
            printWindow.print();
            // Clean up the blob URL
            setTimeout(() => {
              URL.revokeObjectURL(blobUrl);
            }, 1000);
          }
        }, 1000);
      } else {
        // Clean up if window didn't open
        URL.revokeObjectURL(blobUrl);
      }
    }
  };

  const executeDownloadHTML = () => {
    const htmlContent = generateCleanHTML();
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const executeOpenInNewTab = () => {
    const htmlContent = generateCleanHTML();
    if (htmlContent) {
      // Create a blob URL with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      const newWindow = window.open(blobUrl, '_blank');
      
      // Clean up the blob URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src="/toetovf.png" alt="Torc Logo" className="w-8 h-8" />
              <h1 className="text-lg sm:text-2xl font-bold text-slate-900">Torc Resume & Cover Letter</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setShowGuidance(!showGuidance)}
                className="hidden sm:flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:shadow-md transition-all duration-200 font-medium text-sm sm:text-base shadow-sm"
              >
                <Info className="w-4 h-4" />
                <span>{showGuidance ? 'Hide' : 'Show'} Guidance</span>
              </button>
              <button
                onClick={() => setShowGuidance(!showGuidance)}
                className="sm:hidden flex items-center px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:shadow-md transition-all duration-200 font-medium text-sm shadow-sm"
              >
                <Info className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 hover:shadow-md transition-all duration-200 font-medium text-sm sm:text-base shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export {activeTab === 'resume' ? 'Resume' : 'Cover Letter'}</span>
                  <span className="sm:hidden">Export</span>
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => handleExportConfirm(executeDownloadPDF, 'Download PDF')}
                        className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 flex items-center space-x-2 font-medium transition-colors duration-200 text-sm sm:text-base"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                      <button
                        onClick={() => handleExportConfirm(executePrint, 'Print')}
                        className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 flex items-center space-x-2 font-medium transition-colors duration-200 text-sm sm:text-base"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </button>
                      <button
                        onClick={() => handleExportConfirm(executeDownloadHTML, 'Download HTML')}
                        className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 flex items-center space-x-2 font-medium transition-colors duration-200 text-sm sm:text-base"
                      >
                        <FileType className="w-4 h-4" />
                        <span>Download HTML</span>
                      </button>
                      <button
                        onClick={() => handleExportConfirm(executeOpenInNewTab, 'Open in New Tab')}
                        className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 flex items-center space-x-2 font-medium transition-colors duration-200 text-sm sm:text-base"
                      >
                        <FileType className="w-4 h-4" />
                        <span>Open in New Tab</span>
                      </button>
                      <button
                        onClick={() => handleExportConfirm(executeDownloadWord, 'Download as Word')}
                        className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 flex items-center space-x-2 font-medium transition-colors duration-200 text-sm sm:text-base"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Download as Word</span>
                      </button>
                      <button
                        onClick={() => handleExportConfirm(executeDownloadText, 'Download as Text')}
                        className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 flex items-center space-x-2 font-medium transition-colors duration-200 text-sm sm:text-base"
                      >
                        <File className="w-4 h-4" />
                        <span>Download as Text</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-10">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white p-1.5 rounded-lg max-w-md mx-auto shadow-sm border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('resume');
                setComponentKey(prev => prev + 1);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'resume'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('cover-letter');
                setComponentKey(prev => prev + 1);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'cover-letter'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Cover Letter</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center space-x-2 text-slate-800">
              <Edit3 className="w-5 h-5 text-slate-600" />
              <span>Click any section to edit your {activeTab === 'resume' ? 'resume' : 'cover letter'}</span>
            </h2>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Your {activeTab === 'resume' ? 'resume' : 'cover letter'} will update in real-time as you make changes
            </p>
          </div>
            {activeTab === 'resume' ? (
              <ResumePreview
                data={resumeData}
                onUpdate={updateResumeData}
                showGuidance={showGuidance}
              />
            ) : (
              <CoverLetterPreview
                data={coverLetterData}
                onUpdate={setCoverLetterData}
                showGuidance={showGuidance}
              />
            )}
        </div>
      </div>

      {/* Export Confirmation Modal */}
      <ExportConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelExport}
        onConfirm={handleConfirmExport}
        exportType={exportType}
        documentType={activeTab === 'resume' ? 'resume' : 'cover letter'}
      />
      
      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
}

export default App;