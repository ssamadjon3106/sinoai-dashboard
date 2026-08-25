/**
 * Purely decorative full-viewport backdrop for the login screen. Reuses the
 * product's own visual language — oversized risk-gauge rings with threshold
 * ticks, small dots in each domain's accent color, and heartbeat traces —
 * instead of generic art, so the background itself signals "AI-read
 * wearable health risk" rather than being neutral chrome. Layered enough to
 * feel considered, but still calm enough to stay out of the way of the
 * centered login card.
 */
export function LoginBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-canvas"
      style={{
        backgroundImage: [
          'radial-gradient(ellipse 1000px 700px at 88% 6%, #D2ECE3 0%, transparent 62%)',
          'radial-gradient(ellipse 800px 600px at 4% 98%, #D2ECE3 0%, transparent 65%)',
          'radial-gradient(ellipse 900px 500px at 50% 45%, #EAF6F2 0%, transparent 70%)',
          'linear-gradient(135deg, #F7F9F8 0%, #EEF6F3 50%, #F7F9F8 100%)',
        ].join(', '),
      }}
    >
      {/* Faint dot grid for texture */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, #CBD6D3 1px, transparent 1.4px)', backgroundSize: '28px 28px', opacity: 0.35 }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Large gauge track + reading, echoing the product's RiskGauge, top-right */}
        <circle cx="1260" cy="120" r="260" stroke="#C6E0D8" strokeWidth="30" opacity="0.9" />
        <path d="M 1485 -10 A 260 260 0 0 1 1427 319" stroke="#4E9C82" strokeWidth="30" strokeLinecap="round" opacity="0.7" />
        <line x1="1260" y1="-170" x2="1260" y2="-144" stroke="#8FC2AE" strokeWidth="3.5" strokeLinecap="round" transform="rotate(70 1260 120)" />
        <line x1="1260" y1="-170" x2="1260" y2="-144" stroke="#8FC2AE" strokeWidth="3.5" strokeLinecap="round" transform="rotate(110 1260 120)" />
        <line x1="1260" y1="-170" x2="1260" y2="-144" stroke="#8FC2AE" strokeWidth="3.5" strokeLinecap="round" transform="rotate(150 1260 120)" />

        {/* Domain-accent marker dots orbiting the large ring, hinting at the three risk domains */}
        <circle cx="1496" cy="10" r="6" fill="#B98900" opacity="0.5" />
        <circle cx="1427" cy="319" r="5" fill="#A6455C" opacity="0.45" />
        <circle cx="1305" cy="376" r="5" fill="#6B5CA5" opacity="0.45" />

        {/* Mid-page satellite ring, small, adds depth without competing with the card */}
        <circle cx="1180" cy="640" r="80" stroke="#D2ECE3" strokeWidth="14" opacity="0.55" />
        <path d="M 1180 560 A 80 80 0 0 1 1249 600" stroke="#72BFA8" strokeWidth="14" strokeLinecap="round" opacity="0.5" />

        {/* Smaller gauge track + reading, bottom-left, with matching ticks */}
        <circle cx="60" cy="820" r="200" stroke="#C6E0D8" strokeWidth="24" opacity="0.85" />
        <path d="M 60 620 A 200 200 0 0 1 224 705" stroke="#8FC2AE" strokeWidth="24" strokeLinecap="round" opacity="0.65" />
        <line x1="60" y1="608" x2="60" y2="634" stroke="#8FC2AE" strokeWidth="3" strokeLinecap="round" transform="rotate(-30 60 820)" />
        <line x1="60" y1="608" x2="60" y2="634" stroke="#8FC2AE" strokeWidth="3" strokeLinecap="round" transform="rotate(40 60 820)" />
        <circle cx="270" cy="900" r="5" fill="#B98900" opacity="0.4" />
        <circle cx="-60" cy="700" r="5" fill="#6B5CA5" opacity="0.4" />

        {/* Heartbeat / ECG traces, tying the pattern to wearable vitals monitoring */}
        <path
          d="M0,190 L110,190 L133,150 L155,235 L178,175 L200,190 L460,190 L483,150 L505,235 L528,175 L550,190 L810,190 L833,150 L855,235 L878,175 L900,190 L1160,190 L1183,150 L1205,235 L1228,175 L1250,190 L1440,190"
          stroke="#B7CFC6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
        <path
          d="M0,570 L120,570 L145,510 L168,625 L190,540 L215,570 L470,570 L495,510 L518,625 L540,540 L565,570 L820,570 L845,510 L868,625 L890,540 L915,570 L1170,570 L1195,510 L1218,625 L1240,540 L1265,570 L1440,570"
          stroke="#9DBBAF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
