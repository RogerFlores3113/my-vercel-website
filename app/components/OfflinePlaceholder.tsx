import React from "react";

interface Props {
  icon?: React.ReactNode;
  label?: string;
}

export default function OfflinePlaceholder({ icon, label }: Props = {}) {
  const defaultIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  return (
    <div className="offline-placeholder">
      {icon ?? defaultIcon}
      <span>{label ?? "Downloadable · Not a web app"}</span>
    </div>
  );
}
