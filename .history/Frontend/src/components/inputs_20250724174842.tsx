import react from 'react';

export interface InputProps extends react.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({label, error, ...rest}: InputProps) {
    return (
        <div>
            {label && <label className='text-3xl bg-gray-700 '>{label}</label>}
            <input {...rest} />
            {error && <span>{error}</span>}
        </div>
    )
}