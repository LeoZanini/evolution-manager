import { default as React } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare const Card: React.FC<CardProps>;
export {};
