const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-base-border py-16 px-6 text-center">
    {Icon && (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
        <Icon className="h-6 w-6 text-ink-faint" />
      </div>
    )}
    <h3 className="font-display text-lg text-ink">{title}</h3>
    {description && <p className="max-w-sm text-sm text-ink-muted">{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
