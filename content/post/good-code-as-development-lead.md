---
title: "Becoming a Development Lead changed how I define good code"
description: "What moving from individual contributor to Development Lead taught me about maintainability, feedback, team decisions, and engineering impact."
date: 2026-08-05
tags: ["development", "leadership", "career", "software-engineering"]
draft: false
featured: true
---

For a long time, I measured my growth as a software developer through the code I could produce.

Could I solve a difficult problem? Could I learn a framework quickly? Could I deliver a feature without needing much help? Those questions mattered, and they helped me become a stronger individual contributor.

Then I became a Development Lead, and my definition of good engineering began to change.

The code still mattered. But my impact could no longer be limited to the code I personally wrote. I had to think about whether the team understood a decision, whether another developer could safely maintain the solution, and whether our way of working helped people deliver consistently.

## Situation: the same technical skills, a different responsibility

I joined Verra Mobility in January 2021 and was promoted to Development Lead later that year. The transition was exciting, but it also exposed a gap in how I thought about my role.

As an individual contributor, completing my assigned work could be a reasonable definition of success. As a lead, finishing my own tasks while the rest of the team was blocked, uncertain, or accumulating avoidable complexity was not enough.

I had to change how I interacted with teammates and how I evaluated technical work. A clever implementation that only one person understood was no longer automatically a good implementation. A pull request that worked but created confusion for the next developer carried a cost that would eventually be paid by the team.

## Task: improve the team's ability to make good decisions

My task was not to become the person with every answer. It was to help create an environment in which the team could reach good answers together.

That meant balancing responsibilities that sometimes appeared to compete:

- deliver software without sacrificing maintainability;
- give direction without removing ownership;
- review code thoroughly without becoming a bottleneck;
- support learning while still meeting commitments;
- make decisions while remaining open to being wrong.

The hardest part was accepting that leadership is less visible than writing the final piece of code. Often, the best contribution is a question, a clear constraint, timely feedback, or the decision to let someone else lead the solution.

## Action: optimize for clarity, feedback, and shared ownership

I started applying a principle I had learned as a developer: write code as if someone else will maintain it. As a lead, I expanded it:

> Build the team's practices as if someone else will need to make the next decision without you.

That changed several everyday behaviors.

### I treated readability as an operational concern

Readable code is not simply a style preference. It reduces the time needed to understand a system during a change or an incident. Clear names, focused responsibilities, useful tests, and straightforward control flow help the next developer act with confidence.

This also made me more skeptical of unnecessary cleverness. The most sophisticated solution is not always the one with the most abstractions. Often, it is the solution whose tradeoffs are easiest to explain and whose behavior is easiest to verify.

### I used code reviews to share context

A review should improve both the change and the team's shared understanding. Instead of treating every comment as a command, I learned to explain why something concerned me and to distinguish between a defect, a design question, and a personal preference.

That creates room for a real technical conversation. It also helps the author carry the reasoning into future work instead of merely applying a correction once.

### I asked for feedback, not only gave it

Becoming a lead did not eliminate my blind spots. It made them more consequential.

Asking teammates for feedback helped me understand when I was providing useful direction and when I was creating noise or taking too much ownership. Leadership requires enough confidence to make a decision and enough humility to revise it when new information appears.

### I made learning part of delivery

Technology constantly changes, but learning cannot depend entirely on personal time. Pairing on unfamiliar work, discussing alternatives during reviews, documenting important decisions, and allowing developers to own meaningful problems turn delivery into a learning system.

This does not mean avoiding mistakes. It means creating feedback loops that make mistakes smaller, visible, and useful.

### I focused on outcomes instead of personal output

A lead can write a large amount of code and still leave the team dependent on them. That may look productive in the short term, but it creates a bottleneck.

I began thinking more about questions such as:

- Can the team move forward when I am unavailable?
- Do people understand why we chose this design?
- Are risks and tradeoffs visible early?
- Is knowledge distributed or concentrated?
- Does our process make the next change easier?

Those signals reveal more about engineering health than my personal commit count.

## Result: my impact became less individual and more durable

The result was a change in how I recognized valuable work.

Good code was no longer only code that passed tests, performed well, or followed a pattern. It was code the team could understand, operate, challenge, and improve. Good leadership was not having the final word. It was helping the team develop the context and confidence to make sound decisions.

This shift also made me a better developer. Explaining tradeoffs forced me to examine my own assumptions. Reviewing another person's approach exposed me to solutions I would not have chosen. Delegating meaningful work revealed where documentation and architecture were unclear.

Most importantly, I learned that the durable output of a lead is not a collection of personal solutions. It is a team that can keep solving problems.

## What I would tell a new technical lead

If you are moving into technical leadership, do not abandon coding or technical depth. Change the purpose they serve.

Use your experience to make constraints visible, help others evaluate tradeoffs, and protect the long-term health of the system. Measure your contribution not only by what you finish, but by how much clarity and capability remain after the work is done.

The transition from developer to lead is not a move away from software engineering. It is an expansion of it—from designing code to designing the conditions in which good code can be created by an entire team.

