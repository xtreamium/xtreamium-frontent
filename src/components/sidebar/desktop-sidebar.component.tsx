import React from "react";
import SidebarContent from "./sidebar-content.component";
import { User } from "@/models";
type DesktopSidebarProps = {
  user: User;
};
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ user }) => {
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto lg:block ">
      <SidebarContent user={user} />
    </aside>
  );
};

export default DesktopSidebar;
