// src/data/volunteersData.ts

export interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  availability: string;
  skills: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  created_at: string;
}

export const DEFAULT_VOLUNTEERS: VolunteerApplication[] = [
  {
    id: 'vol-1',
    full_name: 'Ramesh Kumar',
    email: 'ramesh.kumar@example.com',
    phone: '+91 98260 12345',
    address: 'Indore, Madhya Pradesh',
    availability: 'Weekends (Sat & Sun)',
    skills: 'Teaching, Computer Training',
    message: 'I want to volunteer as a teacher for Sanskarshala evening classes.',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 'vol-2',
    full_name: 'Sunita Sharma',
    email: 'sunita.sharma@example.com',
    phone: '+91 98930 67890',
    address: 'Ujjain, Madhya Pradesh',
    availability: 'Full Time',
    skills: 'Medical Care, Nursing',
    message: 'Professional nurse willing to support free medical health camps.',
    status: 'pending',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'vol-3',
    full_name: 'Priya Verma',
    email: 'priya.verma@example.com',
    phone: '+91 97520 43210',
    address: 'Bhopal, Madhya Pradesh',
    availability: 'Flexible (10 hrs/week)',
    skills: 'Tailoring, Fashion Design',
    message: 'Interested in mentoring women at the vocational sewing centers.',
    status: 'approved',
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'vol-4',
    full_name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91 94250 87654',
    address: 'Dewas, Madhya Pradesh',
    availability: 'Sundays',
    skills: 'Tree Plantation, Soil Care',
    message: 'Excited to participate in Kargil Vatika reforestation sapling drives.',
    status: 'pending',
    created_at: new Date(Date.now() - 259200000).toISOString()
  }
];

const STORAGE_KEY = 'prayas_volunteers';

export const getStoredVolunteers = (): VolunteerApplication[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load volunteer applications from storage:', e);
  }

  // Initialize with defaults if empty
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VOLUNTEERS));
  } catch (e) {
    console.error('Failed to initialize volunteer storage:', e);
  }
  return DEFAULT_VOLUNTEERS;
};

export const saveStoredVolunteers = (newList: VolunteerApplication[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('prayas-volunteers-updated', { detail: newList }));
    window.dispatchEvent(new CustomEvent('prayas_volunteers_updated', { detail: newList }));
  } catch (e) {
    console.error('Failed to save volunteer applications to storage:', e);
  }
};

/**
 * Fetch latest volunteer applications from the local server endpoint (/api/volunteers),
 * which is shared universally across Incognito, Normal windows, and all browsers.
 */
export const fetchVolunteersFromServer = async (): Promise<VolunteerApplication[]> => {
  try {
    const res = await fetch('/api/volunteers', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveStoredVolunteers(data);
        return data;
      }
    }
  } catch (err) {
    console.warn('Local API fetch skipped, using storage fallback:', err);
  }
  return getStoredVolunteers();
};

export const addVolunteerApplication = async (
  application: Omit<VolunteerApplication, 'id' | 'status' | 'created_at'>
): Promise<VolunteerApplication> => {
  const currentList = getStoredVolunteers();
  const newApp: VolunteerApplication = {
    ...application,
    id: `vol-${Date.now()}`,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  // 1. Immediately save to localStorage and fire local events
  const updatedList = [newApp, ...currentList];
  saveStoredVolunteers(updatedList);

  // 2. Also persist to local server API so Incognito / other windows / devices receive it
  try {
    await fetch('/api/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
  } catch (err) {
    console.warn('Failed to sync new application with server API:', err);
  }

  return newApp;
};

export const updateVolunteerStatus = async (
  id: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<VolunteerApplication[]> => {
  const currentList = getStoredVolunteers();
  const updatedList = currentList.map((v) => (v.id === id ? { ...v, status } : v));
  saveStoredVolunteers(updatedList);

  // Sync with local server API
  try {
    await fetch('/api/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_status', id, status }),
    });
  } catch (err) {
    console.warn('Failed to sync status update with server API:', err);
  }

  return updatedList;
};
