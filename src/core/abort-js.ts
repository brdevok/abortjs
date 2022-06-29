import { Events } from './events';
import { EventCallback, EventsStack } from './events.types';
import { lengthOf } from '../utils/arrays';
import { isArray, isBoolean, isDefined, isFn, isString } from '../utils/types';
import {
	Controllers,
	AbortCallback,
	AbortCollection,
	AbortCollectionResults,
} from './abort-js.types';
import { NOT_ARRAY, NOT_BOOLEAN, NOT_FN, NOT_STRING, WRONG_LENGTH } from '../errors/errors';

export class AbortJS {
	private static controllers: Controllers = {};

	public static async watch<T = unknown>(
		name: string,
		callback: AbortCallback,
	): Promise<T> {
		if (!isString(name)) {
			throw new Error(NOT_STRING(name));
		}
		if (!isFn(callback)) {
			throw new Error(NOT_FN(callback));
		}

		this.remove(name, true);
		this.create(name);
		return (await callback(this.get(name).signal)) as T;
	}

	public static watchAll(collection: AbortCollection): AbortCollectionResults {
		if (!isArray(collection)) {
			throw new Error(NOT_ARRAY(collection));
		}

		const watchHash: Record<string, AbortCallback> = {};
		const results: AbortCollectionResults = {};

		collection.forEach((chunk) => {
			if (!lengthOf(chunk, 2)) {
				throw new Error(WRONG_LENGTH(collection, 2));
			}

			const [name, callback] = chunk;

			if (!isString(name)) {
				throw new Error(NOT_STRING(name));
			}
			if (!isFn(callback)) {
				throw new Error(NOT_FN(callback));
			}

			if (watchHash[name]) {
				delete watchHash[name];
			}
			watchHash[name] = callback;
		});

		for (const name in watchHash) {
			results[name] = this.watch(name, watchHash[name]);
		}

		return results;
	}

	public static abort(name: string): void {
		if (!isString(name)) {
			throw new Error(NOT_STRING(name));
		}

		if (this.controllers[name]) {
			this.controllers[name].abort();
			Events.emit('abort', { controller: name });
		}
	}

	public static get(name: string): AbortController {
		if (!isString(name)) {
			throw new Error(NOT_STRING(name));
		}

		return this.controllers[name];
	}

	public static create(name: string): void {
		if (!isString(name)) {
			throw new Error(NOT_STRING(name));
		}

		this.controllers[name] = new AbortController();
		Events.emit('create', { controller: name });
	}

	public static clean(abort?: boolean): void {
		if (isDefined(abort) && !isBoolean(abort)) {
			throw new Error(NOT_BOOLEAN(abort, true));
		}

		for (const controller in this.controllers) {
			this.remove(controller, abort);
		}
	}

	public static remove(name: string, abort?: boolean): void {
		if (!isString(name)) {
			throw new Error(NOT_STRING(name));
		}
		if (isDefined(abort) && !isBoolean(abort)) {
			throw new Error(NOT_BOOLEAN(abort, true));
		}

		if (this.controllers[name]) {
			if (abort) {
				this.controllers[name].abort();
				Events.emit('abort', { controller: name });
			}
			delete this.controllers[name];
			Events.emit('remove', { controller: name });
		}
	}

	public static on(event: keyof EventsStack, callback: EventCallback): void {
		if (!isString(event)) {
			throw new Error(NOT_STRING(event));
		}
		if (!isFn(callback)) {
			throw new Error(NOT_FN(callback));
		}

		Events.add(event, callback);
	}

	public static removeEvent(
		event: keyof EventsStack,
		callback: EventCallback,
	): void {
		if (!isString(event)) {
			throw new Error(NOT_STRING(event));
		}
		if (!isFn(callback)) {
			throw new Error(NOT_FN(callback));
		}

		Events.remove(event, callback);
	}
}
