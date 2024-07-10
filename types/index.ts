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

export type TSection =
  | "Hero"
  | "Banner"
  | "Services"
  | "Posts"
  | "Gallery"
  | "Features"
  | "Description"
  | "Title"
  | "Image Gallery"
  | "Partners"
  | "Testimonials"
  |any;

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
  | "description"
  | "price"
  | "featureTitle"
  | "featureDescription"
  | string
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
  id: string;
  generate: {
    progress: number;
    generating: boolean;
    field: TFields | null;
  };
  openedSlide: "Customize" | "Font" | null;
  selectedFont: string;
  focusedField: TFields | null;
  subdomain: string;
  status: string;
  view: "Mobile" | "Tablet" | "Desktop";
  iPosts: TPosts;
  aiContent: TAiContent

  editable: boolean;
  meta: {
    title: string;
    description: string;
  };
}

export type TAiContent = {
  cta:any;
  faq:any
  footer:any
  header:any
  heroSection:any
  logoClouds:any
  newsLetter:any
  pricing:any
  stats:any
  team:any
  testimonialsSection:any
  productId?: string;
  banner: TBanner;
  hero: THero;
  services: TServices;
  colors: {
    primary: string;
    secondary: string;
  };
  blog:TBlogs,
  testimonials: {
    show: boolean;
    list: Array<{
      id: string;
      name: string;
      avatar: string;
      content: string;
      gender:string
    }>;
  };
  partners: {
    show: boolean;
    title: string;
    description: string;
    list: Array<{
      id: string;
      name: string;
      logo: string;
      link: string;
    }>;
  };
  contact:TContact
  gallery: { show: boolean; list: Array<string> };
  features?: Array<TFeature>;
  description?: string;
  images?: {
    primary: { Large: { Height: number; URL: string; Width: number } };
    variant: Array<{
      Large: { Height: number; URL: string; Width: number };
      Medium: { Height: number; URL: string; Width: number };
      Small: { Height: number; URL: string; Width: number };
    }>;
  };
  price?: string;
  title?: string;
  businessType?: string;
  location?: string;
};

export type TBlogs ={
  title:string,
  description:string,
  posts:Array<{
    id: number,
    title: string,
    href: string,
    description:string,
    imageUrl:string,
    date: string,
    datetime: string,
    category: { title:  string, href: string },
    author: {
      name: string
      role: string
      href: string
      imageUrl:string,
    },
  }>
}

export type TPosts = {
  show: boolean;
  limit: number;
  showHash: boolean;
  list: Array<{
    id: string;
    media_url: string;
    permalink: string;
    caption: string;
    media_type: string;
    username: string;
    timestamp: string;
  }>;
};

export type TFeature = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export type TContact = {
  // id: string;
  // image: string;
  title: string;
  description: string;
  address:{
    label: string;
    value: string;
  },
  telephone:{
    label: string;
    value: string;
  },
  email:{
    label: string;
    value: string;
  }
};

export type TServices = {
  show: boolean;
  title: string;
  description: string;
  list: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
  }>;
};

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
      name: string;
      type: "External" | "Section";
      link: string;
      label: string;
    }>;
  };
};

export type THero = {
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
      name: string;
      type: "External" | "Section";
      link: string;
      label: string;
    }>;
  };
};

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
  posts: string | null;
  aiResult: string;
  createdAt: Date;
  type: string;
  updatedAt: Date;
};

export type TSiteType = "Instagram" | "Custom" | "Amazon";
