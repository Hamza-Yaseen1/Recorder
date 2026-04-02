/**
 * Utility functions for time formatting in the Loom AI Screen Recorder application
 */

/**
 * Formats seconds into MM:SS format
 * @param seconds - Time in seconds to format
 * @returns Formatted time string in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats seconds into HH:MM:SS format if hours > 0, otherwise MM:SS
 * @param seconds - Time in seconds to format
 * @returns Formatted time string in HH:MM:SS or MM:SS format
 */
export function formatTimeWithHours(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

/**
 * Converts a time string in MM:SS format to seconds
 * @param timeString - Time string in MM:SS format
 * @returns Time in seconds
 */
export function timeToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(Number);
  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else {
    throw new Error('Invalid time format. Expected MM:SS or HH:MM:SS');
  }
}

/**
 * Formats seconds into a timestamp range string (e.g., "0:00–0:30")
 * @param startSeconds - Start time in seconds
 * @param endSeconds - End time in seconds
 * @returns Formatted timestamp range string
 */
export function formatTimestampRange(startSeconds: number, endSeconds: number): string {
  return `${formatTime(startSeconds)}–${formatTime(endSeconds)}`;
}

/**
 * Parses a timestamp range string (e.g., "0:00–0:30") into start and end seconds
 * @param rangeString - Timestamp range string
 * @returns Object with start and end times in seconds
 */
export function parseTimestampRange(rangeString: string): { start: number; end: number } {
  const [startStr, endStr] = rangeString.split('–');
  if (!startStr || !endStr) {
    throw new Error('Invalid timestamp range format. Expected "MM:SS–MM:SS"');
  }

  return {
    start: timeToSeconds(startStr.trim()),
    end: timeToSeconds(endStr.trim())
  };
}

/**
 * Formats milliseconds to a human-readable string
 * @param ms - Time in milliseconds
 * @returns Formatted time string
 */
export function formatMilliseconds(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  } else {
    return `${(ms / 60000).toFixed(1)}m`;
  }
}