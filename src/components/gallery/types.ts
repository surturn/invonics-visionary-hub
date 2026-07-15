export type PosterLayer = {
  /** Imported asset URL. */
  src: string;
  alt: string;
  /** Stacking order — 1 = base/background, higher = closer to viewer. */
  zIndex: number;
  /**
   * Parallax displacement in px at max pointer offset from center.
   * Negative values move opposite the cursor (used for foreground layers);
   * near-zero values keep a layer nearly static (used for backgrounds).
   */
  parallax?: number;
  /**
   * This layer's size as a fraction (0-1) of the shared master canvas,
   * derived from the layer's ORIGINAL native pixel dimensions before any
   * export/resize — not from the current asset file's pixel size, which may
   * have been independently downscaled. Layers are centered within the
   * canvas at this size. Omit (defaults to 1/1) for full-bleed backgrounds.
   */
  widthPct?: number;
  heightPct?: number;
};
