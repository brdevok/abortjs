import AbortJS from '../../../src';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests for AbortJS.abort() method.', () => {
	it('Calling it must abort a controller.', () => {
		const controllerName = 'my-controller';

		AbortJS.create(controllerName);

		const myController = AbortJS.get(controllerName);
		const abortSpy = jest.spyOn(myController, 'abort');

		AbortJS.abort(controllerName);

		expect(abortSpy).toBeCalledTimes(1);
	});

	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(3);

		failFn(() => AbortJS.abort(number as string), errors.NOT_STRING(number));
		failFn(() => AbortJS.abort(array as string), errors.NOT_STRING(array));
		failFn(() => AbortJS.abort(object as string), errors.NOT_STRING(object));
	});
});
