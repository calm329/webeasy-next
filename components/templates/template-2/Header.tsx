"use client";

import Link from "next/link";
// import {
//   Popover,
//   PopoverButton,
//   PopoverOverlay,
//   PopoverPanel,
//   Transition,
//   TransitionChild,
// } from "@headlessui/react";
// import clsx from "clsx";

import { Button } from "./Button";
import { Container } from "./Container";
import Image from "next/image";

// function MobileNavLink({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <PopoverButton as={Link} href={href} className="block w-full p-2">
//       {children}
//     </PopoverButton>
//   );
// }

// function MobileNavIcon({ open }: { open: boolean }) {
//   return (
//     <svg
//       aria-hidden="true"
//       className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
//       fill="none"
//       strokeWidth={2}
//       strokeLinecap="round"
//     >
//       <path
//         d="M0 1H14M0 7H14M0 13H14"
//         className={clsx(
//           "origin-center transition",
//           open && "scale-90 opacity-0",
//         )}
//       />
//       <path
//         d="M2 2L12 12M12 2L2 12"
//         className={clsx(
//           "origin-center transition",
//           !open && "scale-90 opacity-0",
//         )}
//       />
//     </svg>
//   );
// }

// function MobileNavigation() {
//   return (
//     <Popover>
//       <PopoverButton
//         className="ui-not-focus-visible:outline-none relative z-10 flex h-8 w-8 items-center justify-center"
//         aria-label="Toggle Navigation"
//       >
//         {({ open }: any) => <MobileNavIcon open={open} />}
//       </PopoverButton>
//       <Transition>
//         <TransitionChild
//           enter="duration-150 ease-out"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="duration-150 ease-in"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <PopoverOverlay className="fixed inset-0 bg-slate-300/50" />
//         </TransitionChild>
//         <TransitionChild
//           enter="duration-150 ease-out"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="duration-100 ease-in"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           <PopoverPanel className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5">
//             <MobileNavLink href="#features">Features</MobileNavLink>
//             <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
//             <MobileNavLink href="#pricing">Pricing</MobileNavLink>
//             <hr className="m-2 border-slate-300/40" />
//             <MobileNavLink href="/login">Sign in</MobileNavLink>
//           </PopoverPanel>
//         </TransitionChild>
//       </Transition>
//     </Popover>
//   );
// }

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-10 flex justify-between">
          <div className="flex items-center md:gap-x-12 ">
            <Link
              href="#"
              aria-label="Home"
              className="flex items-center gap-5"
            >
              <Image
                src={
                  "https://xhq5zxhb2o7dgubv.public.blob.vercel-storage.com/2weWEVnPETmQLpQx52_W1-Ofz4wnOvkqM6307M1pfxfkLAZXXBbX.jpeg"
                }
                alt=""
                height={100}
                width={100}
              />
              Elegant Blossoms
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button href="/register" color="blue">
              <span>Explore Now</span>
            </Button>
            <div className="-mr-1 md:hidden">{/* <MobileNavigation /> */}</div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
