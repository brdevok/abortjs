const prefix = 'AbortJS -';

export const errors = {
	NOT_STRING(value: unknown) {
		return `${prefix} Expected a string value, instead received '${typeof value}'.`;
	}, 
	NOT_FN(value: unknown) {
		return `${prefix} Expected a callback function, instead received '${typeof value}'.`;
	},
} as const;
