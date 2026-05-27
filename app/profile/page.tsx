'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

interface Certificate {
  id?: string;
  file_url?: string;
  file_name: string;
  certificate_type: string;
  status: 'pending' | 'under_review' | 'verified' | 'rejected';
  previewUrl?: string;
  verification_data?: {
    certificate_number?: string;
    expiry_date?: string;
    holder_name?: string;
    extracted_text?: string;
  };
}

export default function ProfilePage() {
  const supabase = createClient();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certUploading, setCertUploading] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [position, setPosition] = useState('');
  const [languages, setLanguages] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;

    setAvatarUploading(true);
    try {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // TODO: Save publicUrl to profiles.avatar_url
      alert(`Avatar uploaded successfully! URL: ${publicUrl}`);
    } catch (error: any) {
      alert('Avatar upload failed: ' + error.message);
    } finally {
      setAvatarUploading(false);
    }
  };


  const handleSaveProfile = async () => {
    // TODO: Save all profile fields to Supabase profiles table
    alert('Profile saved! (Connect to Supabase profiles table in production)');
  };

  const calculateCompletion = () => {
    let score = 0;
    if (avatarPreview) score += 15;
    if (fullName.trim()) score += 10;
    if (nationality.trim()) score += 10;
    if (phone.trim()) score += 10;
    if (location.trim()) score += 10;
    if (experienceYears) score += 10;
    if (position.trim()) score += 10;
    if (bio.trim().length > 30) score += 15;
    if (certificates.length > 0) score += 10;
    return Math.min(100, score);
  };

  const removeCertificate = (index: number) => {
    const newCerts = [...certificates];
    // Revoke object URL to prevent memory leaks
    if (newCerts[index].previewUrl) {
      URL.revokeObjectURL(newCerts[index].previewUrl);
    }
    newCerts.splice(index, 1);
    setCertificates(newCerts);
  };

  const handleMultipleCertificateUpload = async (files: FileList) => {
    setCertUploading(true);

    const newCertificates: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Basic validation
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert(`Skipping ${file.name}: Only PDF, JPG, PNG allowed.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`Skipping ${file.name}: File too large (max 5MB).`);
        continue;
      }

      // Create preview URL
      let previewUrl = '';
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      const certType = prompt(`Certificate type for ${file.name}? (e.g. STCW, ENG1, Passport)`) || 'Other';

      const newCert = {
        file_url: '', // would be populated after real upload
        file_name: file.name,
        certificate_type: certType,
        status: 'under_review' as const,
        previewUrl,
        verification_data: undefined,
      };

      newCertificates.push(newCert);
    }

    if (newCertificates.length > 0) {
      setCertificates(prev => [...prev, ...newCertificates]);

      // Simulate async verification for each new cert
      newCertificates.forEach((_, idx) => {
        setTimeout(() => {
          setCertificates(prev =>
            prev.map((c, i) => {
              if (i === prev.length - newCertificates.length + idx) {
                return {
                  ...c,
                  status: 'verified' as const,
                  verification_data: {
                    certificate_number: `CERT-${Math.floor(Math.random() * 900000) + 100000}`,
                    expiry_date: '2027-06-15',
                    holder_name: fullName || 'Verified Holder',
                    extracted_text: `Extracted via AI: ${c.certificate_type}`,
                  },
                };
              }
              return c;
            })
          );
        }, 2200 + idx * 400);
      });
    }

    setCertUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-5xl tracking-tighter font-semibold mb-10">Your Profile</h1>

      {/* Avatar Section with Upload */}
      <div className="card p-8 rounded-3xl mb-8">
        <h2 className="text-2xl font-semibold mb-6">Profile Photo</h2>
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-[var(--navy-elevated)] border border-[var(--border-subtle)] overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">No photo</div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[var(--gold)] file:text-[var(--navy-dark)]"
            />
            <Button
              variant="gold"
              size="sm"
              className="mt-3"
              onClick={uploadAvatar}
              disabled={!avatarFile || avatarUploading}
            >
              {avatarUploading ? 'Uploading...' : 'Upload Avatar'}
            </Button>
            <p className="text-xs text-[var(--text-muted)] mt-2">JPG or PNG, max 5MB. Recommended 400x400px.</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="card p-8 rounded-3xl mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <div className="text-right">
            <div className="text-xs text-[var(--text-muted)] mb-1">Profile Completion</div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-[var(--navy)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div 
                  className="h-full bg-[var(--gold)] transition-all duration-300" 
                  style={{ width: `${calculateCompletion()}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-[var(--gold)]">{calculateCompletion()}%</span>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-sm mb-2">Nationality</label>
            <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="e.g. British" />
          </div>
          <div>
            <label className="block text-sm mb-2">Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="+44 7700 900123" />
          </div>
          <div>
            <label className="block text-sm mb-2">Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="London, UK" />
          </div>
          <div>
            <label className="block text-sm mb-2">Years of Experience</label>
            <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="8" />
          </div>
          <div>
            <label className="block text-sm mb-2">Current/Desired Position</label>
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="Chief Stewardess" />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm mb-2">Languages</label>
          <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} className="input-luxury w-full px-5 py-3 rounded-2xl" placeholder="English, French, Spanish" />
        </div>
        <div className="mt-6">
          <label className="block text-sm mb-2">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="input-luxury w-full px-5 py-4 rounded-3xl h-28" placeholder="Tell us about your experience at sea..." />
        </div>
      </div>

      {/* Certificates Section - Multiple Uploads with Preview */}
      <div className="card p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Certificates & Documents</h2>
          <label 
            className="cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files.length > 0) {
                handleMultipleCertificateUpload(e.dataTransfer.files);
              }
            }}
          >
            <span className="btn-gold px-5 py-2 text-sm rounded-full inline-block">
              + Upload Certificates
            </span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleMultipleCertificateUpload(e.target.files);
                }
              }}
              disabled={certUploading}
            />
          </label>
        </div>

        <p className="text-xs text-[var(--text-muted)] mb-4">
          Drag & drop or click to upload multiple files (PDF, JPG, PNG). STCW, ENG1, Passport, etc.
        </p>

        {certificates.length > 0 ? (
          <div className="space-y-3">
            {certificates.map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 bg-[var(--navy)] rounded-2xl border border-[var(--border-subtle)]"
              >
                {/* Preview */}
                <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--navy-dark)] flex items-center justify-center">
                  {cert.previewUrl ? (
                    <img 
                      src={cert.previewUrl} 
                      alt={cert.file_name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-xl">📄</div>
                      <div className="text-[10px] text-[var(--text-muted)]">PDF</div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cert.certificate_type}
                      onChange={(e) => {
                        const newCerts = [...certificates];
                        newCerts[index].certificate_type = e.target.value;
                        setCertificates(newCerts);
                      }}
                      className="font-medium bg-transparent border-b border-transparent focus:border-[var(--gold)] focus:outline-none text-white w-full max-w-[220px]"
                    />
                    <span className="text-xs text-[var(--text-muted)] truncate">{cert.file_name}</span>
                  </div>

                  {cert.verification_data && (
                    <div className="text-xs text-[var(--text-muted)] mt-1">
                      {cert.verification_data.certificate_number} • Expires: {cert.verification_data.expiry_date}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {cert.status === 'verified' && (
                    <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">Verified ✓</span>
                  )}
                  {cert.status === 'under_review' && (
                    <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">Processing...</span>
                  )}
                  {cert.status === 'pending' && (
                    <span className="px-3 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-full">Pending</span>
                  )}
                  {cert.status === 'rejected' && (
                    <span className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">Rejected</span>
                  )}

                  <button 
                    onClick={() => removeCertificate(index)}
                    className="text-red-400 hover:text-red-500 text-lg leading-none ml-1"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[var(--border-subtle)] rounded-2xl p-8 text-center text-[var(--text-muted)]">
            No certificates uploaded yet.<br />
            Upload your STCW, ENG1, Passport, Yachtmaster, etc.
          </div>
        )}

        {certUploading && (
          <div className="mt-4 text-sm text-[var(--text-muted)] flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-[var(--gold)] border-t-transparent rounded-full"></div>
            Processing certificates (simulated OCR & verification)...
          </div>
        )}

        <p className="text-xs text-[var(--text-muted)] mt-6">
          Multiple files supported. Basic validation + simulated AI extraction. Full OCR & real verification coming soon.
        </p>
      </div>

      <div className="mt-10 flex justify-end">
        <Button variant="gold" size="lg" onClick={handleSaveProfile}>Save Profile</Button>
      </div>
    </div>
  );
}
