import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { conversations, type Message } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chat Room — Nimbus Support Console" },
      {
        name: "description",
        content:
          "Ruang obrolan langsung untuk agen: balas pelanggan, lihat konteks, dan eskalasi ke helpdesk dalam satu layar.",
      },
      { property: "og:title", content: "Chat Room — Nimbus Support Console" },
      {
        property: "og:description",
        content: "Balas pelanggan dan eskalasi ke helpdesk dalam satu layar.",
      },
    ],
  }),
  component: ChatRoomPage,
});

function ChatRoomPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<string, Message[]>>({});

  const active = conversations.find((c) => c.id === activeId)!;
  const list = useMemo(
    () =>
      conversations.filter((c) =>
        (c.name + c.topic).toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  const messages = [...active.messages, ...(extra[active.id] ?? [])];

  function send() {
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setExtra((prev) => ({
      ...prev,
      [active.id]: [
        ...(prev[active.id] ?? []),
        { id: crypto.randomUUID(), from: "agent", text, time },
      ],
    }));
    setDraft("");
  }

  return (
    <AppShell>
      <main className="flex min-h-0 flex-1 gap-3 p-3">
        {/* Daftar percakapan */}
        <section className="flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl glass ring-1 ring-border">
          <div className="px-4 pt-4 pb-2">
            <h1 className="text-sm font-semibold text-pretty">Percakapan</h1>
            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1.5 text-xs">
              <svg
                className="size-4 shrink-0 text-foreground/40"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              >
                <circle cx="9" cy="9" r="5" />
                <path d="M13 13l3 3" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari pelanggan…"
                className="w-full bg-transparent placeholder:text-foreground/40 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-2">
            {list.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isActive ? "bg-primary/10 ring-1 ring-primary/20" : "hover:bg-foreground/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="size-8 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold">{c.name}</div>
                      <div className="truncate text-[11px] text-foreground/45">{c.topic}</div>
                    </div>
                    <span className="ml-auto text-[11px] text-foreground/40">{c.time}</span>
                  </div>
                  {isActive && (
                    <p className="mt-2 line-clamp-2 text-[11px] text-foreground/60">{c.preview}</p>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Percakapan aktif */}
        <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl glass ring-1 ring-border">
          <div className="flex items-center gap-3 border-b border-border px-5 py-3">
            <div className="text-sm font-semibold text-pretty">{active.name}</div>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
              {active.status}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => toast("Catatan internal disimpan")}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/60 ring-1 ring-border transition-colors hover:bg-foreground/5"
              >
                Catat
              </button>
              <button
                onClick={() =>
                  toast.success(`Percakapan ${active.name} dieskalasi ke Helpdesk`, {
                    description: `Tiket ${active.ticket.code} diteruskan ke antrean helpdesk.`,
                  })
                }
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <svg
                  className="size-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 4v9M6 9l4 4 4-4M5 16h10" />
                </svg>
                Eskalasi ke Helpdesk
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 text-sm">
            {messages.map((m) =>
              m.from === "customer" ? (
                <div key={m.id} className="flex gap-2.5">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="max-w-[70%]">
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2 text-pretty">
                      {m.text}
                    </div>
                    <div className="mt-1 text-[11px] text-foreground/40">{m.time}</div>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex flex-row-reverse gap-2.5">
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
                    RA
                  </div>
                  <div className="ml-auto max-w-[70%]">
                    <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-3.5 py-2 text-pretty">
                      {m.text}
                    </div>
                    <div className="mt-1 text-right text-[11px] text-foreground/40">{m.time}</div>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="border-t border-border px-5 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 ring-1 ring-border"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
                placeholder="Tulis balasan…"
              />
              <button
                type="submit"
                aria-label="Kirim"
                className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <svg
                  className="size-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10l12-6-4 12-3-4z" />
                </svg>
              </button>
            </form>
          </div>
        </section>

        {/* Konteks pelanggan */}
        <section className="flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl glass ring-1 ring-border">
          <div className="border-b border-border px-4 py-3">
            <div className="text-sm font-semibold text-pretty">Konteks Pelanggan</div>
          </div>
          <div className="space-y-4 overflow-y-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <img
                src={active.avatar}
                alt={active.name}
                loading="lazy"
                width={512}
                height={512}
                className="size-12 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{active.name}</div>
                <div className="truncate text-xs text-foreground/50">{active.email}</div>
              </div>
            </div>

            <div className="rounded-xl bg-card/50 p-3 ring-1 ring-border">
              <div className="text-[11px] uppercase tracking-wide text-foreground/40">
                Tiket Terkait
              </div>
              <div className="mt-1.5 text-sm font-medium">
                {active.ticket.code} · {active.ticket.title}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <div className="text-[11px] text-foreground/45">Status</div>
                  <div className="mt-0.5 font-medium">{active.ticket.status}</div>
                </div>
                <div className="rounded-lg bg-muted px-2.5 py-2">
                  <div className="text-[11px] text-foreground/45">Prioritas</div>
                  <div className="mt-0.5 font-medium text-accent">{active.ticket.priority}</div>
                </div>
              </div>
              <div className="mt-2 rounded-lg bg-accent/10 px-2.5 py-2 text-xs">
                <span className="text-foreground/45">SLA: </span>
                <span className="font-medium text-accent">{active.ticket.sla}</span>
              </div>
              <button
                onClick={() =>
                  toast.success("Dikembalikan ke Chat Room", {
                    description: `${active.ticket.code} kini ditangani agen chat.`,
                  })
                }
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-primary ring-1 ring-primary/30 transition-colors hover:bg-primary/10"
              >
                <svg
                  className="size-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5l-4 4 4 4M5 9h6" />
                </svg>
                Handover ke Chat Room
              </button>
            </div>

            <div className="rounded-xl bg-card/50 p-3 ring-1 ring-border">
              <div className="text-[11px] uppercase tracking-wide text-foreground/40">Riwayat</div>
              <ul className="mt-2 space-y-2 text-xs">
                {active.history.map((h) => (
                  <li key={h.label} className="flex gap-2">
                    <span
                      className={`mt-1 size-1.5 shrink-0 rounded-full ${
                        h.tone === "brand"
                          ? "bg-primary"
                          : h.tone === "accent"
                            ? "bg-accent"
                            : "bg-foreground/30"
                      }`}
                    />
                    {h.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-muted px-2.5 py-2">
                <div className="text-[11px] text-foreground/45">Agen</div>
                <div className="mt-0.5 font-medium">{active.ticket.agent}</div>
              </div>
              <div className="rounded-lg bg-muted px-2.5 py-2">
                <div className="text-[11px] text-foreground/45">Bidang</div>
                <div className="mt-0.5 font-medium">{active.ticket.field}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
