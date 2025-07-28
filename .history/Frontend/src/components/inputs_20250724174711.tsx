import react from 'react';

export interface InputProps extends react.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({label, error, ...rest}: InputProps) {
    return (
        <div></div>
            {label && <label>{label}</label>}
            <input {...rest} />
            {error && <span style={{color: 'red'}}>{error}</span>}
        </div>
    )
}