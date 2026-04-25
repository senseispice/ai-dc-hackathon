import { Users, BadgeCheck, MapPin, Star, Filter, Building2, Calendar, DollarSign } from 'lucide-react';

const contractors = [
  {
    name: 'Great Basin Restoration',
    location: 'Reno, NV',
    rating: 4.9,
    projects: 23,
    specialties: ['Watershed', 'Forest', 'Desert'],
    certifications: ['ISO 14001', 'EPA Certified', 'OSHA'],
    score: 92,
    avgCost: '$645k',
    avgTimeline: '14 months',
    verified: true
  },
  {
    name: 'EcoRestore Partners',
    location: 'Sacramento, CA',
    rating: 4.7,
    projects: 18,
    specialties: ['Wetlands', 'Coastal', 'Urban'],
    certifications: ['ISO 14001', 'LEED'],
    score: 84,
    avgCost: '$620k',
    avgTimeline: '18 months',
    verified: true
  },
  {
    name: 'Prairie Solutions LLC',
    location: 'Kansas City, MO',
    rating: 4.6,
    projects: 31,
    specialties: ['Grassland', 'Prairie', 'Agriculture'],
    certifications: ['EPA Certified', 'OSHA'],
    score: 78,
    avgCost: '$590k',
    avgTimeline: '20 months',
    verified: false
  },
  {
    name: 'Watershed Experts Inc',
    location: 'Portland, OR',
    rating: 4.8,
    projects: 27,
    specialties: ['Watershed', 'Stream', 'Riparian'],
    certifications: ['ISO 14001', 'EPA Certified', 'OSHA', 'LEED'],
    score: 88,
    avgCost: '$680k',
    avgTimeline: '16 months',
    verified: true
  },
  {
    name: 'Desert Recovery Group',
    location: 'Phoenix, AZ',
    rating: 4.5,
    projects: 15,
    specialties: ['Desert', 'Arid', 'Erosion'],
    certifications: ['EPA Certified'],
    score: 81,
    avgCost: '$610k',
    avgTimeline: '17 months',
    verified: true
  },
  {
    name: 'Coastal Restoration Co',
    location: 'Charleston, SC',
    rating: 4.9,
    projects: 29,
    specialties: ['Coastal', 'Wetlands', 'Marine'],
    certifications: ['ISO 14001', 'EPA Certified', 'NOAA Partner'],
    score: 90,
    avgCost: '$720k',
    avgTimeline: '15 months',
    verified: true
  },
];

export function ContractorsPage() {
  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] tracking-tight text-[#0F172A] mb-2">Contractor Database</h1>
            <p className="text-[15px] text-[#64748B]">Compare and evaluate qualified restoration contractors</p>
          </div>
          <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#0F172A] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {contractors.map((contractor, index) => (
            <div key={index} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:border-[#166534]/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[16px] font-semibold text-[#0F172A]">{contractor.name}</h3>
                    {contractor.verified && (
                      <BadgeCheck className="w-4 h-4 text-[#166534]" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{contractor.location}</span>
                  </div>
                </div>
                <div className="text-center px-3 py-2 bg-[#F8FAFC] rounded-lg">
                  <div className="text-[13px] text-[#64748B] mb-1">Score</div>
                  <div className="text-[20px] font-semibold text-[#0F172A]">{contractor.score}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#FCD34D] fill-[#FCD34D]" />
                  <span className="text-[14px] font-medium text-[#0F172A]">{contractor.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{contractor.projects} projects</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[13px] text-[#64748B] mb-2">Specialties</div>
                <div className="flex flex-wrap gap-2">
                  {contractor.specialties.map((specialty, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#F8FAFC] text-[#0F172A] text-[12px] rounded-md">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[13px] text-[#64748B] mb-2">Certifications</div>
                <div className="flex flex-wrap gap-2">
                  {contractor.certifications.map((cert, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#DCFCE7] text-[#166534] text-[12px] rounded-md font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Avg Cost</span>
                  </div>
                  <div className="text-[14px] font-semibold text-[#0F172A]">{contractor.avgCost}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Timeline</span>
                  </div>
                  <div className="text-[14px] font-semibold text-[#0F172A]">{contractor.avgTimeline}</div>
                </div>
              </div>

              <button className="w-full px-4 py-2.5 bg-[#166534] text-white rounded-lg text-[14px] font-medium hover:bg-[#166534]/90 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
