import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({ children, className }) {
  return (
    <div className={cn("relative w-full bg-white dark:bg-black", className)}>
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#111_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#555_1px,transparent_1px)]"
        )}
      />

      {/* optional fade mask */}
      <div className="pointer-events-none absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />

      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
