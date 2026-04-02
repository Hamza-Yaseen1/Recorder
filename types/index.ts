// Type definitions for RecordingSession
export interface RecordingSettings {
  videoQuality: 'high' | 'medium' | 'low';
  audioBitrate: number;
  includeWebcam: boolean;
}

export interface RecordingSession {
  id: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  status: 'idle' | 'recording' | 'paused' | 'stopping' | 'uploading' | 'processing' | 'complete' | 'error';
  videoBlob?: Blob;
  audioEnabled: boolean;
  webcamEnabled: boolean;
  settings: RecordingSettings;
}

// Type definitions for VideoMetadata
export interface VideoMetadata {
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

// Type definitions for TranscriptionResult
export interface TranscriptionSegment {
  start: number; // in seconds
  end: number;   // in seconds
  text: string;
}

export interface TranscriptionResult {
  id: string;
  videoId: string;
  segments: TranscriptionSegment[];
  fullText: string;
  createdAt: Date;
}

// Type definitions for SummarySegment
export interface SummarySegment {
  startTime: number; // in seconds
  endTime: number;   // in seconds
  title: string;     // concise title for the segment
  description?: string; // optional detailed description
}

// Type definitions for Video Processing
export interface VideoProcessingStatus {
  status: 'idle' | 'transcribing' | 'summarizing' | 'complete' | 'error';
  progress?: number;
  error?: string;
}