import { default as React } from 'react';

interface Contact {
    id: string;
    name: string;
    phone: string;
    profilePicture?: string;
    isOnline: boolean;
    lastSeen?: Date;
    isBlocked?: boolean;
    isGroup?: boolean;
    groupParticipants?: number;
}
interface ContactListProps {
    instanceId: string;
    contacts?: Contact[];
    loading?: boolean;
    onContactSelect?: (contact: Contact) => void;
    onContactAction?: (contactId: string, action: string) => void;
    showSearch?: boolean;
    showActions?: boolean;
    className?: string;
}
export declare const ContactList: React.FC<ContactListProps>;
export {};
