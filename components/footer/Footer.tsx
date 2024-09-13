import { cn } from "@/lib/utils";
import React from "react";

export type FooterProps = {
  className?: string;
};
const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "h-8 flex-none border-t flex justify-center items-center px-2 sm:px-6",
        className
      )}
    >
      <span className="text-xs">
        This not a production app, this only use for learning and testing.
      </span>
    </footer>
  );
};

export default Footer;
