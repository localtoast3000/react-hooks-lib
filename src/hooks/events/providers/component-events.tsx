import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

const ComponentEventsContext = createContext<any>(undefined);

/**
 *
 * @param props
 * @param {string[]} props.events - Discribes the events that are to be loaded onto the component event listener
 * @param {ReactNode} props.children - The React node that will have the events provided to
 * @returns The ComponentEventsContext.Provider that will provide the fired event to the useComponentEvent() hook
 */
function ComponentEventsProvider({ children }: { children: ReactNode }) {
  const [componentEvents, setComponentEvents] = useState<any>({});

  useEffect(() => {
    let handler = (e: any) => e;

    Object.entries(componentEvents).forEach(([id, component]: any) => {
      handler = async (e: any) => {
        await new Promise((resolve) => {
          resolve(
            setComponentEvents({
              ...componentEvents,
              [id]: {
                ref: component.ref,
                types: component.types,
                event: e,
              },
            })
          );
        });

        Object.entries(componentEvents).forEach(([key, val]: any) => {
          setComponentEvents({
            ...componentEvents,
            [key]: {
              ref: val.ref,
              types: val.types,
              event: null,
            },
          });
        });
      };

      component.types.forEach((type: string) => {
        component.ref.addEventListener(type, handler);
      });
    });
    return () =>
      Object.values(componentEvents).forEach((component: any) => {
        component.types.forEach((type: string) => {
          component.ref.removeEventListener(type, handler);
        });
      });
  }, [componentEvents]);

  const addEventListeners = ({
    ref,
    id,
    types,
  }: {
    ref: any;
    id: string;
    types: string[];
  }) => {
    if (componentEvents.hasOwnProperty(id)) return;
    setComponentEvents((refs: any) => {
      refs[id] = {
        ref,
        types,
        event: null,
      };
      return refs;
    });
  };

  return (
    <ComponentEventsContext.Provider value={{ addEventListeners, componentEvents }}>
      {children}
    </ComponentEventsContext.Provider>
  );
}

/**
 *
 * @returns An event object relating to the event that was fired, only events that are discribed on the ComponentEventsProvider will be loaded onto the component event listener
 */
function useComponentEvents() {
  const context = useContext(ComponentEventsContext);
  if (context === undefined)
    throw new Error('useComponentEvents must be use within a ComponentEventsProvider');
  return context;
}

export { ComponentEventsProvider, useComponentEvents };
