// src/components/admin/AdminTeamManager.tsx
import { useState, useEffect, useRef } from 'react';
import { 
  Users, Plus, Edit, Trash2, Search, Upload, X, Loader2, 
  CheckCircle2, ShieldCheck, Award, Star, UserCheck
} from 'lucide-react';
import type { MemberItem } from '@/data/teamData';
import { 
  getStoredTeamMembers, 
  saveStoredTeamMembers 
} from '@/data/teamData';

export default function AdminTeamManager() {
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');
  const [badge, setBadge] = useState('');
  const [bio, setBio] = useState('');
  const [achievementsText, setAchievementsText] = useState('');
  const [focusAreasText, setFocusAreasText] = useState('');
  
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMembers(getStoredTeamMembers());
  }, []);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setName('');
    setRole('');
    setPhoto('/images/team/rekha.jpg');
    setBadge('Leadership Team');
    setBio('');
    setAchievementsText('');
    setFocusAreasText('');
    setModalOpen(true);
  };

  const handleOpenEdit = (m: MemberItem) => {
    setEditingMember(m);
    setName(m.name);
    setRole(m.role);
    setPhoto(m.photo || '');
    setBadge(m.badge || '');
    setBio(m.bio || '');
    setAchievementsText(m.achievements ? m.achievements.join('\n') : '');
    setFocusAreasText(m.focusAreas ? m.focusAreas.join(', ') : '');
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !role.trim()) {
      alert('Please fill in Member Name and Role / Designation.');
      return;
    }

    const parsedAchievements = achievementsText
      .split('\n')
      .map(a => a.trim())
      .filter(Boolean);

    const parsedFocusAreas = focusAreasText
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    if (editingMember) {
      // Update existing
      const updatedList = members.map(m => {
        if (m.id === editingMember.id) {
          return {
            ...m,
            name: name.trim(),
            role: role.trim(),
            photo: photo.trim() || m.photo || '/images/team/rekha.jpg',
            badge: badge.trim() || 'Leadership Team',
            bio: bio.trim(),
            achievements: parsedAchievements.length > 0 ? parsedAchievements : m.achievements,
            focusAreas: parsedFocusAreas.length > 0 ? parsedFocusAreas : m.focusAreas,
            updatedAt: new Date().toLocaleDateString()
          };
        }
        return m;
      });

      setMembers(updatedList);
      saveStoredTeamMembers(updatedList);
      setSuccessMsg('Team member details updated successfully!');
    } else {
      // Add new member
      const newMember: MemberItem = {
        id: `mem-${Date.now()}`,
        name: name.trim(),
        role: role.trim(),
        photo: photo.trim() || '/images/team/rekha.jpg',
        badge: badge.trim() || 'Leadership Team',
        badgeColor: 'bg-red-100 text-red-700 border-red-300',
        bio: bio.trim() || 'Dedicated leadership team member committed to grassroots community transformation.',
        achievements: parsedAchievements.length > 0 ? parsedAchievements : ['Grassroots community outreach lead'],
        focusAreas: parsedFocusAreas.length > 0 ? parsedFocusAreas : ['Community Service', 'Social Welfare'],
        updatedAt: new Date().toLocaleDateString()
      };

      const updatedList = [newMember, ...members];
      setMembers(updatedList);
      saveStoredTeamMembers(updatedList);
      setSuccessMsg('New team member added and published live!');
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDeleteMember = (id: string) => {
    if (!confirm('Remove this team member from the website?')) return;
    const updatedList = members.filter(m => m.id !== id);
    setMembers(updatedList);
    saveStoredTeamMembers(updatedList);
    setSuccessMsg('Team member removed.');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const filteredMembers = members.filter(m => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query) ||
      (m.badge && m.badge.toLowerCase().includes(query)) ||
      (m.bio && m.bio.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6 py-2 font-sans select-none">
      
      {/* ─── Top Bar ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl font-extrabold text-[#263238] tracking-tight">
              Team Members & Leadership CMS Manager
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            Create, edit, or remove NGO team members and leadership board members live on the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold">
            {members.length} Active Members
          </span>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#263238] hover:bg-[#37474F] text-[#FFF314] font-bold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ─── Search Bar ─── */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team member by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FFF314]"
          />
        </div>
      </div>

      {/* ─── Team Members Grid ─── */}
      {filteredMembers.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 space-y-2">
          <Users className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="text-base font-bold text-[#263238]">No team members found</p>
          <p className="text-xs text-gray-400">Click "Add Team Member" above to create a new team member entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMembers.map((m) => (
            <div 
              key={m.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Profile Header & Photo */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-100/80 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
                    <img 
                      src={m.photo || '/images/team/rekha.jpg'} 
                      alt={m.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5 overflow-hidden">
                    {m.badge && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] font-bold text-gray-700 shadow-2xs">
                        {m.badge}
                      </span>
                    )}
                    <h3 className="font-extrabold text-base text-[#263238] truncate">
                      {m.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700 truncate">
                      {m.role}
                    </p>
                  </div>
                </div>

                {/* Body Bio & Focus Areas */}
                <div className="p-4 space-y-3 text-xs">
                  {m.bio && (
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {m.bio}
                    </p>
                  )}

                  {/* Focus Areas */}
                  {m.focusAreas && m.focusAreas.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {m.focusAreas.map((fa, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold border border-gray-200">
                          {fa}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-gray-400 font-mono">
                  ID: {m.id}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-[#263238] hover:text-[#FFF314] transition text-xs font-bold flex items-center gap-1"
                    title="Edit team member"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteMember(m.id)}
                    className="p-1.5 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition text-xs"
                    title="Remove member"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Add / Edit Modal Dialog ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div 
            className="bg-white text-[#263238] rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto z-50 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h2 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-500" />
                <span>{editingMember ? 'Edit Team Member Details' : 'Add New Team Member'}</span>
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              {/* Member Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rekha Thakkar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FFF314]"
                />
              </div>

              {/* Role / Designation */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Role / Designation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. President & Founder Trustee"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FFF314]"
                />
              </div>

              {/* Photo Upload & URL */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Profile Photo *
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="block w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#263238] file:text-[#FFF314] hover:file:bg-[#37474F]"
                  />
                  {uploading && <Loader2 className="w-5 h-5 animate-spin text-amber-500 flex-shrink-0" />}
                </div>
                <input
                  type="text"
                  placeholder="Or paste photo URL (e.g. /images/team/rekha.jpg)"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full mt-2 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />

                {photo && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-xl">
                    <img src={photo} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                    <span className="text-xs text-gray-500 font-mono truncate">{photo}</span>
                  </div>
                )}
              </div>

              {/* Badge / Department Tag */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Department / Badge Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Executive Governing Body, Operations & Strategy"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Bio / Profile Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Short bio or personal statement..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Achievements (1 per line) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Key Achievements (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Founded Prayas Social Welfare Society in 2001&#10;Spearheaded 50+ village adoption programs..."
                  value={achievementsText}
                  onChange={(e) => setAchievementsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Focus Areas (Comma separated) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Focus Areas / Specializations (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Women Livelihood, Rural Development, Child Welfare"
                  value={focusAreasText}
                  onChange={(e) => setFocusAreasText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#263238] hover:bg-[#37474F] text-[#FFF314] text-xs font-bold transition shadow-sm"
                >
                  {editingMember ? 'Save Changes Live' : 'Publish Member Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
