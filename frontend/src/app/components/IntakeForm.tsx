import { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  DollarSign, 
  Calendar,
  Upload,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Project Details', icon: FileText },
    { number: 2, title: 'Location & Scope', icon: MapPin },
    { number: 3, title: 'Budget & Timeline', icon: DollarSign },
    { number: 4, title: 'Documents & Review', icon: Upload },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">New Project Intake Form</h1>
        <p className="text-slate-600">Submit a new land restoration project for procurement</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep >= step.number
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-colors ${
                  currentStep > step.number ? 'bg-green-600' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        {/* Step 1: Project Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Project Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Forest Watershed Restoration"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Project Type *
                </label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select project type...</option>
                  <option>Forest Restoration</option>
                  <option>Wetland Restoration</option>
                  <option>Grassland/Prairie Restoration</option>
                  <option>Coastal Restoration</option>
                  <option>Watershed Management</option>
                  <option>Desert Ecosystem Recovery</option>
                  <option>Urban Green Space</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Project Description *
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe the restoration project goals, environmental conditions, and expected outcomes..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Priority Level *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="px-4 py-3 border-2 border-green-600 bg-green-50 text-green-700 rounded-lg font-medium">
                    High Priority
                  </button>
                  <button className="px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                    Medium Priority
                  </button>
                  <button className="px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">
                    Low Priority
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location & Scope */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Location & Scope</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    State *
                  </label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Select state...</option>
                    <option>California</option>
                    <option>Maryland</option>
                    <option>Kansas</option>
                    <option>Oregon</option>
                    <option>Nevada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    County *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter county name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Project Address/Location *
                </label>
                <input
                  type="text"
                  placeholder="Enter specific location or coordinates"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Total Acreage *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Restoration Acreage *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Environmental Conditions
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-slate-700">Endangered species present</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-slate-700">Wetland area</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-slate-700">Water body adjacent</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-slate-700">Protected tribal lands</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Budget & Timeline */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Budget & Timeline</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Estimated Budget *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">AI Budget Estimate</h4>
                    <p className="text-sm text-blue-800">
                      Based on similar forest restoration projects in California, the typical budget range is <strong>$380,000 - $470,000</strong>. 
                      Your estimate appears reasonable for the scope described.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Desired Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Target Completion Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Funding Source *
                </label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select funding source...</option>
                  <option>Federal Grant</option>
                  <option>State Grant</option>
                  <option>County/Local Budget</option>
                  <option>Public-Private Partnership</option>
                  <option>Non-Profit Organization</option>
                  <option>Multiple Sources</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Required Contractor Certifications
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" defaultChecked />
                    <span className="text-sm text-slate-700">EPA Certified</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" defaultChecked />
                    <span className="text-sm text-slate-700">ISO 14001 Environmental Management</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-slate-700">LEED Accredited</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                    <span className="text-sm text-slate-700">SFI Certified</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents & Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Documents & Review</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Upload Supporting Documents
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-700 font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-500">
                    Environmental assessments, site maps, permits (PDF, DOC, up to 50MB)
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">environmental-assessment.pdf</p>
                      <p className="text-xs text-slate-500">2.4 MB</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Review Your Submission
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-800">Project Name:</span>
                    <span className="font-medium text-green-900">Forest Watershed Restoration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Location:</span>
                    <span className="font-medium text-green-900">Sierra Nevada, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Budget:</span>
                    <span className="font-medium text-green-900">$425,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Timeline:</span>
                    <span className="font-medium text-green-900">May 2026 - August 2027</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Your submission will be reviewed within 2-3 business days</li>
                      <li>AI analysis will match you with qualified contractors</li>
                      <li>You'll receive contractor recommendations via email</li>
                      <li>Project will enter the procurement workflow</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Submit Project
          </button>
        )}
      </div>
    </div>
  );
}
