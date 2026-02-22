import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
	<div className="form-group">
		<label htmlFor={id} className="label-standard">
			{label}
		</label>
		<input id={id} className="input-auth" {...props} />
	</div>
);
