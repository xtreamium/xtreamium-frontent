import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "./pages";
import { Layout } from "./containers";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="business" storageKey="__theme">
        <Routes>
          {localStorage.getItem("server") ? (
            <>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/*" element={<Layout />} />
            </>
          ) : (
            <Route path="/*" element={<OnboardingPage />} />
          )}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
