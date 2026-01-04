import React, { useState, useEffect } from 'react';
import { todos } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/');
      return;
    }
    fetchTodos();
  }, [navigate]);

  const fetchTodos = async () => {
    try {
      const response = await todos.getAll();
      setTodoList(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      if (editingTodo) {
        await todos.update(editingTodo.id, { 
          title, 
          completed: editingTodo.completed,
          dueDate: dueDate || null,
          priority: priority || 'Medium'
        });
      } else {
        await todos.create({ 
          title, 
          completed: false,
          dueDate: dueDate || null,
          priority: priority || 'Medium'
        });
      }
      setTitle('');
      setDueDate('');
      setPriority('Medium');
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todos.delete(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await todos.update(todo.id, { ...todo, completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDueDate(todo.dueDate || '');
    setPriority(todo.priority || 'Medium');
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setTitle('');
    setDueDate('');
    setPriority('Medium');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const clearCompleted = async () => {
    const completedTodos = todoList.filter(todo => todo.completed);
    for (const todo of completedTodos) {
      await todos.delete(todo.id);
    }
    fetchTodos();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const filteredTodos = todoList
    .filter(todo => {
      if (filter === 'pending') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by completion status first (pending tasks first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then apply the selected sort option
      if (sortBy === 'alphabetical') {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        const aPriority = priorityOrder[a.priority] || 4;
        const bPriority = priorityOrder[b.priority] || 4;
        return aPriority - bPriority;
      } else if (sortBy === 'date') {
        // Sort by due date (earliest first), tasks without due date go to end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      // Default: sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const pendingCount = todoList.filter(todo => !todo.completed).length;
  const completedCount = todoList.filter(todo => todo.completed).length;

  return (
    <div className="bg-[#09090b] text-white min-h-screen flex flex-col antialiased font-display overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="TaskFlow Logo" className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-white">ToDo'S</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-widest">Today</span>
                <span className="text-sm font-semibold text-white leading-none mt-0.5">{getCurrentDate()}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="h-9 w-9 rounded-full bg-[#27272a] flex items-center justify-center hover:bg-[#3f3f46] transition-colors ring-1 ring-white/10 hover:ring-white/20"
              >
                <span className="material-symbols-outlined text-[20px] text-gray-300">person</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10 sm:flex sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              {getGreeting()}, {userName.split(' ')[0]}
            </h1>
            <p className="text-[#a1a1aa] text-lg">
              You have <span className="text-blue-400 font-semibold">{pendingCount} tasks</span> pending.
            </p>
          </div>
          <div className="hidden sm:flex gap-3 mt-4 sm:mt-0">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-2 flex flex-col items-center min-w-[90px] shadow-sm">
              <span className="text-xl font-bold text-white">{completedCount}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#a1a1aa] font-medium">Done</span>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2 flex flex-col items-center min-w-[90px] shadow-sm">
              <span className="text-xl font-bold text-blue-400">{pendingCount}</span>
              <span className="text-[10px] uppercase tracking-wider text-blue-400/80 font-medium">To Do</span>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleSubmit} className="w-full mb-10 space-y-4">
          {/* Task Title Input */}
          <div className="group relative w-full transform transition-all hover:-translate-y-0.5">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#a1a1aa] group-focus-within:text-blue-500 transition-colors">add_task</span>
            </div>
            <input 
              className="block w-full bg-[#18181b] text-white placeholder-[#a1a1aa] border border-[#27272a] rounded-2xl py-5 pl-14 pr-4 text-lg shadow-lg shadow-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              placeholder="What needs to be done?"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Due Date and Priority Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Due Date */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#a1a1aa] text-[20px] group-focus-within:text-blue-500 transition-colors">calendar_today</span>
              </div>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full bg-[#18181b] text-white border border-[#27272a] hover:border-[#3f3f46] rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            {/* Priority */}
            <div className="relative w-full sm:w-48 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#a1a1aa] text-[20px] group-focus-within:text-blue-500 transition-colors">flag</span>
              </div>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="appearance-none block w-full bg-[#18181b] text-white border border-[#27272a] hover:border-[#3f3f46] rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm cursor-pointer"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#a1a1aa] text-[20px]">expand_more</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {editingTodo && (
                <button 
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center gap-1.5"
              >
                <span>{editingTodo ? 'Update' : 'Add'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full lg:w-64 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#a1a1aa] text-[20px] group-focus-within:text-blue-500 transition-colors">search</span>
              </div>
              <input 
                className="block w-full bg-[#18181b] text-white placeholder-[#a1a1aa] border border-[#27272a] rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                placeholder="Search tasks..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Sort */}
              <div className="relative w-full sm:w-48 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#a1a1aa] text-[20px] group-focus-within:text-blue-500 transition-colors">sort</span>
                </div>
                <select 
                  className="appearance-none block w-full bg-[#18181b] text-white border border-[#27272a] hover:border-[#3f3f46] rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#a1a1aa] text-[20px]">expand_more</span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex p-1 bg-[#18181b] rounded-xl border border-[#27272a] w-full sm:w-auto overflow-x-auto">
                <button 
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    filter === 'all' 
                      ? 'bg-[#27272a] text-white shadow-sm' 
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/50'
                  }`}
                >
                  All Tasks
                </button>
                <button 
                  type="button"
                  onClick={() => setFilter('pending')}
                  className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    filter === 'pending' 
                      ? 'bg-[#27272a] text-white shadow-sm' 
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/50'
                  }`}
                >
                  Pending
                </button>
                <button 
                  type="button"
                  onClick={() => setFilter('completed')}
                  className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    filter === 'completed' 
                      ? 'bg-[#27272a] text-white shadow-sm' 
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]/50'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#27272a]/60">
            <span className="text-xs font-medium text-[#a1a1aa]">
              Showing {filteredTodos.length} of {todoList.length} tasks
            </span>
            <button 
              type="button"
              onClick={clearCompleted}
              className="text-xs font-medium text-[#a1a1aa] hover:text-red-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-red-500/10"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              Clear Completed
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <div 
              key={todo.id} 
              className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                todo.completed 
                  ? 'bg-[#18181b]/40 border-transparent opacity-60 hover:opacity-100' 
                  : 'bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] hover:bg-[#27272a]/50 hover:shadow-lg hover:shadow-black/20'
              }`}
            >
              {/* Toggle Button */}
              <button 
                type="button"
                onClick={() => handleToggleComplete(todo)}
                className={`flex-shrink-0 transition-colors ${
                  todo.completed 
                    ? 'text-blue-500 hover:text-blue-400' 
                    : 'text-[#a1a1aa] hover:text-blue-500'
                }`}
              >
                <span className={`material-symbols-outlined text-[24px] ${todo.completed ? 'filled' : ''}`}>
                  {todo.completed ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className={`text-base font-medium truncate ${
                    todo.completed 
                      ? 'text-[#a1a1aa] line-through decoration-[#a1a1aa]/50' 
                      : 'text-white'
                  }`}>
                    {todo.title}
                  </h3>
                  {todo.priority && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      todo.priority === 'High' 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                        : todo.priority === 'Medium'
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {todo.priority.toUpperCase()}
                    </span>
                  )}
                </div>
                {(todo.dueDate || todo.createdAt) && !todo.completed && (
                  <div className="flex items-center gap-3 text-xs text-[#a1a1aa]">
                    {todo.dueDate && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        <span>Due {new Date(todo.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {todo.createdAt && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        <span>Created {new Date(todo.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                {!todo.completed && (
                  <button 
                    type="button"
                    onClick={() => handleEdit(todo)}
                    className="p-2 text-[#a1a1aa] hover:text-white hover:bg-[#3f3f46] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                )}
                <button 
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  className="p-2 text-[#a1a1aa] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}

          {filteredTodos.length === 0 && (
            <div className="text-center py-12 text-[#a1a1aa]">
              <span className="material-symbols-outlined text-[48px] mb-4 block">task_alt</span>
              <p className="text-lg font-medium">No tasks found</p>
              <p className="text-sm mt-1">Add a new task to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
