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

export type TSection = "Hero" | "Banner"|"Services";

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
  openedSlide:"Customize"|"Font"|null,
  selectedFont: string;
  focusedField:TFields | null;
  subdomain:string;
  status: string;
  iPosts: Array<{
    id: string;
    media_url: string;
    permalink: string;
    caption: string;
    media_type: string;
    username: string;
  }>;
  aiContent: {
    banner: TBanner

    hero: THero;
    services: TServices;
    colors: {
      primary: string;
      secondary: string;
    };
  };

  editable: boolean;
  meta: {
    title: string;
    description: string;
  };
}


export type TServices = {
  show:boolean;
  title: string;
  description: string;
  list: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}

export type TBanner = {
 
    logo: {
      link: string;
      alt: string;
      show: boolean;
    };
    businessName: string;

    button: {
      show: boolean;
      list: Array<{
        name:string;
        type: "External" | "Section";
        value: string;
        label: string;
      }>;
    };
 
};

export type THero ={
  heading: string;
  subheading: string;
  image: {
    heroImagePrompt: string;
    imageId: string;
    imageUrl: string;
    alt: string;
    show: boolean;
  };
  button: {
    show: boolean;
    list: Array<{
      name:string;
      type: "External" | "Section";
      value: string;
      label: string;
    }>;
  };
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

export type TColors = {
  primary: string;
  secondary: string;
};

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

export type TSite = {
  id: string;
  subdomain: string;
  title: string;
  description: string;
  userId: string | null;
  templateId: string;
  logo: string | null;
  posts: string;
  aiResult: string;
  createdAt: Date;
  updatedAt: Date;
};
