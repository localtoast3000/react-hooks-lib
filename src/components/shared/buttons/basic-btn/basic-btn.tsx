import styles from './basic-btn.module.css';
import { useComponentEvents } from '@/hooks/events/providers/component-events';
import type { AnyProps } from '@/types/props';

export default function BasicBtn({ className, children, ...props }: AnyProps) {
  const { addEventListeners } = useComponentEvents();

  return (
    <button
      ref={(ref) =>
        addEventListeners({
          ref,
          id: 'basicButton',
          types: ['mouseover', 'mouseout', 'mousedown', 'mouseup', 'click'],
        })
      }
      className={`${styles.btn} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
