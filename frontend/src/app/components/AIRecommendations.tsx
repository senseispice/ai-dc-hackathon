import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const recommendations = [
  {
    id: 1,
    projectId: 'PRJ-2024-002',
    projectName: 'Coastal Wetland Recovery',
    contractors: [
      {
        name: 'Coastal Ecosystems Inc.',
        score: 96,
        estimatedCost: '$645,000',
        timeline: '18 months',
        successRate: '94%',
        pastProjects: 23,
        strengths: ['Wetland expertise', 'Local presence', 'Strong track record'],
        concerns: ['Higher cost'],
        certifications: ['ISO 14001', 'EPA Certified']
      },
      {
        name: 'Marine Restoration Group',
        score: 92,
        estimatedCost: '$620,000',
        timeline: '20 months',
        successRate: '91%',
        pastProjects: 18,
        strengths: ['Cost-effective', 'Innovative methods'],
        concerns: ['Longer timeline'],
        certifications: ['ISO 14001']
      },
      {
        name: 'EcoCoast Solutions',
        score: 88,
        estimatedCost: '$680,000',
        timeline: '16 months',
        successRate: '89%',
        pastProjects: 15,
        strengths: ['Fast delivery', 'Advanced technology'],
        concerns: ['Premium pricing', 'Less experience'],
        certifications: ['ISO 14001', 'EPA Certified', 'LEED']
      }
    ],
    aiInsights: [
      'Coastal Ecosystems Inc. has completed 12 similar wetland projects in the region with 95% on-time delivery',
      'Project scope matches their core competencies in coastal restoration and native species reintroduction',
      'Recommended award timeline: 2 weeks to ensure optimal contractor availability'
    ]
  }
];

const insights = [
  {
    icon: TrendingUp,
    title: 'Market Trend',
    description: 'Coastal restoration costs have decreased 8% in Q1 2026 due to increased contractor availability',
    type: 'positive'
  },
  {
    icon: Clock,
    title: 'Timing Optimization',
    description: 'Starting this project in May 2026 aligns with optimal environmental conditions and contractor schedules',
    type: 'info'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'All recommended contractors have exceeded KPIs on 85%+ of similar government projects',
    type: 'positive'
  }
];

export function AIRecommendations() {
  const rec = recommendations[0];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">AI Recommendations</h1>
          </div>
          <p className="text-slate-600">Intelligent contractor matching powered by machine learning</p>
        </div>
        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Refine Criteria
        </button>
      </div>

      {/* Project Context */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{rec.projectName}</h2>
            <p className="text-sm text-slate-600 mt-1">Project ID: {rec.projectId}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Awaiting Contractor Selection
          </span>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                insight.type === 'positive' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <insight.icon className={`w-5 h-5 ${
                  insight.type === 'positive' ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-slate-900 mb-1">{insight.title}</h3>
                <p className="text-sm text-slate-600">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contractor Recommendations */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Top Contractor Matches</h2>
        
        {rec.contractors.map((contractor, index) => (
          <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{contractor.name}</h3>
                    {index === 0 && (
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Top Pick
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{contractor.pastProjects} completed projects</span>
                    <span>•</span>
                    <span>{contractor.successRate} success rate</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-semibold text-slate-900">{contractor.score}</span>
                    <span className="text-sm text-slate-600">/100</span>
                  </div>
                  <p className="text-xs text-slate-500">Match Score</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-slate-600" />
                    <span className="text-xs text-slate-600">Estimated Cost</span>
                  </div>
                  <p className="font-semibold text-slate-900">{contractor.estimatedCost}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <span className="text-xs text-slate-600">Timeline</span>
                  </div>
                  <p className="font-semibold text-slate-900">{contractor.timeline}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-slate-600" />
                    <span className="text-xs text-slate-600">Certifications</span>
                  </div>
                  <p className="font-semibold text-slate-900">{contractor.certifications.length}</p>
                </div>
              </div>

              {/* Strengths and Concerns */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {contractor.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    Considerations
                  </h4>
                  <ul className="space-y-1">
                    {contractor.concerns.map((concern, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-orange-600 mt-0.5">•</span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  Select Contractor
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  View Full Profile
                </button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-3">AI Analysis Summary</h3>
            <ul className="space-y-2">
              {rec.aiInsights.map((insight, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
