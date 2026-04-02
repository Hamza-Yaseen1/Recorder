'use client';

import React, { useState, useEffect } from 'react';
import { useRecording } from '@/context/RecordingContext';
import { RECORDING_STATUS } from '@/constants';
import { RecordingSession } from '@/types';

interface RecordingControlsProps {
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onRecordingStateChange?: (state: string) => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  onStartRecording,
  onStopRecording,
  onRecordingStateChange,
}) => {
  const { recordingSession, startRecording, stopRecording, pauseRecording, resumeRecording } = useRecording();
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Update recording time counter when recording
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (recordingSession?.status === RECORDING_STATUS.RECORDING) {
      interval = setInterval(() => {
        if (recordingSession.startTime) {
          const elapsed = (new Date().getTime() - recordingSession.startTime.getTime()) / 1000;
          setRecordingTime(elapsed);
        }
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recordingSession?.status, recordingSession?.startTime]);

  // Notify parent components of state changes
  useEffect(() => {
    if (onRecordingStateChange && recordingSession) {
      onRecordingStateChange(recordingSession.status);
    }
  }, [recordingSession?.status, onRecordingStateChange]);

  const handleStartRecording = async () => {
    if (recordingSession?.status === RECORDING_STATUS.RECORDING) {
      return; // Already recording
    }

    try {
      // Create a complete recording session
      const newSession: RecordingSession = {
        id: `rec_${Date.now()}`,
        startTime: new Date(),
        audioEnabled: true,
        webcamEnabled: false,
        settings: {
          videoQuality: 'medium',
          audioBitrate: 128000,
          includeWebcam: false,
        },
        status: 'recording',
      };

      startRecording(newSession);
      onStartRecording?.();
    } catch (err) {
      console.error('Error starting recording:', err);
      alert(`Could not start recording: ${(err as Error).message}`);
    }
  };

  const handleStopRecording = () => {
    if (recordingSession?.status !== RECORDING_STATUS.RECORDING) {
      return;
    }

    stopRecording({
      status: RECORDING_STATUS.STOPPING,
      endTime: new Date(),
    });

    onStopRecording?.();
  };

  const handlePauseResume = () => {
    if (recordingSession?.status === RECORDING_STATUS.RECORDING) {
      pauseRecording();
    } else if (recordingSession?.status === RECORDING_STATUS.PAUSED) {
      resumeRecording();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="recording-controls flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow">
      <div className="control-buttons flex space-x-4">
        {!recordingSession || recordingSession.status === RECORDING_STATUS.IDLE ? (
          <button
            onClick={handleStartRecording}
            className="start-btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center justify-center transition-colors"
            aria-label="Start recording"
          >
            <span className="flex items-center">
              <span className="w-3 h-3 bg-white rounded-full mr-2"></span>
              Start Recording
            </span>
          </button>
        ) : (
          <>
            {recordingSession.status === RECORDING_STATUS.RECORDING && (
              <button
                onClick={handlePauseResume}
                className="pause-btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium transition-colors"
                aria-label="Pause recording"
              >
                Pause
              </button>
            )}
            {recordingSession.status === RECORDING_STATUS.PAUSED && (
              <button
                onClick={handlePauseResume}
                className="resume-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium transition-colors"
                aria-label="Resume recording"
              >
                Resume
              </button>
            )}
            <button
              onClick={handleStopRecording}
              className="stop-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
              aria-label="Stop recording"
            >
              Stop
            </button>
          </>
        )}

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="settings-btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium transition-colors"
          aria-label="Recording settings"
        >
          Settings
        </button>
      </div>

      {/* Recording time display */}
      {recordingSession?.status === RECORDING_STATUS.RECORDING && (
        <div className="recording-time flex items-center text-red-500 font-mono text-xl">
          <span className="recording-indicator w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
          {formatTime(recordingTime)}
        </div>
      )}

      {/* Recording status indicator */}
      <div className="recording-status text-sm">
        Status:
        <span className={`ml-2 px-2 py-1 rounded ${
          recordingSession?.status === RECORDING_STATUS.RECORDING ? 'bg-red-100 text-red-800' :
          recordingSession?.status === RECORDING_STATUS.PAUSED ? 'bg-yellow-100 text-yellow-800' :
          recordingSession?.status === RECORDING_STATUS.STOPPING ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {recordingSession?.status || 'idle'}
        </span>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="settings-panel bg-white p-4 rounded-lg shadow-md w-full mt-2">
          <h3 className="text-lg font-semibold mb-2">Recording Settings</h3>

          <div className="setting-item mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={recordingSession?.audioEnabled ?? true}
                onChange={(e) => {
                  // In a real implementation, this would update the recording settings
                }}
              />
              Record Audio
            </label>
          </div>

          <div className="setting-item mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={recordingSession?.webcamEnabled ?? false}
                onChange={(e) => {
                  // In a real implementation, this would update the recording settings
                }}
              />
              Include Webcam
            </label>
          </div>

          <div className="setting-item">
            <label className="block mb-1">Video Quality:</label>
            <select
              className="border rounded px-2 py-1"
              defaultValue={recordingSession?.settings.videoQuality ?? 'medium'}
              onChange={(e) => {
                // In a real implementation, this would update the recording settings
              }}
            >
              <option value="low">Low (640x480)</option>
              <option value="medium">Medium (1280x720)</option>
              <option value="high">High (1920x1080)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingControls;