import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { tickets, type Ticket } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/tiket")({
  head: () => ({
    meta: [
      { title: "Ticketing Helpdesk — Nimbus Support Console" },
      {
        name: "description",
        content:
          "Daftar tiket helpdesk hasil eskalasi dari chat room, lengkap dengan status, prioritas, dan sisa SLA.",
      },
      { property: "og:title", content: "Ticketing Helpdesk — Nimbus Support Console" },
      {
        property: "og:description",
        content: "Kelola tiket eskalasi helpdesk beserta status, prioritas, dan SLA.",
      },
    ],
  }),
  component: TicketPage,
});

const filters = ["Semua", "Dibuka", "Diproses", "Menunggu", "Selesai"] as const;

function statusClass(status: Ticket["status"]) {
  if (status === "Selesai") return "bg-muted text-foreground/55";
  if (status === "Diproses") return "bg-accent/15 text-accent";
  if (status === "Menunggu") return "bg-primary/10 text-primary";
  return "bg-primary/15 text-primary";
}

function TicketPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const list = tickets.filter((t) => filter === "Semua" || t.status === filter);

  return (
    <AppShell>
      <main className="min-h-0 flex-1 overflow-y-auto p-3">
        <section className="rounded-2xl glass p-5 ring-1 ring-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-pretty">Ticketing Helpdesk</h1>
              <p className="text-xs text-foreground/50">
                Tiket yang dibuat saat pelanggan minta eskalasi dari chat room
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-muted p-1 text-xs">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 py-1.5 transition-colors ${
                    filter === f
                      ? "bg-card font-medium text-primary ring-1 ring-border"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl bg-card/50 ring-1 ring-border">
            <table className="w-full text-left text-xs">
              <thead className="text-foreground/45">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-medium">Tiket</th>
                  <th className="px-4 py-3 font-medium">Pelanggan</th>
                  <th className="px-4 py-3 font-medium">Kanal</th>
                  <th className="px-4 py-3 font-medium">Petugas</th>
                  <th className="px-4 py-3 font-medium">Prioritas</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">SLA</th>
                  <th className="px-4 py-3 font-medium">Dibuat</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {list.map((t) => (
                  <tr
                    key={t.code}
                    className="border-b border-border last:border-0 transition-colors hover:bg-foreground/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold">{t.code}</div>
                      <div className="text-foreground/50">{t.subject}</div>
                    </td>
                    <td className="px-4 py-3">{t.customer}</td>
                    <td className="px-4 py-3 text-foreground/60">{t.channel}</td>
                    <td className="px-4 py-3">{t.agent}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          t.priority === "Tinggi"
                            ? "font-medium text-accent"
                            : "text-foreground/60"
                        }
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2 py-0.5 text-[11px] font-medium ${statusClass(t.status)}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground/60">{t.sla}</td>
                    <td className="px-4 py-3 text-foreground/50">{t.created}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          toast.success(`${t.code} dikembalikan ke Chat Room`, {
                            description: `${t.customer} akan dilanjutkan oleh agen chat.`,
                          })
                        }
                        className="rounded-lg px-2.5 py-1.5 font-medium text-primary ring-1 ring-primary/30 transition-colors hover:bg-primary/10"
                      >
                        Handover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
