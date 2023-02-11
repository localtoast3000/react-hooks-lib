import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

const WindowEventContext = createContext<Event | undefined>(undefined);

/**
 *
 * @param props
 * @param {string[]} props.events - Discribes the events that are to be loaded onto the window event listener
 * @param {ReactNode} props.children - The React node that will have the events provided to
 * @returns The WindowEventContext.Provider that will provide the fired event to the useWindowEvent() hook
 */
function WindowEventProvider({
  events,
  children,
}: {
  events: string[];
  children: ReactNode;
}) {
  const [event, setEvent] = useState<Event | undefined>(undefined);

  useEffect(() => {
    events.forEach((eventType) => window.addEventListener(eventType, setEvent));
    return () =>
      events.forEach((eventType) => window.removeEventListener(eventType, setEvent));
  }, []);

  return (
    <WindowEventContext.Provider value={event}>{children}</WindowEventContext.Provider>
  );
}

/**
 *
 * @returns An event object relating to the event that was fired, only events that are discribed on the WindowEventProvider will be loaded onto the window event listener
 */
function useWindowEvent() {
  const context = useContext(WindowEventContext);
  if (context === undefined)
    throw new Error('useWindowEvent must be use within a WindowEventProvider');
  return context;
}

export { WindowEventProvider, useWindowEvent };
