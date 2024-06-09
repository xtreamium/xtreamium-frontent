import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./containers";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./context/auth.context";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider defaultTheme="business" storageKey="__theme">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
