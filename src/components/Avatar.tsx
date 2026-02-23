interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DoubaoAvatar = ({ size = 'md', className = '' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`${sizeClasses[size]} ${className} rounded-full overflow-hidden flex-shrink-0 relative`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8D4F0] via-[#D6E8FA] to-[#E8F4FD]" />

      {/* Character SVG */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* Hair */}
        <ellipse cx="50" cy="35" rx="28" ry="26" fill="#3D2314" />
        <path d="M22 35 Q25 55, 30 60 Q35 50, 35 35" fill="#3D2314" />
        <path d="M78 35 Q75 55, 70 60 Q65 50, 65 35" fill="#3D2314" />

        {/* Face */}
        <ellipse cx="50" cy="48" rx="22" ry="24" fill="#FFE4D0" />

        {/* Cheeks */}
        <ellipse cx="32" cy="54" rx="5" ry="3" fill="#FFCCC4" opacity="0.6" />
        <ellipse cx="68" cy="54" rx="5" ry="3" fill="#FFCCC4" opacity="0.6" />

        {/* Eyes */}
        <ellipse cx="40" cy="48" rx="4" ry="5" fill="#2D1810" />
        <ellipse cx="60" cy="48" rx="4" ry="5" fill="#2D1810" />
        <circle cx="41" cy="46" r="1.5" fill="white" />
        <circle cx="61" cy="46" r="1.5" fill="white" />

        {/* Eyebrows */}
        <path d="M34 40 Q40 38, 46 40" stroke="#3D2314" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M54 40 Q60 38, 66 40" stroke="#3D2314" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <path d="M50 52 L50 56" stroke="#E8C4B0" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mouth */}
        <path d="M45 62 Q50 66, 55 62" stroke="#D4847C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Bangs */}
        <path d="M28 28 Q35 20, 50 22 Q55 22, 50 32 Q45 28, 35 30" fill="#3D2314" />
        <path d="M72 28 Q65 20, 50 22 Q45 22, 50 32 Q55 28, 65 30" fill="#3D2314" />

        {/* Red scarf/collar */}
        <path d="M30 72 Q35 68, 50 70 Q65 68, 70 72 L72 85 Q50 82, 28 85 Z" fill="#C41E3A" />
        <path d="M35 74 Q50 76, 65 74 L63 80 Q50 78, 37 80 Z" fill="#A01830" />

        {/* Body/shoulders hint */}
        <path d="M25 85 Q30 78, 50 80 Q70 78, 75 85 L80 100 L20 100 Z" fill="#2D2D2D" />
      </svg>
    </div>
  );
};

interface ConversationIconProps {
  color: string;
  className?: string;
}

export const ConversationIcon = ({ color, className = '' }: ConversationIconProps) => {
  return (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ backgroundColor: color }}
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        <circle cx="8" cy="10" r="1.5"/>
        <circle cx="12" cy="10" r="1.5"/>
        <circle cx="16" cy="10" r="1.5"/>
      </svg>
    </div>
  );
};
