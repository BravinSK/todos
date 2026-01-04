import React, { useState } from 'react';
import { auth } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = isSignIn
        ? await auth.signIn(email, password)
        : await auth.signUp(name, email, password);

      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('userName', response.data.name || name);
      navigate('/landing');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white h-screen overflow-hidden">
      <div className="flex min-h-full h-full">
        {/* Left Panel - Background Image with Quote */}
        <div className="relative hidden w-0 flex-1 lg:block bg-background-dark">
          <div 
            className="absolute inset-0 h-full w-full bg-cover bg-center opacity-80"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC-zgAgHmL6LggSJ3GgdoV1IIxp0Nm0JB_dmTG6VXJ4ZiyunDshqCEDUwX2vcnKkgT-ZzcLHrAHrby4O-ya-cPMTJPYSW4YRVbX-gU_3JCDeI0therEww6uWhWfHdIwTJ2xgry8lbLYkG07YPn-CpO2geceBb7Kq7sfbkBXFcd59e3L3pW80GTJtIUkeYwEtHva9XzOi1SQeyys2EqRvrCwbVSq4j-NVgGuCB1r76AkDd6FuFgFt5zTEVnEUlohJtE60YpClaGwxD_')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-16 flex flex-col gap-6 z-10">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
              <span className="material-symbols-outlined text-primary text-3xl">task_alt</span>
            </div>
            <blockquote className="space-y-2">
              <p className="text-2xl font-bold text-white leading-tight">
                "Organizing isn't about being perfect. It's about being efficient, reducing stress and saving time."
              </p>
              <footer className="text-slate-400 font-medium">— Productivity Manifesto</footer>
            </blockquote>
          </div>
        </div>

        {/* Right Panel - Sign In / Sign Up Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background-light dark:bg-background-dark w-full lg:w-[600px] relative overflow-y-auto">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <img src="/logo.svg" alt="TaskFlow Logo" className="size-10" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">ToDo'S</h2>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                {isSignIn ? 'Welcome back' : 'Create an account'}
              </h1>
              <p className="text-slate-500 dark:text-[#9db0b9]">
                {isSignIn ? 'Enter your details to access your tasks.' : 'Sign up to start managing your tasks.'}
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-slate-200 dark:border-[#3b4b54]">
                <button 
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className={`flex-1 pb-4 text-center text-sm font-semibold border-b-2 transition-colors ${
                    isSignIn 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-[#9db0b9] dark:hover:text-slate-300'
                  }`}
                >
                  Sign In
                </button>
                <button 
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className={`flex-1 pb-4 text-center text-sm font-semibold border-b-2 transition-colors ${
                    !isSignIn 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-[#9db0b9] dark:hover:text-slate-300'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-center text-sm">
                  {error}
                </div>
              )}

              {/* Name Field - Only for Sign Up */}
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">person</span>
                    </div>
                    <input 
                      className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1c2327] dark:ring-[#3b4b54] dark:text-white dark:placeholder:text-[#6a7a85] sm:text-sm sm:leading-6 bg-white"
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      type="text"
                      required={!isSignIn}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white mb-2" htmlFor="email">
                  Email address
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">mail</span>
                  </div>
                  <input 
                    className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1c2327] dark:ring-[#3b4b54] dark:text-white dark:placeholder:text-[#6a7a85] sm:text-sm sm:leading-6 bg-white"
                    id="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white" htmlFor="password">
                    Password
                  </label>
                  {isSignIn && (
                    <div className="text-sm">
                      <button type="button" className="font-semibold text-primary hover:text-sky-400">
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">lock</span>
                  </div>
                  <input 
                    className="block w-full rounded-lg border-0 py-3 pl-10 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#1c2327] dark:ring-[#3b4b54] dark:text-white dark:placeholder:text-[#6a7a85] sm:text-sm sm:leading-6 bg-white"
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer group"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300 text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button 
                  className="flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all hover:shadow-lg hover:shadow-primary/25" 
                  type="submit"
                >
                  {isSignIn ? 'Sign In' : 'Sign Up'}
                </button>
              </div>

              {/* Toggle Link */}
              <p className="text-center text-sm text-slate-500 dark:text-[#9db0b9] pt-2">
                {isSignIn ? "Don't have an account?" : 'Already have an account?'}
                <button 
                  type="button"
                  className="font-semibold leading-6 text-primary hover:text-sky-400 transition-colors ml-1"
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
