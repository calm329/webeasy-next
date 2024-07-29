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

type TProps = {
  type: string;
  setType?: React.Dispatch<React.SetStateAction<string>>;
  types?: string[];
  title?: string;
};

const RegenerateOptions = (props: TProps) => {
  const { type, setType, types, title } = props;
  return (
    <div>
      <Select
        defaultValue={type ?? "External"}
        onValueChange={(value) => {
          setType && setType(value);
        }}
      >
        <SelectTrigger className="w-10 border-none outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0">
          <BsThreeDotsVertical />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{title ? title : "Writing style"}</SelectLabel>
            {(types ?? writingStyles).map((style) => (
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
