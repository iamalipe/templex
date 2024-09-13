import Link from "next/link";
import React from "react";

import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { cn } from "@/lib/utils";
import AvatarMenu from "../avatar-menu/AvatarMenu";

export type TopNavProps = {
  className?: string;
};
const TopNav = ({ className }: TopNavProps) => {
  return (
    <nav className={cn("bg-background border-b flex-none", className)}>
      <div className="flex justify-between h-16 sm:px-6 px-4">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-primary">Templex</span>
          </Link>
        </div>
        {/* Nav links */}
        <div className="sm:ml-6 ml-2 gap-4 flex items-center sm:gap-6">
          <ThemeToggle />
          <AvatarMenu />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
