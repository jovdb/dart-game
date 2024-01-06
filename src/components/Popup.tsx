"use client";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useIsDarkMode } from "../hooks/useIsDarkMode";

export function Popup({
  isOpen,
  onClose,
  onAnimationStart,
  onAnimationEnd,
  animationDuration = 320,
  children,
}: PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  animationDuration?: number;
}>) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (!isOpen) return; // No animation at load
    }
    onAnimationStart?.();
    let timer = setTimeout(() => {
      onAnimationEnd?.();
      timer = 0;
    }, animationDuration) as unknown as number;
    return () => {
      if (timer) {
        clearTimeout(timer);
        onAnimationEnd?.();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onAnimationEnd, onAnimationStart]);

  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? "#ccc" : "#fff";

  return (
    <div
      style={{
        position: "absolute",
        background: backgroundColor,
        left: -1,
        right: -1,
        height: "100%",
        borderBottom: "1px solid black",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        transition: `transform ${animationDuration}ms ease-in-out`,
        transform: `translateY(${isOpen ? "0" : "110%"})`,
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </div>
      <span
        style={{
          position: "absolute",
          display: "inline-block",
          top: "1em",
          right: "1em",
          width: 32,
          height: 32,
        }}
        onClick={async (e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <svg
          width={32}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 41.756 41.756"
        >
          <path
            d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
		c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
		C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
		c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"
          />
        </svg>
      </span>
    </div>
  );
}
