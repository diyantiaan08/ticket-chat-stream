import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Chat Room" },
  { to: "/tiket", label: "Tiket" },
  { to: "/handover", label: "Handover" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

function RailIcon({ path }: { path: ReactNode }) {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}

const railIcons: Record<string, ReactNode> = {
  "/": <path d="M4 5h12v8H8l-4 4z" />,
  "/tiket": (
    <>
      <path d="M4 7h12v6H4z" />
      <path d="M4 9.5h2M14 9.5h2" />
    </>
  ),
  "/handover": <path d="M12 5l-4 4 4 4M5 9h6" />,
  "/dashboard": <path d="M4 12V4M10 12V7M16 12V9" />,
};

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground antialiased">
      <div className="pointer-events-none absolute -top-24 -left-16 size-[380px] rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[420px] rounded-full bg-primary/25 blur-3xl" />
      <div className="relative flex h-screen w-full">
        <aside className="flex w-14 shrink-0 flex-col items-center gap-2 border-r border-border glass py-4">
          <div className="mb-3 grid size-8 place-items-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            N
          </div>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              className="grid size-8 place-items-center rounded-lg text-foreground/50 transition-colors hover:bg-foreground/5"
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              <RailIcon path={railIcons[item.to]} />
            </Link>
          ))}
          <div className="mt-auto grid size-8 place-items-center rounded-full bg-muted text-xs font-medium text-foreground/60">
            RA
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border glass px-6">
            <div className="text-sm font-semibold tracking-tight">Nimbus</div>
            <nav className="flex items-center gap-1 text-sm">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-md px-3 py-1.5 text-foreground/55 transition-colors hover:bg-foreground/5"
                  activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full bg-card/55 px-3 py-1.5 text-xs text-foreground/50 ring-1 ring-border sm:flex">
                <span className="size-1.5 rounded-full bg-accent" /> Online · 6 agen
              </div>
              <button className="text-xs font-medium text-foreground/60 transition-colors hover:text-foreground">
                Keluar
              </button>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
