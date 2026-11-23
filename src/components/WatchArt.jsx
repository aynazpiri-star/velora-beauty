const LINK_H = 24
const LINK_GAP = 3

const braceletRows = (from, count, growing) => {
  const rows = []
  for (let i = 0; i < count; i += 1) {
    const progress = count > 1 ? i / (count - 1) : 0
    const width = growing ? 82 + progress * 24 : 106 - progress * 24
    rows.push({
      y: from + i * (LINK_H + LINK_GAP),
      width,
      key: `${from}-${i}`,
    })
  }
  return rows
}

const topRows = braceletRows(20, 17, true)
const bottomRows = braceletRows(724, 17, false)

function Link({ y, width, id }) {
  const x = 210 - width / 2
  return (
    <g key={id}>
      <rect
        x={x}
        y={y}
        width={width}
        height={LINK_H}
        rx="5"
        fill="url(#vg-link)"
        stroke="#6b4d29"
        strokeWidth="0.7"
      />
      <rect
        x={x + 5}
        y={y + 3}
        width={width - 10}
        height="5"
        rx="2.5"
        fill="#fff7e4"
        opacity="0.16"
      />
      <rect
        x={x + 5}
        y={y + LINK_H - 7}
        width={width - 10}
        height="3"
        rx="1.5"
        fill="#3a2614"
        opacity="0.28"
      />
      <line
        x1={210}
        y1={y + 8}
        x2={210}
        y2={y + LINK_H - 8}
        stroke="#5c3f1f"
        strokeWidth="0.6"
        opacity="0.35"
      />
    </g>
  )
}

