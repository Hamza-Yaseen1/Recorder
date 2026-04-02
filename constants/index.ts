// Recording status constants
export const RECORDING_STATUS = {
  IDLE: 'idle',
  RECORDING: 'recording',
  PAUSED: 'paused',
  STOPPING: 'stopping',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  COMPLETE: 'complete',
  ERROR: 'error',
} as const;

// Video quality options
export const VIDEO_QUALITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

// Video quality settings
export const VIDEO_SETTINGS = {
  [VIDEO_QUALITY.HIGH]: {
    width: 1920,
    height: 1080,
    bitrate: 5000000, // 5 Mbps
  },
  [VIDEO_QUALITY.MEDIUM]: {
    width: 1280,
    height: 720,
    bitrate: 2500000, // 2.5 Mbps
  },
  [VIDEO_QUALITY.LOW]: {
    width: 640,
    height: 480,
    bitrate: 1000000, // 1 Mbps
  },
};

// Default audio bitrate (in bits per second)
export const DEFAULT_AUDIO_BITRATE = 128000; // 128 kbps

// API endpoints
export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  VIDEO_BY_ID: (id: string) => `/api/video/${id}`,
};

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  MAX_VIDEO_SIZE: 1024 * 1024 * 1024, // 1 GB
  CHUNK_SIZE: 1024 * 1024 * 10, // 10 MB chunks for large files
};

// Timeout configurations (in milliseconds)
export const TIMEOUT_CONFIG = {
  UPLOAD_TIMEOUT: 300000, // 5 minutes for upload
  TRANSCRIPTION_TIMEOUT: 120000, // 2 minutes for transcription
  SUMMARY_TIMEOUT: 60000, // 1 minute for summary
};

// Video processing status
export const PROCESSING_STATUS = {
  UPLOADED: 'uploaded',
  TRANSCRIBING: 'transcribing',
  SUMMARIZING: 'summarizing',
  COMPLETE: 'complete',
  ERROR: 'error',
} as const;