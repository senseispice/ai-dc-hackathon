import { Settings as SettingsIcon, User, Users, Bell, Lock, Plug, Mail, Shield, Building2 } from 'lucide-react';

const teamMembers = [
  { name: 'Jane Doe', email: 'jane.doe@agency.gov', role: 'Admin', status: 'Active' },
  { name: 'John Smith', email: 'john.smith@agency.gov', role: 'Manager', status: 'Active' },
  { name: 'Sarah Johnson', email: 'sarah.j@agency.gov', role: 'Analyst', status: 'Active' },
  { name: 'Mike Wilson', email: 'mike.w@agency.gov', role: 'Viewer', status: 'Invited' },
];

export function SettingsPage() {
  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[28px] tracking-tight text-[#0F172A] mb-2">Settings</h1>
          <p className="text-[15px] text-[#64748B]">Manage your account, team, and preferences</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm sticky top-8">
              <nav className="space-y-1">
                <a href="#profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#F8FAFC] text-[#0F172A]">
                  <User className="w-4 h-4" />
                  <span className="text-[14px]">Profile</span>
                </a>
                <a href="#team" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]">
                  <Users className="w-4 h-4" />
                  <span className="text-[14px]">Team</span>
                </a>
                <a href="#notifications" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]">
                  <Bell className="w-4 h-4" />
                  <span className="text-[14px]">Notifications</span>
                </a>
                <a href="#security" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]">
                  <Lock className="w-4 h-4" />
                  <span className="text-[14px]">Security</span>
                </a>
                <a href="#integrations" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]">
                  <Plug className="w-4 h-4" />
                  <span className="text-[14px]">Integrations</span>
                </a>
              </nav>
            </div>
          </div>

          <div className="col-span-9 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-[#0F172A]" />
                <h2 className="text-[20px] font-semibold text-[#0F172A]">Profile Settings</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-[#E5E7EB]">
                  <div className="w-20 h-20 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-[24px] font-semibold">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="text-[16px] font-semibold text-[#0F172A] mb-1">Jane Doe</div>
                    <div className="text-[14px] text-[#64748B] mb-3">jane.doe@agency.gov</div>
                    <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] hover:bg-[#F8FAFC] transition-colors">
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Jane Doe"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Procurement Director"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Agency
                  </label>
                  <input
                    type="text"
                    defaultValue="Bureau of Land Management"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#0F172A] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="jane.doe@agency.gov"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button className="px-5 py-2.5 bg-[#166534] text-white rounded-lg text-[14px] font-medium hover:bg-[#166534]/90 transition-colors">
                    Save Changes
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#0F172A] rounded-lg text-[14px] font-medium hover:bg-[#F8FAFC] transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#0F172A]" />
                  <h2 className="text-[20px] font-semibold text-[#0F172A]">Team Members</h2>
                </div>
                <button className="px-4 py-2 bg-[#166534] text-white rounded-lg text-[14px] font-medium hover:bg-[#166534]/90 transition-colors">
                  Invite Member
                </button>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
                      <th className="text-left px-6 py-4 text-[13px] font-medium text-[#64748B]">Name</th>
                      <th className="text-left px-6 py-4 text-[13px] font-medium text-[#64748B]">Email</th>
                      <th className="text-left px-6 py-4 text-[13px] font-medium text-[#64748B]">Role</th>
                      <th className="text-left px-6 py-4 text-[13px] font-medium text-[#64748B]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, index) => (
                      <tr key={index} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-6 py-4 text-[14px] text-[#0F172A] font-medium">{member.name}</td>
                        <td className="px-6 py-4 text-[14px] text-[#64748B]">{member.email}</td>
                        <td className="px-6 py-4 text-[14px] text-[#0F172A]">{member.role}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[12px] font-medium ${
                            member.status === 'Active'
                              ? 'bg-[#DCFCE7] text-[#166534]'
                              : 'bg-[#FEF3C7] text-[#92400E]'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-[#0F172A]" />
                <h2 className="text-[20px] font-semibold text-[#0F172A]">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'New contractor matches', description: 'Get notified when AI finds matching contractors', enabled: true },
                  { label: 'Project status updates', description: 'Receive updates on project milestones', enabled: true },
                  { label: 'Team activity', description: 'Notifications about team member actions', enabled: false },
                  { label: 'Weekly reports', description: 'Summary of procurement activity and savings', enabled: true },
                  { label: 'System alerts', description: 'Important system and security notifications', enabled: true },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-[#0F172A] mb-1">{notification.label}</div>
                      <div className="text-[13px] text-[#64748B]">{notification.description}</div>
                    </div>
                    <button className={`relative w-12 h-6 rounded-full transition-colors ${
                      notification.enabled ? 'bg-[#166534]' : 'bg-[#E5E7EB]'
                    }`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notification.enabled ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Plug className="w-5 h-5 text-[#0F172A]" />
                <h2 className="text-[20px] font-semibold text-[#0F172A]">Integrations</h2>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'SAM.gov', description: 'Sync contractor data from System for Award Management', icon: Building2, connected: true },
                  { name: 'Email Notifications', description: 'Send updates via agency email system', icon: Mail, connected: true },
                  { name: 'Federal Compliance DB', description: 'Verify certifications and compliance status', icon: Shield, connected: true },
                  { name: 'Budget Management', description: 'Connect to agency financial systems', icon: Lock, connected: false },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border border-[#E5E7EB] rounded-xl hover:border-[#166534]/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center">
                        <integration.icon className="w-6 h-6 text-[#0F172A]" />
                      </div>
                      <div>
                        <div className="text-[15px] font-medium text-[#0F172A] mb-1">{integration.name}</div>
                        <div className="text-[13px] text-[#64748B]">{integration.description}</div>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                      integration.connected
                        ? 'bg-white border border-[#E5E7EB] text-[#0F172A] hover:bg-[#F8FAFC]'
                        : 'bg-[#166534] text-white hover:bg-[#166534]/90'
                    }`}>
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
