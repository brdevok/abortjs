export const isString = (str: unknown): boolean => {
	if (typeof str === 'string') {
		return true;
	}
	return false;
};

export const isFn = (fn: unknown): boolean => {
	if (typeof fn === 'function') {
		return true;
	}
	return false;
};
