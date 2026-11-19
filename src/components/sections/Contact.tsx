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
      <div aria-hidden className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.18),rgb(var(--accent-2-rgb)/0.08)_40%,transparent_62%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="flex flex-col items-center text-center">
          <SectionLabel index="08">Contact</SectionLabel>
          <RevealText
            as="h2"
            accent="something"
            className="font-display text-[clamp(2.8rem,8.5vw,8rem)] font-medium leading-[0.92] tracking-[-0.045em] text-balance"
          >
            Let&apos;s build something.
          </RevealText>
          <span id="contact-title" className="sr-only">Contact Muzzammil</span>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-[1.6] text-muted md:text-xl">
            Hiring for a data or BI role, or need a data platform, Power BI dashboards or an AI document solution? Send a message and I&apos;ll get back to you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 btn-glow rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink">
                Email me <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 transition-colors hover:border-text">
                LinkedIn <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            {site.cv && (
              <Magnetic>
                <a href={site.cv} download className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 transition-colors hover:border-text">
                  Download CV <span aria-hidden>↓</span>
                </a>
              </Magnetic>
            )}
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] p-px shadow-[0_0_80px_-20px_rgb(var(--accent-rgb)/0.5),0_40px_120px_-40px_rgb(var(--accent-2-rgb)/0.45)] md:mt-20">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2">
            <div className="spin-slow h-full w-full rounded-full bg-[conic-gradient(from_0deg,rgb(var(--accent-2-rgb)),rgb(var(--accent-rgb)),rgb(var(--accent-3-rgb)),transparent_55%,transparent_70%,rgb(var(--accent-2-rgb)))]" />
          </div>
        <div className="relative grid gap-12 rounded-[calc(2rem-1px)] bg-surface p-6 sm:p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-6">
            <div>
              <p className="mb-2 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">Email</p>
              <a href={`mailto:${site.email}`} className="font-display text-lg text-text underline decoration-line underline-offset-8 transition-colors [overflow-wrap:anywhere] hover:text-accent hover:decoration-accent md:text-xl">
                {site.email}
              </a>
            </div>
            <div>
              <p className="mb-2 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">Elsewhere</p>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-lg text-text underline decoration-line underline-offset-8 hover:text-accent">
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>
            <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-muted">Based in {site.location}</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
            <fieldset>
              <legend className="mb-4 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">I&apos;m reaching out about</legend>
              <div className="flex flex-wrap gap-2">
                {["Freelance project", "Full-time role", "Something else"].map((k) => (
                  <label key={k} className={`cursor-pointer rounded-full border px-4 py-2 text-base transition-colors ${kind === k ? "border-accent bg-accent text-accent-ink" : "border-line text-text hover:border-text"}`}>
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
                  className="inline-flex items-center gap-3 btn-glow rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden>→</span>
                </button>
              </Magnetic>
              <p role="status" aria-live="polite" className="text-base">
                {status === "sent" && <span className="text-accent">Thanks — your message is in. I&apos;ll get back to you soon.</span>}
                {status === "error" && (
                  <span className="text-[color:var(--danger)]">
                    Something went wrong. Please email me directly at {site.email}.
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}
