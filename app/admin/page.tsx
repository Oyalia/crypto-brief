"use client";

import { useEffect, useState } from "react";
import { getBriefs, updateBriefStatus } from "../actions";

type Brief = {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string | null;
  socialLinks: string | null;
  location: string | null;
  teamSize: string | null;
  fundingStage: string | null;
  projectType: string;
  projectNiche: string;
  currentWebsite: string | null;
  goals: string;
  targetAudience: string;
  competitors: string | null;
  designPrefs: string | null;
  brandGuidelines: string | null;
  features: string;
  integrations: string | null;
  userRoles: string | null;
  contentReady: string | null;
  techStack: string | null;
  complianceLevel: string | null;
  expectedVolume: string | null;
  budget: string;
  deadline: string;
  maintenance: string | null;
  comments: string | null;
  status: string;
  createdAt: Date;
};

export default function AdminPanel() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBriefs();
  }, []);

  async function fetchBriefs() {
    setLoading(true);
    const data = await getBriefs();
    setBriefs(data as Brief[]);
    setLoading(false);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    const result = await updateBriefStatus(id, newStatus);
    if (result.success) {
      setBriefs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-12 text-slate-900 dark:text-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Project Briefs</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Review your incoming detailed project inquiries.</p>
          </div>
          <button onClick={fetchBriefs} className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Refresh List
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          </div>
        ) : briefs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xl">
            <svg className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No briefs found</h3>
            <p className="mt-2 text-slate-500">Share your form to start collecting project details!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {briefs.map((brief) => (
              <div key={brief.id} className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                <div className="p-8 sm:p-10">
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        {brief.companyName}
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
                          {brief.projectType}
                        </span>
                        {brief.projectNiche && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {brief.projectNiche}
                          </span>
                        )}
                      </h2>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-4 mt-4">
                        <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> {brief.contactPerson}</span>
                        <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> <a href={`mailto:${brief.email}`} className="hover:text-rose-500 transition-colors">{brief.email}</a></span>
                        {brief.phone && <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> <a href={`tel:${brief.phone}`} className="hover:text-rose-500 transition-colors">{brief.phone}</a></span>}
                        {brief.socialLinks && <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> {brief.socialLinks}</span>}
                        {brief.location && <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">📍 {brief.location}</span>}
                        {brief.teamSize && <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">👥 {brief.teamSize}</span>}
                        {brief.fundingStage && <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">💰 {brief.fundingStage}</span>}
                        {brief.currentWebsite && <span className="flex items-center bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg"><svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> <a href={brief.currentWebsite} target="_blank" rel="noopener" className="hover:text-rose-500 transition-colors">Current Website</a></span>}
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex gap-6 text-sm text-right bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Budget</span>
                        <span className="font-black text-emerald-500 dark:text-emerald-400 text-lg">{brief.budget}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Launch By</span>
                        <span className="font-black text-slate-900 dark:text-white text-lg">{new Date(brief.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    
                    {/* Left Column: Vision */}
                    <div className="space-y-8">
                      <div>
                        <span className="block text-xs font-bold text-sky-500 uppercase tracking-widest mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-500"></div> The Vision</span>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Goals:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">{brief.goals}</p>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Audience:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">{brief.targetAudience}</p>
                          </div>
                          {brief.expectedVolume && (
                            <div>
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Expected Volume:</span>
                              <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">{brief.expectedVolume}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {(brief.designPrefs || brief.brandGuidelines || brief.competitors) && (
                        <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                          <span className="block text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">Design & Branding</span>
                          {brief.designPrefs && (
                            <div>
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Design Vibe:</span>
                              <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.designPrefs}</p>
                            </div>
                          )}
                          {brief.brandGuidelines && (
                            <div>
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Brand Assets:</span>
                              <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.brandGuidelines}</p>
                            </div>
                          )}
                          {brief.competitors && (
                            <div>
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Competitors/Inspo:</span>
                              <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.competitors}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Tech & Specs */}
                    <div className="space-y-8">
                      <div>
                        <span className="block text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Features & Specs</span>
                        <div className="flex flex-wrap gap-2">
                          {brief.features.split(', ').map(f => f && (
                            <span key={f} className="px-4 py-2 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800/50">{f}</span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {brief.techStack && (
                          <div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Tech Stack:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.techStack}</p>
                          </div>
                        )}
                        {brief.complianceLevel && (
                          <div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Compliance/KYC:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.complianceLevel}</p>
                          </div>
                        )}
                        {brief.userRoles && (
                          <div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">User Roles:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.userRoles}</p>
                          </div>
                        )}
                        {brief.integrations && (
                          <div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Integrations:</span>
                            <p className="mt-1 text-slate-600 dark:text-slate-400">{brief.integrations}</p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div>
                          <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Content Ready?</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{brief.contentReady || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Maintenance</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{brief.maintenance || 'Not specified'}</span>
                        </div>
                      </div>

                      {brief.comments && (
                        <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/30">
                          <span className="block text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">Final Thoughts</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium italic">&quot;{brief.comments}&quot;</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Footer Status Row */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-6 sm:px-10 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-sm font-bold text-slate-400">
                    Received: {new Date(brief.createdAt).toLocaleString()}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <label htmlFor={`status-${brief.id}`} className="text-sm font-bold text-slate-500 uppercase tracking-widest">Status:</label>
                    <select
                      id={`status-${brief.id}`}
                      value={brief.status}
                      onChange={(e) => handleStatusChange(brief.id, e.target.value)}
                      className={`text-sm font-bold rounded-xl border-2 shadow-sm focus:ring-4 focus:ring-opacity-50 py-2 pl-4 pr-10 outline-none cursor-pointer transition-all ${
                        brief.status === 'New' ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800 focus:ring-sky-500' :
                        brief.status === 'In Progress' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 focus:ring-amber-500' :
                        'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500'
                      }`}
                    >
                      <option value="New">🌟 New Lead</option>
                      <option value="In Progress">⏳ Reviewing</option>
                      <option value="Completed">✅ Deal Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
