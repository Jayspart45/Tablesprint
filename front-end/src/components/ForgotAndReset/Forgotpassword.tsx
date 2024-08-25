import React, { useState } from 'react';
import Flex from '../../shared/Flex';
import Input from '../../shared/Input';
import { toast } from 'react-toastify';
import { ForgotPasswordApi } from '../../api/authApi';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (email) {
      try {
        const res = await ForgotPasswordApi({ email });
        if (res && res.success) {
          toast.success(res.message || 'Password reset link sent!');
        } else {
          toast.error(res.message || 'Failed to send password reset link.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.error('Forgot password error:', error);
      }
    } else {
      toast.warning('Please enter your email address.');
    }
  };

  return (
    <div className="font-Poppins w-full min-h-screen bg-primary/30">
      <Flex className="max-w-7xl mx-auto w-full h-screen justify-center items-center">
        <Flex className="w-full max-w-lg flex-col bg-secondary rounded-xl text-center py-10 px-8 gap-8">
          <h1 className="text-2xl mb-4">Did you forgot password?</h1>
          <p className="text-gray-400 mb-8">
            Enter your email address below and we'll send you a link to restore password.
          </p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mb-4"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-primary px-4 py-2 rounded-xl text-secondary"
          >
            Request resent link
          </button>
          <Link to="/">Back to log in</Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default ForgotPassword;
