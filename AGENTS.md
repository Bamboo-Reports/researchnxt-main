# Agent instructions

## Progress tracking

Always update `PROGRESS.md` before finishing a task. Record the current state of the work, including what changed, what was verified, and anything that remains incomplete or blocked. Keep the file accurate enough for another agent to continue without relying on chat history.

## Project command permission

Do not run project or development commands unless the user explicitly gives permission. This includes builds, development or production servers, tests, package installation or updates, database migrations, code generation, deployments, and similar commands.

Lint checks are the sole standing exception and may be run without asking first. Read-only shell inspection and Git status/diff checks are also allowed. If any other command is needed to verify or complete work, ask the user before running it.
