"use client";
import { Fragment } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { ChefHatIcon } from "lucide-react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import WidgetModal from "../ui/modal/widget-modal";
import { useState } from "react";

export default function EditWebsiteHeader() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="mt-5 flex hidden sm:block lg:ml-5 lg:mr-5 lg:mt-0">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Back"
        ></nav>
      </div>
    </div>
  );
}
