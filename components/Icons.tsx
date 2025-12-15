
export const AttackIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15.6,12l3.4-3.4c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12.8,9.2l-0.6-0.6l3.4-3.4c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L9.4,5.8L5,10.2V19h8.8L15.6,12z M7,12.6l2.8-2.8l1.4,1.4L8.4,14L7,12.6z" />
  </svg>
);

export const DefenseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1z M12,11.99h7c-0.53,4.12-3.28,7.79-7,8.94V12H5V6.3l7-3.11V11.99z" />
  </svg>
);

export const SpeedIcon = ({ level }: { level: number }) => (
  <div className="flex space-x-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i <= level ? 'bg-white' : 'border border-gray-500 bg-transparent'
        }`}
      />
    ))}
  </div>
);

export const HealthIcon = ({ level }: { level: number }) => (
  <div className="flex space-x-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-sm ${
          i <= level ? 'bg-white' : 'border border-gray-500 bg-transparent'
        }`}
      />
    ))}
  </div>
);

// Role Icons (Abstract SVGs)
export const RoleIcon = ({ type, className }: { type: string, className?: string }) => {
  switch(type) {
    case 'breach':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 12L18 6" />
          <path d="M12 12L6 18" />
          <path d="M12 12L18 18" />
          <path d="M12 12L6 6" />
        </svg>
      );
    case 'intel':
      return (
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'shield':
       return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
       );
    case 'trap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
           <path d="M18 4l-6 16L6 4" />
           <line x1="6" y1="12" x2="18" y2="12" />
        </svg>
      );
     case 'entry':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <path d="M12 2l8 20H4z" />
          <circle cx="12" cy="15" r="2" fill="currentColor"/>
        </svg>
      );
    default: // support
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
           <rect x="3" y="3" width="18" height="18" rx="2" />
           <line x1="12" y1="8" x2="12" y2="16" />
           <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
  }
}
