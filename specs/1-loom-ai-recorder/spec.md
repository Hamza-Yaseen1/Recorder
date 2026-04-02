# Specification - Loom AI Screen Recorder

## 1. Project Overview

### Objective
Build a modern web application similar to Loom that allows users to record their screen along with audio (and optionally webcam), upload the recording, and generate an AI-powered timeline summary of the video. The application will leverage browser APIs for recording, Claude AI speech-to-text for transcription, and Claude AI for generating timestamped summaries that users can click to jump to specific segments of their video.

### Success Vision
A fully functional web application where users can start a screen recording with a single click, capture their screen and audio, upload the recording, and receive an AI-generated timeline summary with clickable timestamps that allow them to quickly navigate to key moments in their video. The application will provide a smooth, intuitive experience similar to Loom but enhanced with AI-powered summarization capabilities.

## 2. User Stories

### MVP User Stories
- As a user, I want to record my screen so that I can share tutorials, presentations, or walkthroughs with others
- As a user, I want to capture my microphone audio during the screen recording so that I can provide commentary and context
- As a user, I want to optionally include my webcam feed in the recording so that viewers can see me while I'm presenting
- As a user, I want to upload my recorded video to the platform so that it can be processed and stored
- As a user, I want the system to automatically transcribe my spoken words using AI so that I can search and navigate my content
- As a user, I want an AI-generated timeline summary with key moments highlighted so that I can quickly navigate to important parts of my recording
- As a user, I want to click on timeline summary items to jump directly to that part of the video so that I can efficiently review or share specific segments

### Bonus User Stories
- As a user, I want to pause and resume my recording so that I can take breaks during longer presentations
- As a user, I want to trim my recording before uploading so that I can exclude unwanted portions
- As a user, I want to share my recording with others via a link so that they can access it without needing an account
- As a user, I want to organize my recordings in folders so that I can manage them effectively
- As a user, I want to download my recording so that I can save it locally or share it elsewhere

## 3. Functional Requirements

### 3.1 MVP Features (Must Have)

#### Screen Recording Capability
- **Requirement**: Application must allow users to record their screen using browser APIs
- **Acceptance Criteria**:
  - User can initiate screen recording with a clear UI button
  - User can select which screen/application window to record
  - Recording captures screen content smoothly without significant lag
  - Recording includes cursor movements and clicks

#### Audio Capture
- **Requirement**: Application must capture microphone audio during recording
- **Acceptance Criteria**:
  - User can select which microphone to use for audio capture
  - Audio is synchronized with screen recording
  - Audio quality is clear and audible
  - Volume levels are adjustable during setup

#### Optional Webcam Capture
- **Requirement**: Application must support optional webcam overlay during recording
- **Acceptance Criteria**:
  - User can toggle webcam capture on/off before starting recording
  - Webcam feed is displayed as an overlay on the screen recording
  - Webcam resolution and position are configurable

#### Video Upload
- **Requirement**: Application must upload recorded videos to the backend
- **Acceptance Criteria**:
  - Video upload maintains original quality as much as possible
  - Upload progress is visible to the user
  - Upload handles large files efficiently
  - Upload can be canceled if needed

#### Speech-to-Text Conversion
- **Requirement**: Application must convert speech in videos to text using Claude AI speech-to-text
- **Acceptance Criteria**:
  - Transcription accuracy is sufficient for generating meaningful summaries
  - Processing time is reasonable (under 2 minutes for 5-minute video)
  - Transcription includes timestamps for different segments

#### AI Timeline Summary Generation
- **Requirement**: Application must generate a timestamped summary of the video content using Claude AI
- **Acceptance Criteria**:
  - Summary includes key topics discussed at specific timestamps
  - Output format follows: "0:00–0:30 → Introduction" pattern
  - Summary titles are concise and descriptive
  - Summary segments are logically grouped by topic

#### Video Player with Clickable Timeline
- **Requirement**: Application must provide a video player with clickable timeline summary
- **Acceptance Criteria**:
  - Timeline summary is displayed alongside the video player
  - Clicking on a timeline item jumps the video to that timestamp
  - Current position in the timeline is highlighted
  - Video player supports play, pause, and seeking controls

### 3.2 Bonus Features (Nice to Have)

#### Recording Pause/Resume
- **Requirement**: Application optionally supports pausing and resuming recordings
- **Acceptance Criteria**:
  - User can pause recording temporarily during the session
  - Paused segments are not included in the final recording
  - Recording can be resumed from where it was paused

