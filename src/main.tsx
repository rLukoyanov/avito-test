import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import ItemPage from "./pages/ItemPage";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FromPage";

import { store } from "./store/store";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
