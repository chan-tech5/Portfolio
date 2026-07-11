'use client';

import React from 'react';
import Hero from './Sections/Hero';
import About from './Sections/About';
import Timeline from './ui/Timeline';
import Experience from './Sections/Experience';
import Leadership from './Sections/Leadership';
import Projects from './Sections/Projects';
import Skills from './Sections/Skills';
import Certifications from './Sections/Certifications';
import Achievements from './Sections/Achievements';
import ActivityFeed from './Sections/ActivityFeed';
import MediaVault from './Sections/MediaVault';
import Contact from './Sections/Contact';

interface PreviewSectionsProps {
  data: any;
}

export default function PreviewSections({ data }: PreviewSectionsProps) {
  if (!data) return null;

  // Filter out draft items so the live sandbox preview behaves exactly like the production homepage.
  const filterPublished = (items: any[] | undefined) => {
    if (!items) return [];
    return items.filter(item => {
      const isDraft = item.publishStatus === 'draft' || item.status === 'draft';
      const isFutureScheduled = item.publishedAt && new Date(item.publishedAt) > new Date();
      return !isDraft && !isFutureScheduled;
    });
  };

  const publishedTimeline = filterPublished(data.timeline);
  const publishedExperience = filterPublished(data.experience);
  const publishedLeadership = filterPublished(data.leadership);
  const publishedProjects = filterPublished(data.projects);
  const publishedCertifications = filterPublished(data.certifications);
  const publishedAchievements = filterPublished(data.achievements);
  const publishedUpdates = filterPublished(data.updates);
  const publishedBlogs = filterPublished(data.blogs);
  const publishedMedia = filterPublished(data.media);

  const previewData = {
    ...data,
    timeline: publishedTimeline,
    experience: publishedExperience,
    leadership: publishedLeadership,
    projects: publishedProjects,
    certifications: publishedCertifications,
    achievements: publishedAchievements,
    updates: publishedUpdates,
    blogs: publishedBlogs,
    media: publishedMedia,
  };

  return (
    <div className="w-full space-y-16 scale-90 origin-top pointer-events-none select-none">
      <Hero personal={previewData.personal} />
      <About about={previewData.personal.about} />
      
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-blue-500 px-4">
          Journey Timeline Preview
        </h4>
        <Timeline items={previewData.timeline} />
      </div>

      <Experience experience={previewData.experience} />
      <Leadership leadership={previewData.leadership} />
      <Projects projects={previewData.projects} />
      
      <Skills 
        skills={previewData.skills} 
        projects={previewData.projects} 
        experience={previewData.experience} 
        leadership={previewData.leadership}
      />
      
      <Certifications certifications={previewData.certifications} />
      <Achievements achievements={previewData.achievements} />
      <ActivityFeed updates={previewData.updates} />
      <MediaVault media={previewData.media} />
      <Contact personal={previewData.personal} />
    </div>
  );
}
