# Technical Implementation Plan - Loom AI Screen Recorder

## 1. High-Level Architecture

The application follows a client-server architecture where the browser handles media capture and the server processes AI tasks. The system consists of a Next.js frontend for recording and playback, with API routes handling video processing and AI integration.

```
Client-Side Components:
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   Recording UI  │───▶│ MediaRecorder    │───▶│ Video Blob Storage  │
└─────────────────┘    │ (screen/audio)   │    │ (temporary)         │
                       └──────────────────┘    └─────────────────────┘
                                                      │
                                                      ▼
Server-Side Components:                    ┌─────────────────────┐
                                   ┌─────▶│ File Upload Handler │
                                   │      └─────────────────────┘
                                   │               │
┌─────────────────┐    ┌───────────┼───────────────┼─────────────────────┐
│ OpenAI Whisper  │◀───┤ API Route │               │ OpenAI GPT          │
│ (Transcription) │    │           │               │ (Summary Gen)       │
└─────────────────┘    │           │               │                     │
                       │           ▼               │                     │
                       │    ┌──────────────┐      │                     │
                       │    │ Video DB     │      │                     │
                       │    │ (metadata)   │      │                     │
                       │    └──────────────┘      │                     │
                       │                          │                     │
                       └──────────────────────────┴─────────────────────┘
                                                      │
                                                      ▼
                                               ┌─────────────────┐
                                               │ Video Player UI │
                                               │ (with summary)  │
                                               └─────────────────┘
```

**Data Flow**: Recording → Blob → Upload → Transcription → Summary → Playback

## 2. Technology Decisions

- **State Management**: React hooks for component state, with Context API for global state (recording session, video metadata)
- **Video Blob Handling**: Use browser's Blob API to handle large video files in memory; implement chunked upload for large files
- **Storage Solution**: Start with local file system storage for MVP, with easy migration path to Cloudinary/AWS S3 for scalability
- **Error Handling**: Centralized error boundary pattern with user-friendly error messages and graceful fallbacks
- **Loading States**: Comprehensive loading indicators using Next.js loading states and custom UI components

## 3. Project Structure

```
Recorder/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── record/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── watch/
│   │   ├── [id]/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   └── api/
│       ├── upload/
│       │   └── route.ts
│       ├── ai/
│       │   ├── transcribe/
│       │   │   └── route.ts
│       │   └── summarize/
│       │       └── route.ts
├── components/
│   ├── RecordingControls.tsx
│   ├── VideoPlayer.tsx
│   ├── TimelineSummary.tsx
│   └── LoadingSpinner.tsx
├── lib/
│   ├── media-recorder.ts
│   ├── video-processing.ts
│   ├── openai.ts
│   └── storage.ts
├── types/
│   ├── index.ts
│   └── media.ts
├── hooks/
│   ├── useMediaRecorder.ts
│   └── useVideoPlayer.ts
├── constants/
│   └── index.ts
└── utils/
    ├── time-format.ts
    └── file-validation.ts
```

## 4. Phased Implementation Plan

| Phase | Name | Goals | Key Tasks | Dependencies | Complexity | Testing Focus |
|-------|------|-------|-----------|--------------|------------|---------------|
| 1 | Project Setup & Recording UI | Initialize Next.js project and build recording interface | - Set up Next.js 15+ with TypeScript and Tailwind<br/>- Create recording UI with permission prompts<br/>- Implement basic layout and styling | None | Low | Component rendering, UI interactions |
| 2 | Media Recording Logic | Implement screen and audio recording | - Implement MediaDevices API integration<br/>- Create recording controller using MediaRecorder<br/>- Handle recording states (start, stop, pause)<br/>- Save recording as Blob | Phase 1 | Medium | Media capture, permission handling |
| 3 | Video Upload & Storage | Enable video upload and storage | - Create upload API route<br/>- Implement file validation and storage<br/>- Handle large file uploads with progress indicators<br/>- Store video metadata | Phase 2 | Medium | File handling, upload progress |
| 4 | Transcription with Whisper | Integrate OpenAI Whisper for transcription | - Create Whisper API integration<br/>- Implement server-side transcription endpoint<br/>- Process video files for transcription<br/>- Store transcription results with timestamps | Phase 3 | High | API integration, transcription accuracy |
| 5 | AI Timeline Summary with GPT | Generate timeline summary using OpenAI GPT | - Create GPT API integration<br/>- Develop prompt strategy for timeline summaries<br/>- Process transcription into timestamped segments<br/>- Store summary data | Phase 4 | High | AI output quality, prompt engineering |
| 6 | Video Player + Summary Display | Implement video player with timeline summary | - Create video player component<br/>- Display timeline summary alongside video<br/>- Implement clickable timestamp navigation<br/>- Sync summary with video playback | Phase 5 | Medium | Player functionality, UI synchronization |
| 7 | Polish, Error Handling & Testing | Final touches and comprehensive testing | - Add error boundaries and fallbacks<br/>- Implement comprehensive test suite<br/>- Add accessibility features<br/>- Performance optimizations | All previous | Medium | Error handling, test coverage |

