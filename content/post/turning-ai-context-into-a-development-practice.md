---
title: "Turning AI context into a development practice with skills and AGENTS.md"
description: "A practical, SMART approach to making GitHub Copilot and other coding agents more consistent, useful, and accountable."
tags: ["AI", "software development", "Copilot", "development"]
date: 2026-09-21
draft: false
featured: false
---

AI coding assistants are very good at producing an answer. The harder problem is getting a useful answer repeatedly, inside a real codebase, without making every developer explain the same context again.

That is where two simple ideas help: reusable **skills** and a repository-level **`AGENTS.md`** file. The approach is intentionally agnostic to the assistant you use—GitHub Copilot, Claude, ChatGPT, or another coding agent. The names and locations supported by each product may differ, but the underlying idea is the same: give the agent durable context and reusable ways to act on it.

Skills describe *how to perform a recurring kind of work*. An `AGENTS.md` file describes *how work should be performed in this repository*. Together, they turn an AI assistant from a clever autocomplete tool into a more consistent member of the development workflow.

## The problem: context disappears between conversations

Imagine asking an assistant to add an API endpoint. The code may compile, but it might still violate local conventions, skip tests, expose sensitive data in logs, or use a pattern the team deliberately stopped using last year.

The assistant did not necessarily fail. We failed to provide durable context.

Prompts are useful, but one-off prompts are easy to forget, hard to review, and difficult to share. A better approach is to move stable knowledge closer to the work:

- Put repository rules in `AGENTS.md`.
- Put repeatable procedures in skills.
- Keep the request itself focused on the current change.

## What belongs in `AGENTS.md`?

Think of `AGENTS.md` as a concise onboarding guide for an AI coding agent. It should answer questions such as:

- What commands build, test, lint, and format the project?
- Which directories or files are generated and should not be edited directly?
- What architectural boundaries must be preserved?
- Which testing expectations apply to a change?
- Are there security, privacy, or dependency rules to follow?
- What should the agent verify before saying the task is complete?

The best instructions are specific and verifiable. “Write high-quality code” is not very actionable. “Run `npm test` and `npm run lint` before completion; do not change generated files under `src/generated`” is much better.

Keep the file short enough to read. As a practical rule of thumb, an `AGENTS.md` file of roughly 80–100 lines is easier for an agent and a human to use than a sprawling handbook. This is not a hard limit—the right size depends on the repository—but it is a useful signal to stop and reorganize when the file keeps growing.

The file should contain stable, repository-wide guidance: commands, boundaries, conventions, and completion checks. A detailed procedure such as “how to write a migration” or “how to perform a security review” belongs in a skill instead. If a rule is important, explain the reason or point to the authoritative documentation. If `AGENTS.md` becomes a second copy of the entire handbook, it will become stale and will be ignored.

## What is a skill?

A skill is a reusable playbook for a class of tasks. For example:

- reviewing a pull request for security risks;
- adding a database migration;
- instrumenting a service with telemetry;
- creating an accessible UI component;
- preparing a release and its changelog.

A good skill usually contains four parts:

1. **When to use it.** Define the trigger and the scope.
2. **What to inspect first.** Name the files, tools, or evidence required.
3. **How to do the work.** Give a focused sequence and useful defaults.
4. **How to verify it.** Define tests, checks, or an expected output.

This structure matters because it converts personal expertise into a repeatable process. It also makes the process reviewable: a team can improve the skill just as it would improve a script or a coding standard.

The skill itself does not need to hold every example. Keep the main instructions focused, and use a `/resources` directory alongside the skill for supporting material such as code samples, JSON payloads, screenshots, diagrams, templates, or reference documents. When the agent supports loading those resources, it can use them without making the main `SKILL.md` unnecessarily long or expensive to process.

As the number of skills grows, add a small skill index. It can map a task to the skill an agent should use—for example, “database schema change → migration skill” or “new endpoint → API implementation skill.” This gives the agent a quick way to select the right playbook and helps developers discover what already exists. The index should point to skills, not repeat their instructions.

For example, a small index might look like this:

