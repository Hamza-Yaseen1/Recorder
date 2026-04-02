# Data Models - Loom AI Screen Recorder

## Core Entities

### RecordingSession
Represents a single recording session initiated by a user

**Fields:**
- id: string (unique identifier)
- userId: string (optional, for future authentication)
- startTime: Date (when recording started)
- endTime: Date (when recording ended, optional during recording)
- status: 'idle' | 'recording' | 'paused' | 'stopping' | 'uploading' | 'processing' | 'complete' | 'error'
- videoBlob: Blob (the recorded video data, stored temporarily)
- audioEnabled: boolean (whether audio was captured)
- webcamEnabled: boolean (whether webcam was included)
- settings: RecordingSettings object

**Validation Rules:**
- id must be unique
- startTime must be before endTime (when endTime is present)
- status must be one of the allowed values
- videoBlob must be present when status is 'complete'

### RecordingSettings
Configuration options for a recording session

**Fields:**
- videoQuality: 'high' | 'medium' | 'low' (resolution/bitrate settings)
- audioBitrate: number (in kbps)
- includeWebcam: boolean (whether to capture webcam feed)

**Validation Rules:**
- videoQuality must be one of the allowed values
- audioBitrate must be positive number

### VideoMetadata
Information about a stored video file

**Fields:**
- id: string (unique identifier)
- filename: string (original filename)
- size: number (file size in bytes)
- duration: number (video duration in seconds)
- uploadDate: Date (when the video was uploaded)
- userId: string (optional, for future authentication)
- status: 'uploaded' | 'transcribing' | 'summarizing' | 'complete' | 'error'
- videoUrl: string (URL to access the video file)
- thumbnailUrl: string (optional, URL to thumbnail image)

**Validation Rules:**
- id must be unique
- size must be positive number
- duration must be positive number
- status must be one of the allowed values
- videoUrl must be a valid URL format

### TranscriptionResult
Results from the OpenAI Whisper transcription process

**Fields:**
- id: string (unique identifier)
- videoId: string (reference to the video being transcribed)
- segments: Array of TranscriptionSegment objects
- fullText: string (complete transcribed text)
- createdAt: Date (when transcription was completed)

**Validation Rules:**
- id must be unique
- videoId must reference an existing video
- segments must be an array of valid TranscriptionSegment objects
- fullText must be non-empty when status is 'complete'

### TranscriptionSegment
A single segment of the transcribed video

**Fields:**
- start: number (start time in seconds)
- end: number (end time in seconds)
- text: string (transcribed text for this segment)

**Validation Rules:**
- start must be less than end
- start and end must be positive numbers
- text must be non-empty

### SummarySegment
AI-generated summary of a video segment

**Fields:**
- startTime: number (start time in seconds)
- endTime: number (end time in seconds)
- title: string (concise title for the segment)
- description: string (optional, detailed description)

**Validation Rules:**
- startTime must be less than endTime
- startTime and endTime must be positive numbers
- title must be non-empty and less than 100 characters

## Relationships

- RecordingSession (1) → VideoMetadata (1) : A recording session produces one video
- VideoMetadata (1) → TranscriptionResult (0..1) : A video may have a transcription
- TranscriptionResult (1) → SummarySegment (0..*) : A transcription may produce multiple summary segments
- VideoMetadata (1) → SummarySegment (0..*) : A video may have multiple summary segments

## State Transitions

### RecordingSession Status Transitions
- idle → recording : User starts recording
- recording → paused : User pauses recording
- paused → recording : User resumes recording
- recording → stopping : User stops recording
- stopping → uploading : Recording complete, starting upload
- uploading → processing : Upload complete, starting AI processing
- processing → complete : AI processing complete
- * → error : Any state can transition to error on failure

### VideoMetadata Status Transitions
- uploaded → transcribing : Starting Whisper transcription
- transcribing → summarizing : Transcription complete, starting GPT summary
- summarizing → complete : Summary generation complete
- * → error : Any state can transition to error on failure