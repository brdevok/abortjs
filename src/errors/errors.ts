const prefix = 'AbortJS -';

export const NOT_STRING = (value: unknown, partial?: boolean) => {
	return `${prefix} Expected a ${
		partial ? 'string or undefined' : 'string'
	} value, instead received '${typeof value}'.`;
};

export const NOT_BOOLEAN = (value: unknown, partial?: boolean) => {
	return `${prefix} Expected a ${
		partial ? 'boolean or undefined' : 'boolean'
	} value, instead received '${typeof value}'.`;
};

export const NOT_ARRAY = (value: unknown, partial?: boolean) => {
	return `${prefix} Expected an ${
		partial ? 'array or undefined' : 'array'
	} value, instead received '${typeof value}'.`;
};

export const NOT_OBJECT = (value: unknown, partial?: boolean) => {
	return `${prefix} Expected an ${
		partial ? 'object or undefined' : 'object'
	} value, instead received '${typeof value}'.`;
};

export const NOT_FN = (value: unknown, partial?: boolean) => {
	return `${prefix} Expected a ${
		partial ? 'callback funcion or undefined' : 'callback function'
	}, instead received '${typeof value}'.`;
};

export const WRONG_LENGTH = (array: Array<unknown>, amount: number) => {
	return `${prefix} Expected an array with a length of ${amount}, instead received an array with ${array.length} items.`;
};

export const WRONG_EVENT =(event: string) => {
	return `${prefix} Expected a valid event name, instead received '${event}'.`;
};

export const NOT_OBJ_KEY = (key: string, shape: object) => {
	return `${prefix} Key '${key}' doesn't exist on object but it was defined as required in shape. Valid keys: ["${Object.keys(
		shape,
	).join('", "')}"].`;
};

export const WRONG_OBJ_VAL = (val: unknown, key: string, expected: string) => {
	return `${prefix} Value of '${key}' doesn't match the defined in shape (${key}: ${expected}), instead received '${typeof val}'.`;
};

export const WRONG_OBJ_KEY = (key: string, shape: object) => {
	return `${prefix} Key '${key}' doesn't exist on shape but it was defined in object. Valid keys: ["${Object.keys(
		shape,
	).join('", "')}"].`;
};
