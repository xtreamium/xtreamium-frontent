import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";

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
              className="w-full h-full"
              onMouseOver={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
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
              <PopoverPanel anchor="top" className="z-30 flex flex-col">
                <div className="bg-white shadow-l">
                  <div className="flex justify-between bg-gray-100">
                    <div className="px-3 py-2 font-bold text-gray-700 ">
                      {startTime} - {endTime}
                    </div>
                    <div>
                      <button
                        className="text-red-500 transition duration-300 ease-in-out delay-150 hover:text-red-400"
                        title="Record Program"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 16 16"
                          className="w-8 h-8"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
                          <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-3 text-sm text-gray-600 text-wrap max-w-80">
                    {description}
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
