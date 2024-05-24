import "./index.css";
import { BrowserRouter } from "react-router-dom";
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
