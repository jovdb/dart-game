import { useEffect, useState } from "react";

const getIsDarkMode = () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function useIsDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode)

    const detectColorScheme = () => {
        setIsDarkMode(getIsDarkMode());
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectColorScheme);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', detectColorScheme);
        }
    }, []);

    return isDarkMode;
}