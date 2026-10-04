// src/data/contactsData.ts

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | string;
  created_at: string;
}

export const DEFAULT_CONTACTS: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 98260 11223',
    subject: 'Inquiry regarding Village Adoption in MP',
    message: 'Hello Prayas Team, we are interested in sponsoring solar lighting for a village near Indore. Please send us CSR proposal details.',
    status: 'unread',
    created_at: new Date().toISOString()
  },
  {
    id: 'msg-2',
    name: 'Dr. Meenakshi Joshi',
    email: 'meenakshi.j@example.com',
    phone: '+91 98930 44556',
    subject: 'Volunteering for Free Eye Surgery Camps',
    message: 'Greetings! I am an ophthalmologist. I would love to join your upcoming health camp in Dhar district.',
    status: 'read',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'msg-3',
    name: 'Kavita Chawla',
    email: 'kavita.c@example.com',
    phone: '+91 97520 77889',
    subject: 'Donation of Computer Systems for Digital Labs',
    message: 'We have 15 refurbished desktop PCs ready for donation to your Sanskarshala digital literacy centers.',
    status: 'replied',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

const STORAGE_KEY = 'prayas_contact_messages';

export const getStoredContacts = (): ContactMessage[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load contact messages from storage:', e);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTACTS));
  } catch (e) {
    console.error('Failed to initialize contact messages storage:', e);
  }
  return DEFAULT_CONTACTS;
};

export const saveStoredContacts = (newList: ContactMessage[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('prayas-contacts-updated', { detail: newList }));
    window.dispatchEvent(new CustomEvent('prayas_contacts_updated', { detail: newList }));
  } catch (e) {
    console.error('Failed to save contact messages to storage:', e);
  }
};

export const fetchContactsFromServer = async (): Promise<ContactMessage[]> => {
  try {
    const res = await fetch('/api/contacts', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveStoredContacts(data);
        return data;
      }
    }
  } catch (err) {
    console.warn('Local contacts API fetch skipped:', err);
  }
  return getStoredContacts();
};

export const addContactMessage = async (
  contact: Omit<ContactMessage, 'id' | 'status' | 'created_at'>
): Promise<ContactMessage> => {
  const currentList = getStoredContacts();
  const newMsg: ContactMessage = {
    ...contact,
    id: `msg-${Date.now()}`,
    status: 'unread',
    created_at: new Date().toISOString()
  };

  const updatedList = [newMsg, ...currentList];
  saveStoredContacts(updatedList);

  try {
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
  } catch (err) {
    console.warn('Failed to sync new contact message with server API:', err);
  }

  return newMsg;
};

export const updateContactStatus = async (
  id: string,
  status: 'unread' | 'read' | 'replied'
): Promise<ContactMessage[]> => {
  const currentList = getStoredContacts();
  const updatedList = currentList.map((m) => (m.id === id ? { ...m, status } : m));
  saveStoredContacts(updatedList);

  try {
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_status', id, status }),
    });
  } catch (err) {
    console.warn('Failed to sync contact status update with server API:', err);
  }

  return updatedList;
};

export const deleteStoredContact = async (id: string): Promise<ContactMessage[]> => {
  const currentList = getStoredContacts();
  const updatedList = currentList.filter((m) => m.id !== id);
  saveStoredContacts(updatedList);

  try {
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id }),
    });
  } catch (err) {
    console.warn('Failed to sync contact delete with server API:', err);
  }

  return updatedList;
};
