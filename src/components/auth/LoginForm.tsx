import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input 
        label="Email Address" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="name@company.com"
        required 
      />
      <div className="flex flex-col">
        <Input 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="••••••••"
          required 
        />
        <div className="flex justify-end mt-1">
          <a href="#" className="link-auth">Forgot password?</a>
        </div>
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
};
