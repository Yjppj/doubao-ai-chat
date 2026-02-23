export interface Conversation {
  id: string;
  title: string;
  preview: string;
  color: string;
  timestamp: string;
  hasCard?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}
