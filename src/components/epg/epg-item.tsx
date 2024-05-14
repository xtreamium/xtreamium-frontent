import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { Icons } from "../icons";
import { dateToTimeString } from "@/utils/date-utils";

type EpgItemProps = {
  title: string;
  description: string;
  startTime: number;
  endTime: number;
};

const EpgItem: React.FC<EpgItemProps> = ({
  title,
  description,
  startTime,
  endTime,
}) => {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <div className="max-w-60">
      <Popover className="relative">
        {({}) => (
          <>
            <PopoverButton
              className="w-full h-full "
              onMouseOver={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsHover(false);
                }, 1000);
              }}
            >
              <span className="line-clamp-1">{title}</span>
            </PopoverButton>
            <Transition
              show={isHover}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                anchor="top"
                className="z-30 flex flex-col"
                onMouseLeave={() => {
                  setIsHover(false);
                }}
              >
                <div className="bg-white shadow-l">
                  <div className="flex justify-between bg-primary">
                    <div className="px-3 py-2 font-bold text-primary-content ">
                      {title}
                    </div>
                    <div>
                      <button
                        className="p-2 text-red-500 transition duration-300 ease-in-out delay-150 hover:text-red-400"
                        title="Record Program"
                      >
                        <Icons.record className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-3 text-sm text-primary-content text-wrap max-w-80">
                    {description}
                  </div>
                  <div className="px-3 py-2 text-sm font-bold text-accent-content">
                    {dateToTimeString(new Date(startTime))}&nbsp;-&nbsp;
                    {dateToTimeString(new Date(endTime))}
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
export default EpgItem;
