import React from 'react';

export const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
      fill={color}
    />
  </svg>
);

export const SearchIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      fill={color}
    />
  </svg>
);

export const PlusIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
      fill={color}
    />
  </svg>
);

export const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill={color}
    />
  </svg>
);

export const TrophyIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1h2v2c0 .55.45 1 1 1h1v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-7h1c.55 0 1-.45 1-1V8h2V7c0-1.1-.9-2-2-2zm-2 3H7V8h10v0z"
      fill={color}
    />
  </svg>
);

export const HeartIcon = ({ color, size, filled = false }: { color: string; size: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={1.5}
    />
  </svg>
);

export const ShareIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.06c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
      fill={color}
    />
  </svg>
);

export const FollowIcon = ({ color, size, filled = false }: { color: string; size: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm9 0c-.29 0-.62.02-.97.05 1.16.89 1.97 2.05 1.97 3.95v2h6v-2c0-2.66-5.33-4-8-4z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={1.5}
    />
  </svg>
);

export const BackIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      fill={color}
    />
  </svg>
);
