export type Controllers = Record<string, AbortController>;

export type AbortCollectionResults = Record<string, Promise<unknown> | unknown>;

export type AbortCallback = (signal: AbortSignal) => Promise<unknown> | unknown;
export type AbortCollection = Array<[string, AbortCallback]>;
