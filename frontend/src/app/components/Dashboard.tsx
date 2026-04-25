import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

const kpiData = [
  {
    label: 'Active Projects',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: FileCheck,
    color: 'blue'
  },
  {
    label: 'Total Budget',
    value: '$8.4M',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'green'
  },
  {
    label: 'Qualified Contractors',
    value: '156',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'purple'
  },
  {
    label: 'Avg. Processing Time',
    value: '14 days',
    change: '-23%',
    trend: 'down',
    icon: TrendingUp,
    color: 'orange'
  },
];

const projects = [
  {
    id: 'PRJ-2024-001',
    name: 'Forest Watershed Restoration',
    location: 'Sierra Nevada, CA',
    budget: '$425,000',
    status: 'Active',
    progress: 65,
    contractor: 'EcoRestore Inc.',
    deadline: '2026-08-15',
    aiScore: 94
  },
  {
    id: 'PRJ-2024-002',
    name: 'Coastal Wetland Recovery',
    location: 'Chesapeake Bay, MD',
    budget: '$680,000',
    status: 'Planning',
    progress: 30,
    contractor: 'Pending',
    deadline: '2026-10-01',
    aiScore: 88
  },
  {
    id: 'PRJ-2024-003',
    name: 'Prairie Grassland Revitalization',
    location: 'Kansas Plains, KS',
    budget: '$310,000',
    status: 'Active',
    progress: 82,
    contractor: 'Prairie Solutions LLC',
    deadline: '2026-06-30',
    aiScore: 96
  },
  {
    id: 'PRJ-2024-004',
    name: 'Urban Creek Restoration',
    location: 'Portland, OR',
    budget: '$520,000',
    status: 'Review',
    progress: 15,
    contractor: 'Pending',
    deadline: '2026-09-20',
    aiScore: 91
  },
  {
    id: 'PRJ-2024-005',
    name: 'Desert Ecosystem Recovery',
    location: 'Mojave Desert, NV',
    budget: '$890,000',
    status: 'Active',
    progress: 45,
    contractor: 'Desert Restoration Group',
    deadline: '2027-03-15',
    aiScore: 89
  },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-1">Monitor active projects and key performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-slate-600 mb-2">{kpi.label}</p>
                <p className="text-3xl font-semibold text-slate-900">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-green-600" />
                  )}
                  <span className="text-sm font-medium text-green-600">{kpi.change}</span>
                  <span className="text-sm text-slate-500">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                kpi.color === 'blue' ? 'bg-blue-100' :
                kpi.color === 'green' ? 'bg-green-100' :
                kpi.color === 'purple' ? 'bg-purple-100' :
                'bg-orange-100'
              }`}>
                <kpi.icon className={`w-6 h-6 ${
                  kpi.color === 'blue' ? 'text-blue-600' :
                  kpi.color === 'green' ? 'text-green-600' :
                  kpi.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Active Projects</h2>
              <p className="text-sm text-slate-600 mt-1">Track and manage restoration projects</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Project ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Name & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Contractor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  AI Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900">{project.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{project.name}</p>
                      <p className="text-sm text-slate-500">{project.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-900">{project.budget}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-100 text-green-700' :
                      project.status === 'Planning' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 min-w-[3ch]">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      project.contractor === 'Pending' ? 'text-slate-400 italic' : 'text-slate-900'
                    }`}>
                      {project.contractor}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${
                        project.aiScore >= 90 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm font-medium text-slate-900">{project.aiScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
          <p className="text-sm text-blue-100 mb-4">Get intelligent contractor recommendations based on project requirements</p>
          <button className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm font-medium">
            View Recommendations
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">Contractor Database</h3>
          <p className="text-sm text-green-100 mb-4">Compare and evaluate qualified contractors for your projects</p>
          <button className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 text-sm font-medium">
            Compare Contractors
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">Submit New Project</h3>
          <p className="text-sm text-purple-100 mb-4">Start the intake process for a new restoration project</p>
          <button className="px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2 text-sm font-medium">
            Start Intake Form
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
