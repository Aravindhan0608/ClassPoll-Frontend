const StatCard = ({ icon: Icon, label, value, accent = 'brand' }) => {
  const accentClass = {
    brand: 'bg-brand-500/15 text-brand-300',
    pulse: 'bg-pulse-500/15 text-pulse-400',
    amber: 'bg-amber-500/15 text-amber-400',
  }[accent];

  return (
    <div className="glass-card flex items-center gap-4 p-5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accentClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-2xl text-ink">{value}</p>
        <p className="text-sm text-ink-muted">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
