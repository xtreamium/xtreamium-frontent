import React from "react";
import { SidebarContext } from "@/context";
import { User } from "@/models";
import { Transition } from "@headlessui/react";
import SidebarContent from "./sidebar-content.component";
type MobileSidebarProps = {
  user: User;
};
const MobileSidebar: React.FC<MobileSidebarProps> = ({ user }) => {
  const { isSidebarOpen } = React.useContext(SidebarContext);
  return (
    <Transition
      show={isSidebarOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
        <SidebarContent user={user} />
      </aside>
    </Transition>
  );
};

export default MobileSidebar;
