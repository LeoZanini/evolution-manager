import { default as React } from 'react';
interface Message {
    id: string;
    from: string;
    to: string;
    text: string;
    timestamp: Date;
    type: "text" | "image" | "audio" | "video" | "document" | "sticker";
    isFromMe: boolean;
    isRead: boolean;
    messageId: string;
    quotedMessage?: {
        id: string;
        text: string;
        from: string;
    };
    mediaUrl?: string;
    fileName?: string;
    fileSize?: number;
}
interface MessageListProps {
    instanceId: string;
    contactId?: string;
    messages?: Message[];
    loading?: boolean;
    onSendMessage?: (message: string, contactId: string) => void;
    onMessageAction?: (messageId: string, action: string) => void;
    showInput?: boolean;
    autoScroll?: boolean;
    className?: string;
}
export declare const MessageList: React.FC<MessageListProps>;
export {};
