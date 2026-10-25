# paragpatil51.github.io

> Portfolio of **Parag Patil**, GenAI / LLM Engineer · [Live site](https://paragpatil51.github.io/) · [LinkedIn](https://www.linkedin.com/in/parag-patil-824b52253/)

A hand-built static site with no framework and no build step, served directly by GitHub Pages.

## What's inside

| Feature | How it works |
| --- | --- |
| Portrait-first hero | Photo with a `whoami` JSON panel streamed token by token, like a structured-output response |
| Writing | LinkedIn articles with summaries, key ideas and every figure, in an in-page reader with a lightbox |
| AI assistant | Floating chat on every page: BM25 retrieval, source chips, follow-up questions, refuses when there's no evidence |
| Embedding-space background | Canvas particle field that links nearby points and reacts to the cursor |
| Markdown workspace | `README.md`, `MODEL_CARD.md` and `AGENTS.md` in an editor view with Raw / Preview toggle |
| Architecture diagrams | Pipelines for QPulse, QStellar (agents + RAG) and QDetect, drawn in HTML/CSS |
| Command palette | `Ctrl / ⌘ + K` or `/` to jump to sections, open files and run actions |
| Context-window meter | Reading progress shown as tokens consumed |
| Light & dark themes | Follows the OS setting, with a manual toggle that is remembered |

## Structure

```
index.html                  page markup + SEO / Open Graph / JSON-LD
assets/css/style.css        design tokens, layout, components, responsive rules
assets/js/main.js           interactions: theme, stream, canvas, IDE, palette, retriever
assets/js/files.js          Markdown shown in the workspace (README / MODEL_CARD / AGENTS)
assets/js/writing.js        LinkedIn articles (summary, key ideas, figure captions) and feed posts
assets/js/knowledge.js      passages the AI assistant searches (with source links and follow-ups)
assets/img/                 portrait, favicon, social preview image
assets/img/writing/<slug>/  article figures, 00.jpg is the cover
assets/Parag-Patil-Resume.pdf
```

## Editing content

- **Projects, experience, skills:** edit `index.html` directly.
- **Markdown files:** edit `assets/js/files.js`. Each file is plain Markdown, one line per array item.
- **New article:** add an entry to `assets/js/writing.js` and drop its images into `assets/img/writing/<slug>/` as `00.jpg`, `01.jpg`, and so on, one per figure caption.
- **Assistant answers:** edit `assets/js/knowledge.js`. Each passage needs `id`, `title`, `text`, `k` (extra keywords), `href` (source section) and `next` (follow-up questions).
- **Résumé:** replace `assets/Parag-Patil-Resume.pdf` and keep the same filename.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploy

Push these files to the root of the `paragpatil51.github.io` repository on the `main` branch.
GitHub Pages publishes them automatically.
