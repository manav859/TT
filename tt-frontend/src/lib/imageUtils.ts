/** Derive a Tailwind aspect-ratio key from image dimensions. */
export type ImageRatio = '1/1' | '4/3' | '3/4' | '16/9' | '3/2' | '2/3' | '16/7' | 'auto'

export function aspectRatioFromDimensions(
  width?: number,
  height?: number,
): ImageRatio | undefined {
  if (!width || !height) return undefined
  const r = width / height
  if (r < 0.72) return '2/3'
  if (r < 0.9)  return '3/4'
  if (r < 1.15) return '1/1'
  if (r < 1.45) return '4/3'
  if (r < 1.8)  return '3/2'
  return '16/9'
}
