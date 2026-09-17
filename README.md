# DropStack Mini-site

A fast, mobile-first, single-page website for a service business. Entirely config-driven — a new client is a content swap, not a rebuild.

Part of the DropStack service-business package: Mini-site, Lead Capture, Review Engine, Invoice Chaser. Sold together as one offer — build fee plus monthly. Each tool is its own repo and its own deploy.

## Stack

React + Vite, Tailwind CSS, Netlify. No backend, no database, no auth.

## Local setup

1. `npm install`
2. Edit `companyConfig.js` with the client's branding, contact details and WhatsApp number
3. Edit `content.js` with their services, gallery, about text and FAQ
4. Drop their logo and images into `/public`
5. `npm run dev`

## White-labelling for a client

All client-specific values live in `companyConfig.js`. A new client deploy is: fork/copy this repo, swap `companyConfig.js`, connect a new Netlify site, point the domain. No code changes.

## Build status

**v1 in progress.** See `CLAUDE.md` for the full spec, build order and definition of done. See `PROMPT.md` for the Claude Code starting prompt.

## Scope discipline

`CLAUDE.md` has a "What NOT to do" section. It's there because scope creep is what kills solo builds. Anything listed there is deliberately v2 or later — including anything needing paid SMS/WhatsApp messaging or scheduled cron jobs, neither of which is in the budget yet.
