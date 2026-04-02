# Implementation Plan: Video Processing Pipeline Fix

**Branch**: `2-video-processing` | **Date**: 2026-04-02 | **Spec**: [specs/2-video-processing/spec.md](specs/2-video-processing/spec.md)
**Input**: Feature specification from `/specs/2-video-processing/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Replace mock timeline summary data with real AI-generated summaries by implementing a video processing pipeline that transcribes video audio and generates structured timeline segments. The implementation will use existing API routes (/api/ai/transcribe and /api/ai/summarize) to process uploaded videos and update the processVideo() function in app/watch/[id]/page.tsx to handle the async processing workflow.

## Technical Context

**Language/Version**: TypeScript with Next.js App Router  
**Primary Dependencies**: Next.js 15+, React, existing API routes at /api/ai/transcribe and /api/ai/summarize  
**Storage**: N/A (processing data in memory, using existing storage for video files)  
**Testing**: Jest + React Testing Library for unit and component tests  
**Target Platform**: Web application (browser-based video processing)  
**Project Type**: Web application  
**Performance Goals**: Process videos under 5 minutes with timeline summaries generated within 5 minutes of upload  
**Constraints**: Must follow Next.js App Router conventions, use server-side API routes for AI processing to protect API keys, maintain responsive UI during processing with proper loading states  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ **User-Centric Simplicity**: Implementation will provide clear timeline navigation for users
- ✅ **Performance First**: Async processing with loading states to maintain responsiveness
- ✅ **Privacy by Default**: Following existing patterns for data handling
- ✅ **Reliability Over Features**: Using existing API infrastructure reduces risk
- ✅ **Clean Code Standards**: Will follow TypeScript best practices and existing code patterns
- ✅ **Next.js Best Practices**: Using App Router and server-side API routes as required
- ✅ **Security & Privacy**: Keeping API keys server-side, following existing security patterns
- ✅ **Architectural Constraints**: Using server-side API routes for AI processing as required

## Project Structure

### Documentation (this feature)

```text
specs/2-video-processing/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
app/
├── watch/
│   └── [id]/
│       └── page.tsx     # Updated processVideo() function to handle AI processing
├── api/
│   └── ai/
│       ├── transcribe/route.ts    # Existing API route for transcription
│       └── summarize/route.ts     # Existing API route for timeline generation
└── globals.css

components/
└── VideoPlayer/
    └── TimelineSummary.tsx        # Component to display timeline segments

types/
└── video.ts                       # TypeScript interface for SummarySegment
```

**Structure Decision**: Web application structure with Next.js App Router. The implementation will update the existing page component to use the AI processing pipeline, leveraging existing API routes for transcription and summarization.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None identified] | [N/A] | [N/A] |