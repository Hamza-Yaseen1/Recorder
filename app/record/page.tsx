'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useMediaRecorder from '@/hooks/useMediaRecorder';
import { formatTimeWithHours } from '@/utils/time-format';
import { RECORDING_STATUS, API_ENDPOINTS } from '@/constants';

export default function RecordPage() {
  const router = useRouter();
  const {
    recordingSession,
    isRecording,
    isPaused,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    error,
  } = useMediaRecorder();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'high' | 'medium' | 'low'>('medium');

  const handleStartRecording = async () => {
    try {
      await startRecording({
        audioEnabled,
        webcamEnabled,
        settings: {
          videoQuality,
          audioBitrate: 128000,
          includeWebcam: webcamEnabled,
        },
      });
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const handleStopRecording = async () => {
    const blob = await stopRecording();
    
    if (blob) {
      // Upload the recording
      await uploadRecording(blob);
    }
  };

  const uploadRecording = async (blob: Blob) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', blob, `recording-${Date.now()}.webm`);

      const response = await fetch(API_ENDPOINTS.UPLOAD, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      // Navigate to the watch page
      router.push(`/watch/${result.id}`);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload recording. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Screen Recorder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Configure your recording settings and start capturing
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 transition-all duration-300 animate-scale-in">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg animate-fade-in">
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Recording Settings */}
          {!isRecording && !isUploading && (
            <div className="mb-8 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <label className="flex items-center space-x-3 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={audioEnabled}
                    onChange={(e) => setAudioEnabled(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Record Audio</span>
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">Microphone</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <label className="flex items-center space-x-3 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={webcamEnabled}
                    onChange={(e) => setWebcamEnabled(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Include Webcam</span>
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">Camera overlay</span>
              </div>

              <div className="space-y-3">
                <label className="block text-gray-900 dark:text-gray-100 font-medium">
                  Video Quality
                </label>
                <select
                  value={videoQuality}
                  onChange={(e) => setVideoQuality(e.target.value as 'high' | 'medium' | 'low')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="low">Low (640x480) - Smaller file size</option>
                  <option value="medium">Medium (1280x720) - Balanced</option>
                  <option value="high">High (1920x1080) - Best quality</option>
                </select>
              </div>
            </div>
          )}

          {/* Recording Status */}
          {isRecording && (
            <div className="mb-8 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
                  {formatTimeWithHours(recordingTime)}
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                {isPaused ? '⏸️ Recording Paused' : '🔴 Recording in Progress'}
              </p>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mb-8 animate-fade-in">
              <p className="text-center mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                Uploading recording...
              </p>
              <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                {uploadProgress}% complete
              </p>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isRecording && !isUploading && (
              <button
                onClick={handleStartRecording}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 bg-white rounded-full"></span>
                Start Recording
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            )}

            {isRecording && (
              <>
                {!isPaused ? (
                  <button
                    onClick={pauseRecording}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    ⏸️ Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeRecording}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    ▶️ Resume
                  </button>
                )}

                <button
                  onClick={handleStopRecording}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ⏹️ Stop & Upload
                </button>
              </>
            )}
          </div>

          {/* Instructions */}
          {!isRecording && !isUploading && (
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 animate-fade-in animate-delay-200">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="text-blue-500">💡</span>
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>You'll be prompted to select which screen or window to share</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Enable audio to capture your voice commentary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Use pause/resume to take breaks during longer recordings</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
