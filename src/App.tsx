import { useState } from 'react';
import { ConversationList } from './components/ConversationList';
import { ChatPage } from './components/ChatPage';
import type { Conversation, Message } from './types';

// Sample conversation data matching the screenshots
const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: '中华田园犬幼犬介绍',
    preview: '要区分这只幼犬是 中华田园犬（小土狗）还...',
    color: '#FFB6C1', // Light pink
    timestamp: '09:09',
  },
  {
    id: '2',
    title: 'SSL证书多域名使用问题',
    preview: '访问 http://www.mcm.bydexam.online/ 会...',
    color: '#FBBF24', // Yellow
    timestamp: '昨天',
  },
  {
    id: '3',
    title: '新对话',
    preview: '',
    color: '#FDE68A', // Light yellow
    timestamp: '昨天',
    hasCard: true,
  },
  {
    id: '4',
    title: '子域名指向不同进程的方法',
    preview: '我将为你保留文字，将图片改为透明底色并...',
    color: '#FBBF24', // Yellow
    timestamp: '周一',
  },
  {
    id: '5',
    title: '美赛智能体 logo设计',
    preview: '',
    color: '#E9D5FF', // Light purple
    timestamp: '周一',
    hasCard: true,
  },
  {
    id: '6',
    title: '解释图片内容',
    preview: '讲解者留着黑色短发，戴着眼镜。上身穿着...',
    color: '#DDD6FE', // Purple
    timestamp: '周日',
  },
  {
    id: '7',
    title: '设计质检直播间 LOGO',
    preview: '好的，我将把印章整体调整为红色系，保持...',
    color: '#FDE68A', // Light yellow
    timestamp: '周六',
  },
];

// Sample messages from the screenshot - iron vs cotton question
const ironCottonMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: '一斤铁和一斤棉花哪个重？',
    timestamp: '09:09',
  },
  {
    id: '2',
    role: 'assistant',
    content: `一样重哦～
都是一斤，只是铁密度大、体积小，棉花蓬松、体积大，看着不一样，但重量完全相同。`,
    thinking: `用户现在问的是一斤铁和一斤棉花哪个重，首先要明确都是一斤，所以一样重。然后要通俗解释，因为大家容易被体积误导，铁密度大体积小，棉花体积大，但重量都是一斤。

首先直接说一样重，然后说明原因：都是一斤，只是体积不一样，铁密度大看着小，棉花蓬松看着大，但重量相同。

要口语化，简单易懂。`,
    timestamp: '09:09',
    isStreaming: false,
  },
];

// Riddle conversation from screenshot 3
const riddleMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: '驿外断桥边 打一字',
    timestamp: '16:10',
  },
  {
    id: '2',
    role: 'assistant',
    content: `这个字谜的答案是：**纟（绞丝旁）** 或者说是 **"綜"** 字的一部分。

让我来解释：
• "驿外"指的是"驿"字去掉里面的部分
• "断桥边"指的是"桥"字断开取边

总体来说，这是一个兼具文学性和趣味性的字谜，质量很高`,
    thinking: `用户问的是一个字谜，需要分析：

1. "驿外"表示去掉"驿"字的某部分
2. "断桥边"表示取"桥"字的一边

这是经典的拆字谜。`,
    timestamp: '16:10',
    isStreaming: false,
  },
  {
    id: '3',
    role: 'user',
    content: '我觉得很不明确',
    timestamp: '16:12',
  },
  {
    id: '4',
    role: 'assistant',
    content: `你说的"不明确"确实有一定道理，这个字谜的争议点主要在"断桥边"的取字逻辑上：

• 从严谨性来看，"桥"的半边可以是"乔"，也可以是"木"，如果取"木"的话，和"纟"组合会得到"综"，就会出现多个可能的答案。

• 另外，"驿外"的"外"字在字谜里通常指"去掉某部分"，但"驿"去掉"马"得到"纟"的逻辑虽然成立，但如果没有对"外"的明确约定，也容易让人产生困惑。`,
    thinking: '用户认为答案不明确，需要解释字谜的多种可能解读。',
    timestamp: '16:12',
    isStreaming: false,
  },
];

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'chat'>('list');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    setCurrentView('chat');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedConversationId(null);
  };

  // Get initial messages based on selected conversation
  const getInitialMessages = (): Message[] => {
    switch (selectedConversationId) {
      case '1':
        return []; // Empty - will show greeting
      case '2':
        return ironCottonMessages;
      case '6':
        return riddleMessages;
      default:
        return [];
    }
  };

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {/* Mobile Frame */}
      <div className="h-full flex flex-col">
        {currentView === 'list' ? (
          <ConversationList
            conversations={sampleConversations}
            onSelectConversation={handleSelectConversation}
          />
        ) : (
          <ChatPage
            onBack={handleBack}
            initialMessages={getInitialMessages()}
          />
        )}
      </div>
    </div>
  );
}

export default App;
