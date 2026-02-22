import type React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
	return (
		<div className="auth-page-wrapper">
			<div className="auth-card">
				<div className="mb-8 text-center">
					<h1 className="text-heading-1">Welcome back</h1>
					<p className="text-body mt-2">Enter your credentials to access your Freshers account.</p>
				</div>

				<LoginForm />
			</div>
		</div>
	);
};
