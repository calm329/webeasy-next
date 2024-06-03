import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const writingStyles = [
  "Professional",
  "Authoritative",
  "Lighthearted",
  "Friendly",
  "Inspirational",
  "Educational",
];

const RegenerateOptions = () => {
  return (
    <div>
      {/* <BsThreeDotsVertical /> */}

      <Select>
        <SelectTrigger className="w-10 border-none outline-none ">
          <BsThreeDotsVertical />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Writing style</SelectLabel>
            {writingStyles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegenerateOptions;
