// src/components/admin/AdminProjectsManager.tsx
import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit, Trash2, CheckCircle2, Clock, Image as ImageIcon, 
  Upload, Search, Filter, FolderKanban, Sparkles, X, Loader2, Eye, Star
} from 'lucide-react';
import type { ProjectItem } from '@/data/projectsData';
import { 
  getStoredProjects, 
  saveStoredProjects 
} from '@/data/projectsData';

export default function AdminProjectsManager() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeStatusFilter, setActiveStatusFilter] = useState<'All' | 'Ongoing' | 'Completed'>('All');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectItem['category']>('Rural Development');
  const [status, setStatus] = useState<'Ongoing' | 'Completed'>('Ongoing');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [route, setRoute] = useState('');
  const [statsText, setStatsText] = useState('Active Sites: 10+, Beneficiaries: 5,000+');
  const [highlightsText, setHighlightsText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Rural Development');
    setStatus('Ongoing');
    setBadge('Active Drive');
    setDescription('');
    setLongDescription('');
    setImage('');
    setVideoUrl('');
    setIsFeatured(false);
    setRoute('');
    setStatsText('');
    setHighlightsText('');
    setModalOpen(true);
  };

  const handleOpenEdit = (proj: ProjectItem) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setStatus(proj.status || 'Ongoing');
    setBadge(proj.badge || '');
    setDescription(proj.description || '');
    setLongDescription(proj.longDescription || '');
    setImage(proj.image || '');
    setVideoUrl(proj.videoUrl || '');
    setIsFeatured(!!proj.isFeatured);
    setRoute(proj.route || '');
    
    if (proj.stats && proj.stats.length > 0) {
      setStatsText(proj.stats.map(s => `${s.label}: ${s.value}`).join(', '));
    } else {
      setStatsText('');
    }

    if (proj.highlights && proj.highlights.length > 0) {
      setHighlightsText(proj.highlights.join('\n'));
    } else {
      setHighlightsText('');
    }

    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a project title.');
      return;
    }

    // Parse stats from string "Label: Value, Label2: Value2"
    const parsedStats = statsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(part => {
        const [lbl, val] = part.split(':');
        return {
          label: lbl ? lbl.trim() : 'Impact',
          value: val ? val.trim() : part.trim()
        };
      });

    // Parse highlights from multi-line text
    const parsedHighlights = highlightsText
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const categorySlugMap: Record<ProjectItem['category'], ProjectItem['categorySlug']> = {
      'Rural Development': 'rural-development',
      'Women Empowerment & Livelihood': 'women-empowerment',
      'Education & Skill Development': 'education',
      'Health & Social Welfare': 'healthcare',
      'Environment & Sustainability': 'environment'
    };

    const targetCategorySlug = categorySlugMap[category] || 'rural-development';

    if (editingProject) {
      // Update existing
      const updatedList = projects.map(p => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: title.trim(),
            category,
            categorySlug: targetCategorySlug,
            status,
            badge: badge.trim() || (status === 'Ongoing' ? 'Running Project' : 'Completed Project'),
            description: description.trim(),
            longDescription: longDescription.trim() || description.trim(),
            image: image.trim() || p.image || '/CHILDRENGROUP.jpg',
            videoUrl: videoUrl.trim() || undefined,
            isFeatured,
            route: route.trim() || p.route || `/${targetCategorySlug}`,
            stats: parsedStats.length > 0 ? parsedStats : p.stats,
            highlights: parsedHighlights.length > 0 ? parsedHighlights : p.highlights,
            updatedAt: new Date().toLocaleDateString()
          };
        }
        return p;
      });

      setProjects(updatedList);
      saveStoredProjects(updatedList);
      setSuccessMsg('Project updated successfully!');
    } else {
      // Add new project
      const newProj: ProjectItem = {
        id: Date.now(),
        title: title.trim(),
        category,
        categorySlug: targetCategorySlug,
        status,
        badge: badge.trim() || (status === 'Ongoing' ? 'Running Project' : 'Completed Project'),
        description: description.trim(),
        longDescription: longDescription.trim() || description.trim(),
        image: image.trim() || '/CHILDRENGROUP.jpg',
        videoUrl: videoUrl.trim() || undefined,
        isFeatured,
        route: route.trim() || `/${targetCategorySlug}`,
        stats: parsedStats.length > 0 ? parsedStats : [{ label: 'Status', value: status }],
        highlights: parsedHighlights.length > 0 ? parsedHighlights : ['Active grassroots community initiative'],
        updatedAt: new Date().toLocaleDateString()
      };

      const updatedList = [newProj, ...projects];
      setProjects(updatedList);
      saveStoredProjects(updatedList);
      setSuccessMsg('New project added and published live!');
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDeleteProject = (id: string | number) => {
    if (!confirm('Are you sure you want to remove this project from the website?')) return;
    const updatedList = projects.filter(p => p.id !== id);
    setProjects(updatedList);
    saveStoredProjects(updatedList);
    setSuccessMsg('Project removed successfully.');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const ongoingCount = projects.filter(p => (p.status || 'Ongoing') === 'Ongoing').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;

  const categories = [
    'All',
    'Rural Development',
    'Women Empowerment & Livelihood',
    'Education & Skill Development',
    'Health & Social Welfare',
    'Environment & Sustainability'
  ];

  const filteredProjects = projects.filter(p => {
    // Status filter
    const matchesStatus = 
      activeStatusFilter === 'All' 
        ? true 
        : activeStatusFilter === 'Ongoing' 
        ? (p.status || 'Ongoing') === 'Ongoing' 
        : p.status === 'Completed';

    // Category filter
    const matchesCategory = 
      activeCategoryFilter === 'All' 
        ? true 
        : p.category === activeCategoryFilter;

    // Search query
    const matchesSearch = 
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 py-2 font-sans select-none">
      
      {/* ─── Top Stats & Actions Header ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl font-extrabold text-[#263238] tracking-tight">
              Projects & Initiatives CMS Manager
            </h1>
          </div>
          <p className="text-xs text-gray-500">
            Add, update, or remove website projects. Toggle project status between <span className="text-amber-600 font-bold">Ongoing</span> and <span className="text-emerald-600 font-bold">Completed</span> live.
          </p>
        </div>

        {/* Stats Pills & Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{ongoingCount} Ongoing</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completedCount} Completed</span>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#263238] hover:bg-[#37474F] text-[#FFF314] font-bold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer ml-1"
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ─── Search & Status Filters ─── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Status Toggle Tabs (All, Ongoing, Completed) */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveStatusFilter('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeStatusFilter === 'All' ? 'bg-white text-[#263238] shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveStatusFilter('Ongoing')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeStatusFilter === 'Ongoing' ? 'bg-amber-500 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Clock size={13} />
              <span>Ongoing ({ongoingCount})</span>
            </button>
            <button
              onClick={() => setActiveStatusFilter('Completed')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeStatusFilter === 'Completed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <CheckCircle2 size={13} />
              <span>Completed ({completedCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FFF314]"
            />
          </div>
        </div>

        {/* Sector Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Sector:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-[#263238] text-[#FFF314]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Projects Grid ─── */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 space-y-2">
          <FolderKanban className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="text-base font-bold text-[#263238]">No projects found</p>
          <p className="text-xs text-gray-400">Try adjusting your filters or click "Add New Project" above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => {
            const isOngoing = (proj.status || 'Ongoing') === 'Ongoing';
            return (
              <div 
                key={proj.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Preview & Status Badge */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <img 
                      src={proj.image || '/CHILDRENGROUP.jpg'} 
                      alt={proj.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Status Pill (Ongoing / Completed) */}
                    <div className="absolute top-3 left-3 flex items-center gap-1">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 ${
                        isOngoing
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {isOngoing ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                        <span>{isOngoing ? 'Ongoing' : 'Completed'}</span>
                      </span>
                    </div>

                    {proj.badge && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                        {proj.category}
                      </span>
                      {proj.isFeatured && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                          <Star size={12} className="fill-amber-400" /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-[#263238] line-clamp-1">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Stats Snippet */}
                    {proj.stats && proj.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px]">
                        {proj.stats.slice(0, 2).map((st, i) => (
                          <div key={i} className="bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                            <span className="text-gray-400 block text-[9px] uppercase font-bold">{st.label}</span>
                            <span className="font-extrabold text-[#263238]">{st.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gray-400 font-mono">
                    ID: #{String(proj.id).slice(-4)}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-[#263238] hover:text-[#FFF314] transition text-xs font-bold flex items-center gap-1"
                      title="Edit project details"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition text-xs"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Edit / Add Project Modal Dialog ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div 
            className="bg-white text-[#263238] rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto z-50 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h2 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-amber-500" />
                <span>{editingProject ? 'Edit Project Details' : 'Add New Project / Initiative'}</span>
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Sindoda Plastic Mukti Abhiyaan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FFF314]"
                />
              </div>

              {/* Status & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Status (Ongoing vs Completed) */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Project Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Ongoing' | 'Completed')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border focus:outline-none ${
                      status === 'Ongoing'
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    }`}
                  >
                    <option value="Ongoing">🟢 Ongoing Project</option>
                    <option value="Completed">✅ Completed Project</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Sector / Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectItem['category'])}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Rural Development">Rural Development</option>
                    <option value="Women Empowerment & Livelihood">Women Empowerment & Livelihood</option>
                    <option value="Education & Skill Development">Education & Skill Development</option>
                    <option value="Health & Social Welfare">Health & Social Welfare</option>
                    <option value="Environment & Sustainability">Environment & Sustainability</option>
                  </select>
                </div>
              </div>

              {/* Image / Video Upload & URL */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Project Image / Media *
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
                  placeholder="Or paste image URL (e.g. /TREEGROW.jpg or https://...)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full mt-2 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />

                {image && (
                  <div className="mt-2 aspect-video rounded-xl border border-gray-200 overflow-hidden max-h-40 bg-gray-100">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Badge & Target Route */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Badge / Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flagship Model, Reforestation"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Custom Route / Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /rural-development or /education"
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Short Summary / Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary displayed on project cards..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Detailed Long Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive description displayed on project detail modals..."
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Key Stats (Label: Value format) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Key Impact Stats (Format: Label: Value, Label2: Value2)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Beneficiaries: 5,000+, Villages: 12, Trees Planted: 10,000+"
                  value={statsText}
                  onChange={(e) => setStatsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Key Highlights (multi-line) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Key Bullet Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Door-to-door waste segregation education&#10;Establishment of composting units..."
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-400"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-gray-700 cursor-pointer">
                  Feature this project on landing page hero section
                </label>
              </div>

              {/* Submit Buttons */}
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
                  {editingProject ? 'Save Changes Live' : 'Publish Project Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
