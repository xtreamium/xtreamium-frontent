import React from "react";

import { toast } from "react-toastify";
import { Icons } from "./icons";
import { SidebarContext } from "@/context";
import ThemeChanger from "./theme-changer.component";
import ProfileDropdown from "./widgets/profile-dropdown.component";
import ServerSelectorComponent from "./widgets/server-selecter.component";
import {User} from '@/models';
type HeaderProps = { user: User };

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { toggleSidebar } = React.useContext(SidebarContext);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  const _debuggles = () => {
    toast("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleNotificationsClick = () => {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  return (
    <div className="w-full navbar">
      <div className="flex-1">
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 ">
            <label className="flex items-center gap-2 input input-bordered">
              <Icons.search className="w-4 h-4 opacity-70" aria-hidden="true" />
              <input type="text" className="grow" placeholder="Search for programs" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex-none mx-2">
        <ServerSelectorComponent user={user} />
        <ThemeChanger />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
