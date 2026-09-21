---
title: "The day I learned that retries are an architectural decision"
description: "Why adding a retry policy is not enough to make a service resilient, and what I now consider before retrying a failed request."
date: 2026-08-05
tags: ["development", "c#", "cloud", "reliability"]
draft: false
featured: true
---

Let's be honest, retries sound like an easy win.

A request fails, we wait a little bit, try again and hopefully it works the second time. The user never notices the problem and everybody is happy. At least, that was how I looked at retry policies when I first started using them in C# services.

Some years ago I even wrote about their benefits: better reliability, more availability and less manual intervention. All of that is still true, but it is only half of the story.

The other half is that every retry creates more work for a system that may already be having a bad day.

## Situation: the retry policy looked simple

Applications running in the cloud depend on many things we don't control. Networks have interruptions, databases get busy and APIs sometimes take longer than expected. We need to accept that failures will happen.

Adding a retry policy felt like the natural solution. If the problem was temporary, another attempt could be enough to recover.

But what if the problem was not temporary? What if the database was overloaded or the downstream service was completely unavailable?

In that case, one request could become three requests. Now imagine that happening across multiple instances of the same application. Instead of helping the dependency recover, we could be sending even more traffic to it.

The code was trying to be resilient, but it could make the original problem worse.

## Task: recover without creating another problem

That changed the goal for me. It was no longer just about retrying a failed operation. I needed to give temporary failures a chance to recover without putting the rest of the system at risk.

This brought up questions I had not considered at first:

- Which failures should we retry?
- Is the operation safe to execute more than once?
- How long is the user willing to wait?
- What happens when every application instance retries at the same time?
- Can we tell when retries are hiding a bigger issue?

Once I started asking those questions, the retry policy stopped looking like a small piece of error-handling code. It became an architectural decision.

## Action: make retries part of a bigger strategy

The first lesson was simple: don't retry everything.

Invalid input, authentication errors and missing resources will not magically succeed on the next attempt. Retrying them only wastes time and resources. A retry should be limited to errors that have a realistic chance of being temporary.

The second lesson was to always set limits. A policy needs a maximum number of attempts and an overall timeout. Without those limits, a request can stay alive for too long and consume connections, memory and processing capacity.

Backoff is also important. Instead of retrying immediately, the application waits longer between attempts. Adding some randomness, usually called jitter, helps prevent all instances from trying again at exactly the same time.

Then comes the circuit breaker. If a dependency keeps failing, there is no reason to continue hitting it with more requests. Opening the circuit allows the application to fail fast for a period of time and gives the dependency some space to recover.

Another detail that is easy to miss is idempotency. Reading the same record twice is normally fine. Charging a credit card, creating an order or sending a message twice is a very different story. If an operation has side effects, we need a way to prevent duplicates before we enable retries.

Finally, we need visibility. If a request succeeds after three attempts, a basic dashboard may show it as a success. But those extra attempts could be the first sign that something is going wrong.

I want to know how often retries happen, why they happen, which dependency is involved and how much time they add to the request. Otherwise, the policy may hide the exact problem we need to investigate.

## Result: I changed how I think about reliability

The main result was not finding the perfect retry count. I don't think that number exists for every application.

The real result was changing the questions I ask when I see a retry policy in a service. Now I look for these things:

1. Is the operation safe to repeat?
2. Are we retrying only temporary failures?
3. Do we use backoff and jitter?
4. Is there a timeout for the complete operation?
5. Does a circuit breaker protect the failing dependency?
6. Can our telemetry tell us if the retries are actually helping?

A service is not reliable because it keeps trying forever. It is reliable when it knows what can be retried, how much time it can spend and when it needs to stop.

Sometimes the right decision is to retry. Other times it is better to fail fast, queue the work or ask the caller to try again later. The important part is that we make that decision on purpose.

Retries are useful, no doubt about that. We just need to remember that they affect much more than the line of code where we configure them.

