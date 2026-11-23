const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ size = 20, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base} {...rest}>
      {children}
    </svg>
  );
}

export const IconSearch = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </Svg>
);

export const IconBag = (props) => (
  <Svg {...props}>
    <path d="M5.5 8.5h13l-1 11.5h-11z" />
    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
  </Svg>
);

export const IconMenu = (props) => (
  <Svg {...props}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
);

export const IconClose = (props) => (
  <Svg {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const IconArrowLeft = (props) => (
  <Svg {...props}>
    <path d="M19 12H5" />
    <path d="m11 6-6 6 6 6" />
  </Svg>
);

export const IconArrowRight = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconArrowDown = (props) => (
  <Svg {...props}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </Svg>
);

export const IconPlus = (props) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconMinus = (props) => (
  <Svg {...props}>
    <path d="M5 12h14" />
  </Svg>
);

export const IconTrash = (props) => (
  <Svg {...props}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </Svg>
);

export const IconCheck = (props) => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
);

export const IconTruck = (props) => (
  <Svg {...props}>
    <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </Svg>
);

export const IconShield = (props) => (
  <Svg {...props}>
    <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const IconWatch = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="5.5" />
    <path d="M12 9v3l2 1.5M9.5 6.5 10 3h4l.5 3.5M9.5 17.5 10 21h4l.5-3.5" />
  </Svg>
);

export const IconSparkle = (props) => (
  <Svg {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" />
  </Svg>
);

export const IconInstagram = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </Svg>
);

export const IconMail = (props) => (
  <Svg {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);

export const IconPhone = (props) => (
  <Svg {...props}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1.4-1.1 2.5-2.5 2.5C10.4 19.5 4.5 13.6 4 6a2.5 2.5 0 0 1 2.5-2.5z" />
  </Svg>
);

export const IconPin = (props) => (
  <Svg {...props}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);
