import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ThinkingMode = 'fast' | 'thinking' | 'expert';

interface ThinkingModeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMode: ThinkingMode;
  onSelectMode: (mode: ThinkingMode) => void;
  anchorRef: React.RefObject<HTMLElement>;
}

// Lightning bolt icon for fast mode
const LightningIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// Thinking/brain icon
const ThinkingModeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

// Expert/diamond icon
const ExpertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
    <circle cx="7.05" cy="7.05" r="1.2" />
    <circle cx="16.95" cy="7.05" r="1.2" />
    <circle cx="7.05" cy="16.95" r="1.2" />
    <circle cx="16.95" cy="16.95" r="1.2" />
  </svg>
);

// Checkmark icon
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const modeOptions = [
  {
    id: 'fast' as ThinkingMode,
    title: '快速',
    description: '适用于大部分情况',
    icon: LightningIcon,
    iconColor: 'text-gray-700',
  },
  {
    id: 'thinking' as ThinkingMode,
    title: '思考',
    description: '擅长解决更难的问题',
    icon: ThinkingModeIcon,
    iconColor: 'text-blue-600',
  },
  {
    id: 'expert' as ThinkingMode,
    title: '专家',
    description: '研究级智能模型',
    icon: ExpertIcon,
    iconColor: 'text-gray-700',
    isNew: true,
  },
];

export const ThinkingModeMenu = ({ isOpen, onClose, selectedMode, onSelectMode, anchorRef }: ThinkingModeMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Also check if click is on the anchor button
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  // Calculate position based on anchor element
  const anchorRect = anchorRef.current?.getBoundingClientRect();
  const menuStyle: React.CSSProperties = anchorRect ? {
    position: 'fixed',
    left: `${anchorRect.left}px`,
    bottom: `${window.innerHeight - anchorRect.top + 8}px`,
  } : {};

  const menuContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
        style={{ background: 'transparent' }}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999] min-w-[260px]"
        style={{
          ...menuStyle,
          animation: 'fadeInSlideUp 0.2s ease-out forwards',
        }}
      >
        <div className="py-2">
          {modeOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedMode === option.id;

            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelectMode(option.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-blue-50/50' : ''
                }`}
              >
                {/* Icon */}
                <div className={`${option.iconColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Text content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-[15px] ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                      {option.title}
                    </span>
                    {option.isNew && (
                      <span className="px-1.5 py-0.5 text-xs font-medium text-orange-500 bg-orange-50 rounded">
                        新
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
                </div>

                {/* Checkmark for selected */}
                {isSelected && (
                  <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  // Use portal to render menu at document body level
  return createPortal(menuContent, document.body);
};
