import { default as React } from 'react';
import { Contact } from '../types';

interface ContactListProps {
    contacts: Contact[];
    isLoading?: boolean;
    onContactClick?: (contact: Contact) => void;
}
export declare const ContactList: React.FC<ContactListProps>;
export {};
