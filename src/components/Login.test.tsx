import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Login } from './Login';

describe('Login Component', () => {
	it('renders email and password inputs and a submit button', () => {
		render(<Login />);

		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
	});
});
