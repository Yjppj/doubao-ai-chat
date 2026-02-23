import type { Message } from '../types';
import { ThinkingSection } from './ThinkingSection';
import { CopyIcon, SpeakerIcon, BookmarkIcon, ShareIcon, RefreshIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

// Parse content to render markdown-like formatting
const renderContent = (content: string) => {
  // Split by lines to handle bullets
  const lines = content.split('\n');

  return lines.map((line, lineIndex) => {
    // Check if it's a bullet point
    const bulletMatch = line.match(/^[•\-]\s*(.+)$/);

    if (bulletMatch) {
      const bulletContent = bulletMatch[1];
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: static content
        <div key={lineIndex} className="flex items-start gap-2 my-1">
          <span className="text-gray-400 mt-0.5">•</span>
          <span>{renderInlineFormatting(bulletContent)}</span>
        </div>
      );
    }

    // Regular line
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static content
      <span key={lineIndex}>
        {renderInlineFormatting(line)}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
};

// Render inline formatting like bold
const renderInlineFormatting = (text: string) => {
  // Split by bold markers
  const parts = text.split(/(\*\*[^*]+\*\*)/);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // biome-ignore lint/suspicious/noArrayIndexKey: static content split
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    // biome-ignore lint/suspicious/noArrayIndexKey: static content split
    return <span key={i}>{part}</span>;
  });
};

export const ChatMessage = ({ message, isLast = false }: ChatMessageProps) => {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4 message-animate">
        <div className="chat-bubble-user px-4 py-3 max-w-[85%] shadow-sm">
          <p className="text-white text-[15px] leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 message-animate">
      <div className="chat-bubble-ai p-0 overflow-hidden border border-gray-100">
        {/* Thinking Section */}
        {message.thinking && (
          <ThinkingSection
            thinking={message.thinking}
            isStreaming={message.isStreaming && !message.content}
          />
        )}

        {/* Main Content */}
        {message.content && (
          <div className="px-4 pb-4 pt-4">
            {/* Divider if there's thinking */}
            {message.thinking && (
              <div className="border-t border-dashed border-gray-200 -mt-4 mb-4 -mx-4 px-4" />
            )}

            <div className="text-gray-800 text-[15px] leading-[1.8]">
              {renderContent(message.content)}
              {message.isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-gray-800 ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!message.isStreaming && message.content && (
          <div className="flex items-center justify-between px-3 py-2.5 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-1">
              <button className="action-btn p-2 rounded-lg hover:bg-white text-gray-400 hover:text-gray-600 transition-colors">
                <CopyIcon className="w-5 h-5" />
              </button>
              <button className="action-btn p-2 rounded-lg hover:bg-white text-gray-400 hover:text-gray-600 transition-colors">
                <SpeakerIcon className="w-5 h-5" />
              </button>
              <button className="action-btn p-2 rounded-lg hover:bg-white text-gray-400 hover:text-gray-600 transition-colors">
                <BookmarkIcon className="w-5 h-5" />
              </button>
              <button className="action-btn p-2 rounded-lg hover:bg-white text-gray-400 hover:text-gray-600 transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
            <button className="action-btn p-2 rounded-lg hover:bg-white text-blue-500 hover:text-blue-600 transition-colors">
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
