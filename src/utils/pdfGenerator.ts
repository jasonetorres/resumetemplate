import { jsPDF } from 'jspdf';
import { ResumeData, CoverLetterData } from '../types/resume';

export const generateResumePDF = (data: ResumeData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  // Name
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.personalInfo.name || 'Untitled Resume', pageWidth / 2, yPos, { align: 'center' });
  yPos += 6;

  // Contact Info - email and phone on one line
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const emailPhone = [data.personalInfo.email, data.personalInfo.phone].filter(Boolean).join(' | ');
  if (emailPhone) {
    pdf.text(emailPhone, pageWidth / 2, yPos, { align: 'center' });
    yPos += 3.5;
  }

  // Links on another line
  const links = [
    data.personalInfo.linkedin,
    data.personalInfo.github,
    data.personalInfo.website
  ].filter(Boolean).join(' | ');
  if (links) {
    pdf.text(links, pageWidth / 2, yPos, { align: 'center' });
    yPos += 3.5;
  }
  yPos += 3;

  // Professional Summary
  if (data.professionalSummary) {
    const summaryContent = typeof data.professionalSummary === 'object' && data.professionalSummary.content
      ? data.professionalSummary.content
      : typeof data.professionalSummary === 'string'
      ? data.professionalSummary
      : '';

    if (summaryContent) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PROFESSIONAL SUMMARY', margin, yPos);
      yPos += 2;

      // Add line below section title
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.3);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 3;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const summaryLines = pdf.splitTextToSize(summaryContent, contentWidth);
      pdf.text(summaryLines, margin, yPos);
      yPos += summaryLines.length * 4.2 + 3;
    }
  }

  // Technical Skills
  if (data.technicalSkills && typeof data.technicalSkills === 'object') {
    const hasSkills = Object.values(data.technicalSkills).some(skill => skill && String(skill).trim());

    if (hasSkills) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('TECHNICAL SKILLS', margin, yPos);
      yPos += 2;

      // Add line below section title
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.3);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 3;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      const skillCategories = [
        { label: 'Languages', value: data.technicalSkills.languages },
        { label: 'Frameworks & Libraries', value: data.technicalSkills.frameworks },
        { label: 'Tools & Platforms', value: data.technicalSkills.tools },
        { label: 'Methodologies', value: data.technicalSkills.methodologies },
        { label: 'Certifications', value: data.technicalSkills.certifications }
      ];

      skillCategories.forEach(({ label, value }) => {
        if (value && String(value).trim()) {
          const skillText = `${label}: ${value}`;
          const skillLines = pdf.splitTextToSize(skillText, contentWidth);
          pdf.text(skillLines, margin, yPos);
          yPos += skillLines.length * 4.2 + 0.8;
        }
      });
      yPos += 2.5;
    }
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPERIENCE', margin, yPos);
    yPos += 2;

    // Add line below section title
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 3;

    data.experience.forEach((exp, index) => {
      // Check if we need a new page
      if (yPos > 260) {
        pdf.addPage();
        yPos = margin;
      }

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      if (exp.position) {
        pdf.text(exp.position, margin, yPos);
        yPos += 3.5;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      const companyLine = [exp.company, exp.location].filter(Boolean).join(' | ');
      if (companyLine) {
        pdf.text(companyLine, margin, yPos);
        yPos += 3.5;
      }

      pdf.setFont('helvetica', 'normal');
      if (exp.duration) {
        pdf.text(exp.duration, margin, yPos);
        yPos += 4.5;
      }

      if (exp.achievements && exp.achievements.length > 0) {
        exp.achievements.forEach(achievement => {
          if (achievement) {
            const bulletLines = pdf.splitTextToSize(`• ${achievement}`, contentWidth - 5);
            pdf.text(bulletLines, margin + 2, yPos);
            yPos += bulletLines.length * 4.2;
          }
        });
      }
      yPos += 2.5;
    });
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    if (yPos > 245) {
      pdf.addPage();
      yPos = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROJECTS', margin, yPos);
    yPos += 2;

    // Add line below section title
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 3;

    data.projects.forEach((project, index) => {
      if (yPos > 260) {
        pdf.addPage();
        yPos = margin;
      }

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      if (project.name) {
        pdf.text(project.name, margin, yPos);
        yPos += 3.5;
      }

      if (project.technologies) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Technologies: ${project.technologies}`, margin, yPos);
        yPos += 3.5;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      if (project.description) {
        const descriptions = Array.isArray(project.description) ? project.description : [project.description];
        descriptions.forEach(desc => {
          if (desc) {
            const bulletLines = pdf.splitTextToSize(`• ${desc}`, contentWidth - 5);
            pdf.text(bulletLines, margin + 2, yPos);
            yPos += bulletLines.length * 4.2;
          }
        });
        yPos += 2.5;
      }
    });
  }

  // Education
  if (data.education && data.education.length > 0) {
    if (yPos > 260) {
      pdf.addPage();
      yPos = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EDUCATION', margin, yPos);
    yPos += 2;

    // Add line below section title
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 3;

    data.education.forEach((edu, index) => {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      if (edu.degree) {
        pdf.text(edu.degree, margin, yPos);
        yPos += 3.5;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      if (edu.institution) {
        pdf.text(edu.institution, margin, yPos);
        yPos += 3.5;
      }

      if (edu.duration) {
        pdf.text(edu.duration, margin, yPos);
        yPos += 2.5;
      }

      yPos += 2.5;
    });
  }

  return pdf;
};

export const generateCoverLetterPDF = (data: CoverLetterData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  // Personal Info
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  if (data.personalInfo.name) {
    pdf.text(data.personalInfo.name, margin, yPos);
    yPos += 5;
  }

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  if (data.personalInfo.email) {
    pdf.text(data.personalInfo.email, margin, yPos);
    yPos += 5;
  }
  if (data.personalInfo.phone) {
    pdf.text(data.personalInfo.phone, margin, yPos);
    yPos += 5;
  }
  if (data.personalInfo.location) {
    pdf.text(data.personalInfo.location, margin, yPos);
    yPos += 8;
  }

  // Date
  if (data.date) {
    pdf.text(data.date, margin, yPos);
    yPos += 10;
  }

  // Recipient Info
  if (data.recipientName) {
    pdf.text(data.recipientName, margin, yPos);
    yPos += 5;
  }
  if (data.recipientTitle) {
    pdf.text(data.recipientTitle, margin, yPos);
    yPos += 5;
  }
  if (data.companyName) {
    pdf.text(data.companyName, margin, yPos);
    yPos += 5;
  }
  if (data.companyAddress) {
    pdf.text(data.companyAddress, margin, yPos);
    yPos += 10;
  }

  // Salutation
  if (data.salutation) {
    pdf.text(data.salutation, margin, yPos);
    yPos += 8;
  }

  // Body paragraphs
  if (data.bodyParagraphs && data.bodyParagraphs.length > 0) {
    data.bodyParagraphs.forEach((paragraph, index) => {
      if (yPos > 260) {
        pdf.addPage();
        yPos = margin;
      }

      if (paragraph) {
        const lines = pdf.splitTextToSize(paragraph, contentWidth);
        pdf.text(lines, margin, yPos);
        yPos += lines.length * 5 + 6;
      }
    });
  }

  // Closing
  if (yPos > 260) {
    pdf.addPage();
    yPos = margin;
  }

  if (data.closing) {
    pdf.text(data.closing, margin, yPos);
    yPos += 10;
  }

  if (data.personalInfo.name) {
    pdf.text(data.personalInfo.name, margin, yPos);
  }

  return pdf;
};
