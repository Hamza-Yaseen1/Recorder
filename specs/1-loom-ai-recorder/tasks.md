# Tasks - Loom AI Screen Recorder

**Feature**: Build a modern web application similar to Loom that allows users to record their screen along with audio (and optionally webcam), upload the recording, and generate an AI-powered timeline summary of the video.

**Tech Stack**: Next.js 15+, TypeScript, Tailwind CSS, OpenAI APIs, MediaDevices API, MediaRecorder API

## Phase 1: Setup Tasks

- [ ] T001 Initialize Next.js 15+ project with TypeScript and Tailwind CSS in app directory
- [ ] T002 Configure ESLint and Prettier with TypeScript and Tailwind CSS presets
- [ ] T003 Set up project structure per implementation plan in components/, lib/, types/, hooks/, utils/
- [ ] T004 Create environment configuration for OpenAI API key in .env.local
- [ ] T005 Set up TypeScript configuration with strict mode enabled

## Phase 2: Foundational Tasks

- [ ] T006 Create type definitions for RecordingSession, VideoMetadata, TranscriptionResult, SummarySegment in types/index.ts
- [ ] T007 Implement global state management with React Context for recording session
- [ ] T008 Create utility functions for time formatting in utils/time-format.ts
- [ ] T009 Set up API route handlers structure in app/api/
- [ ] T010 Create constants for recording states and settings in constants/index.ts

## Phase 3: [US1] Screen Recording Capability

**Goal**: Enable users to record their screen using browser APIs with audio and optional webcam capture.

**Independent Test Criteria**: User can initiate screen recording, select screen/application to record, capture screen content smoothly without significant lag, and see cursor movements and clicks recorded.

**Tasks**:

- [ ] T011 [P] [US1] Create RecordingControls component with record/stop buttons in components/RecordingControls.tsx
- [ ] T012 [P] [US1] Implement useMediaRecorder hook for managing recording state in hooks/useMediaRecorder.ts
- [ ] T013 [US1] Create media recording utilities in lib/media-recorder.ts for getDisplayMedia and getUserMedia
- [ ] T014 [US1] Implement recording UI with permission prompts in app/record/page.tsx
- [ ] T015 [US1] Add webcam toggle functionality to recording interface
- [ ] T016 [US1] Handle recording states (idle, recording, paused) in the UI
- [ ] T017 [US1] Implement video blob creation and temporary storage in component state

## Phase 4: [US2] Audio Capture

**Goal**: Capture microphone audio during recording with clear synchronization.

**Independent Test Criteria**: User can select microphone, audio is synchronized with screen recording, audio quality is clear and audible, and volume levels are adjustable during setup.

**Tasks**:

- [ ] T018 [P] [US2] Enhance useMediaRecorder hook to capture audio stream in hooks/useMediaRecorder.ts
- [ ] T019 [US2] Implement audio device selection in recording settings UI
- [ ] T020 [US2] Combine audio and video streams properly in media-recorder.ts
- [ ] T021 [US2] Add audio visualization during recording to UI
- [ ] T022 [US2] Implement audio quality settings in recording options

## Phase 5: [US3] Video Upload

**Goal**: Upload recorded videos to backend with progress indication.

**Independent Test Criteria**: Video upload maintains original quality, upload progress is visible to user, handles large files efficiently, and can be canceled if needed.

**Tasks**:

- [ ] T023 [P] [US3] Create API route for video upload in app/api/upload/route.ts
- [ ] T024 [P] [US3] Implement file validation utilities in utils/file-validation.ts
- [ ] T025 [US3] Add upload progress indicators to recording UI
- [ ] T026 [US3] Implement video storage in local file system using lib/storage.ts
- [ ] T027 [US3] Create video metadata storage in database
- [ ] T028 [US3] Add upload cancellation functionality
- [ ] T029 [US3] Implement error handling for upload failures

## Phase 6: [US4] Speech-to-Text Conversion

**Goal**: Convert speech in videos to text using OpenAI Whisper with sufficient accuracy.

**Independent Test Criteria**: Transcription accuracy is sufficient for generating meaningful summaries, processing time is reasonable (under 2 minutes for 5-minute video), and transcription includes timestamps for different segments.

**Tasks**:

- [ ] T030 [P] [US4] Create OpenAI API client utilities in lib/openai.ts
- [ ] T031 [P] [US4] Create Whisper transcription API route in app/api/ai/transcribe/route.ts
- [ ] T032 [US4] Implement audio extraction from video for Whisper processing
- [ ] T033 [US4] Process Whisper API response to extract timestamped segments
- [ ] T034 [US4] Store transcription results with timestamps in database
- [ ] T035 [US4] Implement error handling and retry logic for Whisper API calls
- [ ] T036 [US4] Add processing status indicators to UI

