import { NOT_FN, NOT_OBJECT, NOT_STRING, WRONG_EVENT } from '../errors/errors';
import { compareObject } from '../utils/objects';
import { isFn, isObject, isString } from '../utils/types';
import { eventDataShape } from './events.constants';
import { EventCallback, EventData, EventsStack } from './events.types';

export class Events {
	private static readonly events: EventsStack = {
		create: [],
		remove: [],
		abort: [],
	};

	public static add(event: keyof EventsStack, callback: EventCallback): void {
		if (!isString(event)) {
			throw new Error(NOT_STRING(event));
		}
		if (!isFn(callback)) {
			throw new Error(NOT_FN(callback));
		}
		if (!this.events[event]) {
			throw new Error(WRONG_EVENT(event));
		}

		this.events[event].push(callback);
	}

	public static emit(event: keyof EventsStack, data: EventData): void {
		if (!isString(event)) {
			throw new Error(NOT_STRING(event));
		}
		if (!isObject(data)) {
			throw new Error(NOT_OBJECT(data));
		}
		if (!this.events[event]) {
			throw new Error(WRONG_EVENT(event));
		}
		compareObject(data, eventDataShape);

		this.events[event].forEach((callback) => callback(data));
	}

	public static remove(
		event: keyof EventsStack,
		callback: EventCallback,
	): void {
		if (!isString(event)) {
			throw new Error(NOT_STRING(event));
		}
		if (!isFn(callback)) {
			throw new Error(NOT_FN(callback));
		}
		if (!this.events[event]) {
			throw new Error(WRONG_EVENT(event));
		}

		const index = this.events[event].indexOf(callback);

		if (index > -1) {
			this.events[event].splice(index, 1);
		}
	}
}
