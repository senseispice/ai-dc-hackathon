import {
  Briefcase,
  FileCheck,
  Clock,
  ShieldCheck,
  Award,
  Check,
  ArrowRight,
  Sparkles,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const kpis = [
  { label: 'Open Projects', value: '12', change: '+3 this month', icon: Briefcase, trend: 'up' },
  { label: 'Proposals Reviewed', value: '36', change: '+8 this week', icon: FileCheck, trend: 'up' },
  { label: 'Avg Review Time', value: '2.4d', change: '18% faster', icon: Clock, trend: 'up' },
  { label: 'Compliance Rate', value: '98%', change: '+2% improvement', icon: ShieldCheck, trend: 'up' },
];

const contractors = [
  { name: 'Great Basin Restoration', score: 92, risk: 'Low', cost: '$645k', timeline: '14 mo' },
  { name: 'EcoRestore Partners', score: 84, risk: 'Medium', cost: '$620k', timeline: '18 mo' },
  { name: 'Prairie Solutions LLC', score: 78, risk: 'Low', cost: '$590k', timeline: '20 mo' },
];

export function DashboardPage() {
  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold tracking-tight text-[#0F172A] mb-2">Government Procurement Intelligence</h1>
          <p className="text-[15px] text-[#64748B]">AI-powered contractor selection for land restoration projects</p>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-8">
          {kpis.map((kpi, index) => (
            <div key={kpi.label} className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all border border-[#F1F5F9]">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  index === 0 ? 'bg-[#EFF6FF]' :
                  index === 1 ? 'bg-[#F0FDF4]' :
                  index === 2 ? 'bg-[#FEF3C7]' :
                  'bg-[#F5F3FF]'
                }`}>
                  <kpi.icon className={`w-5 h-5 ${
                    index === 0 ? 'text-[#1E40AF]' :
                    index === 1 ? 'text-[#166534]' :
                    index === 2 ? 'text-[#B45309]' :
                    'text-[#6D28D9]'
                  }`} />
                </div>
              </div>
              <div className="text-[13px] font-medium text-[#64748B] mb-2 uppercase tracking-wide">{kpi.label}</div>
              <div className="text-[36px] font-bold text-[#0F172A] mb-3 tracking-tight">{kpi.value}</div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#166534] font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-9 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#166534]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#FCD34D]/20 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#FCD34D]" />
                    </div>
                    <span className="text-[13px] font-medium text-[#94A3B8] uppercase tracking-wide">Top Recommended</span>
                  </div>
                  <h2 className="text-[36px] font-bold text-white mb-4 tracking-tight">Great Basin Restoration</h2>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#166534]/20 backdrop-blur-sm rounded-lg border border-[#166534]/30">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-[13px] font-medium text-[#86EFAC]">Low Risk</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    <div className="text-[13px] font-medium text-[#CBD5E1] mb-3 uppercase tracking-wide">Why selected:</div>
                    <div className="flex items-center gap-3 text-[15px] text-white/90">
                      <div className="w-5 h-5 bg-[#22C55E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#22C55E]" />
                      </div>
                      <span>Verified credentials and certifications</span>
                    </div>
                    <div className="flex items-center gap-3 text-[15px] text-white/90">
                      <div className="w-5 h-5 bg-[#22C55E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#22C55E]" />
                      </div>
                      <span>Completed 23 similar restoration projects</span>
                    </div>
                    <div className="flex items-center gap-3 text-[15px] text-white/90">
                      <div className="w-5 h-5 bg-[#22C55E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#22C55E]" />
                      </div>
                      <span>Optimal cost-to-timeline ratio for this project</span>
                    </div>
                    <div className="flex items-center gap-3 text-[15px] text-white/90">
                      <div className="w-5 h-5 bg-[#22C55E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#22C55E]" />
                      </div>
                      <span>Strong federal compliance history</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white text-[#0F172A] rounded-xl text-[14px] font-semibold hover:bg-[#F8FAFC] transition-all shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)]">
                      Approve Contractor
                    </button>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl text-[14px] font-semibold hover:bg-white/15 transition-all flex items-center gap-2">
                      Compare Options
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[13px] font-medium text-[#94A3B8] mb-3 uppercase tracking-wide">Match Score</div>
                  <div className="relative inline-block">
                    <div className="text-[64px] font-bold text-[#FCD34D] leading-none tracking-tight">92</div>
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FCD34D]/50 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#F1F5F9]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#166534] to-[#15803D] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0F172A]">AI Insights</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-[#FEF3C7]/50 rounded-lg border border-[#FDE68A]/30">
                <div className="w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-3 h-3 text-white" />
                </div>
                <p className="text-[14px] text-[#0F172A] leading-relaxed font-medium">
                  EcoRestore Partners missing updated liability insurance documentation
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-[#F0FDF4]/50 rounded-lg border border-[#BBF7D0]/30">
                <div className="w-5 h-5 bg-[#166534] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-[14px] text-[#0F172A] leading-relaxed font-medium">
                  Great Basin has 94% regional success rate, highest in database
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-[#F0FDF4]/50 rounded-lg border border-[#BBF7D0]/30">
                <div className="w-5 h-5 bg-[#166534] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-[14px] text-[#0F172A] leading-relaxed font-medium">
                  Prairie offers lowest bid but timeline exceeds project deadline
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-[#EFF6FF]/50 rounded-lg border border-[#DBEAFE]/30">
                <div className="w-5 h-5 bg-gradient-to-br from-[#166534] to-[#15803D] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <p className="text-[14px] text-[#0F172A] leading-relaxed font-medium">
                  Estimated procurement time savings: 18 business days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden border border-[#F1F5F9]">
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-gradient-to-r from-white to-[#F8FAFC]">
            <h3 className="text-[18px] font-semibold text-[#0F172A]">Contractor Rankings</h3>
            <p className="text-[13px] text-[#64748B] mt-1">Top matches for your project requirements</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9] bg-[#FAFAFA]">
                <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide">Contractor</th>
                <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide">AI Score</th>
                <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide">Risk Level</th>
                <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide">Estimated Cost</th>
                <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#64748B] uppercase tracking-wide">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {contractors.map((contractor, index) => (
                <tr key={index} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#FAFAFA]/50 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#166534] to-[#15803D] rounded-lg flex items-center justify-center text-white font-semibold text-[14px] shadow-sm">
                        {index + 1}
                      </div>
                      <span className="text-[15px] text-[#0F172A] font-semibold group-hover:text-[#166534] transition-colors">{contractor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold text-[#0F172A]">{contractor.score}</span>
                      <div className="w-12 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#166534] to-[#22C55E] rounded-full" style={{ width: `${contractor.score}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold ${
                      contractor.risk === 'Low'
                        ? 'bg-[#DCFCE7] text-[#166534]'
                        : 'bg-[#FEF3C7] text-[#92400E]'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        contractor.risk === 'Low' ? 'bg-[#166534]' : 'bg-[#F59E0B]'
                      }`}></div>
                      {contractor.risk}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[15px] text-[#0F172A] font-semibold">{contractor.cost}</td>
                  <td className="px-6 py-5 text-[15px] text-[#64748B] font-medium">{contractor.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
