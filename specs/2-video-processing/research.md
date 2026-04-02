# Research: Video Processing Pipeline Fix

## Overview
This research addresses the implementation of a video processing pipeline that replaces mock timeline summary data with real AI-generated summaries. The implementation will use existing API routes to process uploaded videos and update the UI to handle async processing.

## Key Decisions

### Decision: Use Existing API Infrastructure
**Rationale**: The user specified existing API routes (/api/ai/transcribe and /api/ai/summarize) should be used, which follows the architectural constraint of keeping API keys server-side and reduces development time by leveraging existing infrastructure.

**Alternatives considered**: 
- Building new API endpoints from scratch (would take more time and potentially violate security constraints)
- Client-side processing (would expose API keys and is computationally expensive)

### Decision: Async Processing with Loading States
**Rationale**: Videos can take time to process, so proper async handling with loading states is essential for user experience. This matches the user's requirement to "show loading state while processing".

**Alternatives considered**:
- Synchronous processing (would block UI)
- No loading indicators (would create poor UX)

### Decision: Update processVideo() Function
**Rationale**: The user specifically identified app/watch/[id]/page.tsx as the location to update the processVideo() function, which is the logical place to handle the video processing workflow.

**Alternatives considered**:
- Creating a separate service (would complicate the architecture unnecessarily)

## Technical Unknowns Resolved

### Video Upload Handling
**Issue**: How are videos currently uploaded and stored?
**Resolution**: Based on the user context mentioning a "Recorder" project, videos are likely stored after upload/recording and referenced by ID in the app/watch/[id]/ route.

### API Response Format
**Issue**: What is the exact format of responses from /api/ai/transcribe and /api/ai/summarize?
**Resolution**: Assuming standard JSON responses. Transcription API likely returns text, and summarization API returns structured timeline data in the format specified by the user: {startTime, endTime, title, description}.

### Error Handling Strategy
**Issue**: How should API errors be handled during processing?
**Resolution**: The user specified to "handle API errors properly", which means implementing try/catch blocks and displaying user-friendly error messages.

## Implementation Approach

1. Update the processVideo() function to call the transcription API with the video file
2. Use the transcription result to call the summarization API
3. Update the UI to show loading states during processing
4. Replace mock timeline data with the API response
5. Implement proper error handling

## Data Flow

1. Video file available in app/watch/[id]/page.tsx
2. Send video to /api/ai/transcribe → receives transcript text
3. Send transcript to /api/ai/summarize → receives timeline segments
4. Update UI with real timeline segments instead of mock data