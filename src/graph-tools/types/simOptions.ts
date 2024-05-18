export const AlphaOptionKeys = {
  alpha: "alpha",
  alphaMin: "alphaMin",
  alphaTarget: "alphaTarget",
  alphaDecay: "alphaDecay",
} as const;
export type AlphaOptionKey =
  (typeof AlphaOptionKeys)[keyof typeof AlphaOptionKeys];
type BaseOptions = {
  // eslint-disable-next-line no-unused-vars
  [K in AlphaOptionKey]: number;
};
export type SimOptions = Partial<BaseOptions>;
