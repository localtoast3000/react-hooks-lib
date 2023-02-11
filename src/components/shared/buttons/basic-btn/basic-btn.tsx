import styles from './basic-btn.module.css';
import type { AnyProps } from '@/types/props';

export default function BasicBtn({ className, children, ...props }: AnyProps) {
  return (
    <button
      className={`${styles.btn} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
