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
  setType: React.Dispatch<React.SetStateAction<string>>;
};

const RegenerateOptions = (props: TProps) => {
  const { type, setType } = props;
  return (
    <div>
      <Select
        defaultValue={type ?? "External"}
        onValueChange={(value) => {
          setType(value);
        }}
      >
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
