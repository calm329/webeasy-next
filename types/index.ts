import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormField = {
  name: string;
  type: "text" | "email" | "image";
  label: string;
  defaultValue: string;
  placeholder: string;
  validation?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
  };
};


export type TSection ="Hero"|"Banner"