# AI-Powered Screen Recorder

A modern web application similar to Loom that allows users to record their screen with audio, upload recordings, and generate AI-powered timeline summaries using OpenAI's Whisper and GPT APIs.

## Features

- 🎥 Screen recording with audio capture
- 🎤 Optional webcam overlay
- ⏸️ Pause/resume recording
- 📤 Video upload with progress indication
- 🤖 AI-powered speech-to-text transcription (OpenAI Whisper)
- 📝 Automatic timeline summary generation (OpenAI GPT)
- ⏱️ Clickable timeline navigation
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI API (Whisper + GPT-3.5-turbo)
- **Recording**: MediaDevices API, MediaRecorder API

## Prerequisites

- Node.js 20+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Modern browser with MediaDevices API support (Chrome, Firefox, Edge)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update `.env.local` file in the root directory:

```env
# OpenAI API Configuration (Required)
OPENAI_API_KEY=sk-your-actual-api-key-here

# Optional OpenAI Configuration
OPENAI_ORG_ID=your_openai_org_id_here
OPENAI_PROJECT_ID=your_openai_project_id_here
```

**Important**: Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Recording a Video

1. Navigate to the home page
2. Click "Start Recording"
3. Select the screen/window you want to record
4. Configure settings (audio, webcam, quality)
5. Click the record button
6. Use pause/resume as needed
7. Click "Stop & Upload" when finished

### Viewing Recordings

1. After upload completes, you'll be redirected to the watch page
2. Video player shows your recording
3. Timeline summary appears on the right (AI-generated)
4. Click any timeline segment to jump to that moment

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── upload/          # Video upload endpoint
│   │   ├── video/[id]/      # Fetch video metadata
│   │   └── ai/
│   │       ├── transcribe/  # Whisper transcription
│   │       └── summarize/   # GPT summary generation
│   ├── record/              # Recording interface
│   ├── watch/[id]/          # Video player with timeline
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── Providers.tsx        # Client-side context providers
│   ├── RecordingControls.tsx
│   ├── VideoPlayer.tsx
│   └── TimelineSummary.tsx
├── context/
│   └── RecordingContext.tsx # Global recording state
├── hooks/
│   └── useMediaRecorder.ts  # Recording logic hook
├── lib/
│   ├── openai/              # OpenAI API utilities
│   └── storage/             # File storage utilities
├── types/
│   └── index.ts             # TypeScript definitions
├── constants/
│   └── index.ts             # App constants
└── utils/
    └── time-format.ts       # Time formatting utilities
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload recorded video |
| `/api/video/[id]` | GET | Fetch video metadata |
| `/api/ai/transcribe` | POST | Transcribe audio with Whisper |
| `/api/ai/summarize` | POST | Generate timeline summary with GPT |

## Browser Compatibility

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ⚠️ Safari (limited support)

## Known Limitations

- Videos are stored in memory (use database in production)
- No user authentication (MVP feature)
- Maximum file size: 1GB
- Requires HTTPS in production for MediaDevices API

## Development Notes

### Next.js 16 Considerations

This project uses Next.js 16 with the App Router. Key differences from older versions:

- Server Components by default
- `'use client'` directive for client components
- Async `params` in dynamic routes
- New caching behavior

### Testing Recording

Screen recording requires:
- HTTPS in production (or localhost in development)
- User permission for screen capture
- User permission for microphone (if audio enabled)

## Troubleshooting

### "No video file provided" error
- Ensure recording completed before stopping
- Check browser console for MediaRecorder errors

### "Failed to transcribe audio" error
- Verify OPENAI_API_KEY is set correctly
- Check OpenAI API quota/billing
- Ensure video has audio track

### Video not loading in player
- Check browser console for 404 errors
- Verify upload completed successfully
- Check `public/uploads/` directory exists

## Production Deployment

Before deploying to production:

1. Set up a proper database (PostgreSQL, MongoDB, etc.)
2. Configure cloud storage (AWS S3, Cloudflare R2, etc.)
3. Add user authentication
4. Implement rate limiting for API routes
5. Set up proper error tracking (Sentry, etc.)
6. Configure CORS if needed
7. Enable HTTPS

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
