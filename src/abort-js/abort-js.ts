import { AbortJSEvents } from '../abort-js-events/abort-js-events';
import { EventCallback, Events } from '../abort-js-events/abort-js-events.types';
import { errors } from '../errors/errors';
import { lengthOf } from '../utils/arrays';
import { isArray, isBoolean, isDefined, isFn, isString } from '../utils/validate-types';
import { Controllers, AbortCallback, AbortCollection, AbortCollectionResults } from './abort-js.types';

export class AbortJS {
	private static controllers: Controllers = {};

	public static async watch<T = unknown>(
		name: string, 
		callback: AbortCallback,
	): Promise<T> {
		if (!isString(name)) {
			throw new Error(errors.NOT_STRING(name));
		}
		if (!isFn(callback)) {
			throw new Error(errors.NOT_FN(callback));
		}

		this.remove(name, true);
		this.create(name);
		return await callback(this.get(name).signal) as T;
	}

	public static watchAll(collection: AbortCollection): AbortCollectionResults {
		if (!isArray(collection)) {
			throw new Error(errors.NOT_ARRAY(collection));
		}

		const watchHash: Record<string, AbortCallback> = {};
		const results: AbortCollectionResults = {};

		collection.forEach((chunk) => {
			if (!lengthOf(chunk, 2)) {
				throw new Error(errors.WRONG_LENGTH(collection, 2));
			}

			const [ name, callback ] = chunk;

			if (!isString(name)) {
				throw new Error(errors.NOT_STRING(name));
			}
			if (!isFn(callback)) {
				throw new Error(errors.NOT_FN(callback));
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
			throw new Error(errors.NOT_STRING(name));
		}

		if (this.controllers[name]) {
			this.controllers[name].abort();
			AbortJSEvents.emit('abort', { controller: name });
		}
	}

	public static get(name: string): AbortController {
		if (!isString(name)) {
			throw new Error(errors.NOT_STRING(name));
		}

		return this.controllers[name];
	}

	public static create(name: string): void {
		if (!isString(name)) {
			throw new Error(errors.NOT_STRING(name));
		}

		this.controllers[name] = new AbortController();
		AbortJSEvents.emit('create', { controller: name });
	}

	public static clean(abort?: boolean): void {
		if (isDefined(abort) && !isBoolean(abort)) {
			throw new Error(errors.NOT_BOOLEAN(abort, true));
		}

		for (const controller in this.controllers) {
			this.remove(controller, abort);
		}
	}

	public static remove(name: string, abort?: boolean): void {
		if (!isString(name)) {
			throw new Error(errors.NOT_STRING(name));
		}
		if (isDefined(abort) && !isBoolean(abort)) {
			throw new Error(errors.NOT_BOOLEAN(abort, true));
		}

		if (this.controllers[name]) {
			if (abort) {
				this.controllers[name].abort();
				AbortJSEvents.emit('abort', { controller: name });
			}
			delete this.controllers[name];
			AbortJSEvents.emit('remove', { controller: name });
		}
	}

	public static on(event: keyof Events, callback: EventCallback): void {
		if (!isString(event)) {
			throw new Error(errors.NOT_STRING(event));
		}
		if (!isFn(callback)) {
			throw new Error(errors.NOT_FN(callback));
		}

		AbortJSEvents.addEventTo(event, callback);
	}
}
