import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="form-group">
    <label className="label-standard">{label}</label>
    <input className="input-auth" {...props} />
  </div>
);
