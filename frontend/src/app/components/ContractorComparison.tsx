import { 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  DollarSign,
  Award,
  CheckCircle2,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const contractors = [
  {
    id: 1,
    name: 'EcoRestore Inc.',
    location: 'Sacramento, CA',
    rating: 4.8,
    reviews: 127,
    projectsCompleted: 45,
    yearsExperience: 12,
    specialties: ['Forest Restoration', 'Watershed Management', 'Native Species'],
    avgCost: '$425K',
    avgTimeline: '14 months',
    onTimeDelivery: 94,
    qualityScore: 96,
    complianceScore: 98,
    certifications: ['ISO 14001', 'EPA Certified', 'LEED', 'SFI Certified'],
    recentProjects: [
      { name: 'Forest Watershed Restoration', year: 2025, budget: '$425K', rating: 5 },
      { name: 'Sierra Reforestation', year: 2024, budget: '$380K', rating: 4.9 },
      { name: 'Oak Woodland Recovery', year: 2024, budget: '$290K', rating: 4.8 }
    ]
  },
  {
    id: 2,
    name: 'Coastal Ecosystems Inc.',
    location: 'Annapolis, MD',
    rating: 4.9,
    reviews: 93,
    projectsCompleted: 23,
    yearsExperience: 8,
    specialties: ['Wetland Restoration', 'Coastal Protection', 'Marine Habitats'],
    avgCost: '$645K',
    avgTimeline: '18 months',
    onTimeDelivery: 96,
    qualityScore: 97,
    complianceScore: 99,
    certifications: ['ISO 14001', 'EPA Certified', 'ACOE Approved'],
    recentProjects: [
      { name: 'Chesapeake Wetland Project', year: 2025, budget: '$680K', rating: 5 },
      { name: 'Coastal Marsh Restoration', year: 2024, budget: '$520K', rating: 4.9 },
    ]
  },
  {
    id: 3,
    name: 'Prairie Solutions LLC',
    location: 'Topeka, KS',
    rating: 4.7,
    reviews: 81,
    projectsCompleted: 38,
    yearsExperience: 10,
    specialties: ['Grassland Restoration', 'Prairie Ecosystems', 'Soil Conservation'],
    avgCost: '$310K',
    avgTimeline: '12 months',
    onTimeDelivery: 91,
    qualityScore: 93,
    complianceScore: 95,
    certifications: ['ISO 14001', 'NRCS Certified', 'SQI Certified'],
    recentProjects: [
      { name: 'Prairie Grassland Revitalization', year: 2025, budget: '$310K', rating: 4.8 },
      { name: 'Tallgrass Recovery Project', year: 2024, budget: '$275K', rating: 4.7 },
      { name: 'Native Prairie Restoration', year: 2024, budget: '$340K', rating: 4.6 }
    ]
  }
];

const performanceData = contractors.map(c => ({
  name: c.name.split(' ')[0],
  'On-Time': c.onTimeDelivery,
  'Quality': c.qualityScore,
  'Compliance': c.complianceScore,
}));

const radarData = [
  { metric: 'Experience', 'EcoRestore': 92, 'Coastal': 75, 'Prairie': 85 },
  { metric: 'Quality', 'EcoRestore': 96, 'Coastal': 97, 'Prairie': 93 },
  { metric: 'Cost', 'EcoRestore': 85, 'Coastal': 70, 'Prairie': 95 },
  { metric: 'Speed', 'EcoRestore': 88, 'Coastal': 82, 'Prairie': 92 },
  { metric: 'Compliance', 'EcoRestore': 98, 'Coastal': 99, 'Prairie': 95 },
];

export function ContractorComparison() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Contractor Comparison</h1>
        </div>
        <p className="text-slate-600">Compare qualified contractors across key performance metrics</p>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="On-Time" fill="#15803d" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Quality" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Compliance" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Overall Capabilities
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Radar name="EcoRestore" dataKey="EcoRestore" stroke="#15803d" fill="#15803d" fillOpacity={0.3} />
              <Radar name="Coastal" dataKey="Coastal" stroke="#0284c7" fill="#0284c7" fillOpacity={0.3} />
              <Radar name="Prairie" dataKey="Prairie" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contractor Cards */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Detailed Comparison</h2>
        
        {contractors.map((contractor) => (
          <div key={contractor.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{contractor.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {contractor.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {contractor.yearsExperience} years
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {contractor.projectsCompleted} projects
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-slate-900">{contractor.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({contractor.reviews} reviews)</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Request Quote
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-slate-600" />
                    <span className="text-xs text-slate-600">Avg. Cost</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">{contractor.avgCost}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span className="text-xs text-slate-600">Avg. Timeline</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">{contractor.avgTimeline}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-slate-600">On-Time</span>
                  </div>
                  <p className="text-lg font-semibold text-green-700">{contractor.onTimeDelivery}%</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-slate-600">Quality Score</span>
                  </div>
                  <p className="text-lg font-semibold text-blue-700">{contractor.qualityScore}%</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {contractor.specialties.map((specialty, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {contractor.certifications.map((cert, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Projects */}
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-3">Recent Projects</h4>
                <div className="space-y-3">
                  {contractor.recentProjects.map((project, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{project.name}</p>
                        <p className="text-sm text-slate-600">{project.year} • {project.budget}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-slate-900">{project.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
