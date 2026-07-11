'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { 
  Database, Plus, Trash2, Save, ArrowLeft, RefreshCw, 
  CheckCircle, AlertCircle, User, Calendar, Briefcase, 
  Users, Code, Terminal, Award, BookOpen, Sparkles, Link as LinkIcon, Image as ImageIcon, ArrowUp, ArrowDown,
  MapPin, Globe, Star, Check, Undo, Redo, Search, Sun, Moon, Settings, BarChart2, Eye, EyeOff,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Download, Upload, Mail
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import PreviewSections from '@/components/PreviewSections';
import ConfirmDialog from '@/components/ConfirmDialog';

interface PortfolioData {
  personal: {
    name: string;
    title: string;
    taglines: string[];
    heroMedia?: {
      profilePhoto: string;
      hoverPhoto: string;
      backgroundCover: string;
      resumePdf: string;
      profileShape: string;
      glowColor: string;
      effects: {
        floating: boolean;
        parallax: boolean;
        hoverRotate: boolean;
        neonBorder: boolean;
        spotlight: boolean;
      };
    };
    ctas?: Array<{
      id: string;
      label: string;
      url: string;
      variant: string;
    }>;
    about: {
      college: string;
      department: string;
      cgpa: string;
      corePassions: string;
      interests: string;
      location: string;
      facts?: {
        languages: string[];
        availability: {
          internship: boolean;
          fullTime: boolean;
          remote: boolean;
          relocation: boolean;
        };
        timezone: string;
        yearsCoding: string;
        openToOpportunities: boolean;
      };
      nowSection?: {
        title: string;
        focus: string[];
      };
    };
    socials: {
      github: string;
      linkedin: string;
      email: string;
      whatsapp?: string;
      calendly?: string;
      twitter?: string;
      instagram?: string;
      resume: string;
      resumeLabel?: string;
    };
    stats: {
      certifications: number;
      projects: number;
      internships: number;
      leadership: number;
      impact: number;
    };
  };
  timeline: Array<{
    id: string;
    year: string;
    month?: string;
    organization?: string;
    title: string;
    description: string;
    type?: string;
    image?: string;
    proof?: string;
    link?: string;
    status?: string;
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
    logo: string;
    highlights: string[];
    fromMonth?: string;
    fromYear?: string;
    toMonth?: string;
    toYear?: string;
    currentlyWorking?: boolean;
    category?: string;
    featured?: boolean;
    tech?: string[];
    metrics?: {
      projects?: number;
      reached?: number;
      teamSize?: number;
      apisBuilt?: number;
      eventsConducted?: number;
    };
    gallery?: string[];
    links?: {
      github?: string;
      linkedin?: string;
      certificate?: string;
      project?: string;
      blog?: string;
    };
    status?: string;
    aiSummary?: string;
    locationType?: string;
    location?: string;
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  leadership: Array<{
    id: string;
    role: string;
    organization: string;
    period: string;
    description: string;
    fromMonth?: string;
    fromYear?: string;
    toMonth?: string;
    toYear?: string;
    currentlyActive?: boolean;
    logo?: string;
    category?: string;
    featured?: boolean;
    tagline?: string;
    metrics?: {
      eventsConducted?: number;
      studentsReached?: number;
      volunteersCount?: number;
      sponsorsClosed?: number;
    };
    gallery?: string[];
    links?: {
      github?: string;
      linkedin?: string;
      certificate?: string;
      project?: string;
      blog?: string;
    };
    status?: string;
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    github: string;
    live: string;
    category: string;
    thumbnail?: string;
    video?: string;
    screenshots?: string[];
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    teamSize?: number;
    duration?: string;
    featured?: boolean;
    story?: {
      problem?: string;
      solution?: string;
      architecture?: string;
      challenges?: string;
      impact?: string;
      learning?: string;
    };
    status?: 'Live' | 'Completed' | 'Archived' | 'Ongoing' | string;
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  skills: {
    backend: Array<{ name: string; level: number; years: number }>;
    cloud: Array<{ name: string; level: number; years: number }>;
    ai: Array<{ name: string; level: number; years: number }>;
    tools: Array<{ name: string; level: number; years: number }>;
    leadership: Array<{ name: string; level: number; years: number }>;
  };
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    icon: string;
    verificationProof?: string;
    certImage?: string;
    verificationUrl?: string;
    credentialId?: string;
    expiryDate?: string;
    skillsEarned?: string[];
    status?: string;
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    organization: string;
    date: string;
    rank: string;
    description: string;
    badgeImage?: string;
    achievementPhoto?: string;
    certificateUpload?: string;
    galleryUpload?: string[];
    linkedinLink?: string;
    type: string;
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  updates: Array<{
    id: string;
    date: string;
    category: string;
    content: string;
    images?: string[];
    linkedinUrl?: string;
    taggedPeople?: string[];
    status?: string;
    scheduledAt?: string | null;
    publishedAt?: string | null;
    publishStatus?: string;
  }>;
  blogs: Array<{
    id: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    readTime: string;
    coverImage?: string;
    body?: string;
    linkedinUrl?: string;
    gallery?: string[];
    status?: string;
    scheduledAt?: string | null;
    publishedAt?: string | null;
    publishStatus?: string;
  }>;
  media: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    image: string;
    featured: boolean;
    tags: string[];
    publishStatus?: string;
    publishedAt?: string | null;
    scheduledAt?: string | null;
  }>;
  settings?: {
    visibility?: {
      about?: boolean;
      timeline?: boolean;
      experience?: boolean;
      leadership?: boolean;
      projects?: boolean;
      skills?: boolean;
      credentials?: boolean;
      achievements?: boolean;
      updates?: boolean;
      gallery?: boolean;
    };
    seo?: {
      title?: string;
      description?: string;
      keywords?: string;
      googleAnalyticsId?: string;
    };
    theme?: {
      mode?: 'dark' | 'light';
      accentColor?: 'purple' | 'blue' | 'emerald' | 'pink' | string;
    };
    maintenanceMode?: boolean;
    emailjs?: {
      serviceId?: string;
      templateId?: string;
      publicKey?: string;
    };
  };
  analytics?: {
    visitors?: number;
    resumeDownloads?: number;
    linkClicks?: number;
    countries?: Array<{ code: string; name: string; count: number }>;
    clicks?: Record<string, number>;
    projectViews?: Record<string, number>;
  };
}

type TabType = 'identity' | 'timeline' | 'experience' | 'leadership' | 'projects' | 'skills' | 'credentials' | 'achievements' | 'journal' | 'media' | 'analytics' | 'settings';

export default function WorkspacePage() {
  const router = useRouter();
  const [data, _setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('identity');

  // --- Portfolio & Global CMS Improvements States ---
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved' | 'failed' | 'unauthorized' | 'offline'>('saved');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  // Undo/Redo Stacks
  const [undoStack, setUndoStack] = useState<PortfolioData[]>([]);
  const [redoStack, setRedoStack] = useState<PortfolioData[]>([]);
  
  // Live Preview Toggle
  const [livePreview, setLivePreview] = useState(false);
  
  // Global Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    timeline: any[];
    experience: any[];
    leadership: any[];
    projects: any[];
    credentials: any[];
    achievements: any[];
    journal: any[];
    media: any[];
  } | null>(null);
  
  // Enforce dark mode layout

  // Recovery States
  const [hasRecoverableDraft, setHasRecoverableDraft] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // References for autosave, fetching, and debounces
  const isFetchingRef = useRef(false);
  const isInitialLoad = useRef(true);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Confirm dialog state (replaces window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  } | null>(null);

  const showConfirm = (opts: { title: string; message: string; confirmLabel?: string; variant?: 'danger' | 'warning' | 'info'; onConfirm: () => void }) => {
    setConfirmDialog(opts);
  };
  
  // Trigger background autosave
  const triggerAutosave = useCallback((currentData: PortfolioData, delay: number = 1500) => {
    setSaveStatus('unsaved');
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);

    // Save to localStorage as a safety draft backup
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_draft', JSON.stringify({
        data: currentData,
        timestamp: new Date().getTime()
      }));
    }

    autosaveTimerRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        // Sort timeline items chronologically (ascending by year) right before saving
        const getSortableYear = (yearStr: string): number => {
          if (!yearStr) return 0;
          const part = yearStr.split('-')[0].trim();
          const num = parseInt(part, 10);
          return isNaN(num) ? 0 : num;
        };
        const sortedTimeline = [...currentData.timeline].sort((a, b) => getSortableYear(a.year) - getSortableYear(b.year));
        const sortedData = {
          ...currentData,
          timeline: sortedTimeline
        };

        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sortedData),
        });
        if (res.status === 401) {
          setSaveStatus('unauthorized');
          return;
        }
        if (!res.ok) throw new Error('Autosave failed');
        
        setSaveStatus('saved');
        setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        
        // Clear safety draft backup on successful save
        if (typeof window !== 'undefined') {
          localStorage.removeItem('portfolio_draft');
        }
      } catch (error) {
        console.error('Autosave error:', error);
        if (typeof window !== 'undefined' && !navigator.onLine) {
          setSaveStatus('offline');
        } else {
          setSaveStatus('failed');
        }
      }
    }, delay);
  }, []);

  // Custom data setter wrapper that handles history checkpoints & triggers autosave
  const setData = useCallback((newDataOrFn: any) => {
    _setData((current) => {
      let nextData: PortfolioData | null = null;
      if (typeof newDataOrFn === 'function') {
        nextData = newDataOrFn(current);
      } else {
        nextData = newDataOrFn;
      }

      if (!nextData) return null;

      // Only track history and autosave if it's not the initial fetch load,
      // not in a current fetch operation, and has actual content differences
      if (current && !isFetchingRef.current && JSON.stringify(current) !== JSON.stringify(nextData)) {
        // Push current state to Undo Stack
        setUndoStack((prev) => [...prev.slice(-9), current]);
        setRedoStack([]); // Clear redo stack on user action
        
        // Check if change comes from a long text field (narratives, story details, etc.)
        let isLongText = false;
        if (typeof document !== 'undefined' && document.activeElement) {
          const tagName = document.activeElement.tagName.toLowerCase();
          const id = document.activeElement.id || '';
          const placeholder = document.activeElement.getAttribute('placeholder') || '';
          
          if (
            tagName === 'textarea' ||
            id.includes('desc') ||
            id.includes('story') ||
            id.includes('narrative') ||
            placeholder.includes('details') ||
            placeholder.includes('story')
          ) {
            isLongText = true;
          }
        }

        // Trigger autosave (1.5s normal, 2.5s long text)
        triggerAutosave(nextData, isLongText ? 2500 : 1500);
      }

      return nextData;
    });
  }, [triggerAutosave]);

  // Undo Handler
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0 || !data) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack((stack) => stack.slice(0, -1));
    setRedoStack((stack) => [...stack, data]);
    
    // Bypass custom wrapper checks during undo
    isFetchingRef.current = true;
    _setData(prev);
    isFetchingRef.current = false;
    
    triggerAutosave(prev, 1500);
  }, [undoStack, data, triggerAutosave]);

  // Redo Handler
  const handleRedo = useCallback(() => {
    if (redoStack.length === 0 || !data) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((stack) => stack.slice(0, -1));
    setUndoStack((stack) => [...stack, data]);
    
    // Bypass custom wrapper checks during redo
    isFetchingRef.current = true;
    _setData(next);
    isFetchingRef.current = false;
    
    triggerAutosave(next, 1500);
  }, [redoStack, data, triggerAutosave]);

  // Input states for adding new items
  const [newTimeline, setNewTimeline] = useState({ year: '2026', month: 'Jan', organization: '', title: '', description: '', type: 'achievement', image: '', proof: '', link: '' });
  const [newExp, setNewExp] = useState({
    company: '',
    role: '',
    period: '',
    logo: '',
    fromMonth: 'Jan',
    fromYear: '2026',
    toMonth: 'Dec',
    toYear: '2026',
    currentlyWorking: false,
    category: 'Internship',
    featured: false,
    techInput: '',
    status: 'Completed',
    projects: 0,
    reached: 0,
    teamSize: 0,
    apisBuilt: 0,
    eventsConducted: 0,
    github: '',
    linkedin: '',
    certificate: '',
    project: '',
    blog: '',
    galleryInput: '',
    locationType: 'Remote (Online)',
    location: ''
  });
  const [newHighlight, setNewHighlight] = useState<{ [expId: string]: string }>({});
  const [newLeadership, setNewLeadership] = useState({
    role: '',
    organization: '',
    period: '',
    description: '',
    fromMonth: 'Jan',
    fromYear: '2026',
    toMonth: 'Dec',
    toYear: '2026',
    currentlyActive: false,
    logo: '',
    category: 'Student Chapter',
    featured: false,
    tagline: '',
    eventsConducted: 0,
    studentsReached: 0,
    volunteersCount: 0,
    sponsorsClosed: 0,
    github: '',
    linkedin: '',
    certificate: '',
    project: '',
    galleryInput: ''
  });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    longDescription: '',
    github: '',
    live: '',
    category: '',
    tempTech: '',
    thumbnail: '',
    video: '',
    screenshotsInput: '',
    status: 'Completed',
    difficulty: 'Intermediate',
    teamSize: 1,
    duration: '',
    featured: false,
    problem: '',
    solution: '',
    architecture: '',
    challenges: '',
    impact: '',
    learning: ''
  });
  const [newProjectTechSearch, setNewProjectTechSearch] = useState('');
  const [editProjectTechSearch, setEditProjectTechSearch] = useState<{[id: string]: string}>({});
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [expandedLeadership, setExpandedLeadership] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState<{ [cat: string]: string }>({});
  const [newSkillLevel, setNewSkillLevel] = useState<{ [cat: string]: number }>({});
  const [newSkillYears, setNewSkillYears] = useState<{ [cat: string]: number }>({});
  const getLocalDateString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [newCert, setNewCert] = useState({
    name: '',
    issuer: '',
    date: getLocalDateString(),
    icon: '☁️',
    verificationProof: '',
    certImage: '',
    verificationUrl: '',
    credentialId: '',
    expiryDate: 'No Expiration',
    skillsEarnedInput: ''
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    organization: '',
    date: getLocalDateString(),
    rank: '',
    description: '',
    badgeImage: '',
    achievementPhoto: '',
    certificateUpload: '',
    galleryUpload: [] as string[],
    linkedinLink: '',
    type: 'Hackathon',
    publishStatus: 'published',
    publishedAt: ''
  });
  const [newUpdate, setNewUpdate] = useState({
    category: '',
    content: '',
    images: [] as string[],
    linkedinUrl: '',
    taggedPeople: '',
    status: 'published',
    scheduledAt: ''
  });
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    category: '',
    readTime: '',
    coverImage: '',
    body: '',
    linkedinUrl: '',
    gallery: [] as string[],
    status: 'published',
    scheduledAt: ''
  });
  const [blogPreviewMode, setBlogPreviewMode] = useState(false);
  const [newMedia, setNewMedia] = useState({
    title: '',
    description: '',
    category: 'CSI Event',
    date: getLocalDateString(),
    image: '',
    featured: false,
    tags: '',
    publishStatus: 'published',
    publishedAt: ''
  });
  const [mediaExpandedId, setMediaExpandedId] = useState<string | null>(null);

  // Custom states for new elements
  const [newTagline, setNewTagline] = useState('');
  const [newCTA, setNewCTA] = useState({ label: '', url: '', variant: 'glow' });
  const [newLanguage, setNewLanguage] = useState('');
  const [newFocus, setNewFocus] = useState('');

  // Client-side image cropping and resizing utility
  const processImageFile = (file: File, width: number, height: number, crop: boolean = true): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            if (crop) {
              const minDim = Math.min(img.width, img.height);
              const sx = (img.width - minDim) / 2;
              const sy = (img.height - minDim) / 2;
              ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, width, height);
            } else {
              let targetWidth = width;
              let targetHeight = height;
              const aspectRatio = img.width / img.height;
              if (aspectRatio > width / height) {
                targetHeight = width / aspectRatio;
              } else {
                targetWidth = height * aspectRatio;
              }
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, targetWidth, targetHeight);
            }
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            reject(new Error('Canvas context is null'));
          }
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  // Local AI Summary Template generator
  const generateExperienceAISummary = (exp: any) => {
    const roleStr = exp.role || 'Developer';
    const compStr = exp.company || 'Organization';
    const catStr = (exp.category || 'Experience').toLowerCase();
    
    const teamStr = exp.metrics?.teamSize ? `led a team of ${exp.metrics.teamSize} interns` : '';
    const apiStr = exp.metrics?.apisBuilt ? `built ${exp.metrics.apisBuilt} APIs` : '';
    const reachStr = exp.metrics?.reached ? `reached over ${exp.metrics.reached} students` : '';
    const projectStr = exp.metrics?.projects ? `delivered ${exp.metrics.projects} projects` : '';
    const eventStr = exp.metrics?.eventsConducted ? `conducted ${exp.metrics.eventsConducted} events` : '';
    
    const metricsArr = [teamStr, apiStr, reachStr, projectStr, eventStr].filter(Boolean);
    const metricsPhrase = metricsArr.length > 0 
      ? ` During this tenure, I ${metricsArr.slice(0, -1).join(', ')}${metricsArr.length > 1 ? ', and ' : ''}${metricsArr[metricsArr.length - 1]}.`
      : '';
      
    const cleanHighlights = (exp.highlights || []).map((h: string) => h.replace(/\*\*/g, '').trim());
    const bulletsPhrase = cleanHighlights.length > 0
      ? ` Focus areas included: ${cleanHighlights.slice(0, 2).join(' as well as ')}.`
      : '';
      
    const techPhrase = exp.tech && exp.tech.length > 0
      ? ` Leveraged modern technology stack including ${exp.tech.slice(0, 4).join(', ')}.`
      : '';

    return `Served as ${roleStr} at ${compStr} (${catStr} role).${metricsPhrase}${bulletsPhrase}${techPhrase}`.replace(/\s+/g, ' ').trim();
  };

  // Load portfolio on mount
  useEffect(() => {
    fetchPortfolio();

    // Check for draft recovery backup
    if (typeof window !== 'undefined') {
      const savedDraft = localStorage.getItem('portfolio_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed && parsed.data) {
            setHasRecoverableDraft(true);
            setShowDraftModal(true);
          }
        } catch (e) {
          console.error('Error reading draft:', e);
        }
      }
    }
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    isFetchingRef.current = true;
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to load portfolio database');
      const json = await res.json();
      _setData(json);
      setUndoStack([]);
      setRedoStack([]);
      setSaveStatus('saved');
      
      // Enforce dark theme mode on load
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.classList.add('dark');
        root.classList.remove('light');
      }
    } catch (err: any) {
      showNotice('error', err.message || 'Error fetching data');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Index search results dynamically (debounced 300ms)
  useEffect(() => {
    if (!searchQuery.trim() || !data) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Scan text helper
      const matchesText = (val: any): boolean => {
        if (!val) return false;
        if (typeof val === 'string') return val.toLowerCase().includes(query);
        if (typeof val === 'number') return String(val).includes(query);
        if (Array.isArray(val)) return val.some(item => matchesText(item));
        if (typeof val === 'object') return Object.values(val).some(item => matchesText(item));
        return false;
      };

      setSearchResults({
        timeline: (data.timeline || []).filter(item => matchesText(item.title) || matchesText(item.description) || matchesText(item.year)),
        experience: (data.experience || []).filter(item => matchesText(item.company) || matchesText(item.role) || matchesText(item.highlights) || matchesText(item.tech)),
        leadership: (data.leadership || []).filter(item => matchesText(item.organization) || matchesText(item.role) || matchesText(item.tagline) || matchesText(item.description)),
        projects: (data.projects || []).filter(item => matchesText(item.title) || matchesText(item.description) || matchesText(item.longDescription) || matchesText(item.tech)),
        credentials: (data.certifications || []).filter(item => matchesText(item.name) || matchesText(item.issuer) || matchesText(item.skillsEarned) || matchesText(item.credentialId)),
        achievements: (data.achievements || []).filter(item => matchesText(item.title) || matchesText(item.organization) || matchesText(item.description) || matchesText(item.rank)),
        journal: (data.updates || []).filter(item => matchesText(item.content) || matchesText(item.taggedPeople)),
        media: (data.media || []).filter(item => matchesText(item.title) || matchesText(item.description) || matchesText(item.tags))
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, data]);

  const jumpToSearchItem = (tab: TabType, id?: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    
    if (id) {
      if (tab === 'projects') setExpandedProject(id);
      if (tab === 'credentials') setExpandedCert(id);
      if (tab === 'achievements') setExpandedAchievement(id);
      if (tab === 'media') setMediaExpandedId(id);
      if (tab === 'timeline') setExpandedTimeline(id);
      if (tab === 'experience') setExpandedExperience(id);
      if (tab === 'leadership') setExpandedLeadership(id);
      
      setTimeout(() => {
        const el = document.getElementById(`item-${id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('glow-highlight');
          setTimeout(() => {
            el.classList.remove('glow-highlight');
          }, 3000);
        }
      }, 300);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveStatus('saving');
    
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);

    // Sort timeline items chronologically (ascending by year) right before saving
    const getSortableYear = (yearStr: string): number => {
      if (!yearStr) return 0;
      const part = yearStr.split('-')[0].trim();
      const num = parseInt(part, 10);
      return isNaN(num) ? 0 : num;
    };
    
    const sortedTimeline = [...data.timeline].sort((a, b) => getSortableYear(a.year) - getSortableYear(b.year));
    const sortedData = {
      ...data,
      timeline: sortedTimeline
    };

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sortedData),
      });
      if (res.status === 401) {
        setSaveStatus('unauthorized');
        showNotice('error', 'Unauthorized access. Please log in again.');
        return;
      }
      if (!res.ok) throw new Error('Failed to update portfolio database');
      
      isFetchingRef.current = true;
      _setData(sortedData);
      isFetchingRef.current = false;

      setSaveStatus('saved');
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      showNotice('success', 'Force saved database successfully!');

      if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_draft');
      }
    } catch (err: any) {
      if (typeof window !== 'undefined' && !navigator.onLine) {
        setSaveStatus('offline');
      } else {
        setSaveStatus('failed');
      }
      showNotice('error', err.message || 'Error committing changes');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    const hasUnsaved = saveStatus === 'unsaved';
    showConfirm({
      title: hasUnsaved ? 'Unsaved Changes' : 'Confirm Logout',
      message: hasUnsaved
        ? 'You have unsaved changes that will be lost. Are you sure you want to logout?'
        : 'Are you sure you want to logout?',
      confirmLabel: hasUnsaved ? 'Discard & Logout' : 'Logout',
      variant: hasUnsaved ? 'warning' : 'info',
      onConfirm: async () => {
        setConfirmDialog(null);
        try {
          const res = await fetch('/api/auth', { method: 'DELETE' });
          if (res.ok) {
            showNotice('success', 'Logged out successfully.');
            router.push('/');
          } else {
            throw new Error('Logout failed');
          }
        } catch (error) {
          showNotice('error', 'Failed to logout cleanly.');
        }
      },
    });
  };

  // Keyboard shortcuts (Undo, Redo, Force Save)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Z (Undo)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl + Y (Redo)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
      // Ctrl + S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo, handleSave]);

  // Helper functions to update nested data structures
  const updatePersonalInfo = (field: string, val: any) => {
    if (!data) return;
    setData({
      ...data,
      personal: { ...data.personal, [field]: val }
    });
  };

  const updateAboutInfo = (field: string, val: any) => {
    if (!data) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: { ...data.personal.about, [field]: val }
      }
    });
  };

  const updateSocialsInfo = (field: string, val: any) => {
    if (!data) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        socials: { ...data.personal.socials, [field]: val }
      }
    });
  };

  const updateStatsInfo = (field: string, val: number) => {
    if (!data) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        stats: { ...data.personal.stats, [field]: val }
      }
    });
  };

  // --- ACTIONS: HERO MEDIA ---
  const updateHeroMedia = (field: string, val: any) => {
    if (!data) return;
    const media = data.personal.heroMedia || {
      profilePhoto: '/images/chandru_portrait.png',
      hoverPhoto: '',
      backgroundCover: '',
      resumePdf: '#',
      profileShape: 'rounded',
      glowColor: 'gradient',
      effects: { floating: true, parallax: true, hoverRotate: true, neonBorder: true, spotlight: true }
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        heroMedia: { ...media, [field]: val }
      }
    });
  };

  const updateHeroEffect = (effectField: string, val: boolean) => {
    if (!data) return;
    const media = data.personal.heroMedia || {
      profilePhoto: '/images/chandru_portrait.png',
      hoverPhoto: '',
      backgroundCover: '',
      resumePdf: '#',
      profileShape: 'rounded',
      glowColor: 'gradient',
      effects: { floating: true, parallax: true, hoverRotate: true, neonBorder: true, spotlight: true }
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        heroMedia: {
          ...media,
          effects: { ...media.effects, [effectField]: val }
        }
      }
    });
  };

  // --- ACTIONS: DYNAMIC TAGLINES ---
  const addTagline = () => {
    if (!data || !newTagline.trim()) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        taglines: [...data.personal.taglines, newTagline.trim()]
      }
    });
    setNewTagline('');
  };

  const deleteTagline = (idx: number) => {
    if (!data) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        taglines: data.personal.taglines.filter((_, i) => i !== idx)
      }
    });
  };

  const moveTagline = (index: number, direction: 'up' | 'down') => {
    if (!data) return;
    const list = [...data.personal.taglines];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setData({
      ...data,
      personal: { ...data.personal, taglines: list }
    });
  };

  const reorderItem = (listKey: 'timeline' | 'experience' | 'leadership' | 'projects' | 'certifications' | 'achievements' | 'updates' | 'blogs' | 'media', index: number, direction: 'up' | 'down') => {
    if (!data) return;
    const list = [...(data[listKey] as any[])];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setData({
      ...data,
      [listKey]: list
    });
  };

  const reorderSkill = (category: keyof PortfolioData['skills'], index: number, direction: 'up' | 'down') => {
    if (!data || !data.skills || !data.skills[category]) return;
    const list = [...(data.skills[category] as any[])];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setData({
      ...data,
      skills: {
        ...data.skills,
        [category]: list
      }
    });
  };

  // --- ACTIONS: DYNAMIC CTAS ---
  const addCTA = () => {
    if (!data || !newCTA.label) return;
    const ctas = data.personal.ctas || [];
    const item = {
      id: `cta_${Date.now()}`,
      label: newCTA.label,
      url: newCTA.url || '#',
      variant: newCTA.variant
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        ctas: [...ctas, item]
      }
    });
    setNewCTA({ label: '', url: '', variant: 'glow' });
  };

  const deleteCTA = (id: string) => {
    if (!data || !data.personal.ctas) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        ctas: data.personal.ctas.filter(c => c.id !== id)
      }
    });
  };

  const moveCTA = (index: number, direction: 'up' | 'down') => {
    if (!data || !data.personal.ctas) return;
    const list = [...data.personal.ctas];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setData({
      ...data,
      personal: { ...data.personal, ctas: list }
    });
  };

  // --- ACTIONS: ABOUT FACTS PANEL ---
  const updateAboutFactField = (field: string, val: any) => {
    if (!data) return;
    const facts = data.personal.about.facts || {
      languages: ["English", "Tamil", "Hindi"],
      availability: { internship: true, fullTime: true, remote: true, relocation: true },
      timezone: "IST (UTC+5:30)",
      yearsCoding: "3+ Years",
      openToOpportunities: true
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          facts: { ...facts, [field]: val }
        }
      }
    });
  };

  const updateAboutAvailability = (availField: string, val: boolean) => {
    if (!data) return;
    const facts = data.personal.about.facts || {
      languages: ["English", "Tamil", "Hindi"],
      availability: { internship: true, fullTime: true, remote: true, relocation: true },
      timezone: "IST (UTC+5:30)",
      yearsCoding: "3+ Years",
      openToOpportunities: true
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          facts: {
            ...facts,
            availability: { ...facts.availability, [availField]: val }
          }
        }
      }
    });
  };

  const addLanguage = () => {
    if (!data || !newLanguage.trim()) return;
    const facts = data.personal.about.facts || {
      languages: ["English", "Tamil", "Hindi"],
      availability: { internship: true, fullTime: true, remote: true, relocation: true },
      timezone: "IST (UTC+5:30)",
      yearsCoding: "3+ Years",
      openToOpportunities: true
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          facts: {
            ...facts,
            languages: [...facts.languages, newLanguage.trim()]
          }
        }
      }
    });
    setNewLanguage('');
  };

  const deleteLanguage = (lang: string) => {
    if (!data) return;
    const facts = data.personal.about.facts || {
      languages: ["English", "Tamil", "Hindi"],
      availability: { internship: true, fullTime: true, remote: true, relocation: true },
      timezone: "IST (UTC+5:30)",
      yearsCoding: "3+ Years",
      openToOpportunities: true
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          facts: {
            ...facts,
            languages: facts.languages.filter(l => l !== lang)
          }
        }
      }
    });
  };

  // --- ACTIONS: NOW SECTION ---
  const updateNowSectionField = (field: string, val: any) => {
    if (!data) return;
    const now = data.personal.about.nowSection || {
      title: "What I'm currently doing",
      focus: []
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          nowSection: { ...now, [field]: val }
        }
      }
    });
  };

  const addFocusItem = () => {
    if (!data || !newFocus.trim()) return;
    const now = data.personal.about.nowSection || {
      title: "What I'm currently doing",
      focus: []
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          nowSection: {
            ...now,
            focus: [...now.focus, newFocus.trim()]
          }
        }
      }
    });
    setNewFocus('');
  };

  const deleteFocusItem = (idx: number) => {
    if (!data) return;
    const now = data.personal.about.nowSection || {
      title: "What I'm currently doing",
      focus: []
    };
    setData({
      ...data,
      personal: {
        ...data.personal,
        about: {
          ...data.personal.about,
          nowSection: {
            ...now,
            focus: now.focus.filter((_, i) => i !== idx)
          }
        }
      }
    });
  };

  // --- GENERAL ACTIONS ---
  const addTimelineItem = () => {
    if (!data || !newTimeline.year || !newTimeline.title) return;
    const item = {
      id: `t_${Date.now()}`,
      year: newTimeline.year,
      month: newTimeline.month || '',
      organization: newTimeline.organization || '',
      title: newTimeline.title,
      description: newTimeline.description,
      type: newTimeline.type || 'achievement',
      image: newTimeline.image || '',
      proof: newTimeline.proof || '',
      link: newTimeline.link || ''
    };
    setData({
      ...data,
      timeline: [...data.timeline, item]
    });
    setNewTimeline({ year: '2026', month: 'Jan', organization: '', title: '', description: '', type: 'achievement', image: '', proof: '', link: '' });
    showNotice('success', 'Timeline milestone added.');
  };

  const deleteTimelineItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Milestone', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteTimelineConfirmed(id); } });
  };
  const deleteTimelineConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      timeline: data.timeline.filter(t => t.id !== id)
    });
    showNotice('success', 'Milestone deleted. Press Ctrl+Z to undo.');
  };

  const addExperienceItem = () => {
    if (!data || !newExp.company || !newExp.role) return;

    const generatedPeriod = newExp.currentlyWorking 
      ? `${newExp.fromMonth} ${newExp.fromYear} - Present` 
      : `${newExp.fromMonth} ${newExp.fromYear} - ${newExp.toMonth} ${newExp.toYear}`;

    const parsedTech = newExp.techInput 
      ? newExp.techInput.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const parsedGallery = newExp.galleryInput
      ? newExp.galleryInput.split(',').map(g => g.trim()).filter(Boolean)
      : [];

    const item = {
      id: `exp_${Date.now()}`,
      company: newExp.company,
      role: newExp.role,
      period: generatedPeriod,
      logo: newExp.logo || '/images/stratschool_logo.png',
      highlights: [],
      fromMonth: newExp.fromMonth,
      fromYear: newExp.fromYear,
      toMonth: newExp.currentlyWorking ? '' : newExp.toMonth,
      toYear: newExp.currentlyWorking ? '' : newExp.toYear,
      currentlyWorking: newExp.currentlyWorking,
      category: newExp.category,
      featured: newExp.featured,
      tech: parsedTech,
      metrics: {
        projects: Number(newExp.projects) || 0,
        reached: Number(newExp.reached) || 0,
        teamSize: Number(newExp.teamSize) || 0,
        apisBuilt: Number(newExp.apisBuilt) || 0,
        eventsConducted: Number(newExp.eventsConducted) || 0
      },
      gallery: parsedGallery,
      links: {
        github: newExp.github || '',
        linkedin: newExp.linkedin || '',
        certificate: newExp.certificate || '',
        project: newExp.project || '',
        blog: newExp.blog || ''
      },
      status: newExp.status,
      aiSummary: '',
      locationType: newExp.locationType,
      location: newExp.locationType === 'Remote (Online)' ? '' : newExp.location
    };

    setData({
      ...data,
      experience: [...data.experience, item]
    });

    setNewExp({
      company: '',
      role: '',
      period: '',
      logo: '',
      fromMonth: 'Jan',
      fromYear: '2026',
      toMonth: 'Dec',
      toYear: '2026',
      currentlyWorking: false,
      category: 'Internship',
      featured: false,
      techInput: '',
      status: 'Completed',
      projects: 0,
      reached: 0,
      teamSize: 0,
      apisBuilt: 0,
      eventsConducted: 0,
      github: '',
      linkedin: '',
      certificate: '',
      project: '',
      blog: '',
      galleryInput: '',
      locationType: 'Remote (Online)',
      location: ''
    });

    showNotice('success', 'Experience card added.');
  };

  const deleteExperienceItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Experience', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteExperienceConfirmed(id); } });
  };
  const deleteExperienceConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.filter(e => e.id !== id)
    });
    showNotice('success', 'Experience deleted. Press Ctrl+Z to undo.');
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (!data) return;
    const list = [...data.experience];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setData({
      ...data,
      experience: list
    });
  };

  const addHighlightItem = (expId: string) => {
    if (!data || !newHighlight[expId]) return;
    setData({
      ...data,
      experience: data.experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, highlights: [...exp.highlights, newHighlight[expId]] };
        }
        return exp;
      })
    });
    setNewHighlight({ ...newHighlight, [expId]: '' });
  };

  const deleteHighlightItem = (expId: string, idx: number) => {
    if (!data) return;
    setData({
      ...data,
      experience: data.experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, highlights: exp.highlights.filter((_, i) => i !== idx) };
        }
        return exp;
      })
    });
  };

  const addLeadershipItem = () => {
    if (!data || !newLeadership.role || !newLeadership.organization) return;
    
    const generatedPeriod = newLeadership.currentlyActive 
      ? `${newLeadership.fromMonth} ${newLeadership.fromYear} - Present` 
      : `${newLeadership.fromMonth} ${newLeadership.fromYear} - ${newLeadership.toMonth} ${newLeadership.toYear}`;

    const parsedGallery = newLeadership.galleryInput
      ? newLeadership.galleryInput.split(',').map(g => g.trim()).filter(Boolean)
      : [];

    const item = {
      id: `lead_${Date.now()}`,
      role: newLeadership.role,
      organization: newLeadership.organization,
      period: generatedPeriod,
      description: newLeadership.description,
      fromMonth: newLeadership.fromMonth,
      fromYear: newLeadership.fromYear,
      toMonth: newLeadership.currentlyActive ? '' : newLeadership.toMonth,
      toYear: newLeadership.currentlyActive ? '' : newLeadership.toYear,
      currentlyActive: newLeadership.currentlyActive,
      logo: newLeadership.logo || '💼',
      category: newLeadership.category,
      featured: newLeadership.featured,
      tagline: newLeadership.tagline,
      metrics: {
        eventsConducted: Number(newLeadership.eventsConducted) || 0,
        studentsReached: Number(newLeadership.studentsReached) || 0,
        volunteersCount: Number(newLeadership.volunteersCount) || 0,
        sponsorsClosed: Number(newLeadership.sponsorsClosed) || 0
      },
      gallery: parsedGallery,
      links: {
        github: newLeadership.github || '',
        linkedin: newLeadership.linkedin || '',
        certificate: newLeadership.certificate || '',
        project: newLeadership.project || ''
      }
    };

    let updatedLeadership = [...data.leadership];
    if (newLeadership.featured) {
      updatedLeadership = updatedLeadership.map(l => ({ ...l, featured: false }));
    }

    setData({
      ...data,
      leadership: [...updatedLeadership, item]
    });

    setNewLeadership({
      role: '',
      organization: '',
      period: '',
      description: '',
      fromMonth: 'Jan',
      fromYear: '2026',
      toMonth: 'Dec',
      toYear: '2026',
      currentlyActive: false,
      logo: '',
      category: 'Student Chapter',
      featured: false,
      tagline: '',
      eventsConducted: 0,
      studentsReached: 0,
      volunteersCount: 0,
      sponsorsClosed: 0,
      github: '',
      linkedin: '',
      certificate: '',
      project: '',
      galleryInput: ''
    });

    showNotice('success', 'Leadership role added.');
  };

  const deleteLeadershipItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Leadership', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteLeadershipConfirmed(id); } });
  };
  const deleteLeadershipConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      leadership: data.leadership.filter(l => l.id !== id)
    });
    showNotice('success', 'Leadership role deleted. Press Ctrl+Z to undo.');
  };

  const moveLeadership = (index: number, direction: 'up' | 'down') => {
    if (!data) return;
    const list = [...data.leadership];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setData({
      ...data,
      leadership: list
    });
  };

  const addProjectItem = () => {
    if (!data || !newProject.title || !newProject.category) return;
    
    // techArray is populated from tags inside the search panel or fallback tempTech
    const techArray = newProject.tempTech
      ? newProject.tempTech.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const item = {
      id: `proj_${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      longDescription: newProject.longDescription,
      tech: techArray,
      github: newProject.github || 'https://github.com',
      live: newProject.live || '#',
      category: newProject.category,
      thumbnail: newProject.thumbnail || '',
      video: newProject.video || '',
      screenshots: newProject.screenshotsInput ? newProject.screenshotsInput.split(',').map(s => s.trim()).filter(Boolean) : [],
      status: newProject.status as any,
      difficulty: newProject.difficulty as any,
      teamSize: Number(newProject.teamSize) || 1,
      duration: newProject.duration || '',
      featured: newProject.featured,
      story: {
        problem: newProject.problem || '',
        solution: newProject.solution || '',
        architecture: newProject.architecture || '',
        challenges: newProject.challenges || '',
        impact: newProject.impact || '',
        learning: newProject.learning || ''
      }
    };

    setData({
      ...data,
      projects: [...data.projects, item]
    });

    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      github: '',
      live: '',
      category: '',
      tempTech: '',
      thumbnail: '',
      video: '',
      screenshotsInput: '',
      status: 'Completed',
      difficulty: 'Intermediate',
      teamSize: 1,
      duration: '',
      featured: false,
      problem: '',
      solution: '',
      architecture: '',
      challenges: '',
      impact: '',
      learning: ''
    });

    showNotice('success', 'Project card created.');
  };

  const deleteProjectItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Project', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteProjectConfirmed(id); } });
  };
  const deleteProjectConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
    showNotice('success', 'Project deleted. Press Ctrl+Z to undo.');
  };

  const removeProjectTech = (projId: string, techName: string) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map(p => {
        if (p.id === projId) {
          return { ...p, tech: p.tech.filter(t => t !== techName) };
        }
        return p;
      })
    });
  };

  const addProjectTech = (projId: string, techName: string) => {
    if (!data || !techName.trim()) return;
    setData({
      ...data,
      projects: data.projects.map(p => {
        if (p.id === projId) {
          return { ...p, tech: [...p.tech, techName.trim()] };
        }
        return p;
      })
    });
  };

  const addSkillItem = (category: string) => {
    if (!data || !newSkillName[category]?.trim()) return;
    const key = category as keyof typeof data.skills;
    const name = newSkillName[category].trim();
    const level = newSkillLevel[category] ?? 80;
    const years = newSkillYears[category] ?? 1;

    // Check duplicate
    const exists = (data.skills[key] as any[]).some((s: any) => 
      (typeof s === 'string' ? s.toLowerCase() : s.name.toLowerCase()) === name.toLowerCase()
    );
    if (exists) {
      showNotice('error', 'Skill already exists in this category');
      return;
    }

    setData({
      ...data,
      skills: {
        ...data.skills,
        [key]: [...(data.skills[key] as any[]), { name, level, years }]
      }
    });
    setNewSkillName({ ...newSkillName, [category]: '' });
    setNewSkillLevel({ ...newSkillLevel, [category]: 80 });
    setNewSkillYears({ ...newSkillYears, [category]: 1 });
  };

  const deleteSkillItem = (category: string, skillName: string) => {
    if (!data) return;
    const key = category as keyof typeof data.skills;
    setData({
      ...data,
      skills: {
        ...data.skills,
        [key]: (data.skills[key] as any[]).filter((s: any) => (typeof s === 'string' ? s : s.name) !== skillName)
      }
    });
  };

  const addCertItem = () => {
    if (!data || !newCert.name || !newCert.issuer) return;
    const skillsArray = newCert.skillsEarnedInput
      ? newCert.skillsEarnedInput.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const item = {
      id: `cert_${Date.now()}`,
      name: newCert.name,
      issuer: newCert.issuer,
      date: newCert.date || new Date().getFullYear().toString(),
      icon: newCert.icon || '☁️',
      verificationProof: newCert.verificationProof,
      certImage: newCert.certImage,
      verificationUrl: newCert.verificationUrl,
      credentialId: newCert.credentialId,
      expiryDate: newCert.expiryDate || 'No Expiration',
      skillsEarned: skillsArray
    };
    setData({
      ...data,
      certifications: [...data.certifications, item]
    });
    setNewCert({
      name: '',
      issuer: '',
      date: getLocalDateString(),
      icon: '☁️',
      verificationProof: '',
      certImage: '',
      verificationUrl: '',
      credentialId: '',
      expiryDate: 'No Expiration',
      skillsEarnedInput: ''
    });
    showNotice('success', 'Certification logged.');
  };

  const deleteCertItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Certification', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteCertificationConfirmed(id); } });
  };
  const deleteCertificationConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      certifications: data.certifications.filter(c => c.id !== id)
    });
    showNotice('success', 'Certification deleted. Press Ctrl+Z to undo.');
  };

  const addAchievementItem = () => {
    if (!data || !newAchievement.title || !newAchievement.organization) return;
    const item = {
      id: `ach_${Date.now()}`,
      title: newAchievement.title,
      organization: newAchievement.organization,
      date: newAchievement.date || new Date().getFullYear().toString(),
      rank: newAchievement.rank,
      description: newAchievement.description,
      badgeImage: newAchievement.badgeImage,
      achievementPhoto: newAchievement.achievementPhoto,
      certificateUpload: newAchievement.certificateUpload,
      galleryUpload: newAchievement.galleryUpload,
      linkedinLink: newAchievement.linkedinLink,
      type: newAchievement.type || 'Hackathon',
      publishStatus: newAchievement.publishStatus || 'published',
      publishedAt: newAchievement.publishedAt || ''
    };
    setData({
      ...data,
      achievements: [...data.achievements, item]
    });
    setNewAchievement({
      title: '',
      organization: '',
      date: getLocalDateString(),
      rank: '',
      description: '',
      badgeImage: '',
      achievementPhoto: '',
      certificateUpload: '',
      galleryUpload: [],
      linkedinLink: '',
      type: 'Hackathon',
      publishStatus: 'published',
      publishedAt: ''
    });
    showNotice('success', 'Achievement badge logged.');
  };


  const deleteAchievementItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Achievement', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteAchievementConfirmed(id); } });
  };
  const deleteAchievementConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      achievements: data.achievements.filter(a => a.id !== id)
    });
    showNotice('success', 'Achievement deleted. Press Ctrl+Z to undo.');
  };

  const addUpdateItem = () => {
    if (!data || !newUpdate.content || !newUpdate.category) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const item = {
      id: `upd_${Date.now()}`,
      date: dateStr,
      category: newUpdate.category,
      content: newUpdate.content,
      images: newUpdate.images,
      linkedinUrl: newUpdate.linkedinUrl,
      taggedPeople: newUpdate.taggedPeople
        ? newUpdate.taggedPeople.split(',').map(t => t.trim()).filter(Boolean)
        : [],
      status: newUpdate.status,
      scheduledAt: newUpdate.scheduledAt
    };
    setData({
      ...data,
      updates: [item, ...data.updates]
    });
    setNewUpdate({ category: '', content: '', images: [], linkedinUrl: '', taggedPeople: '', status: 'published', scheduledAt: '' });
    showNotice('success', 'Activity feed update queued.');
  };

  const deleteUpdateItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Update', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteUpdateConfirmed(id); } });
  };
  const deleteUpdateConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      updates: data.updates.filter(u => u.id !== id)
    });
    showNotice('success', 'Update deleted. Press Ctrl+Z to undo.');
  };

  const addBlogItem = () => {
    if (!data || !newBlog.title || !newBlog.excerpt) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const item = {
      id: `blog_${Date.now()}`,
      title: newBlog.title,
      date: dateStr,
      excerpt: newBlog.excerpt,
      category: newBlog.category || 'General',
      readTime: newBlog.readTime || '5 min read',
      coverImage: newBlog.coverImage,
      body: newBlog.body,
      linkedinUrl: newBlog.linkedinUrl,
      gallery: newBlog.gallery,
      status: newBlog.status,
      scheduledAt: newBlog.scheduledAt
    };
    setData({
      ...data,
      blogs: [item, ...data.blogs]
    });
    setNewBlog({ title: '', excerpt: '', category: '', readTime: '', coverImage: '', body: '', linkedinUrl: '', gallery: [], status: 'published', scheduledAt: '' });
    showNotice('success', 'Blog article queued.');
  };

  const deleteBlogItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Blog Post', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteBlogConfirmed(id); } });
  };
  const deleteBlogConfirmed = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      blogs: data.blogs.filter(b => b.id !== id)
    });
    showNotice('success', 'Blog article deleted. Press Ctrl+Z to undo.');
  };

  const addMediaItem = () => {
    if (!data || !newMedia.title || !newMedia.image) return;
    const item = {
      id: `med_${Date.now()}`,
      title: newMedia.title,
      description: newMedia.description,
      category: newMedia.category,
      date: newMedia.date,
      image: newMedia.image,
      featured: newMedia.featured,
      tags: newMedia.tags.split(',').map(t => t.trim()).filter(Boolean),
      publishStatus: newMedia.publishStatus || 'published',
      publishedAt: newMedia.publishedAt || ''
    };
    setData({ ...data, media: [item, ...(data.media || [])] });
    setNewMedia({ title: '', description: '', category: 'CSI Event', date: getLocalDateString(), image: '', featured: false, tags: '', publishStatus: 'published', publishedAt: '' });
    showNotice('success', 'Photo added to Media Vault.');
  };

  const deleteMediaItem = (id: string) => {
    if (!data) return;
    showConfirm({ title: 'Delete Media', message: 'Are you sure? This can be undone with Ctrl+Z.', confirmLabel: 'Delete', variant: 'danger', onConfirm: () => { setConfirmDialog(null); deleteMediaConfirmed(id); } });
  };
  const deleteMediaConfirmed = (id: string) => {
    if (!data) return;
    setData({ ...data, media: (data.media || []).filter(m => m.id !== id) });
    showNotice('success', 'Media item deleted. Press Ctrl+Z to undo.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-zinc-400">
        <RefreshCw className="animate-spin text-purple-500" size={32} />
        <span>Parsing Portfolio Workspace Database...</span>
      </div>
    );
  }

  if (!data) return null;

  // Safe resolvers for newly added structure elements
  const heroMedia = data.personal.heroMedia || {
    profilePhoto: '/images/chandru_portrait.png',
    hoverPhoto: '',
    backgroundCover: '',
    resumePdf: '#',
    profileShape: 'rounded',
    glowColor: 'gradient',
    effects: { floating: true, parallax: true, hoverRotate: true, neonBorder: true, spotlight: true }
  };

  const ctas = data.personal.ctas || [];

  const facts = data.personal.about.facts || {
    languages: ["English", "Tamil", "Hindi"],
    availability: { internship: true, fullTime: true, remote: true, relocation: true },
    timezone: "IST (UTC+5:30)",
    yearsCoding: "3+ Years",
    openToOpportunities: true
  };

  const nowSection = data.personal.about.nowSection || {
    title: "What I'm currently doing",
    focus: []
  };

  const accent = data?.settings?.theme?.accentColor || 'purple';
  const accentColors = {
    purple: { primary: '#a855f7', ring: '#a855f7', accent: '#d946ef' },
    blue: { primary: '#3b82f6', ring: '#3b82f6', accent: '#06b6d4' },
    emerald: { primary: '#10b981', ring: '#10b981', accent: '#14b8a6' },
    pink: { primary: '#ec4899', ring: '#ec4899', accent: '#f43f5e' },
  };
  const selectedAccent = accentColors[accent as keyof typeof accentColors] || accentColors.purple;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 grid-bg">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: ${selectedAccent.primary};
          --ring: ${selectedAccent.ring};
          --accent: ${selectedAccent.accent};
        }
      `}} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl glass shadow-2xl border-white/5 ${
              notification.type === 'success' ? 'border-green-500/20' : 'border-red-500/20'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="text-green-400" size={18} />
            ) : (
              <AlertCircle className="text-red-400" size={18} />
            )}
            <span className="text-xs font-bold text-zinc-200">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mx-auto z-10 relative ${livePreview ? 'max-w-none px-2' : 'max-w-5xl space-y-8'}`}>
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-1">
            <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs font-semibold mb-2 transition-colors">
              <ArrowLeft size={12} /> View Live Portfolio
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Database size={24} className="text-purple-500" /> CMS Console Dashboard
              </h1>
              
              {/* Autosave Status Badge */}
              <div className="flex items-center gap-2 text-xs pt-1">
                {saveStatus === 'saved' && (
                  <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-bold select-none text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Saved ✓ {lastSaved && `at ${lastSaved}`}
                  </span>
                )}
                {saveStatus === 'saving' && (
                  <span className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2.5 py-1 rounded-full font-bold select-none text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                    Saving...
                  </span>
                )}
                {saveStatus === 'unsaved' && (
                  <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-bold select-none text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Unsaved Changes
                  </span>
                )}
                {saveStatus === 'failed' && (
                  <span className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-bold select-none text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Failed ✕
                  </span>
                )}
                {saveStatus === 'unauthorized' && (
                  <span className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-bold select-none text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Unauthorized ✕
                  </span>
                )}
                {saveStatus === 'offline' && (
                  <span className="flex items-center gap-1.5 bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 px-2.5 py-1 rounded-full font-bold select-none text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    Offline mode
                  </span>
                )}
              </div>
            </div>
            <p className="text-zinc-500 text-xs">
              Live inline editable layout. Changes autosave automatically after typing. Use Ctrl+Z / Ctrl+Y to undo/redo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Global Search Bar */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-650">
                <Search size={12} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search everything (e.g. StratSchool)..."
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-purple-500/40 rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:outline-none placeholder-zinc-600 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white cursor-pointer text-xs"
                >
                  ✕
                </button>
              )}

              {/* Unified Search Results Overlay */}
              <AnimatePresence>
                {searchQuery.trim() && searchResults && (
                  <div className="absolute top-full right-0 mt-2 z-50 w-[320px] max-h-96 overflow-y-auto glass border-white/10 rounded-2xl p-2 shadow-2xl space-y-3">
                    {Object.entries(searchResults).every(([_, list]) => list.length === 0) ? (
                      <p className="text-zinc-500 text-xs text-center py-4 font-semibold">No matches found for "{searchQuery}"</p>
                    ) : (
                      Object.entries(searchResults).map(([cat, list]) => {
                        if (list.length === 0) return null;
                        const categoryLabels: Record<string, string> = {
                          timeline: 'Timeline Journey',
                          experience: 'Work Experience',
                          leadership: 'Leadership Roles',
                          projects: 'Projects',
                          credentials: 'Certifications',
                          achievements: 'Achievements',
                          journal: 'Journal Updates',
                          media: 'Media Vault'
                        };
                        return (
                          <div key={cat} className="space-y-1">
                            <h5 className="text-[10px] text-zinc-500 uppercase font-black px-2 tracking-wider">
                              {categoryLabels[cat] || cat} ({list.length})
                            </h5>
                            <div className="space-y-0.5">
                              {list.map((item: any) => {
                                let titleStr = item.title || item.company || item.body || item.content || 'Untitled';
                                if (titleStr.length > 50) titleStr = titleStr.substring(0, 48) + '...';
                                let subStr = item.description || item.role || item.issuer || item.tags?.join(', ') || '';
                                if (subStr.length > 80) subStr = subStr.substring(0, 78) + '...';
                                return (
                                  <button
                                    key={item.id || item.year || titleStr}
                                    onClick={() => jumpToSearchItem(
                                      cat === 'journal' ? 'journal' : 
                                      cat === 'credentials' ? 'credentials' : 
                                      cat as TabType, 
                                      item.id
                                    )}
                                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer group"
                                  >
                                    <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">{titleStr}</div>
                                    {subStr && <div className="text-[10px] text-zinc-500 mt-0.5">{subStr}</div>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme switch button removed */}

            {/* Live Preview Toggle */}
            <button
              onClick={() => setLivePreview(!livePreview)}
              title="Toggle Split Live Preview Sandbox"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                livePreview 
                  ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)] animate-pulse'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {livePreview ? <Eye size={12} /> : <EyeOff size={12} />} Preview
            </button>

            {/* Undo/Redo Buttons */}
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              title="Undo Checkpoint (Ctrl+Z)"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <Undo size={14} />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              title="Redo Checkpoint (Ctrl+Y)"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <Redo size={14} />
            </button>

            <Button variant="secondary" onClick={fetchPortfolio} disabled={saving}>
              <RefreshCw size={14} /> Revert
            </Button>
            <Button variant="glow" onClick={handleSave} disabled={saving}>
              <Save size={14} /> Force Save
            </Button>
            <button
              onClick={handleLogout}
              title="Sign out of workspace session"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.05)] font-sans"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative flex items-center border-b border-zinc-900 shrink-0 group/tabs">
          {/* Left scroll arrow */}
          <button
            onClick={() => {
              const el = document.getElementById('cms-tab-scroll');
              if (el) el.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            className="absolute left-0 z-10 p-1.5 rounded-lg bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            aria-label="Scroll tabs left"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Scrollable tab container */}
          <div
            id="cms-tab-scroll"
            className="flex gap-2 overflow-x-auto pb-px scrollbar-none mx-8 scroll-smooth"
          >
            {[
              { id: 'identity', label: 'Identity & Hero', icon: <User size={12} /> },
              { id: 'timeline', label: 'Timeline Journey', icon: <Calendar size={12} /> },
              { id: 'experience', label: 'Experience', icon: <Briefcase size={12} /> },
              { id: 'leadership', label: 'Leadership', icon: <Users size={12} /> },
              { id: 'projects', label: 'Projects', icon: <Code size={12} /> },
              { id: 'skills', label: 'Skills Cloud', icon: <Terminal size={12} /> },
              { id: 'credentials', label: 'Credentials', icon: <Award size={12} /> },
              { id: 'achievements', label: 'Achievements', icon: <Sparkles size={12} /> },
              { id: 'journal', label: 'Journal', icon: <BookOpen size={12} /> },
              { id: 'media', label: 'Media Vault', icon: <ImageIcon size={12} /> },
              { id: 'analytics', label: 'Insights', icon: <BarChart2 size={12} /> },
              { id: 'settings', label: 'Settings', icon: <Settings size={12} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  // Auto-scroll the clicked tab into view
                  setTimeout(() => {
                    const btn = document.getElementById(`cms-tab-${tab.id}`);
                    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }, 50);
                }}
                id={`cms-tab-${tab.id}`}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white font-bold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right scroll arrow */}
          <button
            onClick={() => {
              const el = document.getElementById('cms-tab-scroll');
              if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            className="absolute right-0 z-10 p-1.5 rounded-lg bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            aria-label="Scroll tabs right"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* TAB WORKSPACE */}
        <div className="pt-4">
          <div className={livePreview ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}>
            {/* Left side: Editor Panel */}
            <div className={livePreview ? 'max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin space-y-6 pb-20' : 'space-y-6'}>

          {/* TAB 1: IDENTITY & HERO */}
          {activeTab === 'identity' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Bio & Stats */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <User size={16} className="text-purple-400" /> Basic Bio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Display Name</label>
                    <input
                      type="text"
                      value={data.personal.name}
                      onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Core Title</label>
                    <input
                      type="text"
                      value={data.personal.title}
                      onChange={(e) => updatePersonalInfo('title', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">College CGPA</label>
                    <input
                      type="text"
                      value={data.personal.about.cgpa}
                      onChange={(e) => updateAboutInfo('cgpa', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Geographic Location</label>
                    <input
                      type="text"
                      value={data.personal.about.location}
                      onChange={(e) => updateAboutInfo('location', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Core Passions Narrative</label>
                  <textarea
                    rows={3}
                    value={data.personal.about.corePassions}
                    onChange={(e) => updateAboutInfo('corePassions', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Hero Media Manager */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <ImageIcon size={16} className="text-blue-400" /> Hero Media Manager
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Profile Photo</label>
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                        {heroMedia.profilePhoto ? (
                          heroMedia.profilePhoto.startsWith('/') || heroMedia.profilePhoto.startsWith('data:') ? (
                            <img src={heroMedia.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span>👨‍💻</span>
                          )
                        ) : (
                          <User size={14} className="text-zinc-600" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="heroProfilePhotoFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 512, 512, true);
                              updateHeroMedia('profilePhoto', b64);
                            } catch (err) {
                              showNotice('error', 'Failed to process profile photo file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('heroProfilePhotoFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Upload size={12} /> Upload
                      </button>
                      {heroMedia.profilePhoto && (
                        <button
                          type="button"
                          onClick={() => updateHeroMedia('profilePhoto', '')}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={heroMedia.profilePhoto || ''}
                        onChange={(e) => updateHeroMedia('profilePhoto', e.target.value)}
                        placeholder="/images/profile.png"
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none min-w-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Alternate Hover Photo</label>
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                        {heroMedia.hoverPhoto ? (
                          heroMedia.hoverPhoto.startsWith('/') || heroMedia.hoverPhoto.startsWith('data:') ? (
                            <img src={heroMedia.hoverPhoto} alt="Hover" className="w-full h-full object-cover" />
                          ) : (
                            <span>👨‍💻</span>
                          )
                        ) : (
                          <User size={14} className="text-zinc-600" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="heroHoverPhotoFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 512, 512, true);
                              updateHeroMedia('hoverPhoto', b64);
                            } catch (err) {
                              showNotice('error', 'Failed to process hover photo file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('heroHoverPhotoFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Upload size={12} /> Upload
                      </button>
                      {heroMedia.hoverPhoto && (
                        <button
                          type="button"
                          onClick={() => updateHeroMedia('hoverPhoto', '')}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={heroMedia.hoverPhoto || ''}
                        onChange={(e) => updateHeroMedia('hoverPhoto', e.target.value)}
                        placeholder="/images/profile-hover.png"
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none min-w-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Background Cover Image</label>
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                        {heroMedia.backgroundCover ? (
                          heroMedia.backgroundCover.startsWith('/') || heroMedia.backgroundCover.startsWith('data:') ? (
                            <img src={heroMedia.backgroundCover} alt="Cover" className="w-full h-full object-cover" />
                          ) : (
                            <span>🖼️</span>
                          )
                        ) : (
                          <ImageIcon size={14} className="text-zinc-600" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="heroCoverFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 1200, 900, false);
                              updateHeroMedia('backgroundCover', b64);
                            } catch (err) {
                              showNotice('error', 'Failed to process cover file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('heroCoverFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Upload size={12} /> Upload
                      </button>
                      {heroMedia.backgroundCover && (
                        <button
                          type="button"
                          onClick={() => updateHeroMedia('backgroundCover', '')}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={heroMedia.backgroundCover || ''}
                        onChange={(e) => updateHeroMedia('backgroundCover', e.target.value)}
                        placeholder="/images/cover.jpg"
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none min-w-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Resume PDF Document</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        id="heroResumeFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await fileToBase64(file);
                              updateHeroMedia('resumePdf', b64);
                            } catch (err) {
                              showNotice('error', 'Failed to process resume file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('heroResumeFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Upload size={12} /> {heroMedia.resumePdf ? 'Attached ✓' : 'Upload'}
                      </button>
                      {heroMedia.resumePdf && (
                        <button
                          type="button"
                          onClick={() => updateHeroMedia('resumePdf', '')}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={heroMedia.resumePdf || ''}
                        onChange={(e) => updateHeroMedia('resumePdf', e.target.value)}
                        placeholder="/docs/resume.pdf"
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Profile Shape</label>
                      <select
                        value={heroMedia.profileShape}
                        onChange={(e) => updateHeroMedia('profileShape', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="rounded">Rounded Box</option>
                        <option value="circle">Perfect Circle</option>
                        <option value="square">Square</option>
                        <option value="glass">Glass Card Frame</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Glow Tone</label>
                      <select
                        value={heroMedia.glowColor}
                        onChange={(e) => updateHeroMedia('glowColor', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="gradient">Custom Gradient</option>
                        <option value="purple">Neon Purple</option>
                        <option value="blue">Neon Blue</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Interactive Effects</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'floating', label: 'Floating Wave' },
                        { id: 'parallax', label: 'Parallax shift' },
                        { id: 'hoverRotate', label: 'Tilt on hover' },
                        { id: 'neonBorder', label: 'Neon Glow border' },
                        { id: 'spotlight', label: 'Spotlight tracking' }
                      ].map(effect => (
                        <label key={effect.id} className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 hover:text-white select-none">
                          <input
                            type="checkbox"
                            checked={(heroMedia.effects as any)[effect.id]}
                            onChange={(e) => updateHeroEffect(effect.id, e.target.checked)}
                            className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500/20"
                          />
                          {effect.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Taglines / Roles List */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Terminal size={16} className="text-pink-400" /> Dynamic Roles (Typing Animation)
                </h3>

                <div className="space-y-3">
                  {data.personal.taglines.map((tag, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => {
                          const list = [...data.personal.taglines];
                          list[idx] = e.target.value;
                          setData({
                            ...data,
                            personal: { ...data.personal, taglines: list }
                          });
                        }}
                        className="flex-1 bg-zinc-900/60 border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                      />
                      <button
                        onClick={() => moveTagline(idx, 'up')}
                        disabled={idx === 0}
                        className="text-zinc-500 hover:text-white p-1 cursor-pointer disabled:opacity-30 shrink-0"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => moveTagline(idx, 'down')}
                        disabled={idx === data.personal.taglines.length - 1}
                        className="text-zinc-500 hover:text-white p-1 cursor-pointer disabled:opacity-30 shrink-0"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => deleteTagline(idx)}
                        className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-zinc-900">
                  <input
                    type="text"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    placeholder="Add new role tag (e.g. Cloud Enthusiast)"
                    className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addTagline();
                    }}
                  />
                  <Button variant="secondary" onClick={addTagline}>
                    Add Role
                  </Button>
                </div>
              </div>

              {/* CTA Button Manager */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <LinkIcon size={16} className="text-purple-400" /> CTA Button Manager
                </h3>

                <div className="space-y-4">
                  {ctas.map((cta, idx) => (
                    <div key={cta.id} className="bg-black/30 border border-zinc-900 rounded-2xl p-4 flex flex-col gap-3 relative group">
                      <div className="absolute top-4 right-4 flex items-center gap-1">
                        <button
                          onClick={() => moveCTA(idx, 'up')}
                          disabled={idx === 0}
                          className="text-zinc-500 hover:text-white p-1 cursor-pointer disabled:opacity-30"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveCTA(idx, 'down')}
                          disabled={idx === ctas.length - 1}
                          className="text-zinc-500 hover:text-white p-1 cursor-pointer disabled:opacity-30"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          onClick={() => deleteCTA(cta.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer ml-1"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-16">
                        <div>
                          <label className="text-[9px] text-zinc-600 font-bold uppercase">Button Label</label>
                          <input
                            type="text"
                            value={cta.label}
                            onChange={(e) => {
                              const list = [...ctas];
                              list[idx].label = e.target.value;
                              setData({
                                ...data,
                                personal: { ...data.personal, ctas: list }
                              });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <label className="text-[9px] text-zinc-600 font-bold uppercase">URL / Link Target</label>
                          <input
                            type="text"
                            value={cta.url}
                            onChange={(e) => {
                              const list = [...ctas];
                              list[idx].url = e.target.value;
                              setData({
                                ...data,
                                personal: { ...data.personal, ctas: list }
                              });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-zinc-600 font-bold uppercase">Style Type</label>
                          <select
                            value={cta.variant}
                            onChange={(e) => {
                              const list = [...ctas];
                              list[idx].variant = e.target.value;
                              setData({
                                ...data,
                                personal: { ...data.personal, ctas: list }
                              });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                          >
                            <option value="glow">Glowing Accent</option>
                            <option value="primary">Apple Solid White</option>
                            <option value="secondary">Glass Translucent</option>
                            <option value="ghost">Ghost Borderless</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-white">Create Custom Button</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={newCTA.label}
                      onChange={(e) => setNewCTA({ ...newCTA, label: e.target.value })}
                      placeholder="Button Label (e.g. Leetcode)"
                      className="bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newCTA.url}
                      onChange={(e) => setNewCTA({ ...newCTA, url: e.target.value })}
                      placeholder="Redirect URL (or #anchor)"
                      className="bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <select
                      value={newCTA.variant}
                      onChange={(e) => setNewCTA({ ...newCTA, variant: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option value="glow">Glowing Accent</option>
                      <option value="primary">Apple Solid White</option>
                      <option value="secondary">Glass Translucent</option>
                      <option value="ghost">Ghost Borderless</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="secondary" onClick={addCTA}>
                      <Plus size={14} /> Append CTA
                    </Button>
                  </div>
                </div>
              </div>

              {/* Personal Facts Panel */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Calendar size={16} className="text-green-400" /> Personal Facts Panel
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Coding Experience Age</label>
                    <input
                      type="text"
                      value={facts.yearsCoding}
                      onChange={(e) => updateAboutFactField('yearsCoding', e.target.value)}
                      placeholder="e.g. 3+ Years"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Work Timezone</label>
                    <input
                      type="text"
                      value={facts.timezone}
                      onChange={(e) => updateAboutFactField('timezone', e.target.value)}
                      placeholder="e.g. IST (UTC+5:30)"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Active Availability Switches</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'internship', label: 'Internship Ready' },
                      { id: 'fullTime', label: 'Full-time employment' },
                      { id: 'remote', label: 'Remote capable' },
                      { id: 'relocation', label: 'Relocation ready' }
                    ].map(avail => (
                      <label key={avail.id} className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 hover:text-white select-none">
                        <input
                          type="checkbox"
                          checked={(facts.availability as any)[avail.id]}
                          onChange={(e) => updateAboutAvailability(avail.id, e.target.checked)}
                          className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500/20"
                        />
                        {avail.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-300 hover:text-white select-none pt-2">
                    <input
                      type="checkbox"
                      checked={facts.openToOpportunities}
                      onChange={(e) => updateAboutFactField('openToOpportunities', e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-900 text-green-600 focus:ring-green-500/20"
                    />
                    Open to opportunities (Displays "✓ Active opportunities open" on Location card)
                  </label>
                </div>

                {/* Languages sub-editor */}
                <div className="pt-4 border-t border-zinc-900 space-y-3">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Languages Spoken</label>
                  <div className="flex flex-wrap gap-2">
                    {facts.languages.map((lang) => (
                      <span key={lang} className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 rounded-xl">
                        {lang}
                        <button
                          onClick={() => deleteLanguage(lang)}
                          className="text-zinc-600 hover:text-red-400 cursor-pointer text-[10px]"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 max-w-xs pt-1">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Add language (e.g. French)"
                      className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addLanguage();
                      }}
                    />
                    <Button variant="secondary" onClick={addLanguage}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Now Section Manager */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-500 animate-pulse" /> "Now" Active Focus
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Section title</label>
                    <input
                      type="text"
                      value={nowSection.title}
                      onChange={(e) => updateNowSectionField('title', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Focus list points */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Focus Bullets (Directly Editable)</label>
                    {nowSection.focus.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const list = [...nowSection.focus];
                            list[idx] = e.target.value;
                            setData({
                              ...data,
                              personal: {
                                ...data.personal,
                                about: {
                                  ...data.personal.about,
                                  nowSection: { ...nowSection, focus: list }
                                }
                              }
                            });
                          }}
                          className="flex-1 bg-zinc-900/60 border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                        />
                        <button
                          onClick={() => deleteFocusItem(idx)}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-zinc-900">
                    <input
                      type="text"
                      value={newFocus}
                      onChange={(e) => setNewFocus(e.target.value)}
                      placeholder="Add current focus bullet (e.g. Studying GCP architecture)"
                      className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addFocusItem();
                      }}
                    />
                    <Button variant="secondary" onClick={addFocusItem}>
                      Add Bullet
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-400" /> Stats Counters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {Object.keys(data.personal.stats).map((key) => (
                    <div key={key} className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">{key}</label>
                      <input
                        type="number"
                        value={(data.personal.stats as any)[key]}
                        onChange={(e) => updateStatsInfo(key, parseInt(e.target.value) || 0)}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social & Contact Links */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  <Globe size={16} className="text-blue-400" /> Social & Contact Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Email Address</label>
                    <input
                      type="email"
                      value={data.personal.socials?.email || ''}
                      onChange={(e) => updateSocialsInfo('email', e.target.value)}
                      placeholder="chandrustechie@gmail.com"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">LinkedIn URL</label>
                    <input
                      type="text"
                      value={data.personal.socials?.linkedin || ''}
                      onChange={(e) => updateSocialsInfo('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">GitHub URL</label>
                    <input
                      type="text"
                      value={data.personal.socials?.github || ''}
                      onChange={(e) => updateSocialsInfo('github', e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">WhatsApp Link (e.g. wa.me/...)</label>
                    <input
                      type="text"
                      value={data.personal.socials?.whatsapp || ''}
                      onChange={(e) => updateSocialsInfo('whatsapp', e.target.value)}
                      placeholder="https://wa.me/919876543210"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Calendly Booking Link</label>
                    <input
                      type="text"
                      value={data.personal.socials?.calendly || ''}
                      onChange={(e) => updateSocialsInfo('calendly', e.target.value)}
                      placeholder="https://calendly.com/username"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Twitter URL</label>
                    <input
                      type="text"
                      value={data.personal.socials?.twitter || ''}
                      onChange={(e) => updateSocialsInfo('twitter', e.target.value)}
                      placeholder="https://twitter.com/username"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Instagram URL</label>
                    <input
                      type="text"
                      value={data.personal.socials?.instagram || ''}
                      onChange={(e) => updateSocialsInfo('instagram', e.target.value)}
                      placeholder="https://instagram.com/username"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Resume Document URL</label>
                    <input
                      type="text"
                      value={data.personal.socials?.resume || ''}
                      onChange={(e) => updateSocialsInfo('resume', e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Resume Button Label</label>
                    <input
                      type="text"
                      value={data.personal.socials?.resumeLabel || ''}
                      onChange={(e) => updateSocialsInfo('resumeLabel', e.target.value)}
                      placeholder="Download Resume"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <h3 className="font-extrabold text-white text-base">Add Journey Milestone</h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Year</label>
                    <select
                      value={newTimeline.year}
                      onChange={(e) => setNewTimeline({ ...newTimeline, year: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      {['2023', '2024', '2025', '2026', '2027'].map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Month</label>
                    <select
                      value={newTimeline.month}
                      onChange={(e) => setNewTimeline({ ...newTimeline, month: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Type</label>
                    <select
                      value={newTimeline.type}
                      onChange={(e) => setNewTimeline({ ...newTimeline, type: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="education">Education</option>
                      <option value="internship">Internship</option>
                      <option value="leadership">Leadership</option>
                      <option value="project">Project</option>
                      <option value="award">Award</option>
                      <option value="achievement">Achievement</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Milestone Title</label>
                    <input
                      type="text"
                      value={newTimeline.title}
                      onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                      placeholder="e.g. Promoted to CSI Joint Secretary"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Organization</label>
                    <input
                      type="text"
                      value={newTimeline.organization}
                      onChange={(e) => setNewTimeline({ ...newTimeline, organization: e.target.value })}
                      placeholder="e.g. Infosys Springboard"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Cover Image</label>
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                        {newTimeline.image ? (
                          newTimeline.image.startsWith('/') || newTimeline.image.startsWith('data:') ? (
                            <img src={newTimeline.image} alt="Photo" className="w-full h-full object-cover" />
                          ) : (
                            <span>🖼️</span>
                          )
                        ) : (
                          <ImageIcon size={14} className="text-zinc-600" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="newTimelineImageFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 800, 600, false);
                              setNewTimeline({ ...newTimeline, image: b64 });
                            } catch (err) {
                              showNotice('error', 'Failed to process photo file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('newTimelineImageFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Upload size={12} /> Upload
                      </button>
                      {newTimeline.image && (
                        <button
                          type="button"
                          onClick={() => setNewTimeline({ ...newTimeline, image: '' })}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={newTimeline.image}
                        onChange={(e) => setNewTimeline({ ...newTimeline, image: e.target.value })}
                        placeholder="Path / Base64"
                        className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Verification Proof</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        id="newTimelineProofFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await fileToBase64(file);
                              setNewTimeline({ ...newTimeline, proof: b64 });
                            } catch (err) {
                              showNotice('error', 'Failed to process proof file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('newTimelineProofFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Upload size={12} /> {newTimeline.proof ? 'Attached ✓' : 'Upload'}
                      </button>
                      {newTimeline.proof && (
                        <button
                          type="button"
                          onClick={() => setNewTimeline({ ...newTimeline, proof: '' })}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={newTimeline.proof}
                        onChange={(e) => setNewTimeline({ ...newTimeline, proof: e.target.value })}
                        placeholder="Path / Base64"
                        className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Action Redirect Link (Optional)</label>
                    <input
                      type="text"
                      value={newTimeline.link}
                      onChange={(e) => setNewTimeline({ ...newTimeline, link: e.target.value })}
                      placeholder="e.g. https://event-details.com"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Description Narrative</label>
                  <input
                    type="text"
                    maxLength={150}
                    value={newTimeline.description}
                    onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                    placeholder="Enter short detail regarding what happened... (max 150 chars)"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                  <div className="text-[10px] text-zinc-500 text-right">{newTimeline.description.length}/150</div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button variant="glow" onClick={addTimelineItem}>
                    <Plus size={14} /> Append Milestone
                  </Button>
                </div>
              </div>

              {/* List Milestones */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <h3 className="font-extrabold text-white text-base">Active Milestones (Directly Editable)</h3>
                <div className="space-y-4">
                  {(() => {
                    const monthMap: Record<string, number> = {
                      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
                      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
                    };
                    const sortedTimeline = [...data.timeline].sort((a, b) => {
                      const yearA = parseInt(a.year || '0', 10) || 0;
                      const yearB = parseInt(b.year || '0', 10) || 0;
                      if (yearA !== yearB) return yearA - yearB;
                      const monthA = a.month ? (monthMap[a.month] || 0) : 0;
                      const monthB = b.month ? (monthMap[b.month] || 0) : 0;
                      if (monthA !== monthB) return monthA - monthB;
                      const timeA = parseInt(a.id.replace('t_', ''), 10) || 0;
                      const timeB = parseInt(b.id.replace('t_', ''), 10) || 0;
                      return timeA - timeB;
                    });
                    return sortedTimeline.map((item) => {
                      const idx = data.timeline.findIndex(t => t.id === item.id);
                      const isExpanded = expandedTimeline === item.id;
                      return (
                      <div 
                        key={item.id} 
                        id={`item-${item.id}`}
                        className="glass rounded-2xl border-white/5 overflow-hidden transition-all duration-300"
                      >
                        {/* Collapsed view header */}
                        <div 
                          className="p-4 flex gap-4 items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                          onClick={() => setExpandedTimeline(isExpanded ? null : item.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                              {item.image ? (
                                <img src={item.image} alt="Logo" className="w-full h-full object-cover" />
                              ) : (
                                <span>
                                  {item.type === 'education' && '🎓'}
                                  {item.type === 'internship' && '💼'}
                                  {item.type === 'award' && '🏆'}
                                  {item.type === 'leadership' && '👥'}
                                  {item.type === 'project' && '💻'}
                                  {item.type === 'achievement' && '🏅'}
                                  {!['education', 'internship', 'award', 'leadership', 'project', 'achievement'].includes(item.type || '') && '✨'}
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-extrabold text-white text-xs">{item.title || 'Untitled Milestone'}</h4>
                              <span className="text-[10px] text-zinc-500 font-medium">Year: {item.year} • Type: {item.type || 'event'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => reorderItem('timeline', idx, 'up')}
                              className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                              title="Move Up"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === data.timeline.length - 1}
                              onClick={() => reorderItem('timeline', idx, 'down')}
                              className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                              title="Move Down"
                            >
                              <ChevronDown size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTimelineItem(item.id)}
                              className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer shrink-0"
                              title="Delete Milestone"
                            >
                              <Trash2 size={14} />
                            </button>
                            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 rounded-lg cursor-pointer" onClick={() => setExpandedTimeline(isExpanded ? null : item.id)}>
                              {isExpanded ? 'Collapse' : 'Edit'}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Form details */}
                        {isExpanded && (
                          <div className="p-4 border-t border-zinc-900/60 bg-zinc-950/20 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase">Year</label>
                                <select
                                  value={item.year}
                                  onChange={(e) => {
                                    const list = [...data.timeline];
                                    list[idx].year = e.target.value;
                                    setData({ ...data, timeline: list });
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-purple-400 font-bold focus:outline-none"
                                >
                                  {['2023', '2024', '2025', '2026', '2027'].map(yr => (
                                    <option key={yr} value={yr}>{yr}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase">Month</label>
                                <select
                                  value={item.month || ''}
                                  onChange={(e) => {
                                    const list = [...data.timeline];
                                    list[idx].month = e.target.value;
                                    setData({ ...data, timeline: list });
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                >
                                  {['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase">Type</label>
                                <select
                                  value={item.type || 'achievement'}
                                  onChange={(e) => {
                                    const list = [...data.timeline];
                                    list[idx].type = e.target.value;
                                    setData({ ...data, timeline: list });
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                >
                                  <option value="education">Education</option>
                                  <option value="internship">Internship</option>
                                  <option value="leadership">Leadership</option>
                                  <option value="project">Project</option>
                                  <option value="award">Award</option>
                                  <option value="achievement">Achievement</option>
                                </select>
                              </div>
                              <div className="sm:col-span-2 space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase">Milestone Title</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => {
                                    const list = [...data.timeline];
                                    list[idx].title = e.target.value;
                                    setData({ ...data, timeline: list });
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase block">Organization</label>
                                <input
                                  type="text"
                                  value={item.organization || ''}
                                  onChange={(e) => {
                                    const list = [...data.timeline];
                                    list[idx].organization = e.target.value;
                                    setData({ ...data, timeline: list });
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[9px] text-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase block">Cover Image</label>
                                <div className="flex gap-2 items-center">
                                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-md overflow-hidden shrink-0">
                                    {item.image ? (
                                      item.image.startsWith('/') || item.image.startsWith('data:') ? (
                                        <img src={item.image} alt="Photo" className="w-full h-full object-cover" />
                                      ) : (
                                        <span>🖼️</span>
                                      )
                                    ) : (
                                      <ImageIcon size={12} className="text-zinc-600" />
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id={`timelineImageFile-${item.id}`}
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const b64 = await processImageFile(file, 800, 600, false);
                                          const list = [...data.timeline];
                                          list[idx].image = b64;
                                          setData({ ...data, timeline: list });
                                        } catch (err) {
                                          showNotice('error', 'Failed to process photo file');
                                        }
                                      }
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(`timelineImageFile-${item.id}`)?.click()}
                                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[9px] font-bold text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
                                  >
                                    <Upload size={10} /> Upload
                                  </button>
                                  {item.image && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const list = [...data.timeline];
                                        list[idx].image = '';
                                        setData({ ...data, timeline: list });
                                      }}
                                      className="text-red-400 hover:text-red-300 text-[9px] font-bold shrink-0"
                                    >
                                      Remove
                                    </button>
                                  )}
                                  <input
                                    type="text"
                                    value={item.image || ''}
                                    onChange={(e) => {
                                      const list = [...data.timeline];
                                      list[idx].image = e.target.value;
                                      setData({ ...data, timeline: list });
                                    }}
                                    placeholder="Path"
                                    className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[9px] text-zinc-300 focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase block">Verification Attachment</label>
                                <div className="flex gap-2 items-center">
                                  <input
                                    type="file"
                                    accept="application/pdf,image/*"
                                    id={`timelineProofFile-${item.id}`}
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const b64 = await fileToBase64(file);
                                          const list = [...data.timeline];
                                          list[idx].proof = b64;
                                          setData({ ...data, timeline: list });
                                        } catch (err) {
                                          showNotice('error', 'Failed to process proof file');
                                        }
                                      }
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById(`timelineProofFile-${item.id}`)?.click()}
                                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[9px] font-bold text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
                                  >
                                    <Upload size={10} /> {item.proof ? 'Attached ✓' : 'Upload'}
                                  </button>
                                  {item.proof && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const list = [...data.timeline];
                                        list[idx].proof = '';
                                        setData({ ...data, timeline: list });
                                      }}
                                      className="text-red-400 hover:text-red-300 text-[9px] font-bold shrink-0"
                                    >
                                      Remove
                                    </button>
                                  )}
                                  <input
                                    type="text"
                                    value={item.proof || ''}
                                    onChange={(e) => {
                                      const list = [...data.timeline];
                                      list[idx].proof = e.target.value;
                                      setData({ ...data, timeline: list });
                                    }}
                                    placeholder="Path"
                                    className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[9px] text-zinc-300 focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="space-y-0.5">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase">Redirect URL</label>
                                <input
                                  type="text"
                                  value={item.link || ''}
                                  onChange={(e) => {
                                    const list = [...data.timeline];
                                    list[idx].link = e.target.value;
                                    setData({ ...data, timeline: list });
                                  }}
                                  placeholder="e.g. https://details.com"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-650 font-bold uppercase">Description Narrative</label>
                              <textarea
                                rows={2}
                                maxLength={150}
                                value={item.description}
                                onChange={(e) => {
                                  const list = [...data.timeline];
                                  list[idx].description = e.target.value;
                                  setData({ ...data, timeline: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 resize-none focus:outline-none"
                              />
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: EXPERIENCE */}
          {activeTab === 'experience' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* ADD EXPERIENCE FORM */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <Briefcase size={16} className="text-purple-400" /> Add Employment Card
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="newFeatured"
                      checked={newExp.featured}
                      onChange={(e) => setNewExp({ ...newExp, featured: e.target.checked })}
                      className="hidden"
                    />
                    <label
                      htmlFor="newFeatured"
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                        newExp.featured
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      <Star size={11} fill={newExp.featured ? '#f59e0b' : 'none'} />
                      {newExp.featured ? 'Featured Card' : 'Regular Card'}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Company Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Company Name</label>
                    <input
                      type="text"
                      value={newExp.company}
                      onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                      placeholder="e.g. StratSchool"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Role Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Role Title</label>
                    <input
                      type="text"
                      value={newExp.role}
                      onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                      placeholder="e.g. AI Prototyping Intern"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Logo Image Upload */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Company Logo</label>
                    <div className="flex gap-2 items-center">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                        {newExp.logo ? (
                          newExp.logo.startsWith('/') || newExp.logo.startsWith('data:') ? (
                            <img src={newExp.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            newExp.logo
                          )
                        ) : (
                          <Briefcase size={14} className="text-zinc-600" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="newExpLogoFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 128, 128, true);
                              setNewExp({ ...newExp, logo: b64 });
                            } catch (err) {
                              showNotice('error', 'Failed to process logo file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('newExpLogoFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon size={12} /> Upload File
                      </button>
                      {newExp.logo && (
                        <button
                          type="button"
                          onClick={() => setNewExp({ ...newExp, logo: '' })}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        type="text"
                        value={newExp.logo}
                        onChange={(e) => setNewExp({ ...newExp, logo: e.target.value })}
                        placeholder="Or type path / emoji (e.g. 💼)"
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Category</label>
                    <select
                      value={newExp.category}
                      onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      {['Internship', 'Leadership', 'Full-time', 'Volunteer', 'Research', 'Campus Ambassador', 'Freelance', 'Startup', 'Hackathon'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Status</label>
                    <select
                      value={newExp.status}
                      onChange={(e) => setNewExp({ ...newExp, status: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Ongoing">🟢 Ongoing</option>
                      <option value="Completed">⚪ Completed</option>
                      <option value="Upcoming">🟡 Upcoming</option>
                    </select>
                  </div>

                  {/* Location Type Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Location Type</label>
                    <select
                      value={newExp.locationType}
                      onChange={(e) => setNewExp({ ...newExp, locationType: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Remote (Online)">🌐 Remote (Online)</option>
                      <option value="On-site (Offline)">🏢 On-site (Offline)</option>
                      <option value="Hybrid">🤝 Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Date pickers row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end bg-zinc-900/40 p-4 rounded-2xl border border-zinc-900">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 uppercase font-bold">From Month</label>
                    <select
                      value={newExp.fromMonth}
                      onChange={(e) => setNewExp({ ...newExp, fromMonth: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 uppercase font-bold">From Year</label>
                    <select
                      value={newExp.fromYear}
                      onChange={(e) => setNewExp({ ...newExp, fromYear: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    >
                      {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  {!newExp.currentlyWorking && (
                    <>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase font-bold">To Month</label>
                        <select
                          value={newExp.toMonth}
                          onChange={(e) => setNewExp({ ...newExp, toMonth: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        >
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase font-bold">To Year</label>
                        <select
                          value={newExp.toYear}
                          onChange={(e) => setNewExp({ ...newExp, toYear: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        >
                          {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className="h-9 flex items-center justify-start sm:col-span-1">
                    <label className="flex items-center gap-2 text-zinc-400 text-xs font-bold select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newExp.currentlyWorking}
                        onChange={(e) => setNewExp({ ...newExp, currentlyWorking: e.target.checked })}
                        className="rounded bg-zinc-900 border-zinc-800 text-purple-500 focus:ring-0 focus:ring-offset-0"
                      />
                      Currently Working Here
                    </label>
                  </div>
                </div>

                {/* Location Input (Only shown if Hybrid or On-site) */}
                {newExp.locationType !== 'Remote (Online)' && (
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Location Address / City</label>
                    <input
                      type="text"
                      value={newExp.location}
                      onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                      placeholder="e.g. Chennai, India"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                )}

                {/* Impact Metrics Section */}
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Impact Metrics</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {/* Team Size */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <span className="text-[9px] font-extrabold text-zinc-500 block uppercase">Team Size</span>
                      <input
                        type="number"
                        value={newExp.teamSize || ''}
                        onChange={(e) => setNewExp({ ...newExp, teamSize: Number(e.target.value) })}
                        placeholder="0"
                        className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                      />
                    </div>
                    {/* APIs Built */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <span className="text-[9px] font-extrabold text-zinc-500 block uppercase">APIs Built</span>
                      <input
                        type="number"
                        value={newExp.apisBuilt || ''}
                        onChange={(e) => setNewExp({ ...newExp, apisBuilt: Number(e.target.value) })}
                        placeholder="0"
                        className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                      />
                    </div>
                    {/* Students Reached */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <span className="text-[9px] font-extrabold text-zinc-500 block uppercase">Students Reached</span>
                      <input
                        type="number"
                        value={newExp.reached || ''}
                        onChange={(e) => setNewExp({ ...newExp, reached: Number(e.target.value) })}
                        placeholder="0"
                        className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                      />
                    </div>
                    {/* Projects */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <span className="text-[9px] font-extrabold text-zinc-500 block uppercase">Projects</span>
                      <input
                        type="number"
                        value={newExp.projects || ''}
                        onChange={(e) => setNewExp({ ...newExp, projects: Number(e.target.value) })}
                        placeholder="0"
                        className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                      />
                    </div>
                    {/* Events Conducted */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 space-y-1">
                      <span className="text-[9px] font-extrabold text-zinc-500 block uppercase">Events Conducted</span>
                      <input
                        type="number"
                        value={newExp.eventsConducted || ''}
                        onChange={(e) => setNewExp({ ...newExp, eventsConducted: Number(e.target.value) })}
                        placeholder="0"
                        className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Tech stack multi select checklist */}
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Tech Stack Selector</label>
                  <div className="flex flex-wrap gap-1.5 p-3 bg-zinc-950/60 rounded-2xl border border-zinc-900">
                    {['FastAPI', 'Python', 'AWS', 'MongoDB', 'Gemini', 'GitHub', 'React', 'TypeScript', 'Docker', 'CI/CD', 'JavaScript', 'CSS', 'MySQL', 'JWT', 'SQL', 'Pandas'].map((tech) => {
                      const tempArray = newExp.techInput ? newExp.techInput.split(',').map(t => t.trim()) : [];
                      const isSelected = tempArray.includes(tech);
                      return (
                        <button
                          type="button"
                          key={tech}
                          onClick={() => {
                            let newArray = [...tempArray];
                            if (isSelected) {
                              newArray = newArray.filter(t => t !== tech);
                            } else {
                              newArray.push(tech);
                            }
                            setNewExp({ ...newExp, techInput: newArray.join(', ') });
                          }}
                          className={`flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-semibold border transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-300'
                          }`}
                        >
                          {isSelected && <Check size={10} />}
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={newExp.techInput}
                    onChange={(e) => setNewExp({ ...newExp, techInput: e.target.value })}
                    placeholder="Or type custom items comma-separated (e.g. Next.js, Redis, PostgreSQL)"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* External links */}
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">External URLs</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <input
                      type="text"
                      value={newExp.github}
                      onChange={(e) => setNewExp({ ...newExp, github: e.target.value })}
                      placeholder="GitHub Link"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newExp.linkedin}
                      onChange={(e) => setNewExp({ ...newExp, linkedin: e.target.value })}
                      placeholder="LinkedIn Post URL"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newExp.certificate}
                      onChange={(e) => setNewExp({ ...newExp, certificate: e.target.value })}
                      placeholder="Certificate URL"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newExp.project}
                      onChange={(e) => setNewExp({ ...newExp, project: e.target.value })}
                      placeholder="Project Demo URL"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newExp.blog}
                      onChange={(e) => setNewExp({ ...newExp, blog: e.target.value })}
                      placeholder="Blog URL"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="glow" onClick={addExperienceItem}>
                    <Plus size={14} /> Append Experience Card
                  </Button>
                </div>
              </div>

              {/* LIST & EDIT EXISTING EXPERIENCE */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest pl-1">Modify Experience Stack</h4>
                {data.experience.map((exp, expIdx) => {
                  const tempArray = exp.tech || [];
                  const galleryList = exp.gallery || [];
                  const isExpanded = expandedExperience === exp.id;

                  const updateField = (field: string, value: any) => {
                    const list = [...data.experience];
                    list[expIdx] = { ...list[expIdx], [field]: value };
                    setData({ ...data, experience: list });
                  };

                  const updateMetrics = (field: string, value: number) => {
                    const list = [...data.experience];
                    const metrics = list[expIdx].metrics || {};
                    list[expIdx] = { 
                      ...list[expIdx], 
                      metrics: { ...metrics, [field]: value } 
                    };
                    setData({ ...data, experience: list });
                  };

                  const updateLinks = (field: string, value: string) => {
                    const list = [...data.experience];
                    const links = list[expIdx].links || {};
                    list[expIdx] = { 
                      ...list[expIdx], 
                      links: { ...links, [field]: value } 
                    };
                    setData({ ...data, experience: list });
                  };

                  const updateDates = (updates: Partial<typeof exp>) => {
                    const list = [...data.experience];
                    const item = { ...list[expIdx], ...updates };
                    item.period = item.currentlyWorking 
                      ? `${item.fromMonth || 'Jan'} ${item.fromYear || '2026'} - Present` 
                      : `${item.fromMonth || 'Jan'} ${item.fromYear || '2026'} - ${item.toMonth || 'Dec'} ${item.toYear || '2026'}`;
                    list[expIdx] = item;
                    setData({ ...data, experience: list });
                  };

                  const moveHighlight = (hlIdx: number, direction: 'up' | 'down') => {
                    const list = [...data.experience];
                    const highlights = [...list[expIdx].highlights];
                    if (direction === 'up' && hlIdx > 0) {
                      const temp = highlights[hlIdx];
                      highlights[hlIdx] = highlights[hlIdx - 1];
                      highlights[hlIdx - 1] = temp;
                    } else if (direction === 'down' && hlIdx < highlights.length - 1) {
                      const temp = highlights[hlIdx];
                      highlights[hlIdx] = highlights[hlIdx + 1];
                      highlights[hlIdx + 1] = temp;
                    }
                    list[expIdx].highlights = highlights;
                    setData({ ...data, experience: list });
                  };

                  return (
                    <div 
                      key={exp.id} 
                      id={`item-${exp.id}`}
                      className={`glass rounded-2xl border-white/5 overflow-hidden transition-all duration-300 ${
                        exp.featured ? 'ring-1 ring-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.04)] bg-amber-500/[0.01]' : ''
                      }`}
                    >
                      {/* Collapsed view header */}
                      <div 
                        className="p-4 flex gap-4 items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedExperience(isExpanded ? null : exp.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                            {exp.logo ? (
                              exp.logo.startsWith('/') || exp.logo.startsWith('data:') ? (
                                <img src={exp.logo} alt="Logo" className="w-full h-full object-cover" />
                              ) : (
                                <span>{exp.logo}</span>
                              )
                            ) : (
                              <span>💼</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-white text-xs">{exp.role || 'Untitled Role'}</h4>
                              {exp.featured && (
                                <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-[9px] font-extrabold text-amber-500 px-2 py-0.5 rounded-full">
                                  <Star size={8} className="fill-amber-500 text-amber-500" /> Featured
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-500 font-medium">{exp.company || 'Unknown Company'} • {exp.period || 'No Date'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => moveExperience(expIdx, 'up')}
                            disabled={expIdx === 0}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Card Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveExperience(expIdx, 'down')}
                            disabled={expIdx === data.experience.length - 1}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Card Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteExperienceItem(exp.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer shrink-0"
                            title="Delete Card"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 rounded-lg cursor-pointer" onClick={() => setExpandedExperience(isExpanded ? null : exp.id)}>
                            {isExpanded ? 'Collapse' : 'Edit'}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Form details */}
                      {isExpanded && (
                        <div className="p-4 border-t border-zinc-900/60 bg-zinc-950/20 space-y-4">
                          <div className="flex justify-between items-center border-b border-zinc-900/50 pb-3">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Employment Details</span>
                            <button
                              type="button"
                              onClick={() => updateField('featured', !exp.featured)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                exp.featured
                                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                              }`}
                            >
                              <Star size={10} fill={exp.featured ? '#f59e0b' : 'none'} />
                              {exp.featured ? 'Featured' : 'Make Featured'}
                            </button>
                          </div>

                          {/* Header Inputs Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Role Title</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => updateField('role', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Company Name</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateField('company', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Category</label>
                              <select
                                value={exp.category || 'Internship'}
                                onChange={(e) => updateField('category', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                {['Internship', 'Leadership', 'Full-time', 'Volunteer', 'Research', 'Campus Ambassador', 'Freelance', 'Startup', 'Hackathon'].map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Status</label>
                              <select
                                value={exp.status || 'Completed'}
                                onChange={(e) => updateField('status', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option value="Ongoing">🟢 Ongoing</option>
                                <option value="Completed">⚪ Completed</option>
                                <option value="Upcoming">🟡 Upcoming</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Location Type</label>
                              <select
                                value={exp.locationType || 'Remote (Online)'}
                                onChange={(e) => updateField('locationType', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option value="Remote (Online)">🌐 Remote (Online)</option>
                                <option value="On-site (Offline)">🏢 On-site (Offline)</option>
                                <option value="Hybrid">🤝 Hybrid</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Company Logo</label>
                              <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                                  {exp.logo ? (
                                    exp.logo.startsWith('/') || exp.logo.startsWith('data:') ? (
                                      <img src={exp.logo} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                      exp.logo
                                    )
                                  ) : (
                                    '💼'
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`expLogoFile-${exp.id}`}
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const b64 = await processImageFile(file, 128, 128, true);
                                        updateField('logo', b64);
                                      } catch (err) {
                                        showNotice('error', 'Failed to process logo image');
                                      }
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`expLogoFile-${exp.id}`)?.click()}
                                  className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[9px] font-bold text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <ImageIcon size={10} /> Upload
                                </button>
                                {exp.logo && (
                                  <button
                                    type="button"
                                    onClick={() => updateField('logo', '')}
                                    className="text-red-400 hover:text-red-300 text-[9px] font-bold shrink-0"
                                  >
                                    Remove
                                  </button>
                                )}
                                <input
                                  type="text"
                                  value={exp.logo || ''}
                                  onChange={(e) => updateField('logo', e.target.value)}
                                  placeholder="Path/Emoji"
                                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-[9px] text-white focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Location Input (Only shown if Hybrid or On-site) */}
                          {(exp.locationType || 'Remote (Online)') !== 'Remote (Online)' && (
                            <div className="space-y-1">
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Location Address / City</label>
                              <input
                                type="text"
                                value={exp.location || ''}
                                onChange={(e) => updateField('location', e.target.value)}
                                placeholder="e.g. Chennai, India"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          )}

                          {/* Dates row */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end bg-zinc-900/20 p-3.5 rounded-2xl border border-zinc-900/60">
                            <div>
                              <label className="text-[9px] text-zinc-500 uppercase font-bold">From Month</label>
                              <select
                                value={exp.fromMonth || 'Jan'}
                                onChange={(e) => updateDates({ fromMonth: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                              >
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-500 uppercase font-bold">From Year</label>
                              <select
                                value={exp.fromYear || '2026'}
                                onChange={(e) => updateDates({ fromYear: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                              >
                                {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map(y => (
                                  <option key={y} value={y}>{y}</option>
                                ))}
                              </select>
                            </div>
                            {!exp.currentlyWorking && (
                              <>
                                <div>
                                  <label className="text-[9px] text-zinc-500 uppercase font-bold">To Month</label>
                                  <select
                                    value={exp.toMonth || 'Dec'}
                                    onChange={(e) => updateDates({ toMonth: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                  >
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                                      <option key={m} value={m}>{m}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[9px] text-zinc-500 uppercase font-bold">To Year</label>
                                  <select
                                    value={exp.toYear || '2026'}
                                    onChange={(e) => updateDates({ toYear: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                  >
                                    {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map(y => (
                                      <option key={y} value={y}>{y}</option>
                                    ))}
                                  </select>
                                </div>
                              </>
                            )}
                            <div className="h-8 flex items-center">
                              <label className="flex items-center gap-2 text-zinc-500 text-xs font-semibold select-none cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!exp.currentlyWorking}
                                  onChange={(e) => updateDates({ currentlyWorking: e.target.checked })}
                                  className="rounded bg-zinc-900 border-zinc-800 text-purple-500 focus:ring-0 focus:ring-offset-0"
                                />
                                Currently Working
                              </label>
                            </div>
                          </div>

                          {/* Bullet Highlights Editor */}
                          <div className="space-y-2 border-t border-zinc-900 pt-4">
                            <div className="flex justify-between items-center">
                              <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Bullet Highlights (Edit in place)</label>
                              <span className="text-[9px] text-zinc-500">💡 Tip: Use **bold** for key words or metrics.</span>
                            </div>
                            <div className="space-y-2">
                              {exp.highlights.map((hl, hlIdx) => (
                                <div key={hlIdx} className="flex gap-2 items-center">
                                  <div className="flex items-center gap-0.5 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-900">
                                    <button
                                      type="button"
                                      onClick={() => moveHighlight(hlIdx, 'up')}
                                      disabled={hlIdx === 0}
                                      className="p-1 text-zinc-650 hover:text-white disabled:opacity-20"
                                    >
                                      <ChevronUp size={10} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => moveHighlight(hlIdx, 'down')}
                                      disabled={hlIdx === exp.highlights.length - 1}
                                      className="p-1 text-zinc-650 hover:text-white disabled:opacity-20"
                                    >
                                      <ChevronDown size={10} />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={hl}
                                    onChange={(e) => {
                                      const list = [...data.experience];
                                      const highlights = [...list[expIdx].highlights];
                                      highlights[hlIdx] = e.target.value;
                                      list[expIdx].highlights = highlights;
                                      setData({ ...data, experience: list });
                                    }}
                                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const list = [...data.experience];
                                      list[expIdx].highlights = list[expIdx].highlights.filter((_, i) => i !== hlIdx);
                                      setData({ ...data, experience: list });
                                    }}
                                    className="text-zinc-500 hover:text-red-400 p-1"
                                    title="Delete Highlight"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...data.experience];
                                  list[expIdx].highlights = [...list[expIdx].highlights, ''];
                                  setData({ ...data, experience: list });
                                }}
                                className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[9px] font-bold text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              >
                                <Plus size={10} /> Add Highlight Bullet
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 border-t border-zinc-900 pt-4">
                            <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Tech Stack Tags</label>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-950/40 rounded-xl border border-zinc-900">
                          {['FastAPI', 'Python', 'AWS', 'MongoDB', 'Gemini', 'GitHub', 'React', 'TypeScript', 'Docker', 'CI/CD', 'JavaScript', 'CSS', 'MySQL', 'JWT', 'SQL', 'Pandas'].map((tName) => {
                            const isSel = tempArray.includes(tName);
                            return (
                              <button
                                type="button"
                                key={tName}
                                onClick={() => {
                                  let list;
                                  if (isSel) {
                                    list = tempArray.filter(t => t !== tName);
                                  } else {
                                    list = [...tempArray, tName];
                                  }
                                  updateField('tech', list);
                                }}
                                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold border transition-all cursor-pointer ${
                                  isSel
                                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-400'
                                }`}
                              >
                                {isSel && <Check size={8} />}
                                {tName}
                              </button>
                            );
                          })}
                        </div>
                        {/* Custom input */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const val = fd.get('customTech') as string;
                            if (val && !tempArray.includes(val.trim())) {
                              updateField('tech', [...tempArray, val.trim()]);
                              e.currentTarget.reset();
                            }
                          }}
                          className="flex gap-2 max-w-xs"
                        >
                          <input
                            name="customTech"
                            type="text"
                            placeholder="Add custom tech tag (e.g. Next.js)"
                            className="bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-lg px-2.5 py-1 text-[10px] text-white focus:outline-none flex-1"
                          />
                          <button type="submit" className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-300 hover:text-white cursor-pointer font-bold transition-colors">
                            Add
                          </button>
                        </form>
                      </div>

                      {/* Impact Metrics */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Impact Metrics</label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                            <span className="text-[8px] font-bold text-zinc-500 block uppercase">Team Size</span>
                            <input
                              type="number"
                              value={exp.metrics?.teamSize || ''}
                              onChange={(e) => updateMetrics('teamSize', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                            <span className="text-[8px] font-bold text-zinc-500 block uppercase">APIs Built</span>
                            <input
                              type="number"
                              value={exp.metrics?.apisBuilt || ''}
                              onChange={(e) => updateMetrics('apisBuilt', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                            <span className="text-[8px] font-bold text-zinc-500 block uppercase">Reached</span>
                            <input
                              type="number"
                              value={exp.metrics?.reached || ''}
                              onChange={(e) => updateMetrics('reached', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                            <span className="text-[8px] font-bold text-zinc-500 block uppercase">Projects</span>
                            <input
                              type="number"
                              value={exp.metrics?.projects || ''}
                              onChange={(e) => updateMetrics('projects', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                            />
                          </div>
                          <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900 space-y-1">
                            <span className="text-[8px] font-bold text-zinc-500 block uppercase">Events</span>
                            <input
                              type="number"
                              value={exp.metrics?.eventsConducted || ''}
                              onChange={(e) => updateMetrics('eventsConducted', Number(e.target.value))}
                              placeholder="0"
                              className="w-full bg-transparent border-0 text-white font-bold text-xs focus:ring-0 focus:outline-none p-0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">External Links</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                          <div>
                            <span className="text-[8px] text-zinc-600 block uppercase mb-0.5">GitHub</span>
                            <input
                              type="text"
                              value={exp.links?.github || ''}
                              onChange={(e) => updateLinks('github', e.target.value)}
                              placeholder="GitHub Link"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[8px] text-zinc-600 block uppercase mb-0.5">LinkedIn Post</span>
                            <input
                              type="text"
                              value={exp.links?.linkedin || ''}
                              onChange={(e) => updateLinks('linkedin', e.target.value)}
                              placeholder="LinkedIn Link"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[8px] text-zinc-600 block uppercase mb-0.5">Certificate</span>
                            <input
                              type="text"
                              value={exp.links?.certificate || ''}
                              onChange={(e) => updateLinks('certificate', e.target.value)}
                              placeholder="Cert PDF / URL"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[8px] text-zinc-600 block uppercase mb-0.5">Project Demo</span>
                            <input
                              type="text"
                              value={exp.links?.project || ''}
                              onChange={(e) => updateLinks('project', e.target.value)}
                              placeholder="Demo Link"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[8px] text-zinc-600 block uppercase mb-0.5">Blog Link</span>
                            <input
                              type="text"
                              value={exp.links?.blog || ''}
                              onChange={(e) => updateLinks('blog', e.target.value)}
                              placeholder="Blog URL"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Media Gallery */}
                      <div className="space-y-3 border-t border-zinc-900 pt-4">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Media Gallery</label>
                        
                        {/* Display uploaded images */}
                        {galleryList.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 p-2 bg-zinc-950 rounded-2xl border border-zinc-900">
                            {galleryList.map((imgSrc, imgIdx) => (
                              <div key={imgIdx} className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group">
                                <img src={imgSrc} alt="Gallery item" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const list = [...data.experience];
                                    const g = (list[expIdx].gallery || []).filter((_, i) => i !== imgIdx);
                                    list[expIdx] = { ...list[expIdx], gallery: g };
                                    setData({ ...data, experience: list });
                                  }}
                                  className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer font-bold text-xs"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Upload buttons */}
                        <div className="flex flex-wrap gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            id={`expGalleryFile-${exp.id}`}
                            className="hidden"
                            onChange={async (e) => {
                              const files = e.target.files;
                              if (files) {
                                const newImages: string[] = [];
                                for (let i = 0; i < files.length; i++) {
                                  try {
                                    const b64 = await processImageFile(files[i], 600, 450, false);
                                    newImages.push(b64);
                                  } catch (err) {
                                    showNotice('error', 'Failed to process gallery file');
                                  }
                                }
                                updateField('gallery', [...galleryList, ...newImages]);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById(`expGalleryFile-${exp.id}`)?.click()}
                            className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-semibold text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Plus size={10} /> Upload Proof / Screenshot
                          </button>
                        </div>
                      </div>

                      {/* AI Summary */}
                      <div className="space-y-2 border-t border-zinc-900 pt-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">AI Generated Summary</label>
                          <button
                            type="button"
                            onClick={() => {
                              const summary = generateExperienceAISummary(exp);
                              updateField('aiSummary', summary);
                              showNotice('success', 'Summary generated using metrics and highlights.');
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-purple-600/20 border border-purple-500/30 hover:border-purple-500 text-[10px] font-bold text-purple-300 rounded-lg cursor-pointer transition-all hover:shadow-[0_0_10px_rgba(147,51,234,0.1)]"
                          >
                            <Sparkles size={10} /> ✨ Generate Summary
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={exp.aiSummary || ''}
                          onChange={(e) => updateField('aiSummary', e.target.value)}
                          placeholder="Describe the overall narrative story of this experience. This will show inside the 'View Experience Story' modal."
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300 focus:outline-none resize-none"
                        />
                      </div>

                      {/* Publishing Status & Scheduled Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900 pt-4">
                        <div className="space-y-0.5">
                          <label className="text-[9px] text-zinc-500 font-bold uppercase block">Publishing Status</label>
                          <select
                            value={exp.publishStatus || 'published'}
                            onChange={(e) => updateField('publishStatus', e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                          >
                            <option value="published">🟢 Published</option>
                            <option value="draft">🟡 Draft</option>
                          </select>
                        </div>
                        <div className="space-y-0.5">
                          <label className="text-[9px] text-zinc-500 font-bold uppercase block">Scheduled Publishing Date</label>
                          <input
                            type="datetime-local"
                            value={exp.publishedAt ? new Date(new Date(exp.publishedAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                            onChange={(e) => updateField('publishedAt', e.target.value ? new Date(e.target.value).toISOString() : null)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: LEADERSHIP */}
          {activeTab === 'leadership' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <h3 className="font-extrabold text-white text-base">Add Community Leadership Position</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Role Title</label>
                    <input
                      type="text"
                      value={newLeadership.role}
                      onChange={(e) => setNewLeadership({ ...newLeadership, role: e.target.value })}
                      placeholder="e.g. CSI Joint Secretary"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Organization</label>
                    <input
                      type="text"
                      value={newLeadership.organization}
                      onChange={(e) => setNewLeadership({ ...newLeadership, organization: e.target.value })}
                      placeholder="e.g. Computer Society of India"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Role Category</label>
                    <select
                      value={newLeadership.category}
                      onChange={(e) => setNewLeadership({ ...newLeadership, category: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      {['Student Chapter', 'Community Leader', 'Campus Ambassador', 'Academic Representative', 'Volunteer Organizer', 'Internship', 'Leadership', 'Volunteer', 'Research'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date / Timeframe Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">From Month</label>
                    <select
                      value={newLeadership.fromMonth}
                      onChange={(e) => setNewLeadership({ ...newLeadership, fromMonth: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">From Year</label>
                    <select
                      value={newLeadership.fromYear}
                      onChange={(e) => setNewLeadership({ ...newLeadership, fromYear: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">To Month</label>
                    <select
                      value={newLeadership.toMonth}
                      onChange={(e) => setNewLeadership({ ...newLeadership, toMonth: e.target.value })}
                      disabled={newLeadership.currentlyActive}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none disabled:opacity-40"
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">To Year</label>
                    <select
                      value={newLeadership.toYear}
                      onChange={(e) => setNewLeadership({ ...newLeadership, toYear: e.target.value })}
                      disabled={newLeadership.currentlyActive}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none disabled:opacity-40"
                    >
                      {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <input
                      type="checkbox"
                      id="newLeadActive"
                      checked={newLeadership.currentlyActive}
                      onChange={(e) => setNewLeadership({ ...newLeadership, currentlyActive: e.target.checked })}
                      className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="newLeadActive" className="text-xs text-zinc-400 font-bold select-none cursor-pointer">
                      Currently Active
                    </label>
                  </div>
                </div>

                {/* Logo Uploader / Fallback */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Organization Logo</label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
                        {newLeadership.logo && newLeadership.logo.startsWith('data:image') ? (
                          <img src={newLeadership.logo} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">{newLeadership.logo || '💼'}</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="newLeadLogoFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 128, 128, true);
                              setNewLeadership({ ...newLeadership, logo: b64 });
                            } catch (err) {
                              showNotice('error', 'Failed to process logo file');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('newLeadLogoFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon size={12} /> Upload File
                      </button>
                      {newLeadership.logo && (
                        <button
                          type="button"
                          onClick={() => setNewLeadership({ ...newLeadership, logo: '' })}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Fallback Emoji / Icon</label>
                    <input
                      type="text"
                      value={newLeadership.logo?.startsWith('data:image') ? '' : newLeadership.logo}
                      onChange={(e) => setNewLeadership({ ...newLeadership, logo: e.target.value })}
                      placeholder="e.g. 👥, 🏆, 💼"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-2 self-end">
                    <input
                      type="checkbox"
                      id="newLeadFeatured"
                      checked={newLeadership.featured}
                      onChange={(e) => setNewLeadership({ ...newLeadership, featured: e.target.checked })}
                      className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="newLeadFeatured" className="text-xs text-zinc-400 font-bold select-none cursor-pointer flex items-center gap-1">
                      <Star size={12} className={newLeadership.featured ? "text-yellow-500 fill-yellow-500" : "text-zinc-600"} />
                      Featured Card (Hero Section)
                    </label>
                  </div>
                </div>

                {/* Tagline */}
                <div className="space-y-1 border-t border-zinc-900/50 pt-4">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Hero Card Tagline</label>
                  <input
                    type="text"
                    value={newLeadership.tagline}
                    onChange={(e) => setNewLeadership({ ...newLeadership, tagline: e.target.value })}
                    placeholder="e.g. Spearheading student innovation and technological outreach across campus"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Events Conducted</label>
                    <input
                      type="number"
                      value={newLeadership.eventsConducted}
                      onChange={(e) => setNewLeadership({ ...newLeadership, eventsConducted: Number(e.target.value) })}
                      placeholder="e.g. 10"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Students Reached</label>
                    <input
                      type="number"
                      value={newLeadership.studentsReached}
                      onChange={(e) => setNewLeadership({ ...newLeadership, studentsReached: Number(e.target.value) })}
                      placeholder="e.g. 500"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Volunteers Managed</label>
                    <input
                      type="number"
                      value={newLeadership.volunteersCount}
                      onChange={(e) => setNewLeadership({ ...newLeadership, volunteersCount: Number(e.target.value) })}
                      placeholder="e.g. 25"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Sponsorships Closed</label>
                    <input
                      type="number"
                      value={newLeadership.sponsorsClosed}
                      onChange={(e) => setNewLeadership({ ...newLeadership, sponsorsClosed: Number(e.target.value) })}
                      placeholder="e.g. 3"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* External Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">LinkedIn Announcement URL</label>
                    <input
                      type="text"
                      value={newLeadership.linkedin}
                      onChange={(e) => setNewLeadership({ ...newLeadership, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">GitHub Repo / Org Link</label>
                    <input
                      type="text"
                      value={newLeadership.github}
                      onChange={(e) => setNewLeadership({ ...newLeadership, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Certificate/Credential Link</label>
                    <input
                      type="text"
                      value={newLeadership.certificate}
                      onChange={(e) => setNewLeadership({ ...newLeadership, certificate: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Event or Project Website</label>
                    <input
                      type="text"
                      value={newLeadership.project}
                      onChange={(e) => setNewLeadership({ ...newLeadership, project: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Gallery Images / Proof */}
                <div className="space-y-2 border-t border-zinc-900/50 pt-4">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Gallery Images / Proof / CSI Installation Photos</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id="newLeadGalleryFile"
                      className="hidden"
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (files) {
                          const newImages: string[] = [];
                          for (let i = 0; i < files.length; i++) {
                            try {
                              const b64 = await processImageFile(files[i], 600, 450, false);
                              newImages.push(b64);
                            } catch (err) {
                              showNotice('error', 'Failed to process gallery file');
                            }
                          }
                          const currentVal = newLeadership.galleryInput ? newLeadership.galleryInput.split(',').map(s => s.trim()).filter(Boolean) : [];
                          setNewLeadership({ ...newLeadership, galleryInput: [...currentVal, ...newImages].join(', ') });
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('newLeadGalleryFile')?.click()}
                      className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ImageIcon size={12} /> Upload Gallery Images
                    </button>
                    <span className="text-[10px] text-zinc-500 font-medium">
                      {(newLeadership.galleryInput ? newLeadership.galleryInput.split(',').filter(Boolean).length : 0)} files uploaded
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={newLeadership.galleryInput}
                    onChange={(e) => setNewLeadership({ ...newLeadership, galleryInput: e.target.value })}
                    placeholder="Comma-separated image URLs or Base64 data (Auto-populated on upload)"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-zinc-300 focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1 border-t border-zinc-900/50 pt-4">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Role Description Summary</label>
                  <textarea
                    rows={3}
                    value={newLeadership.description}
                    onChange={(e) => setNewLeadership({ ...newLeadership, description: e.target.value })}
                    placeholder="Describe your responsibilities, coordination, and community reach..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button variant="glow" onClick={addLeadershipItem}>
                    <Plus size={14} /> Append Role
                  </Button>
                </div>
              </div>

              {/* List Leadership Cards */}
              <div className="space-y-4">
                {data.leadership.map((lead, leadIdx) => {
                  const galleryList = lead.gallery || [];
                  const isExpanded = expandedLeadership === lead.id;
                  return (
                    <div 
                      key={lead.id} 
                      id={`item-${lead.id}`}
                      className="glass rounded-2xl border-white/5 overflow-hidden transition-all duration-300"
                    >
                      {/* Collapsed view header */}
                      <div 
                        className="p-4 flex gap-4 items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedLeadership(isExpanded ? null : lead.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                            {lead.logo && lead.logo.startsWith('data:image') ? (
                              <img src={lead.logo} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg">{lead.logo || '👥'}</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-white text-xs">{lead.role || 'Untitled Role'}</h4>
                              {lead.featured && (
                                <span className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/30 text-[9px] font-extrabold text-yellow-500 px-2 py-0.5 rounded-full">
                                  <Star size={8} className="fill-yellow-500 text-yellow-500" /> Featured Hero
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-500 font-medium">{lead.organization || 'Unknown Organization'} • {lead.period || 'No Date'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => moveLeadership(leadIdx, 'up')}
                            disabled={leadIdx === 0}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveLeadership(leadIdx, 'down')}
                            disabled={leadIdx === data.leadership.length - 1}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteLeadershipItem(lead.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer shrink-0"
                            title="Delete Position"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 rounded-lg cursor-pointer" onClick={() => setExpandedLeadership(isExpanded ? null : lead.id)}>
                            {isExpanded ? 'Collapse' : 'Edit'}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Form details */}
                      {isExpanded && (
                        <div className="p-4 border-t border-zinc-900/60 bg-zinc-950/20 space-y-4">
                          {/* Editing Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Role Title</label>
                              <input
                                type="text"
                                value={lead.role}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].role = e.target.value;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Organization</label>
                              <input
                                type="text"
                                value={lead.organization}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].organization = e.target.value;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Role Category</label>
                              <select
                                value={lead.category || 'Student Chapter'}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].category = e.target.value;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              >
                                {['Student Chapter', 'Community Leader', 'Campus Ambassador', 'Academic Representative', 'Volunteer Organizer', 'Internship', 'Leadership', 'Volunteer', 'Research'].map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Date picker for existing card */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">From Month</label>
                              <select
                                value={lead.fromMonth || 'Jan'}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].fromMonth = e.target.value;
                                  list[leadIdx].period = list[leadIdx].currentlyActive
                                    ? `${e.target.value} ${list[leadIdx].fromYear || '2026'} - Present`
                                    : `${e.target.value} ${list[leadIdx].fromYear || '2026'} - ${list[leadIdx].toMonth || 'Dec'} ${list[leadIdx].toYear || '2026'}`;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              >
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">From Year</label>
                              <select
                                value={lead.fromYear || '2026'}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].fromYear = e.target.value;
                                  list[leadIdx].period = list[leadIdx].currentlyActive
                                    ? `${list[leadIdx].fromMonth || 'Jan'} ${e.target.value} - Present`
                                    : `${list[leadIdx].fromMonth || 'Jan'} ${e.target.value} - ${list[leadIdx].toMonth || 'Dec'} ${list[leadIdx].toYear || '2026'}`;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              >
                                {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map((y) => (
                                  <option key={y} value={y}>{y}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">To Month</label>
                              <select
                                value={lead.toMonth || 'Dec'}
                                disabled={lead.currentlyActive}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].toMonth = e.target.value;
                                  list[leadIdx].period = `${list[leadIdx].fromMonth || 'Jan'} ${list[leadIdx].fromYear || '2026'} - ${e.target.value} ${list[leadIdx].toYear || '2026'}`;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none disabled:opacity-40"
                              >
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">To Year</label>
                              <select
                                value={lead.toYear || '2026'}
                                disabled={lead.currentlyActive}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].toYear = e.target.value;
                                  list[leadIdx].period = `${list[leadIdx].fromMonth || 'Jan'} ${list[leadIdx].fromYear || '2026'} - ${list[leadIdx].toMonth || 'Dec'} ${e.target.value}`;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none disabled:opacity-40"
                              >
                                {Array.from({ length: 11 }, (_, i) => String(2020 + i)).map((y) => (
                                  <option key={y} value={y}>{y}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex items-center gap-2 pb-2">
                              <input
                                type="checkbox"
                                id={`leadActive-${lead.id}`}
                                checked={lead.currentlyActive || false}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].currentlyActive = e.target.checked;
                                  list[leadIdx].period = e.target.checked
                                    ? `${list[leadIdx].fromMonth || 'Jan'} ${list[leadIdx].fromYear || '2026'} - Present`
                                    : `${list[leadIdx].fromMonth || 'Jan'} ${list[leadIdx].fromYear || '2026'} - ${list[leadIdx].toMonth || 'Dec'} ${list[leadIdx].toYear || '2026'}`;
                                  setData({ ...data, leadership: list });
                                }}
                                className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500"
                              />
                              <label htmlFor={`leadActive-${lead.id}`} className="text-xs text-zinc-400 font-bold select-none cursor-pointer">
                                Currently Active
                              </label>
                            </div>
                          </div>

                          {/* Logo, Star Featured */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Organization Logo</label>
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
                                  {lead.logo && lead.logo.startsWith('data:image') ? (
                                    <img src={lead.logo} alt="Preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-xl">{lead.logo || '💼'}</span>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`leadLogoFile-${lead.id}`}
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const b64 = await processImageFile(file, 128, 128, true);
                                        const list = [...data.leadership];
                                        list[leadIdx].logo = b64;
                                        setData({ ...data, leadership: list });
                                      } catch (err) {
                                        showNotice('error', 'Failed to process logo file');
                                      }
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`leadLogoFile-${lead.id}`)?.click()}
                                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <ImageIcon size={12} /> Upload File
                                </button>
                                {lead.logo && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const list = [...data.leadership];
                                      list[leadIdx].logo = '';
                                      setData({ ...data, leadership: list });
                                    }}
                                    className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Fallback Emoji / Icon</label>
                              <input
                                type="text"
                                value={lead.logo?.startsWith('data:image') ? '' : lead.logo || ''}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].logo = e.target.value;
                                  setData({ ...data, leadership: list });
                                }}
                                placeholder="e.g. 👥, 🏆, 💼"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 pb-2 self-end">
                              <input
                                type="checkbox"
                                id={`leadFeatured-${lead.id}`}
                                checked={lead.featured || false}
                                onChange={(e) => {
                                  let list = data.leadership.map((l, i) => {
                                    if (i === leadIdx) {
                                      return { ...l, featured: e.target.checked };
                                    }
                                    return e.target.checked ? { ...l, featured: false } : l;
                                  });
                                  setData({ ...data, leadership: list });
                                }}
                                className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500"
                              />
                              <label htmlFor={`leadFeatured-${lead.id}`} className="text-xs text-zinc-400 font-bold select-none cursor-pointer flex items-center gap-1">
                                <Star size={12} className={lead.featured ? "text-yellow-500 fill-yellow-500" : "text-zinc-600"} />
                                Featured (Hero Section)
                              </label>
                            </div>
                          </div>

                          {/* Tagline */}
                          <div className="space-y-1 border-t border-zinc-900/50 pt-3">
                            <label className="text-[9px] text-zinc-600 font-bold uppercase">Hero Card Tagline</label>
                            <input
                              type="text"
                              value={lead.tagline || ''}
                              onChange={(e) => {
                                const list = [...data.leadership];
                                list[leadIdx].tagline = e.target.value;
                                setData({ ...data, leadership: list });
                              }}
                              placeholder="e.g. Spearheading student innovation and technological outreach across campus"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>

                          {/* Impact Metrics */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Events Conducted</label>
                              <input
                                type="number"
                                value={lead.metrics?.eventsConducted || 0}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].metrics = {
                                    ...(list[leadIdx].metrics || {}),
                                    eventsConducted: Number(e.target.value) || 0
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Students Reached</label>
                              <input
                                type="number"
                                value={lead.metrics?.studentsReached || 0}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].metrics = {
                                    ...(list[leadIdx].metrics || {}),
                                    studentsReached: Number(e.target.value) || 0
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Volunteers Managed</label>
                              <input
                                type="number"
                                value={lead.metrics?.volunteersCount || 0}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].metrics = {
                                    ...(list[leadIdx].metrics || {}),
                                    volunteersCount: Number(e.target.value) || 0
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Sponsorships Closed</label>
                              <input
                                type="number"
                                value={lead.metrics?.sponsorsClosed || 0}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].metrics = {
                                    ...(list[leadIdx].metrics || {}),
                                    sponsorsClosed: Number(e.target.value) || 0
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* External Links */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">LinkedIn Announcement URL</label>
                              <input
                                type="text"
                                value={lead.links?.linkedin || ''}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].links = {
                                    ...(list[leadIdx].links || {}),
                                    linkedin: e.target.value
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                placeholder="https://linkedin.com/..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">GitHub Repo / Org Link</label>
                              <input
                                type="text"
                                value={lead.links?.github || ''}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].links = {
                                    ...(list[leadIdx].links || {}),
                                    github: e.target.value
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                placeholder="https://github.com/..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Certificate Link</label>
                              <input
                                type="text"
                                value={lead.links?.certificate || ''}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].links = {
                                    ...(list[leadIdx].links || {}),
                                    certificate: e.target.value
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                placeholder="https://..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Event/Project Website</label>
                              <input
                                type="text"
                                value={lead.links?.project || ''}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].links = {
                                    ...(list[leadIdx].links || {}),
                                    project: e.target.value
                                  };
                                  setData({ ...data, leadership: list });
                                }}
                                placeholder="https://..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Gallery Editor for Existing Card */}
                          <div className="space-y-2 border-t border-zinc-900/50 pt-3">
                            <label className="text-[9px] text-zinc-600 font-bold uppercase block">Gallery / CSI Installation Photos</label>
                            
                            {galleryList.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {galleryList.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative w-16 h-12 rounded-lg border border-zinc-800 overflow-hidden group/thumb">
                                    <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const list = [...data.leadership];
                                        list[leadIdx].gallery = galleryList.filter((_, idx) => idx !== imgIdx);
                                        setData({ ...data, leadership: list });
                                      }}
                                      className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity text-[10px] font-bold cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-4">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                id={`leadGalleryFile-${lead.id}`}
                                className="hidden"
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (files) {
                                    const newImages: string[] = [];
                                    for (let i = 0; i < files.length; i++) {
                                      try {
                                        const b64 = await processImageFile(files[i], 600, 450, false);
                                        newImages.push(b64);
                                      } catch (err) {
                                        showNotice('error', 'Failed to process gallery file');
                                      }
                                    }
                                    const list = [...data.leadership];
                                    list[leadIdx].gallery = [...galleryList, ...newImages];
                                    setData({ ...data, leadership: list });
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById(`leadGalleryFile-${lead.id}`)?.click()}
                                className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                              >
                                <ImageIcon size={12} /> Upload Gallery Images
                              </button>
                            </div>
                          </div>

                          {/* Description Summary */}
                          <div className="space-y-0.5 border-t border-zinc-900/50 pt-3">
                            <label className="text-[9px] text-zinc-655 font-bold uppercase">Description</label>
                            <textarea
                              rows={3}
                              value={lead.description}
                              onChange={(e) => {
                                const list = [...data.leadership];
                                list[leadIdx].description = e.target.value;
                                setData({ ...data, leadership: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                            />
                          </div>

                          {/* Publishing Status & Scheduled Date */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900/50 pt-3">
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-550 font-bold uppercase block">Publishing Status</label>
                              <select
                                value={lead.publishStatus || 'published'}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].publishStatus = e.target.value;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option value="published">🟢 Published</option>
                                <option value="draft">🟡 Draft</option>
                              </select>
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-550 font-bold uppercase block">Scheduled Publishing Date</label>
                              <input
                                type="datetime-local"
                                value={lead.publishedAt ? new Date(new Date(lead.publishedAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                                onChange={(e) => {
                                  const list = [...data.leadership];
                                  list[leadIdx].publishedAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                  setData({ ...data, leadership: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 5: PROJECTS */}
          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <h3 className="font-extrabold text-white text-base">Add Portfolio Project Card</h3>
                
                {/* General Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Project Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. MedCare"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Category Scope</label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Project Duration</label>
                    <input
                      type="text"
                      value={newProject.duration}
                      onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                      placeholder="e.g. 2 months"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Project Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      {['Live', 'Completed', 'Archived', 'Ongoing'].map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Difficulty Level</label>
                    <select
                      value={newProject.difficulty}
                      onChange={(e) => setNewProject({ ...newProject, difficulty: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    >
                      {['Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Team Size</label>
                    <input
                      type="number"
                      value={newProject.teamSize}
                      onChange={(e) => setNewProject({ ...newProject, teamSize: Number(e.target.value) || 1 })}
                      placeholder="e.g. 1"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <input
                      type="checkbox"
                      id="newProjFeatured"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                      className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="newProjFeatured" className="text-xs text-zinc-400 font-bold select-none cursor-pointer flex items-center gap-1">
                      <Star size={12} className={newProject.featured ? "text-yellow-500 fill-yellow-500" : "text-zinc-600"} />
                      Featured Project ⭐
                    </label>
                  </div>
                </div>

                {/* Tech Stack Search + Tags selector */}
                <div className="space-y-2 border-t border-zinc-900/50 pt-4">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">
                    Tech Stack Ecosystem (Search & Add Tags)
                  </label>
                  
                  {/* Selected Tags list */}
                  <div className="flex flex-wrap gap-1.5 min-h-8 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    {(() => {
                      const currentTags = newProject.tempTech ? newProject.tempTech.split(',').map(s => s.trim()).filter(Boolean) : [];
                      if (currentTags.length === 0) {
                        return <span className="text-[10px] text-zinc-600 italic">No tags selected yet. Type to search and add tags below.</span>;
                      }
                      return currentTags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md font-semibold">
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = currentTags.filter(t => t !== tag);
                              setNewProject({ ...newProject, tempTech: updated.join(', ') });
                            }}
                            className="hover:text-red-400 text-[8px] ml-1 cursor-pointer font-bold"
                          >
                            ✕
                          </button>
                        </span>
                      ));
                    })()}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={newProjectTechSearch}
                      onChange={(e) => setNewProjectTechSearch(e.target.value)}
                      placeholder="Type to search e.g. React, FastAPI, Next.js... (Press Enter to add custom tag)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = newProjectTechSearch.trim();
                          if (val) {
                            const currentTags = newProject.tempTech ? newProject.tempTech.split(',').map(s => s.trim()).filter(Boolean) : [];
                            if (!currentTags.includes(val)) {
                              setNewProject({ ...newProject, tempTech: [...currentTags, val].join(', ') });
                            }
                            setNewProjectTechSearch('');
                          }
                        }
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />

                    {/* Suggestions dropdown list */}
                    {(() => {
                      const POPULAR_TECHS = [
                        'FastAPI', 'Python', 'Google Gemini API', 'WhatsApp API', 'Docker', 
                        'React', 'TensorFlow', 'Tailwind CSS', 'MongoDB', 'Next.js', 
                        'TypeScript', 'Redis', 'PostgreSQL', 'MySQL', 'JWT', 'Cryptography', 
                        'AWS', 'Node.js', 'Express', 'Django', 'Flask', 'GraphQL', 
                        'S3', 'EC2', 'Kubernetes', 'Redux', 'Prisma', 'Framer Motion', 
                        'Git', 'Vercel', 'NextAuth', 'Zustand', 'Sass', 'Figma'
                      ];
                      const currentTags = newProject.tempTech ? newProject.tempTech.split(',').map(s => s.trim()).filter(Boolean) : [];
                      const suggestions = newProjectTechSearch.trim()
                        ? POPULAR_TECHS.filter(t => t.toLowerCase().includes(newProjectTechSearch.toLowerCase()) && !currentTags.includes(t))
                        : [];
                      if (suggestions.length === 0) return null;
                      return (
                        <div className="absolute left-0 right-0 mt-1 max-h-32 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl z-20 shadow-xl p-1 flex flex-col gap-0.5">
                          {suggestions.map((tech) => (
                            <button
                              key={tech}
                              type="button"
                              onClick={() => {
                                setNewProject({ ...newProject, tempTech: [...currentTags, tech].join(', ') });
                                setNewProjectTechSearch('');
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-xs text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Project Links & Video */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">GitHub Repository Link</label>
                    <input
                      type="text"
                      value={newProject.github}
                      onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Live Redirection Link (or #)</label>
                    <input
                      type="text"
                      value={newProject.live}
                      onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Demo Video / GIF URL</label>
                    <input
                      type="text"
                      value={newProject.video}
                      onChange={(e) => setNewProject({ ...newProject, video: e.target.value })}
                      placeholder="https://... (or Base64 below)"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Media Uploaders */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900/50 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Project Thumbnail</label>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                        {newProject.thumbnail ? (
                          <img src={newProject.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[9px] text-zinc-600">No Image</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id="newProjThumbFile"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const b64 = await processImageFile(file, 400, 300, true);
                              setNewProject({ ...newProject, thumbnail: b64 });
                            } catch (err) {
                              showNotice('error', 'Failed to process thumbnail');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('newProjThumbFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon size={12} /> Upload
                      </button>
                      {newProject.thumbnail && (
                        <button
                          type="button"
                          onClick={() => setNewProject({ ...newProject, thumbnail: '' })}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Upload Screenshots (Multiple)</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="newProjScreensFile"
                        className="hidden"
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (files) {
                            const newImages: string[] = [];
                            for (let i = 0; i < files.length; i++) {
                              try {
                                const b64 = await processImageFile(files[i], 600, 450, false);
                                newImages.push(b64);
                              } catch (err) {
                                showNotice('error', 'Failed to process screenshot file');
                              }
                            }
                            const currentVal = newProject.screenshotsInput ? newProject.screenshotsInput.split(',').map(s => s.trim()).filter(Boolean) : [];
                            setNewProject({ ...newProject, screenshotsInput: [...currentVal, ...newImages].join(', ') });
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('newProjScreensFile')?.click()}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon size={12} /> Add Screenshot Files
                      </button>
                      <span className="text-[10px] text-zinc-500">
                        {(newProject.screenshotsInput ? newProject.screenshotsInput.split(',').filter(Boolean).length : 0)} screenshots uploaded
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Technical Story */}
                <div className="space-y-1 border-t border-zinc-900/50 pt-4">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Short Catchy Description</label>
                  <input
                    type="text"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="e.g. AI-powered multilingual health chatbot on WhatsApp."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Detailed Technical Blueprint Summary</label>
                  <textarea
                    rows={2}
                    value={newProject.longDescription}
                    onChange={(e) => setNewProject({ ...newProject, longDescription: e.target.value })}
                    placeholder="Describe how FastAPI operates webhooks, how Gemini parses, how keys are kept secure..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                {/* Project Blueprint Story Segments */}
                <div className="space-y-3 border-t border-zinc-900/50 pt-4">
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-purple-400">Project Story Blueprint</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">The Problem</label>
                      <textarea
                        rows={2}
                        value={newProject.problem}
                        onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                        placeholder="What challenge does this project solve?"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">The Solution</label>
                      <textarea
                        rows={2}
                        value={newProject.solution}
                        onChange={(e) => setNewProject({ ...newProject, solution: e.target.value })}
                        placeholder="How does your code address the problem?"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Technical Architecture</label>
                      <textarea
                        rows={2}
                        value={newProject.architecture}
                        onChange={(e) => setNewProject({ ...newProject, architecture: e.target.value })}
                        placeholder="How do servers/apis connect? Cache? DB layers?"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Key Challenges & Workarounds</label>
                      <textarea
                        rows={2}
                        value={newProject.challenges}
                        onChange={(e) => setNewProject({ ...newProject, challenges: e.target.value })}
                        placeholder="What was the biggest technical blocker, and how did you resolve it?"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Real-world Impact & Metrics</label>
                      <textarea
                        rows={2}
                        value={newProject.impact}
                        onChange={(e) => setNewProject({ ...newProject, impact: e.target.value })}
                        placeholder="What was the response? Latency results? Active queries?"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Lessons & Takeaways</label>
                      <textarea
                        rows={2}
                        value={newProject.learning}
                        onChange={(e) => setNewProject({ ...newProject, learning: e.target.value })}
                        placeholder="What coding insights did you gain?"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="glow" onClick={addProjectItem}>
                    <Plus size={14} /> Deploy Project Card
                  </Button>
                </div>
              </div>

              {/* List Project items (Collapsible UI Editor) */}
              <div className="space-y-4">
                {data.projects.map((proj, projIdx) => {
                  const isExpanded = expandedProject === proj.id;
                  const POPULAR_TECHS = [
                    'FastAPI', 'Python', 'Google Gemini API', 'WhatsApp API', 'Docker', 
                    'React', 'TensorFlow', 'Tailwind CSS', 'MongoDB', 'Next.js', 
                    'TypeScript', 'Redis', 'PostgreSQL', 'MySQL', 'JWT', 'Cryptography', 
                    'AWS', 'Node.js', 'Express', 'Django', 'Flask', 'GraphQL', 
                    'S3', 'EC2', 'Kubernetes', 'Redux', 'Prisma', 'Framer Motion', 
                    'Git', 'Vercel', 'NextAuth', 'Zustand', 'Sass', 'Figma'
                  ];
                  return (
                    <div key={proj.id} className="glass p-5 rounded-3xl border-white/5 relative group space-y-4 transition-all duration-300">
                      
                      {/* Collapse Toggle Header */}
                      <div className="flex justify-between items-center cursor-pointer select-none" onClick={() => setExpandedProject(isExpanded ? null : proj.id)}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden">
                            {proj.thumbnail ? (
                              <img src={proj.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                            ) : (
                              <Code size={18} className="text-zinc-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                              {proj.title}
                              {proj.featured && (
                                <span className="flex items-center gap-0.5 bg-yellow-500/10 border border-yellow-500/30 text-[9px] font-extrabold text-yellow-500 px-2 py-0.5 rounded-full">
                                  <Star size={8} className="fill-yellow-500 text-yellow-500" /> Featured
                                </span>
                              )}
                            </h4>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold mt-0.5">{proj.category} • {proj.status || 'Completed'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            disabled={projIdx === 0}
                            onClick={() => reorderItem('projects', projIdx, 'up')}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={projIdx === data.projects.length - 1}
                            onClick={() => reorderItem('projects', projIdx, 'down')}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProjectItem(proj.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer shrink-0"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span 
                            className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 rounded-lg cursor-pointer ml-1"
                            onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                          >
                            {isExpanded ? 'Collapse' : 'Edit'}
                          </span>
                        </div>
                      </div>

                      {/* Collapsed tags and description summary preview */}
                      {!isExpanded && (
                        <div className="text-[11px] text-zinc-400 pl-1">
                          {proj.description}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {proj.tech.map(t => (
                              <span key={t} className="text-[9px] bg-zinc-900 border border-zinc-800/80 px-1.5 py-0.5 rounded text-zinc-500 font-medium">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expanded Full Editor Form */}
                      {isExpanded && (
                        <div className="space-y-4 border-t border-zinc-900/50 pt-4" onClick={(e) => e.stopPropagation()}>
                          
                          {/* General Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Project Title</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].title = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Category Scope</label>
                              <input
                                type="text"
                                value={proj.category}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].category = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Project Duration</label>
                              <input
                                type="text"
                                value={proj.duration || ''}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].duration = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Project Status</label>
                              <select
                                value={proj.status || 'Completed'}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].status = e.target.value as any;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              >
                                {['Live', 'Completed', 'Archived', 'Ongoing'].map((st) => (
                                  <option key={st} value={st}>{st}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Difficulty Level</label>
                              <select
                                value={proj.difficulty || 'Intermediate'}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].difficulty = e.target.value as any;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              >
                                {['Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                                  <option key={diff} value={diff}>{diff}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Team Size</label>
                              <input
                                type="number"
                                value={proj.teamSize || 1}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].teamSize = Number(e.target.value) || 1;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center gap-2 pb-2">
                              <input
                                type="checkbox"
                                id={`projFeatured-${proj.id}`}
                                checked={proj.featured || false}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].featured = e.target.checked;
                                  setData({ ...data, projects: list });
                                }}
                                className="rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500"
                              />
                              <label htmlFor={`projFeatured-${proj.id}`} className="text-xs text-zinc-400 font-bold select-none cursor-pointer flex items-center gap-1">
                                <Star size={12} className={proj.featured ? "text-yellow-500 fill-yellow-500" : "text-zinc-600"} />
                                Featured Project
                              </label>
                            </div>
                          </div>

                          {/* Tech Stack Search + Tags editor */}
                          <div className="space-y-2 pt-3 border-t border-zinc-900/50">
                            <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">
                              Tech Ecosystem Tags (Search & Add Tags)
                            </label>
                            
                            {/* Selected Tags list */}
                            <div className="flex flex-wrap gap-1.5 min-h-8 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                              {proj.tech.length === 0 ? (
                                <span className="text-[10px] text-zinc-600 italic">No tags selected yet. Type to search and add tags below.</span>
                              ) : (
                                proj.tech.map((tag) => (
                                  <span key={tag} className="inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md font-semibold">
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => removeProjectTech(proj.id, tag)}
                                      className="hover:text-red-400 text-[8px] ml-1 cursor-pointer font-bold"
                                    >
                                      ✕
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>

                            <div className="relative">
                              <input
                                type="text"
                                value={editProjectTechSearch[proj.id] || ''}
                                onChange={(e) => setEditProjectTechSearch({ ...editProjectTechSearch, [proj.id]: e.target.value })}
                                placeholder="Type to search tags... (Press Enter to add custom tag)"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = (editProjectTechSearch[proj.id] || '').trim();
                                    if (val) {
                                      if (!proj.tech.includes(val)) {
                                        addProjectTech(proj.id, val);
                                      }
                                      setEditProjectTechSearch({ ...editProjectTechSearch, [proj.id]: '' });
                                    }
                                  }
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                              />

                              {/* Suggestions dropdown list */}
                              {(() => {
                                const searchQuery = editProjectTechSearch[proj.id] || '';
                                const suggestions = searchQuery.trim()
                                  ? POPULAR_TECHS.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()) && !proj.tech.includes(t))
                                  : [];
                                if (suggestions.length === 0) return null;
                                return (
                                  <div className="absolute left-0 right-0 mt-1 max-h-32 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl z-20 shadow-xl p-1 flex flex-col gap-0.5">
                                    {suggestions.map((tech) => (
                                      <button
                                        key={tech}
                                        type="button"
                                        onClick={() => {
                                          addProjectTech(proj.id, tech);
                                          setEditProjectTechSearch({ ...editProjectTechSearch, [proj.id]: '' });
                                        }}
                                        className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-xs text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                                      >
                                        {tech}
                                      </button>
                                    ))}
                                  </div>
                                );
                              })()}
                            </div>
                          </div>

                          {/* Project Links & Video */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">GitHub Repository Link</label>
                              <input
                                type="text"
                                value={proj.github}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].github = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Live Redirection Link (or #)</label>
                              <input
                                type="text"
                                value={proj.live}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].live = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Demo Video / GIF URL</label>
                              <input
                                type="text"
                                value={proj.video || ''}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].video = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Media Uploaders */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900/50 pt-3">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Project Thumbnail</label>
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                                  {proj.thumbnail ? (
                                    <img src={proj.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-[9px] text-zinc-600">No Image</span>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`projThumbFile-${proj.id}`}
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const b64 = await processImageFile(file, 400, 300, true);
                                        const list = [...data.projects];
                                        list[projIdx].thumbnail = b64;
                                        setData({ ...data, projects: list });
                                      } catch (err) {
                                        showNotice('error', 'Failed to process thumbnail');
                                      }
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`projThumbFile-${proj.id}`)?.click()}
                                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <ImageIcon size={12} /> Upload
                                </button>
                                {proj.thumbnail && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const list = [...data.projects];
                                      list[projIdx].thumbnail = '';
                                      setData({ ...data, projects: list });
                                    }}
                                    className="text-red-400 hover:text-red-300 text-[10px] font-bold shrink-0"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="col-span-2">
                              <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Screenshots Gallery</label>
                              
                              {/* Display existing screenshots */}
                              {proj.screenshots && proj.screenshots.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {proj.screenshots.map((screen, sIdx) => (
                                    <div key={sIdx} className="relative w-16 h-12 rounded-lg border border-zinc-800 overflow-hidden group/screen-thumb">
                                      <img src={screen} alt="Screenshot" className="w-full h-full object-cover" />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const list = [...data.projects];
                                          list[projIdx].screenshots = proj.screenshots!.filter((_, idx) => idx !== sIdx);
                                          setData({ ...data, projects: list });
                                        }}
                                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/screen-thumb:opacity-100 transition-opacity text-[10px] font-bold cursor-pointer"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-4">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  id={`projScreensFile-${proj.id}`}
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = e.target.files;
                                    if (files) {
                                      const newImages: string[] = [];
                                      for (let i = 0; i < files.length; i++) {
                                        try {
                                          const b64 = await processImageFile(files[i], 600, 450, false);
                                          newImages.push(b64);
                                        } catch (err) {
                                          showNotice('error', 'Failed to process screenshot file');
                                        }
                                      }
                                      const list = [...data.projects];
                                      const currentVal = proj.screenshots || [];
                                      list[projIdx].screenshots = [...currentVal, ...newImages];
                                      setData({ ...data, projects: list });
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => document.getElementById(`projScreensFile-${proj.id}`)?.click()}
                                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <ImageIcon size={12} /> Add Screenshots
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Description & technical blueprint story */}
                          <div className="space-y-0.5 border-t border-zinc-900/50 pt-3">
                            <label className="text-[9px] text-zinc-600 font-bold uppercase">Short Catchy Description</label>
                            <input
                              type="text"
                              value={proj.description}
                              onChange={(e) => {
                                const list = [...data.projects];
                                list[projIdx].description = e.target.value;
                                setData({ ...data, projects: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <label className="text-[9px] text-zinc-600 font-bold uppercase">Detailed Technical Blueprint Summary</label>
                            <textarea
                              rows={2}
                              value={proj.longDescription}
                              onChange={(e) => {
                                const list = [...data.projects];
                                list[projIdx].longDescription = e.target.value;
                                setData({ ...data, projects: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                            />
                          </div>

                          {/* Project Blueprint Story Segments */}
                          <div className="space-y-3 border-t border-zinc-900/50 pt-3">
                            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-purple-400">Project Story Blueprint</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">The Problem</label>
                                <textarea
                                  rows={2}
                                  value={proj.story?.problem || ''}
                                  onChange={(e) => {
                                    const list = [...data.projects];
                                    list[projIdx].story = { ...(list[projIdx].story || {}), problem: e.target.value };
                                    setData({ ...data, projects: list });
                                  }}
                                  placeholder="What challenge does this project solve?"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">The Solution</label>
                                <textarea
                                  rows={2}
                                  value={proj.story?.solution || ''}
                                  onChange={(e) => {
                                    const list = [...data.projects];
                                    list[projIdx].story = { ...(list[projIdx].story || {}), solution: e.target.value };
                                    setData({ ...data, projects: list });
                                  }}
                                  placeholder="How does your code address the problem?"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">Technical Architecture</label>
                                <textarea
                                  rows={2}
                                  value={proj.story?.architecture || ''}
                                  onChange={(e) => {
                                    const list = [...data.projects];
                                    list[projIdx].story = { ...(list[projIdx].story || {}), architecture: e.target.value };
                                    setData({ ...data, projects: list });
                                  }}
                                  placeholder="How do servers/apis connect? Cache? DB layers?"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">Key Challenges & Workarounds</label>
                                <textarea
                                  rows={2}
                                  value={proj.story?.challenges || ''}
                                  onChange={(e) => {
                                    const list = [...data.projects];
                                    list[projIdx].story = { ...(list[projIdx].story || {}), challenges: e.target.value };
                                    setData({ ...data, projects: list });
                                  }}
                                  placeholder="What was the biggest technical blocker, and how did you resolve it?"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">Real-world Impact & Metrics</label>
                                <textarea
                                  rows={2}
                                  value={proj.story?.impact || ''}
                                  onChange={(e) => {
                                    const list = [...data.projects];
                                    list[projIdx].story = { ...(list[projIdx].story || {}), impact: e.target.value };
                                    setData({ ...data, projects: list });
                                  }}
                                  placeholder="What was the response? Latency results? Active queries?"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">Lessons & Takeaways</label>
                                <textarea
                                  rows={2}
                                  value={proj.story?.learning || ''}
                                  onChange={(e) => {
                                    const list = [...data.projects];
                                    list[projIdx].story = { ...(list[projIdx].story || {}), learning: e.target.value };
                                    setData({ ...data, projects: list });
                                  }}
                                  placeholder="What coding insights did you gain?"
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 resize-none focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Publishing Status & Scheduled Date */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900/50 pt-4 mt-3">
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-500 font-bold uppercase block">Publishing Status</label>
                              <select
                                value={proj.publishStatus || 'published'}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].publishStatus = e.target.value;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option value="published">🟢 Published</option>
                                <option value="draft">🟡 Draft</option>
                              </select>
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-500 font-bold uppercase block">Scheduled Publishing Date</label>
                              <input
                                type="datetime-local"
                                value={proj.publishedAt ? new Date(new Date(proj.publishedAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                                onChange={(e) => {
                                  const list = [...data.projects];
                                  list[projIdx].publishedAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                  setData({ ...data, projects: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 6: SKILLS CLOUD */}
          {activeTab === 'skills' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {['backend', 'cloud', 'ai', 'tools', 'leadership'].map((category) => {
                const list = (data.skills as any)[category] as any[];
                return (
                  <div key={category} className="glass p-6 rounded-3xl border-white/5 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-base capitalize mb-4">
                        {category} Category
                      </h3>

                      <div className="space-y-2.5 min-h-12 border-b border-zinc-900 pb-4 max-h-[350px] overflow-y-auto pr-1">
                        {list.map((skill, skillIdx) => {
                          const skillName = typeof skill === 'string' ? skill : skill.name;
                          const skillLevel = typeof skill === 'string' ? 80 : skill.level;
                          const skillYears = typeof skill === 'string' ? 1 : skill.years;
                          
                          return (
                            <div key={skillName} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-850 p-3 rounded-xl">
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-extrabold text-white block truncate">{skillName}</span>
                                <span className="text-[10px] text-zinc-500 font-bold block mt-0.5">{skillYears} {skillYears === 1 ? 'Year' : 'Years'} Used</span>
                              </div>
                              
                              <div className="flex items-center gap-3 shrink-0">
                                {/* Level Slider */}
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] text-zinc-500 font-black uppercase">Lv</span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={skillLevel}
                                    onChange={(e) => {
                                      const updatedList = [...list];
                                      const val = Number(e.target.value);
                                      if (typeof skill === 'string') {
                                        updatedList[skillIdx] = { name: skill, level: val, years: 1 };
                                      } else {
                                        updatedList[skillIdx] = { ...skill, level: val };
                                      }
                                      setData({
                                        ...data,
                                        skills: {
                                          ...data.skills,
                                          [category]: updatedList
                                        }
                                      });
                                    }}
                                    className="w-16 accent-purple-600 bg-zinc-800 rounded-lg appearance-none h-1 cursor-pointer"
                                  />
                                  <span className="text-[10px] text-purple-400 font-bold w-7 text-right">{skillLevel}%</span>
                                </div>

                                {/* Years Input */}
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] text-zinc-500 font-black uppercase">Yrs</span>
                                  <input
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={skillYears}
                                    onChange={(e) => {
                                      const updatedList = [...list];
                                      const val = Number(e.target.value) || 0;
                                      if (typeof skill === 'string') {
                                        updatedList[skillIdx] = { name: skill, level: 80, years: val };
                                      } else {
                                        updatedList[skillIdx] = { ...skill, years: val };
                                      }
                                      setData({
                                        ...data,
                                        skills: {
                                          ...data.skills,
                                          [category]: updatedList
                                        }
                                      });
                                    }}
                                    className="w-12 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5 text-xs text-zinc-300 text-center focus:outline-none"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => deleteSkillItem(category, skillName)}
                                  className="text-zinc-500 hover:text-red-400 cursor-pointer p-1 transition-colors font-bold text-xs"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {list.length === 0 && (
                          <div className="text-zinc-600 text-xs italic py-4 text-center">No skills cataloged in this category.</div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider block">Add Skill to {category}</span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={newSkillName[category] || ''}
                          onChange={(e) => setNewSkillName({ ...newSkillName, [category]: e.target.value })}
                          placeholder="Skill name (e.g. Python)"
                          className="flex-1 bg-zinc-900 border border-zinc-850 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') addSkillItem(category);
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] text-zinc-650 font-bold uppercase">Lv</span>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={newSkillLevel[category] ?? 80}
                              onChange={(e) => setNewSkillLevel({ ...newSkillLevel, [category]: Number(e.target.value) || 0 })}
                              className="w-11 bg-zinc-900 border border-zinc-850 rounded-lg px-1.5 py-1 text-xs text-zinc-300 text-center focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] text-zinc-650 font-bold uppercase">Yrs</span>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              value={newSkillYears[category] ?? 1}
                              onChange={(e) => setNewSkillYears({ ...newSkillYears, [category]: Number(e.target.value) || 0 })}
                              className="w-11 bg-zinc-900 border border-zinc-850 rounded-lg px-1.5 py-1 text-xs text-zinc-300 text-center focus:outline-none"
                            />
                          </div>
                        </div>
                        <Button variant="secondary" onClick={() => addSkillItem(category)} className="cursor-pointer">
                          Add Tag
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 7: CREDENTIALS */}

          {activeTab === 'credentials' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="space-y-6">
                <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                  <h3 className="font-extrabold text-white text-base">Add Certification</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Cert Name</label>
                      <input
                        type="text"
                        value={newCert.name}
                        onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                        placeholder="AWS Certified Cloud Practitioner"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Issuer</label>
                      <input
                        type="text"
                        value={newCert.issuer}
                        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                        placeholder="Amazon Web Services"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Issue Date</label>
                      <input
                        type="date"
                        value={newCert.date}
                        onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Badge Emoji</label>
                      <input
                        type="text"
                        value={newCert.icon}
                        onChange={(e) => setNewCert({ ...newCert, icon: e.target.value })}
                        placeholder="☁️"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none text-center"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Credential ID</label>
                      <input
                        type="text"
                        value={newCert.credentialId}
                        onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                        placeholder="AWS-CCP-12345"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Expiration Date</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          disabled={newCert.expiryDate === 'No Expiration'}
                          value={newCert.expiryDate === 'No Expiration' ? getLocalDateString() : newCert.expiryDate}
                          onChange={(e) => setNewCert({ ...newCert, expiryDate: e.target.value })}
                          className="flex-1 bg-zinc-900 border border-zinc-850 disabled:opacity-40 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <label className="flex items-center gap-1 cursor-pointer text-[10px] text-zinc-450 select-none shrink-0">
                          <input
                            type="checkbox"
                            checked={newCert.expiryDate === 'No Expiration'}
                            onChange={(e) => {
                              setNewCert({
                                ...newCert,
                                expiryDate: e.target.checked ? 'No Expiration' : getLocalDateString()
                              });
                            }}
                            className="rounded border-zinc-800 text-purple-650 focus:ring-purple-500 bg-zinc-900 w-3 h-3"
                          />
                          <span>None</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Verification URL</label>
                      <input
                        type="text"
                        value={newCert.verificationUrl}
                        onChange={(e) => setNewCert({ ...newCert, verificationUrl: e.target.value })}
                        placeholder="https://aws.amazon.com/..."
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Skills Earned (Comma-separated)</label>
                      <input
                        type="text"
                        value={newCert.skillsEarnedInput}
                        onChange={(e) => setNewCert({ ...newCert, skillsEarnedInput: e.target.value })}
                        placeholder="Cloud Computing, AWS"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-900 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Logo Upload</label>
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                          {newCert.certImage ? (
                            <img src={newCert.certImage} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <span>{newCert.icon || '☁️'}</span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="newCertLogoFile"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const b64 = await processImageFile(file, 128, 128, true);
                                setNewCert({ ...newCert, certImage: b64 });
                              } catch (err) {
                                showNotice('error', 'Failed to process logo file');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('newCertLogoFile')?.click()}
                          className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <ImageIcon size={12} /> Choose Image
                        </button>
                        {newCert.certImage && (
                          <button
                            type="button"
                            onClick={() => setNewCert({ ...newCert, certImage: '' })}
                            className="text-red-400 hover:text-red-300 text-[10px] font-bold"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Certificate PDF Upload</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          id="newCertPdfFile"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const b64 = await fileToBase64(file);
                                setNewCert({ ...newCert, verificationProof: b64 });
                              } catch (err) {
                                showNotice('error', 'Failed to process certificate file');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('newCertPdfFile')?.click()}
                          className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <LinkIcon size={12} /> {newCert.verificationProof ? 'PDF/Image Attached ✓' : 'Choose PDF/Image'}
                        </button>
                        {newCert.verificationProof && (
                          <button
                            type="button"
                            onClick={() => setNewCert({ ...newCert, verificationProof: '' })}
                            className="text-red-400 hover:text-red-300 text-[10px] font-bold"
                          >
                            Remove Proof
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-zinc-900">
                    <Button variant="glow" onClick={addCertItem} className="cursor-pointer">
                      <Plus size={14} /> Append Credential
                    </Button>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-base">Active Credentials Catalog ({data.certifications.length})</h3>
                  <div className="space-y-3">
                    {data.certifications.map((cert, certIdx) => {
                      const isExpanded = expandedCert === cert.id;
                      return (
                        <div key={cert.id} className="glass rounded-2xl border-white/5 overflow-hidden transition-all duration-300">
                          {/* Collapsed view header */}
                          <div 
                            className="p-4 flex gap-4 items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                            onClick={() => setExpandedCert(isExpanded ? null : cert.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                                {cert.certImage ? (
                                  <img src={cert.certImage} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                  <span>{cert.icon || '☁️'}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-extrabold text-white text-xs">{cert.name || 'Untitled Certification'}</h4>
                                <span className="text-[10px] text-zinc-500 font-medium">{cert.issuer} • {cert.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                disabled={certIdx === 0}
                                onClick={() => reorderItem('certifications', certIdx, 'up')}
                                className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                                title="Move Up"
                              >
                                <ChevronUp size={14} />
                              </button>
                              <button
                                type="button"
                                disabled={certIdx === data.certifications.length - 1}
                                onClick={() => reorderItem('certifications', certIdx, 'down')}
                                className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                                title="Move Down"
                              >
                                <ChevronDown size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteCertItem(cert.id)}
                                className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer shrink-0"
                                title="Delete Certification"
                              >
                                <Trash2 size={14} />
                              </button>
                              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 rounded-lg cursor-pointer animate-pulse-glow" onClick={() => setExpandedCert(isExpanded ? null : cert.id)}>
                                {isExpanded ? 'Collapse' : 'Edit'}
                              </span>
                            </div>
                          </div>

                          {/* Expanded Form details */}
                          {isExpanded && (
                            <div className="p-4 border-t border-zinc-900/60 bg-zinc-950/20 space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Certification Name</label>
                                  <input
                                    type="text"
                                    value={cert.name}
                                    onChange={(e) => {
                                      const list = [...data.certifications];
                                      list[certIdx].name = e.target.value;
                                      setData({ ...data, certifications: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Date Issued</label>
                                  <input
                                    type="text"
                                    value={cert.date}
                                    onChange={(e) => {
                                      const list = [...data.certifications];
                                      list[certIdx].date = e.target.value;
                                      setData({ ...data, certifications: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Issuer Org</label>
                                  <input
                                    type="text"
                                    value={cert.issuer}
                                    onChange={(e) => {
                                      const list = [...data.certifications];
                                      list[certIdx].issuer = e.target.value;
                                      setData({ ...data, certifications: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Credential ID</label>
                                  <input
                                    type="text"
                                    value={cert.credentialId || ''}
                                    onChange={(e) => {
                                      const list = [...data.certifications];
                                      list[certIdx].credentialId = e.target.value;
                                      setData({ ...data, certifications: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] text-zinc-650 font-bold uppercase">Verification URL</label>
                                <input
                                  type="text"
                                  value={cert.verificationUrl || ''}
                                  onChange={(e) => {
                                    const list = [...data.certifications];
                                    list[certIdx].verificationUrl = e.target.value;
                                    setData({ ...data, certifications: list });
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>

                              {/* Publishing Status & Scheduled Date */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900/50 pt-4 mt-3">
                                <div className="space-y-0.5">
                                  <label className="text-[9px] text-zinc-500 font-bold uppercase block">Publishing Status</label>
                                  <select
                                    value={cert.publishStatus || 'published'}
                                    onChange={(e) => {
                                      const list = [...data.certifications];
                                      list[certIdx].publishStatus = e.target.value;
                                      setData({ ...data, certifications: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  >
                                    <option value="published">🟢 Published</option>
                                    <option value="draft">🟡 Draft</option>
                                  </select>
                                </div>
                                <div className="space-y-0.5">
                                  <label className="text-[9px] text-zinc-500 font-bold uppercase block">Scheduled Publishing Date</label>
                                  <input
                                    type="datetime-local"
                                    value={cert.publishedAt ? new Date(new Date(cert.publishedAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                                    onChange={(e) => {
                                      const list = [...data.certifications];
                                      list[certIdx].publishedAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                      setData({ ...data, certifications: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-900/60">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase block">Logo Image</label>
                                  <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm overflow-hidden shrink-0">
                                      {cert.certImage ? (
                                        <img src={cert.certImage} className="w-full h-full object-cover" />
                                      ) : (
                                        <span>{cert.icon || '☁️'}</span>
                                      )}
                                    </div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`certLogoFile-${cert.id}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          try {
                                            const b64 = await processImageFile(file, 128, 128, true);
                                            const list = [...data.certifications];
                                            list[certIdx].certImage = b64;
                                            setData({ ...data, certifications: list });
                                          } catch (err) {
                                            showNotice('error', 'Failed to process logo file');
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`certLogoFile-${cert.id}`)?.click()}
                                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/20 text-[9px] font-bold text-zinc-355 rounded-lg cursor-pointer"
                                    >
                                      Change Logo
                                    </button>
                                    {cert.certImage && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const list = [...data.certifications];
                                          list[certIdx].certImage = '';
                                          setData({ ...data, certifications: list });
                                        }}
                                        className="text-red-400 text-[9px] hover:text-red-300 font-bold"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase block">Verification Certificate PDF / Image</label>
                                  <div className="flex gap-2 items-center">
                                    <input
                                      type="file"
                                      accept="application/pdf,image/*"
                                      id={`certPdfFile-${cert.id}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          try {
                                            const b64 = await fileToBase64(file);
                                            const list = [...data.certifications];
                                            list[certIdx].verificationProof = b64;
                                            setData({ ...data, certifications: list });
                                          } catch (err) {
                                            showNotice('error', 'Failed to process certificate file');
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`certPdfFile-${cert.id}`)?.click()}
                                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/20 text-[9px] font-bold text-zinc-355 rounded-lg cursor-pointer flex items-center gap-1"
                                    >
                                      <LinkIcon size={10} /> {cert.verificationProof ? 'Attached ✓' : 'Upload PDF/Image'}
                                    </button>
                                    {cert.verificationProof && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const list = [...data.certifications];
                                          list[certIdx].verificationProof = '';
                                          setData({ ...data, certifications: list });
                                        }}
                                        className="text-red-400 text-[9px] hover:text-red-300 font-bold"
                                      >
                                        Remove Proof
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="space-y-6">
                <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                  <h3 className="font-extrabold text-white text-base">Add Achievement Badge</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Title</label>
                      <input
                        type="text"
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                        placeholder="🥈 2nd Place Winner"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Organization</label>
                      <input
                        type="text"
                        value={newAchievement.organization}
                        onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                        placeholder="Clean Stack Ideathon"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Date</label>
                      <input
                        type="date"
                        value={newAchievement.date}
                        onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Rank</label>
                      <input
                        type="text"
                        value={newAchievement.rank}
                        onChange={(e) => setNewAchievement({ ...newAchievement, rank: e.target.value })}
                        placeholder="Runner-Up"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Description</label>
                      <input
                        type="text"
                        value={newAchievement.description}
                        onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        placeholder="Pitched a smart recycling model that ranked 2nd among 50+ college teams..."
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Type</label>
                      <select
                        value={newAchievement.type}
                        onChange={(e) => setNewAchievement({ ...newAchievement, type: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-zinc-350 focus:outline-none"
                      >
                        <option value="Hackathon">Hackathon</option>
                        <option value="Award">Award</option>
                        <option value="Competition">Competition</option>
                        <option value="Recognition">Recognition</option>
                        <option value="Scholarship">Scholarship</option>
                        <option value="Academic">Academic</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">LinkedIn URL</label>
                      <input
                        type="text"
                        value={newAchievement.linkedinLink}
                        onChange={(e) => setNewAchievement({ ...newAchievement, linkedinLink: e.target.value })}
                        placeholder="https://linkedin.com/posts/..."
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Badge Image (Square Logo/Icon)</label>
                      <div className="flex gap-2 items-center">
                        <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                          {newAchievement.badgeImage ? (
                            <img src={newAchievement.badgeImage} className="w-full h-full object-cover" />
                          ) : (
                            <span>🏆</span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="newAchBadgeFile"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const b64 = await processImageFile(file, 256, 256, true);
                                setNewAchievement({ ...newAchievement, badgeImage: b64 });
                              } catch (err) {
                                showNotice('error', 'Failed to process badge file');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('newAchBadgeFile')?.click()}
                          className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl cursor-pointer"
                        >
                          Upload Badge
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Event Main Photo</label>
                      <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm overflow-hidden shrink-0">
                          {newAchievement.achievementPhoto ? (
                            <img src={newAchievement.achievementPhoto} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={14} className="text-zinc-750" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="newAchPhotoFile"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const b64 = await processImageFile(file, 800, 600, false);
                                setNewAchievement({ ...newAchievement, achievementPhoto: b64 });
                              } catch (err) {
                                showNotice('error', 'Failed to process photo file');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('newAchPhotoFile')?.click()}
                          className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl cursor-pointer"
                        >
                          Upload Photo
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Certificate PDF/Image Proof</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          id="newAchCertProofFile"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const b64 = await fileToBase64(file);
                                setNewAchievement({ ...newAchievement, certificateUpload: b64 });
                              } catch (err) {
                                showNotice('error', 'Failed to process certificate file');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('newAchCertProofFile')?.click()}
                          className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl cursor-pointer"
                        >
                          {newAchievement.certificateUpload ? 'Cert Attached ✓' : 'Upload Proof'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Gallery Uploads ({newAchievement.galleryUpload.length})</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          id="newAchGalleryFile"
                          className="hidden"
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {
                              try {
                                const promises = files.map(file => processImageFile(file, 800, 600, false));
                                const base64s = await Promise.all(promises);
                                setNewAchievement(prev => ({
                                  ...prev,
                                  galleryUpload: [...prev.galleryUpload, ...base64s]
                                }));
                              } catch (err) {
                                showNotice('error', 'Failed to process gallery files');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('newAchGalleryFile')?.click()}
                          className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 text-[10px] font-bold text-zinc-300 hover:text-white rounded-xl cursor-pointer flex items-center gap-1"
                        >
                          <Plus size={10} /> Add Photos
                        </button>
                        {newAchievement.galleryUpload.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setNewAchievement({ ...newAchievement, galleryUpload: [] })}
                            className="text-red-400 hover:text-red-300 text-[10px] font-bold"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-zinc-900">
                    <Button variant="glow" onClick={addAchievementItem} className="cursor-pointer">
                      <Plus size={14} /> Append Achievement
                    </Button>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-base">Active Achievements Catalog ({data.achievements.length})</h3>
                  <div className="space-y-3">
                    {data.achievements.map((ach, achIdx) => {
                      const isExpanded = expandedAchievement === ach.id;
                      return (
                        <div key={ach.id} className="glass rounded-2xl border-white/5 overflow-hidden transition-all duration-300">
                          {/* Collapsed header */}
                          <div 
                            className="p-4 flex gap-4 items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                            onClick={() => setExpandedAchievement(isExpanded ? null : ach.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg overflow-hidden shrink-0">
                                {ach.badgeImage ? (
                                  <img src={ach.badgeImage} alt="Badge" className="w-full h-full object-cover" />
                                ) : (
                                  <span>🏆</span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-extrabold text-white text-xs">{ach.title || 'Untitled Achievement'}</h4>
                                <span className="text-[10px] text-zinc-500 font-medium">{ach.organization} • {ach.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                disabled={achIdx === 0}
                                onClick={() => reorderItem('achievements', achIdx, 'up')}
                                className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                                title="Move Up"
                              >
                                <ChevronUp size={14} />
                              </button>
                              <button
                                type="button"
                                disabled={achIdx === data.achievements.length - 1}
                                onClick={() => reorderItem('achievements', achIdx, 'down')}
                                className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                                title="Move Down"
                              >
                                <ChevronDown size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteAchievementItem(ach.id)}
                                className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer shrink-0"
                              >
                                <Trash2 size={14} />
                              </button>
                              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 rounded-lg cursor-pointer" onClick={() => setExpandedAchievement(isExpanded ? null : ach.id)}>
                                {isExpanded ? 'Collapse' : 'Edit Details'}
                              </span>
                            </div>
                          </div>

                          {/* Expanded detail form */}
                          {isExpanded && (
                            <div className="p-5 border-t border-zinc-900/60 bg-zinc-950/20 space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Title / Honor</label>
                                  <input
                                    type="text"
                                    value={ach.title}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].title = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Organization</label>
                                  <input
                                    type="text"
                                    value={ach.organization}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].organization = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Date</label>
                                  <input
                                    type="date"
                                    value={ach.date.includes('-') ? ach.date : `${ach.date}-01-01`}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].date = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Rank / Medal</label>
                                  <input
                                    type="text"
                                    value={ach.rank}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].rank = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2 space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Description</label>
                                  <input
                                    type="text"
                                    value={ach.description}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].description = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">Type</label>
                                  <select
                                    value={ach.type}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].type = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                                  >
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Award">Award</option>
                                    <option value="Competition">Competition</option>
                                    <option value="Recognition">Recognition</option>
                                    <option value="Scholarship">Scholarship</option>
                                    <option value="Academic">Academic</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase">LinkedIn Link</label>
                                  <input
                                    type="text"
                                    value={ach.linkedinLink || ''}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].linkedinLink = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase block">Badge Image</label>
                                  <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm overflow-hidden shrink-0">
                                      {ach.badgeImage ? (
                                        <img src={ach.badgeImage} className="w-full h-full object-cover" />
                                      ) : (
                                        <span>🏆</span>
                                      )}
                                    </div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`achBadgeFile-${ach.id}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          try {
                                            const b64 = await processImageFile(file, 256, 256, true);
                                            const list = [...data.achievements];
                                            list[achIdx].badgeImage = b64;
                                            setData({ ...data, achievements: list });
                                          } catch (err) {
                                            showNotice('error', 'Failed to process badge file');
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`achBadgeFile-${ach.id}`)?.click()}
                                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/20 text-[9px] font-bold text-zinc-350 rounded-lg cursor-pointer"
                                    >
                                      Change Badge
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-zinc-900/60">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase block">Event Main Photo</label>
                                  <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm overflow-hidden shrink-0">
                                      {ach.achievementPhoto ? (
                                        <img src={ach.achievementPhoto} className="w-full h-full object-cover" />
                                      ) : (
                                        <ImageIcon size={12} className="text-zinc-600" />
                                      )}
                                    </div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`achPhotoFile-${ach.id}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          try {
                                            const b64 = await processImageFile(file, 800, 600, false);
                                            const list = [...data.achievements];
                                            list[achIdx].achievementPhoto = b64;
                                            setData({ ...data, achievements: list });
                                          } catch (err) {
                                            showNotice('error', 'Failed to process photo file');
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`achPhotoFile-${ach.id}`)?.click()}
                                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/20 text-[9px] font-bold text-zinc-350 rounded-lg cursor-pointer"
                                    >
                                      Change Photo
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase block">Verification Proof Certificate</label>
                                  <div className="flex gap-2 items-center">
                                    <input
                                      type="file"
                                      accept="application/pdf,image/*"
                                      id={`achCertProof-${ach.id}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          try {
                                            const b64 = await fileToBase64(file);
                                            const list = [...data.achievements];
                                            list[achIdx].certificateUpload = b64;
                                            setData({ ...data, achievements: list });
                                          } catch (err) {
                                            showNotice('error', 'Failed to process certificate file');
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`achCertProof-${ach.id}`)?.click()}
                                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/20 text-[9px] font-bold text-zinc-350 rounded-lg cursor-pointer"
                                    >
                                      {ach.certificateUpload ? 'Change Proof ✓' : 'Upload Proof'}
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-zinc-650 font-bold uppercase block">Gallery Photos ({ach.galleryUpload ? ach.galleryUpload.length : 0})</label>
                                  <div className="flex gap-2 items-center">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      id={`achGalleryFile-${ach.id}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (files.length > 0) {
                                          try {
                                            const promises = files.map(file => processImageFile(file, 800, 600, false));
                                            const base64s = await Promise.all(promises);
                                            const list = [...data.achievements];
                                            list[achIdx].galleryUpload = [...(list[achIdx].galleryUpload || []), ...base64s];
                                            setData({ ...data, achievements: list });
                                          } catch (err) {
                                            showNotice('error', 'Failed to process gallery files');
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`achGalleryFile-${ach.id}`)?.click()}
                                      className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/20 text-[9px] font-bold text-zinc-350 rounded-lg cursor-pointer"
                                    >
                                      Add Gallery Photos
                                    </button>
                                  </div>
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {(ach.galleryUpload || []).map((img, imgIdx) => (
                                      <div key={imgIdx} className="relative w-10 h-10 rounded overflow-hidden border border-white/5 group/thumb">
                                        <img src={img} className="w-full h-full object-cover" />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const list = [...data.achievements];
                                            list[achIdx].galleryUpload = (list[achIdx].galleryUpload || []).filter((_, idx) => idx !== imgIdx);
                                            setData({ ...data, achievements: list });
                                          }}
                                          className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity text-white text-[8px] font-bold cursor-pointer"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Publishing Status & Scheduled Date */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900/50 pt-4 mt-3">
                                <div className="space-y-0.5">
                                  <label className="text-[9px] text-zinc-500 font-bold uppercase block">Publishing Status</label>
                                  <select
                                    value={ach.publishStatus || 'published'}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].publishStatus = e.target.value;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  >
                                    <option value="published">🟢 Published</option>
                                    <option value="draft">🟡 Draft</option>
                                  </select>
                                </div>
                                <div className="space-y-0.5">
                                  <label className="text-[9px] text-zinc-500 font-bold uppercase block">Scheduled Publishing Date</label>
                                  <input
                                    type="datetime-local"
                                    value={ach.publishedAt ? new Date(new Date(ach.publishedAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                                    onChange={(e) => {
                                      const list = [...data.achievements];
                                      list[achIdx].publishedAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                      setData({ ...data, achievements: list });
                                    }}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}



          {/* TAB 8: JOURNAL */}
          {activeTab === 'journal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              
              {/* updates */}
              <div className="space-y-6">
                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-base">Post Live Update</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Category</label>
                      <select
                        value={newUpdate.category}
                        onChange={(e) => setNewUpdate({ ...newUpdate, category: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-zinc-400 focus:outline-none"
                      >
                        <option value="">Select Category</option>
                        <option value="Certification">Certification</option>
                        <option value="CSI Event">CSI Event</option>
                        <option value="Internship">Internship</option>
                        <option value="Award">Award</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Activity Description</label>
                      <input
                        type="text"
                        value={newUpdate.content}
                        onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                        placeholder="Won Runner-Up at the Clean Stack Ideathon for EcoFi."
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="glow" onClick={addUpdateItem}>
                      <Plus size={14} /> Append Update
                    </Button>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-base">Feed History (Directly Editable)</h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {data.updates.map((upd, updIdx) => (
                      <div key={upd.id} className="glass p-4 rounded-xl border-white/5 flex gap-4 items-center justify-between relative group">
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={updIdx === 0}
                            onClick={() => reorderItem('updates', updIdx, 'up')}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={updIdx === data.updates.length - 1}
                            onClick={() => reorderItem('updates', updIdx, 'down')}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteUpdateItem(upd.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-2 cursor-pointer"
                            title="Delete Update"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[9px] text-zinc-650 font-bold uppercase">Date</label>
                              <input
                                type="text"
                                value={upd.date}
                                onChange={(e) => {
                                  const list = [...data.updates];
                                  list[updIdx].date = e.target.value;
                                  setData({ ...data, updates: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-650 font-bold uppercase">Category</label>
                              <input
                                type="text"
                                value={upd.category}
                                onChange={(e) => {
                                  const list = [...data.updates];
                                  list[updIdx].category = e.target.value;
                                  setData({ ...data, updates: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-purple-400 font-bold focus:outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-[9px] text-zinc-650 font-bold uppercase">Content</label>
                              <input
                                type="text"
                                value={upd.content}
                                onChange={(e) => {
                                  const list = [...data.updates];
                                  list[updIdx].content = e.target.value;
                                  setData({ ...data, updates: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Publishing Status & Scheduled Date */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900/50 pt-2">
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-550 font-bold uppercase block">Publishing Status</label>
                              <select
                                value={upd.status || 'published'}
                                onChange={(e) => {
                                  const list = [...data.updates];
                                  list[updIdx].status = e.target.value;
                                  setData({ ...data, updates: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option value="published">🟢 Published</option>
                                <option value="draft">🟡 Draft</option>
                              </select>
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[9px] text-zinc-555 font-bold uppercase block">Scheduled Publishing Date</label>
                              <input
                                type="datetime-local"
                                value={upd.scheduledAt ? new Date(new Date(upd.scheduledAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                                onChange={(e) => {
                                  const list = [...data.updates];
                                  list[updIdx].scheduledAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                  setData({ ...data, updates: list });
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* blog posts */}
              <div className="space-y-6">
                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-base">Draft Writing Card</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Article Title</label>
                      <input
                        type="text"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        placeholder="Deploying FastAPI on AWS Lambda"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Category</label>
                        <input
                          type="text"
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                          placeholder="Cloud Tech"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Read Time</label>
                        <input
                          type="text"
                          value={newBlog.readTime}
                          onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                          placeholder="5 min read"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Excerpt Summary</label>
                    <input
                      type="text"
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      placeholder="Enter short 1-2 sentence description of the log..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="glow" onClick={addBlogItem}>
                      <Plus size={14} /> Append Article
                    </Button>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-base">Published Logs (Directly Editable)</h3>
                  <div className="space-y-4">
                    {data.blogs.map((blog, blogIdx) => (
                      <div key={blog.id} className="glass p-4 rounded-2xl border-white/5 relative flex flex-col gap-3 group">
                        <div className="absolute top-4 right-4 flex items-center gap-1">
                          <button
                            type="button"
                            disabled={blogIdx === 0}
                            onClick={() => reorderItem('blogs', blogIdx, 'up')}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={blogIdx === data.blogs.length - 1}
                            onClick={() => reorderItem('blogs', blogIdx, 'down')}
                            className="text-zinc-500 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
                            title="Move Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteBlogItem(blog.id)}
                            className="text-zinc-500 hover:text-red-400 p-2 cursor-pointer transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pr-24">
                          <div className="sm:col-span-2">
                            <label className="text-[9px] text-zinc-650 font-bold uppercase">Article Title</label>
                            <input
                              type="text"
                              value={blog.title}
                              onChange={(e) => {
                                const list = [...data.blogs];
                                list[blogIdx].title = e.target.value;
                                setData({ ...data, blogs: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-650 font-bold uppercase">Category Tag</label>
                            <input
                              type="text"
                              value={blog.category}
                              onChange={(e) => {
                                const list = [...data.blogs];
                                list[blogIdx].category = e.target.value;
                                setData({ ...data, blogs: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-purple-400 font-bold focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-650 font-bold uppercase">Read Time</label>
                            <input
                              type="text"
                              value={blog.readTime}
                              onChange={(e) => {
                                const list = [...data.blogs];
                                list[blogIdx].readTime = e.target.value;
                                setData({ ...data, blogs: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-0.5 pr-24">
                          <label className="text-[9px] text-zinc-650 font-bold uppercase">Excerpt Summary</label>
                          <textarea
                            rows={2}
                            value={blog.excerpt}
                            onChange={(e) => {
                              const list = [...data.blogs];
                              list[blogIdx].excerpt = e.target.value;
                              setData({ ...data, blogs: list });
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 resize-none focus:outline-none"
                          />
                        </div>

                        {/* Publishing Status & Scheduled Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-900/50 pt-3 mt-1 pr-24">
                          <div className="space-y-0.5">
                            <label className="text-[9px] text-zinc-550 font-bold uppercase block">Publishing Status</label>
                            <select
                              value={blog.status || 'published'}
                              onChange={(e) => {
                                const list = [...data.blogs];
                                list[blogIdx].status = e.target.value;
                                setData({ ...data, blogs: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            >
                              <option value="published">🟢 Published</option>
                              <option value="draft">🟡 Draft</option>
                            </select>
                          </div>
                          <div className="space-y-0.5">
                            <label className="text-[9px] text-zinc-555 font-bold uppercase block">Scheduled Publishing Date</label>
                            <input
                              type="datetime-local"
                              value={blog.scheduledAt ? new Date(new Date(blog.scheduledAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                              onChange={(e) => {
                                const list = [...data.blogs];
                                list[blogIdx].scheduledAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                setData({ ...data, blogs: list });
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ── MEDIA VAULT TAB ── */}
          {activeTab === 'media' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

              {/* Upload Form */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <ImageIcon size={14} className="text-pink-400" />
                  </div>
                  <h3 className="font-extrabold text-white text-base">Upload New Photo</h3>
                </div>

                {/* Image drop zone */}
                <div className="flex flex-col sm:flex-row gap-5">
                  {newMedia.image ? (
                    <div className="relative group/imgprev shrink-0">
                      <img src={newMedia.image} alt="preview" className="w-48 h-36 object-cover rounded-2xl border border-zinc-800" />
                      <button
                        onClick={() => setNewMedia({ ...newMedia, image: '' })}
                        className="absolute top-2 right-2 bg-red-500/90 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold cursor-pointer"
                      >✕ Remove</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 w-48 h-36 bg-zinc-900 border-2 border-dashed border-zinc-700 hover:border-pink-500/50 rounded-2xl cursor-pointer transition-colors shrink-0 group/drop">
                      <ImageIcon size={24} className="text-zinc-600 group-hover/drop:text-pink-400 transition-colors" />
                      <span className="text-[10px] text-zinc-500 group-hover/drop:text-pink-400 transition-colors font-semibold">Click to upload photo</span>
                      <span className="text-[9px] text-zinc-600">JPG, PNG, WEBP</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const b64 = await processImageFile(file, 1200, 900, false);
                            setNewMedia({ ...newMedia, image: b64 });
                          }
                        }}
                      />
                    </label>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Title *</label>
                        <input
                          type="text"
                          value={newMedia.title}
                          onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                          placeholder="Hack-IT-Out 2026"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Category</label>
                        <select
                          value={newMedia.category}
                          onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/40 rounded-xl px-4 py-2 text-xs text-zinc-400 focus:outline-none"
                        >
                          {['CSI Event','Hackathon','Internship','Project','Certificate','Workshop','Stage','Campus','Award','Personal'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Date</label>
                        <input
                          type="date"
                          value={newMedia.date}
                          onChange={(e) => setNewMedia({ ...newMedia, date: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Tags (comma-sep)</label>
                        <input
                          type="text"
                          value={newMedia.tags}
                          onChange={(e) => setNewMedia({ ...newMedia, tags: e.target.value })}
                          placeholder="hackathon, CSI, leadership"
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Description / Caption</label>
                  <textarea
                    rows={2}
                    value={newMedia.description}
                    onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                    placeholder="A short caption that tells the story behind this photo..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/40 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group/feat">
                    <div
                      onClick={() => setNewMedia({ ...newMedia, featured: !newMedia.featured })}
                      className={`w-10 h-5 rounded-full border transition-all ${newMedia.featured ? 'bg-yellow-500/30 border-yellow-500/60' : 'bg-zinc-800 border-zinc-700'} relative cursor-pointer`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${newMedia.featured ? 'left-5 bg-yellow-400' : 'left-0.5 bg-zinc-600'}`} />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-semibold group-hover/feat:text-white transition-colors">
                      ⭐ Featured photo
                    </span>
                  </label>
                  <Button variant="glow" onClick={addMediaItem}>
                    <Plus size={14} /> Add to Vault
                  </Button>
                </div>
              </div>

              {/* Media Grid */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-base">
                    Media Vault <span className="text-zinc-600 font-normal text-sm ml-1">({(data.media || []).length} photos)</span>
                  </h3>
                </div>

                {(data.media || []).length === 0 ? (
                  <p className="text-zinc-500 text-sm text-center py-8">No photos yet. Upload your first one above!</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {(data.media || []).map((med, medIdx) => (
                      <div key={med.id} className="relative group/medcard">
                        {/* Thumbnail */}
                        <div
                          className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${mediaExpandedId === med.id ? 'border-pink-500/60' : 'border-transparent hover:border-zinc-700'}`}
                          onClick={() => setMediaExpandedId(mediaExpandedId === med.id ? null : med.id)}
                        >
                          {med.image ? (
                            <img src={med.image} alt={med.title} className="w-full h-28 object-cover" />
                          ) : (
                            <div className="w-full h-28 bg-zinc-900 flex items-center justify-center">
                              <ImageIcon size={20} className="text-zinc-700" />
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover/medcard:bg-black/50 transition-all flex items-end p-2 opacity-0 group-hover/medcard:opacity-100">
                            <span className="text-[9px] font-bold text-white line-clamp-2">{med.title}</span>
                          </div>
                          {/* Featured star */}
                          {med.featured && (
                            <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-yellow-500/90 rounded-full flex items-center justify-center text-[10px]">⭐</div>
                          )}
                          {/* Category pill */}
                          <div className="absolute top-1.5 right-1.5">
                            <span className="text-[8px] font-bold bg-black/70 text-zinc-300 px-1.5 py-0.5 rounded-md backdrop-blur-sm">{med.category}</span>
                          </div>
                        </div>

                        {/* Expanded edit row */}
                        {mediaExpandedId === med.id && (
                          <div className="mt-2 space-y-2 p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Title</label>
                              <input
                                type="text"
                                value={med.title}
                                onChange={(e) => {
                                  const list = [...(data.media || [])];
                                  list[medIdx].title = e.target.value;
                                  setData({ ...data, media: list });
                                }}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-600 font-bold uppercase">Description</label>
                              <textarea
                                rows={2}
                                value={med.description}
                                onChange={(e) => {
                                  const list = [...(data.media || [])];
                                  list[medIdx].description = e.target.value;
                                  setData({ ...data, media: list });
                                }}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 resize-none focus:outline-none"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">Category</label>
                                <select
                                  value={med.category}
                                  onChange={(e) => {
                                    const list = [...(data.media || [])];
                                    list[medIdx].category = e.target.value;
                                    setData({ ...data, media: list });
                                  }}
                                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-400 focus:outline-none"
                                >
                                  {['CSI Event','Hackathon','Internship','Project','Certificate','Workshop','Stage','Campus','Award','Personal'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase">Date</label>
                                <input
                                  type="date"
                                  value={med.date}
                                  onChange={(e) => {
                                    const list = [...(data.media || [])];
                                    list[medIdx].date = e.target.value;
                                    setData({ ...data, media: list });
                                  }}
                                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Publishing Status & Scheduled Date */}
                            <div className="space-y-2 pt-2 border-t border-zinc-850">
                              <div>
                                <label className="text-[9px] text-zinc-550 font-bold uppercase block">Publishing Status</label>
                                <select
                                  value={med.publishStatus || 'published'}
                                  onChange={(e) => {
                                    const list = [...(data.media || [])];
                                    list[medIdx].publishStatus = e.target.value;
                                    setData({ ...data, media: list });
                                  }}
                                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                >
                                  <option value="published">🟢 Published</option>
                                  <option value="draft">🟡 Draft</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-555 font-bold uppercase block">Scheduled Publishing Date</label>
                                <input
                                  type="datetime-local"
                                  value={med.publishedAt ? new Date(new Date(med.publishedAt).getTime() - new Date().getTimezoneOffset()*60000).toISOString().slice(0, 16) : ''}
                                  onChange={(e) => {
                                    const list = [...(data.media || [])];
                                    list[medIdx].publishedAt = e.target.value ? new Date(e.target.value).toISOString() : null;
                                    setData({ ...data, media: list });
                                  }}
                                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <div
                                  onClick={() => {
                                    const list = [...(data.media || [])];
                                    list[medIdx].featured = !list[medIdx].featured;
                                    setData({ ...data, media: list });
                                  }}
                                  className={`w-8 h-4 rounded-full border transition-all relative cursor-pointer ${med.featured ? 'bg-yellow-500/30 border-yellow-500/60' : 'bg-zinc-800 border-zinc-700'}`}
                                >
                                  <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${med.featured ? 'left-4 bg-yellow-400' : 'left-0.5 bg-zinc-600'}`} />
                                </div>
                                <span className="text-[9px] text-zinc-500">Featured</span>
                              </label>
                              <div className="flex gap-2 items-center">
                                <button
                                  type="button"
                                  disabled={medIdx === 0}
                                  onClick={() => reorderItem('media', medIdx, 'up')}
                                  className="text-zinc-500 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                                  title="Move Up"
                                >
                                  <ChevronUp size={14} />
                                </button>
                                <button
                                  type="button"
                                  disabled={medIdx === (data.media || []).length - 1}
                                  onClick={() => reorderItem('media', medIdx, 'down')}
                                  className="text-zinc-500 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                                  title="Move Down"
                                >
                                  <ChevronDown size={14} />
                                </button>
                                <label className="text-[9px] text-blue-400 font-bold cursor-pointer hover:text-blue-300 transition-colors">
                                  Replace Photo
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const b64 = await processImageFile(file, 1200, 900, false);
                                        const list = [...(data.media || [])];
                                        list[medIdx].image = b64;
                                        setData({ ...data, media: list });
                                      }
                                    }}
                                  />
                                </label>
                                <button
                                  onClick={() => deleteMediaItem(med.id)}
                                  className="text-[9px] text-red-400 font-bold hover:text-red-300 cursor-pointer transition-colors"
                                >Delete</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* TAB 11: INSIGHTS / ANALYTICS */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass p-5 rounded-3xl border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block">Total Visitors</span>
                  <h4 className="text-3xl font-black text-white">{data.analytics?.visitors || 0}</h4>
                  <span className="text-[9px] text-green-400 font-bold block">↑ +14.2% this week</span>
                </div>
                <div className="glass p-5 rounded-3xl border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block">Resume Downloads</span>
                  <h4 className="text-3xl font-black text-white">{data.analytics?.resumeDownloads || 0}</h4>
                  <span className="text-[9px] text-purple-400 font-bold block">↑ +8.5% conversion</span>
                </div>
                <div className="glass p-5 rounded-3xl border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block">Contact Clicks</span>
                  <h4 className="text-3xl font-black text-white">{data.analytics?.linkClicks || 0}</h4>
                  <span className="text-[9px] text-blue-400 font-bold block">↑ +5.1% engagement</span>
                </div>
                <div className="glass p-5 rounded-3xl border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block">Top Project</span>
                  <h4 className="text-sm font-black text-white truncate">
                    {(() => {
                      const projectViews = data.analytics?.projectViews || {};
                      const topProjectId = Object.keys(projectViews).reduce((a, b) => (projectViews[a] || 0) > (projectViews[b] || 0) ? a : b, '');
                      const topProj = (data.projects || []).find((p: any) => p.id === topProjectId);
                      return topProj ? topProj.title : 'None';
                    })()}
                  </h4>
                  <span className="text-[9px] text-amber-500 font-bold block">
                    {(() => {
                      const projectViews = data.analytics?.projectViews || {};
                      const maxViews = Math.max(...Object.values(projectViews) as number[], 0);
                      return `${maxViews} views`;
                    })()}
                  </span>
                </div>
              </div>

              {/* Visitor Growth SVG Chart */}
              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-white text-base">Visitor Analytics Over Time</h3>
                  <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full font-bold">Past 7 Days</span>
                </div>
                <div className="w-full h-48 bg-zinc-950/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="relative w-full h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="25" x2="100" y2="25" stroke="#27272a" strokeWidth="0.25" strokeDasharray="3" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#27272a" strokeWidth="0.25" strokeDasharray="3" />
                      <line x1="0" y1="75" x2="100" y2="75" stroke="#27272a" strokeWidth="0.25" strokeDasharray="3" />
                      
                      <path
                        d="M 0 100 L 0 65 L 16 55 L 32 75 L 48 45 L 64 35 L 80 50 L 100 20 L 100 100 Z"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M 0 65 L 16 55 L 32 75 L 48 45 L 64 35 L 80 50 L 100 20"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="0" cy="65" r="1.5" fill="#a855f7" />
                      <circle cx="16" cy="55" r="1.5" fill="#a855f7" />
                      <circle cx="32" cy="75" r="1.5" fill="#a855f7" />
                      <circle cx="48" cy="45" r="1.5" fill="#a855f7" />
                      <circle cx="64" cy="35" r="1.5" fill="#a855f7" />
                      <circle cx="80" cy="50" r="1.5" fill="#a855f7" />
                      <circle cx="100" cy="20" r="1.5" fill="#a855f7" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[8px] text-zinc-500 font-extrabold uppercase px-1">
                    <span>May 21</span>
                    <span>May 22</span>
                    <span>May 23</span>
                    <span>May 24</span>
                    <span>May 25</span>
                    <span>May 26</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>

              {/* Geographic Reach & Engagement breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <Globe size={16} className="text-purple-500" /> Geographic Reach
                  </h3>
                  <div className="space-y-3">
                    {(data.analytics?.countries || []).map((country: any) => {
                      const total = (data.analytics?.countries || []).reduce((acc: number, c: any) => acc + (c.count || 0), 0) || 1;
                      const pct = Math.round(((country.count || 0) / total) * 100);
                      return (
                        <div key={country.code} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-white">{country.name}</span>
                            <span className="text-zinc-400">{country.count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-purple-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                  <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <LinkIcon size={16} className="text-purple-500" /> Engagement Breakdown
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900/60 space-y-2">
                      <span className="text-[9px] uppercase font-black text-zinc-550 block">Click Tracking</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">GitHub</span>
                          <span className="text-white font-bold">{data.analytics?.clicks?.github || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">LinkedIn</span>
                          <span className="text-white font-bold">{data.analytics?.clicks?.linkedin || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">WhatsApp</span>
                          <span className="text-white font-bold">{data.analytics?.clicks?.whatsapp || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 font-bold">Calendly</span>
                          <span className="text-white font-bold">{data.analytics?.clicks?.calendly || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900/60 space-y-2">
                      <span className="text-[9px] uppercase font-black text-zinc-550 block">Project Card Views</span>
                      <div className="space-y-1.5 text-xs max-h-28 overflow-y-auto scrollbar-thin">
                        {Object.entries(data.analytics?.projectViews || {}).map(([id, views]) => {
                          const proj = (data.projects || []).find((p: any) => p.id === id);
                          return (
                            <div key={id} className="flex justify-between gap-2">
                              <span className="text-zinc-500 font-bold truncate">{proj ? proj.title : id}</span>
                              <span className="text-white font-bold shrink-0">{views as number}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 12: SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass p-6 rounded-3xl border-white/5 space-y-6">
                <div className="flex items-center gap-2">
                  <Eye className="text-purple-500" size={18} />
                  <h3 className="font-extrabold text-white text-base">Public Section Visibility</h3>
                </div>
                <p className="text-xs text-zinc-400">Toggle which sections should be visible on your live public portfolio. Hidden sections will only be visible in this CMS.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {['about', 'timeline', 'experience', 'leadership', 'projects', 'skills', 'credentials', 'achievements', 'updates', 'gallery'].map(section => {
                    const isVisible = data.settings?.visibility?.[section as keyof NonNullable<typeof data.settings.visibility>] ?? true;
                    return (
                      <div key={section} className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl">
                        <span className="text-xs font-bold text-white capitalize">{section}</span>
                        <button
                          onClick={() => {
                            setData({
                              ...data,
                              settings: {
                                ...data.settings,
                                visibility: {
                                  ...(data.settings?.visibility || {}),
                                  [section]: !isVisible
                                }
                              }
                            });
                          }}
                          className={`relative w-10 h-5 rounded-full transition-colors ${isVisible ? 'bg-purple-500' : 'bg-zinc-700'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isVisible ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>


              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="text-purple-500" size={18} />
                  <h3 className="font-extrabold text-white text-base">Global SEO & Metadata</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Meta Title</label>
                    <input
                      type="text"
                      value={data.settings?.seo?.title || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            seo: { ...data.settings?.seo, title: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="e.g. Chandru S | Portfolio"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Google Analytics ID</label>
                    <input
                      type="text"
                      value={data.settings?.seo?.googleAnalyticsId || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            seo: { ...data.settings?.seo, googleAnalyticsId: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Meta Keywords</label>
                    <input
                      type="text"
                      value={data.settings?.seo?.keywords || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            seo: { ...data.settings?.seo, keywords: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="AI, developer, Next.js, FastAPI, IT"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Meta Description</label>
                    <textarea
                      rows={3}
                      value={data.settings?.seo?.description || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            seo: { ...data.settings?.seo, description: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none resize-none"
                      placeholder="A brief summary for search engines..."
                    />
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <Sun className="text-purple-500" size={18} />
                  <h3 className="font-extrabold text-white text-base">Branding & Theme Settings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase block">Accent Theme Color</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { color: 'purple', label: 'Royal Purple', hex: '#a855f7' },
                        { color: 'blue', label: 'Neon Blue', hex: '#3b82f6' },
                        { color: 'emerald', label: 'Emerald Green', hex: '#10b981' },
                        { color: 'pink', label: 'Vibrant Pink', hex: '#ec4899' }
                      ].map((col) => (
                        <button
                          key={col.color}
                          onClick={() => {
                            setData({
                              ...data,
                              settings: {
                                ...data.settings,
                                theme: { ...data.settings?.theme, accentColor: col.color }
                              }
                            });
                          }}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            (data.settings?.theme?.accentColor || 'purple') === col.color
                              ? 'bg-zinc-900 border-white/20 text-white shadow-lg'
                              : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: col.hex }} />
                          {col.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white">Maintenance Mode</h4>
                        <p className="text-[10px] text-zinc-500">Hide portfolio sections with a placeholder splash screen</p>
                      </div>
                      <button
                        onClick={() => {
                          setData({
                            ...data,
                            settings: {
                              ...data.settings,
                              maintenanceMode: !data.settings?.maintenanceMode
                            }
                          });
                        }}
                        className={`w-12 h-6 rounded-full border transition-all relative cursor-pointer ${
                          data.settings?.maintenanceMode ? 'bg-red-500/20 border-red-500/50' : 'bg-zinc-900 border-zinc-800'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                          data.settings?.maintenanceMode ? 'left-7 bg-red-500' : 'left-0.5 bg-zinc-500'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="text-purple-500" size={18} />
                  <h3 className="font-extrabold text-white text-base">EmailJS — Contact Form</h3>
                  {data.settings?.emailjs?.serviceId && data.settings?.emailjs?.templateId && data.settings?.emailjs?.publicKey ? (
                    <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-black text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider ml-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-[9px] font-black text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider ml-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Not Configured
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Connect <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-bold underline">EmailJS</a> to receive contact form messages directly in your inbox. Free tier supports 200 emails/month. Without this, the form falls back to a <code className="text-[10px] bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-400">mailto:</code> link.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Service ID</label>
                    <input
                      type="text"
                      value={data.settings?.emailjs?.serviceId || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            emailjs: { ...data.settings?.emailjs, serviceId: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                      placeholder="service_xxxxxxx"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Template ID</label>
                    <input
                      type="text"
                      value={data.settings?.emailjs?.templateId || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            emailjs: { ...data.settings?.emailjs, templateId: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                      placeholder="template_xxxxxxx"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase">Public Key</label>
                    <input
                      type="text"
                      value={data.settings?.emailjs?.publicKey || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            emailjs: { ...data.settings?.emailjs, publicKey: e.target.value }
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
                      placeholder="abcDEF123456"
                    />
                  </div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3 space-y-1.5">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Quick Setup Guide</p>
                  <ol className="text-[11px] text-zinc-500 space-y-0.5 list-decimal list-inside">
                    <li>Sign up at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold">emailjs.com</a></li>
                    <li>Create an Email Service (connect Gmail/Outlook) → copy <strong className="text-zinc-400">Service ID</strong></li>
                    <li>Create a Template with variables: <code className="text-[10px] bg-zinc-950 px-1 py-0.5 rounded text-purple-400">{'{{from_name}}'}</code> <code className="text-[10px] bg-zinc-950 px-1 py-0.5 rounded text-purple-400">{'{{from_email}}'}</code> <code className="text-[10px] bg-zinc-950 px-1 py-0.5 rounded text-purple-400">{'{{message}}'}</code> → copy <strong className="text-zinc-400">Template ID</strong></li>
                    <li>Go to Account → API Keys → copy <strong className="text-zinc-400">Public Key</strong></li>
                    <li>Paste all three above and hit <strong className="text-zinc-400">Save</strong></li>
                  </ol>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="text-purple-500" size={18} />
                  <h3 className="font-extrabold text-white text-base">Database Utilities</h3>
                </div>
                <p className="text-[11px] text-zinc-450">
                  Manage backup files, restore database to a clean backup JSON, or reset configuration.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showNotice('success', 'Backup JSON downloaded successfully.');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 hover:border-purple-500/35 text-purple-400 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download size={14} /> Download Backup (JSON)
                  </button>

                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-all cursor-pointer">
                    <Upload size={14} /> Upload & Restore Backup
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const json = JSON.parse(event.target?.result as string);
                            // Schema validation: check required top-level keys
                            const requiredKeys = ['personal', 'experience', 'projects', 'certifications', 'achievements'];
                            const missingKeys = requiredKeys.filter(k => !(k in json));
                            if (!json || typeof json !== 'object' || missingKeys.length > 0) {
                              showNotice('error', `Invalid backup: missing ${missingKeys.join(', ')}. Must be a valid portfolio export.`);
                              return;
                            }
                            if (typeof json.personal !== 'object' || !json.personal.name) {
                              showNotice('error', 'Invalid backup: personal.name is required.');
                              return;
                            }
                            setData(json);
                            showNotice('success', 'Database restored from backup!');
                          } catch (err) {
                            showNotice('error', 'Restore failed. Invalid JSON structure.');
                          }
                        };
                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          )}

            </div>

            {/* Right side: Live Preview Panel */}
            {livePreview && (
              <div className="max-h-[calc(100vh-220px)] overflow-y-auto border border-zinc-900 rounded-3xl bg-zinc-950 p-4 scrollbar-thin pb-20">
                <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-md z-20 flex justify-between items-center py-2.5 px-4 border-b border-zinc-900 mb-6 rounded-xl">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" /> Live Preview Sandbox
                  </span>
                  <span className="text-[9px] text-zinc-500">Read-only synchronized mockup</span>
                </div>
                <PreviewSections data={data} />
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Draft Recovery Modal */}
      <AnimatePresence>
        {showDraftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-6 rounded-3xl border-white/10 max-w-md w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-purple-400">
                <Database size={24} />
                <h3 className="text-lg font-black tracking-tight text-white">Unsaved Draft Recovered</h3>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We found a safety backup of your database with unsaved edits saved locally. Would you like to restore this version or start fresh with the server's database?
              </p>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('portfolio_draft');
                    }
                    setHasRecoverableDraft(false);
                    setShowDraftModal(false);
                    showNotice('success', 'Draft discarded. Using server database.');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition-all cursor-pointer border border-zinc-800"
                >
                  Discard Draft
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const saved = localStorage.getItem('portfolio_draft');
                      if (saved) {
                        const parsed = JSON.parse(saved);
                        if (parsed && parsed.data) {
                          setData(parsed.data);
                          showNotice('success', 'Draft restored successfully!');
                        }
                      }
                    }
                    setHasRecoverableDraft(false);
                    setShowDraftModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  Restore Draft
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Global Confirm Dialog (replaces window.confirm) */}
      <ConfirmDialog
        isOpen={!!confirmDialog}
        title={confirmDialog?.title || ''}
        message={confirmDialog?.message || ''}
        confirmLabel={confirmDialog?.confirmLabel}
        variant={confirmDialog?.variant}
        onConfirm={() => confirmDialog?.onConfirm?.()}
        onCancel={() => setConfirmDialog(null)}
      />
    </div>
  );
}
