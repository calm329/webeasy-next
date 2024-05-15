import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormField = {
  name: string;
  type: "text" | "email" | "image" | "textarea" | "color" | "button";
  label?: string;
  alt?: string;
  defaultValue?: string;
  placeholder?: string;
  validation?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    link?: boolean;
  };
  show?: boolean;
  children?: Array<{
    name: string;
    type: "External" | "Section";
    label: string;
    defaultValue: string;
    placeholder: string;
    link: string;
    validation?: {
      required?: boolean;
      maxLength?: number;
      minLength?: number;
      pattern?: string;
      link?: boolean;
    };
  }>;
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

export type TTemplateName =
  | "Basic template"
  | "Blue-Based template"
  | "Post-Based template"
  | "General template";

export interface AppState {
  status: string;
  iPosts: any[];
  aiContent: any;
  logo: {
    link: string;
    alt: string;
  };
  editable: boolean;
  meta: TMeta;
}

export type TData = Partial<{
  logo: string;
  businessName: string;
  ctaLink: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  cta: string;
}>;

export type TUser = {
  id: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type TTemplate = {
  id: string;
  name: string;
  previewUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAccessToken = {
  id: string;
  token: string;
  userId: string;
  siteId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
};
