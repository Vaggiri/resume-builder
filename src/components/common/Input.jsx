import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, className = '', error, ...props }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="mb-1.5 text-sm font-semibold text-slate-700 tracking-tight">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:border-slate-300 placeholder:text-slate-400 text-slate-800 ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="mt-1 text-xs font-medium text-red-500 flex items-center gap-1">⚠ {error}</span>}
        </div>
    );
};

export default Input;
