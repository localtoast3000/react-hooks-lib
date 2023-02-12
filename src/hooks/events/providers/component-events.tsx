import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

const ComponentEventsContext = createContext<any>(undefined);

function ComponentEventsProvider({ children }: { children: ReactNode }) {
  const [componentEvents, setComponentEvents] = useState<any>({});

  useEffect(() => {
    let handler = (e: any) => e;

    Object.entries(componentEvents).forEach(([id, component]: any) => {
      handler = async (e: any) => {
        let tempComponentEvents = componentEvents;

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

        await new Promise((resolve) => {
          // Gives the event time to be mounted
          setTimeout(() => {
            resolve(
              Object.entries(tempComponentEvents).forEach(([key, val]: any) => {
                tempComponentEvents = {
                  ...componentEvents,
                  [key]: {
                    ref: val.ref,
                    types: val.types,
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
        component.ref.addEventListener(type, handler);
      });
    });
    return () =>
      Object.values(componentEvents).forEach((component: any) => {
        component.types.forEach((type: string) => {
          component.ref.removeEventListener(type, handler);
        });
      });
  }, []);

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
    <ComponentEventsContext.Provider
      value={{ addEventListeners, events: componentEvents }}>
      {children}
    </ComponentEventsContext.Provider>
  );
}

function useComponentEvents() {
  const context = useContext(ComponentEventsContext);
  if (context === undefined)
    throw new Error('useComponentEvents must be use within a ComponentEventsProvider');
  return context;
}

export { ComponentEventsProvider, useComponentEvents };
