# API Contract: Video Processing Pipeline

## Overview
This document defines the API contracts for the video processing pipeline that generates timeline summaries from video transcripts.

## Transcription API

### Endpoint
`POST /api/ai/transcribe`

### Description
Converts video audio to text transcript using AI services.

### Request
**Method**: POST
**Content-Type**: multipart/form-data
**Body**: 
- `video` (file): Video file to transcribe

### Response

#### Success (200 OK)
```json
{
  "success": true,
  "transcript": "Full text transcript of the video...",
  "wordCount": 1250,
  "duration": 300
}
```

#### Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Invalid video file format"
}
```

#### Error (500 Internal Server Error)
```json
{
  "success": false,
  "error": "Transcription service unavailable"
}
```

## Summary Generation API

### Endpoint
`POST /api/ai/summarize`

### Description
Generates timeline segments from a transcript using AI services.

### Request
**Method**: POST
**Content-Type**: application/json
**Body**:
```json
{
  "transcript": "Full text transcript...",
  "videoDuration": 300,
  "language": "en"  // Optional, defaults to "en"
}
```

### Response

#### Success (200 OK)
```json
{
  "success": true,
  "timeline": {
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
}
```

#### Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Transcript is required"
}
```

#### Error (500 Internal Server Error)
```json
{
  "success": false,
  "error": "Summarization service unavailable"
}
}
```

## Frontend Integration API

### Endpoint
`GET /api/videos/[id]/timeline`

### Description
Retrieves the timeline summary for a specific video.

### Request
**Method**: GET
**Params**:
- `id` (string): Video ID

### Response

#### Success (200 OK)
```json
{
  "videoId": "video-123",
  "status": "completed",
  "createdAt": "2026-04-02T12:00:00Z",
  "segments": [...]
}
```

#### Not Found (404 Not Found)
```json
{
  "error": "Video timeline not found"
}
```