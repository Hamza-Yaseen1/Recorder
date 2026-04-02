# API Contracts - Loom AI Screen Recorder

## Video Upload API

### POST /api/upload

**Description**: Upload a recorded video file for processing

**Request**:
- Method: POST
- Path: `/api/upload`
- Content-Type: `multipart/form-data`
- Body: Form field `video` containing the video file

**Response**:
- Success (200): 
```json
{
  "id": "string",
  "status": "processing",
  "message": "Video uploaded successfully"
}
```

- Error (400): 
```json
{
  "error": "string",
  "message": "Validation error details"
}
```

- Error (500): 
```json
{
  "error": "string",
  "message": "Internal server error"
}
```

**Authentication**: None required for MVP

## Transcription API

### POST /api/ai/transcribe

**Description**: Convert audio/video to text using OpenAI Whisper

**Request**:
- Method: POST
- Path: `/api/ai/transcribe`
- Content-Type: `multipart/form-data`
- Body: Form field `file` containing the audio/video file

**Response**:
- Success (200): 
```json
{
  "segments": [
    {
      "start": 0,
      "end": 30,
      "text": "Introduction to the presentation..."
    }
  ]
}
```

- Error (400): 
```json
{
  "error": "string",
  "message": "Validation error details"
}
```

## Summary Generation API

### POST /api/ai/summarize

**Description**: Generate timeline summary from transcription

**Request**:
- Method: POST
- Path: `/api/ai/summarize`
- Content-Type: `application/json`
- Body: 
```json
{
  "transcript": "Full transcript text...",
  "duration": 300
}
```

**Response**:
- Success (200): 
```json
{
  "summary": [
    {
      "startTime": 0,
      "endTime": 30,
      "title": "Introduction"
    },
    {
      "startTime": 30,
      "endTime": 120,
      "title": "Project Overview"
    }
  ]
}
```

## Video Retrieval API

### GET /api/video/[id]

**Description**: Retrieve video details and processed summary

**Request**:
- Method: GET
- Path: `/api/video/{id}`
- Parameters: Video ID in path

**Response**:
- Success (200): 
```json
{
  "id": "string",
  "status": "processing" | "complete",
  "videoUrl": "string",
  "summary": [
    {
      "startTime": 0,
      "endTime": 30,
      "title": "Introduction"
    }
  ],
  "transcript": "string"
}
```

- Error (404): 
```json
{
  "error": "Not Found",
  "message": "Video not found"
}
```