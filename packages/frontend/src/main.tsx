import App from './App.tsx'
import './index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom' 
import AppProvider from "./AppProvider.tsx";
import ErrorPage from './routes/error-page.tsx'
import Login from './routes/login.tsx'
import PhotoEditor from './routes/photoeditor.tsx'
import SignUp from './routes/signup.tsx'
import PhotoDetail from './routes/photo-detail.tsx' 
import Dashboard from './routes/dashboard.tsx'

const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        }, 
        {
          path: '/photoeditor',
          element: <PhotoEditor />,
          errorElement: <ErrorPage />,
        }, 
        {
          path: '/photodetail/:imageId',
          element: <PhotoDetail />,
          errorElement: <ErrorPage />,
        },
      ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  }, 
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  
])


  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProvider > 
            <RouterProvider router={router} />
        </AppProvider>
    </React.StrictMode>
)