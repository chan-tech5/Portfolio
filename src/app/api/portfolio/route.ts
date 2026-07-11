import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

// Concurrency lock (Mutex) to prevent simultaneous writes to portfolio.json
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

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Prevent credentials from leaking in public GET requests
    if (data.settings) {
      delete data.settings.adminPassword;
      delete data.settings.adminPasswordHash;
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Check authorization session cookie
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (!session || session.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await acquireLock();
  try {
    const updatedData = await request.json();
    
    // Validate that we got a valid JSON object
    if (!updatedData || typeof updatedData !== 'object') {
      releaseLock();
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Auto-update the lastUpdated timestamp in settings
    if (!updatedData.settings) {
      updatedData.settings = {};
    }
    updatedData.settings.lastUpdated = new Date().toISOString();

    // Save to the file system
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf-8');
    
    releaseLock();
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error updating portfolio data:', error);
    releaseLock();
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
  }
}

