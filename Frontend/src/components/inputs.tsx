import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-lg font-medium text-white">
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`
          w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400
          border-2 transition duration-300
          ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-blue-500'}
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
        `}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
