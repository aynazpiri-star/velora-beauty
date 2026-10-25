const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const Svg = ({ children, size = 20, className = '', viewBox = '0 0 24 24' }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    aria-hidden="true"
    className={className}
    {...base}
  >
    {children}
  </svg>
)

export const IconDiamond = (p) => (
  <Svg {...p}>
    <path d="M7 4h10l4 5.5L12 20 3 9.5 7 4Z" />
    <path d="M3 9.5h18M9.5 4 7 9.5 12 20l5-10.5L14.5 4" />
  </Svg>
)

export const IconTruck = (p) => (
  <Svg {...p}>
    <path d="M2.5 7.5h9.5v9H2.5zM12 10.5h4l3 3v3h-7z" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="16.5" cy="18" r="1.6" />
  </Svg>
)

export const IconGift = (p) => (
  <Svg {...p}>
    <path d="M3.5 9.5h17V20h-17zM3.5 9.5 5 6h14l1.5 3.5M12 9.5V20" />
    <path d="M12 6c-1.6-2.6-5-2.2-5 0 0 1.2 2.4 1.6 5 0Zm0 0c1.6-2.6 5-2.2 5 0 0 1.2-2.4 1.6-5 0Z" />
  </Svg>
)

export const IconRefresh = (p) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 4.5V9h-4.5" />
  </Svg>
)

export const IconLeaf = (p) => (
  <Svg {...p}>
    <path d="M20 4c0 9-5.2 13.5-11 13.5A5 5 0 0 1 4 12.5C4 6.5 10.5 4 20 4Z" />
    <path d="M4 20c1.5-4.5 4.5-8 9-10.5" />
  </Svg>
)

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 19 6v6c0 4.2-3 7-7 8.5-4-1.5-7-4.3-7-8.5V6l7-2.5Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
)

export const IconSparkle = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7L13.7 12.5 12 18l-1.7-5.5L4.8 10.7 10.3 9 12 3.5Z" />
  </Svg>
)

export const IconUsers = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M16 6.2a3 3 0 0 1 0 5.8M17.5 14.8c2 .6 3.3 2.3 3.3 4.7" />
  </Svg>
)

export const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Svg>
)

export const IconUser = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" />
  </Svg>
)

export const IconHeart = ({ filled = false, ...p }) => (
  <Svg {...p}>
    <path
      d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6C19.5 15.6 12 20 12 20Z"
      fill={filled ? 'currentColor' : 'none'}
    />
  </Svg>
)

export const IconBag = (p) => (
  <Svg {...p}>
    <path d="M5 8h14l-1.2 12h-11.6L5 8Z" />
    <path d="M9 8V7a3 3 0 0 1 6 0v1" />
  </Svg>
)

export const IconStar = ({ filled = true, half = false, ...p }) => (
  <svg
    width={p.size ?? 12}
    height={p.size ?? 12}
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={p.className ?? ''}
  >
    <defs>
      <linearGradient id="halfStar">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5L2.6 9.6l6.5-.9L12 2.8Z"
      fill={half ? 'url(#halfStar)' : filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </Svg>
)

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
)

export const IconChevronLeft = (p) => (
  <Svg {...p}>
    <path d="m14 6-6 6 6 6" />
  </Svg>
)

export const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="m10 6 6 6-6 6" />
  </Svg>
)

export const IconClose = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const IconPlus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const IconMinus = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
)

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
)

export const IconMenu = (p) => (
  <Svg {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </Svg>
)

export const IconInstagram = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconFacebook = (p) => (
  <Svg {...p}>
    <path d="M14.5 8.5h2.2V5.6h-2.4c-2.1 0-3.4 1.3-3.4 3.5v1.6H8.7v3h2.2V21h3.1v-7.3h2.4l.4-3h-2.8V9.4c0-.6.2-.9.5-.9Z" />
  </Svg>
)

export const IconPinterest = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10.4 20c.9-2.2 1.5-4.4 1.9-6.3M9 10.6c0-1.9 1.4-3.3 3.4-3.3 1.9 0 3.2 1.1 3.2 3 0 2.3-1.2 4-2.9 4-.9 0-1.6-.7-1.4-1.7" />
  </Svg>
)

export const IconYoutube = (p) => (
  <Svg {...p}>
    <rect x="3" y="6.5" width="18" height="11" rx="3.2" />
    <path d="m10.5 9.8 4.5 2.2-4.5 2.2z" />
  </Svg>
)

export const IconTiktok = (p) => (
  <Svg {...p}>
    <path d="M14 4v9.4a3.1 3.1 0 1 1-3.1-3.1c.3 0 .6 0 .8.1" />
    <path d="M14 4c.3 2.2 1.7 3.6 4 3.8" />
  </Svg>
)
