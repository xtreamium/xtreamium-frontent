import React from "react";
import SidebarContent from "./sidebar-content.component";

const DesktopSidebar = () => {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto lg:block ">
      <SidebarContent />
    </aside>
  );
};

export default DesktopSidebar;
