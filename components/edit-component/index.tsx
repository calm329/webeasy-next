import React, { Dispatch, Fragment, useState } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { VscLayoutSidebarLeft, VscLayoutSidebarRight } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  moveSection,
  duplicateSection,
  removeSection,
  sectionsData as SD,
  changeVariation
} from "@/lib/store/slices/section-slice";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { generateUniqueId } from "@/lib/utils/function";
import { FaCopy, FaTrash } from "react-icons/fa";

type TProps = {
  id: string;

};

const EditComponent = (props: TProps) => {
  const { id } = props;
  const sections = useAppSelector(SD);
  const dispatch = useAppDispatch();
  const [isRightSide, setIsRightSide] = useState(true);

  const handleMoveSection = (direction: "up" | "down") => {
    dispatch(moveSection({ id, direction }));
  };

  const handleDuplicateSection = () => {
    dispatch(duplicateSection(id));
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(id));
  };

  const handleRestyleSection = () => {
    const variation = Math.floor(Math.random() * 5) + 1
    dispatch(changeVariation({id,variation}));
  };

  return (
    <div
      className={`${isRightSide ? "right-10" : "left-10"} absolute -top-8 z-10 hidden gap-5 rounded-xl border bg-white p-5 shadow group-hover:flex`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button onClick={handleRestyleSection}>Restyle</button>
      <FaArrowUpLong
        className="cursor-pointer"
        onClick={() => handleMoveSection("up")}
      />
      <FaArrowDownLong
        className="cursor-pointer"
        onClick={() => handleMoveSection("down")}
      />
      {isRightSide ? (
        <VscLayoutSidebarLeft
          className="cursor-pointer"
          onClick={() => {
            setIsRightSide(false);
          }}
        />
      ) : (
        <VscLayoutSidebarRight
          className="cursor-pointer"
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
            className={`absolute -right-5 top-8 z-20 mt-2 flex w-32 origin-top-right flex-col divide-y divide-gray-100 rounded-md bg-white text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <MenuItem>
              <button
                className="flex items-center gap-2 p-2"
                onClick={handleDuplicateSection}
              >
                <FaCopy size={15} />
                Duplicate
              </button>
            </MenuItem>

            <MenuItem>
              <button
                className="flex items-center gap-2 p-2"
                onClick={handleRemoveSection}
              >
                <FaTrash size={15} />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default EditComponent;
