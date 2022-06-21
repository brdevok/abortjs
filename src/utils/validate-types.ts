export const isString = (str: unknown): boolean => {
	if (typeof str === 'string') {
		return true;
	}
	return false;
};

export const isBoolean = (bool: unknown): boolean => {
	if (typeof bool === 'boolean') {
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

export const isDefined = (value: unknown): boolean => {
	if (value !== undefined) {
		return true;
	} 
	return false;
};
