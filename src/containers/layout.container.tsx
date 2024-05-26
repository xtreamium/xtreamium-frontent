import React, { Suspense } from "react";
import { useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "@/components/header.component";
import Main from "./main.container";
import { CategoryPage, HomePage, PlayerPage } from "@/pages";
import ThemedSuspense from "@/components/themed-suspense.component";
import { SidebarContext } from "@/context";
import Sidebar from "@/components/sidebar";
import LoginPage from "@/pages/login.page";
const Layout = () => {
  const { isSidebarOpen, closeSidebar } = React.useContext(SidebarContext);
  const location = useLocation();

  React.useEffect(() => {
    closeSidebar();
  }, [location]);
  return (
    <div className="bg-base-100">
      <div className="size-full">
        <div className="flex overflow-hidden">
          <Sidebar />
          <div className="w-full h-full max-w-full overflow-auto main-wrapper">
            <div className="flex flex-col h-full ">
              <Header />
              <Main>
                <Suspense fallback={<ThemedSuspense />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="category/:categoryId" element={<CategoryPage />} />
                    <Route path="play/:streamId" element={<PlayerPage />} />
                  </Routes>
                </Suspense>
              </Main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
