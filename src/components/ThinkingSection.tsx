import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './Icons';

interface ThinkingSectionProps {
  thinking: string;
  isStreaming?: boolean;
}

export const ThinkingSection = ({ thinking, isStreaming = false }: ThinkingSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to update height when thinking content changes
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [thinking, isStreaming]);

  return (
    <div className="thinking-section mb-0 overflow-hidden bg-gradient-to-br from-gray-50 to-slate-50">
      {/* Header - Collapsible Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100/50 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium text-[15px]">
            {isStreaming ? '正在思考' : '已完成思考'}
          </span>
          {isStreaming && (
            <div className="flex gap-1 ml-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
            </div>
          )}
        </div>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}>
          <ChevronUpIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? (contentHeight || 500) : 0,
          opacity: isExpanded ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        <div ref={contentRef} className="px-4 pb-4">
          <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap font-light">
            {thinking}
            {isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
