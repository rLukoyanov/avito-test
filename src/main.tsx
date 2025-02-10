import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ItemPage from './pages/ItemPage';
import ListPage from './pages/ListPage';
import FormPage from './pages/FromPage';
import { FormProvider } from './store/FormContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage />,
  },
  {
    path: "item/:id",
    element: <ItemPage />,
  },
  {
    path: "form",
    element: <FormPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  </StrictMode>,
)
