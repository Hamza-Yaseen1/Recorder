'use client';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video bg-black">
      <video
        src={videoUrl}
        className="w-full h-full"
        controls
        controlsList="nodownload"
      />
    </div>
  );
}
