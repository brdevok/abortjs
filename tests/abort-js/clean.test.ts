import AbortJS from '../../src';
import { errors } from '../../src/errors/errors';
import { failFn } from '../utils/fail';

describe('Tests for AbortJS.clean() method.', () => {

	it('Calling it must remove all controllers in controllers property.', () => {
		const names = [ 'a', 'b', 'c', 'd' ];
		
		names.forEach(name => {
			AbortJS.create(name);
			const controller = AbortJS.get(name);

			expect(controller).not.toBe(undefined);
		});

		AbortJS.clean();
		names.forEach(name => {
			const controller = AbortJS.get(name);

			expect(controller).toBe(undefined);
		});
	});

	it('Calling with wrong arguments must throw errors', async () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(3);

		await Promise.all([
			failFn(() => AbortJS.clean(number as boolean), errors.NOT_BOOLEAN(number, true)),
			failFn(() => AbortJS.clean(array as boolean), errors.NOT_BOOLEAN(array, true)),
			failFn(() => AbortJS.clean(object as boolean), errors.NOT_BOOLEAN(object, true)),
		]);
	});

});
