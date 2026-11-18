"use client";

import { useState } from "react";
import { site } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full border-b border-line bg-transparent pb-3 pt-6 text-lg text-text outline-none transition-colors placeholder:text-transparent focus:border-accent";
const label =
  "pointer-events-none absolute left-0 top-6 origin-left text-lg text-muted transition-transform duration-300 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [kind, setKind] = useState("Freelance project");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // bot

    // No Formspree ID configured yet → fall back to the user's mail app
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`${kind} — from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,230,197,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-40">
        <SectionLabel index="08">Contact</SectionLabel>
        <RevealText
          as="h2"
          by="chars"
          className="font-display text-[clamp(3rem,11vw,10rem)] font-medium leading-[0.88] tracking-[-0.045em]"
        >
          Let&apos;s talk.
        </RevealText>
        <span id="contact-title" className="sr-only">Contact Muzzammil</span>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="space-y-10">
            <p className="max-w-md text-pretty text-xl leading-relaxed text-muted">
              Hiring for a data or BI role, or need a data platform, Power BI dashboards or an AI document solution? Send a message and I&apos;ll get back to you.
            </p>
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="break-all font-display text-2xl text-text underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-3xl">
                  {site.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-text">
                    LinkedIn <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-text">
                    GitHub <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Based in {site.location}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
            <fieldset>
              <legend className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">I&apos;m reaching out about</legend>
              <div className="flex flex-wrap gap-2">
                {["Freelance project", "Full-time role", "Something else"].map((k) => (
                  <label key={k} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${kind === k ? "border-accent bg-accent text-accent-ink" : "border-line text-text hover:border-text"}`}>
                    <input type="radio" name="topic" value={k} checked={kind === k} onChange={() => setKind(k)} className="sr-only" />
                    {k}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required autoComplete="name" placeholder="Name" className={field} />
                <label htmlFor="name" className={label}>Your name</label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
                <label htmlFor="email" className={label}>Email</label>
              </div>
            </div>
            <div className="relative">
              <textarea id="message" name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>What are you working on?</label>
            </div>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="flex flex-wrap items-center gap-6">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden>→</span>
                </button>
              </Magnetic>
              <p role="status" aria-live="polite" className="text-sm">
                {status === "sent" && <span className="text-accent">Thanks — your message is in. I&apos;ll get back to you soon.</span>}
                {status === "error" && (
                  <span className="text-[#ff8a8a]">
                    Something went wrong. Please email me directly at {site.email}.
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
