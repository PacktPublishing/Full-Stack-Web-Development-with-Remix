import type { FormProps as RemixFormProps } from '@remix-run/react';
import { Form as RemixForm } from '@remix-run/react';
import type { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
};

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="w-full lg:max-w-md">
      <span className="text-textLight text-sm font-semibold">{label}</span>
      <input
        className={`mt-1 w-full text-text text-lg font-semibold bg-secondary dark:bg-darkSecondary py-4 px-2 rounded-lg border border-text dark:border-darkText dark:text-darkText ${className}`}
        {...props}
      />
    </label>
  );
}

type FormProps = RemixFormProps;

export function Form({ className = '', children, ...props }: FormProps) {
  return (
    <RemixForm
      className={`w-full lg:max-w-3xl flex flex-col items-center justify-center gap-5 ${className}`}
      {...props}
    >
      {children}
    </RemixForm>
  );
}
