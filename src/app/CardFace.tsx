"use client";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { CSSProperties, PropsWithChildren } from "react";
import { clsx } from "clsx";

import styles from "./CardFace.module.css";

export default function CardFace({
  children,
  className,
  style,
}: PropsWithChildren<{
  className?: string | undefined;
  style?: CSSProperties | undefined;
}>) {
  const classNames = clsx(styles["card-face"], className);

  return (
    <AspectRatio.Root ratio={64 / 89} className={classNames} style={style}>
      {children}
    </AspectRatio.Root>
  );
}
