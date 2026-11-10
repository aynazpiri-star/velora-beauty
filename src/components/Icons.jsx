const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ size = 20, children, strokeWidth, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
      {...base}
      strokeWidth={strokeWidth || base.strokeWidth}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </Svg>
);

export const BagIcon = (props) => (
  <Svg {...props}>
    <path d="M6.5 8h11l1 11.5a1.5 1.5 0 0 1-1.5 1.6H7a1.5 1.5 0 0 1-1.5-1.6Z" />
    <path d="M9 8V6.6a3 3 0 0 1 6 0V8" />
  </Svg>
);

export const UserIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
  </Svg>
);

export const HeartIcon = ({ filled = false, ...props }) => (
  <Svg {...props} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3c0 5-7.5 9.4-7.5 9.4Z" />
  </Svg>
);

export const MenuIcon = (props) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);

export const CloseIcon = (props) => (
  <Svg {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const ArrowLeftIcon = (props) => (
  <Svg {...props}>
    <path d="M19 12H5" />
    <path d="m11 6-6 6 6 6" />
  </Svg>
);

export const ArrowRightIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const ChevronDownIcon = (props) => (
  <Svg {...props}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const ChevronLeftIcon = (props) => (
  <Svg {...props}>
    <path d="m14 6-6 6 6 6" />
  </Svg>
);

export const ChevronRightIcon = (props) => (
  <Svg {...props}>
    <path d="m10 6 6 6-6 6" />
  </Svg>
);

export const StarIcon = ({ filled = true, ...props }) => (
  <Svg {...props} fill={filled ? 'currentColor' : 'none'} strokeWidth={1.2}>
    <path d="m12 4 2.5 5.1 5.5.8-4 3.9.95 5.5L12 16.7 7.05 19.3l.95-5.5-4-3.9 5.5-.8Z" />
  </Svg>
);

export const TruckIcon = (props) => (
  <Svg {...props}>
    <path d="M3 7.5h10v9H3z" />
    <path d="M13 11h4l4 3.2v2.3h-8" />
    <circle cx="7" cy="17.5" r="1.7" />
    <circle cx="17.5" cy="17.5" r="1.7" />
  </Svg>
);

export const ShieldIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3.5 19 6v6c0 4-3 6.7-7 8.5-4-1.8-7-4.5-7-8.5V6Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
);

export const LockIcon = (props) => (
  <Svg {...props}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" />
    <path d="M8.3 10.5V8a3.7 3.7 0 0 1 7.4 0v2.5" />
  </Svg>
);

export const SupportIcon = (props) => (
  <Svg {...props}>
    <path d="M4 12a8 8 0 0 1 16 0v4.2a3 3 0 0 1-3 3h-2" />
    <path d="M4 12.4h2.4a1 1 0 0 1 1 1v3.2a1 1 0 0 1-1 1H5.2a1.2 1.2 0 0 1-1.2-1.2Z" />
    <path d="M20 12.4h-2.4a1 1 0 0 0-1 1v3.2a1 1 0 0 0 1 1h1.2a1.2 1.2 0 0 0 1.2-1.2Z" />
  </Svg>
);

export const CheckIcon = (props) => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
);

export const PlusIcon = (props) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const MinusIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
  </Svg>
);

export const TrashIcon = (props) => (
  <Svg {...props}>
    <path d="M4.5 7h15M9.5 7V5.5h5V7M6.5 7l1 12.5h9L17.5 7" />
    <path d="M10.5 10.5v5.5M13.5 10.5v5.5" />
  </Svg>
);

export const SparkleIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3.5c.7 4.2 2.3 5.8 6.5 6.5-4.2.7-5.8 2.3-6.5 6.5-.7-4.2-2.3-5.8-6.5-6.5 4.2-.7 5.8-2.3 6.5-6.5Z" />
    <path d="M18 16.5c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8Z" />
  </Svg>
);

export const TagIcon = (props) => (
  <Svg {...props}>
    <path d="M12.5 3.5H20v7.5l-8.6 8.6a2 2 0 0 1-2.8 0l-4.7-4.7a2 2 0 0 1 0-2.8Z" />
    <circle cx="16.4" cy="7.6" r="1.3" fill="currentColor" stroke="none" />
  </Svg>
);

export const ClockIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.6V12l3 2" />
  </Svg>
);

export const ReturnIcon = (props) => (
  <Svg {...props}>
    <path d="M4 11a8 8 0 1 1 2.4 5.7" />
    <path d="M4 6.5V11h4.5" />
  </Svg>
);

export const MapPinIcon = (props) => (
  <Svg {...props}>
    <path d="M12 21s6.5-5.5 6.5-10.4a6.5 6.5 0 1 0-13 0C5.5 15.5 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.4" />
  </Svg>
);

export const PhoneIcon = (props) => (
  <Svg {...props}>
    <path d="M6.2 3.8h2.6l1.4 3.5-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 3.5 1.4v2.6a2 2 0 0 1-2.2 2A15.500 15.500 0 0 1 4.2 6a2 2 0 0 1 2-2.2Z" />
  </Svg>
);

export const MailIcon = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.4" />
    <path d="m4.5 7 7.5 5.6L19.5 7" />
  </Svg>
);

export const InstagramIcon = (props) => (
  <Svg {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4.6" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

export const TelegramIcon = (props) => (
  <Svg {...props}>
    <path d="M20.5 4.5 3.8 10.6c-.9.3-.9 1.5 0 1.8l4 1.3 1.5 4.5c.3.8 1.3 1 1.9.4l2.3-2.2 3.8 2.8c.7.5 1.7.1 1.9-.8l2-12c.2-1-.8-1.7-1.7-1.3Z" />
    <path d="m8 13.7 9-6.2-6.6 7.4" />
  </Svg>
);

export const WhatsappIcon = (props) => (
  <Svg {...props}>
    <path d="M20 11.7a8 8 0 0 1-11.9 7L4.5 20l1.4-3.5A8 8 0 1 1 20 11.7Z" />
    <path d="M9.2 9.3c.4 2 2 3.6 4 4l.9-1.2 1.5.7c-.2 1.3-1.3 2-2.6 1.8-2.6-.4-4.7-2.5-5-5.1-.2-1.3.6-2.4 1.8-2.6l.7 1.5Z" />
  </Svg>
);

export const SlidersIcon = (props) => (
  <Svg {...props}>
    <path d="M4 7.5h6M14 7.5h6M4 16.5h10M18 16.5h2" />
    <circle cx="12" cy="7.5" r="2" />
    <circle cx="16" cy="16.5" r="2" />
  </Svg>
);

export const SparklineIcon = (props) => (
  <Svg {...props}>
    <path d="M3 17l5-6 4 3 4-6 5 5" />
  </Svg>
);

export const iconMap = {
  shield: ShieldIcon,
  truck: TruckIcon,
  lock: LockIcon,
  support: SupportIcon,
};
