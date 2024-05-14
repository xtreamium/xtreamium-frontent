import React, { Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "@/components/header.component";
import Main from "./main.container";
import { ChannelPage, HomePage, PlayerPage } from "@/pages";
import ThemedSuspence from "@/components/themed-suspence.component";
import { SidebarContext } from "@/context";
import Sidebar from "@/components/sidebar";
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
                <Suspense fallback={<ThemedSuspence />}>
                  <Routes>
                    <Route
                      path="live/channel/:channelId"
                      element={<ChannelPage />}
                    />
                    <Route
                      path="live/play/:streamId"
                      element={<PlayerPage />}
                    />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Suspense>
              </Main>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className={`flex h-screen bg-gray-50 dark:bg-gray-900 font-xtreamium ${
    //     isSidebarOpen && "overflow-hidden"
    //   } `}
    // >
    //   <Sidebar />

    //   <div className="flex flex-col flex-1 w-full">
    //     <Header />
    //     <Main>
    //       <Suspense fallback={<ThemedSuspence />}>
    //         <Routes>
    //           <Route path="live/channel/:channelId" element={<ChannelPage />} />
    //           <Route path="live/play/:streamId" element={<PlayerPage />} />
    //           <Route path="*" element={<HomePage />} />
    //         </Routes>
    //       </Suspense>
    //     </Main>
    //   </div>
    // </div>
  );
};

export default Layout;
