# Paste this into Claude Code

Open this folder in VS Code, start Claude Code, switch to Fable with `/model fable`, then paste everything below the line.

---

Read CLAUDE.md in this repo before doing anything else.

Build in stages per the "Build order" section of CLAUDE.md. Do not skip ahead to later stages.

**Stage 1 only:** Scaffold the project (Vite + React + Tailwind), create `companyConfig.js` and `content.js` populated with realistic placeholder content for a fictional service business, and build the page shell plus the hero and services sections.

Before you write any code:
1. Confirm you have read CLAUDE.md and understood the design tokens section — you must use it exactly, not invent your own palette.
2. Propose the file structure you intend to create.
3. Ask me anything genuinely ambiguous rather than guessing.

Then build Stage 1 only and stop. Show me what you've built before moving to Stage 2.

---

## Notes for you (Thomas) — not part of the prompt

**Test this first when Stage 1 comes back:** Open it at 375px wide. If it doesn't look right on a phone, nothing else matters — that's where every one of these will be opened.

**Rules that apply the whole way through:**
- Branch + PR. Never let it push to main.
- It does not deploy. You do.
- No real messages or emails sent during development — test data only.
- Review each stage before saying "continue to Stage 2". Redirecting after Stage 1 is cheap; after Stage 5 it isn't.
