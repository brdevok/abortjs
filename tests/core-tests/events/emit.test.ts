import { Events } from '../../../src/core/events';
import { eventDataShape } from '../../../src/core/events.constants';
import { EventData, EventsStack } from '../../../src/core/events.types';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests form Events.emit() method.', () => {
	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const fn: unknown = () => true;

		const event = 'wrong-name';

		const data = { controller: 'x' };

		const data1 = { controller: number };
		const data2 = { controller: array };
		const data3 = { anyOtherKey: 'x' } as unknown;
		const data4 = {} as unknown;

		expect.assertions(11);

		failFn(
			() => Events.emit(number as keyof EventsStack, data),
			errors.NOT_STRING(number),
		);
		failFn(
			() => Events.emit(array as keyof EventsStack, data),
			errors.NOT_STRING(array),
		);
		failFn(
			() => Events.emit(fn as keyof EventsStack, data),
			errors.NOT_STRING(fn),
		);

		failFn(
			() => Events.emit('create', number as EventData),
			errors.NOT_OBJECT(number),
		);
		failFn(
			() => Events.emit('abort', array as EventData),
			errors.NOT_OBJECT(array),
		);
		failFn(() => Events.emit('remove', fn as EventData), errors.NOT_OBJECT(fn));

		failFn(
			() => Events.emit(event as keyof EventsStack, data),
			errors.WRONG_EVENT(event),
		);

		failFn(
			() => Events.emit('create' as keyof EventsStack, data1 as EventData),
			errors.WRONG_OBJ_VAL(number, 'controller', 'string'),
		);
		failFn(
			() => Events.emit('create' as keyof EventsStack, data2 as EventData),
			errors.WRONG_OBJ_VAL(array, 'controller', 'string'),
		);
		failFn(
			() => Events.emit('create' as keyof EventsStack, data3 as EventData),
			errors.WRONG_OBJ_KEY('anyOtherKey', eventDataShape),
		);
		failFn(
			() => Events.emit('create' as keyof EventsStack, data4 as EventData),
			errors.NOT_OBJ_KEY('controller', eventDataShape),
		);
	});
});
