# Project Constitution

## 1. Core Principles
- **User-Centric Simplicity**: Prioritize intuitive, seamless user experience over feature complexity
- **Performance First**: Optimize for speed and responsiveness in all user interactions
- **Privacy by Default**: Protect user data with minimal data retention and secure handling
- **Reliability Over Features**: Ensure core functionality (recording, upload, transcription) works flawlessly
- **Clean Code Standards**: Maintain high code quality with consistent patterns and proper documentation
- **Progressive Enhancement**: Build with graceful degradation and accessibility as foundational requirements
- **OpenAI Integration Excellence**: Leverage OpenAI APIs effectively for superior transcription and summarization
- **Next.js Best Practices**: Strictly follow Next.js 15+ patterns and App Router conventions

## 2. Code Quality Standards
- Enforce strict TypeScript usage (no `any`, proper typing everywhere)
- Clean, readable, maintainable code (SOLID where applicable, small functions/components)
- Consistent naming conventions (kebab-case for files, PascalCase for components, camelCase for variables)
- Proper error handling and logging
- No unnecessary dependencies; prefer built-in Next.js features
- All code must be modular and reusable where it makes sense
- Use ESLint and Prettier with consistent configuration across the project
- Components must be properly typed with TypeScript interfaces

## 3. Testing Standards
- Every major feature (recording, upload, transcription, summary generation) must have corresponding tests
- Use Jest + React Testing Library for unit and component tests
- Write integration tests for API routes and full recording-to-summary flow where possible
- Aim for high test coverage on critical paths (recording logic, AI integration)
- Tests must be fast and reliable; no flaky tests allowed
- Browser API mocking strategy must be clearly defined
- All API routes must have corresponding integration tests

## 4. User Experience Consistency
- All UI must follow a clean, modern, professional design similar to Loom (minimalist, intuitive)
- Consistent Tailwind classes and design tokens (colors, spacing, typography, buttons, modals)
- Fully responsive (mobile-friendly layout)
- Smooth animations and loading states using Tailwind + framer-motion (if used sparingly)
- Excellent accessibility (ARIA labels, keyboard navigation, focus management)
- Clear feedback for all user actions (recording start/stop, upload progress, AI processing)
- Intuitive video player with timeline summary display
- Loading states must be informative and visually consistent

## 5. Performance Requirements
- Screen recording must feel responsive (low latency preview)
- Video upload must show real-time progress and be efficient (chunked if possible for large files)
- AI transcription + summary generation must complete in reasonable time (< 30-60s for 5-min video)
- Page load and initial render < 2 seconds
- Optimized bundle size; use Next.js Image, dynamic imports, and code splitting
- No blocking operations on the main thread during recording
- Efficient handling of large video blobs in browser memory
- Lazy loading for components that are not immediately visible

## 6. Security & Privacy
- Never store sensitive data (e.g., raw recordings) longer than necessary
- Proper API key handling for OpenAI (use environment variables, never expose on client)
- Validate all user inputs and file uploads
- Rate limiting and error boundaries where applicable
- Implement proper authentication if required for user accounts
- Sanitize all data before processing or displaying
- Secure file upload mechanisms with proper validation

## 7. Architectural Constraints
- Strictly use Next.js App Router and Server Actions where possible
- Keep client-side code minimal for media handling; move heavy processing to server when feasible
- All AI calls must go through server-side API routes (never expose API keys)
- Clear separation between recording logic, upload, transcription, and summarization layers
- Use environment variables for all configuration values
- Implement proper error boundaries at the component level
- Follow Next.js conventions for data fetching and caching

## 8. General Rules
- This constitution is immutable and supersedes any conflicting instructions unless explicitly updated.
- Any deviation must be documented and justified in the Spec or Plan.
- Prioritize simplicity and reliability over cleverness.
- All new features must align with the core principles outlined above.
- Regular code reviews must verify adherence to these standards.
- Maintain clear separation of concerns in all components and modules.
