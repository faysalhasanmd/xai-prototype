"use client";

import { motion } from "framer-motion";

/**
 * Stage-specific SVG illustration (data trays / neural hexagon / radar).
 * @param {{stage: object}} props
 */
export default function StageMotif({ stage }) {
  const { accent, id } = stage;

  return (
    <svg
      viewBox="0 0 240 200"
      className="h-full w-full max-w-[230px]"
      role="img"
      aria-label={`${stage.title} illustration`}
    >
      <defs>
        <pattern
          id={`dots-${id}`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill={accent} fillOpacity="0.22" />
        </pattern>
      </defs>
      <rect x="14" y="14" width="212" height="172" fill={`url(#dots-${id})`} />

      {[
        { x: 14, y: 14, dx: 1, dy: 1 },
        { x: 226, y: 14, dx: -1, dy: 1 },
        { x: 14, y: 186, dx: 1, dy: -1 },
        { x: 226, y: 186, dx: -1, dy: -1 },
      ].map((c, i) => (
        <path
          key={i}
          d={`M ${c.x} ${c.y + c.dy * 12} L ${c.x} ${c.y} L ${c.x + c.dx * 12} ${c.y}`}
          stroke={accent}
          strokeWidth="1.4"
          strokeOpacity="0.5"
          fill="none"
        />
      ))}

      {id === 1 && (
        <g>
          {[
            { y: 44, w: 96, o: 0.9 },
            { y: 88, w: 74, o: 0.75 },
            { y: 132, w: 52, o: 0.6 },
          ].map((tray, i) => (
            <polygon
              key={i}
              points={`${120 - tray.w / 2 - 12},${tray.y + 10} ${120 - tray.w / 2 + 12},${tray.y - 10} ${120 + tray.w / 2 + 12},${tray.y - 10} ${120 + tray.w / 2 - 12},${tray.y + 10}`}
              fill="#0a0f1c"
              stroke={accent}
              strokeOpacity={tray.o}
              strokeWidth="1.4"
            />
          ))}
          {[-1, 0, 1].map((offset, i) => (
            <motion.circle
              key={i}
              cx={120 + offset * 26}
              r="2.6"
              fill={accent}
              animate={{ cy: [34, 60, 34], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          {[-1, 0, 1].map((offset, i) => (
            <motion.circle
              key={`b-${i}`}
              cx={120 + offset * 18}
              r="2.2"
              fill={accent}
              animate={{ cy: [78, 104, 78], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: 0.3 + i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          <ellipse
            cx="120"
            cy="150"
            rx="30"
            ry="9"
            fill="none"
            stroke={accent}
            strokeWidth="1.4"
          />
        </g>
      )}

      {id === 2 && (
        <g style={{ transformOrigin: "120px 100px" }}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "120px 100px" }}
          >
            <polygon
              points="120,58 158,80 120,102 82,80"
              fill="none"
              stroke={accent}
              strokeWidth="1.4"
              strokeOpacity="0.85"
            />
            <polygon
              points="82,80 120,102 120,146 82,124"
              fill="#0a0f1c"
              stroke={accent}
              strokeWidth="1.4"
              strokeOpacity="0.6"
            />
            <polygon
              points="158,80 120,102 120,146 158,124"
              fill="#0a0f1c"
              stroke={accent}
              strokeWidth="1.4"
              strokeOpacity="0.4"
            />
            {[
              [120, 58],
              [158, 80],
              [120, 102],
              [82, 80],
              [120, 146],
              [82, 124],
              [158, 124],
            ].map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fill={accent} />
            ))}
          </motion.g>
          <motion.line
            x1="70"
            x2="170"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.55"
            animate={{ y1: [60, 148, 60], y2: [60, 148, 60] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      )}

      {id === 3 && (
        <g>
          <motion.circle
            cx="120"
            cy="100"
            r="62"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="1 7"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            style={{ transformOrigin: "120px 100px" }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <circle
            cx="120"
            cy="100"
            r="40"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <circle
            cx="120"
            cy="100"
            r="20"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <motion.line
            x1="120"
            y1="100"
            x2="120"
            y2="38"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ transformOrigin: "120px 100px" }}
            animate={{ rotate: [0, 300, 620, 720] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.8, 1],
            }}
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="46"
              x2="120"
              y2="38"
              stroke={accent}
              strokeWidth="1.2"
              strokeOpacity="0.35"
              style={{
                transformOrigin: "120px 100px",
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
          <motion.circle
            cx="120"
            cy="100"
            r="6"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            animate={{ r: [6, 26, 6], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
          />
          <circle cx="120" cy="100" r="5" fill={accent} />
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={104 + i * 10}
              width="6"
              rx="1.5"
              fill={accent}
              animate={{ y: [166, 150 - i * 6], height: [0, 16 + i * 6] }}
              transition={{
                duration: 0.6,
                delay: 2.6 + i * 0.15,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
