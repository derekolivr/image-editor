import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    waitFor: number,
) {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise(resolve => {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
}
