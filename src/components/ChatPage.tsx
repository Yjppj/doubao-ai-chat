import { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { DoubaoAvatar } from './Avatar';
import { ChatMessage } from './ChatMessage';
import { ThinkingModeMenu, type ThinkingMode } from './ThinkingModeMenu';
import { BackIcon, PhoneIcon, MuteIcon, MoreIcon, CameraIcon, MicIcon, PlusIcon, DownloadIcon, PlayIcon, SparkleIcon, FireworkIcon } from './Icons';

// Custom icon for thinking mode button
const ThinkingButtonIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

interface ChatPageProps {
  onBack: () => void;
  initialMessages?: Message[];
}

// Sample AI responses for demo
const sampleResponses = [
  {
    thinking: `用户现在问的是一斤铁和一斤棉花哪个重，首先要明确都是一斤，所以一样重。然后要通俗解释，因为大家容易被体积误导，铁密度大体积小，棉花体积大，但重量都是一斤。

首先直接说一样重，然后说明原因：都是一斤，只是体积不一样，铁密度大看着小，棉花蓬松看着大，但重量相同。

要口语化，简单易懂。`,
    content: `一样重哦～
都是一斤，只是铁密度大、体积小，棉花蓬松、体积大，看着不一样，但重量完全相同。`
  },
  {
    thinking: `用户问的是一个经典的脑筋急转弯问题。需要分析：
1. 这是个文字游戏
2. 关键在于"一斤"这个单位
3. 不管是什么物质，一斤就是一斤

要用轻松的语气回答。`,
    content: `哈哈，这是个经典问题！

答案是：**一样重**

因为题目说的是"一斤铁"和"一斤棉花"，都是一斤嘛～

很多人会被"铁比较重"这个常识误导，但这里说的是相同重量（一斤）的两种物质，当然一样重啦！`
  },
  {
    thinking: `这是一个关于AI和技术的问题。让我来详细解答：

1. 首先解释什么是人工智能
2. 然后介绍常见的AI应用
3. 最后展望未来发展

要确保内容通俗易懂。`,
    content: `好的，让我来为你解答！

**人工智能（AI）** 是一种模拟人类智能的技术，它可以：

• 学习和理解自然语言
• 识别图像和语音
• 做出决策和预测
• 自动完成复杂任务

目前AI已广泛应用于：
- 智能助手（如我）
- 自动驾驶
- 医疗诊断
- 推荐系统

有什么具体问题想了解的吗？`
  }
];

export const ChatPage = ({ onBack, initialMessages = [] }: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [thinkingMenuOpen, setThinkingMenuOpen] = useState(false);
  const [thinkingMode, setThinkingMode] = useState<ThinkingMode>('thinking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const thinkingButtonRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Simulate streaming response
  const simulateStreamingResponse = async (userMessage: string) => {
    setIsStreaming(true);

    const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    const assistantMessageId = Date.now().toString();

    // Add empty assistant message
    const newAssistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      thinking: '',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
    };

    setMessages(prev => [...prev, newAssistantMessage]);

    // Stream thinking content (only if thinking mode is enabled)
    if (thinkingMode === 'thinking' || thinkingMode === 'expert') {
      for (let i = 0; i <= response.thinking.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 12));
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, thinking: response.thinking.slice(0, i) }
              : msg
          )
        );
      }

      // Small delay before content
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // Stream main content
    for (let i = 0; i <= response.content.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 18));
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: response.content.slice(0, i) }
            : msg
        )
      );
    }

    // Mark as complete
    setMessages(prev =>
      prev.map(msg =>
        msg.id === assistantMessageId
          ? { ...msg, isStreaming: false }
          : msg
      )
    );

    setIsStreaming(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    await simulateStreamingResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get the label for the current thinking mode
  const getThinkingModeLabel = () => {
    switch (thinkingMode) {
      case 'fast': return '快速';
      case 'thinking': return '思考';
      case 'expert': return '专家';
      default: return '思考';
    }
  };

  // Suggested follow-up questions
  const suggestedQuestions = messages.length > 0 ? [
    '一斤铁和一斤棉花哪个体积大？',
  ] : [];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BackIcon className="w-6 h-6 text-gray-600" />
          </button>
          <DoubaoAvatar size="sm" />
          <div>
            <h2 className="font-semibold text-gray-900">豆包</h2>
            <p className="text-xs text-gray-500">内容由 AI 生成</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <PhoneIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MuteIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <DoubaoAvatar size="lg" className="mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">你好，我是豆包</h3>
            <p className="text-gray-500 text-sm">有什么我可以帮助你的吗？</p>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}

        {/* Suggested follow-up */}
        {suggestedQuestions.length > 0 && !isStreaming && messages.length > 0 && (
          <div className="mt-2 mb-4">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => {
                  setInputValue(question);
                  inputRef.current?.focus();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>{question}</span>
                <DownloadIcon className="w-4 h-4 rotate-[-90deg]" />
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {messages.length > 2 && (
        <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToBottom}
            className="bg-white shadow-lg rounded-full p-2.5 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <DownloadIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Bottom Input Area */}
      <div className="bg-white border-t border-gray-100 safe-area-bottom">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
          {/* 豆包过年 */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap text-sm font-medium text-red-500 bg-red-50 border-red-200 transition-colors hover:opacity-80">
            <FireworkIcon className="w-4 h-4" />
            <span>豆包过年</span>
          </button>

          {/* 思考 - with dropdown menu */}
          <div ref={thinkingButtonRef} className="relative">
            <button
              onClick={() => setThinkingMenuOpen(!thinkingMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap text-sm font-medium text-blue-600 bg-blue-50 border-blue-200 transition-colors hover:opacity-80"
            >
              <ThinkingButtonIcon className="w-4 h-4" />
              <span>{getThinkingModeLabel()}</span>
              <span className="text-blue-400 ml-0.5">›</span>
            </button>

            <ThinkingModeMenu
              isOpen={thinkingMenuOpen}
              onClose={() => setThinkingMenuOpen(false)}
              selectedMode={thinkingMode}
              onSelectMode={setThinkingMode}
              anchorRef={thinkingButtonRef as React.RefObject<HTMLElement>}
            />
          </div>

          {/* Seedance 2.0 */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap text-sm font-medium text-gray-700 bg-white border-gray-200 transition-colors hover:opacity-80">
            <PlayIcon className="w-4 h-4" />
            <span>Seedance 2.0</span>
          </button>

          {/* AI 创作 */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap text-sm font-medium text-gray-700 bg-white border-gray-200 transition-colors hover:opacity-80">
            <SparkleIcon className="w-4 h-4" />
            <span>AI 创作</span>
          </button>
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2 px-4 py-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <CameraIcon className="w-6 h-6 text-gray-500" />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="发消息或按住说话..."
              className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500/30 transition-all"
              disabled={isStreaming}
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <MicIcon className="w-6 h-6 text-gray-500" />
          </button>

          <button
            onClick={handleSend}
            className={`p-2 rounded-full transition-all flex-shrink-0 ${
              inputValue.trim() && !isStreaming
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
