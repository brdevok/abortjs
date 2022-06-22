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
	NOT_FN(value: unknown, partial?: boolean) {
		return `${prefix} Expected a ${partial ? 'callback funcion or undefined' : 'callback function'}, instead received '${typeof value}'.`;
	},
	WRONG_LENGTH(array: Array<unknown>, amount: number) {
		return `${prefix} Expected an array with a length of ${amount}, instead received an array with ${array.length} items.`;
	},
} as const;
