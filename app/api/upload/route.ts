import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { VideoMetadata } from '../../../types';
import { PROCESSING_STATUS } from '../../../constants';

// Declare global type for video metadata store
declare global {
  var videoMetadataStore: Map<string, VideoMetadata> | undefined;
}

// Define upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists
    await ensureUploadDir();

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('video') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'File must be a video' },
        { status: 400 }
      );
    }

    // Validate file size (1GB limit)
    if (file.size > 1024 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 1GB limit' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueFilename = `${uuidv4()}_${file.name}`;
    const filepath = path.join(UPLOAD_DIR, uniqueFilename);

    // Convert file to buffer and write to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filepath, buffer);

    // Generate unique video ID
    const videoId = uuidv4();
    
    // Create video metadata
    const videoMetadata: VideoMetadata = {
      id: videoId,
      filename: uniqueFilename, // Store the actual filename on disk
      size: file.size,
      duration: 0, // Will be calculated later
      uploadDate: new Date(),
      status: PROCESSING_STATUS.UPLOADED,
      videoUrl: `/uploads/${uniqueFilename}`, // Relative URL for the uploaded file
    };

    // Store metadata in memory (in production, use a database)
    // We'll use a global Map for now
    if (!global.videoMetadataStore) {
      global.videoMetadataStore = new Map();
    }
    global.videoMetadataStore.set(videoId, videoMetadata);

    // Return the video ID and metadata
    return NextResponse.json({
      id: videoId,
      status: 'complete',
      message: 'Video uploaded successfully',
      videoUrl: videoMetadata.videoUrl,
      metadata: videoMetadata
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}