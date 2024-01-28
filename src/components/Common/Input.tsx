import React, { ChangeEvent } from "react";

type InputProps = {
  label: string;
  id: string;
  maxLength: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, id, maxLength, value, onChange }: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        maxLength={maxLength}
        type="text"
        id={id}
        className="w-full border rounded px-3 py-2 bg-black text-green-300 focus:outline-green-300"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
