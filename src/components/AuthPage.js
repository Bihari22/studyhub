import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  const handleLogin = () => {
    if (email === 'admin@studyhub.com' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate(redirectTo);
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const renderFormTitle = () => {
    switch (mode) {
      case 'login': return 'Login to your account';
      case 'signup': return 'Create a new account';
      case 'forgot': return 'Recover your password';
      default: return '';
    }
  };

  return (
    <motion.div
      className=" flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        layout
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 relative"
      >
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6 cursor-pointer">
            StudyHub
          </h1>
        </Link>

        <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
          {renderFormTitle()}
        </h2>

        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.form
              key="login"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError('');
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
              />
              {loginError && (
                <p className="text-sm text-red-500 text-center -mt-2">{loginError}</p>
              )}
              <button type="submit" className="btn-primary">Login</button>
              <p className="text-sm text-center text-gray-500">
                Forgot your password?{' '}
                <button type="button" onClick={() => setMode('forgot')} className="text-blue-600 hover:underline">Recover</button>
              </p>
              <p className="text-sm text-center text-gray-500">
                Don’t have an account?{' '}
                <button type="button" onClick={() => setMode('signup')} className="text-blue-600 hover:underline">Sign Up</button>
              </p>
            </motion.form>
          )}

          {mode === 'signup' && (
            <motion.form
              key="signup"
              onSubmit={(e) => e.preventDefault()}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <input type="text" placeholder="Full Name" className="input" />
              <input type="email" placeholder="Email" className="input" />
              <input type="password" placeholder="Password" className="input" />
              <button type="submit" className="btn-primary">Create Account</button>
              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <button type="button" onClick={() => setMode('login')} className="text-blue-600 hover:underline">Login</button>
              </p>
            </motion.form>
          )}

          {mode === 'forgot' && (
            <motion.form
              key="forgot"
              onSubmit={(e) => e.preventDefault()}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <input type="email" placeholder="Enter your email" className="input" />
              <button type="submit" className="btn-primary">Send Reset Link</button>
              <p className="text-sm text-center text-gray-500">
                Remembered password?{' '}
                <button type="button" onClick={() => setMode('login')} className="text-blue-600 hover:underline">Back to Login</button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
