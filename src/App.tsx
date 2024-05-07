import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "./pages";
import { Layout } from "./containers";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
