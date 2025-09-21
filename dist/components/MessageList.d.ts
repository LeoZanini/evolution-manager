import { default as React } from 'react';
import { Message } from '../types';

interface MessageListProps {
    messages: Message[];
    isLoading?: boolean;
    onMessageClick?: (message: Message) => void;
}
export declare const MessageList: React.FC<MessageListProps>;
export {};
