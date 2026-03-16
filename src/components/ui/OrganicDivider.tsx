interface OrganicDividerProps {
  type: 'wave' | 'curve' | 'cliff';
  className?: string;
  flip?: boolean;
}

export default function OrganicDivider({ type, className = "", flip = false }: OrganicDividerProps) {
  const baseClass = `organic-divider ${className} ${flip ? 'rotate-180' : ''}`;

  if (type === 'wave') {
    return (
      <svg className={baseClass} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64L48,80C96,96,192,128,288,128.3C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
      </svg>
    );
  }

  if (type === 'curve') {
    return (
      <svg className={baseClass} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
      </svg>
    );
  }

  return (
    <svg className={baseClass} viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,120 L1440,0 L1440,120 Z" />
    </svg>
  );
}