export default function WatchArt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ساعت مچی لوکس ولورا با بند فلزی طلایی و صفحهٔ قهوه‌ای"
    >
      <defs>
        <linearGradient id="vg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f9eccb" />
          <stop offset="0.18" stopColor="#dfbf85" />
          <stop offset="0.38" stopColor="#b68d54" />
          <stop offset="0.52" stopColor="#8e6937" />
          <stop offset="0.66" stopColor="#dcba7c" />
          <stop offset="0.84" stopColor="#a67c45" />
          <stop offset="1" stopColor="#f4e2b8" />
        </linearGradient>

        <linearGradient id="vg-link" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6533" />
          <stop offset="0.2" stopColor="#d8b679" />
          <stop offset="0.38" stopColor="#f3e0b2" />
          <stop offset="0.56" stopColor="#c29c60" />
          <stop offset="0.78" stopColor="#8b6634" />
          <stop offset="1" stopColor="#e0c188" />
        </linearGradient>

        <linearGradient id="vg-bezel" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f6e5bd" />
          <stop offset="0.3" stopColor="#cda867" />
          <stop offset="0.55" stopColor="#8d6936" />
          <stop offset="0.8" stopColor="#d6b273" />
          <stop offset="1" stopColor="#8f6b38" />
        </linearGradient>

        <radialGradient id="vg-dial" cx="0.36" cy="0.3" r="0.86">
          <stop offset="0" stopColor="#7c4a32" />
          <stop offset="0.45" stopColor="#59301f" />
          <stop offset="0.78" stopColor="#38190f" />
          <stop offset="1" stopColor="#210e09" />
        </radialGradient>

        <radialGradient id="vg-sub" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#5e3322" />
          <stop offset="1" stopColor="#2b150e" />
        </radialGradient>

        <linearGradient id="vg-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>

        <filter id="vg-shadow" x="-40%" y="-15%" width="180%" height="130%">
          <feDropShadow
            dx="0"
            dy="30"
            stdDeviation="30"
            floodColor="#000000"
            floodOpacity="0.42"
          />
        </filter>
      </defs>

      <g filter="url(#vg-shadow)">
        {/* upper bracelet */}
        <g>{topRows.map((row) => Link({ ...row, id: `t-${row.key}` }))}</g>

        {/* lower bracelet */}
        <g>{bottomRows.map((row) => Link({ ...row, id: `b-${row.key}` }))}</g>

        {/* lugs */}
        <path
          d="M158 432h104l-6 44c-4 22-20 38-46 38s-42-16-46-38l-6-44Z"
          fill="url(#vg-gold)"
          stroke="#6b4d29"
          strokeWidth="1.2"
        />
        <path
          d="M158 768h104l-6-44c-4-22-20-38-46-38s-42 16-46 38l-6 44Z"
          fill="url(#vg-gold)"
          stroke="#6b4d29"
          strokeWidth="1.2"
        />

        {/* crown & pushers */}
        <rect x="336" y="584" width="19" height="34" rx="6" fill="url(#vg-gold)" stroke="#6b4d29" strokeWidth="1" />
        <rect x="340" y="590" width="5" height="22" rx="2.5" fill="#6d4f2a" opacity="0.5" />
        <rect x="336" y="543" width="14" height="18" rx="5" fill="url(#vg-gold)" stroke="#6b4d29" strokeWidth="1" />
        <rect x="336" y="639" width="14" height="18" rx="5" fill="url(#vg-gold)" stroke="#6b4d29" strokeWidth="1" />

        {/* case */}
        <circle cx="210" cy="600" r="130" fill="url(#vg-gold)" stroke="#5f431f" strokeWidth="1.4" />
        <circle cx="210" cy="600" r="120" fill="#8d6936" opacity="0.55" />
        <circle cx="210" cy="600" r="117" fill="url(#vg-bezel)" stroke="#5f431f" strokeWidth="0.8" />

        {/* bezel highlight */}
        <path
          d="M108 540a116 116 0 0 1 72-50"
          stroke="#fff6dd"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M306 668a116 116 0 0 1-56 42"
          stroke="#fff6dd"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* dial */}
        <circle cx="210" cy="600" r="101" fill="url(#vg-dial)" />
        <circle
          cx="210"
          cy="600"
          r="95"
          stroke="#c9a26e"
          strokeWidth="0.8"
          strokeDasharray="1 3.6"
          opacity="0.55"
        />

        {/* indices */}
        {Array.from({ length: 12 }).map((_, i) => {
          const major = i % 3 === 0
          return (
            <rect
              key={i}
              x={major ? 206.5 : 208}
              y="511"
              width={major ? 7 : 4.5}
              height={major ? 18 : 10}
              rx="1.5"
              fill={major ? '#f0d9a9' : '#cfae7a'}
              transform={`rotate(${i * 30} 210 600)`}
              opacity={major ? 0.98 : 0.8}
            />
          )
        })}

        {/* brand on dial */}
        <text
          x="210"
          y="571"
          textAnchor="middle"
          fill="#e9d3a6"
          fontSize="8.6"
          letterSpacing="3.2"
          fontFamily="Vazirmatn, sans-serif"
          opacity="0.9"
        >
          VELORA
        </text>
        <text
          x="210"
          y="584"
          textAnchor="middle"
          fill="#c9a26e"
          fontSize="4.9"
          letterSpacing="1.6"
          fontFamily="Vazirmatn, sans-serif"
          opacity="0.7"
        >
          AUTOMATIC
        </text>

        {/* subdial */}
        <circle cx="210" cy="661" r="22" fill="url(#vg-sub)" stroke="#a97f49" strokeWidth="0.8" />
        <circle cx="210" cy="661" r="17.5" stroke="#c9a26e" strokeWidth="0.6" strokeDasharray="1 2.6" opacity="0.5" />
        <line x1="210" y1="661" x2="210" y2="647" stroke="#e6c78e" strokeWidth="1.3" strokeLinecap="round" />

        {/* date window */}
        <rect x="268" y="589" width="26" height="19" rx="3.5" fill="#f2e7d4" stroke="#a97f49" strokeWidth="0.8" />
        <text
          x="281"
          y="603"
          textAnchor="middle"
          fill="#2b1c18"
          fontSize="10.5"
          fontFamily="Vazirmatn, sans-serif"
        >
          ۲۳
        </text>

        {/* hands */}
        <g transform="rotate(-58 210 600)">
          <rect x="205.5" y="537" width="9" height="63" rx="4.5" fill="#f0d7a4" stroke="#8b6534" strokeWidth="0.6" />
        </g>
        <g transform="rotate(62 210 600)">
          <rect x="207.5" y="515" width="5" height="85" rx="2.5" fill="#f6e5bd" stroke="#8b6534" strokeWidth="0.5" />
        </g>
        <g transform="rotate(196 210 600)">
          <rect x="209" y="520" width="2" height="126" rx="1" fill="#c98d54" />
        </g>
        <circle cx="210" cy="600" r="6.5" fill="url(#vg-gold)" stroke="#6b4d29" strokeWidth="0.8" />
        <circle cx="210" cy="600" r="2.2" fill="#3a2614" />

        {/* glass reflection */}
        <path
          d="M144 558a80 80 0 0 1 44-32c13-4 26-3 36 0-22 5-50 22-62 45-5 10-7 19-7 26-5-12-9-26-11-39Z"
          fill="url(#vg-glass)"
          opacity="0.5"
        />
        <circle cx="210" cy="600" r="101" stroke="#fff3d4" strokeWidth="0.6" opacity="0.25" />
      </g>
    </svg>
  )
}
