import { errors } from '../errors/errors';
import { isBoolean, isDefined, isFn, isString } from '../utils/validate-types';
import { Controllers, AbortCallback } from './abort-js.types';

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

	public static abort(name: string): void {
		if (!isString(name)) {
			throw new Error(errors.NOT_STRING(name));
		}

		if (this.controllers[name]) {
			this.controllers[name].abort();
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
			}
			delete this.controllers[name];
		}
	}
}
