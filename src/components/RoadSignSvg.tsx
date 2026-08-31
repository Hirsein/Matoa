import React from 'react';

interface RoadSignSvgProps {
  iconType: string;
  className?: string;
  size?: number;
}

export const RoadSignSvg: React.FC<RoadSignSvgProps> = ({
  iconType,
  className = '',
  size = 64,
}) => {
  const s = size;

  // Render SVG based on iconType
  switch (iconType) {
    // ================= DANGER TRIANGLES =================
    case 'triangle-danger':
    case 'danger-general-exclamation':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M50 34 L50 62" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="74" r="4.5" fill="#0f172a" />
        </svg>
      );

    case 'danger-turn-left':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M60 76 V56 C60 44 48 40 40 40 L34 40 M34 40 L44 32 M34 40 L44 48" fill="none" stroke="#0f172a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-turn-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M40 76 V56 C40 44 52 40 60 40 L66 40 M66 40 L56 32 M66 40 L56 48" fill="none" stroke="#0f172a" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-double-turn-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M42 76 V64 C42 54 58 54 58 44 C58 38 52 36 48 36 L44 36 M44 36 L52 30 M44 36 L52 42" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-double-turn-left':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M58 76 V64 C58 54 42 54 42 44 C42 38 48 36 52 36 L56 36 M56 36 L48 30 M56 36 L48 42" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-bump-double':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M26 70 C30 70 33 56 39 56 C45 56 48 70 51 70 C54 70 57 56 63 56 C69 56 72 70 76 70" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case 'danger-bump-single':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M26 70 H36 C42 70 44 56 50 56 C56 56 58 70 64 70 H74" fill="none" stroke="#0f172a" strokeWidth="6.5" strokeLinecap="round" />
        </svg>
      );

    case 'danger-narrow-both':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M34 76 L34 62 L42 46 L42 36" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M66 76 L66 62 L58 46 L58 36" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-narrow-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M36 76 L36 36" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <path d="M66 76 L66 62 L56 46 L56 36" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-narrow-left':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M34 76 L34 62 L44 46 L44 36" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M64 76 L64 36" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case 'danger-slippery':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          {/* Car profile */}
          <rect x="42" y="44" width="22" height="11" rx="2" fill="#0f172a" />
          <polygon points="46,44 50,36 60,36 64,44" fill="#0f172a" />
          <circle cx="48" cy="56" r="3.5" fill="#0f172a" />
          <circle cx="60" cy="56" r="3.5" fill="#0f172a" />
          {/* Skid lines */}
          <path d="M36 72 C44 72 44 64 52 64 C58 64 60 70 66 70" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <path d="M42 76 C48 76 50 68 56 68 C62 68 64 74 70 74" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'danger-movable-bridge':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <rect x="25" y="70" width="16" height="8" fill="#0f172a" />
          <rect x="59" y="70" width="16" height="8" fill="#0f172a" />
          <line x1="41" y1="70" x2="62" y2="48" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M28 78 C35 76 45 80 55 76 C65 80 72 76 76 78" stroke="#0284c7" strokeWidth="2.5" fill="none" />
        </svg>
      );

    case 'danger-level-crossing-guarded':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <line x1="32" y1="52" x2="68" y2="52" stroke="#0f172a" strokeWidth="4" />
          <line x1="32" y1="64" x2="68" y2="64" stroke="#0f172a" strokeWidth="4" />
          <line x1="38" y1="46" x2="38" y2="72" stroke="#0f172a" strokeWidth="4" />
          <line x1="50" y1="46" x2="50" y2="72" stroke="#0f172a" strokeWidth="4" />
          <line x1="62" y1="46" x2="62" y2="72" stroke="#0f172a" strokeWidth="4" />
        </svg>
      );

    case 'danger-level-crossing-train':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <rect x="36" y="48" width="28" height="18" rx="2" fill="#0f172a" />
          <rect x="52" y="40" width="12" height="8" fill="#0f172a" />
          <circle cx="44" cy="68" r="4" fill="#0f172a" />
          <circle cx="56" cy="68" r="4" fill="#0f172a" />
          <line x1="32" y1="74" x2="68" y2="74" stroke="#0f172a" strokeWidth="3" />
        </svg>
      );

    case 'danger-children':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          {/* Adult silhouette */}
          <circle cx="44" cy="40" r="3.5" fill="#0f172a" />
          <path d="M44 44 L44 60 M40 50 L48 50 M44 60 L40 74 M44 60 L48 74" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          {/* Child silhouette holding hand */}
          <circle cx="58" cy="48" r="3" fill="#0f172a" />
          <path d="M58 51 L58 64 M58 55 L46 51 M58 64 L54 74 M58 64 L62 74" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'danger-pedestrian-crossing':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          {/* Walking person */}
          <circle cx="52" cy="38" r="4" fill="#0f172a" />
          <path d="M52 43 L49 57 M45 49 L58 46 M49 57 L42 70 M49 57 L56 70" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          {/* Zebra stripes */}
          <line x1="32" y1="74" x2="38" y2="74" stroke="#0f172a" strokeWidth="4" />
          <line x1="44" y1="74" x2="50" y2="74" stroke="#0f172a" strokeWidth="4" />
          <line x1="56" y1="74" x2="62" y2="74" stroke="#0f172a" strokeWidth="4" />
          <line x1="68" y1="74" x2="74" y2="74" stroke="#0f172a" strokeWidth="4" />
        </svg>
      );

    case 'danger-cattle':
    case 'danger-wild-animals':
    case 'danger-horse-rider':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          {/* Animal silhouette */}
          <path d="M35 60 C35 52 45 48 55 48 L65 44 C67 44 68 47 66 50 L64 54 C66 55 68 58 68 62 L60 62 L60 74 L55 74 L55 64 L45 64 L45 74 L40 74 L40 60 Z" fill="#0f172a" />
        </svg>
      );

    case 'danger-steep-hill':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <polygon points="32,74 68,74 68,52" fill="#0f172a" />
          <text x="44" y="66" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">10%</text>
        </svg>
      );

    case 'danger-traffic-light':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <rect x="42" y="36" width="16" height="38" rx="4" fill="#1e293b" />
          <circle cx="50" cy="43" r="3.5" fill="#ef4444" />
          <circle cx="50" cy="55" r="3.5" fill="#eab308" />
          <circle cx="50" cy="67" r="3.5" fill="#22c55e" />
        </svg>
      );

    case 'danger-two-way':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          {/* Arrow up */}
          <path d="M43 72 L43 42 M38 48 L43 40 L48 48" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arrow down */}
          <path d="M57 42 L57 72 M52 66 L57 74 L62 66" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'danger-falling-rocks':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <polygon points="32,74 44,74 54,42 32,42" fill="#0f172a" />
          <circle cx="62" cy="52" r="3.5" fill="#0f172a" />
          <circle cx="58" cy="64" r="4.5" fill="#0f172a" />
          <circle cx="68" cy="70" r="3" fill="#0f172a" />
        </svg>
      );

    case 'danger-quayside':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <polygon points="30,72 50,72 50,60 30,60" fill="#0f172a" />
          <path d="M48 58 L58 48 L64 54 L54 64 Z" fill="#0f172a" />
          <path d="M50 74 C56 72 62 76 68 74" stroke="#0284c7" strokeWidth="3" fill="none" />
        </svg>
      );

    case 'danger-cyclists':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <circle cx="40" cy="66" r="6" fill="none" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="62" cy="66" r="6" fill="none" stroke="#0f172a" strokeWidth="2.5" />
          <path d="M40 66 L50 66 L55 54 L62 66 M50 66 L46 54 L42 54" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'danger-airfield':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          {/* Airplane */}
          <path d="M50 36 L52 50 L68 56 L68 60 L52 58 L52 68 L58 72 L58 75 L50 73 L42 75 L42 72 L48 68 L48 58 L32 60 L32 56 L48 50 Z" fill="#0f172a" />
        </svg>
      );

    case 'danger-crosswind':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <line x1="38" y1="40" x2="38" y2="76" stroke="#0f172a" strokeWidth="3.5" />
          <polygon points="38,42 66,48 66,58 38,62" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
          <line x1="48" y1="44" x2="48" y2="60" stroke="#ffffff" strokeWidth="3" />
          <line x1="58" y1="46" x2="58" y2="59" stroke="#ffffff" strokeWidth="3" />
        </svg>
      );

    // ================= PRIORITE =================
    case 'triangle-cedez':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,90 92,14 8,14" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
        </svg>
      );

    case 'triangle-cedez-advanced':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,68 82,14 18,14" fill="#ffffff" stroke="#e11d48" strokeWidth="10" strokeLinejoin="round" />
          <rect x="24" y="74" width="52" height="18" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <text x="50" y="87" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">150 m</text>
        </svg>
      );

    case 'octogon-stop':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="30,8 70,8 92,30 92,70 70,92 30,92 8,70 8,30" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="59" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
            STOP
          </text>
        </svg>
      );

    case 'triangle-stop-advanced':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,68 82,14 18,14" fill="#ffffff" stroke="#e11d48" strokeWidth="10" strokeLinejoin="round" />
          <rect x="20" y="74" width="60" height="18" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <text x="50" y="87" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="sans-serif">STOP 150m</text>
        </svg>
      );

    case 'diamond-priority':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="15" y="15" width="70" height="70" rx="6" transform="rotate(45 50 50)" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" rx="3" transform="rotate(45 50 50)" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
        </svg>
      );

    case 'diamond-priority-end':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="15" y="15" width="70" height="70" rx="6" transform="rotate(45 50 50)" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" rx="3" transform="rotate(45 50 50)" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
          <line x1="14" y1="86" x2="86" y2="14" stroke="#0f172a" strokeWidth="9" />
        </svg>
      );

    case 'priority-cross-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M38 42 L62 68 M62 42 L38 68" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );

    case 'priority-road-ahead':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M50 36 L50 74" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
          <path d="M50 34 L42 46 M50 34 L58 46" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 58 L64 58" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'danger-roundabout':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <path d="M50 42 A14 14 0 0 1 64 56" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="64,52 68,60 60,60" fill="#0f172a" />
          <path d="M64 56 A14 14 0 0 1 36 56" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="36,60 40,52 44,60" fill="#0f172a" />
          <path d="M36 56 A14 14 0 0 1 50 42" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="46,42 54,42 50,34" fill="#0f172a" />
        </svg>
      );

    // ================= INTERDICTIONS =================
    case 'circle-interdiction':
    case 'prohibition-all-traffic':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="11" />
        </svg>
      );

    case 'prohibition-no-entry':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
          <rect x="20" y="43" width="60" height="14" rx="3" fill="#ffffff" />
        </svg>
      );

    case 'prohibition-no-left-turn':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <path d="M56 70 V52 C56 44 48 42 40 42 L34 42 M34 42 L42 36 M34 42 L42 48" fill="none" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'prohibition-no-right-turn':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <path d="M44 70 V52 C44 44 52 42 60 42 L66 42 M66 42 L58 36 M66 42 L58 48" fill="none" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'prohibition-no-u-turn':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <path d="M58 70 V48 C58 38 42 38 42 48 L42 66 M42 66 L36 60 M42 66 L48 60" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'prohibition-no-overtaking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          {/* Red overtaking car */}
          <rect x="30" y="44" width="16" height="12" rx="2" fill="#dc2626" />
          {/* Black car */}
          <rect x="54" y="44" width="16" height="12" rx="2" fill="#0f172a" />
        </svg>
      );

    case 'prohibition-no-truck-overtaking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          {/* Red overtaking truck */}
          <rect x="26" y="42" width="22" height="16" rx="2" fill="#dc2626" />
          {/* Black car */}
          <rect x="54" y="46" width="16" height="12" rx="2" fill="#0f172a" />
        </svg>
      );

    case 'prohibition-no-parking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#0284c7" stroke="#e11d48" strokeWidth="10" />
          <line x1="23" y1="23" x2="77" y2="77" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'prohibition-no-stopping-parking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#0284c7" stroke="#e11d48" strokeWidth="10" />
          <line x1="23" y1="23" x2="77" y2="77" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
          <line x1="77" y1="23" x2="23" y2="77" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'prohibition-no-cars':
    case 'prohibition-no-trucks':
    case 'prohibition-no-bicycles':
    case 'prohibition-no-pedestrians':
    case 'prohibition-no-motorcycles':
    case 'prohibition-no-tractors':
    case 'prohibition-no-animal-traction':
    case 'prohibition-no-handcarts':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          {iconType === 'prohibition-no-cars' && (
            <path d="M34 56 C34 50 40 44 50 44 C60 44 66 50 66 56 L66 60 L34 60 Z M38 64 A4 4 0 1 1 38 56 A4 4 0 1 1 38 64 M62 64 A4 4 0 1 1 62 56 A4 4 0 1 1 62 64" fill="#0f172a" />
          )}
          {iconType === 'prohibition-no-trucks' && (
            <path d="M30 44 H52 V60 H30 Z M52 48 H66 L70 56 V60 H52 Z" fill="#0f172a" />
          )}
          {iconType === 'prohibition-no-bicycles' && (
            <g fill="none" stroke="#0f172a" strokeWidth="3">
              <circle cx="36" cy="56" r="8" />
              <circle cx="64" cy="56" r="8" />
              <path d="M36 56 L48 56 L54 44 L64 56 M48 56 L44 44" />
            </g>
          )}
          {iconType === 'prohibition-no-pedestrians' && (
            <g fill="#0f172a">
              <circle cx="50" cy="36" r="4.5" />
              <path d="M50 42 L50 56 M44 48 L56 46 M50 56 L43 70 M50 56 L57 70" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}
          {iconType !== 'prohibition-no-cars' && iconType !== 'prohibition-no-trucks' && iconType !== 'prohibition-no-bicycles' && iconType !== 'prohibition-no-pedestrians' && (
            <text x="50" y="56" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">INTERDIT</text>
          )}
        </svg>
      );

    case 'prohibition-speed-limit':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <text x="50" y="60" textAnchor="middle" fill="#0f172a" fontSize="30" fontWeight="900" fontFamily="sans-serif">50</text>
        </svg>
      );

    case 'prohibition-weight-limit':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <text x="50" y="58" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="bold" fontFamily="sans-serif">5.5 t</text>
        </svg>
      );

    case 'prohibition-axle-load':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <text x="50" y="58" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold" fontFamily="sans-serif">2 t</text>
        </svg>
      );

    case 'prohibition-width-limit':
    case 'prohibition-height-limit':
    case 'prohibition-length-limit':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <text x="50" y="58" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold" fontFamily="sans-serif">2.5 m</text>
        </svg>
      );

    case 'prohibition-no-horn':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <path d="M38 46 H46 L56 36 V64 L46 54 H38 Z" fill="#0f172a" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'prohibition-hazardous-materials':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e11d48" strokeWidth="10" />
          <rect x="36" y="40" width="28" height="20" rx="3" fill="#f97316" stroke="#0f172a" strokeWidth="2" />
          <text x="50" y="54" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">DANGER</text>
        </svg>
      );

    // ================= FIN D'INTERDICTION =================
    case 'end-speed-limit':
    case 'end-overtaking':
    case 'end-horn':
    case 'end-all-restrictions':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#f8fafc" stroke="#64748b" strokeWidth="6" />
          <line x1="24" y1="76" x2="76" y2="24" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
          <line x1="30" y1="82" x2="82" y2="30" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    // ================= OBLIGATIONS =================
    case 'circle-obligation':
    case 'obligation-straight':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M50 72 L50 28 M38 40 L50 28 L62 40" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-right-before':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M38 68 L38 50 C38 42 46 36 56 36 L66 36 M56 26 L68 36 L56 46" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-left-before':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M62 68 L62 50 C62 42 54 36 44 36 L34 36 M44 26 L32 36 L44 46" fill="none" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-straight-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M44 72 L44 30 M36 38 L44 30 L52 38" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 56 C44 48 50 44 60 44 L68 44 M60 36 L68 44 L60 52" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-straight-left':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M56 72 L56 30 M48 38 L56 30 L64 38" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M56 56 C56 48 50 44 40 44 L32 44 M40 36 L32 44 L40 52" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-left-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M50 72 V50 C50 42 42 38 34 38 M42 30 L32 38 L42 46" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 50 C50 42 58 38 66 38 M58 30 L68 38 L58 46" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-roundabout':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M50 30 A20 20 0 0 1 70 50" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <polygon points="70,44 76,54 66,54" fill="#ffffff" />
          <path d="M70 50 A20 20 0 0 1 30 50" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <polygon points="30,56 36,46 42,56" fill="#ffffff" />
          <path d="M30 50 A20 20 0 0 1 50 30" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <polygon points="44,30 54,30 50,22" fill="#ffffff" />
        </svg>
      );

    case 'obligation-pass-right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M34 34 L66 66 M50 66 L66 66 L66 50" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-pass-left':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M66 34 L34 66 M50 66 L34 66 L34 50" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'obligation-bicycle-path':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <circle cx="36" cy="56" r="8" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="64" cy="56" r="8" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d="M36 56 L48 56 L54 44 L64 56 M48 56 L44 44" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'obligation-pedestrian-path':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <circle cx="50" cy="34" r="5" fill="#ffffff" />
          <path d="M50 40 L50 56 M42 46 L58 44 M50 56 L42 72 M50 56 L58 72" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'obligation-segregated-path':
    case 'obligation-shared-path':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <line x1="50" y1="16" x2="50" y2="84" stroke="#ffffff" strokeWidth="3" />
          {/* Pedestrian on left */}
          <circle cx="34" cy="38" r="3.5" fill="#ffffff" />
          <path d="M34 43 L34 56 M28 48 L40 47 M34 56 L28 68 M34 56 L40 68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Bicycle on right */}
          <circle cx="60" cy="62" r="5" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="76" cy="62" r="5" fill="none" stroke="#ffffff" strokeWidth="2" />
        </svg>
      );

    case 'obligation-snow-chains':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#ffffff" strokeWidth="5" strokeDasharray="6 4" />
        </svg>
      );

    case 'obligation-min-speed':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="61" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="900" fontFamily="sans-serif">30</text>
        </svg>
      );

    case 'end-bicycle-path':
    case 'end-pedestrian-path':
    case 'end-min-speed':
    case 'end-snow-chains':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    // ================= INDICATIONS & SERVICES =================
    case 'square-indication':
    case 'indication-parking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="54" fontWeight="bold" fontFamily="sans-serif">P</text>
        </svg>
      );

    case 'indication-parking-disk':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="38" y="64" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="bold">P</text>
          <circle cx="68" cy="50" r="14" fill="#ffffff" />
          <circle cx="68" cy="50" r="11" fill="#0284c7" />
          <line x1="68" y1="50" x2="68" y2="43" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="68" y1="50" x2="74" y2="50" stroke="#ffffff" strokeWidth="2.5" />
        </svg>
      );

    case 'indication-parking-paid':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="36" y="64" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="bold">P</text>
          <rect x="58" y="38" width="22" height="26" rx="3" fill="#ffffff" />
          <text x="69" y="55" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="black">€</text>
        </svg>
      );

    case 'indication-taxi':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="24" y="34" width="52" height="20" rx="3" fill="#ffffff" />
          <text x="50" y="48" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="900" letterSpacing="1">TAXI</text>
          <circle cx="34" cy="62" r="5" fill="#ffffff" />
          <circle cx="66" cy="62" r="5" fill="#ffffff" />
        </svg>
      );

    case 'indication-bus-stop':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="28" y="28" width="44" height="38" rx="6" fill="#ffffff" />
          <rect x="34" y="34" width="32" height="14" rx="2" fill="#0284c7" />
          <circle cx="38" cy="58" r="4" fill="#0284c7" />
          <circle cx="62" cy="58" r="4" fill="#0284c7" />
        </svg>
      );

    case 'indication-emergency-refuge':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">SOS</text>
        </svg>
      );

    case 'indication-one-way':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M50 72 L50 28 M36 42 L50 28 L64 42" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'indication-airport':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <path d="M50 26 L52 42 L70 48 L70 53 L52 50 L52 64 L60 68 L60 72 L50 70 L40 72 L40 68 L48 64 L48 50 L30 53 L30 48 L48 42 Z" fill="#ffffff" />
        </svg>
      );

    case 'indication-hospital-emergency':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="22" y="22" width="56" height="56" rx="6" fill="#ffffff" />
          <path d="M50 30 V70 M30 50 H70" stroke="#dc2626" strokeWidth="10" strokeLinecap="square" />
        </svg>
      );

    case 'indication-hospital-standard':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="50" fontWeight="900" fontFamily="sans-serif">H</text>
        </svg>
      );

    case 'indication-phone':
    case 'indication-disabled':
    case 'indication-youth-hostel':
    case 'indication-port':
    case 'indication-hotel':
    case 'indication-restaurant':
    case 'indication-cafe':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="12" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
          <rect x="22" y="22" width="56" height="56" rx="6" fill="#ffffff" />
          {iconType === 'indication-hotel' && (
            <path d="M30 64 V44 M30 52 H68 V64 M34 44 H46 V52 H34 Z" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />
          )}
          {iconType === 'indication-restaurant' && (
            <path d="M38 34 V66 M34 34 V46 H42 V34 M60 34 V66 C64 66 66 58 66 50 C66 42 64 34 60 34 Z" stroke="#0284c7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          )}
          {iconType === 'indication-phone' && (
            <path d="M36 34 C36 34 38 46 48 56 C58 66 70 68 70 68 L64 58 L56 60 L44 48 L46 40 Z" fill="#0284c7" />
          )}
          {iconType !== 'indication-hotel' && iconType !== 'indication-restaurant' && iconType !== 'indication-phone' && (
            <circle cx="50" cy="50" r="14" fill="#0284c7" />
          )}
        </svg>
      );

    // ================= BALISES =================
    case 'beacon-curve-chevron':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="10" y="20" width="80" height="60" rx="4" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
          <path d="M36 30 L54 50 L36 70 M56 30 L74 50 L56 70" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'beacon-intersection':
    case 'beacon-curve-white':
    case 'beacon-island':
    case 'beacon-delineator':
    case 'beacon-windsock':
    case 'beacon-level-crossing':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="36" y="14" width="28" height="72" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <rect x="36" y="28" width="28" height="14" fill="#dc2626" />
          {iconType === 'beacon-level-crossing' && (
            <>
              <line x1="36" y1="46" x2="64" y2="56" stroke="#dc2626" strokeWidth="5" />
              <line x1="36" y1="58" x2="64" y2="68" stroke="#dc2626" strokeWidth="5" />
              <line x1="36" y1="70" x2="64" y2="80" stroke="#dc2626" strokeWidth="5" />
            </>
          )}
        </svg>
      );

    // ================= PASSAGES A NIVEAU =================
    case 'rail-saint-andrew-single':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <line x1="20" y1="20" x2="80" y2="80" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'rail-saint-andrew-multi':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="8" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#dc2626" strokeWidth="8" />
          <path d="M30 75 L50 60 L70 75" fill="none" stroke="#dc2626" strokeWidth="8" />
        </svg>
      );

    case 'rail-automatic-signal':
    case 'rail-flashing-red-barrier':
    case 'rail-stop-signal':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="28" y="24" width="44" height="28" rx="4" fill="#0f172a" />
          <circle cx="40" cy="38" r="6" fill="#dc2626" className="animate-pulse" />
          <circle cx="60" cy="38" r="6" fill="#dc2626" className="animate-pulse" />
          <line x1="50" y1="52" x2="50" y2="86" stroke="#0f172a" strokeWidth="6" />
        </svg>
      );

    // ================= TEMPORAIRE =================
    case 'yellow-temp':
    case 'temp-roadworks':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#facc15" stroke="#dc2626" strokeWidth="12" strokeLinejoin="round" />
          {/* Worker digging */}
          <circle cx="56" cy="42" r="3.5" fill="#0f172a" />
          <path d="M56 46 L52 58 M46 50 L58 48 M52 58 L46 72 M52 58 L58 72" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="42" y1="56" x2="36" y2="72" stroke="#0f172a" strokeWidth="3" />
          <polygon points="32,70 40,74 34,76" fill="#0f172a" />
        </svg>
      );

    case 'temp-narrow':
    case 'temp-alternate':
    case 'temp-detour':
    case 'temp-speed':
    case 'temp-cones':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#facc15" stroke="#dc2626" strokeWidth="12" strokeLinejoin="round" />
          <text x="50" y="60" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900" fontFamily="sans-serif">TRAVAUX</text>
        </svg>
      );

    // ================= PANONCEAUX =================
    case 'small-panonceau':
    case 'panonceau-distance':
    case 'panonceau-extent':
    case 'panonceau-arrow-up':
    case 'panonceau-arrow-down':
    case 'panonceau-double-arrow':
    case 'panonceau-schedule':
    case 'panonceau-vehicle-category':
    case 'panonceau-except':
    case 'panonceau-wet-road':
    case 'panonceau-intersection-scheme':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="6" y="24" width="88" height="52" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          {iconType === 'panonceau-distance' && (
            <text x="50" y="56" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="bold">150 m</text>
          )}
          {iconType === 'panonceau-extent' && (
            <text x="50" y="56" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="bold">2 km</text>
          )}
          {iconType === 'panonceau-arrow-up' && (
            <path d="M50 64 L50 36 M42 44 L50 36 L58 44" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {iconType === 'panonceau-arrow-down' && (
            <path d="M50 36 L50 64 M42 56 L50 64 L58 56" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {iconType === 'panonceau-schedule' && (
            <text x="50" y="55" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">7h - 19h</text>
          )}
          {iconType === 'panonceau-except' && (
            <text x="50" y="55" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">SAUF TAXIS</text>
          )}
          {iconType !== 'panonceau-distance' && iconType !== 'panonceau-extent' && iconType !== 'panonceau-arrow-up' && iconType !== 'panonceau-arrow-down' && iconType !== 'panonceau-schedule' && iconType !== 'panonceau-except' && (
            <text x="50" y="55" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">RAPPEL</text>
          )}
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 92,86 8,86" fill="#ffffff" stroke="#e11d48" strokeWidth="12" strokeLinejoin="round" />
          <circle cx="50" cy="54" r="6" fill="#0f172a" />
        </svg>
      );
  }
};
