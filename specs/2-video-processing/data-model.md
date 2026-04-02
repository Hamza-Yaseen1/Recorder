# Data Model: Video Processing Pipeline Fix

## Summary
This document defines the data structures and formats required for the video processing pipeline that generates timeline summaries from video transcripts.

## Core Entities

### SummarySegment
**Description**: Represents a single segment in the timeline summary with temporal boundaries and descriptive metadata

**Fields**:
- `startTime`: number (required) - Start time in seconds from the beginning of the video
- `endTime`: number (required) - End time in seconds from the beginning of the video  
- `title`: string (required) - Brief title for the segment
- `description`: string (required) - Short description of the segment content

**Validation Rules**:
- `startTime` must be >= 0 and less than `endTime`
- `endTime` must be greater than `startTime` and not exceed video duration
- `title` must be 1-100 characters
- `description` must be 1-500 characters

**Example**:
```json
{
  "startTime": 15.5,
  "endTime": 42.3,
  "title": "Introduction",
  "description": "Presenter introduces the topic and outlines the presentation"
}
```

### TimelineSummary
**Description**: Collection of SummarySegment objects representing the complete timeline of a video

**Fields**:
- `segments`: SummarySegment[] (required) - Array of timeline segments ordered by startTime
- `videoId`: string (required) - Reference to the video this summary belongs to
- `createdAt`: Date (required) - Timestamp when the summary was generated
- `status`: "pending" | "processing" | "completed" | "failed" (required) - Processing status

**Validation Rules**:
- `segments` array must not be empty when status is "completed"
- All segments must have non-overlapping time ranges
- Segments must be ordered chronologically by startTime

**Example**:
```json
{
  "videoId": "video-123",
  "status": "completed",
  "createdAt": "2026-04-02T12:00:00Z",
  "segments": [
    {
      "startTime": 0,
      "endTime": 30.5,
      "title": "Introduction",
      "description": "Presenter introduces the topic"
    },
    {
      "startTime": 30.5,
      "endTime": 120.2,
      "title": "Main Content",
      "description": "Detailed explanation of the main topic"
    }
  ]
}
```

### ProcessingJob
**Description**: Represents an individual video processing task

**Fields**:
- `id`: string (required) - Unique identifier for the processing job
- `videoId`: string (required) - Reference to the video being processed
- `status`: "queued" | "transcribing" | "analyzing" | "generating" | "completed" | "failed" (required)
- `progress`: number (0-100) - Progress percentage (optional)
- `createdAt`: Date (required) - When the job was created
- `updatedAt`: Date (required) - Last status update
- `error`: string (optional) - Error message if status is "failed"

**Validation Rules**:
- `progress` must be between 0 and 100
- `status` transitions must follow the sequence: queued → transcribing → analyzing → generating → completed/failed

## API Request/Response Formats

### Transcription Request
**Endpoint**: POST /api/ai/transcribe
**Payload**: FormData with video file
**Headers**: Content-Type: multipart/form-data

### Transcription Response
**Success**:
```json
{
  "success": true,
  "transcript": "Full text transcript of the video..."
}
```

**Error**:
```json
{
  "success": false,
  "error": "Error message"
}
```

### Summary Generation Request
**Endpoint**: POST /api/ai/summarize
**Payload**:
```json
{
  "transcript": "Full text transcript...",
  "videoDuration": 300 // in seconds
}
```

### Summary Generation Response
**Success**:
```json
{
  "success": true,
  "timeline": {
    "segments": [...]
  }
}
```

**Error**:
```json
{
  "success": false,
  "error": "Error message"
}
```