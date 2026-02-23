export default function UploadFileIcon({
  className = "w-16 h-16",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Slate Gradient */}
        <linearGradient id="slateGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#475569" /> {/* lighter shade */}
          <stop offset="100%" stopColor="#1e293b" /> {/* darker shade */}
        </linearGradient>

        {/* Soft Shadow */}
        <filter
          id="softShadowSlate"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="6"
            floodColor="#334155"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      {/* Back Card */}
      <rect
        x="25"
        y="15"
        rx="18"
        ry="18"
        width="70"
        height="55"
        fill="#334155"
        opacity="0.5"
      />

      {/* Front Card */}
      <rect
        x="35"
        y="30"
        rx="18"
        ry="18"
        width="70"
        height="55"
        fill="url(#slateGradient)"
        filter="url(#softShadowSlate)"
      />

      {/* Mountain Shape */}
      <path d="M50 70 L65 52 L80 70 Z" fill="#f1f5f9" opacity="0.9" />

      {/* Sun Circle */}
      <circle cx="85" cy="48" r="6" fill="#e2e8f0" />
    </svg>
  );
}