| When you are... | Use this skill | Focus |
| --- | --- | --- |
| Changing infrastructure or deployment configuration | `infrastructure` | IaC, environments, permissions, and deployment checks |
| Restructuring modules or improving code organization | `code-organization` | Boundaries, dependencies, naming, and maintainability |
| Designing or reviewing a feature | `design-principles` | Simplicity, consistency, accessibility, and trade-offs |

The index can be referenced from `AGENTS.md` without copying the full skill instructions into it:

```md
## Available skills

Use the skill index at `.ai/skills/index.md` to select the right playbook.

- Infrastructure or deployment changes: `.ai/skills/infrastructure/SKILL.md`
- Code organization and module boundaries: `.ai/skills/code-organization/SKILL.md`
- Feature design and design principles: `.ai/skills/design-principles/SKILL.md`

Load only the skill relevant to the current task, then follow its verification steps.
```

## A SMART way to introduce both

“We should use AI more effectively” is a good ambition, but it is not a plan. A SMART goal makes the experiment concrete:

> Over the next four weeks, create one `AGENTS.md` file and two reusable skills for the repository, use them on at least ten development tasks, and review the results using build success, test coverage, rework, and developer feedback.

That goal is:

- **Specific:** one instruction file and two skills;
- **Measurable:** ten tasks and defined signals;
- **Achievable:** small enough for a team to maintain;
- **Relevant:** focused on consistency and delivery quality;
- **Time-bound:** completed and reviewed in four weeks.

Start with the tasks that happen often and cause avoidable rework. Do not try to document the entire organization on day one. A useful first pair might be a code-review skill and a test-writing skill.

During the experiment, record a small amount of evidence. Did the assistant discover the right commands? Did it make fewer convention mistakes? Did reviewers spend less time correcting predictable issues? Did the instructions create friction or speed up onboarding?

## Using this with any coding agent

The exact instruction-file support depends on the agent, editor, and repository setup. Check the documentation for the tool you use, especially its supported file names, skill format, and instruction precedence. The practice remains portable: keep durable repository guidance in version control, use skills for repeatable workflows, and make the current request about the change at hand.

A practical request might look like this:

> Add the endpoint described in issue #42. Follow the repository instructions, use the API implementation skill, add tests for the success and validation paths, and report the commands you ran and any remaining risks.

Notice what is absent: a long explanation of the project’s architecture. That context is now available where the agent can use it—and where the team can review it. Switching from Copilot to Claude, ChatGPT, or another tool should change the interface, not force the team to recreate its engineering knowledge from scratch.

## Guardrails still matter

Skills and `AGENTS.md` improve consistency; they do not replace engineering judgment. Treat generated changes like changes from a new teammate. Review the diff, run the checks, inspect security-sensitive behavior, and avoid giving an agent more access than the task requires.

Also review the instructions themselves. An outdated rule can be worse than no rule because it makes incorrect behavior look intentional. Assign ownership, revisit the files when the build or architecture changes, and remove guidance that no longer earns its place.

## The real benefit

The goal is not to make developers write more prompts. It is to make good context reusable.

`AGENTS.md` captures the local contract. Skills capture repeatable methods. A resources directory keeps supporting examples close without bloating the instructions. A skill index helps agents find the right method. SMART goals give the team a way to test whether the practice is actually helping. With those pieces, any coding agent can work closer to the team’s standards while developers spend more time on decisions that require experience, judgment, and creativity.

Start small, measure honestly, and improve the instructions as part of the codebase—not as a forgotten document beside it.

## Supporting documentation

There is not yet a universal standard for a skill index. The index shown above is a lightweight convention: a discoverability layer that helps people and agents choose between skills without duplicating their content. The broader pattern—persistent instructions for repository context, separate skills for task-specific workflows, and supporting resources alongside a skill—is documented in these references:

- [AGENTS.md](https://agents.md/): the open format and community guidance for repository-level instructions shared across coding agents.
- [GitHub Copilot: Choosing between custom instructions, AGENTS.md, and skills](https://docs.github.com/en/copilot/concepts/agents/code-review#choosing-between-custom-instructions-agentsmd-and-skills): a practical comparison of always-on repository guidance and task-specific skills.
- [GitHub Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet): an overview of custom instructions, skills, agents, and the folders where they can live.
- [Adding custom instructions for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions): details on instruction discovery, repository context, and referencing other files.