## Phase 7: [US5] AI Timeline Summary Generation

**Goal**: Generate timestamped summary of video content using OpenAI GPT in required format.

**Independent Test Criteria**: Summary includes key topics at specific timestamps, output follows "0:00–0:30 → Introduction" pattern, summary titles are concise and descriptive, and segments are logically grouped by topic.

**Tasks**:

- [ ] T037 [P] [US5] Create GPT summary generation API route in app/api/ai/summarize/route.ts
- [ ] T038 [US5] Implement GPT prompt strategy for timeline summaries in lib/openai.ts
- [ ] T039 [US5] Process transcription into timestamped summary segments
- [ ] T040 [US5] Format GPT output to required "timestamp → title" format
- [ ] T041 [US5] Store summary segments with start/end times in database
- [ ] T042 [US5] Implement error handling for GPT API calls

## Phase 8: [US6] Video Player with Clickable Timeline

**Goal**: Provide video player with clickable timeline summary for navigation.

**Independent Test Criteria**: Timeline summary is displayed alongside video player, clicking timeline items jumps video to correct timestamp, current position is highlighted, and video player supports standard controls.

**Tasks**:

- [ ] T043 [P] [US6] Create VideoPlayer component with custom controls in components/VideoPlayer.tsx
- [ ] T044 [P] [US6] Create TimelineSummary component with clickable segments in components/TimelineSummary.tsx
- [ ] T045 [US6] Implement useVideoPlayer hook for player state management in hooks/useVideoPlayer.ts
- [ ] T046 [US6] Integrate timeline summary with video player synchronization
- [ ] T047 [US6] Create video watch page with player and timeline in app/watch/[id]/page.tsx
- [ ] T048 [US6] Implement current position highlighting in timeline
- [ ] T049 [US6] Add keyboard navigation support for timeline

## Phase 9: Polish & Cross-Cutting Concerns

- [ ] T050 Add comprehensive error boundaries and fallback UI components
- [ ] T051 Implement responsive design for mobile and tablet devices
- [ ] T052 Add accessibility attributes and ARIA labels to all components
- [ ] T053 Optimize performance for large video files and memory management
- [ ] T054 Add loading states and skeleton UI components
- [ ] T055 Implement proper cleanup of video blobs and media streams
- [ ] T056 Add comprehensive TypeScript type checking throughout application
- [ ] T057 Create landing page with recent recordings list in app/page.tsx
- [ ] T058 Add comprehensive documentation to README.md

## Dependencies

### User Story Completion Order
1. US1 (Screen Recording) → Must be completed before US2 (Audio Capture)
2. US2 (Audio Capture) → Must be completed before US3 (Video Upload)
3. US3 (Video Upload) → Must be completed before US4 (Speech-to-Text)
4. US4 (Speech-to-Text) → Must be completed before US5 (AI Summary)
5. US5 (AI Summary) → Must be completed before US6 (Video Player)
6. US6 (Video Player) → Final user-facing functionality

### Critical Path Dependencies
- T001-T005 (Setup) → All other tasks
- T006-T010 (Foundational) → All feature tasks
- T011-T017 (Screen Recording) → T018-T022 (Audio Capture)
- T018-T022 (Audio Capture) → T023-T029 (Video Upload)
- T023-T029 (Video Upload) → T030-T036 (Speech-to-Text)
- T030-T036 (Speech-to-Text) → T037-T042 (AI Summary)
- T037-T042 (AI Summary) → T043-T049 (Video Player)

## Parallel Execution Examples

### Per Story Parallel Opportunities
- **US1**: T011 and T012 can run in parallel (component and hook)
- **US3**: T023 and T024 can run in parallel (API route and utilities)
- **US4**: T030 and T031 can run in parallel (client utilities and API route)
- **US6**: T043 and T044 can run in parallel (player and timeline components)

## Implementation Strategy

### MVP Scope (User Story 1)
- Tasks T001-T017: Basic screen recording functionality with UI controls

### Incremental Delivery
1. **MVP**: Complete US1 (Screen Recording) - basic recording capability
2. **Increment 1**: Complete US2 (Audio Capture) - add audio to recordings
3. **Increment 2**: Complete US3 (Video Upload) - enable video storage
4. **Increment 3**: Complete US4 (Speech-to-Text) - add transcription
5. **Increment 4**: Complete US5 (AI Summary) - add timeline summaries
6. **Increment 5**: Complete US6 (Video Player) - complete viewing experience
7. **Polish**: Complete Phase 9 tasks for production readiness