import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { VscLayoutSidebarLeft, VscLayoutSidebarRight } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import { TSection } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

type TProps = {
  setSections: Dispatch<
    SetStateAction<
      {
        id: string;
        title: string;
        content: JSX.Element;
      }[]
    >
  >;
  sections: {
    id: string;
    title: string;
    content: JSX.Element;
  }[];
  id: string;
};

const EditComponent = (props: TProps) => {
  const { sections, setSections, id } = props;
  const [isRightSide, setIsRightSide] = useState(true);

  const moveSection = (direction: "up" | "down") => {
    setSections((prevSections) => {
      const currentIndex = prevSections.findIndex(
        (section) => section.id === id,
      );
      if (currentIndex === -1) return prevSections;

      const newSections = [...prevSections];
      const swapIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (swapIndex < 0 || swapIndex >= newSections.length) return prevSections;

      [newSections[currentIndex], newSections[swapIndex]] = [
        newSections[swapIndex],
        newSections[currentIndex],
      ];

      return newSections;
    });
  };
  return (
    <div
      className={`${isRightSide ? "right-0" : "left-0"} absolute top-0 z-10 hidden gap-5 rounded-xl border bg-white p-5  shadow group-hover:flex`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button>Restyle</button>
      <button>Regenerate images</button>
      <FaArrowUpLong onClick={() => moveSection("up")} />
      <FaArrowDownLong onClick={() => moveSection("down")} />
      {isRightSide ? (
        <VscLayoutSidebarLeft
          onClick={() => {
            setIsRightSide(false);
          }}
        />
      ) : (
        <VscLayoutSidebarRight
          onClick={() => {
            setIsRightSide(true);
          }}
        />
      )}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton>
            <BsThreeDots />
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={`absolute -right-5 top-8 z-20 mt-2 flex w-56 origin-top-right flex-col divide-y divide-gray-100 rounded-md bg-white text-center  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
          >
            <MenuItem>
              <button className="p-2">Edit</button>
            </MenuItem>

            <MenuItem>
              <button className="p-2">Duplicate</button>
            </MenuItem>

            <MenuItem>
              <button
                className="p-2"
                onClick={() => {
                  setSections((prevSections) =>
                    prevSections.filter((section) => section.id !== id),
                  );
                }}
              >
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
         
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
};

export default EditComponent;
