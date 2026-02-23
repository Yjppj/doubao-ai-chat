import type { Conversation } from '../types';
import { DoubaoAvatar } from './Avatar';
import { SearchIcon, EditIcon, ToggleIcon } from './Icons';

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
}

// Chat bubble icon component matching the original design
const ChatBubbleIcon = ({ color }: { color: string }) => (
  <div
    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
    style={{ backgroundColor: color }}
  >
    <svg className="w-6 h-6 text-white/90" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 22l5.71-.97A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 13h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
    </svg>
  </div>
);

export const ConversationList = ({ conversations, onSelectConversation }: ConversationListProps) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ToggleIcon className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">对话</h1>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <SearchIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <EditIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Bot Section */}
      <div className="p-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 border-b border-blue-100/50">
        <div className="flex items-center gap-4">
          <DoubaoAvatar size="lg" className="shadow-lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">豆包</h2>
              <span className="px-2.5 py-0.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-full border border-emerald-200">
                doubao.com
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">聊聊新话题</p>
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className="w-full conversation-item flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left border-b border-gray-50"
          >
            <ChatBubbleIcon color={conv.color} />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-[15px] truncate">{conv.title}</h3>
              <p className="text-sm text-gray-500 truncate mt-0.5">
                {conv.hasCard ? (
                  <span className="text-gray-400">[卡片]</span>
                ) : (
                  conv.preview
                )}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
