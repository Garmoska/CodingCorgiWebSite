# Troubleshooting

Date: 14-Sep-2026

## Text

Let’s talk about troubleshooting.

When trouble happens, an engineer picks up their tools (sometimes including a shamanic drum) and embarks on a journey to the Upper World, to the cloud infrastructure, and to the Lower World, where the source code, cron jobs, and other low-level OS settings live.

If we are dealing with a web application, the Developer Console in the browser is our tool of choice. No matter how complex the backend is, eventually it has to interact with the browser and obey its laws. That’s where we catch it.

It is easiest to debug JS in separate files, not embedded in the page. We can modify the HTML, put temporary values in it, and see what happens. Breakpoints are our friends too.

And if we use AI, we can build a diagram of how the browser client and server interact, create a mockup, and use it to understand the system.

If we have Tomcat, it is worth switching the logging level to INFO in the configuration. Even if you don’t have the source code, the developers may have left logging in place, and you can see it.

Again, use AI together with JAR files to connect an event to the relevant parts of the code. AI is quite good at understanding bytecode, even without decompilation.

If we have the source code, things get even easier, because on top of standard tools like breakpoints and logging, we can use AI to understand the logic on the fly and create auxiliary tests.

If the project contains third-party JAR files, especially if they are obfuscated, we can use them as “black boxes.”

Actually, I should probably write a separate article about decompilation & deobfuscation.

By the way, if I am dealing with .NET and have third-party libraries, JetBrains dotPeek allows me to run a virtual server in memory, load those libraries into it, and debug them from Visual Studio.

When an application hangs, we can use profiling and examine thread and heap dumps.

Quite often, especially in a large team, an error appears out of nowhere. It turns out that someone broke something and committed it some time ago, and the tests simply didn’t cover it.

This is where Git bisect is very useful, combined with automation or AI, to find the problematic commit.

The hardest part is troubleshooting SaaS applications that live in the vendor’s infrastructure. The same goes for problems with AWS and similar services.

Usually, they say:

“Everything is working on our side.”

And yet, far from it!

We still have plenty of things in our hands: tcpdump / Wireshark, DNS, TLS handshake, network latency, TCP connections, OS-level process information, filesystem activity, CPU/memory/disk metrics, container logs, Kubernetes events.

It may seem impossible to put all of this together. However, this is where AI can help: it can bring all these pieces together and identify possible directions for investigation.

In the end, as in the old days, solving problems requires skills, a deep understanding of how computers and networks work in general, and, of course, plenty of experience.
