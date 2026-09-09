import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { handovers } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/handover")({
  head: () => ({
    meta: [
      { title: "Handover Helpdesk — Nimbus Support Console" },
      {
        name: "description",
        content:
          "Antrean pengembalian tiket dari helpdesk ke chat room agar pelanggan dilanjutkan oleh agen.",
      },
      { property: "og:title", content: "Handover Helpdesk — Nimbus Support Console" },
      {
        property: "og:description",
        content: "Kembalikan tiket helpdesk yang sudah selesai ke agen chat room.",
      },
    ],
  }),
  component: HandoverPage,
});

function HandoverPage() {
  const [done, setDone] = useState<string[]>([]);

  return (
    <AppShell>
      <main className="min-h-0 flex-1 overflow-y-auto p-3">
        <section className="rounded-2xl glass p-5 ring-1 ring-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-pretty">Handover ke Chat Room</h1>
              <p className="text-xs text-foreground/50">
                Tiket helpdesk yang siap dikembalikan ke agen chat
              </p>
            </div>
            <div className="rounded-full bg-card/55 px-3 py-1.5 text-xs text-foreground/50 ring-1 ring-border">
              {handovers.length - done.length} menunggu
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {handovers.map((h) => {
              const isDone = done.includes(h.code);
              return (
                <article key={h.code} className="rounded-xl bg-card/50 p-4 ring-1 ring-border">
                  <div className="flex items-center gap-3">
                    <img
                      src={h.avatar}
                      alt={h.customer}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{h.customer}</div>
                      <div className="text-[11px] text-foreground/50">
                        {h.code} · {h.category}
                      </div>
                    </div>
                    <span className="ml-auto text-[11px] text-foreground/40">{h.waiting}</span>
                  </div>

                  <p className="mt-3 text-xs text-foreground/60">{h.summary}</p>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="rounded-lg bg-muted px-2.5 py-2">
                      <div className="text-[11px] text-foreground/45">Dari</div>
                      <div className="mt-0.5 font-medium">{h.from}</div>
                    </div>
                    <div className="rounded-lg bg-muted px-2.5 py-2">
                      <div className="text-[11px] text-foreground/45">Ke</div>
                      <div className="mt-0.5 font-medium">{h.to}</div>
                    </div>
                  </div>

                  <button
                    disabled={isDone}
                    onClick={() => {
                      setDone((d) => [...d, h.code]);
                      toast.success(`${h.code} dialihkan ke ${h.to}`);
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-primary ring-1 ring-primary/30 transition-colors hover:bg-primary/10 disabled:text-foreground/40 disabled:ring-border disabled:hover:bg-transparent"
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
                    {isDone ? "Sudah dialihkan" : "Alihkan ke Chat Room"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
