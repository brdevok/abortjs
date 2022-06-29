import { Events } from '../../../src/core/events';
import { EventCallback, EventsStack } from '../../../src/core/events.types';
import { NOT_FN, NOT_STRING, WRONG_EVENT } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests form Events.remove() method.', () => {
	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		const event = 'wrong-name';

		expect.assertions(7);

		failFn(
			() => Events.remove(number as keyof EventsStack, () => true),
			NOT_STRING(number),
		);
		failFn(
			() => Events.remove(array as keyof EventsStack, () => true),
			NOT_STRING(array),
		);
		failFn(
			() => Events.remove(object as keyof EventsStack, () => true),
			NOT_STRING(object),
		);
		failFn(
			() => Events.remove('create', number as EventCallback),
			NOT_FN(number),
		);
		failFn(() => Events.remove('abort', array as EventCallback), NOT_FN(array));
		failFn(
			() => Events.remove('remove', object as EventCallback),
			NOT_FN(object),
		);
		failFn(
			() => Events.remove(event as keyof EventsStack, () => true),
			WRONG_EVENT(event),
		);
	});
});