#### Video Trimming
- **Requirement**: Application optionally supports trimming recorded videos before upload
- **Acceptance Criteria**:
  - User can select start and end times for the recording
  - Unselected portions are excluded from the uploaded video
  - Trimmed preview is available before upload

## 4. Non-Functional Requirements

### Performance
- Screen recording must have minimal latency (less than 200ms delay)
- Video upload should handle files up to 1GB in size
- AI processing (transcription and summarization) should complete within 60 seconds per minute of video
- Video player must load and begin playback within 3 seconds

### Usability & UX
- Interface must be intuitive for users familiar with screen recording tools
- Clear visual indicators for recording state (idle, recording, processing, ready)
- Undo capability for accidental recording starts
- Minimal steps required to complete the recording-to-sharing workflow

### Accessibility
- Keyboard navigation support for all interactive elements
- Screen reader compatibility for all UI components
- Sufficient color contrast ratios (minimum 4.5:1)
- Alternative text for visual elements

### Browser Support
- Modern Chrome (latest 2 versions)
- Modern Firefox (latest 2 versions)
- Modern Edge (latest 2 versions)
- Safari support is optional for MVP

## 5. Technical Architecture

### High-level Data Flow
Recording → Blob → Upload → Transcription → Summary → Display

1. User initiates screen recording via MediaDevices API
2. MediaRecorder API captures screen and audio streams into video blob
3. Video blob is uploaded to backend API route
4. Backend processes video through Claude AI speech-to-text for transcription
5. Backend processes transcription through Claude AI for timeline summary
6. Processed data (video, transcript, summary) is stored and served to frontend
7. Frontend displays video player with clickable timeline summary

### Folder Structure Recommendation
```
app/
├── record/
│   ├── page.tsx          # Main recording interface
│   └── layout.tsx
├── watch/
│   ├── [id]/
│   │   ├── page.tsx      # Video player with timeline
│   │   └── layout.tsx
├── api/
│   ├── record/
│   │   ├── upload/route.ts  # Handle video upload
│   ├── ai/
│   │   ├── transcribe/route.ts  # Handle speech-to-text transcription
│   │   └── summarize/route.ts   # Handle AI summary generation
```

### Key Components and Their Responsibilities
- **RecordingController**: Manages MediaDevices and MediaRecorder APIs, handles stream capture
- **UploadHandler**: Manages video upload process with progress indication
- **VideoPlayer**: Displays video with timeline summary navigation
- **TimelineSummary**: Renders clickable summary segments with timestamps

### State Management Approach
- Client-side state for recording session (isRecording, currentTime, etc.)
- Server-side state for processed videos, transcriptions, and summaries
- Global state for user preferences and recording settings

## 6. API Design

| Method & Path | Input | Output | Purpose |
|---------------|-------|--------|---------|
| POST /api/upload | FormData with video file | `{ id: string, status: "processing" \| "complete" }` | Upload recorded video for processing |
| GET /api/video/[id] | Video ID in path | `{ id: string, status: "processing" \| "complete", videoUrl: string, summary: SummarySegment[], transcript: string }` | Retrieve video details and processed summary |
| POST /api/ai/transcribe | FormData with audio/video file | `{ segments: { start: number, end: number, text: string }[] }` | Convert speech to text using AI API |
| POST /api/ai/summarize | JSON with transcript text | `{ summary: SummarySegment[] }` | Generate timeline summary using AI API |

## 7. AI Integration Details

### Exact Flow for Speech-to-Text Transcription
1. Backend receives video file upload
2. Video file is temporarily stored
3. Audio is extracted from video file
4. Audio is sent to Claude AI API with timestamp precision
5. Transcription with timestamps is received and stored
6. Transcription is made available for summary generation

### GPT Prompt Strategy for Generating Timestamped Timeline Summary
1. Input: Complete transcript with timestamps from Whisper API
2. Process: Send transcript to Claude AI with specific instructions to create timeline summary
3. Output format: Array of summary segments in format: "0:00–0:30 → Introduction"
4. GPT system prompt: "Analyze the following transcript and create a concise timeline summary. For each distinct topic or section, provide a timestamp range in MM:SS format and a brief descriptive title. Format each segment as 'XX:YY–AA:BB → Title' where XX:YY is start time and AA:BB is end time."

### Example Output Format
```
[
  "0:00–0:30 → Introduction",
  "0:30–2:15 → Project Overview",
  "2:15–4:20 → Technical Implementation",
  "4:20–5:45 → Demo Walkthrough",
  "5:45–6:30 → Conclusion"
]
```

## 8. UI/UX Specifications

