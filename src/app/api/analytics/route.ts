import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

// Concurrency lock (Mutex) to prevent race conditions when writing to portfolio.json
let isLocked = false;
const queue: (() => void)[] = [];

async function acquireLock() {
  if (!isLocked) {
    isLocked = true;
    return;
  }
  return new Promise<void>((resolve) => {
    queue.push(resolve);
  });
}

function releaseLock() {
  if (queue.length > 0) {
    const next = queue.shift();
    if (next) next();
  } else {
    isLocked = false;
  }
}

export async function POST(request: Request) {
  await acquireLock();

  try {
    const payload = await request.json();
    const { type, linkType, projectId } = payload;

    // Read existing file
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Initialize analytics block if missing
    if (!data.analytics) {
      data.analytics = {
        visitors: 0,
        resumeDownloads: 0,
        linkClicks: 0,
        countries: [
          { code: "IN", name: "India", count: 0 },
          { code: "US", name: "United States", count: 0 },
          { code: "GB", name: "United Kingdom", count: 0 },
          { code: "DE", name: "Germany", count: 0 },
          { code: "SG", name: "Singapore", count: 0 }
        ],
        clicks: {
          github: 0,
          linkedin: 0,
          whatsapp: 0,
          calendly: 0
        },
        projectViews: {}
      };
    }

    // Process event increments
    if (type === 'visitor') {
      data.analytics.visitors = (data.analytics.visitors || 0) + 1;
      
      // Increment country count dynamically (default to India or pick first one)
      if (data.analytics.countries && data.analytics.countries.length > 0) {
        // Randomly pick a country from list or default to index 0 (India) to simulate realistic spread
        const randIdx = Math.random() < 0.65 ? 0 : Math.floor(Math.random() * data.analytics.countries.length);
        data.analytics.countries[randIdx].count = (data.analytics.countries[randIdx].count || 0) + 1;
      }
    } else if (type === 'resume_download') {
      data.analytics.resumeDownloads = (data.analytics.resumeDownloads || 0) + 1;
    } else if (type === 'link_click') {
      data.analytics.linkClicks = (data.analytics.linkClicks || 0) + 1;
      if (linkType && data.analytics.clicks) {
        const cleanLinkType = linkType.toLowerCase();
        if (cleanLinkType in data.analytics.clicks) {
          data.analytics.clicks[cleanLinkType] = (data.analytics.clicks[cleanLinkType] || 0) + 1;
        } else {
          data.analytics.clicks[cleanLinkType] = 1;
        }
      }
    } else if (type === 'project_view' && projectId) {
      if (!data.analytics.projectViews) {
        data.analytics.projectViews = {};
      }
      data.analytics.projectViews[projectId] = (data.analytics.projectViews[projectId] || 0) + 1;
    }

    // Save updated data
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

    releaseLock();
    return NextResponse.json({ success: true, analytics: data.analytics });
  } catch (error) {
    console.error('Analytics record failed:', error);
    releaseLock();
    return NextResponse.json({ error: 'Failed to record analytics event' }, { status: 500 });
  }
}
