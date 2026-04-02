# Quickstart Guide: Video Processing Pipeline

## Overview
This guide explains how to implement the video processing pipeline that automatically generates timeline summaries after a video is uploaded.

## Prerequisites
- Node.js 18+ and npm/yarn
- Next.js 15+ project with existing API routes at `/api/ai/transcribe` and `/api/ai/summarize`
- Video upload functionality already implemented

## Setup Steps

### 1. Update the Video Processing Function
Modify the `processVideo()` function in `app/watch/[id]/page.tsx` to implement the AI processing pipeline:

1. Send the video file to `/api/ai/transcribe` to get the transcript
2. Send the transcript to `/api/ai/summarize` to get the timeline segments
3. Replace mock timeline data with the API response
4. Add loading states during processing
5. Implement error handling

### 2. Data Structure Implementation
Ensure your application can handle the `SummarySegment` type:
```typescript
type SummarySegment = {
  startTime: number;
  endTime: number;
  title: string;
  description: string;
}
```

### 3. API Integration
The implementation relies on two existing API routes:
- `POST /api/ai/transcribe` - Converts video audio to text transcript
- `POST /api/ai/summarize` - Generates timeline segments from transcript

### 4. UI Updates
- Display loading indicators while processing
- Show error messages if API calls fail
- Update timeline display with real data instead of mock data

## Testing
1. Upload a video with clear audio
2. Verify that the timeline summary is generated automatically
3. Check that each segment has accurate start time, end time, title, and description
4. Test error handling with invalid video files

## Expected Outcome
After implementing this pipeline, users will see AI-generated timeline summaries that accurately reflect the content of their uploaded videos, replacing the current mock data implementation.