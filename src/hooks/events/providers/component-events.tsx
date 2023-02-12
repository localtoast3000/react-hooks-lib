import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

interface AddEventListenersProps {
  ref: any;
  id: string;
  types: string[];
}

interface ComponentEvent {
  ref: HTMLElement;
  types: string[];
  event: null | Event;
}

interface ComponentEvents {
  [id: string]: ComponentEvent;
}

interface ContextValue {
  addEventListeners: Function;
  events: ComponentEvents;
}

const ComponentEventsContext = createContext<undefined | ContextValue>(undefined);

function ComponentEventsProvider({ children }: { children: ReactNode }) {
  const [componentEvents, setComponentEvents] = useState<ComponentEvents | {}>({});

  useEffect(() => {
    let handler: Function = () => {};

    Object.entries(componentEvents).forEach(([id, component]) => {
      handler = async (e: Event) => {
        let tempComponentEvents = componentEvents;

        await new Promise((resolve) => {
          resolve(
            setComponentEvents({
              ...componentEvents,
              [id]: {
                ...component,
                event: e,
              },
            })
          );
        });

        await new Promise((resolve) => {
          // Gives the event time to be mounted
          setTimeout(() => {
            resolve(
              Object.entries(tempComponentEvents).forEach(([key, val]) => {
                tempComponentEvents = {
                  ...componentEvents,
                  [key]: {
                    ...val,
                    event: null,
                  },
                };
              })
            );
          }, 0);
        }).then(() => {
          setComponentEvents(tempComponentEvents);
        });
      };

      component.types.forEach((type: string) => {
        //@ts-ignore
        component.ref.addEventListener(type, handler);
      });
    });
    return () =>
      Object.values(componentEvents).forEach((component) => {
        component.types.forEach((type: string) => {
          //@ts-ignore
          component.ref.removeEventListener(type, handler);
        });
      });
  }, []);

  const addEventListeners = ({ ref, id, types }: AddEventListenersProps) => {
    if (componentEvents.hasOwnProperty(id)) return;
    setComponentEvents((state: ComponentEvents) => {
      state[id] = {
        ref,
        types,
        event: null,
      };
      return state;
    });
  };

  return (
    <ComponentEventsContext.Provider
      value={{ addEventListeners, events: componentEvents }}>
      {children}
    </ComponentEventsContext.Provider>
  );
}

/**
 *
 * @returns addEventListener function and component events object
 */
function useComponentEvents() {
  const context = useContext(ComponentEventsContext);
  if (context === undefined)
    throw new Error('useComponentEvents must be use within a ComponentEventsProvider');
  return context;
}

export { ComponentEventsProvider, useComponentEvents };
