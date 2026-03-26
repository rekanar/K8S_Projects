import React from 'react';

function SchoolScene() {
  return (
    <div className="school-scene-container">
      <svg viewBox="0 0 1200 350" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Gradients */}
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <linearGradient id="busGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6d3d1" />
            <stop offset="100%" stopColor="#a8a29e" />
          </linearGradient>
          <linearGradient id="flagGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="33%" stopColor="#f97316" />
            <stop offset="33%" stopColor="#ffffff" />
            <stop offset="66%" stopColor="#ffffff" />
            <stop offset="66%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Ground / Grass */}
        <rect x="0" y="240" width="1200" height="110" fill="url(#grassGrad)" />
        <ellipse cx="600" cy="240" rx="620" ry="15" fill="#16a34a" opacity="0.3" />

        {/* Pathway */}
        <path d="M520 350 L540 260 L560 260 L545 350 Z" fill="url(#pathGrad)" />
        <path d="M560 260 L640 260 L640 350 L545 350 Z" fill="url(#pathGrad)" opacity="0.8" />

        {/* ---- MAIN SCHOOL BUILDING ---- */}
        <g>
          {/* Building body */}
          <rect x="350" y="120" width="500" height="140" rx="4" fill="url(#buildingGrad)" />
          <rect x="350" y="120" width="500" height="140" rx="4" fill="rgba(0,0,0,0.03)" />

          {/* Roof */}
          <polygon points="340,120 600,50 860,120" fill="url(#roofGrad)" />
          <polygon points="340,120 600,50 860,120" fill="rgba(0,0,0,0.05)" />

          {/* Roof trim */}
          <rect x="340" y="116" width="520" height="8" rx="2" fill="#b91c1c" />

          {/* Flag pole on roof */}
          <line x1="600" y1="50" x2="600" y2="15" stroke="#78716c" strokeWidth="3" />
          <rect x="601" y="15" width="28" height="18" rx="2" fill="url(#flagGrad)">
            <animateTransform attributeName="transform" type="rotate" values="-2 601 24;2 601 24;-2 601 24" dur="2s" repeatCount="indefinite" />
          </rect>

          {/* School Name Board */}
          <rect x="460" y="70" width="280" height="38" rx="6" fill="#1e3a8a" />
          <text x="600" y="95" textAnchor="middle" fill="#fbbf24" fontFamily="serif" fontWeight="bold" fontSize="18">VIGNAN SCHOOL</text>

          {/* Clock */}
          <circle cx="600" cy="140" r="18" fill="white" stroke="#78716c" strokeWidth="2" />
          <circle cx="600" cy="140" r="2" fill="#1e293b" />
          <line x1="600" y1="140" x2="600" y2="128" stroke="#1e293b" strokeWidth="2" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 600 140" to="360 600 140" dur="60s" repeatCount="indefinite" />
          </line>
          <line x1="600" y1="140" x2="608" y2="140" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 600 140" to="360 600 140" dur="5s" repeatCount="indefinite" />
          </line>

          {/* Windows Row 1 */}
          {[380, 430, 480, 680, 730, 780].map((x, i) => (
            <g key={`w1-${i}`}>
              <rect x={x} y="135" width="30" height="35" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
              <line x1={x + 15} y1="135" x2={x + 15} y2="170" stroke="#93c5fd" strokeWidth="0.8" />
              <line x1={x} y1="152" x2={x + 30} y2="152" stroke="#93c5fd" strokeWidth="0.8" />
            </g>
          ))}

          {/* Windows Row 2 */}
          {[380, 430, 480, 680, 730, 780].map((x, i) => (
            <g key={`w2-${i}`}>
              <rect x={x} y="185" width="30" height="35" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
              <line x1={x + 15} y1="185" x2={x + 15} y2="220" stroke="#93c5fd" strokeWidth="0.8" />
              <line x1={x} y1="202" x2={x + 30} y2="202" stroke="#93c5fd" strokeWidth="0.8" />
            </g>
          ))}

          {/* Main Door */}
          <rect x="565" y="190" width="70" height="70" rx="4" fill="#92400e" />
          <rect x="565" y="160" width="70" height="35" rx="35 35 0 0" fill="#78350f" />
          <circle cx="625" cy="225" r="3" fill="#fbbf24" />
          <rect x="597" y="190" width="4" height="70" fill="#78350f" />

          {/* Steps */}
          <rect x="555" y="258" width="90" height="6" rx="1" fill="#d6d3d1" />
          <rect x="548" y="264" width="104" height="6" rx="1" fill="#a8a29e" />
        </g>

        {/* ---- LEFT WING ---- */}
        <g>
          <rect x="180" y="160" width="175" height="100" rx="3" fill="#fef9c3" />
          <rect x="175" y="156" width="185" height="8" rx="2" fill="#b91c1c" />
          {[195, 235, 275, 315].map((x, i) => (
            <g key={`lw-${i}`}>
              <rect x={x} y="175" width="25" height="30" rx="2" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.8" />
              <line x1={x + 12.5} y1="175" x2={x + 12.5} y2="205" stroke="#93c5fd" strokeWidth="0.5" />
            </g>
          ))}
          <rect x="230" y="220" width="50" height="40" rx="3" fill="#78350f" />
          <circle cx="272" cy="240" r="2.5" fill="#fbbf24" />
        </g>

        {/* ---- RIGHT WING ---- */}
        <g>
          <rect x="845" y="160" width="175" height="100" rx="3" fill="#fef9c3" />
          <rect x="840" y="156" width="185" height="8" rx="2" fill="#b91c1c" />
          {[860, 900, 940, 980].map((x, i) => (
            <g key={`rw-${i}`}>
              <rect x={x} y="175" width="25" height="30" rx="2" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.8" />
              <line x1={x + 12.5} y1="175" x2={x + 12.5} y2="205" stroke="#93c5fd" strokeWidth="0.5" />
            </g>
          ))}
          <rect x="920" y="220" width="50" height="40" rx="3" fill="#78350f" />
          <circle cx="928" cy="240" r="2.5" fill="#fbbf24" />
        </g>

        {/* ---- TREES ---- */}
        {/* Tree 1 - Left */}
        <g>
          <rect x="95" y="210" width="12" height="45" rx="3" fill="url(#trunkGrad)" />
          <ellipse cx="101" cy="195" rx="35" ry="32" fill="#16a34a" />
          <ellipse cx="85" cy="205" rx="22" ry="20" fill="#15803d" />
          <ellipse cx="118" cy="200" rx="20" ry="22" fill="#22c55e" />
          <ellipse cx="101" cy="180" rx="18" ry="18" fill="#4ade80" opacity="0.6" />
        </g>

        {/* Tree 2 - Far left */}
        <g>
          <rect x="32" y="218" width="10" height="38" rx="3" fill="url(#trunkGrad)" />
          <ellipse cx="37" cy="205" rx="28" ry="25" fill="#15803d" />
          <ellipse cx="25" cy="210" rx="18" ry="16" fill="#166534" />
          <ellipse cx="50" cy="208" rx="16" ry="18" fill="#22c55e" />
        </g>

        {/* Tree 3 - Right */}
        <g>
          <rect x="1090" y="208" width="12" height="45" rx="3" fill="url(#trunkGrad)" />
          <ellipse cx="1096" cy="192" rx="38" ry="34" fill="#16a34a" />
          <ellipse cx="1078" cy="200" rx="22" ry="22" fill="#15803d" />
          <ellipse cx="1115" cy="198" rx="22" ry="24" fill="#22c55e" />
          <ellipse cx="1096" cy="178" rx="16" ry="16" fill="#4ade80" opacity="0.5" />
        </g>

        {/* Tree 4 - Far right */}
        <g>
          <rect x="1155" y="215" width="10" height="38" rx="3" fill="url(#trunkGrad)" />
          <ellipse cx="1160" cy="202" rx="30" ry="26" fill="#15803d" />
          <ellipse cx="1148" cy="208" rx="18" ry="16" fill="#166534" />
          <ellipse cx="1172" cy="205" rx="17" ry="19" fill="#22c55e" />
        </g>

        {/* Small bushes */}
        <ellipse cx="160" cy="252" rx="22" ry="12" fill="#22c55e" />
        <ellipse cx="300" cy="255" rx="16" ry="9" fill="#16a34a" />
        <ellipse cx="900" cy="253" rx="18" ry="10" fill="#22c55e" />
        <ellipse cx="1040" cy="256" rx="20" ry="11" fill="#16a34a" />

        {/* Flowers */}
        {[170, 195, 310, 880, 1050, 1070].map((x, i) => (
          <g key={`f-${i}`}>
            <circle cx={x} cy={248 + (i % 3) * 3} r="3.5" fill={['#ec4899', '#f43f5e', '#a855f7', '#f59e0b', '#ec4899', '#8b5cf6'][i]} />
            <circle cx={x} cy={248 + (i % 3) * 3} r="1.5" fill="#fbbf24" />
            <line x1={x} y1={251 + (i % 3) * 3} x2={x} y2={260 + (i % 3) * 3} stroke="#16a34a" strokeWidth="1" />
          </g>
        ))}

        {/* ---- SCHOOL BUS (animated) ---- */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-250,0;100,0;100,0"
            keyTimes="0;0.7;1"
            dur="12s"
            repeatCount="indefinite"
          />
          {/* Bus body */}
          <rect x="30" y="218" width="120" height="45" rx="6" fill="url(#busGrad)" />
          <rect x="30" y="218" width="120" height="10" rx="4 4 0 0" fill="#f97316" />

          {/* Windows */}
          <rect x="40" y="230" width="20" height="16" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.8" />
          <rect x="65" y="230" width="20" height="16" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.8" />
          <rect x="90" y="230" width="20" height="16" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.8" />
          <rect x="115" y="230" width="22" height="16" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="0.8" />

          {/* Door */}
          <rect x="138" y="233" width="12" height="28" rx="2" fill="#92400e" />

          {/* Wheels */}
          <circle cx="60" cy="265" r="10" fill="#1e293b" />
          <circle cx="60" cy="265" r="5" fill="#64748b">
            <animateTransform attributeName="transform" type="rotate" from="0 60 265" to="360 60 265" dur="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="125" cy="265" r="10" fill="#1e293b" />
          <circle cx="125" cy="265" r="5" fill="#64748b">
            <animateTransform attributeName="transform" type="rotate" from="0 125 265" to="360 125 265" dur="0.5s" repeatCount="indefinite" />
          </circle>

          {/* SCHOOL BUS text */}
          <text x="90" y="225" textAnchor="middle" fill="#78350f" fontFamily="sans-serif" fontWeight="bold" fontSize="7">VIGNAN SCHOOL BUS</text>

          {/* Headlights */}
          <circle cx="152" cy="248" r="4" fill="#fde68a" />
          <rect x="26" y="245" width="6" height="8" rx="2" fill="#dc2626" />

          {/* Kids silhouettes in windows */}
          <circle cx="50" cy="235" r="4" fill="#6366f1" opacity="0.5" />
          <circle cx="75" cy="236" r="4" fill="#ec4899" opacity="0.5" />
          <circle cx="100" cy="235" r="4" fill="#f59e0b" opacity="0.5" />
        </g>

        {/* ---- PLAYGROUND (right side) ---- */}
        <g>
          {/* Swing set */}
          <line x1="1000" y1="200" x2="1000" y2="250" stroke="#78716c" strokeWidth="3" />
          <line x1="1050" y1="200" x2="1050" y2="250" stroke="#78716c" strokeWidth="3" />
          <line x1="995" y1="200" x2="1055" y2="200" stroke="#78716c" strokeWidth="3" />

          {/* Swing 1 */}
          <line x1="1015" y1="200" x2="1010" y2="235" stroke="#a8a29e" strokeWidth="1.5" />
          <line x1="1015" y1="200" x2="1020" y2="235" stroke="#a8a29e" strokeWidth="1.5" />
          <rect x="1007" y="235" width="16" height="4" rx="1" fill="#92400e">
            <animateTransform attributeName="transform" type="rotate" values="-8 1015 200;8 1015 200;-8 1015 200" dur="2s" repeatCount="indefinite" />
          </rect>

          {/* Swing 2 */}
          <line x1="1035" y1="200" x2="1030" y2="235" stroke="#a8a29e" strokeWidth="1.5" />
          <line x1="1035" y1="200" x2="1040" y2="235" stroke="#a8a29e" strokeWidth="1.5" />
          <rect x="1027" y="235" width="16" height="4" rx="1" fill="#92400e">
            <animateTransform attributeName="transform" type="rotate" values="8 1035 200;-8 1035 200;8 1035 200" dur="2.2s" repeatCount="indefinite" />
          </rect>

          {/* Slide */}
          <line x1="1070" y1="210" x2="1070" y2="250" stroke="#3b82f6" strokeWidth="3" />
          <line x1="1070" y1="210" x2="1110" y2="250" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          <line x1="1070" y1="210" x2="1080" y2="210" stroke="#3b82f6" strokeWidth="3" />
        </g>

        {/* ---- KIDS PLAYING ---- */}
        {/* Kid 1 - waving */}
        <g>
          <circle cx="470" cy="270" r="6" fill="#fcd34d" />
          <rect x="467" y="276" width="6" height="12" rx="2" fill="#3b82f6" />
          <line x1="464" y1="278" x2="458" y2="270" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="x2" values="458;462;458" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="270;268;270" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="476" y1="278" x2="482" y2="283" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
          <line x1="468" y1="288" x2="464" y2="298" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="472" y1="288" x2="476" y2="298" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Kid 2 - with backpack */}
        <g>
          <circle cx="500" cy="272" r="5.5" fill="#a78bfa" />
          <rect x="497" y="278" width="6" height="11" rx="2" fill="#ec4899" />
          <rect x="501" y="279" width="5" height="8" rx="1" fill="#f97316" />
          <line x1="498" y1="289" x2="495" y2="298" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="502" y1="289" x2="505" y2="298" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Kid 3 - running */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;3,-2;0,0" dur="0.6s" repeatCount="indefinite" />
          <circle cx="440" cy="274" r="5" fill="#fb923c" />
          <rect x="437" y="280" width="6" height="10" rx="2" fill="#22c55e" />
          <line x1="438" y1="290" x2="432" y2="298" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="442" y1="290" x2="448" y2="298" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ---- FENCE ---- */}
        <g opacity="0.4">
          {Array.from({ length: 24 }, (_, i) => (
            <line key={`fence-${i}`} x1={50 * i + 25} y1="248" x2={50 * i + 25} y2="260" stroke="#78716c" strokeWidth="1.5" />
          ))}
          <line x1="0" y1="252" x2="1200" y2="252" stroke="#78716c" strokeWidth="1" />
        </g>

        {/* Ground texture dots */}
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={`dot-${i}`} cx={30 * i + 15} cy={275 + (i % 5) * 12} r="1" fill="rgba(0,0,0,0.06)" />
        ))}
      </svg>
    </div>
  );
}

export default SchoolScene;
