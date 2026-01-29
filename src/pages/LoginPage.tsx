import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Button } from '../components/ui/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="mb-8 text-center">
          <h1 className="text-heading-1">Welcome back</h1>
          <p className="text-body mt-2">
            Enter your credentials to access your Freshers account.
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-body">
          Don't have an account? <a href="#" className="link-auth font-semibold">Get Started</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
