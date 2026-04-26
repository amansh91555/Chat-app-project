const AI_TASKS = {
  "smart-reply": {
    label: "Smart reply",
    instruction:
      "Write three short, natural reply options for the user. Keep them friendly, conversational, and useful.",
  },
  summarize: {
    label: "Chat summary",
    instruction:
      "Summarize the recent conversation in concise bullet points with decisions, open questions, and follow-ups.",
  },
  rewrite: {
    label: "Tone rewrite",
    instruction:
      "Rewrite the draft message so it is clearer, polite, and professional while preserving the meaning.",
  },
  translate: {
    label: "Translation",
    instruction:
      "Translate the draft message into the requested target language. Return only the translated text.",
  },
};

const buildConversationText = (messages = []) =>
  messages
    .slice(-12)
    .map((message) => {
      const role = message.senderId?.toString() === message.currentUserId ? "Me" : "Them";
      return `${role}: ${message.text || "[image]"}`;
    })
    .join("\n");

const createMessages = ({ task, draft, targetLanguage, conversation }) => {
  const taskConfig = AI_TASKS[task] || AI_TASKS["smart-reply"];
  const target = targetLanguage || "English";

  return [
    {
      role: "system",
      content:
        "You are an AI copilot inside a full-stack chat application. Be practical, safe, concise, and never reveal private implementation details.",
    },
    {
      role: "user",
      content: [
        `Task: ${taskConfig.label}`,
        `Instruction: ${taskConfig.instruction}`,
        task === "translate" ? `Target language: ${target}` : "",
        draft ? `Draft message: ${draft}` : "",
        conversation ? `Recent conversation:\n${conversation}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
};

const fallbackResponse = ({ task, draft, targetLanguage, conversation }) => {
  const cleanDraft = draft?.trim();
  const lines = conversation
    ? conversation
        .split("\n")
        .filter(Boolean)
        .slice(-6)
    : [];

  if (task === "summarize") {
    return lines.length
      ? `Summary:\n- Recent chat has ${lines.length} visible messages.\n- Latest topic: ${lines.at(-1)}\n- Follow up with a clear next step or question.`
      : "No recent text messages are available to summarize yet.";
  }

  if (task === "rewrite") {
    return cleanDraft
      ? `Hi, ${cleanDraft.charAt(0).toLowerCase()}${cleanDraft.slice(1)}`
      : "Type a draft first, then use Rewrite to polish it.";
  }

  if (task === "translate") {
    return cleanDraft
      ? `[${targetLanguage || "English"} translation placeholder] ${cleanDraft}`
      : "Type a message first, then choose Translate.";
  }

  return [
    "That sounds good to me.",
    "Thanks for sharing. Can you tell me a little more?",
    "Sure, I can help with that.",
  ].join("\n");
};

export const runAiAssistant = async ({ task, draft, targetLanguage, messages }) => {
  const conversation = buildConversationText(messages);

  if (!process.env.OPENAI_API_KEY) {
    return {
      provider: "local-fallback",
      result: fallbackResponse({ task, draft, targetLanguage, conversation }),
    };
  }

  const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: createMessages({ task, draft, targetLanguage, conversation }),
      temperature: 0.4,
      max_tokens: 350,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "AI provider request failed");
  }

  return {
    provider: "openai-compatible",
    model,
    result: data.choices?.[0]?.message?.content?.trim() || "",
  };
};
