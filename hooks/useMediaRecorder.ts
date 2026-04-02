import { useState, useRef, useEffect } from 'react';
import { RecordingSettings, RecordingSession } from '../types';
import { RECORDING_STATUS } from '../constants';

interface UseMediaRecorderOptions {
  audioEnabled?: boolean;
  webcamEnabled?: boolean;
  settings?: RecordingSettings;
}

interface UseMediaRecorderReturn {
  recordingSession: RecordingSession | null;
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  startRecording: (options?: UseMediaRecorderOptions) => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  getSupportedConstraints: () => MediaTrackSupportedConstraints;
  error: string | null;
}

const useMediaRecorder = (): UseMediaRecorderReturn => {
  const [recordingSession, setRecordingSession] = useState<RecordingSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update recording time counter
  useEffect(() => {
    if (isRecording && !isPaused) {
      startTimeRef.current = startTimeRef.current || new Date();

      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = (new Date().getTime() - startTimeRef.current.getTime()) / 1000;
          setRecordingTime(elapsed);
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const getSupportedConstraints = (): MediaTrackSupportedConstraints => {
    return navigator.mediaDevices.getSupportedConstraints();
  };

  const startRecording = async (options: UseMediaRecorderOptions = {}) => {
    setError(null);

    try {
      // Set default options
      const {
        audioEnabled = true,
        webcamEnabled = false,
        settings = {
          videoQuality: 'medium',
          audioBitrate: 128000,
          includeWebcam: false,
        }
      } = options;

      // Get screen capture stream
      const displayMediaOptions = {
        video: {
          displaySurface: 'monitor' as const,
        },
        audio: audioEnabled ? {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } : false,
      };

      let screenStream: MediaStream;
      try {
        screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      } catch (displayErr) {
        setError('Screen recording permission denied: ' + (displayErr as Error).message);
        throw displayErr;
      }

      videoStreamRef.current = screenStream;

      // Handle webcam if enabled
      let combinedStream = screenStream;
      if (webcamEnabled) {
        try {
          const webcamConstraints = {
            video: { facingMode: 'user' },
            audio: false, // Don't capture audio from webcam if we're already getting it from mic
          };

          const webcamStream = await navigator.mediaDevices.getUserMedia(webcamConstraints);
          webcamStreamRef.current = webcamStream;

          // Add webcam video track to screen stream
          const webcamVideoTrack = webcamStream.getVideoTracks()[0];
          screenStream.addTrack(webcamVideoTrack);
        } catch (webcamErr) {
          console.warn('Could not access webcam:', webcamErr);
          // Continue without webcam
        }
      }

      // Handle separate audio stream if needed
      if (audioEnabled && !screenStream.getAudioTracks().length) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioStreamRef.current = audioStream;

          // Add audio track to the combined stream
          const audioTrack = audioStream.getAudioTracks()[0];
          combinedStream = new MediaStream([
            ...screenStream.getVideoTracks(),
            audioTrack
          ]);
        } catch (audioErr) {
          console.warn('Could not access microphone:', audioErr);
          // Continue without separate audio
          combinedStream = screenStream;
        }
      }

      // Create media recorder
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9',
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Clean up streams
        if (videoStreamRef.current) {
          videoStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (webcamStreamRef.current) {
          webcamStreamRef.current.getTracks().forEach(track => track.stop());
        }

        setIsRecording(false);
        setIsPaused(false);

        // Update recording session status
        if (recordingSession) {
          setRecordingSession({
            ...recordingSession,
            status: RECORDING_STATUS.STOPPING,
            endTime: new Date(),
          });
        }
      };

      mediaRecorder.onerror = (event) => {
        setError(`MediaRecorder error: ${event.error}`);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);

      // Create initial recording session
      const session: RecordingSession = {
        id: `rec_${Date.now()}`,
        startTime: new Date(),
        status: RECORDING_STATUS.RECORDING,
        audioEnabled,
        webcamEnabled,
        settings,
      };

      setRecordingSession(session);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = async (): Promise<Blob | null> => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      // Wait for the stop event to complete
      return new Promise((resolve) => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.addEventListener('stop', () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });

            // Update recording session with the blob
            if (recordingSession) {
              setRecordingSession({
                ...recordingSession,
                videoBlob: blob,
                status: RECORDING_STATUS.COMPLETE,
              });
            }

            resolve(blob);
          }, { once: true });
        } else {
          resolve(null);
        }
      });
    }

    return null;
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);

      if (recordingSession) {
        setRecordingSession({
          ...recordingSession,
          status: RECORDING_STATUS.PAUSED,
        });
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);

      if (recordingSession) {
        setRecordingSession({
          ...recordingSession,
          status: RECORDING_STATUS.RECORDING,
        });
      }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }

      [videoStreamRef, audioStreamRef, webcamStreamRef].forEach(streamRef => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      });
    };
  }, []);

  return {
    recordingSession,
    isRecording,
    isPaused,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    getSupportedConstraints,
    error,
  };
};

export default useMediaRecorder;