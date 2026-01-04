import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Landing from './components/Landing';
import TodoList from './components/TodoList';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Auth />
    },
    {
      path: '/landing',
      element: <Landing />
    },
    {
      path: '/todos',
      element: <TodoList />
    },
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
