import { useComponentEvents } from '@/hooks/events/providers/component-events';

export default function Logo({
  className,
  scale = 1,
  shadow = 'dark',
}: {
  className: string;
  scale: number;
  shadow: string;
}) {
  const { addEventListeners } = useComponentEvents();

  scale < 0.1 && (scale = 1);

  return (
    <svg
      ref={(ref) =>
        addEventListeners({
          ref,
          id: 'logo',
          types: ['click', 'mouseover'],
        })
      }
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={20 * scale}
      height={32 * scale}
      viewBox='0 0 20 32'
      filter={`drop-shadow(0px 0px 2px ${
        shadow === 'light'
          ? 'var(--light-shadow)'
          : shadow === 'dark'
          ? 'var(--dark-shadow)'
          : 'transparent'
      })`}>
      <path
        d='M19.8571 6.25731L17.8571 1.25731C17.5534 0.498063 16.818 0 16.0001 0H4.00014C3.18227 0 2.44689 0.498063 2.1432 1.25731L0.143203 6.25731C-0.0477344 6.73387 -0.0477344 7.26613 0.143203 7.74269L2.1432 12.7427C2.44689 13.5019 3.18227 14 4.00014 14H5.00014C5.00014 15.1045 5.89564 16 7.00014 16H8.00014V16.7681C8.00014 19.1465 9.30139 21.3184 11.3146 22.3018C12.3541 22.8101 13.0001 23.8438 13.0001 24.9995C13.0001 26.5976 11.5978 28 9.99964 28C8.34583 28 7.00014 26.6543 7.00014 25C7.00014 23.8955 6.10464 23 5.00014 23C3.89564 23 3.00014 23.8955 3.00014 25C3.00014 28.8599 6.14027 32 9.99964 32C13.7941 32 17.0001 28.7939 17.0001 24.9995C17.0001 22.3032 15.4943 19.8926 13.0705 18.708C12.4201 18.3901 12.0001 17.6289 12.0001 16.7681V16H13.0001C14.1046 16 15.0001 15.1045 15.0001 14H16.0001C16.818 14 17.5534 13.5019 17.8571 12.7427L19.8571 7.74269C20.048 7.26613 20.048 6.73387 19.8571 6.25731ZM5.33352 11H3.22514L5.89177 3H8.00014L5.33352 11ZM9.72101 11H7.61264L10.2793 3H12.3876L9.72101 11ZM14.1085 11H12.0001L14.6668 3H16.7751L14.1085 11Z'
        fill='url(#paint0_linear_505_3)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_505_3'
          x1='0'
          y1='0'
          x2='0'
          y2='32'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#BC4E9C' />
          <stop
            offset='1'
            stopColor='#F80759'
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
