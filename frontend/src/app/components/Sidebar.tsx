import { LayoutDashboard, Users, FileText, BarChart3, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from '../../imports/RestoreFlow_AI_is_an_innovative_technology_designed_to_enhance_and_optimize_fluid_dynamics_across_various_applications,_ranging_from_industrial_processes_to_environmental_systems._Utilizing_advanc.png';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Contractors', href: '/contractors', icon: Users },
  { name: 'New Project', href: '/intake', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-[#F1F5F9] flex flex-col">
      <div className="p-6 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <ImageWithFallback
              src={logoImage}
              alt="RestoreFlow AI"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-[15px] text-[#0F172A] tracking-tight">RestoreFlow AI</div>
            <div className="text-[11px] text-[#64748B] font-medium">Procurement Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1.5 transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] text-[#166534] shadow-[0_1px_3px_rgba(0,0,0,0.05)] font-semibold'
                  : 'text-[#64748B] hover:bg-[#FAFAFA] font-medium'
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#166534]' : 'text-[#94A3B8] group-hover:text-[#64748B]'}`} />
              <span className="text-[14px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-[#FAFAFA] to-white rounded-xl border border-[#F1F5F9]">
          <div className="w-9 h-9 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-full flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-[#0F172A] truncate">Jane Doe</div>
            <div className="text-[11px] text-[#64748B] truncate">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
