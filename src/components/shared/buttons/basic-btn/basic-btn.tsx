import styles from './basic-btn.module.css';
import { useAppEvents } from '@/hooks/events/providers/app-events';
import type { AnyProps } from '@/types/props';

export default function BasicBtn({
  eventId,
  className,
  children,
  listeners,
  ...props
}: AnyProps) {
  const { addEventListeners } = useAppEvents();

  return (
    <button
      ref={(target) =>
        addEventListeners({
          target,
          eventId,
          types: listeners,
        })
      }
      className={`${styles.btn} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
