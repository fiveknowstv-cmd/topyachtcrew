export function TrustBar() {
  const stats = [
    { number: '2,400+', label: 'Verified Crew' },
    { number: '180+', label: 'Superyachts' },
    { number: '94%', label: 'Placement Rate' },
    { number: '4.9', label: 'Average Rating' },
  ];

  return (
    <div className="border-b border-[var(--border-subtle)] bg-[var(--navy-elevated)] py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <div className="font-display text-4xl font-semibold tracking-tighter text-[var(--gold)]">
              {stat.number}
            </div>
            <div className="text-sm tracking-wide text-[var(--text-muted)] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
