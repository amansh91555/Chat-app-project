# Chat App Project

Real-time MERN chat application with Socket.io messaging, JWT authentication, image sharing, and an AI assistant layer.

## AI Integration

The project now includes an authenticated AI copilot for every selected chat. It can:

- Generate smart reply suggestions from recent chat context.
- Summarize the latest conversation into decisions, questions, and follow-ups.
- Rewrite draft messages into a clearer professional tone.
- Translate draft messages to Hindi from the chat input.
- Keep AI calls on the Express server so provider keys are never exposed to the React client.

## Server AI Configuration

Add these values in `server/.env` when you want real model output:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
```

If `OPENAI_API_KEY` is not present, the backend returns a local fallback response so the feature can still be demonstrated without external credentials.

## AI Topics Used

- Generative AI integration in a full-stack MERN application
- Prompt engineering for task-specific chat actions
- Context-aware AI using recent MongoDB conversation history
- Secure server-side API key handling with environment variables
- REST API design for AI services in Express
- React state management with Context API
- Authenticated AI endpoints using JWT middleware
- OpenAI-compatible chat completion API calls
- Graceful fallback logic for demos without API keys
- AI-assisted user experience: smart reply, summarization, rewrite, and translation

## Resume Bullets

- Integrated an AI assistant into a MERN real-time chat application using React, Express, MongoDB, Socket.io, and OpenAI-compatible APIs.
- Built secure server-side AI endpoints with JWT authentication, environment-based API key handling, and prompt templates for smart replies, summaries, rewrites, and translation.
- Used MongoDB chat history as contextual input to generate relevant AI responses for selected conversations.
- Enhanced the chat UI with AI-powered actions that improve productivity while preserving the existing real-time messaging workflow.
- Implemented fallback AI responses to keep the feature demo-ready even when external model credentials are unavailable.
