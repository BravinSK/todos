import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleManageTasks = () => {
    navigate('/todos');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="layout-container flex h-full grow flex-col z-10 relative">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#283339] bg-[rgba(16,28,34,0.85)] backdrop-blur-xl">
            <div className="px-4 md:px-10 py-3 max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <img src="/logo.svg" alt="TaskFlow Logo" className="size-8" />
                <h2 className="text-xl font-bold tracking-tight">ToDo'S</h2>
              </div>
              <div className="flex items-center gap-3">
                {userEmail ? (
                  <>
                    <span className="hidden sm:block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">{userName}</span>
                    <button 
                      onClick={handleLogout}
                      className="hidden sm:flex h-9 px-4 items-center justify-center rounded-lg text-slate-600 dark:text-white text-sm font-semibold hover:bg-slate-100 dark:hover:bg-[#283339] transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => navigate('/')}
                    className="hidden sm:flex h-9 px-4 items-center justify-center rounded-lg text-slate-600 dark:text-white text-sm font-semibold hover:bg-slate-100 dark:hover:bg-[#283339] transition-colors"
                  >
                    Login
                  </button>
                )}
                <button 
                  onClick={handleManageTasks}
                  className="h-9 px-4 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all"
                >
                  Manage Tasks
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col justify-center">
            <div className="w-full px-4 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Left Content */}
                <div className="flex flex-col gap-6 flex-1 text-center lg:text-left max-w-2xl">
                  <div className="flex flex-col gap-4">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto lg:mx-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">New Feature: Team Sync</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                      Simplify your workflow. <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Amplify your results.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                      Experience the next generation of task management. ToDo'S offers intuitive CRUD functionality designed for professionals who need to get things done, fast.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                    <button 
                      onClick={handleManageTasks}
                      className="h-12 px-6 flex items-center justify-center rounded-lg bg-primary hover:bg-sky-500 text-white text-base font-bold shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5"
                    >
                      Manage your tasks
                    </button>
                  </div>
                </div>

                {/* Right Content - Dashboard Preview */}
                <div className="flex-1 w-full relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform scale-75 opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] transform transition-transform duration-500 hover:scale-[1.01]">
                    {/* Window Controls */}
                    <div className="h-8 bg-slate-100 dark:bg-[#283339] border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    {/* Dashboard Image */}
                    <div 
                      className="aspect-[4/3] bg-center bg-cover bg-no-repeat w-full relative"
                      style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQhkQjaPrcamELL_es7-pRvf7PJJCAAPuFz0UWYVhc3qVgGHVDbhNTbNzn1Z8wo3EG2FRUKslu2N3SV2HtjsDrJBdws9vtPyE67aLFGMM9Hr8grAFN_RYw-VPfWU6DoyEJoGelqP4GXvmz63gAKOopewHdiZ9Pg7AV66LNf8YAY0cNiQcodT39XKMR7xM53_iw-qp9Oz13MyA-x9sqO9__v5gx8n6d5Ysq-6E-j6N3dbxlXrJTncOq3WMWOesDQ7IpHWB0Hf1Fn0m1')"
                      }}
                    >
                      <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/40 mix-blend-overlay"></div>
                    </div>
                  </div>

                  {/* Floating Card - Bottom Left */}
                  <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-[#283339] p-4 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 max-w-[200px] hidden sm:block">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Task Completed</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">Design System</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Card - Top Right */}
                  <div className="absolute -top-6 -right-6 z-20 bg-white dark:bg-[#283339] p-4 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:block">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Productivity</span>
                      <span className="text-xs font-bold text-primary">+125%</span>
                    </div>
                    <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[75%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-[#283339] bg-white dark:bg-[#111618] py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <img src="/logo.svg" alt="TaskFlow Logo" className="size-6" />
                <span className="font-bold text-lg">ToDo'S</span>
              </div>
              <div className="flex gap-8 text-sm text-slate-500 dark:text-[#9db0b9]">
                <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
              </div>
            </div>
            <div className="text-center mt-8 text-xs text-slate-400 dark:text-slate-600">
              © 2024 Bravin's ToDo'S All rights reserved
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
