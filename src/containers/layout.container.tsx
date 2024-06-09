import React, { Suspense } from "react";
import { useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "@/components/header.component";
import Main from "./main.container";
import { CategoryPage, HomePage, PlayerPage } from "@/pages";
import ThemedSuspense from "@/components/themed-suspense.component";
import { SidebarContext } from "@/context";
import Sidebar from "@/components/sidebar";
import LoginPage from "@/pages/login.page";
import { ApiService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import AddServerPage from "@/pages/add-server.page";
const Layout = () => {
  const query = useQuery({ queryKey: ["user"], queryFn: ApiService.getCurrentUser });
  const { isSidebarOpen, closeSidebar } = React.useContext(SidebarContext);
  const location = useLocation();

  React.useEffect(() => {
    closeSidebar();
  }, [location]);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (!query.data) {
    return <LoginPage />;
  }

  return (
    <div className="bg-base-100">
      <div className="size-full">
        <div className="flex overflow-hidden">
          {query.data.servers && <Sidebar user={query.data} />}
          <div className="w-full h-full max-w-full overflow-auto main-wrapper">
            <div className="flex flex-col h-full ">
              <Header user={query.data} />
              <Main>
                <Suspense fallback={<ThemedSuspense />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/server/add" element={<AddServerPage />} />
                    <Route path="/dashboard" element={<HomePage />} />
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
