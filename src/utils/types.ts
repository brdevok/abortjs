export type TypeCheckFn = (value: unknown) => boolean;

export const isString: TypeCheckFn = (str) => {
	if (typeof str === 'string') {
		return true;
	}
	return false;
};

export const isBoolean: TypeCheckFn = (bool) => {
	if (typeof bool === 'boolean') {
		return true;
	}
	return false;
};

export const isArray: TypeCheckFn = (array) => {
	if (Array.isArray(array)) {
		return true;
	}
	return false;
};

export const isObject: TypeCheckFn = (object) => {
	if (typeof object === 'object' && object !== null && !Array.isArray(object)) {
		return true;
	}
	return false;
};

export const isFn: TypeCheckFn = (fn) => {
	if (typeof fn === 'function') {
		return true;
	}
	return false;
};

export const isDefined: TypeCheckFn = (value) => {
	if (value !== undefined) {
		return true;
	}
	return false;
};

export interface TypeCheckObj {
	val: TypeCheckFn;
	expected: string;
}

export type TypeCheckObjectShape = Record<any, TypeCheckObj>;

export const types: Record<string, () => TypeCheckObj> = {
	string(): TypeCheckObj {
		return {
			val(v) {
				return isString(v);
			},
			expected: 'string',
		};
	},
	// Upgrade when needed
} as const;
