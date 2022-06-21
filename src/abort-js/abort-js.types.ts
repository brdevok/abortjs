export type Controllers = Record<string, AbortController>;

export type AbortCallback = (signal: AbortSignal) => Promise<unknown> | unknown;
