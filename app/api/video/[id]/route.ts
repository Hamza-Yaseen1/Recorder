import { NextRequest, NextResponse } from 'next/server';
import { VideoMetadata } from '@/types';

// Declare global type for video metadata store
declare global {
  var videoMetadataStore: Map<string, VideoMetadata> | undefined;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Initialize store if it doesn't exist
    if (!global.videoMetadataStore) {
      global.videoMetadataStore = new Map();
    }

    // Check if video metadata exists
    const metadata = global.videoMetadataStore.get(id);

    if (!metadata) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}
