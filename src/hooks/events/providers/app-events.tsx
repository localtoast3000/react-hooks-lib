import { createContext, ReactNode, useState, useRef, useEffect, useContext } from 'react';

interface AddEventListenersProps {
  target: any;
  eventId: string;
  types: string[];
}

interface AppEvent {
  target: HTMLElement | null;
  types: string[] | [];
  type: string | null;
  [key: string]: any;
}

interface AppEvents {
  [id: string]: AppEvent;
}

interface ContextValue {
  addEventListeners: Function;
  events: AppEvents;
}

const AppEventsContext = createContext<undefined | ContextValue>(undefined);

function AppEventsProvider({ children }: { children: ReactNode }) {
  const eventSkeleton: AppEvent = {
    target: null,
    type: null,
    types: [],
  };
  const appEvents = useRef<AppEvents>({
    initial: eventSkeleton,
  });
  const [events, setEvents] = useState(appEvents.current);

  useEffect(() => {
    let handler: Function = () => {};

    if (appEvents.current.initial) {
      // Removes initial event object
      delete appEvents.current.initial;
    }

    Object.entries(appEvents.current).forEach(([id, component]) => {
      handler = async (e: any) => {
        await new Promise((resolve) => {
          resolve(
            (appEvents.current = {
              ...appEvents.current,
              [id]: e,
            })
          );
        }).then(() => setEvents(appEvents.current));

        await new Promise((resolve) => {
          // Gives the event time to be mounted
          setTimeout(() => {
            resolve(
              Object.entries(appEvents.current).forEach(([key, val]) => {
                appEvents.current = {
                  ...appEvents.current,
                  [key]: {
                    ...eventSkeleton,
                    target: val.target,
                    types: val.types,
                  },
                };
              })
            );
          }, 0);
        }).then(() => setEvents(appEvents.current));
      };

      component.types.forEach((type: string) => {
        //@ts-ignore
        component.target.addEventListener(type, handler);
      });
    });
    return () =>
      Object.values(appEvents.current).forEach((component) => {
        component.types.forEach((type: string) => {
          //@ts-ignore
          component.target.removeEventListener(type, handler);
        });
      });
  }, []);

  const addEventListeners = ({ target, eventId, types }: AddEventListenersProps) => {
    if (appEvents.hasOwnProperty(eventId)) return;
    appEvents.current = {
      ...appEvents.current,
      [eventId]: {
        target,
        types,
        type: null,
      },
    };
  };

  return (
    <AppEventsContext.Provider value={{ addEventListeners, events }}>
      {children}
    </AppEventsContext.Provider>
  );
}

/**
 *
 * @returns addEventListener function and component events object
 */
function useAppEvents() {
  const context = useContext(AppEventsContext);
  if (context === undefined)
    throw new Error('useAppEvents must be use within a AppEventsProvider');
  return context;
}

export { AppEventsProvider, useAppEvents };
