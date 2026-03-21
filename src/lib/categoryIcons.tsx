import React from 'react';

export const categoryIcons: Record<string, React.ReactNode> = {
  'delovi-za-kapije': (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="16" height="18" rx="2"/>
      <line x1="19" y1="10" x2="25" y2="10"/>
      <line x1="19" y1="14" x2="25" y2="14"/>
      <line x1="19" y1="18" x2="23" y2="18"/>
      <circle cx="13" cy="15" r="2"/>
    </svg>
  ),
  'interfoni': (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="18" height="24" rx="3"/>
      <rect x="8" y="6" width="8" height="6" rx="1.5"/>
      <circle cx="18" cy="9" r="2"/>
      <rect x="8" y="16" width="4" height="3" rx="1"/>
      <rect x="14" y="16" width="4" height="3" rx="1"/>
      <rect x="8" y="21" width="4" height="3" rx="1"/>
      <rect x="14" y="21" width="4" height="3" rx="1"/>
    </svg>
  ),
  'motori-za-klizne-kapije': (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="18" height="10" rx="3"/>
      <rect x="20" y="11" width="6" height="6" rx="2"/>
      <line x1="2" y1="22" x2="26" y2="22"/>
      <circle cx="6" cy="22" r="2"/>
      <circle cx="20" cy="22" r="2"/>
      <line x1="5" y1="12" x2="5" y2="16"/>
      <line x1="9" y1="12" x2="9" y2="16"/>
      <line x1="13" y1="12" x2="13" y2="16"/>
    </svg>
  ),
  'motori-za-krilne-kapije': (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="3" width="4" height="22" rx="1.5"/>
      <path d="M16 5l8 3v12l-8 3"/>
      <path d="M12 5L4 8v12l8 3"/>
      <circle cx="14" cy="14" r="2"/>
    </svg>
  ),
  'smart-home-sistemi': (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L14 3l11 9"/>
      <path d="M6 10v13h6v-6h4v6h6V10"/>
      <circle cx="21" cy="8" r="2.5"/>
      <path d="M21 5.5V3M23.8 6.2l1.5-1.5M24.5 9h2.5M23.8 11.8l1.5 1.5"/>
    </svg>
  ),
};

export function getCategoryIcon(slug: string): React.ReactNode {
  return categoryIcons[slug] ?? (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="4" y="4" width="20" height="20" rx="4"/>
      <circle cx="14" cy="14" r="4"/>
    </svg>
  );
}
