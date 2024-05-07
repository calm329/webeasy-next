import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormField = {
  name: string;
  type: "text" | "email" | "image" | "textarea" | "color";
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

export type TSection = "Hero" | "Banner";

export type TFields =
  | "logo"
  | "businessName"
  | "ctaLink"
  | "imageUrl"
  | "heading"
  | "subheading"
  | "cta"
  | "title"
  | "primary"
  | "secondary"
  | "name"
  | "avatar"
  | "email"
  | null;

export type TMeta = {
  title: string;
  description: string;
};

export type TTabs = "General" | "Security";
