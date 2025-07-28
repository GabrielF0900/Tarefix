import react from 'react';

export interface InputProps extends react.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({label, error, ...rest}: InputProps) {
    return (
        
    )
}