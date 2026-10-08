/**
 * assistant.js - "Ask About Me" Interactive AI Assistant Shell
 *
 * ARCHITECTURAL NOTE FOR PRODUCTION RAG BACKEND:
 * By default, this widget operates in interactive demonstration mode with pre-indexed
 * knowledge about Aarti's resume, experience, and projects.
 *
 * To connect to a live serverless RAG endpoint (e.g. Cloudflare Worker, AWS Lambda, Modal):
 * 1. Set `LIVE_ENDPOINT_URL` to your secure API endpoint.
 * 2. Send the user query via POST with session context.
 * 3. Stream or return the response without ever exposing private API keys in client-side code.
 */

const LIVE_ENDPOINT_URL = null; // e.g. "https://rag-assistant.yourdomain.workers.dev/api/chat"

const KNOWLEDGE_RESPONSES = {
  default: "I can share details about Aarti Barve's 5+ years of experience in AI/ML, her production RAG and LangGraph agent architectures at PNC Bank, her 60K+ daily query GenAI search engine at American Express, or her UC Irvine Master's degree. What would you like to explore?",
  
  rag: "Aarti has deep expertise in Retrieval-Augmented Generation (RAG):\n• At PNC Bank, she built production LangChain retrieval pipelines with groundedness score tracking and custom tool calling.\n• At CDreams Foundation, she deployed enterprise RAG over internal policies using Claude 3.5 Sonnet, LlamaIndex, and Pinecone.\n• She designed AetherRAG and MCP-based research Q&A systems combining dense vector search with sparse BM25 and cross-encoder rerankers.",

  agents: "Aarti specializes in Agentic Workflows & Multi-Agent orchestration:\n• At PNC Bank, she engineered LangGraph stateful agent systems with memory persistence, SQLite checkpointing, and retry logic for automated credit decisioning.\n• In open projects, she developed an MCP-powered document Q&A multi-agent system and a CrewAI automated content generation pipeline.\n• Certified in LangGraph Essentials (Python) and Fundamentals of Agents by Hugging Face.",

  experience: "Aarti's track record includes:\n1. AI/ML Engineer @ PNC Bank: Built credit risk decisioning platform, LangGraph agents, and MLflow evaluation pipelines.\n2. AI/ML Engineer @ CDreams Foundation: Deployed Claude 3.5 Sonnet RAG knowledge assistant.\n3. GenAI Engineer @ American Express: Scaled hybrid search to 60K+ daily queries and built high-precision NER pipelines.\n4. Data Scientist @ ZigZag VC: NLP topic modeling (BERTopic/LDA) and predictive startup scoring.\n5. Senior Software Engineer @ Infosys: Enterprise microservices, SQL optimization, and Kafka/ActiveMQ messaging.",

  voice: "Her Conversational Voice Assistant project uses LiveKit WebRTC, ElevenLabs, and GPT-4o-mini with dynamic Voice Activity Detection (VAD) and clause-based token buffering, cutting end-to-end response latency to just 0.34 seconds!",

  skills: "Aarti's technical stack spans:\n• GenAI/LLMs: LangChain, LangGraph, CrewAI, MCP, LLaMA 3, Claude 3.5 Sonnet, GPT-4o, RAG, Prompt Engineering, Guardrails\n• ML/NLP: Python, PyTorch, spaCy, NLTK, BERTopic, scikit-learn, XGBoost\n• Cloud & MLOps: Snowflake Cortex AI, AWS Bedrock/SageMaker, GCP Vertex AI, Docker, Kubernetes, Kafka, FastAPI, MLflow\n• Data/Frontend: PostgreSQL, Redis, Pinecone, ReactJS, TypeScript, Tableau, Power BI",

  education: "Aarti holds:\n• Master of Science in Business Analytics (MSBA) from the University of California, Irvine (UCI), Aug 2024\n• Bachelor of Engineering in Computer Science from Dr. Babasaheb Ambedkar Marathwada University, Jun 2020\n• Multiple industry certifications from LangChain Academy, Google Cloud, and DeepLearning.AI."
};

export function initAssistant() {
  const triggerBtn = document.getElementById('assistantTriggerBtn');
  const drawer = document.getElementById('assistantDrawer');
  const closeBtn = document.getElementById('assistantCloseBtn');
  const messagesContainer = document.getElementById('assistantMessages');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const suggestionsContainer = document.getElementById('assistantSuggestions');

  if (!triggerBtn || !drawer || !messagesContainer) return;

  function toggleDrawer() {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      input.focus();
    }
  }

  triggerBtn.addEventListener('click', toggleDrawer);
  if (closeBtn) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  function appendMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return bubble;
  }

  function simulateStreaming(sender, fullText) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    messagesContainer.appendChild(bubble);

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      bubble.textContent = fullText.slice(0, index);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      if (index >= fullText.length) {
        clearInterval(interval);
        bubble.textContent = fullText;
      }
    }, 15);
  }

  async function handleQuery(queryText) {
    if (!queryText.trim()) return;

    appendMessage('user', queryText);
    input.value = '';

    // If live API endpoint configured, dispatch network request
    if (LIVE_ENDPOINT_URL) {
      try {
        const response = await fetch(LIVE_ENDPOINT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryText })
        });
        const data = await response.json();
        simulateStreaming('bot', data.answer || "I received your response from the live assistant.");
        return;
      } catch (err) {
        console.warn('Live assistant API fallback:', err);
      }
    }

    // Interactive Demo Matching Logic
    const q = queryText.toLowerCase();
    let reply = KNOWLEDGE_RESPONSES.default;

    if (q.includes('rag') || q.includes('retrieval') || q.includes('pinecone') || q.includes('llamaindex')) {
      reply = KNOWLEDGE_RESPONSES.rag;
    } else if (q.includes('agent') || q.includes('langgraph') || q.includes('mcp') || q.includes('crewai')) {
      reply = KNOWLEDGE_RESPONSES.agents;
    } else if (q.includes('experience') || q.includes('amex') || q.includes('pnc') || q.includes('american express') || q.includes('work') || q.includes('company')) {
      reply = KNOWLEDGE_RESPONSES.experience;
    } else if (q.includes('voice') || q.includes('livekit') || q.includes('latency') || q.includes('elevenlabs')) {
      reply = KNOWLEDGE_RESPONSES.voice;
    } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('snowflake')) {
      reply = KNOWLEDGE_RESPONSES.skills;
    } else if (q.includes('education') || q.includes('degree') || q.includes('uci') || q.includes('university') || q.includes('cert')) {
      reply = KNOWLEDGE_RESPONSES.education;
    }

    setTimeout(() => {
      simulateStreaming('bot', reply);
    }, 250);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuery(input.value);
    });
  }

  if (suggestionsContainer) {
    suggestionsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.suggestion-chip');
      if (chip) {
        handleQuery(chip.textContent.trim());
      }
    });
  }
}