## 5. Detailed Task Breakdown

### Phase 1: Project Setup & Recording UI
- Initialize Next.js 15+ project with TypeScript and Tailwind CSS
- Create responsive layout with header and main content area
- Implement recording permission request UI
- Design recording controls (record, stop, settings)
- Add webcam preview toggle functionality
- Create settings modal for recording options

### Phase 2: Media Recording Logic
- Implement MediaDevices API to capture screen and audio
- Create MediaRecorder instance to handle recording
- Manage recording states (idle, recording, paused)
- Handle permission denials gracefully
- Combine audio and video streams appropriately
- Save recording as Blob in component state

### Phase 3: Video Upload & Storage
- Create API route for video upload
- Implement file validation (size, type, format)
- Add upload progress indicators
- Store video files in local file system
- Create video metadata storage
- Handle upload cancellation

### Phase 4: Transcription with Whisper
- Create server-side API route for transcription
- Implement OpenAI Whisper API integration
- Extract audio from video file for transcription
- Process Whisper response with accurate timestamps
- Store transcription results in database
- Handle transcription errors and retries

### Phase 5: AI Timeline Summary with GPT
- Create server-side API route for summary generation
- Implement OpenAI GPT API integration
- Develop prompt engineering for timeline summaries
- Format GPT output to required "timestamp → title" format
- Store summary segments with start/end times
- Handle summary generation errors

### Phase 6: Video Player + Summary Display
- Create responsive video player component
- Implement timeline summary display
- Add click-to-seek functionality
- Synchronize current position with timeline
- Add keyboard navigation support
- Implement loading states for player

### Phase 7: Polish, Error Handling & Testing
- Add comprehensive error boundaries
- Create fallback UI for various error states
- Implement unit and integration tests
- Add accessibility attributes and ARIA labels
- Optimize performance for large video files
- Add comprehensive type checking

## 6. Key Implementation Details

### MediaRecorder Implementation
- Use `navigator.mediaDevices.getDisplayMedia()` for screen capture
- Use `navigator.mediaDevices.getUserMedia()` for microphone and webcam
- Combine streams using `MediaStream.addTrack()` or separate recording
- Handle `dataavailable` events to collect video chunks
- Use `Blob([chunks], {type: 'video/webm'})` to create final video file

### Server-Side File Handling
- Implement multipart form data parsing for file uploads
- Use temporary storage for processing video files
- Validate file size and type before processing
- Implement file cleanup after processing
- Store processed files in permanent storage

### OpenAI API Integration
- Create server-only utility functions for API calls
- Use environment variables for API keys (never exposed to client)
- Implement proper error handling for API failures
- Add retry logic for failed API calls
- Format Whisper timestamps accurately for downstream processing

### GPT Prompt Strategy for Timeline Summaries
- System prompt: "Analyze the provided transcript and create a concise timeline summary. Identify distinct topics or sections and provide a timestamp range in MM:SS-MM:SS format followed by a brief descriptive title. Format each segment as 'XX:YY-ZZ:WW → Title' where XX:YY is start time and ZZ:WW is end time."
- Include example format in prompt: "0:00–0:30 → Introduction"
- Limit to 5-10 summary segments for readability

### Video Player with Clickable Timestamps
- Use HTML5 video element with React wrapper
- Implement custom controls for better UX
- Sync current time with timeline summary highlighting
- Add keyboard shortcuts for navigation
- Handle buffering and loading states

## 7. Testing Strategy

### Unit Tests
- Test media recording state management
- Test file validation utilities
- Test time formatting functions
- Test API response formatting

### Component Tests
- Test recording UI interactions
- Test video player controls
- Test timeline summary rendering
- Test error boundary behavior

### Integration Tests
- Test end-to-end recording flow
- Test API routes with mocked OpenAI calls
- Test file upload and storage integration
- Test transcription and summary generation pipeline

### Mocking Strategy
- Mock `navigator.mediaDevices` for recording tests
- Mock OpenAI API calls with fixed responses
- Mock file system operations
- Mock browser storage APIs

## 8. Risks & Mitigations

- **Browser Permission Issues**: Implement clear permission request flows with fallback instructions when permissions are denied
- **Large File Handling**: Implement chunked upload for files over 100MB, with progress tracking and cancellation
- **API Cost/Latency**: Implement caching for repeated requests, estimate costs per video, and show processing time estimates to users
- **Browser Compatibility**: Gracefully degrade features for unsupported browsers with clear messaging
- **Memory Issues**: Implement proper cleanup of video blobs and prevent memory leaks during recording
- **Security Concerns**: Validate all file uploads, sanitize user-generated content, and ensure API keys are never exposed

## 9. Next Steps

This technical plan provides a roadmap for implementing the Loom AI Screen Recorder according to the specifications. The next step is to create detailed development tasks based on this plan, starting with Phase 1 implementation. Throughout development, all work should be implemented against the original specification and project constitution to maintain consistency and quality.

Remember to always implement against the Specification and Constitution, ensuring all code meets the defined standards for TypeScript usage, performance, user experience, and security.