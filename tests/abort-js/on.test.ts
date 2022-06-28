import AbortJS from '../../src';
import { AbortJSEvents } from '../../src/abort-js-events/abort-js-events';
import { EventCallback, EventData, Events } from '../../src/abort-js-events/abort-js-events.types';
import { errors } from '../../src/errors/errors';
import { failFn } from '../utils/fail';

describe('Tests for AbortJS.on() method.', () => {

	it ('An event must be fired with data on create, remove and abort actions.', () => {
		const name = 'my-controller';

		let create = {};
		let remove = {};
		let abort = {};

		const expected: EventData = {
			controller: name,
		};

		const addEventToSpy = jest.spyOn(AbortJSEvents, 'addEventTo');
		const emitSpy = jest.spyOn(AbortJSEvents, 'emit');

		AbortJS.on('create', (e) => create = e);
		AbortJS.on('remove', (e) => remove = e);
		AbortJS.on('abort', (e) => abort = e);

		AbortJS.create(name);
		AbortJS.abort(name);
		AbortJS.remove(name);

		expect(addEventToSpy).toBeCalledTimes(3);
		expect(emitSpy).toBeCalledTimes(3);

		expect(create).toEqual(expect.objectContaining(expected));
		expect(remove).toEqual(expect.objectContaining(expected));
		expect(abort).toEqual(expect.objectContaining(expected));
	});

	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(6);

		failFn(() => AbortJS.on(number as keyof Events, () => true), errors.NOT_STRING(number));
		failFn(() => AbortJS.on(array as keyof Events, () => true), errors.NOT_STRING(array));
		failFn(() => AbortJS.on(object as keyof Events, () => true), errors.NOT_STRING(object));
		failFn(() => AbortJS.on('create', number as EventCallback), errors.NOT_FN(number));
		failFn(() => AbortJS.on('abort', array as EventCallback), errors.NOT_FN(array));
		failFn(() => AbortJS.on('remove', object as EventCallback), errors.NOT_FN(object));
	});

});
