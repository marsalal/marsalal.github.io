---
title: "The day I learned that retries are an architectural decision"
description: "A personal look at why retrying a failed request requires limits, context, observability, and a plan for protecting the rest of the system."
date: 2026-08-05
tags: ["development", "c#", "cloud", "reliability"]
draft: false
featured: true
---

Retries look harmless.

A request fails, the application waits, and then it tries again. If the next attempt succeeds, the user may never know that anything went wrong. That makes retry policies one of the first techniques many developers—myself included—reach for when making a service more resilient.

But a retry is not just an error-handling detail. It changes the number of requests a system sends, how long work remains active, and how failures move through the services that depend on one another. In other words, it changes the architecture.

I understood that more clearly after revisiting how I thought about retry policies in C# services. My first mental model was simple: transient failures happen, so retry the operation a few times. That model was useful, but incomplete.

## Situation: transient failures were only part of the story

Cloud applications depend on networks, databases, APIs, queues, and services that will occasionally be slow or unavailable. A temporary network interruption or a busy database can turn an otherwise valid operation into a failure.

The obvious response is to retry. It can improve availability and allow an application to recover without manual intervention.

The problem is that the application cannot assume every failure is temporary. It also cannot assume another attempt is free.

If a downstream service is already overloaded, immediate retries send it even more traffic. One failed request can become three failed requests. Across many application instances, a small incident can become a retry storm. Meanwhile, long retry chains keep connections, memory, and processing capacity occupied.

The same mechanism intended to improve reliability can extend the outage.

## Task: recover without making the failure worse

My goal changed from “make failed operations retry automatically” to something more precise:

> Give genuinely transient failures a controlled opportunity to recover while protecting the application, its dependencies, and its users.

That definition forced me to ask questions that did not appear in the first version of the solution:

- Which errors are actually transient?
- Is the operation safe to repeat?
- How many attempts can fit inside the request's time budget?
- What happens when many application instances retry simultaneously?
- How will we know when retries are hiding a persistent problem?

Those are architectural questions, not configuration details.

## Action: treat retries as one part of a resilience strategy

The first improvement was to stop retrying every exception. Authentication failures, invalid input, and missing resources do not become successful because the application sends the same request again. Retrying those failures only wastes time and capacity.

The second was to bound every retry policy. A maximum number of attempts and an overall timeout prevent work from continuing indefinitely. Exponential backoff creates progressively more space between attempts, while jitter keeps many clients from retrying at exactly the same moment.

The third was to pair retries with a circuit breaker. When a dependency is consistently failing, the circuit opens and calls fail quickly for a period instead of repeatedly placing more load on the unhealthy service. The application gets room to recover, and callers receive a faster, more predictable response.

I also learned to consider idempotency before enabling a retry. Reading the same record twice is usually harmless. Charging a card, creating an order, or publishing a message twice may not be. For operations with side effects, an idempotency key or another deduplication strategy is part of the retry design—not an optional improvement for later.

Finally, retries need observability. A request that succeeds on its third attempt looks successful in a basic availability dashboard, but it may be an early warning that a dependency is degrading. Useful telemetry should distinguish first-attempt success from retry-assisted success and record details such as:

- attempts per operation;
- the reason an attempt was retried;
- time spent waiting between attempts;
- circuit-breaker state changes;
- the dependency and operation involved;
- the final outcome and total latency.

Without that context, resilience mechanisms can mask the evidence engineers need to diagnose a problem.

## Result: a better definition of reliability

The most valuable result was not a particular retry count or library configuration. It was a better way to reason about failure.

A reliable service is not one that keeps trying forever. It is one that knows which failures may recover, gives them a limited opportunity to do so, and stops before it harms the larger system.

That mindset also changes how I review implementations. I no longer ask only, “Does this policy retry three times?” I ask:

1. Is the operation safe to repeat?
2. Are we retrying only failures that may be transient?
3. Do backoff and jitter reduce synchronized load?
4. Is there a timeout for the complete operation?
5. Does a circuit breaker protect the dependency during sustained failure?
6. Can telemetry show when retries are happening and whether they help?

If those questions do not have good answers, adding a retry may create the appearance of resilience without providing it.

## The lesson I carry forward

Failure is normal in distributed systems. Our response to it should be intentional.

Retries can absolutely improve reliability, but only when they respect the limits of the system around them. The safest way to introduce them is to begin with the operation's semantics and failure modes, not with a convenient default copied from another service.

Sometimes the correct decision is to retry. Sometimes it is to fail fast, use a fallback, queue the work, or ask the caller to try again later. Engineering judgment lies in knowing the difference.

