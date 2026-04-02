# Screen Recorder

A modern web application for recording your screen with audio, uploading recordings, and playing them back with a simple download option.

## Features

- 🎥 Screen recording with audio capture
- 🎤 Optional webcam overlay
- ⏸️ Pause/resume recording
- 📤 Video upload with progress indication
- 📥 One-click video download
- 🌓 Dark/Light theme with smooth animations
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Recording**: MediaDevices API, MediaRecorder API

## Prerequisites

- Node.js 20+ installed
- Modern browser with MediaDevices API support (Chrome, Firefox, Edge)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

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

### Viewing & Downloading Recordings

1. After upload completes, you'll be redirected to the watch page
2. Video player shows your recording
3. Click "Download Video" button to save the file locally

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── upload/          # Video upload endpoint
│   │   └── video/[id]/      # Fetch video metadata
│   ├── record/              # Recording interface
│   ├── watch/[id]/          # Video player with download
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── Providers.tsx        # Client-side context providers
│   ├── Navbar.tsx           # Navigation bar
│   ├── ClientNavbar.tsx     # Client wrapper for navbar
│   └── VideoPlayer.tsx      # Simple video player
├── context/
│   ├── RecordingContext.tsx # Global recording state
│   └── ThemeContext.tsx     # Dark/light theme management
├── hooks/
│   └── useMediaRecorder.ts  # Recording logic hook
├── lib/
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

## Recording Settings

### Video Quality Options
- **Low**: 640x480, 1 Mbps - Smaller file size
- **Medium**: 1280x720, 2.5 Mbps - Balanced (default)
- **High**: 1920x1080, 5 Mbps - Best quality

### Audio Options
- System audio capture
- Microphone recording
- Echo cancellation and noise suppression

### Additional Options
- Optional webcam overlay
- Pause/resume during recording
- Real-time recording timer

## Browser Compatibility

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ⚠️ Safari (limited support)

## Known Limitations

- Videos are stored in `public/uploads/` directory
- Metadata stored in memory (lost on server restart)
- No user authentication (MVP feature)
- Maximum file size: 1GB
- Requires HTTPS in production for MediaDevices API

## Development Notes

### Next.js 16 Considerations

This project uses Next.js 16 with the App Router:

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

### Video not loading in player
- Check browser console for 404 errors
- Verify upload completed successfully
- Check `public/uploads/` directory exists

### Recording permission denied
- Grant screen sharing permission when prompted
- Grant microphone permission if audio is enabled
- Try refreshing the page and starting again

## Production Deployment

Before deploying to production:

1. Set up a proper database (PostgreSQL, MongoDB, etc.)
2. Configure cloud storage (AWS S3, Cloudflare R2, etc.)
3. Add user authentication
4. Implement rate limiting for API routes
5. Set up proper error tracking (Sentry, etc.)
6. Configure CORS if needed
7. Enable HTTPS (required for MediaDevices API)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
