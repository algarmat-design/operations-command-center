interface Node {
  label: string;
  count: string;
  health: "healthy" | "watch" | "breach";
  note: string;
}

const healthColor: Record<Node["health"], string> = {
  healthy: "border-emerald-500/40 text-emerald-300",
  watch: "border-amber-500/40 text-amber-300",
  breach: "border-rose-500/40 text-rose-300",
};

const healthDot: Record<Node["health"], string> = {
  healthy: "bg-emerald-400",
  watch: "bg-amber-400",
  breach: "bg-rose-400",
};

export function WorkflowDiagram({ nodes }: { nodes: Node[] }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {nodes.map((n, i) => (
          <div
            key={n.label}
            className={`relative rounded-2xl border bg-[var(--surface-2)] p-4 ${healthColor[n.health]}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${healthDot[n.health]}`} />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Stage {i + 1}
              </span>
            </div>
            <p className="text-lg font-semibold text-white">{n.label}</p>
            <p className="mt-1 text-2xl font-bold">{n.count}</p>
            <p className="mt-2 text-xs text-slate-400">{n.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
