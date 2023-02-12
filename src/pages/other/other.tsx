import { useComponentEvents } from '@/hooks/events/providers/component-events';
import { useState, useEffect } from 'react';

export default function Other() {
  const { events } = useComponentEvents();
  const [barStyle, setBarStyle] = useState({
    width: 60,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'black',
    transition: 'background-color 0.2s ease-in',
  });

  useEffect(() => {
    const basicBtnEvent = events.basicButton?.event?.type;
    console.log(events);
    if (basicBtnEvent === 'mousedown') {
      setBarStyle({
        ...barStyle,
        backgroundColor: 'grey',
      });
    } else if (basicBtnEvent === 'mouseout' || basicBtnEvent === 'mouseup') {
      setBarStyle({
        ...barStyle,
        backgroundColor: 'black',
      });
    }
  }, [events.basicButton]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <div style={barStyle} />
      <div style={{ ...barStyle, marginTop: 15, marginBottom: 15 }} />
      <div style={barStyle} />
    </div>
  );
}
