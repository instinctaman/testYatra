export default function TravelLogo({
  bgColor,
  iconColor,
  textColor,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 200"
      width="100%"
      height="100%"
    >
      <g id="travel-icons">
        <g id="icon-flight">
          <rect fill={bgColor} x="20" y="10" width="100" height="100" rx="12" />
          <path
            fill={iconColor}
            d="M70,25 L74,35 L95,50 L95,58 L74,52 L74,75 L82,82 L82,88 L70,84 L58,88 L58,82 L66,75 L66,52 L45,58 L45,50 L66,35 Z"
          />
        </g>

        <g id="icon-luggage">
          <rect fill={bgColor} x="135" y="10" width="100" height="100" rx="12" />
          <path fill={iconColor} d="M165,35 V25 H205V35 H200V28 H170V35 Z" />
          <rect fill={iconColor} x="155" y="35" width="60" height="55" rx="6" />
          <rect fill={bgColor} x="167" y="42" width="6" height="42" />
          <rect fill={bgColor} x="197" y="42" width="6" height="42" />
        </g>

        <g id="icon-hotel">
          <rect fill={bgColor} x="250" y="10" width="100" height="100" rx="12" />
          <rect fill={iconColor} x="262" y="40" width="8" height="45" rx="2" />
          <rect fill={iconColor} x="330" y="55" width="8" height="30" rx="2" />
          <rect fill={iconColor} x="270" y="62" width="60" height="8" />
          <rect fill={iconColor} x="274" y="48" width="14" height="10" rx="2" />
        </g>

        <g id="icon-train">
          <rect fill={bgColor} x="365" y="10" width="100" height="100" rx="12" />
          <path
            fill={iconColor}
            d="M380,35 Q380,25 400,25 L430,25 Q450,25 450,35 L450,80 Q450,85 440,85 L390,85 Q380,85 380,80 Z"
          />
          <path
            fill={bgColor}
            d="M386,34 Q386,30 395,30 L435,30 Q444,30 444,34 L444,52 L386,52 Z"
          />
          <circle fill={bgColor} cx="398" cy="72" r="5" />
          <circle fill={bgColor} cx="432" cy="72" r="5" />
        </g>
      </g>

      <text
        id="logo-text"
        fill={textColor}
        x="240"
        y="175"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="76"
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="-1"
      >
        YatraB2B
      </text>
    </svg>
  );
}