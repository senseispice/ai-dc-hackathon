import { BarChart3, PieChart, Download, Calendar, TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

export function ReportsPage() {
  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] tracking-tight text-[#0F172A] mb-2">Procurement Analytics</h1>
            <p className="text-[15px] text-[#64748B]">Performance insights and cost optimization reports</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last 12 Months
            </button>
            <button className="px-4 py-2 bg-[#166534] text-white rounded-lg text-[14px] font-medium hover:bg-[#166534]/90 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#DCFCE7] rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#166534]" />
              </div>
              <div className="text-[13px] text-[#64748B]">Total Savings</div>
            </div>
            <div className="text-[28px] font-semibold text-[#0F172A] mb-2">$2.4M</div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#166534]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>32% vs traditional</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#1E40AF]" />
              </div>
              <div className="text-[13px] text-[#64748B]">Time Saved</div>
            </div>
            <div className="text-[28px] font-semibold text-[#0F172A] mb-2">124 hrs</div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#166534]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>18 days faster</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FEF3C7] rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-[#92400E]" />
              </div>
              <div className="text-[13px] text-[#64748B]">Match Accuracy</div>
            </div>
            <div className="text-[28px] font-semibold text-[#0F172A] mb-2">94%</div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#166534]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>8% improvement</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FCE7F3] rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#9F1239]" />
              </div>
              <div className="text-[13px] text-[#64748B]">Projects Closed</div>
            </div>
            <div className="text-[28px] font-semibold text-[#0F172A] mb-2">36</div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#166534]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>12 this quarter</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-[#0F172A]" />
                <h3 className="text-[16px] font-semibold text-[#0F172A]">Cost Savings Trend</h3>
              </div>
            </div>
            <div className="h-[280px] flex items-end justify-between gap-4">
              {[
                { month: 'Jan', value: 65, amount: '$156k' },
                { month: 'Feb', value: 45, amount: '$108k' },
                { month: 'Mar', value: 80, amount: '$192k' },
                { month: 'Apr', value: 70, amount: '$168k' },
                { month: 'May', value: 90, amount: '$216k' },
                { month: 'Jun', value: 85, amount: '$204k' },
                { month: 'Jul', value: 75, amount: '$180k' },
                { month: 'Aug', value: 95, amount: '$228k' },
                { month: 'Sep', value: 88, amount: '$211k' },
                { month: 'Oct', value: 92, amount: '$221k' },
                { month: 'Nov', value: 85, amount: '$204k' },
                { month: 'Dec', value: 100, amount: '$240k' },
              ].map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-[#166534] rounded-t-lg hover:bg-[#166534]/80 transition-colors relative" style={{ height: `${item.value * 2.4}px` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white px-2 py-1 rounded text-[11px] whitespace-nowrap">
                      {item.amount}
                    </div>
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-3">{item.month}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-5 h-5 text-[#0F172A]" />
              <h3 className="text-[16px] font-semibold text-[#0F172A]">Project Types</h3>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Watershed', count: 12, percentage: 33, color: '#166534' },
                { type: 'Forest', count: 9, percentage: 25, color: '#22C55E' },
                { type: 'Coastal', count: 7, percentage: 19, color: '#86EFAC' },
                { type: 'Wetland', count: 5, percentage: 14, color: '#DCFCE7' },
                { type: 'Prairie', count: 3, percentage: 9, color: '#F0FDF4' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-[#0F172A]">{item.type}</span>
                    <span className="text-[14px] font-semibold text-[#0F172A]">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-1">{item.count} projects</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <h3 className="text-[16px] font-semibold text-[#0F172A] mb-6">Top Performing Contractors</h3>
            <div className="space-y-4">
              {[
                { name: 'Great Basin Restoration', projects: 23, rating: 4.9, savings: '$420k' },
                { name: 'Coastal Restoration Co', projects: 29, rating: 4.9, savings: '$385k' },
                { name: 'Watershed Experts Inc', projects: 27, rating: 4.8, savings: '$362k' },
                { name: 'EcoRestore Partners', projects: 18, rating: 4.7, savings: '$298k' },
                { name: 'Desert Recovery Group', projects: 15, rating: 4.5, savings: '$245k' },
              ].map((contractor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#F1F5F9] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#166534] rounded-lg flex items-center justify-center text-white text-[13px] font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-[#0F172A]">{contractor.name}</div>
                      <div className="text-[13px] text-[#64748B]">{contractor.projects} projects completed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold text-[#0F172A]">{contractor.savings}</div>
                    <div className="text-[13px] text-[#64748B]">saved</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <h3 className="text-[16px] font-semibold text-[#0F172A] mb-6">Procurement Efficiency</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] text-[#64748B]">Average Review Time</span>
                  <span className="text-[14px] font-semibold text-[#0F172A]">2.4 days</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                  <div className="bg-[#166534] h-2 rounded-full" style={{ width: '85%' }} />
                </div>
                <div className="text-[12px] text-[#166534] mt-1">85% faster than industry avg</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] text-[#64748B]">Contractor Response Rate</span>
                  <span className="text-[14px] font-semibold text-[#0F172A]">94%</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                  <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: '94%' }} />
                </div>
                <div className="text-[12px] text-[#166534] mt-1">Excellent engagement</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] text-[#64748B]">Compliance Rate</span>
                  <span className="text-[14px] font-semibold text-[#0F172A]">98%</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                  <div className="bg-[#166534] h-2 rounded-full" style={{ width: '98%' }} />
                </div>
                <div className="text-[12px] text-[#166534] mt-1">Above target threshold</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] text-[#64748B]">Cost Accuracy</span>
                  <span className="text-[14px] font-semibold text-[#0F172A]">96%</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                  <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: '96%' }} />
                </div>
                <div className="text-[12px] text-[#166534] mt-1">Minimal budget variance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
