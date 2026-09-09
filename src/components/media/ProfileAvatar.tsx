import React, { useState } from 'react'
import { User, Camera } from 'lucide-react'

export type AvatarShape = 'circle' | 'square' | 'rounded' | 'squircle'
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface ProfileAvatarProps {
  src?: string
  alt?: string
  name?: string
  shape?: AvatarShape
  size?: AvatarSize
  status?: AvatarStatus
  showStatus?: boolean
  isEditable?: boolean
  onEditClick?: () => void
  className?: string
}

const SIZE_CONFIG: Record<
  AvatarSize,
  { box: string; textSize: string; iconSize: string; statusDot: string }
> = {
  xs: { box: 'w-6 h-6', textSize: 'text-[10px]', iconSize: 'w-3 h-3', statusDot: 'w-1.5 h-1.5' },
  sm: { box: 'w-8 h-8', textSize: 'text-xs', iconSize: 'w-4 h-4', statusDot: 'w-2 h-2' },
  md: { box: 'w-10 h-10', textSize: 'text-sm font-semibold', iconSize: 'w-5 h-5', statusDot: 'w-2.5 h-2.5' },
  lg: { box: 'w-14 h-14', textSize: 'text-base font-bold', iconSize: 'w-6 h-6', statusDot: 'w-3 h-3' },
  xl: { box: 'w-20 h-20', textSize: 'text-xl font-bold', iconSize: 'w-8 h-8', statusDot: 'w-4 h-4' },
  '2xl': { box: 'w-28 h-28', textSize: 'text-2xl font-bold', iconSize: 'w-10 h-10', statusDot: 'w-5 h-5' },
}

const SHAPE_CONFIG: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-xl',
  squircle: 'rounded-[28%]',
}

const STATUS_CONFIG: Record<AvatarStatus, { bg: string; label: string }> = {
  online: { bg: 'bg-emerald-400 ring-2 ring-slate-950', label: 'Online' },
  busy: { bg: 'bg-rose-500 ring-2 ring-slate-950', label: 'Busy' },
  away: { bg: 'bg-amber-400 ring-2 ring-slate-950', label: 'Away' },
  offline: { bg: 'bg-slate-500 ring-2 ring-slate-950', label: 'Offline' },
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  shape = 'circle',
  size = 'md',
  status = 'online',
  showStatus = false,
  isEditable = false,
  onEditClick,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false)
  const sizeStyles = SIZE_CONFIG[size] || SIZE_CONFIG.md
  const shapeStyles = SHAPE_CONFIG[shape] || SHAPE_CONFIG.circle
  const statusStyles = STATUS_CONFIG[status] || STATUS_CONFIG.online

  const getInitials = (nameStr?: string) => {
    if (!nameStr) return ''
    const parts = nameStr.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return nameStr.slice(0, 2).toUpperCase()
  }

  const initials = getInitials(name)

  return (
    <div className={`relative inline-flex shrink-0 ${sizeStyles.box} ${className}`}>
      {/* Avatar Container */}
      <div
        className={`w-full h-full ${shapeStyles} overflow-hidden bg-slate-800 border border-slate-700/80 flex items-center justify-center select-none shadow-xs group`}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Profile avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span className={`text-slate-200 font-semibold tracking-wider ${sizeStyles.textSize}`}>
            {initials}
          </span>
        ) : (
          <User className={`${sizeStyles.iconSize} text-slate-400`} />
        )}

        {/* Hover Camera Overlay if editable */}
        {isEditable && (
          <button
            type="button"
            onClick={onEditClick}
            className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200 cursor-pointer"
            title="Update profile picture"
          >
            <Camera className={`${sizeStyles.iconSize} drop-shadow-md`} />
          </button>
        )}
      </div>

      {/* Online Status Dot */}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ${sizeStyles.statusDot} ${statusStyles.bg}`}
          title={statusStyles.label}
        />
      )}
    </div>
  )
}
