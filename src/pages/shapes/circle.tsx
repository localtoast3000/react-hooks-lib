import { useAppEvents } from '@/hooks/events/providers/app-events';
import { useState, useEffect } from 'react';

export default function Other() {
  const { events } = useAppEvents();
  const [circleStyle, setcircleStyle] = useState({
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: 'var(--purple)',
    transition: 'background-color 0.2s ease-in',
  });

  useEffect(() => {
    if (events.basicButton) {
      const basicBtnEvent = events.basicButton.type;
      if (basicBtnEvent === 'mousedown') {
        setcircleStyle({
          ...circleStyle,
          backgroundColor: 'green',
        });
      } else if (basicBtnEvent === 'mouseout' || basicBtnEvent === 'mouseup') {
        setcircleStyle({
          ...circleStyle,
          backgroundColor: 'var(--purple)',
        });
      }
    }
  }, [events]);

  return <div style={circleStyle}></div>;
}
