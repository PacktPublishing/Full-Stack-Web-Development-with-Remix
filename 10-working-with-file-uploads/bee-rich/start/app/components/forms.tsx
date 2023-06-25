import { clsx } from 'clsx';
import type { FormProps as RemixFormProps } from '@remix-run/react';
import { useSubmit } from '@remix-run/react';
import { Form as RemixForm } from '@remix-run/react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
};

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="w-full lg:max-w-md">
      <span className="text-textLight text-sm font-semibold">{label}</span>
      <input
        className={clsx(
          'mt-1 w-full text-text dark:text-darkText text-lg font-semibold bg-background dark:bg-darkBackground py-4 px-2 rounded-lg border border-secondaryAccent dark:border-darkSecondaryAccent',
          className,
        )}
        {...props}
      />
    </label>
  );
}

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactNode;
};

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <label className="w-full lg:max-w-md">
      <span className="text-textLight text-sm font-semibold">{label}</span>
      <textarea
        className={clsx(
          'mt-1 w-full text-text dark:text-darkText text-lg font-semibold bg-background dark:bg-darkBackground py-4 px-2 rounded-lg border border-secondaryAccent dark:border-darkSecondaryAccent',
          className,
        )}
        {...props}
      />
    </label>
  );
}

function useDebounce(delay: number, initialValue = ''): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return [debouncedValue, setValue];
}

type SearchInputProps = InputProps & {
  formRef: React.RefObject<HTMLFormElement>;
  defaultValue?: string;
};

export function SearchInput({ formRef, defaultValue, ...props }: SearchInputProps) {
  const [debouncedValue, setValue] = useDebounce(500, defaultValue);
  const submit = useSubmit();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (formRef.current) {
      submit(formRef.current);
    }
  }, [formRef, debouncedValue, submit]);

  return <Input {...props} defaultValue={debouncedValue} onChange={(e) => setValue(e.target.value)} />;
}

type FormProps = RemixFormProps;

export function Form({ className, children, ...props }: FormProps) {
  return (
    <RemixForm
      className={clsx('w-full m-auto lg:max-w-3xl flex flex-col items-center justify-center gap-5', className)}
      {...props}
    >
      {children}
    </RemixForm>
  );
}
