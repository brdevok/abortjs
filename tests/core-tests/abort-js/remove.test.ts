import AbortJS from '../../../src';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests for AbortJS.remove() method.', () => {

	it('Calling it must a specific controller from controllers property.', () => {
		const controllerName = 'my-controller';
		let myController = AbortJS.get(controllerName);

		expect(myController).toBe(undefined);

		AbortJS.create(controllerName);
		myController = AbortJS.get(controllerName);

		expect(myController).toHaveProperty('signal');
		expect(myController).toHaveProperty('abort');

		AbortJS.remove(controllerName);
		myController = AbortJS.get(controllerName);

		expect(myController).toBe(undefined);
	});

	it('Calling with second param as true must abort controller.', () => {
		const controllerName = 'my-controller';

		AbortJS.create(controllerName);
		
		const myController = AbortJS.get(controllerName);
		const abortSpy = jest.spyOn(myController, 'abort');

		AbortJS.remove(controllerName, true);

		expect(abortSpy).toBeCalledTimes(1);
	});

	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(6);

		failFn(() => AbortJS.remove(number as string), errors.NOT_STRING(number));
		failFn(() => AbortJS.remove(array as string), errors.NOT_STRING(array));
		failFn(() => AbortJS.remove(object as string), errors.NOT_STRING(object));
		failFn(() => AbortJS.remove('x', number as boolean), errors.NOT_BOOLEAN(number, true));
		failFn(() => AbortJS.remove('x', array as boolean), errors.NOT_BOOLEAN(array, true));
		failFn(() => AbortJS.remove('x', object as boolean), errors.NOT_BOOLEAN(object, true));
	});

});
