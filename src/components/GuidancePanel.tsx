import React, { useState } from 'react';
import { Info, Target, Zap, Users, Trophy, GraduationCap, AlertTriangle, CheckCircle, TrendingUp, Award, Brain, Eye } from 'lucide-react';
import RoleSpecificTips from './RoleSpecificTips';

const GuidancePanel: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2 font-inter">
        <Info className="w-5 h-5 text-slate-600" />
        <span>Resume Writing Guidance</span>
      </h3>

      {/* Role-Specific Tips */}
      <RoleSpecificTips />

      {/* Critical ATS Warning */}
      <div className="bg-red-50 rounded-lg shadow-sm p-6 border-l-4 border-red-500 hover:shadow-md transition-shadow duration-200">
        <h4 className="font-bold text-red-700 mb-3 flex items-center space-x-2 font-inter">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span>⚠️ ATS Reality Check</span>
        </h4>
        <div className="text-sm text-red-700 space-y-2 font-inter">
          <p className="font-semibold text-red-800 font-inter">Most resumes don't even make it past AI screening!</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Never use 100% AI-generated content</strong> - it gets flagged instantly</li>
            <li>Remove M-dashes, emojis, and obvious ChatGPT formatting</li>
            <li>Match keywords from job descriptions (60%+ match rate needed)</li>
            <li>Update your resume for 2025 - old strategies don't work anymore</li>
            <li>Tailor to each role - generic resumes get rejected</li>
          </ul>
        </div>
      </div>

      {/* Professional Summary Guide */}
      <div
        className="bg-slate-50 rounded-lg shadow-sm p-6 border-l-4 border-slate-400 cursor-pointer hover:shadow-md hover:bg-slate-100 transition-all duration-200"
        onClick={() => toggleCard('summary')}
      >
        <h4 className="font-bold text-slate-900 mb-3 flex items-center justify-between font-inter">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-slate-600" />
            <span>Professional Summary</span>
          </div>
          <span className="text-sm text-slate-600">Click to expand</span>
        </h4>
        <div className="text-sm text-slate-700 space-y-2 font-inter">
          <p className="font-semibold text-slate-900">Your "Mini Cover Letter" - Most Important Section!</p>
          {expandedCard === 'summary' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="font-semibold mb-2 font-inter text-slate-900">🎯 The Formula That Works:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 font-inter">
                  <li><strong>Experience:</strong> "X+ years of professional experience as [Role] in [Industry]"</li>
                  <li><strong>Primary Skills:</strong> Your main technical competencies</li>
                  <li><strong>Secondary Skills:</strong> What makes you unique</li>
                  <li><strong>Key Achievement:</strong> One quantified win with numbers</li>
                  <li><strong>Education/Certs:</strong> Relevant credentials</li>
                </ol>
              </div>
              <div className="bg-slate-100 p-3 rounded border-l-4 border-slate-400">
                <p className="font-semibold text-slate-900 font-inter">💡 Pro Tip:</p>
                <p className="text-slate-700 font-inter">This section alone can get you past ATS and into human hands. Tailor it to each job application!</p>
              </div>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              <li>Must be tailored to each job application</li>
              <li>Show how your experience aligns with the role</li>
              <li>Include quantified achievements</li>
              <li>Mention relevant certifications</li>
            </ul>
          )}
        </div>
      </div>

      {/* Technical Skills Guide */}
      <div
        className="bg-slate-50 rounded-lg shadow-sm p-6 border-l-4 border-slate-400 cursor-pointer hover:shadow-md hover:bg-slate-100 transition-all duration-200"
        onClick={() => toggleCard('skills')}
      >
        <h4 className="font-bold text-slate-900 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-slate-600" />
            <span>Technical Skills</span>
          </div>
          <span className="text-slate-600 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Critical for ATS and recruiters - This makes or breaks you!</p>
          {expandedCard === 'skills' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">🔥 In-Demand Skills for 2025:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>AI/ML:</strong> Python, TensorFlow, PyTorch, LangChain</li>
                  <li><strong>Cloud:</strong> AWS, Azure, GCP (advanced certifications)</li>
                  <li><strong>DevOps:</strong> Kubernetes, Docker, Terraform, Jenkins</li>
                  <li><strong>Security:</strong> Zero Trust, SIEM, Incident Response</li>
                  <li><strong>Data:</strong> SQL, NoSQL, Data Pipelines, Analytics</li>
                </ul>
              </div>
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <p className="font-semibold text-red-800">❌ Remove These (They Hurt You):</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Entry-level certs if you have 5+ years experience</li>
                  <li>AWS Cloud Practitioner (too basic for experienced devs)</li>
                  <li>Google IT Certificate (entry-level only)</li>
                  <li>Skills not relevant to the target role</li>
                </ul>
              </div>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              <li>Align with job description requirements</li>
              <li>List in-demand skills first</li>
              <li>Group by category for clarity</li>
              <li>Update based on target role</li>
            </ul>
          )}
        </div>
      </div>

      {/* Experience Guide */}
      <div
        className="bg-slate-50 rounded-lg shadow-sm p-6 border-l-4 border-slate-400 cursor-pointer hover:shadow-md hover:bg-slate-100 transition-all duration-200"
        onClick={() => toggleCard('experience')}
      >
        <h4 className="font-bold text-slate-900 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-slate-600" />
            <span>Professional Experience</span>
          </div>
          <span className="text-slate-600 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Focus on WINS and IMPACT - Not job duties!</p>
          {expandedCard === 'experience' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">💪 The STAR Method Formula:</p>
                <div className="space-y-2 text-slate-700">
                  <p><strong>Action Verb</strong> + <strong>Technology Used</strong> + <strong>Quantifiable Result</strong></p>
                  <p className="text-sm italic">Example: "Architected microservices using Docker/K8s, reducing deployment time by 60%"</p>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <p className="font-semibold text-red-800 mb-2">❌ Avoid These "Fluff Words":</p>
                <div className="text-red-700 text-sm space-y-2">
                  <p>These words make you sound passive and get filtered out by ATS:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p>• "Responsible for..."</p>
                      <p>• "Assisted with..."</p>
                      <p>• "Helped to..."</p>
                      <p>• "Worked on..."</p>
                    </div>
                    <div>
                      <p>• "Collaborated on..."</p>
                      <p>• "Participated in..."</p>
                      <p>• "Contributed to..."</p>
                      <p>• "Involved in..."</p>
                    </div>
                  </div>
                  <p className="font-medium text-slate-900 mt-2">✅ Instead: Use specific action verbs and quantify your impact!</p>
                </div>
              </div>
              <div className="bg-slate-100 p-3 rounded border-l-4 border-slate-400">
                <p className="font-semibold text-slate-900">📊 Numbers Matter:</p>
                <p className="text-slate-700">Even small numbers beat no numbers. "Improved by 5%" > "Improved performance"</p>
              </div>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              <li>Use 3-5 bullet points per role</li>
              <li>Start with strong action verbs</li>
              <li>Quantify achievements (even low numbers)</li>
              <li>Show leadership and senior qualities</li>
            </ul>
          )}
        </div>
      </div>

      {/* Projects Guide */}
      <div
        className="bg-slate-50 rounded-lg shadow-sm p-6 border-l-4 border-slate-400 cursor-pointer hover:shadow-md hover:bg-slate-100 transition-all duration-200"
        onClick={() => toggleCard('projects')}
      >
        <h4 className="font-bold text-slate-900 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-slate-600" />
            <span>Projects</span>
          </div>
          <span className="text-slate-600 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Your secret weapon for standing out!</p>
          {expandedCard === 'projects' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">🎯 Strategic Placement:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>New Grads/Career Changers:</strong> Place BEFORE experience</li>
                  <li><strong>Experienced Devs:</strong> Place after experience</li>
                  <li><strong>Freelancers:</strong> Treat as professional experience</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">💡 What Recruiters Want to See:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Live URLs (GitHub, deployed apps)</li>
                  <li>User metrics ("500+ active users")</li>
                  <li>Modern tech stack</li>
                  <li>Problem-solving approach</li>
                  <li>Business impact or learning outcome</li>
                </ul>
              </div>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              <li>Place before experience if lacking professional work</li>
              <li>Include personal, open-source, or academic projects</li>
              <li>Focus on technologies and user impact</li>
              <li>Always include URLs when possible</li>
            </ul>
          )}
        </div>
      </div>

      {/* Education Guide */}
      <div className="bg-slate-50 rounded-lg shadow-sm p-6 border-l-4 border-slate-400 cursor-pointer hover:shadow-md hover:bg-slate-100 transition-all duration-200" onClick={() => toggleCard('education')}>
        <h4 className="font-bold text-slate-900 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-slate-600" />
            <span>Education</span>
          </div>
          <span className="text-slate-600 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Strategic placement = prime real estate optimization</p>
          {expandedCard === 'education' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">📍 Placement Strategy:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>5+ Years Experience:</strong> Bottom of resume (save space for skills/experience)</li>
                  <li><strong>Recent Grad:</strong> Top of resume (it's your main qualification)</li>
                  <li><strong>Career Changer:</strong> Top if relevant degree, bottom if not</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">✅ Include These (If You Have Them):</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>GPA if 3.5+ (especially for new grads)</li>
                  <li>Magna Cum Laude, Summa Cum Laude honors</li>
                  <li>Relevant coursework (for career changers)</li>
                  <li>Academic projects with real-world applications</li>
                </ul>
              </div>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              <li>Place at bottom for experienced professionals</li>
              <li>Move to top if recent graduate</li>
              <li>Include honors and achievements</li>
              <li>Keep it concise</li>
            </ul>
          )}
        </div>
      </div>

      {/* Certification Strategy */}
      <div
        className="bg-slate-50 rounded-lg shadow-sm p-6 border-l-4 border-slate-400 cursor-pointer hover:shadow-md hover:bg-slate-100 transition-all duration-200"
        onClick={() => toggleCard('certifications')}
      >
        <h4 className="font-bold text-slate-900 mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-slate-600" />
            <span>Certification Strategy</span>
          </div>
          <span className="text-slate-600 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Quality over quantity - Wrong certs hurt you!</p>
          {expandedCard === 'certifications' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="font-semibold text-slate-900 mb-2">🏆 High-Value Certs for 2025:</p>
                <div className="grid grid-cols-1 gap-2 text-slate-700 text-sm">
                  <div><strong>Security:</strong> CISSP, CISA, CompTIA CYSA+, CompTIA CAS</div>
                  <div><strong>Cloud:</strong> AWS Solutions Architect Pro, Azure Expert</div>
                  <div><strong>Specialized:</strong> SIEM, Zero Trust, Kubernetes (CKA)</div>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <p className="font-semibold text-red-800 mb-2">🚫 Remove These (They Make You Look Junior):</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>AWS Cloud Practitioner (if you have 5+ years)</li>
                  <li>Google IT Support Certificate</li>
                  <li>CompTIA A+ (unless help desk role)</li>
                  <li>Any cert not relevant to target role</li>
                </ul>
              </div>
              <div className="bg-slate-100 p-3 rounded border-l-4 border-slate-400">
                <p className="font-semibold text-slate-900">💰 Niche Down for 6-Figures:</p>
                <p className="text-slate-700">Specialized certs in AI, cybersecurity, or cloud architecture can command $150K+ salaries</p>
              </div>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              <li>Only list certs relevant to target role</li>
              <li>Remove entry-level certs if you're experienced</li>
              <li>Focus on advanced, specialized certifications</li>
              <li>Niche specialization = higher salary potential</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidancePanel;