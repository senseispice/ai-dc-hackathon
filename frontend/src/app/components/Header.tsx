import { Search, Bell, Plus } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b border-[#F1F5F9] flex items-center justify-between px-8 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search projects, contractors..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#FAFAFA] border border-[#F1F5F9] rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#166534]/10 focus:border-[#166534]/30 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2.5 hover:bg-[#FAFAFA] rounded-xl transition-all">
          <Bell className="w-5 h-5 text-[#64748B]" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#166534] rounded-full shadow-[0_0_6px_rgba(22,101,52,0.4)]"></div>
        </button>
        <div className="w-9 h-9 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-full flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
          JD
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-[#166534] to-[#15803D] text-white rounded-xl text-[14px] font-semibold hover:shadow-[0_4px_12px_rgba(22,101,52,0.2)] transition-all flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>
    </header>
  );
}
