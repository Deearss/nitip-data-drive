# General Rules for AI Agents

All AI agents working on this project must adhere to the following rules to ensure codebase consistency, maintainability, and alignment with the user's requirements.

1.  **AI Instructions Alignment**: Always abide by the specific `GEMINI.md` or `CLAUDE.md` based on your identity to ensure environment consistency.
2.  **Architecture Verification**: Before modifying any architecture or introducing new state management patterns, always check `/docs/stack.md` and `/docs/architecture.md`. Do not drift from the predefined stack (e.g., Zustand for state).
3.  **Task Updates Requirement**: At the end of every active session, it is REQUIRED to update `/docs/progress.md` with what has been built, what is in progress, and what is next.
4.  **Language**: Write all `Code Comments` only when non-obvious. Write `git commit` messages in high-detail Indonesian.
5.  **Design Rules**: Use Tailwind CSS for styling with `clsx` and `tailwind-merge` for conditional class joining.

*Failure to adhere to these rules breaks the user's systematic developer experience. Stay rigorous.*
