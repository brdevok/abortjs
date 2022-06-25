export type Controllers = Record<string, AbortController>;

export type AbortCallbackResult = Promise<unknown> | unknown;
export type AbortCollectionResults = Record<string, AbortCallbackResult>;

export type AbortCallback = (signal: AbortSignal) => AbortCallbackResult;
export type AbortCollection = Array<[string, AbortCallback]>;
