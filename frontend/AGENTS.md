# Repository Guidelines

## Project Structure & Module Organization
The project uses the Next.js App Router. Route segments reside in `app/`, where `layout.tsx` defines shared chrome and `page.tsx` renders the default view. Reusable UI goes in `app/components/` (e.g. `MintERC20.tsx`) and should export typed props for clarity. Global styles and Tailwind directives belong in `app/globals.css`. Static assets such as icons stay under `public/`, while build and tooling configuration lives at the repository root (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`).

## Build, Test, and Development Commands
Install dependencies with `pnpm install` to stay aligned with the lockfile. Use `pnpm dev` for the local development server at `http://localhost:3000`. Run `pnpm build` before shipping changes to ensure the production bundle succeeds, and `pnpm start` to smoke-test the compiled output. Lint with `pnpm lint`; resolve every warning before opening a pull request.

## Coding Style & Naming Conventions
Write TypeScript-first React components. Follow two-space indentation and keep JSX concise; extract helpers into `camelCase` functions and components into `PascalCase` files (e.g. `MintButton.tsx`). Prefer server components when possible, and mark client modules with `"use client"`. Styling relies on Tailwind CSS v4 directives in `globals.css`, so favor utility classes over ad-hoc inline styles. ESLint (Next.js core-web-vitals preset) is the source of truth for formatting and accessibility guidelines.

## Testing Guidelines
Automated testing is not yet configured. When adding features, include colocated tests using your chosen runner (e.g. Vitest with React Testing Library) and add a matching script (`"test": "vitest run"`). Document manual verification steps in the PR until the test stack lands. Keep test names descriptive (`ComponentName.behavior.spec.tsx`) and aim to cover critical user flows and contract interactions.

## Commit & Pull Request Guidelines
Current history follows Conventional Commits (e.g. `feat: add mint flow`). Continue using informative prefixes (`feat`, `fix`, `chore`, etc.) and present-tense summaries. For pull requests, provide a clear description of the change, link relevant issues, list the commands/tests executed, and include before/after screenshots or recordings for UI updates. Highlight any follow-up work or config changes so reviewers can respond quickly.
