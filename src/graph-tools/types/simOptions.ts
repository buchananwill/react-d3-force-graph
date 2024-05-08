export const AlphaOptionKeys = {
    alpha: 'alpha',
    alphaMin: 'alphaMin',
    alphaTarget: 'alphaTarget',
    alphaDecay: 'alphaDecay'
} as const
export type AlphaOptionKey = typeof AlphaOptionKeys[keyof typeof AlphaOptionKeys];
type BaseOptions = {
    [K in AlphaOptionKey]: number
}
export type SimOptions = Partial<BaseOptions>