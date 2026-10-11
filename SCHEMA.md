# 📋 Portfolio Data Schema & Quick Edit Guide

All content rendered on this portfolio website is decoupled from code and driven directly by the JSON files in the `/data/` directory.

To update any section of your portfolio, edit the corresponding JSON file and push your changes to GitHub. No build step or server restart is required.

---

## 1. `data/projects.json` — Add a New Project in 60 Seconds

Each object in the array represents a project card and its full-screen interactive deep-dive modal.

### Template:
```json
{
  "id": "unique-project-slug",
  "title": "Project Title",
  "summary": "1-2 sentence high-level summary displayed on the card.",
  "category": "GenAI/LLM | RAG | Agents | ML | Deep Learning | NLP | Computer Vision | MLOps",
  "featured": true,
  "image": "assets/images/project-rag.svg",
  "techStack": ["Python", "LangGraph", "FastAPI", "Docker"],
  "tags": ["Agentic RAG", "Evaluation", "Streaming"],
  "links": {
    "github": "https://github.com/Aarti1212/your-repo",
    "demo": "https://your-demo-url.com",
    "huggingface": "https://huggingface.co/spaces/Aarti1212/space-name",
    "paper": "https://your-blog-or-paper-url.com"
  },
  "problem": "Detailed 2-3 sentence explanation of the business/technical challenge.",
  "approach": "Detailed technical methodology, framework choices, and optimization steps.",
  "architecture": "graph TD\n    A[Input] --> B[Processing Node]\n    B --> C[Output Result]",
  "metrics": [
    { "label": "Latency (P95)", "value": "<140ms", "delta": "-45% vs baseline" },
    { "label": "Accuracy / F1", "value": "96.4%", "delta": "+18% precision" }
  ],
  "challengesAndLearnings": "Specific engineering hurdles overcome (e.g., token limits, VRAM, concurrency).",
  "codeSnippet": {
    "language": "python",
    "code": "def process_stream():\n    return 'streaming response'"
  },
  "whatIdDoNext": "Future roadmap, optimizations, or speculative features to test next."
}
```

---

## 2. `data/experience.json` — Add a Career Role

```json
{
  "id": "exp-slug",
  "role": "Senior AI Engineer",
  "company": "Company Name",
  "companyUrl": "https://company.com",
  "location": "City, State / Remote",
  "period": "Jan 2025 – Present",
  "type": "Full-time",
  "summary": "High-level summary of your core charter and domain focus.",
  "highlights": [
    "Impact bullet point 1 with quantifiable metric (e.g. +15% CTR, -40% latency).",
    "Impact bullet point 2 detailing architecture, pipeline, or model choices.",
    "Impact bullet point 3 detailing leadership, governance, or cross-functional delivery."
  ],
  "technologies": ["Python", "LangGraph", "FastAPI", "AWS Bedrock", "Kafka"]
}
```

---

## 3. `data/skills.json` — Core Technical Expertise

```json
{
  "topSkills": [
    {
      "category": "Generative AI, Agents & LLMs",
      "class": "es-genai",
      "description": "Category description",
      "skills": [
        { "name": "LangChain & LangGraph", "level": "Expert", "value": 96 }
      ]
    }
  ]
}
```

---

## 4. `data/profile.json` — Global Settings & Socials

- `name`, `title`, `tagline`, `location`, `phone`, `email`
- `stats`: Array of `{ "value": "...", "label": "...", "detail": "..." }`
- `currentFocus`: `{ "building": "...", "exploring": "...", "reading": "..." }`
- `socials`: Links to GitHub, LinkedIn, Hugging Face, etc.
- `config`:
  - `showBlogSection`: `true | false`
  - `showHobbiesSection`: `true | false`
  - `showAssistantTeaser`: `true | false`
  - `contactFormEndpoint`: `"https://formspree.io/f/your_form_id_here"`

---

## 5. `data/hobbies.json` — Languages, Cooking & Creative Hobbies

Easily add language skills (e.g. Turkish, Korean, Italian), culinary dishes/cooking pictures, and creative passions.

### Template:
```json
{
  "languages": [
    {
      "id": "lang-slug",
      "name": "Language Name",
      "native": "Native Script",
      "flag": "🇹🇷",
      "level": "Conversational Learner | Elementary | Fluent",
      "description": "Short note about your learning journey or connection to the culture."
    }
  ],
  "culinary": [
    {
      "id": "dish-slug",
      "title": "Dish Name",
      "cuisine": "Cuisine Type",
      "badge": "Handmade | Comfort Food",
      "description": "Description of the recipe, techniques, or ingredients used.",
      "image": "assets/images/your-cooking-photo.jpg",
      "highlights": ["Semolina dough", "Slow simmer", "Fresh herbs"]
    }
  ],
  "otherInterests": [
    {
      "icon": "☕",
      "title": "Interest Title",
      "description": "Brief description of the hobby."
    }
  ]
}
```

