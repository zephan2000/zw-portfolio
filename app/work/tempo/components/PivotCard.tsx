import type { PivotData } from "../data";

export default function PivotCard({ before, after }: PivotData) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5">
      <div>
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-red-50 text-red-700 mb-2">
          BEFORE
        </span>
        <h4 className="text-sm font-semibold text-foreground mb-1">
          {before.label}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {before.description}
        </p>
      </div>

      <div className="border-t border-border" />

      <div>
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-green-50 text-green-700 mb-2">
          AFTER
        </span>
        <h4 className="text-sm font-semibold text-foreground mb-1">
          {after.label}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {after.description}
        </p>
      </div>
    </div>
  );
}
