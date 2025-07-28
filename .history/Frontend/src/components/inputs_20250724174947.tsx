import react from 'react';

export interface InputProps extends react.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({label, error, ...rest}: InputProps) {
    return (
        <div>
            {label && <label className='text-3xl bg-gray-700 font-semibold'>{label}</label>}
            <input className='rounded-2xl border-[red] w-' {...rest} />
            {error && <span>{error}</span>}
        </div>
    )
}