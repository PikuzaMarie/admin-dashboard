import React from 'react';

interface InputProps {
  id: string;
  labelText: string;
  errorMessage?: string;
  asTextarea?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const Input: React.FC<InputProps> = ({
  id,
  labelText,
  errorMessage,
  asTextarea,
  inputProps,
  textareaProps,
}) => {
  return (
    <p className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="block text-sm/6 font-medium text-stone-900"
      >
        {labelText}
      </label>
      {asTextarea ? (
        <textarea
          id={id}
          name={id}
          {...textareaProps}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      ) : (
        <input
          id={id}
          name={id}
          {...inputProps}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      )}
      {errorMessage && (
        <p className="text-sm/tight text-red-800">{errorMessage}</p>
      )}
    </p>
  );
};
