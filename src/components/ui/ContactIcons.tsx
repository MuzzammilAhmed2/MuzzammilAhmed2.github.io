import { site } from "@/data/content";

const icons = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.55 4.77 5.86V21h-4v-5.1c0-1.22-.02-2.78-1.74-2.78-1.74 0-2 1.33-2 2.7V21h-4z" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  ),
  email: <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.4 2L12 12.2 19.6 7zM4 8.6V17h16V8.6l-8 5.4z" />,
};

const links = [
  { key: "linkedin" as const, label: "LinkedIn", href: site.linkedin, external: true },
  { key: "github" as const, label: "GitHub", href: site.github, external: true },
  { key: "email" as const, label: `Email ${site.email}`, href: `mailto:${site.email}`, external: false },
];

/** Small icon row: LinkedIn, GitHub, email. */
export default function ContactIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Contact links">
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            aria-label={l.label}
            title={l.label}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              {icons[l.key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
