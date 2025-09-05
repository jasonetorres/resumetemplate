import React, { useState } from 'react';
import { Info, Target, Zap, Users, Trophy, GraduationCap, AlertTriangle, CheckCircle, TrendingUp, Award, Brain, Eye } from 'lucide-react';
import RoleSpecificTips from './RoleSpecificTips';

const GuidancePanel: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2 font-inter">
        <Info className="w-5 h-5 text-blue-600" />
        <span>Resume Writing Guidance</span>
      </h3>

      {/* Role-Specific Tips */}
      <RoleSpecificTips />

      {/* Critical ATS Warning */}
      <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl shadow-md p-6 border-l-4 border-red-500">
        <h4 className="font-bold text-red-400 mb-3 flex items-center space-x-2 font-inter">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span>⚠️ ATS Reality Check</span>
        </h4>
        <div className="text-sm text-red-300 space-y-2 font-inter">
          <p className="font-semibold text-red-200 font-inter">Most resumes don't even make it past AI screening!</p>
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
        className="bg-gray-700 rounded-2xl shadow-md p-6 border-l-4 cursor-pointer hover:shadow-lg transition-all duration-200"
        style={{ borderLeftColor: '#0044ff' }}
        onClick={() => toggleCard('summary')}
      >
        <h4 className="font-bold text-white mb-3 flex items-center justify-between font-inter">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4" style={{ color: '#0044ff' }} />
            <span>Professional Summary</span>
          </div>
          <span className="text-sm" style={{ color: '#0044ff' }}>Click to expand</span>
        </h4>
        <div className="text-sm text-gray-300 space-y-2 font-inter">
          <p className="font-semibold" style={{ color: '#0044ff' }}>Your "Mini Cover Letter" - Most Important Section!</p>
          {expandedCard === 'summary' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-blue-900/30 p-3 rounded-xl">
                <p className="font-semibold mb-2 font-inter" style={{ color: '#0044ff' }}>🎯 The Formula That Works:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-200 font-inter">
                  <li><strong>Experience:</strong> "X+ years of professional experience as [Role] in [Industry]"</li>
                  <li><strong>Primary Skills:</strong> Your main technical competencies</li>
                  <li><strong>Secondary Skills:</strong> What makes you unique</li>
                  <li><strong>Key Achievement:</strong> One quantified win with numbers</li>
                  <li><strong>Education/Certs:</strong> Relevant credentials</li>
                </ol>
              </div>
              <div className="bg-yellow-900/30 p-3 rounded border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-300 font-inter">💡 Pro Tip:</p>
                <p className="text-yellow-200 font-inter">This section alone can get you past ATS and into human hands. Tailor it to each job application!</p>
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
        className="bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => toggleCard('skills')}
      >
        <h4 className="font-bold text-white mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Technical Skills</span>
          </div>
          <span className="text-blue-400 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-blue-300">Critical for ATS and recruiters - This makes or breaks you!</p>
          {expandedCard === 'skills' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-blue-900/30 p-3 rounded">
                <p className="font-semibold text-blue-300 mb-2">🔥 In-Demand Skills for 2025:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-200">
                  <li><strong>AI/ML:</strong> Python, TensorFlow, PyTorch, LangChain</li>
                  <li><strong>Cloud:</strong> AWS, Azure, GCP (advanced certifications)</li>
                  <li><strong>DevOps:</strong> Kubernetes, Docker, Terraform, Jenkins</li>
                  <li><strong>Security:</strong> Zero Trust, SIEM, Incident Response</li>
                  <li><strong>Data:</strong> SQL, NoSQL, Data Pipelines, Analytics</li>
                </ul>
              </div>
              <div className="bg-red-900/30 p-3 rounded border-l-4 border-red-400">
                <p className="font-semibold text-red-300">❌ Remove These (They Hurt You):</p>
                <ul className="list-disc list-inside space-y-1 text-red-200">
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
        className="bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-purple-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => toggleCard('experience')}
      >
        <h4 className="font-bold text-white mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>Professional Experience</span>
          </div>
          <span className="text-purple-400 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-purple-300">Focus on WINS and IMPACT - Not job duties!</p>
          {expandedCard === 'experience' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-purple-900/30 p-3 rounded">
                <p className="font-semibold text-purple-300 mb-2">💪 The STAR Method Formula:</p>
                <div className="space-y-2 text-purple-200">
                  <p><strong>Action Verb</strong> + <strong>Technology Used</strong> + <strong>Quantifiable Result</strong></p>
                  <p className="text-sm italic">Example: "Architected microservices using Docker/K8s, reducing deployment time by 60%"</p>
                </div>
              </div>
              <div className="bg-green-900/30 p-3 rounded">
                <p className="font-semibold text-red-300 mb-2">❌ Avoid These "Fluff Words":</p>
                <div className="text-red-200 text-sm space-y-2">
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
                  <p className="font-medium text-green-300 mt-2">✅ Instead: Use specific action verbs and quantify your impact!</p>
                </div>
              </div>
              <div className="bg-yellow-900/30 p-3 rounded border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-300">📊 Numbers Matter:</p>
                <p className="text-yellow-200">Even small numbers beat no numbers. "Improved by 5%" > "Improved performance"</p>
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
        className="bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => toggleCard('projects')}
      >
        <h4 className="font-bold text-white mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span>Projects</span>
          </div>
          <span className="text-orange-400 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-orange-300">Your secret weapon for standing out!</p>
          {expandedCard === 'projects' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-orange-900/30 p-3 rounded">
                <p className="font-semibold text-orange-300 mb-2">🎯 Strategic Placement:</p>
                <ul className="list-disc list-inside space-y-1 text-orange-200">
                  <li><strong>New Grads/Career Changers:</strong> Place BEFORE experience</li>
                  <li><strong>Experienced Devs:</strong> Place after experience</li>
                  <li><strong>Freelancers:</strong> Treat as professional experience</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 p-3 rounded">
                <p className="font-semibold text-blue-300 mb-2">💡 What Recruiters Want to See:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-200">
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
      <div 
        className="bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-pink-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => toggleCard('education')}
      >
        <h4 className="font-bold text-white mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-pink-400" />
            <span>Education</span>
          </div>
          <span className="text-pink-400 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-pink-300">Strategic placement = prime real estate optimization</p>
          {expandedCard === 'education' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-pink-900/30 p-3 rounded">
                <p className="font-semibold text-pink-300 mb-2">📍 Placement Strategy:</p>
                <ul className="list-disc list-inside space-y-1 text-pink-200">
                  <li><strong>5+ Years Experience:</strong> Bottom of resume (save space for skills/experience)</li>
                  <li><strong>Recent Grad:</strong> Top of resume (it's your main qualification)</li>
                  <li><strong>Career Changer:</strong> Top if relevant degree, bottom if not</li>
                </ul>
              </div>
              <div className="bg-green-900/30 p-3 rounded">
                <p className="font-semibold text-green-300 mb-2">✅ Include These (If You Have Them):</p>
                <ul className="list-disc list-inside space-y-1 text-green-200">
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
        className="bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-emerald-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => toggleCard('certifications')}
      >
        <h4 className="font-bold text-white mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Certification Strategy</span>
          </div>
          <span className="text-emerald-400 text-sm">Click to expand</span>
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-emerald-300">Quality over quantity - Wrong certs hurt you!</p>
          {expandedCard === 'certifications' ? (
            <div className="space-y-3 mt-4">
              <div className="bg-emerald-900/30 p-3 rounded">
                <p className="font-semibold text-emerald-300 mb-2">🏆 High-Value Certs for 2025:</p>
                <div className="grid grid-cols-1 gap-2 text-emerald-200 text-sm">
                  <div><strong>Security:</strong> CISSP, CISA, CompTIA CYSA+, CompTIA CAS</div>
                  <div><strong>Cloud:</strong> AWS Solutions Architect Pro, Azure Expert</div>
                  <div><strong>Specialized:</strong> SIEM, Zero Trust, Kubernetes (CKA)</div>
                </div>
              </div>
              <div className="bg-gray-200 p-3 rounded border-l-4 border-gray-600">
                <p className="font-semibold text-red-300 mb-2">🚫 Remove These (They Make You Look Junior):</p>
                <ul className="list-disc list-inside space-y-1 text-red-200">
                  <li>AWS Cloud Practitioner (if you have 5+ years)</li>
                  <li>Google IT Support Certificate</li>
                  <li>CompTIA A+ (unless help desk role)</li>
                  <li>Any cert not relevant to target role</li>
                </ul>
              </div>
              <div className="bg-yellow-900/30 p-3 rounded border-l-4 border-yellow-400">
                <p className="font-semibold text-yellow-300">💰 Niche Down for 6-Figures:</p>
                <p className="text-yellow-200">Specialized certs in AI, cybersecurity, or cloud architecture can command $150K+ salaries</p>
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