const prefix = 'AbortJS -';

export const errors = {
	NOT_STRING(value: unknown, partial?: boolean) {
		return `${prefix} Expected a ${partial ? 'string or undefined' : 'string'} value, instead received '${typeof value}'.`;
	}, 
	NOT_BOOLEAN(value: unknown, partial?: boolean) {
		return `${prefix} Expected a ${partial ? 'boolean or undefined' : 'boolean'} value, instead received '${typeof value}'.`;
	},
	NOT_ARRAY(value: unknown, partial?: boolean) {
		return `${prefix} Expected an ${partial ? 'array or undefined' : 'array'} value, instead received '${typeof value}'.`;
	},
	NOT_OBJECT(value: unknown, partial?: boolean) {
		return `${prefix} Expected an ${partial ? 'object or undefined' : 'object'} value, instead received '${typeof value}'.`;
	},
	NOT_FN(value: unknown, partial?: boolean) {
		return `${prefix} Expected a ${partial ? 'callback funcion or undefined' : 'callback function'}, instead received '${typeof value}'.`;
	},
	WRONG_LENGTH(array: Array<unknown>, amount: number) {
		return `${prefix} Expected an array with a length of ${amount}, instead received an array with ${array.length} items.`;
	},
	WRONG_EVENT(event: string) {
		return `${prefix} Expected a valid event name, instead received '${event}'.`;
	},
	NOT_OBJ_KEY(key: string, shape: object) {
		return `${prefix} Key '${key}' doesn't exist on object but it was defined as required in shape. Valid keys: ["${Object.keys(shape).join('", "')}"].`;
	},
	WRONG_OBJ_VAL(val: unknown, key: string, expected: string) {
		return `${prefix} Value of '${key}' doesn't match the defined in shape (${key}: ${expected}), instead received '${typeof val}'.`;
	},
	WRONG_OBJ_KEY(key: string, shape: object) {
		return `${prefix} Key '${key}' doesn't exist on shape but it was defined in object. Valid keys: ["${Object.keys(shape).join('", "')}"].`;
	},
} as const;
