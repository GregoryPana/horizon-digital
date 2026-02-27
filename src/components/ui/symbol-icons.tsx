type IconProps = {
  className?: string;
};

export function BuildIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 19L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M15.5 4.5A3.2 3.2 0 0019.9 8.9L16 12.8A4 4 0 0111.2 13L8.7 15.5a3.2 3.2 0 01-4.4 0 3.2 3.2 0 010-4.4L6.8 8.6A4 4 0 0111 3.8L15.5 4.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DomainIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M12 4C14.4 6.2 15.8 9 15.8 12C15.8 15 14.4 17.8 12 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 4C9.6 6.2 8.2 9 8.2 12C8.2 15 9.6 17.8 12 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HostingIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="5" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="7.5" r="0.9" fill="currentColor" />
      <circle cx="8" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function ScenarioIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6H10V10H6V6z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 6H18V10H14V6z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 10V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 14H15V18H9V14z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
