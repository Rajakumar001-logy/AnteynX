import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Radio,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Trash2,
  FileCode,
  Info,
  Clock
} from 'lucide-react';

interface FileItem {
  name: string;
  size: string;
  type: string;
}

export const QuotePage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    // Contact Info
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'United States',

    // Antenna Requirements
    application: 'UAV & Drones',
    operatingFreq: '5.8 GHz',
    requiredBandwidth: '300 MHz',
    desiredGain: '6.0 dBi',
    polarization: 'Linear',
    antennaType: 'Microstrip Patch',
    maxDimensions: '25 × 25 × 2 mm',
    groundPlaneDimensions: '40 × 40 mm',
    substrate: 'Rogers RO4003C (εr = 3.55)',
    connectorType: 'SMA Female',
    numberOfElements: '1 (Single Element)',
    mimoRequirement: 'No',
    powerHandling: '5 Watts',

    // Project Info
    quantity: '1 - 5 units (Design Phase)',
    prototypeRequired: 'Yes',
    simulationReportRequired: 'Yes',
    targetDeliveryDate: 'Within 2-3 Weeks',
    additionalNotes: ''
  });

  const [files, setFiles] = useState<FileItem[]>([
    { name: 'enclosure_geometry_v2.step', size: '4.2 MB', type: 'CAD Model' }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stepTab, setStepTab] = useState<number>(1);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const newFile: FileItem = {
        name: droppedFile.name,
        size: `${(droppedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        type: droppedFile.name.endsWith('.pdf') ? 'Requirement PDF' : 'CAD / PCB'
      };
      setFiles((prev) => [...prev, newFile]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const droppedFile = e.target.files[0];
      const newFile: FileItem = {
        name: droppedFile.name,
        size: `${(droppedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        type: droppedFile.name.endsWith('.pdf') ? 'Requirement PDF' : 'CAD / PCB'
      };
      setFiles((prev) => [...prev, newFile]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.operatingFreq) return;
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-rf-dark text-slate-100 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-10 bg-radial-gradient border-b border-rf-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full font-mono text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" />
            RF REQUIREMENT SPECIFICATION
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tell Us What You Need
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Fill out your technical requirements below. Our engineering team will perform an initial feasibility review and contact you with a simulation design proposal.
          </p>
        </div>
      </section>

      {/* FORM CONTAINER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          /* SUCCESS STATE */
          <div className="max-w-2xl mx-auto bg-rf-navy/90 border border-cyan-400 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl font-mono">
            <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border-2 border-cyan-400 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              RF Requirement Submitted
            </h2>

            <p className="text-cyan-300 font-bold text-sm font-sans">
              "Thank you. Our engineering team will review your requirement and contact you."
            </p>

            <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
              We have received your specifications for operating frequency <strong>{formData.operatingFreq}</strong> ({formData.antennaType}). An RF engineer has been assigned to conduct an initial HFSS feasibility sweep. Expect an email reply within 24-48 business hours.
            </p>

            <div className="p-4 bg-rf-dark rounded-xl border border-rf-border text-left text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Contact:</strong> {formData.name} ({formData.email})</div>
              <div><strong className="text-slate-200">Application:</strong> {formData.application}</div>
              <div><strong className="text-slate-200">Target Freq:</strong> {formData.operatingFreq}</div>
              <div><strong className="text-slate-200">Files Uploaded:</strong> {files.length} attachment(s)</div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setStepTab(1);
              }}
              className="px-6 py-3 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow hover:bg-cyan-300 transition"
            >
              Submit Another Requirement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form (8 Cols) */}
            <div className="lg:col-span-8 bg-rf-navy/90 border border-rf-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
              {/* Stepper Tabs */}
              <div className="flex items-center justify-between border-b border-rf-border pb-4 font-mono text-xs overflow-x-auto gap-2">
                {[
                  { num: 1, label: 'Contact Info' },
                  { num: 2, label: 'Antenna Specs' },
                  { num: 3, label: 'Project Specs' },
                  { num: 4, label: 'File Upload' }
                ].map((st) => (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setStepTab(st.num)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition shrink-0 ${
                      stepTab === st.num
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-rf-dark border border-rf-border flex items-center justify-center text-[10px]">
                      {st.num}
                    </span>
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* SECTION 1: CONTACT INFORMATION */}
                <div className={`space-y-4 ${stepTab !== 1 ? 'hidden sm:block' : ''}`}>
                  <h3 className="text-lg font-bold text-white border-b border-rf-border/80 pb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">1</span>
                    Contact & Organization Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Sarah Chen"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Robotics Inc. / MIT Lab"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2831"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 mb-1">Country</label>
                      <input
                        type="text"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: ANTENNA TECHNICAL REQUIREMENTS */}
                <div className={`space-y-4 ${stepTab !== 2 ? 'hidden sm:block' : ''}`}>
                  <h3 className="text-lg font-bold text-white border-b border-rf-border/80 pb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">2</span>
                    Antenna Technical Requirements
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-300 mb-1">Application Field</label>
                      <select
                        value={formData.application}
                        onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="UAV & Drones">UAV & Drones</option>
                        <option value="IoT & Embedded Systems">IoT & Embedded Systems</option>
                        <option value="Robotics">Robotics & Autonomous Systems</option>
                        <option value="Wireless Communication">Wireless Communication (Wi-Fi / 5G)</option>
                        <option value="Aerospace Systems">Aerospace Systems</option>
                        <option value="Defence & Tactical">Defence & Tactical Systems</option>
                        <option value="Research & University Labs">Research & University Labs</option>
                        <option value="RF Electronics Integration">RF Electronics Integration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Operating Frequency *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5.8 GHz or 2.4 - 2.5 GHz"
                        value={formData.operatingFreq}
                        onChange={(e) => setFormData({ ...formData, operatingFreq: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Required Bandwidth</label>
                      <input
                        type="text"
                        placeholder="e.g. 200 MHz (-10 dB S11)"
                        value={formData.requiredBandwidth}
                        onChange={(e) => setFormData({ ...formData, requiredBandwidth: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Desired Peak Gain</label>
                      <input
                        type="text"
                        placeholder="e.g. > 6 dBi Broadside"
                        value={formData.desiredGain}
                        onChange={(e) => setFormData({ ...formData, desiredGain: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Polarization</label>
                      <select
                        value={formData.polarization}
                        onChange={(e) => setFormData({ ...formData, polarization: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Linear">Linear (Horizontal / Vertical)</option>
                        <option value="Circular (RHCP)">Circular (RHCP - Right Hand)</option>
                        <option value="Circular (LHCP)">Circular (LHCP - Left Hand)</option>
                        <option value="Dual Polarized">Dual Polarized</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Antenna Type (If Known)</label>
                      <select
                        value={formData.antennaType}
                        onChange={(e) => setFormData({ ...formData, antennaType: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Microstrip Patch">Microstrip Patch</option>
                        <option value="Slot Antenna">Slot Antenna</option>
                        <option value="Monopole / Dipole">Monopole / Dipole</option>
                        <option value="Printed Inverted-F (PIFA)">Printed Inverted-F (PIFA)</option>
                        <option value="Wideband / Vivaldi">Wideband / Vivaldi</option>
                        <option value="MIMO Array">MIMO Array</option>
                        <option value="Phased Array Concept">Phased Array Concept</option>
                        <option value="Not Sure / Recommend Optimal">Not Sure - Recommend Optimal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Maximum Physical Dimensions</label>
                      <input
                        type="text"
                        placeholder="e.g. 30 × 30 × 3 mm"
                        value={formData.maxDimensions}
                        onChange={(e) => setFormData({ ...formData, maxDimensions: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Ground Plane Dimensions</label>
                      <input
                        type="text"
                        placeholder="e.g. 50 × 50 mm PCB"
                        value={formData.groundPlaneDimensions}
                        onChange={(e) => setFormData({ ...formData, groundPlaneDimensions: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Preferred Substrate (If Known)</label>
                      <input
                        type="text"
                        placeholder="e.g. Rogers RO4003C / FR4 / Taconic"
                        value={formData.substrate}
                        onChange={(e) => setFormData({ ...formData, substrate: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Connector / Feed Type</label>
                      <input
                        type="text"
                        placeholder="e.g. SMA Female, U.FL/IPEX, Inset Microstrip"
                        value={formData.connectorType}
                        onChange={(e) => setFormData({ ...formData, connectorType: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Number of Antenna Elements</label>
                      <input
                        type="text"
                        placeholder="1 (Single), 2, 4, or 16-element array"
                        value={formData.numberOfElements}
                        onChange={(e) => setFormData({ ...formData, numberOfElements: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Power Handling (Watts)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5W CW, 50W Peak"
                        value={formData.powerHandling}
                        onChange={(e) => setFormData({ ...formData, powerHandling: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: PROJECT INFORMATION */}
                <div className={`space-y-4 ${stepTab !== 3 ? 'hidden sm:block' : ''}`}>
                  <h3 className="text-lg font-bold text-white border-b border-rf-border/80 pb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">3</span>
                    Project Scope & Timeline
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-300 mb-1">Expected Design Quantity</label>
                      <input
                        type="text"
                        placeholder="e.g. 1 - 5 units (Design Phase)"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Full 3D Simulation Report Required?</label>
                      <select
                        value={formData.simulationReportRequired}
                        onChange={(e) => setFormData({ ...formData, simulationReportRequired: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Yes">Yes - Include Comprehensive PDF & S2P Files</option>
                        <option value="No">No - Standard CAD Package Only</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 mb-1">Target Delivery Date</label>
                      <input
                        type="text"
                        placeholder="e.g. Within 2-3 Weeks"
                        value={formData.targetDeliveryDate}
                        onChange={(e) => setFormData({ ...formData, targetDeliveryDate: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 mb-1">Additional Requirements / Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Describe enclosure materials (ABS plastic, aluminum chassis, carbon fiber), temperature limits, or specific performance goals..."
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        className="w-full bg-rf-dark border border-rf-border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: FILE UPLOAD UI */}
                <div className={`space-y-4 ${stepTab !== 4 ? 'hidden sm:block' : ''}`}>
                  <h3 className="text-lg font-bold text-white border-b border-rf-border/80 pb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">4</span>
                    Attach Engineering Files (PCB, STEP CAD, Requirement Specs)
                  </h3>

                  {/* Drag & Drop Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleFileDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center space-y-3 font-mono transition ${
                      dragActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-rf-border bg-rf-dark/60 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Drag & drop your files here or click to browse</p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Accepted: PCB (.brd, .kicad_pcb, Gerber), CAD (.step, .stp, .iges), Datasheets (.pdf, .doc), Images (.png, .jpg)
                      </p>
                    </div>
                    <label className="inline-block px-4 py-2 bg-rf-navy hover:bg-rf-border border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-bold cursor-pointer transition">
                      Browse Files
                      <input type="file" onChange={handleFileInput} className="hidden" />
                    </label>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="space-y-2 font-mono text-xs">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Attached Files:</span>
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-rf-dark border border-rf-border rounded-lg">
                          <div className="flex items-center gap-2.5">
                            <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                            <div>
                              <span className="text-white font-bold block">{file.name}</span>
                              <span className="text-[10px] text-slate-400">{file.type} • {file.size}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="p-1.5 text-slate-400 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-rf-border flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    Confidentiality Guaranteed (NDA Supported)
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-500/25 transition flex items-center gap-2"
                  >
                    <span>Submit RF Requirement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Live Spec Summary Side-Panel (4 Cols) */}
            <div className="lg:col-span-4 bg-rf-navy/90 border border-rf-border rounded-2xl p-6 space-y-5 shadow-2xl font-mono text-xs sticky top-28">
              <div className="flex items-center justify-between border-b border-rf-border pb-3">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  Live Requirement Summary
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>

              <div className="space-y-3 text-slate-300">
                <div className="p-2.5 bg-rf-dark rounded-lg border border-rf-border/80">
                  <span className="text-[10px] text-slate-500 block">APPLICATION</span>
                  <strong className="text-cyan-300">{formData.application}</strong>
                </div>

                <div className="p-2.5 bg-rf-dark rounded-lg border border-rf-border/80">
                  <span className="text-[10px] text-slate-500 block">TARGET OPERATING FREQUENCY</span>
                  <strong className="text-cyan-300 text-sm font-bold">{formData.operatingFreq || 'Not Specified'}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-rf-dark rounded-lg border border-rf-border/80">
                    <span className="text-[10px] text-slate-500 block">TARGET GAIN</span>
                    <strong className="text-slate-200">{formData.desiredGain}</strong>
                  </div>
                  <div className="p-2 bg-rf-dark rounded-lg border border-rf-border/80">
                    <span className="text-[10px] text-slate-500 block">POLARIZATION</span>
                    <strong className="text-slate-200">{formData.polarization}</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-rf-dark rounded-lg border border-rf-border/80">
                  <span className="text-[10px] text-slate-500 block">ANTENNA TYPE</span>
                  <strong className="text-slate-200">{formData.antennaType}</strong>
                </div>

                <div className="p-2.5 bg-rf-dark rounded-lg border border-rf-border/80">
                  <span className="text-[10px] text-slate-500 block">MAX SIZE CONSTRAINT</span>
                  <strong className="text-slate-200">{formData.maxDimensions}</strong>
                </div>

                <div className="p-2.5 bg-rf-dark rounded-lg border border-rf-border/80">
                  <span className="text-[10px] text-slate-500 block">PREFERRED SUBSTRATE</span>
                  <strong className="text-slate-200">{formData.substrate}</strong>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl space-y-1.5 font-sans text-slate-300 text-[11px]">
                <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>SLA Response Commitment</span>
                </div>
                <p className="leading-relaxed">
                  Our engineering team reviews submitted specifications and provides a design feasibility summary within 24-48 business hours.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
