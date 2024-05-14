import 'antd/dist/reset.css';
import { StrictMode,  } from 'react';
import reactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Processed from './pages/processed'
import UploadNew from './pages/upload-new'
import Edit from './pages/edit'
import Pending from './pages/pending'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Processed />
  },
  {
    path: '/pending',
    element: <Pending />
  },
  {
    path: '/pdf',
    element: <Edit />
  },
  {
    path: '/upload-new',
    element: <UploadNew />
  },
]);


reactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
