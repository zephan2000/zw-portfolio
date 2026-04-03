export default function ZoneLabel({ text }: { text: string }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-2">
      {text}
    </p>
  );
}
