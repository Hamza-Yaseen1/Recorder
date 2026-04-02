# Tasks: Video Processing Pipeline Fix

**Feature**: Video Processing Pipeline Fix  
**Branch**: `2-video-processing`  
**Generated**: 2026-04-02  
**Dependencies**: Next.js 15+, TypeScript, existing API routes

## Implementation Strategy

Deliver value incrementally by implementing User Story 1 first (core functionality), then enhancing with additional features. The MVP will focus on replacing mock data with real AI-generated timeline summaries.

## Phase 1: Setup

- [X] T001 Create types definition for SummarySegment in types/video.ts
- [X] T002 Create TimelineSummary component in components/VideoPlayer/TimelineSummary.tsx
- [X] T003 Verify existing API routes exist at /api/ai/transcribe and /api/ai/summarize

## Phase 2: Foundational

- [ ] T004 Implement SummarySegment TypeScript interface with validation
- [ ] T005 Create utility functions for time formatting in utils/time.ts
- [ ] T006 Set up loading and error state management hooks in hooks/useVideoProcessing.ts

## Phase 3: [US1] Automatic Timeline Generation

**Goal**: Enable automatic processing of uploaded videos to generate timeline summaries with key segments.

**Independent Test**: Upload a video and verify that a structured timeline summary with accurate segments is generated automatically, delivering enhanced navigation capabilities to users.

**Tasks**:

- [ ] T007 [P] [US1] Update processVideo() function in app/watch/[id]/page.tsx to call transcription API
- [ ] T008 [P] [US1] Implement API call to /api/ai/transcribe with video file
- [ ] T009 [P] [US1] Implement API call to /api/ai/summarize with transcript
- [ ] T010 [US1] Replace mock timeline data with real API response in UI
- [ ] T011 [US1] Add loading state display during video processing
- [ ] T012 [US1] Implement error handling for API failures
- [ ] T013 [US1] Test complete flow: video upload → transcription → summarization → display

## Phase 4: [US2] Transcript Generation

**Goal**: Extract audio from uploaded videos and create accurate text transcripts that serve as the basis for timeline summaries.

**Independent Test**: Upload a video and verify that a complete and accurate text transcript is generated, which can then be used for further processing.

**Tasks**:

- [ ] T014 [P] [US2] Enhance error handling for transcription API calls
- [ ] T015 [US2] Add transcript validation to ensure quality before summarization
- [ ] T016 [US2] Implement retry mechanism for failed transcription attempts
- [ ] T017 [US2] Add logging for transcription process status

## Phase 5: [US3] Segment Metadata Generation

**Goal**: Ensure each timeline segment includes relevant metadata (start time, end time, title, description) for efficient navigation.

**Independent Test**: Examine metadata for each generated segment to ensure it includes all required fields with accurate and helpful information.

**Tasks**:

- [ ] T018 [P] [US3] Validate segment metadata format matches SummarySegment interface
- [ ] T019 [US3] Enhance segment titles and descriptions with better AI prompting
- [ ] T020 [US3] Implement segment validation to ensure chronological order
- [ ] T021 [US3] Add visual indicators for segment quality in TimelineSummary component

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T022 Add comprehensive error messages for different failure scenarios
- [ ] T023 Implement progress indicators during video processing
- [ ] T024 Add accessibility features to timeline navigation
- [ ] T025 Update documentation with new video processing workflow
- [ ] T026 Write integration tests for the complete video processing pipeline
- [ ] T027 Perform final testing with various video formats and lengths

## Dependencies

**User Story Completion Order**:
1. US1 (Automatic Timeline Generation) → Prerequisite for all other stories
2. US2 (Transcript Generation) → Depends on US1 for basic flow
3. US3 (Segment Metadata Generation) → Depends on US1 for basic flow

## Parallel Execution Opportunities

**Within US1**:
- T007-T009: API integration tasks can run in parallel
- T011-T012: UI enhancement tasks can run in parallel

**Within US2**:
- T014-T015: Error handling and validation can run in parallel

**Within US3**:
- T018-T019: Validation and enhancement can run in parallel

## MVP Scope

The MVP consists of Phase 3 ([US1]) tasks which deliver the core functionality of replacing mock data with real AI-generated timeline summaries. This provides immediate value by enabling the primary feature requested.