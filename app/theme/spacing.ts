import { responsive } from "app/utils/responsive"

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: responsive(2),
  xxs: responsive(4),
  xs: responsive(8),
  sm: responsive(12),
  md: responsive(16),
  lg: responsive(24),
  xl: responsive(32),
  xxl: responsive(48),
  xxxl: responsive(64),
} as const

export type Spacing = keyof typeof spacing
