'use client';

import { RecordingProvider } from '@/context/RecordingContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RecordingProvider>{children}</RecordingProvider>
    </ThemeProvider>
  );
}
