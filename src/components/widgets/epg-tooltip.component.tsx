import React from "react";
import { BsRecord2 } from "react-icons/bs";
import { CgCloseO } from "react-icons/cg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { roundArrow } from "tippy.js";

interface IEPGTooltipComponentProps {
  title: string;
  description: string;
  onClickRecord: () => void;
  children: JSX.Element;
}
const EPGTooltipComponent = React.forwardRef(
  (
    { title, description, onClickRecord, children }: IEPGTooltipComponentProps,
    ref
  ) => {
    const hideOnInnerButtonPress = {
      name: "hideOnInnerButtonPress",
      defaultValue: true,
      fn(instance: any) {
        return {
          onCreate() {
            instance.popper.addEventListener("click", (event: any) => {
              if (
                instance.props.hideOnInnerButtonPress &&
                event.target.getAttribute("data-hide-menu-on-press") !== "false"
              ) {
                setTimeout(() => instance.hide(), 50);
                return event;
              }
            });
          },
        };
      },
    };
    return (
      <Tippy
        placement="top"
        theme="white"
        interactive={true}
        reference={ref as React.RefObject<Element> | Element | null}
        animation="shift-away"
        arrow={roundArrow}
        className="arrow-dark"
        plugins={[hideOnInnerButtonPress]}
        content={
          <div className="bg-white shadow-l">
            <div className="flex justify-between bg-gray-100">
              <div className="px-3 py-2 font-bold text-gray-700 ">{title}</div>
              <div>
                <button
                  className="text-red-500 transition duration-300 ease-in-out delay-150 hover:text-red-400"
                  title="Record Program"
                  onClick={() => {
                    onClickRecord();
                  }}
                >
                  <BsRecord2 className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="px-3 py-3 text-gray-600">{description}</div>
          </div>
        }
      >
        {children}
      </Tippy>
    );
  }
);

export default EPGTooltipComponent;
