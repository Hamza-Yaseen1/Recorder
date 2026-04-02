import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { RecordingSession, VideoMetadata } from '@/types';

// Define the shape of our state
interface RecordingState {
  currentSession: RecordingSession | null;
  recordedVideos: VideoMetadata[];
  isRecording: boolean;
  isProcessing: boolean;
}

// Define the actions that can be dispatched
type RecordingAction =
  | { type: 'START_RECORDING'; payload: RecordingSession }
  | { type: 'STOP_RECORDING'; payload: Partial<RecordingSession> }
  | { type: 'PAUSE_RECORDING' }
  | { type: 'RESUME_RECORDING' }
  | { type: 'UPDATE_SESSION'; payload: Partial<RecordingSession> }
  | { type: 'ADD_RECORDED_VIDEO'; payload: VideoMetadata }
  | { type: 'SET_IS_PROCESSING'; payload: boolean }
  | { type: 'RESET_SESSION' };

// Initial state
const initialState: RecordingState = {
  currentSession: null,
  recordedVideos: [],
  isRecording: false,
  isProcessing: false,
};

// Reducer function
const recordingReducer = (state: RecordingState, action: RecordingAction): RecordingState => {
  switch (action.type) {
    case 'START_RECORDING':
      return {
        ...state,
        currentSession: action.payload,
        isRecording: true,
      };
    case 'STOP_RECORDING':
      return {
        ...state,
        currentSession: state.currentSession ? { ...state.currentSession, ...action.payload } : null,
        isRecording: false,
      };
    case 'PAUSE_RECORDING':
      return {
        ...state,
        currentSession: state.currentSession ? { ...state.currentSession, status: 'paused' } : null,
      };
    case 'RESUME_RECORDING':
      return {
        ...state,
        currentSession: state.currentSession ? { ...state.currentSession, status: 'recording' } : null,
      };
    case 'UPDATE_SESSION':
      return {
        ...state,
        currentSession: state.currentSession ? { ...state.currentSession, ...action.payload } : null,
      };
    case 'ADD_RECORDED_VIDEO':
      return {
        ...state,
        recordedVideos: [...state.recordedVideos, action.payload],
      };
    case 'SET_IS_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      };
    case 'RESET_SESSION':
      return {
        ...state,
        currentSession: null,
        isRecording: false,
      };
    default:
      return state;
  }
};

// Create the context
interface RecordingContextType extends RecordingState {
  recordingSession: RecordingSession | null; // Alias for currentSession
  startRecording: (session: RecordingSession) => void;
  stopRecording: (updates: Partial<RecordingSession>) => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  updateSession: (updates: Partial<RecordingSession>) => void;
  addRecordedVideo: (video: VideoMetadata) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  resetSession: () => void;
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined);

// Provider component
interface RecordingProviderProps {
  children: ReactNode;
}

export const RecordingProvider: React.FC<RecordingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(recordingReducer, initialState);

  const startRecording = (session: RecordingSession) => {
    dispatch({ type: 'START_RECORDING', payload: session });
  };

  const stopRecording = (updates: Partial<RecordingSession>) => {
    dispatch({ type: 'STOP_RECORDING', payload: updates });
  };

  const pauseRecording = () => {
    dispatch({ type: 'PAUSE_RECORDING' });
  };

  const resumeRecording = () => {
    dispatch({ type: 'RESUME_RECORDING' });
  };

  const updateSession = (updates: Partial<RecordingSession>) => {
    dispatch({ type: 'UPDATE_SESSION', payload: updates });
  };

  const addRecordedVideo = (video: VideoMetadata) => {
    dispatch({ type: 'ADD_RECORDED_VIDEO', payload: video });
  };

  const setIsProcessing = (isProcessing: boolean) => {
    dispatch({ type: 'SET_IS_PROCESSING', payload: isProcessing });
  };

  const resetSession = () => {
    dispatch({ type: 'RESET_SESSION' });
  };

  const value = {
    ...state,
    recordingSession: state.currentSession, // Alias for compatibility
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    updateSession,
    addRecordedVideo,
    setIsProcessing,
    resetSession,
  };

  return (
    <RecordingContext.Provider value={value}>
      {children}
    </RecordingContext.Provider>
  );
};

// Custom hook to use the context
export const useRecording = (): RecordingContextType => {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
};