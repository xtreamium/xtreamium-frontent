import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "./pages";
import { Layout } from "./containers";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider defaultTheme="business" storageKey="__theme">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