### Main Screens and Layouts
- **Home/Record Screen**: Large record button, recording options (audio, webcam), recent recordings list
- **Recording Screen**: Countdown timer, recording controls, preview window, stop button
- **Processing Screen**: Progress indicators for upload, transcription, and summary generation
- **Watch Screen**: Video player on left, timeline summary on right, sharing options

### Recording Interface States
- **Idle**: Ready to start recording, options visible
- **Recording**: Visual indicator (red dot), countdown timer, stop button
- **Paused**: Recording temporarily stopped, option to resume or stop
- **Processing**: Video uploaded, showing progress of AI processing

### Video Player with Summary Timeline
- Main video player occupies majority of screen space
- Collapsible sidebar with timeline summary items
- Each summary item shows timestamp and title, clickable to jump to that time
- Current playback position highlights corresponding summary item

### Design Style
- Clean, minimalist interface similar to Loom
- Professional color scheme (blues, grays, white backgrounds)
- Consistent spacing and typography
- Clear visual hierarchy with prominent call-to-action buttons

### Responsive Behavior
- Mobile: Vertical layout with video player at top, timeline summary below
- Tablet: Horizontal split view when orientation allows
- Desktop: Horizontal split view with adjustable panel sizes

## 9. Data Models

### Recording Session
```typescript
interface RecordingSession {
  id: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  status: 'idle' | 'recording' | 'paused' | 'stopping' | 'uploading' | 'processing' | 'complete';
  videoBlob?: Blob;
  audioEnabled: boolean;
  webcamEnabled: boolean;
  settings: {
    videoQuality: 'high' | 'medium' | 'low';
    audioBitrate: number;
  };
}
```

### Video Metadata
```typescript
interface VideoMetadata {
  id: string;
  filename: string;
  size: number;
  duration: number; // in seconds
  uploadDate: Date;
  userId?: string;
  status: 'uploaded' | 'transcribing' | 'summarizing' | 'complete' | 'error';
  videoUrl: string;
  thumbnailUrl?: string;
}
```

### Transcription Result
```typescript
interface TranscriptionResult {
  id: string;
  videoId: string;
  segments: {
    start: number; // in seconds
    end: number;   // in seconds
    text: string;
  }[];
  fullText: string;
  createdAt: Date;
}
```

### Summary Segment
```typescript
interface SummarySegment {
  startTime: number; // in seconds
  endTime: number;   // in seconds
  title: string;     // concise title for the segment
  description?: string; // optional detailed description
}
```

## 10. Edge Cases & Error Handling

- **Insufficient permissions**: Handle cases where user denies camera/microphone access with clear explanation and retry option
- **Browser incompatibility**: Detect unsupported browsers and show appropriate messaging
- **Large file handling**: Implement chunked upload for videos exceeding size limits
- **Network interruption**: Handle network failures during upload with resume capability
- **AI API failures**: Implement retry logic and fallback messaging if Claude AI services are unavailable
- **Long processing times**: Show estimated processing time and allow users to return later
- **Storage limits**: Handle cases where storage quota is exceeded with appropriate messaging
- **Invalid file formats**: Validate uploaded files and reject unsupported formats with clear error message

## 11. Acceptance Criteria

- [ ] Users can initiate screen recording with a single button press
- [ ] Screen recording captures content smoothly with minimal latency
- [ ] Microphone audio is captured and synchronized with screen recording
- [ ] Optional webcam feed can be included in the recording
- [ ] Video files up to 1GB can be uploaded with progress indication
- [ ] AI transcription completes within 60 seconds per minute of video
- [ ] AI generates timeline summary in the format "0:00–0:30 → Title"
- [ ] Video player loads and plays content within 3 seconds
- [ ] Clicking timeline summary items jumps video to correct timestamp
- [ ] Application works reliably on modern Chrome, Firefox, and Edge browsers
- [ ] Error handling provides clear feedback for common failure scenarios
- [ ] UI is accessible and usable with keyboard navigation

## 12. Out of Scope

- User account system and authentication (MVP uses anonymous sessions)
- Video editing capabilities beyond basic trimming
- Real-time collaboration features
- Advanced video effects or annotations
- Integration with external calendar or productivity tools
- Offline recording capabilities
- Native mobile applications
- Live streaming functionality (recordings are stored and processed after completion)

## Next Steps in Spec-Driven Development

This specification serves as the single source of truth for the Loom-like AI Screen Recorder project. The next step in Spec-Driven Development is to create a detailed Technical Plan that translates these requirements into implementation steps, considering the specified tech stack (Next.js 15+, TypeScript, Tailwind CSS, Claude AI APIs). The Technical Plan will define the architecture, component breakdown, and development phases needed to deliver this functionality.