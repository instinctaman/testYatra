import React from "react";

export const CheckIcon = ({ color = "#22c55e" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle
      cx="8"
      cy="8"
      r="8"
      fill={color}
      fillOpacity="0.15"
    />
    <path
      d="M4.5 8L7 10.5L11.5 5.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle
      cx="8"
      cy="8"
      r="8"
      fill="#f97316"
      fillOpacity="0.15"
    />
    <path
      d="M8 5v4"
      stroke="#f97316"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle
      cx="8"
      cy="11.5"
      r="0.8"
      fill="#f97316"
    />
  </svg>
);

export const GiftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 12v10H4V12"
      stroke="#3aed9f"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 7H2v5h20V7z"
      stroke="#7c3aed"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"
      stroke="#7c3aed"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
      stroke="#0ea5e9"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);