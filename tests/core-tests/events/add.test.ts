import { Events } from '../../../src/core/events';
import { EventCallback, EventsStack } from '../../../src/core/events.types';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests form Events.add() method.', () => {

	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		const event = 'wrong-name';

		expect.assertions(7);

		failFn(() => Events.add(number as keyof EventsStack, () => true), errors.NOT_STRING(number));
		failFn(() => Events.add(array as keyof EventsStack, () => true), errors.NOT_STRING(array));
		failFn(() => Events.add(object as keyof EventsStack, () => true), errors.NOT_STRING(object));
		failFn(() => Events.add('create', number as EventCallback), errors.NOT_FN(number));
		failFn(() => Events.add('abort', array as EventCallback), errors.NOT_FN(array));
		failFn(() => Events.add('remove', object as EventCallback), errors.NOT_FN(object));
		failFn(() => Events.add(event as keyof EventsStack, () => true), errors.WRONG_EVENT(event));
	});

});
