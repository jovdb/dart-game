"use client";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { CSSProperties, PropsWithChildren } from "react";
import { clsx } from "clsx";

import styles from "./CardFace.module.css";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export default function CardFace({
  children,
  className,
  style,
}: PropsWithChildren<{
  className?: string | undefined;
  style?: CSSProperties | undefined;
}>) {
  const classNames = clsx(styles["card-face"], className);

  const isDarkMode = useIsDarkMode();
  const background = isDarkMode ? "#e8e8e8" : "#f6f6f6";

  return (
    <AspectRatio.Root
      ratio={64 / 89}
      className={classNames}
      style={{ background, ...style }}
    >
      {children}
    </AspectRatio.Root>
  );
}
