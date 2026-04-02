# Quickstart Guide - Loom AI Screen Recorder

## Prerequisites
- Node.js 18+ installed
- OpenAI API key
- Modern browser (Chrome, Firefox, or Edge)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000` in your browser

## Key Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Check code quality
- `npm run test` - Run tests

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - Reusable React components
- `lib/` - Utility functions and API clients
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks
- `utils/` - Helper functions

## Key Features

### Recording
1. Navigate to `/record`
2. Grant screen and microphone permissions
3. Click "Start Recording"
4. Share your screen and speak
5. Click "Stop Recording" when done

### Viewing Recordings
1. Access your recording from the home page
2. View the video with AI-generated timeline summary
3. Click timeline items to jump to specific parts

## Development Notes

- All OpenAI calls happen server-side in API routes
- Media recording uses browser MediaRecorder API
- Videos are temporarily stored in local file system
- TypeScript is used throughout the project
- Tailwind CSS for styling