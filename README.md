# Chat App AI Integrated Project

Real-time MERN chat application with Socket.io messaging, JWT authentication, image sharing, and an AI assistant layer.



The project now includes an authenticated AI copilot for every selected chat. It can:

- Generate smart reply suggestions from recent chat context.
- Summarize the latest conversation into decisions, questions, and follow-ups.
- Rewrite draft messages into a clearer professional tone.
- Translate draft messages to Hindi from the chat input.
- Keep AI calls on the Express server so provider keys are never exposed to the React client.

## Server AI Configuration

Add these values in `server/.env` when we want real model output:

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


