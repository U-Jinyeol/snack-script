import React, { ChangeEvent } from "react";

type InputProps = {
  label: string;
  id: string;
  maxLength?: number;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  id,
  maxLength,
  value,
  type,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder ?? label}
        maxLength={maxLength ?? 100}
        type={type ?? "text"}
        id={id}
        className="w-full border px-3 py-2 bg-black text-green-300 outline-none focus:border-green-300"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
