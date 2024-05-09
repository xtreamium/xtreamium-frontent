import DesktopSidebar from "./desktop-sidebar.component";
import MobileSidebar from "./mobile-sidebar.component";

const Sidebar = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
    </>
  );
};

export default Sidebar;
