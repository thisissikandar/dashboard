import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
const queryClient = new QueryClient();

import "./index.css";
import router from "./router.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastMessage from "@/components/ToastMessage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"
import { LoaderCircle } from "lucide-react";

const  persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={<LoaderCircle className="animate-spin" />} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastMessage />
          <RouterProvider router={router} future={ { v7_startTransition: true}} />
        </ThemeProvider>
      </QueryClientProvider>
    </PersistGate>
    </Provider>
  </StrictMode>
);
