import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, Code, Wrench, Palette, Users, Briefcase, Shield, BarChart3, Headphones, TrendingUp } from 'lucide-react';

const RoleSpecificTips: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const roleData = {
    developer: {
      icon: <Code className="w-5 h-5" />,
      title: "Software Developer",
      color: "blue",
      tips: [
        "Hiring managers want proof that you can build, not just that you know languages.",
        "Group your stack clearly under headings like Languages, Frameworks, Tools.",
        "Link to your GitHub, portfolio site, or even a live demo. Real examples matter.",
        "Highlight projects that show impact: \"Built an internal dashboard used daily by 200+ employees.\"",
        "Whenever possible, add numbers: \"Improved load time by 40%,\" not just \"Optimized performance.\"",
        "Keep it concise — one page is plenty unless you've been in the industry 10+ years."
      ]
    },
    engineer: {
      icon: <Wrench className="w-5 h-5" />,
      title: "Engineer",
      color: "green",
      tips: [
        "Engineering resumes need to show how you solve problems and scale systems.",
        "Focus less on maintenance and more on results: performance, cost savings, reliability.",
        "Mention the scale you worked at: \"Supported 10,000 concurrent users\" or \"Maintained 99.9% uptime.\"",
        "Call out compliance, safety, or industry standards you worked under.",
        "Collaboration is key — show how you worked with product, design, or business teams.",
        "Use data wherever you can: \"Reduced processing time by 25%\" carries weight."
      ]
    },
    designer: {
      icon: <Palette className="w-5 h-5" />,
      title: "Designer",
      color: "purple",
      tips: [
        "Your work speaks through visuals, but your resume still matters.",
        "Always link to your portfolio. Without it, recruiters usually won't move forward.",
        "Share tools and methods you use — Figma, Adobe XD, wireframing, user testing.",
        "Highlight impact, not just projects: \"Redesigned onboarding flow that boosted completion rates by 15%.\"",
        "Keep the resume design simple and clean. Save your creativity for the portfolio.",
        "User-centered thinking shows up in results, so frame your bullets around outcomes."
      ]
    },
    productManager: {
      icon: <Users className="w-5 h-5" />,
      title: "Product Manager",
      color: "orange",
      tips: [
        "PM resumes need to tell the story of leadership and outcomes.",
        "Lead with results: \"Launched X product that drove $1M in revenue in year one.\"",
        "Highlight how you worked across functions — design, engineering, marketing.",
        "Show you can manage roadmaps, priorities, and people.",
        "Numbers go a long way: delivered ahead of schedule, grew ARR by %, reduced churn by %.",
        "Certifications like PMP, Scrum Master, or SAFe can strengthen your profile, but real-world delivery is always strongest."
      ]
    },
    dataScientist: {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Data Scientist",
      color: "indigo",
      tips: [
        "Showcase your analytical thinking with concrete examples of insights you've generated.",
        "Highlight programming languages: Python, R, SQL, and any specialized tools like Tableau or Power BI.",
        "Quantify your impact: \"Built predictive model that increased customer retention by 18%.\"",
        "Include both technical skills (machine learning, statistics) and business acumen.",
        "Link to GitHub repositories, Kaggle profiles, or published research papers.",
        "Show you can communicate complex findings to non-technical stakeholders."
      ]
    },
    cybersecurity: {
      icon: <Shield className="w-5 h-5" />,
      title: "Cybersecurity",
      color: "red",
      tips: [
        "Highlight relevant certifications: CISSP, CISM, CompTIA Security+, CEH.",
        "Show experience with security frameworks: NIST, ISO 27001, SOC 2.",
        "Quantify your security improvements: \"Reduced security incidents by 60%.\"",
        "Mention specific tools: SIEM platforms, vulnerability scanners, penetration testing tools.",
        "Include compliance experience: GDPR, HIPAA, PCI-DSS, SOX.",
        "Show both technical skills and risk management capabilities."
      ]
    },
    marketing: {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Marketing",
      color: "pink",
      tips: [
        "Lead with measurable results: \"Increased lead generation by 150% through targeted campaigns.\"",
        "Show multi-channel expertise: digital, social, email, content, paid advertising.",
        "Include tools you're proficient with: HubSpot, Salesforce, Google Analytics, Adobe Creative Suite.",
        "Highlight campaign successes with specific metrics: CTR, conversion rates, ROI.",
        "Show understanding of the customer journey and buyer personas.",
        "Include any certifications: Google Ads, Facebook Blueprint, HubSpot, etc."
      ]
    },
    sales: {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Sales",
      color: "emerald",
      tips: [
        "Numbers are everything: quota attainment, revenue generated, deals closed.",
        "Show progression: \"Consistently exceeded quota by 120% for 3 consecutive years.\"",
        "Highlight relationship-building skills and client retention rates.",
        "Include CRM experience: Salesforce, HubSpot, Pipedrive.",
        "Show understanding of sales methodologies: SPIN, Challenger, Solution Selling.",
        "Mention territory size, deal values, and sales cycle lengths you've managed."
      ]
    },
    customerSuccess: {
      icon: <Headphones className="w-5 h-5" />,
      title: "Customer Success",
      color: "teal",
      tips: [
        "Focus on retention metrics: \"Maintained 95% customer retention rate.\"",
        "Show how you drive expansion: upsells, cross-sells, account growth.",
        "Highlight your ability to reduce churn and increase customer satisfaction scores.",
        "Include experience with customer success platforms: Gainsight, ChurnZero, Totango.",
        "Show cross-functional collaboration with sales, product, and support teams.",
        "Quantify your impact on customer lifetime value and Net Promoter Score."
      ]
    }
  };

  const generalTips = [
    "Every recruiter we've spoken to says the same thing: keep it clear, keep it focused, keep it real.",
    "Tailor each application — one generic resume won't work everywhere.",
    "Lead with action verbs: Built, Designed, Led, Delivered.",
    "Results matter more than responsibilities. What changed because of you?",
    "Formatting should never distract. Stick to clean fonts and aligned dates.",
    "Proofread carefully — one typo can cut your chances short."
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; border: string; text: string; } } = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-800' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-800' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-md border border-gray-600">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5" style={{ color: '#0044ff' }} />
          <h4 className="font-bold text-white font-inter">Role-Specific Resume Tips</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" style={{ color: '#0044ff' }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: '#0044ff' }} />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">Select Your Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 bg-white text-gray-900 font-inter"
              style={{ '--tw-ring-color': '#0044ff' } as React.CSSProperties}
            >
              <option value="">Choose a role for specific tips...</option>
              {Object.entries(roleData).map(([key, role]) => (
                <option key={key} value={key}>{role.title}</option>
              ))}
            </select>
          </div>

          {selectedRole && roleData[selectedRole as keyof typeof roleData] && (
            <div className={`${getColorClasses(roleData[selectedRole as keyof typeof roleData].color).bg} p-4 rounded-2xl border ${getColorClasses(roleData[selectedRole as keyof typeof roleData].color).border}`}>
              <div className="flex items-center space-x-2 mb-3">
                {roleData[selectedRole as keyof typeof roleData].icon}
                <h5 className={`font-bold font-inter ${getColorClasses(roleData[selectedRole as keyof typeof roleData].color).text}`}>
                  {roleData[selectedRole as keyof typeof roleData].title} Tips
                </h5>
              </div>
              <ul className={`space-y-2 text-sm font-inter ${getColorClasses(roleData[selectedRole as keyof typeof roleData].color).text}`}>
                {roleData[selectedRole as keyof typeof roleData].tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-xs mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gray-600 p-4 rounded-2xl border border-gray-500">
            <h5 className="font-bold text-white mb-3 flex items-center space-x-2 font-inter">
              <Briefcase className="w-4 h-4" />
              <span>Universal Tips for All Roles</span>
            </h5>
            <ul className="space-y-2 text-sm text-gray-300 font-inter">
              {generalTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-xs mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-2xl border border-yellow-600">
            <h5 className="font-bold text-yellow-300 mb-2 font-inter">💡 Recruiter's Note</h5>
            <p className="text-sm text-yellow-200 font-inter">
              Resumes don't get you the job — but they do get you the interview. Use this template as your foundation, 
              then customize it so it tells your story clearly and quickly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSpecificTips;