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
            Enter your credentials to access your Turno account.
          </p>
        </div>

        <LoginForm />

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-neutral-500">Or continue with</span>
          </div>
        </div>

        <Button variant="secondary">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Google
        </Button>

        <p className="mt-8 text-center text-body">
          Don't have an account? <a href="#" className="link-auth font-semibold">Get Started</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
