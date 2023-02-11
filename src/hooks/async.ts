import { useEffect } from 'react';

/**
 *
 * @param cb - Callback function to be called on every interval
 * @param time - Interval frequency in milliseconds
 */
export function useInterval(cb: Function, time: number) {
  useEffect(() => {
    const interval = setInterval(cb, time);
    return () => clearInterval(interval);
  });
}
/**
 *
 * @param cb - Callback function to be called when waiting time is up
 * @param time - Wait time in milliseconds
 */
export function useTimeout(cb: Function, time: number) {
  useEffect(() => {
    const timeout = setTimeout(cb, time);
    return () => clearTimeout(timeout);
  });
}
