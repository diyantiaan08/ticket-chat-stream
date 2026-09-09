import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { agentPerformance, hourlyVolume } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Performa — Nimbus Support Console" },
      {
        name: "description",
        content:
          "Ringkasan performa agen dan helpdesk: waktu respons, tingkat resolusi, volume tiket, dan agen aktif.",
      },
      { property: "og:title", content: "Dashboard Performa — Nimbus Support Console" },
      {
        property: "og:description",
        content: "Pantau waktu respons, resolusi, dan volume tiket agen serta helpdesk.",
      },
    ],
  }),
  component: DashboardPage,
});

const metrics = [
  { label: "Waktu Respons", value: "2m 14s", delta: "▼ 12% vs kemarin", tone: "accent" },
  { label: "Tingkat Resolusi", value: "92%", delta: "▲ 2% vs kemarin", tone: "accent" },
  { label: "Volume Tiket", value: "148", delta: "▲ 6% vs kemarin", tone: "primary" },
  { label: "Agen Aktif", value: "6", delta: "Dari 9 terdaftar", tone: "muted" },
];

function DashboardPage() {
  return (
    <AppShell>
      <main className="min-h-0 flex-1 overflow-y-auto p-3">
        <section className="rounded-2xl glass p-5 ring-1 ring-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-pretty">Dashboard Performa</h1>
              <p className="text-xs text-foreground/50">Ringkasan agen &amp; helpdesk hari ini</p>
            </div>
            <div className="text-xs text-foreground/45">Diperbarui 09:40</div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl bg-card/50 p-3 ring-1 ring-border">
                <div className="text-[11px] text-foreground/45">{m.label}</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">{m.value}</div>
                <div
                  className={`mt-1 text-[11px] ${
                    m.tone === "accent"
                      ? "text-accent"
                      : m.tone === "primary"
                        ? "text-primary/70"
                        : "text-foreground/45"
                  }`}
                >
                  {m.delta}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-xl bg-card/50 p-4 ring-1 ring-border">
              <div className="text-xs font-medium">Volume tiket per jam</div>
              <div className="mt-4 flex h-28 items-end gap-2">
                {hourlyVolume.map((h) => (
                  <div key={h.hour} className="flex flex-1 flex-col items-center justify-end gap-1">
                    <div
                      className="w-full rounded-t bg-primary"
                      style={{ height: `${h.value}%`, opacity: 0.3 + h.value / 160 }}
                    />
                    <span className="text-[10px] text-foreground/40">{h.hour}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-card/50 p-4 ring-1 ring-border">
              <div className="text-xs font-medium">Resolusi per agen</div>
              <div className="mt-4 space-y-3">
                {agentPerformance.map((a) => (
                  <div key={a.name}>
                    <div className="flex justify-between text-[11px] text-foreground/55">
                      <span>
                        {a.name} · {a.role}
                      </span>
                      <span>{a.resolution}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${a.resolution}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl bg-card/50 ring-1 ring-border">
            <table className="w-full text-left text-xs">
              <thead className="text-foreground/45">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Peran</th>
                  <th className="px-4 py-3 font-medium">Percakapan</th>
                  <th className="px-4 py-3 font-medium">Rata-rata respons</th>
                  <th className="px-4 py-3 font-medium">Resolusi</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((a) => (
                  <tr key={a.name} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold">{a.name}</td>
                    <td className="px-4 py-3 text-foreground/60">{a.role}</td>
                    <td className="px-4 py-3">{a.chats}</td>
                    <td className="px-4 py-3">{a.avg}</td>
                    <td className="px-4 py-3 font-medium text-accent">{a.resolution}%</td>
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
