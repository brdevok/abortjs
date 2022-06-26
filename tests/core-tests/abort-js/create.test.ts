import AbortJS from '../../../src';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests for AbortJS.create() method.', () => {

	it('Calling it must create a new controller and store it in controllers', () => {
		const controllerName = 'my-controller';
		let myController = AbortJS.get(controllerName);

		expect(myController).toBe(undefined);

		AbortJS.create(controllerName);
		myController = AbortJS.get(controllerName);

		expect(myController).toHaveProperty('signal');
		expect(myController).toHaveProperty('abort');
	});

	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(3);

		failFn(() => AbortJS.create(number as string), errors.NOT_STRING(number));
		failFn(() => AbortJS.create(array as string), errors.NOT_STRING(array));
		failFn(() => AbortJS.create(object as string), errors.NOT_STRING(object));
	});

});
