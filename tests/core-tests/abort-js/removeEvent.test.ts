import AbortJS from '../../../src';
import { Events } from '../../../src/core/events';
import { EventCallback, EventsStack } from '../../../src/core/events.types';
import { errors } from '../../../src/errors/errors';
import { failFn } from '../../utils/fail';

describe('Tests for AbortJS.removeEvent() method.', () => {

	it('Must remove same event callback added previously.', () => {
		let n1 = 0;
		let n2 = 1;
		let n3 = 2;

		const callback1 = () => n1++;
		const callback2 = () => n2++;
		const callback3 = () => n3++;

		Events.add('create', callback1);
		Events.add('create', callback2);
		Events.add('create', callback3);

		AbortJS.create('controller-1');

		expect(n1).toBe(1);
		expect(n2).toBe(2);
		expect(n3).toBe(3);

		Events.remove('create', callback2);
		AbortJS.create('controller-2');

		expect(n1).toBe(2);
		expect(n2).toBe(2);
		expect(n3).toBe(4);

		Events.remove('create', callback1);
		Events.remove('create', callback3);
		AbortJS.create('controller-3');

		expect(n1).toBe(2);
		expect(n2).toBe(2);
		expect(n3).toBe(4);
	});

	it('Calling with wrong arguments must throw errors', () => {
		const number: unknown = 1;
		const array: unknown = [];
		const object: unknown = {};

		expect.assertions(6);

		failFn(() => AbortJS.removeEvent(number as keyof EventsStack, () => true), errors.NOT_STRING(number));
		failFn(() => AbortJS.removeEvent(array as keyof EventsStack, () => true), errors.NOT_STRING(array));
		failFn(() => AbortJS.removeEvent(object as keyof EventsStack, () => true), errors.NOT_STRING(object));
		failFn(() => AbortJS.removeEvent('create', number as EventCallback), errors.NOT_FN(number));
		failFn(() => AbortJS.removeEvent('abort', array as EventCallback), errors.NOT_FN(array));
		failFn(() => AbortJS.removeEvent('remove', object as EventCallback), errors.NOT_FN(object));
	});

});
