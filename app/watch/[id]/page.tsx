'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import { VideoMetadata } from '@/types';

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = () => {
    if (!videoData) return;
    
    const link = document.createElement('a');
    link.href = videoData.videoUrl;
    link.download = videoData.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch video metadata from API
      const response = await fetch(`/api/video/${videoId}`);
      
      if (!response.ok) {
        throw new Error('Video not found');
      }

      const metadata: VideoMetadata = await response.json();
      setVideoData(metadata);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch video data:', err);
      setError('Failed to load video. Please try again.');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-6 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md border border-gray-100 dark:border-gray-700 animate-scale-in">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3 text-center">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !videoData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-6 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 animate-scale-in">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent absolute inset-0"></div>
            </div>
            <p className="text-xl font-medium text-gray-900 dark:text-white">Loading video...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Your Recording
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{videoData.filename}</p>
        </div>

        {/* Video Player Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-scale-in">
          <VideoPlayer videoUrl={videoData.videoUrl} />
          
          {/* Download Button */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handleDownload}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Video
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>📅 {new Date(videoData.uploadDate).toLocaleDateString()}</span>
              <span>💾 {(videoData.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
