import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	isLoading,
	children,
	...props
}) => {
	const className =
		variant === "primary" ? "btn-auth-submit" : "btn-auth-secondary";
	return (
		<button className={className} disabled={isLoading} {...props}>
			{isLoading ? "Processing..." : children}
		</button>
	);
};
