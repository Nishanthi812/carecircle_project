import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ElderRegistration() {
  const {
    setActiveTab,
    setIsAuthenticated,
    isAuthenticated,
    elders,
    setElders,
    setCurrentElderId
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Female',
    phone: '',
    bloodGroup: 'O+',
    address: '',
    conditions: '',
    medications: '',
    allergies: '',
    notes: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: ''
  });

  const [previewElder, setPreviewElder] = useState(null);
  const [elderPhoto, setElderPhoto] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newElderId = elders.length + 1;
    const newElder = {
      id: newElderId,
      name: formData.name,
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      phone: formData.phone || '+91 94432 12345',
      bloodGroup: formData.bloodGroup,
      address: formData.address || '123 Maple St, Coimbatore, TN - 641001',
      conditions: formData.conditions ? formData.conditions.split(',').map(s => s.trim()) : ['Healthy'],
      medications: formData.medications ? formData.medications.split(',').map(s => s.trim()) : ['None'],
      allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : ['None'],
      notes: formData.notes || 'No specific notes.',
      emergencyContact: {
        name: formData.emergencyName || 'Nisha',
        relation: formData.emergencyRelation || 'Daughter',
        phone: formData.emergencyPhone || '+91 98765 43210'
      },
      image: elderPhoto || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtA7xPkinpGmi2qbG8S8pkYa7QQQE_2OJqEP3HieJutaqD_8OGb-t4Nf5pxgidWkB2nLTfcsmNsLkMEG9Hpl5VRMtioHz6q_8v7Rv1R-EXV2Fq1egitNPH8icSb2HfyU7jg-Ozodttj6h_XcpvnaXHpw7w4djn1S6BSKF93ytyI6aUR76vvqiw3ZHf2tyd9MMn0LTAl6wwW8t6zoyUgZu-53HoiSAao50itCZsJ7ncof6wP7uERkcWzRyWdS56DStj8I8YUFcfbIGc',
      activeCare: true
    };

    setPreviewElder(newElder);
  };

  const handleConfirmAndProceed = () => {
    if (!previewElder) return;

    // Add elder to global state
    setElders(prev => [...prev, previewElder]);
    setCurrentElderId(previewElder.id);

    // Auth state update
    if (!isAuthenticated) {
      setIsAuthenticated(true);
    }

    // Direct user to Dashboard or Elder Profile
    setActiveTab('dashboard');
    setPreviewElder(null);
  };

  return (
    <div className={`font-sans min-h-screen ${isAuthenticated ? '' : 'bg-surface py-12 px-4 flex flex-col justify-center'}`}>
      {!isAuthenticated && (
        <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center bg-white border-b border-outline-variant/20 shadow-xs z-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl font-fill">diversity_1</span>
            <h1 className="text-xl font-bold text-primary tracking-tight">CareCircle</h1>
          </div>
          <button
            onClick={() => setActiveTab('landing')}
            className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Cancel Onboarding
          </button>
        </header>
      )}

      <main className={`w-full ${isAuthenticated ? 'p-4 md:p-8' : 'w-full mt-12 px-4 md:px-8'}`}>
        {!previewElder ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-400">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight mb-2">Register a New Elder</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Please provide the necessary medical and personal details to create a personalized care plan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Personal Info Card */}
                <div className="md:col-span-7 bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/30">
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <span className="material-symbols-outlined">person</span>
                    <h4 className="font-bold text-base text-on-surface">Personal Info</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="name">Elder Name</label>
                      <input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="e.g. Margaret Sullivan"
                        required
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="age">Age</label>
                      <input
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="e.g. 78"
                        required
                        type="number"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="phone">Contact Number</label>
                      <input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="+91 00000 00000"
                        type="tel"
                      />
                    </div>
                    <div className="col-span-full space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="address">Address</label>
                      <input
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="e.g. 123 Maple St, Coimbatore"
                        type="text"
                      />
                    </div>
                    {/* Upload Elder Photo Section */}
                    <div className="col-span-full space-y-2 mt-2">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1">Upload Elder Photo</label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add('border-primary', 'bg-primary/5');
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-primary', 'bg-primary/5');
                          const file = e.dataTransfer.files[0];
                          if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setElderPhoto(reader.result);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            alert('Please drop an image file (PNG, JPG, or JPEG).');
                          }
                        }}
                        className="border-2 border-dashed border-outline-variant rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all relative overflow-hidden min-h-[120px]"
                      >
                        {elderPhoto ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary-fixed">
                              <img src={elderPhoto} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setElderPhoto(null);
                              }}
                              className="text-xs font-bold text-tertiary hover:underline cursor-pointer"
                            >
                              Remove Photo
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1 flex flex-col items-center justify-center p-2">
                            <span className="material-symbols-outlined text-4xl text-outline-variant">add_photo_alternate</span>
                            <div className="text-xs font-semibold text-on-surface-variant">
                              Drag and drop photo here, or <span className="text-primary font-bold">browse</span>
                            </div>
                            <div className="text-[10px] text-outline">Supports PNG, JPG, or JPEG</div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setElderPhoto(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Card */}
                <div className="md:col-span-5 bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/30">
                  <div className="flex items-center gap-2 mb-4 text-tertiary">
                    <span className="material-symbols-outlined font-fill">emergency</span>
                    <h4 className="font-bold text-base text-on-surface">Emergency Contact</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="emergencyName">Full Name</label>
                      <input
                        id="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Primary Contact Name"
                        required
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="emergencyRelation">Relationship</label>
                      <input
                        id="emergencyRelation"
                        value={formData.emergencyRelation}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="e.g. Son, Daughter"
                        required
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="emergencyPhone">Phone Number</label>
                      <input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Emergency Phone"
                        required
                        type="tel"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Info Card */}
                <div className="md:col-span-12 bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/30">
                  <div className="flex items-center gap-2 mb-4 text-secondary">
                    <span className="material-symbols-outlined">medical_information</span>
                    <h4 className="font-bold text-base text-on-surface">Medical Information</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="conditions">Diagnosed Disease</label>
                      <textarea
                        id="conditions"
                        value={formData.conditions}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none h-24 transition-all resize-none"
                        placeholder="Chronic conditions (comma separated)..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="medications">Medications</label>
                      <textarea
                        id="medications"
                        value={formData.medications}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none h-24 transition-all resize-none"
                        placeholder="Prescriptions (comma separated)..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="allergies">Allergies</label>
                      <textarea
                        id="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none h-24 transition-all resize-none"
                        placeholder="Food/drug allergies (comma separated)..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant ml-1" htmlFor="bloodGroup">Blood Group</label>
                      <select
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                      >
                        <option>O+</option><option>O-</option>
                        <option>A+</option><option>A-</option>
                        <option>B+</option><option>B-</option>
                        <option>AB+</option><option>AB-</option>
                        <option>Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-3 rounded-full text-base font-bold shadow-md hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Register Elder
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </form>
          </section>
        ) : (
          /* Profile Preview Section */
          <section className="bg-white p-6 md:p-8 rounded-[24px] card-shadow border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-400">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-3xl border-4 border-primary-fixed overflow-hidden bg-primary-container/10 flex items-center justify-center text-primary shrink-0">
                  {previewElder.image ? (
                    <img src={previewElder.image} alt={previewElder.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-[48px] text-primary">elderly</span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-on-surface">{previewElder.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {previewElder.age} yrs • {previewElder.gender}
                    </span>
                    <span className="bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm font-fill">verified</span>
                      Pending Activation
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPreviewElder(null)}
                className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider">Profile Info Summary</h4>
                <div className="space-y-2 text-sm bg-surface-container-low p-4 rounded-2xl">
                  <p><span className="font-semibold text-on-surface-variant">Phone:</span> {previewElder.phone}</p>
                  <p><span className="font-semibold text-on-surface-variant">Address:</span> {previewElder.address}</p>
                  <p><span className="font-semibold text-on-surface-variant">Blood Group:</span> <span className="font-bold text-primary">{previewElder.bloodGroup}</span></p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider">Emergency Contact Summary</h4>
                <div className="space-y-2 text-sm bg-surface-container-low p-4 rounded-2xl">
                  <p><span className="font-semibold text-on-surface-variant">Name:</span> {previewElder.emergencyContact.name}</p>
                  <p><span className="font-semibold text-on-surface-variant">Relation:</span> {previewElder.emergencyContact.relation}</p>
                  <p><span className="font-semibold text-on-surface-variant">Phone:</span> {previewElder.emergencyContact.phone}</p>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h4 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider">Medical Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="border border-outline-variant/30 p-3 rounded-xl bg-white">
                    <p className="font-bold text-secondary mb-1">Conditions</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {previewElder.conditions.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                  <div className="border border-outline-variant/30 p-3 rounded-xl bg-white">
                    <p className="font-bold text-primary mb-1">Medications</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {previewElder.medications.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                  <div className="border border-outline-variant/30 p-3 rounded-xl bg-white">
                    <p className="font-bold text-tertiary mb-1">Allergies</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {previewElder.allergies.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-outline-variant/20">
              <button
                onClick={() => setPreviewElder(null)}
                className="py-3 px-6 border border-outline text-on-surface-variant hover:bg-surface-container-high rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmAndProceed}
                className="bg-primary text-on-primary py-3 px-8 rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer"
              >
                Confirm & Proceed to Dashboard
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
