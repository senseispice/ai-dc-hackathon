import { ClipboardList, UploadCloud, FileText, Sparkles, MapPin, DollarSign, Calendar, Check } from 'lucide-react';

const steps = [
  { number: 1, title: 'Project Details', icon: ClipboardList },
  { number: 2, title: 'Location & Scope', icon: MapPin },
  { number: 3, title: 'Budget & Timeline', icon: DollarSign },
  { number: 4, title: 'Documents', icon: UploadCloud },
];

export function IntakePage() {
  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[28px] tracking-tight text-[#0F172A] mb-2">New Project Intake</h1>
          <p className="text-[15px] text-[#64748B]">Submit restoration project for AI-powered contractor matching</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="text-[14px] font-semibold text-[#0F172A] mb-6">Progress</div>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      index === 0
                        ? 'bg-[#166534] text-white'
                        : 'bg-[#F8FAFC] text-[#64748B]'
                    }`}>
                      {index < 0 ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className={`text-[13px] font-medium ${
                        index === 0 ? 'text-[#0F172A]' : 'text-[#64748B]'
                      }`}>
                        Step {step.number}
                      </div>
                      <div className={`text-[14px] ${
                        index === 0 ? 'text-[#0F172A]' : 'text-[#64748B]'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
              <h2 className="text-[20px] font-semibold text-[#0F172A] mb-6">Project Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Sierra Nevada Watershed Restoration"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Project Type
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]">
                    <option>Select project type</option>
                    <option>Watershed Restoration</option>
                    <option>Forest Restoration</option>
                    <option>Wetland Recovery</option>
                    <option>Coastal Restoration</option>
                    <option>Prairie/Grassland</option>
                    <option>Desert Ecosystem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Project Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Provide detailed description of restoration goals, environmental context, and specific requirements..."
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Agency Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bureau of Land Management"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Project Manager
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="project.manager@agency.gov"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#E5E7EB]">
                <button className="px-5 py-2.5 bg-[#166534] text-white rounded-lg text-[14px] font-medium hover:bg-[#166534]/90 transition-colors">
                  Continue to Location & Scope
                </button>
                <button className="px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#0F172A] rounded-lg text-[14px] font-medium hover:bg-[#F8FAFC] transition-colors">
                  Save Draft
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#166534]" />
                <h3 className="text-[14px] font-semibold text-[#0F172A]">AI Assistant</h3>
              </div>

              <div className="space-y-5">
                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-[#166534] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[13px] font-medium text-[#0F172A] mb-1">
                        Tip: Be specific
                      </div>
                      <p className="text-[13px] text-[#64748B] leading-relaxed">
                        Include acreage, terrain type, and accessibility details to get better contractor matches
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#166534] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[13px] font-medium text-[#0F172A] mb-1">
                        Required certifications
                      </div>
                      <p className="text-[13px] text-[#64748B] leading-relaxed">
                        Federal projects require EPA certification and ISO 14001 compliance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#166534] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[13px] font-medium text-[#0F172A] mb-1">
                        Timeline planning
                      </div>
                      <p className="text-[13px] text-[#64748B] leading-relaxed">
                        Average restoration projects take 14-20 months to complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
