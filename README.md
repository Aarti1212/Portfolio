# ⚡ Aarti Barve — AI / Machine Learning & GenAI Portfolio

A fast, high-performance, fully static portfolio website designed for AI/ML and Generative AI Engineers. Deploys seamlessly to **GitHub Pages** with zero build steps or backend servers.

![Portfolio Preview Banner](assets/og-image.svg)

---

## 🌟 Key Features

- **Pure Static Architecture**: Written in semantic HTML5, modern CSS3 (custom properties, responsive grid/flexbox, glassmorphic dark/light themes), and modular Vanilla JavaScript (ES modules).
- **100% Data-Driven**: All content is separated into clean JSON files (`/data/*.json`). Updating your portfolio, adding projects, or editing experience is as simple as modifying a JSON file.
- **Interactive Deep-Dive Project Modals**: Complete technical case studies with problem statements, architectural flow diagrams (Mermaid.js), quantifiable impact metrics, code snippets with syntax highlighting, and future roadmap notes.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-first navigation to search projects, jump to sections, filter by category, or toggle themes.
- **Interactive AI Assistant Teaser**: A conversational AI widget demonstration equipped with pre-indexed portfolio knowledge and clean architectural hooks for connecting to a serverless RAG endpoint (e.g., Cloudflare Workers).
- **Subtle Neural Network Canvas**: GPU-accelerated interactive particle connections in the hero section (automatically disables on `prefers-reduced-motion`).
- **Lighthouse 95+ Optimized**: Zero heavy dependencies, deferred script loading, WCAG AA compliant contrast in both dark and light modes, responsive design tested from 360px mobile to 4K desktop, and structured JSON-LD SEO metadata.

---

## 📁 Repository Structure

```
/
├── index.html                   # Master semantic layout & landmarks
├── 404.html                     # Custom 404 error page
├── robots.txt                   # Crawler indexing instructions
├── sitemap.xml                  # SEO XML sitemap
├── .nojekyll                    # Disables Jekyll processing on GitHub Pages
├── SCHEMA.md                    # Data schema documentation & copy-paste templates
├── README.md                    # Setup & deployment documentation
│
├── .github/
│   └── workflows/
│       └── pages.yml            # Automated GitHub Actions deployment workflow
│
├── css/
│   ├── base.css                 # CSS variables, typography, reset, layout tokens
│   ├── components.css           # Header, timeline, cards, modals, command palette, widgets
│   └── animations.css           # Keyframe animations, glowing effects, scroll-reveal transitions
│
├── js/
│   ├── main.js                  # Master application orchestrator & listeners
│   ├── theme.js                 # Dark/light theme switcher & persistence
│   ├── render.js                # JSON data loaders and HTML renderers
│   ├── filters.js               # Category filter chips & debounced search
│   ├── modal.js                 # Project deep dive modal with Mermaid diagram renderer
│   ├── palette.js               # Command palette (Cmd+K) quick navigation
│   ├── assistant.js             # "Ask About Me" interactive chat widget
│   └── canvas-ai.js             # Neural network particle canvas
│
├── data/
│   ├── profile.json             # Personal bio, stats, socials, and site config
│   ├── experience.json          # Detailed career timeline (PNC, AMEX, CDreams, etc.)
│   ├── projects.json            # 6 deep-dive projects with architecture & metrics
│   ├── skills.json              # Categorized skills, proficiency, & concept explainers
│   ├── education.json           # Academic degrees from UC Irvine & Dr. BAMU
│   ├── certifications.json      # LangGraph, Google Cloud, and Hugging Face badges
│   └── writing.json             # Technical articles and TIL engineering notes
│
└── assets/
    ├── favicon.svg              # Glowing neural network SVG favicon
    ├── og-image.svg             # 1200x630 OpenGraph social share card
    ├── resume.pdf               # Resume document
    └── images/                  # Stylized project architecture graphics & avatar
```

---

## 🚀 Quick Start: Preview Locally

Since the site uses modern ES modules (`type="module"`), it should be served via a local HTTP server:

### Option 1: Python (Recommended)
```bash
# In the repository root directory:
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

---

## 🚢 Deploying to GitHub Pages in 2 Minutes

1. **Create a GitHub Repository**:
   - Create a new public repository on GitHub (e.g. `Portfolio` or `<your-username>.github.io`).

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial AI portfolio release"
   git branch -M main
   git remote add origin https://github.com/Aarti1212/Portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Navigate to your repository **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - The included `.github/workflows/pages.yml` workflow will automatically build and deploy the portfolio on every push to `main`!

4. **(Optional) Add a Custom Domain**:
   - In **Settings** → **Pages** → **Custom domain**, enter your domain (e.g. `aartibarve.ai`).
   - Add a `CNAME` record in your DNS provider pointing to `Aarti1212.github.io`.

---

## ✏️ Personalization & Content Checklist

- [ ] **Resume PDF**: Replace `assets/resume.pdf` with your full, finalized PDF resume.
- [ ] **Profile Photo**: If you prefer a real photo over the stylized avatar, place `photo.jpg` in `assets/images/` and update `avatar` in `data/profile.json`.
- [ ] **Contact Form**: Create a free endpoint on [Formspree.io](https://formspree.io) or [Web3Forms.com](https://web3forms.com), and paste your form URL into `data/profile.json` under `config.contactFormEndpoint`.
- [ ] **Adding / Editing Projects**: Refer to [`SCHEMA.md`](file:///Users/aartibarve/Documents/Projects/Portfolio/SCHEMA.md) for 60-second copy-paste templates.
- [ ] **Live AI Assistant (Optional)**: If you'd like to connect the "Ask About Me" widget to a live serverless RAG model, set `LIVE_ENDPOINT_URL` in `js/assistant.js`.

---

## 📄 License
MIT License. Feel free to use this template for your personal portfolio.
