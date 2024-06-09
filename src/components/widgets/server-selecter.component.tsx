import { User } from "@/models";
import useServerStore from "@/services/state/server.state";
import React from "react";
import { Icons } from "@/components/icons";

type ServerSelectorComponentProps = {
  user: User;
};
const ServerSelectorComponent: React.FC<ServerSelectorComponentProps> = ({ user }) => {
  const { selectedServer, setSelectedServer } = useServerStore();
  const server = user.servers.find((s) => s.id === selectedServer);
  if (!user || !user.servers || user.servers.length === 0)
    return <button className="btn">Add Server</button>;

  function _handleClick(id: number): void {
    setSelectedServer(id);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  return (
    <div title="Change Theme" className="dropdown dropdown-end ">
      <div
        tabIndex={0}
        onClick={(event) => {
          if (document.activeElement instanceof HTMLElement && isOpened) {
            document.activeElement.blur();
          } else {
          }
        }}
        className="gap-1 normal-case btn btn-ghost"
      >
        <span className="font-normal">{server?.name}</span>
        <Icons.chevronDown className="w-5 h-5 fill-current opacity-60" />
      </div>
      <div className="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5">
        <ul className="gap-1 menu menu-sm">
          {user.servers.map((s) => (
            <li onClick={() => _handleClick(s.id)} key={s.id} className="">
              <button>
                <span className="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50">
                  {s.name[0].toUpperCase()}
                </span>
                <span className="font-[sans-serif]">{s.name}</span>
              </button>
            </li>
          ))}
          <hr className="text-primary" />
          <button
            className="w-full opacity-50 btn btn-sm"
            onClick={() => console.log("Add Server")}
          >
            <Icons.add className="w-6 h-6" /> Add
          </button>
        </ul>
      </div>
    </div>
  );
};

export default ServerSelectorComponent;
