import AbortJS from '../../../src';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests for AbortJS.get() method.', () => {
	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(3);

		failFn(() => AbortJS.get(number as string), errors.NOT_STRING(number));
		failFn(() => AbortJS.get(array as string), errors.NOT_STRING(array));
		failFn(() => AbortJS.get(object as string), errors.NOT_STRING(object));
	});
});
